import express from 'express';
import cors from 'cors';
import PDFDocument from 'pdfkit';
import axios from 'axios';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import Stripe from 'stripe';
import multer from 'multer';
import { PrismaClient } from '@prisma/client';
import QRCode from 'qrcode';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import sanitizeHtml from 'sanitize-html';
import { logoDigiBase64, logoIefpBase64 } from './logos.js';
import { mascotBase64 } from './mascot.js';

dotenv.config();

const app = express();

// Security Middleware (Defense in Depth)
app.use(helmet());
app.use(cookieParser());
app.use(express.json({ limit: '10kb' })); // Limit body size

// Input Sanitization Middleware
const sanitizeMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (req.body && typeof req.body === 'object') {
    for (const key in req.body) {
      if (typeof req.body[key] === 'string') {
        req.body[key] = sanitizeHtml(req.body[key], { allowedTags: [], allowedAttributes: {} }).trim();
      }
    }
  }
  next();
};
app.use(sanitizeMiddleware);

// Honeypot Bot-Trap Middleware
const honeypotMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (req.body && req.body._hp_website) {
    // Se o honeypot for preenchido por um bot, fingimos sucesso
    console.warn('Bot capturado pelo honeypot!');
    return res.status(200).json({ success: true, message: 'Submetido com sucesso.' });
  }
  next();
};
app.use(honeypotMiddleware);

const corsOptions = {
  origin: ['https://digitalent.pt', 'https://www.digitalent.pt', 'http://localhost:5173'],
  credentials: true, // required for cookies
};
app.use(cors(corsOptions));

// Global Rate Limiter
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: { success: false, error: 'Demasiados pedidos. Tente novamente mais tarde.' },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', globalLimiter);

// Specific Rate Limiters
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { success: false, error: 'Demasiadas tentativas de login. Tente novamente mais tarde.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const checkinLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { success: false, error: 'Demasiadas tentativas de checkin.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const prisma = new PrismaClient();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });

// Authentication Middleware
const authenticateToken = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const token = req.cookies.admin_token;
  if (!token) return res.status(401).json({ success: false, error: 'Não autorizado. Faça login.' });
  
  jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret-12345', (err: any, user: any) => {
    if (err) return res.status(403).json({ success: false, error: 'Sessão expirada ou inválida.' });
    (req as any).user = user;
    next();
  });
};

// Número do Administrador configurado por si
const ADMIN_WHATSAPP_NUMBER = "351964300708"; 

app.post('/api/register-whatsapp', async (req, res) => {
  const { formType, name, email, phone, company, sponsorshipLevel, adminNumber } = req.body;

  // Validate if email already exists
  const existingUser = await prisma.participantApplication.findFirst({
    where: { emailAddress: email }
  });

  if (existingUser) {
    return res.status(400).json({ success: false, error: 'Este e-mail já está cadastrado. Por favor, verifica a tua caixa de entrada ou a pasta de spam.' });
  }

  // Usa o número enviado pelo frontend ou o padrão configurado acima
  const targetNumber = adminNumber || ADMIN_WHATSAPP_NUMBER;
  const registrationCode = 'DT26-' + Math.random().toString(36).substring(2, 8).toUpperCase();

  // Guardar no banco de dados para que o código funcione no /checkin e /confirma
  try {
    await prisma.participantApplication.create({
      data: {
        fullName: name,
        phoneNumber: phone || null,
        emailAddress: email,
        companyName: company || null,
        registrationCode: registrationCode,
        dataProtectionConsent: true,
      }
    });
  } catch (dbErr) {
    console.warn("⚠️ Não foi possível salvar participante na BD. Continuando para envio de email...", dbErr);
  }

  try {
    const logoDigitalent = Buffer.from(logoDigiBase64, 'base64');
    const logoIEFP = Buffer.from(logoIefpBase64, 'base64');

    // 1. Instanciar e Criar o PDF em memória (Buffer)
    const doc = new PDFDocument({ margin: 50 });
    const buffers: Buffer[] = [];
    
    doc.on('data', (chunk: Buffer) => buffers.push(chunk));
    doc.on('end', async () => {
      const pdfBuffer = Buffer.concat(buffers);

      // 2. Preparar os dados para envio
      const textMessage = `*Novo Registo Digitalent26*\n\n*Tipo:* ${formType}\n*Nome:* ${name}\n*Email:* ${email}\n*Telemóvel:* ${phone}\n${company ? `*Empresa:* ${company}\n` : ''}${sponsorshipLevel ? `*Nível de Patrocínio:* ${sponsorshipLevel}\n` : ''}`;

      // 3. Enviar E-mail de Notificação com o PDF anexo
      try {
        const smtpUser = process.env.SMTP_USER || 'digitaltalent2026@gmail.com';
        const smtpPass = process.env.SMTP_PASS;
        const receiverEmail = process.env.RECEIVER_EMAIL || 'digitaltalent2026@gmail.com';

        if (smtpPass) {
          const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.gmail.com',
            port: parseInt(process.env.SMTP_PORT || '465'),
            secure: process.env.SMTP_SECURE !== 'false', // true para 465, false para outros
            auth: {
              user: smtpUser,
              pass: smtpPass,
            },
          });

          const mailOptionsAdmin = {
            from: `"Digitalent26" <${smtpUser}>`,
            to: receiverEmail,
            subject: `📢 Nova Inscrição (${formType}) - ${name}`,
            text: `Olá,\n\nUma nova inscrição foi realizada no site Digitalent26!\n\nDetalhes da Inscrição:\n---------------------------\nTipo: ${formType}\nNome: ${name}\nE-mail: ${email}\nTelemóvel: ${phone}\n${company ? `Empresa: ${company}\n` : ''}${sponsorshipLevel ? `Nível de Patrocínio: ${sponsorshipLevel}\n` : ''}\nCódigo de Inscrição: ${registrationCode}\nO comprovativo em PDF está anexado a este e-mail.\n\nAtenciosamente,\nDigitalent26 Core SaaS`,
            attachments: [
              {
                filename: `Inscricao_${name.replace(/\s+/g, '_')}.pdf`,
                content: pdfBuffer,
              },
            ],
          };

          const mailOptionsUser = {
            from: `"Digitalent26 (Equipa Marketing)" <${smtpUser}>`,
            to: email,
            subject: `A tua inscrição no Digitalent'26 foi aceite com sucesso! 🎉`,
            html: `
              <div style="font-family: Arial, sans-serif; color: #1e293b; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #2563eb;">Olá, ${name}!</h2>
                <p>A tua inscrição para o <strong>Digitalent'26</strong>, foi confirmada.</p>
                <div style="background-color: #f8fafc; border-left: 4px solid #2563eb; padding: 20px; margin: 20px 0;">
                  <p style="margin: 0 0 5px 0; font-size: 14px; color: #64748b;">O teu Código Único de Inscrição e QR Code de Check-in:</p>
                  <p style="margin: 0 0 15px 0; font-size: 13px; color: #2563eb; font-weight: bold;">👉 Clica no código azul abaixo para acederes ao Painel de Perguntas (Q&A)</p>
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td align="left" valign="middle">
                        <h3 style="margin: 0; color: #0f172a; font-size: 28px; letter-spacing: 2px;">
                          <a href="https://digitalent.pt/checkin?code=${registrationCode}" style="color: #2563eb; text-decoration: none;">${registrationCode}</a>
                        </h3>
                      </td>
                      <td align="right" valign="middle" width="160">
                        <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent('https://digitalent.pt/checkin?code=' + registrationCode)}" alt="QR Code" style="display: block; border-radius: 8px; border: 2px solid #2563eb;" />
                      </td>
                    </tr>
                  </table>
                </div>
                <p>Guarda este código. O teu PDF de admissão e credenciais de acesso ao Dossiê Antidesperdício foram também emitidos e enviados em anexo.</p>
                <p>Estamos ansiosos por te ver impulsionar os teus resultados no Digitalent'26.</p>
                <br/>
                <p>Até breve,</p>
                <p><strong>Equipa Marketing | Digitalent'26</strong></p>
                <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
                <p style="font-size: 11px; color: #94a3b8;">* Confirmaste a tua autorização para a recolha, tratamento e divulgação de dados e direitos de imagem no âmbito do Regulamento Geral de Proteção de Dados (RGPD).</p>
              </div>
            `,
            attachments: [
              {
                filename: `Inscricao_${name.replace(/\s+/g, '_')}.pdf`,
                content: pdfBuffer,
              },
            ],
          };

          await transporter.sendMail(mailOptionsAdmin);
          await transporter.sendMail(mailOptionsUser);
          console.log(`📧 E-mail de confirmação enviado para admin e para ${email}`);
        } else {
          console.warn("⚠️ SMTP_PASS não configurado no .env. Abortando envio.");
          return res.status(500).json({ success: false, error: "Credenciais de e-mail da Vercel (SMTP_PASS) em falta. Configure as variáveis de ambiente!" });
        }
      } catch (emailError) {
        console.error("❌ Erro ao enviar e-mail de notificação:", emailError);
      }

      // Comunicação via WhatsApp foi removida a pedido do utilizador.
      return res.status(200).json({ success: true, message: "Registo processado e enviado via E-mail." });
    });

    // Design do PDF
    doc.rect(0, 0, doc.page.width, doc.page.height).fill('#0b0f19');
    
    doc.fillColor('#ffffff');
    doc.fontSize(24).fillColor('#2563eb').text('DIGITALENT26', { align: 'center' });
    doc.moveDown(1);

    doc.fontSize(12).fillColor('#cbd5e1').text('Marketing com Visão - Comprovativo de Candidatura', { align: 'center' });
    doc.moveDown(2);
    
    doc.fontSize(14).fillColor('#ffffff').text(`Detalhe do Registro: Digitalente'26`, { underline: true });
    doc.moveDown();
    doc.fontSize(12).fillColor('#cbd5e1').text(`Nome Completo: ${name}`);
    doc.text(`E-mail de Contacto: ${email}`);
    doc.text(`Telemóvel: ${phone}`);
    if (company) doc.text(`Empresa associada: ${company}`);
    if (sponsorshipLevel) doc.text(`Lote/Nível de Interesse: ${sponsorshipLevel}`);
    doc.moveDown();
    doc.fontSize(14).fillColor('#ffffff').text(`Código de Inscrição Único: ${registrationCode}`);
    
    doc.moveDown(3);
    doc.fontSize(10).fillColor('#94a3b8').text('Emitido automaticamente pela Digitalente core', { align: 'center' });

    doc.moveDown(4);
    
    // Logos no rodapé
    const currentY = doc.y;
    if (logoDigitalent && logoIEFP) {
      // Posicionar lado a lado
      doc.image(logoDigitalent, 160, currentY, { width: 140 });
      doc.image(logoIEFP, 340, currentY + 5, { width: 30 });
      doc.y = currentY + 70; // Espaço abaixo das imagens
    } else {
      doc.y = currentY + 50;
    }

    doc.moveDown(1);
    doc.fontSize(10).fillColor('#ffffff').text('https://digitalent.pt', { align: 'center' });

    doc.end();

  } catch (error: unknown) {
    console.error("Erro interno no envio invisível:", error);
    res.status(500).json({ success: false, error: "Erro ao processar e disparar fluxo automático." });
  }
});

// Stripe Checkout Integration Endpoint (Legacy Legacy fallback)
app.post('/api/stripe/create-checkout', async (req, res) => {
  const { tier, name, email, phone } = req.body;

  if (!tier || !['PRO', 'ENTERPRISE'].includes(tier)) {
    return res.status(400).json({ error: 'Invalid or missing access tier. Must be PRO or ENTERPRISE.' });
  }

  const amount = tier === 'PRO' ? 4900 : 19900;
  const productName = tier === 'PRO' ? 'Digitalent26 Pro Pass' : 'Digitalent26 Enterprise Pass';

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_dummy_key', {
      apiVersion: '2023-10-16' as any,
    });
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: productName,
              metadata: { tier },
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      customer_email: email,
      success_url: `${process.env.FRONTEND_URL || 'https://digitalent.pt'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL || 'https://digitalent.pt'}/cancel`,
      metadata: { name, email, phone, tier },
    });

    res.json({ id: session.id, url: session.url });
  } catch (error: any) {
    console.error('❌ Stripe Checkout Error:', error);
    res.status(500).json({ error: error.message || 'Internal Stripe Checkout error' });
  }
});

// Official Stripe Session Creator Integration Endpoint
app.post('/api/stripe/create-session', async (req, res) => {
  const { tier, fullName, corporateEmail, whatsappNumber, languagePreference } = req.body;

  // Validate tier access
  if (!tier || !['PRO', 'ENTERPRISE'].includes(tier)) {
    return res.status(400).json({ error: 'Invalid or missing plan tier. Must be PRO or ENTERPRISE.' });
  }

  const amount = tier === 'PRO' ? 4900 : 19900; // in cents (€49 / €199)
  const productName = tier === 'PRO' ? 'Digitalent26 Premium Pro Pass' : 'Digitalent26 Premium Enterprise Pass';

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_dummy_key', {
      apiVersion: '2023-10-16' as any,
    });
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: productName,
              metadata: {
                tier,
                languagePreference: languagePreference || 'PT'
              },
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      customer_email: corporateEmail,
      success_url: `${process.env.FRONTEND_URL || 'https://digitalent.pt'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL || 'https://digitalent.pt'}/cancel`,
      metadata: {
        fullName: fullName || '',
        corporateEmail: corporateEmail || '',
        whatsappNumber: whatsappNumber || '',
        planTier: tier,
        languagePreference: languagePreference || 'PT'
      },
    });

    res.status(200).json({ id: session.id, url: session.url });
  } catch (error: any) {
    console.error('❌ Stripe Create-Session Error:', error);
    res.status(500).json({ error: error.message || 'Internal Stripe session creation failed' });
  }
});

// Speaker Registration Endpoint
app.post('/api/speakers/register', upload.fields([{ name: 'profilePhoto', maxCount: 1 }, { name: 'companyLogo', maxCount: 1 }]), async (req, res) => {
  try {
    const { fullName, professionalTitle, companyName, whatsappNumber, emailAddress, speakerTopic, dataProtectionConsent, observations } = req.body;

    if (!fullName || !emailAddress || !whatsappNumber) {
      return res.status(400).json({ success: false, error: 'Campos obrigatórios em falta.' });
    }
    
    if (dataProtectionConsent !== 'true' && dataProtectionConsent !== true) {
      return res.status(400).json({ error: 'Data protection consent is required.' });
    }

    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const profilePhoto = files?.profilePhoto?.[0];
    const companyLogo = files?.companyLogo?.[0];

    const attachmentVerification = `ProfilePhoto: ${profilePhoto ? 'Yes' : 'No'}, CompanyLogo: ${companyLogo ? 'Yes' : 'No'}`;
    const registrationCode = 'DT26-SPK-' + Math.random().toString(36).substring(2, 8).toUpperCase();

    // Save to database
    try {
      await prisma.speakerApplication.create({
        data: {
          fullName,
          professionalTitle,
          companyName,
          whatsappNumber,
          emailAddress,
          speakerTopic,
          observations: observations || null,
          registrationCode,
          attachmentVerification,
          dataProtectionConsent: true,
        }
      });
    } catch (dbErr) {
      console.warn("⚠️ Não foi possível salvar na BD (verifique DATABASE_URL). Continuando para envio de email...");
    }

    // Send Email
    const smtpUser = process.env.SMTP_USER || 'digitaltalent2026@gmail.com';
    const smtpPass = process.env.SMTP_PASS;
    const receiverEmail = process.env.RECEIVER_EMAIL || 'digitaltalent2026@gmail.com';

    if (smtpPass) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT || '465'),
        secure: process.env.SMTP_SECURE !== 'false',
        auth: { user: smtpUser, pass: smtpPass },
      });

      const attachments = [];
      if (profilePhoto) {
        attachments.push({
          filename: profilePhoto.originalname,
          content: profilePhoto.buffer
        });
      }
      if (companyLogo) {
        attachments.push({
          filename: companyLogo.originalname,
          content: companyLogo.buffer
        });
      }

      const mailOptionsAdmin = {
        from: `"Digitalent26" <${smtpUser}>`,
        to: receiverEmail,
        subject: `🎙️ Nova Candidatura a Orador - ${fullName}`,
        text: `Olá,\n\nUma nova candidatura a Orador foi submetida!\n\nDetalhes da Candidatura:\n---------------------------\nNome: ${fullName}\nTítulo: ${professionalTitle}\nEmpresa: ${companyName}\nEmail: ${emailAddress}\nTelemóvel: ${whatsappNumber}\nTópico: ${speakerTopic}\nObservações: ${observations || 'Nenhuma observação'}\nCódigo de Inscrição: ${registrationCode}\nConsentimento RGPD: Sim\n\nOs anexos (Foto e Logotipo) encontram-se em anexo a este email se enviados.\n\nAtenciosamente,\n(Equipa Marketing)`,
        attachments
      };

      const mailOptionsSpeaker = {
        from: `"Digitalent26 (Equipa Marketing)" <${smtpUser}>`,
        to: emailAddress,
        subject: `Confirmação de participação como Orador – Digitalent'26`,
        html: `
          <div style="font-family: Arial, sans-serif; color: #1e293b; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #2563eb;">Olá, ${fullName}!</h2>
            <p>Temos o prazer de confirmar que a tua candidatura para Orador no <strong>Digitalent'26</strong> foi aceite com sucesso.</p>
            <p>O tema que propuseste — <em>"${speakerTopic}"</em> — já se encontra registado na programação do evento.</p>
            <div style="background-color: #f8fafc; border-left: 4px solid #2563eb; padding: 20px; margin: 20px 0;">
              <p style="margin: 0 0 15px 0; font-size: 14px; color: #64748b;">O teu Código de Acompanhamento e QR Code de Check-in:</p>
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="left" valign="middle">
                    <h3 style="margin: 0; color: #0f172a; font-size: 28px; letter-spacing: 2px;">
                      <a href="https://digitalent.pt/checkin?code=${registrationCode}" style="color: #2563eb; text-decoration: none;">${registrationCode}</a>
                    </h3>
                  </td>
                  <td align="right" valign="middle" width="160">
                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent('https://digitalent.pt/checkin?code=' + registrationCode)}" alt="QR Code" style="display: block; border-radius: 8px; border: 2px solid #2563eb;" />
                  </td>
                </tr>
              </table>
            </div>
            <p>Todas as restantes informações submetidas estão em conformidade. Caso seja necessário algum detalhe adicional, entraremos em contacto utilizando este código como referência.</p>
            <p>Agradecemos a tua disponibilidade para partilhar conhecimento com a nossa comunidade — será um gosto contar contigo no evento!</p>
            <br/>
            <p>Até breve,</p>
            <p><strong>Equipa Marketing | Digitalent'26</strong></p>
          </div>
        `
      };

      await transporter.sendMail(mailOptionsAdmin);
      await transporter.sendMail(mailOptionsSpeaker);
    } else {
      console.warn("⚠️ SMTP_PASS não configurado no .env. Ignorando envio de e-mail de orador.");
      return res.status(500).json({ success: false, error: "Credenciais de e-mail da Vercel (SMTP_PASS) em falta. Configure as variáveis de ambiente!" });
    }

    res.status(200).json({ success: true, message: "Candidatura submetida com sucesso." });
  } catch (error: any) {
    console.error("Erro no registo de orador:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
});

// Participant Registration Endpoint
app.post('/api/participants/register', async (req, res) => {
  try {
    const { fullName, phoneNumber, emailAddress, companyName, dataProtectionConsent } = req.body;

    if (!fullName || !emailAddress) {
      return res.status(400).json({ success: false, error: 'Campos obrigatórios em falta.' });
    }

    if (dataProtectionConsent !== true && dataProtectionConsent !== 'true') {
      return res.status(400).json({ error: 'Data protection consent is required.' });
    }

    // Validate if email already exists
    const existingParticipant = await prisma.participantApplication.findFirst({
      where: { emailAddress }
    });

    if (existingParticipant) {
      return res.status(400).json({ success: false, error: 'Este e-mail já está cadastrado. Por favor, verifica a tua caixa de entrada ou a pasta de spam.' });
    }

    const registrationCode = 'DT26-' + Math.random().toString(36).substring(2, 8).toUpperCase();

    try {
      await prisma.participantApplication.create({
        data: {
          fullName,
          phoneNumber: phoneNumber || null,
          emailAddress,
          companyName: companyName || null,
          registrationCode,
          dataProtectionConsent: true,
        }
      });
    } catch (dbErr) {
      console.warn("⚠️ Não foi possível salvar participante na BD. Continuando para envio de email...");
    }

    const smtpUser = process.env.SMTP_USER || 'digitaltalent2026@gmail.com';
    const smtpPass = process.env.SMTP_PASS;
    const receiverEmail = process.env.RECEIVER_EMAIL || 'digitaltalent2026@gmail.com';

    if (smtpPass) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT || '465'),
        secure: process.env.SMTP_SECURE !== 'false',
        auth: { user: smtpUser, pass: smtpPass },
      });

      // Email para a equipa da Digitalent26 (Admin)
      const mailOptionsAdmin = {
        from: `"Digitalent26" <${smtpUser}>`,
        to: receiverEmail,
        subject: `🎫 Nova Inscrição de Participante - ${fullName}`,
        text: `Olá,\n\nUma nova inscrição de Participante foi recebida!\n\nDetalhes:\n---------------------------\nNome: ${fullName}\nEmail: ${emailAddress}\nTelemóvel: ${phoneNumber || 'N/A'}\nEmpresa/Ramo: ${companyName || 'N/A'}\nCódigo de Inscrição: ${registrationCode}\nConsentimento RGPD: Sim\n\nAtenciosamente,\n(Equipa Marketing)`,
      };

      // Email automático para o Participante
      const mailOptionsParticipant = {
        from: `"Digitalent26 (Equipa Marketing)" <${smtpUser}>`,
        to: emailAddress,
        subject: `A tua inscrição no Digitalent'26 foi confirmada! 🎉`,
        html: `
          <div style="font-family: Arial, sans-serif; color: #1e293b; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #2563eb;">Olá, ${fullName}!</h2>
            <p>Confirmamos que a tua inscrição como participante no evento <strong>Digitalent'26</strong> foi recebida com sucesso.</p>
            <div style="background-color: #f8fafc; border-left: 4px solid #2563eb; padding: 20px; margin: 20px 0;">
              <p style="margin: 0 0 5px 0; font-size: 14px; color: #64748b;">O teu Código Único de Inscrição e QR Code de Check-in:</p>
              <p style="margin: 0 0 15px 0; font-size: 13px; color: #2563eb; font-weight: bold;">👉 Clica no código azul abaixo para acederes ao Painel de Perguntas (Q&A)</p>
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="left" valign="middle">
                    <h3 style="margin: 0; color: #0f172a; font-size: 28px; letter-spacing: 2px;">
                      <a href="https://digitalent.pt/checkin?code=${registrationCode}" style="color: #2563eb; text-decoration: none;">${registrationCode}</a>
                    </h3>
                  </td>
                  <td align="right" valign="middle" width="160">
                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent('https://digitalent.pt/checkin?code=' + registrationCode)}" alt="QR Code" style="display: block; border-radius: 8px; border: 2px solid #2563eb;" />
                  </td>
                </tr>
              </table>
            </div>
            <p>Guarda este código, pois será o teu bilhete de acesso no dia do evento.</p>
            <p>Fica atento à tua caixa de correio para mais novidades e detalhes sobre o cronograma. Estamos ansiosos por te receber!</p>
            <br/>
            <p>Até breve,</p>
            <p><strong>Equipa Marketing | Digitalent'26</strong></p>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
            <p style="font-size: 11px; color: #94a3b8;">* Confirmaste a tua autorização para a recolha, tratamento e divulgação de dados e direitos de imagem no âmbito do Regulamento Geral de Proteção de Dados (RGPD).</p>
          </div>
        `
      };

      await transporter.sendMail(mailOptionsAdmin);
      await transporter.sendMail(mailOptionsParticipant);
    } else {
      console.warn("⚠️ SMTP_PASS não configurado no .env. Ignorando envio de e-mail de participante.");
      return res.status(500).json({ success: false, error: "Credenciais de e-mail da Vercel (SMTP_PASS) em falta. Configure as variáveis de ambiente!" });
    }

    res.status(200).json({ success: true, message: "Inscrição submetida com sucesso." });
  } catch (error: any) {
    console.error("Erro no registo de participante:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
});

// Partner Registration Endpoint
app.post('/api/partners/register', async (req, res) => {
  try {
    const { companyName, contactName, emailAddress, phoneNumber, objectives, dataProtectionConsent } = req.body;

    if (!companyName || !contactName || !emailAddress) {
      return res.status(400).json({ success: false, error: 'Campos obrigatórios em falta.' });
    }

    if (dataProtectionConsent !== true && dataProtectionConsent !== 'true') {
      return res.status(400).json({ error: 'Data protection consent is required.' });
    }

    try {
      await prisma.partnerApplication.create({
        data: {
          companyName,
          contactName,
          emailAddress,
          phoneNumber: phoneNumber || null,
          objectives: objectives || null,
          dataProtectionConsent: true,
        }
      });
    } catch (dbErr) {
      console.warn("⚠️ Não foi possível salvar parceiro na BD. Continuando para envio de email...");
    }

    const smtpUser = process.env.SMTP_USER || 'digitaltalent2026@gmail.com';
    const smtpPass = process.env.SMTP_PASS;
    const receiverEmail = process.env.RECEIVER_EMAIL || 'digitaltalent2026@gmail.com';

    if (smtpPass) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT || '465'),
        secure: process.env.SMTP_SECURE !== 'false',
        auth: { user: smtpUser, pass: smtpPass },
      });

      const mailOptionsAdmin = {
        from: `"Digitalent26" <${smtpUser}>`,
        to: receiverEmail,
        subject: `🤝 Nova Candidatura a Parceiro - ${companyName}`,
        text: `Olá,\n\nUma nova candidatura a Parceiro foi recebida!\n\nDetalhes:\n---------------------------\nEmpresa: ${companyName}\nResponsável: ${contactName}\nEmail: ${emailAddress}\nTelemóvel: ${phoneNumber || 'N/A'}\nObjetivos:\n${objectives || 'Nenhum'}\n\nConsentimento RGPD: Sim\n\nAtenciosamente,\n(Equipa Marketing)`,
      };

      const mailOptionsPartner = {
        from: `"Digitalent26 (Equipa Marketing)" <${smtpUser}>`,
        to: emailAddress,
        subject: `Candidatura a Parceiro recebida - Digitalent'26`,
        html: `
          <div style="font-family: Arial, sans-serif; color: #1e293b; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #2563eb;">Olá, ${contactName}!</h2>
            <p>Confirmamos a receção da candidatura da <strong>${companyName}</strong> para ser nossa Parceira no <strong>Digitalent'26</strong>.</p>
            <p>A nossa equipa vai analisar a vossa proposta e objetivos com o maior cuidado. Entraremos em contacto brevemente com mais informações sobre os próximos passos e oportunidades de patrocínio ou parceria adequadas.</p>
            <p>Obrigado pelo vosso interesse em impulsionar o mercado local connosco.</p>
            <br/>
            <p>Atenciosamente,</p>
            <p><strong>Equipa Marketing | Digitalent'26</strong></p>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
            <p style="font-size: 11px; color: #94a3b8;">* Confirmaste a tua autorização para a recolha, tratamento e divulgação de dados e direitos de imagem no âmbito do Regulamento Geral de Proteção de Dados (RGPD).</p>
          </div>
        `
      };

      await transporter.sendMail(mailOptionsAdmin);
      await transporter.sendMail(mailOptionsPartner);
    } else {
      console.warn("⚠️ SMTP_PASS não configurado no .env. Ignorando envio de e-mail de parceiro.");
      return res.status(500).json({ success: false, error: "Credenciais de e-mail da Vercel (SMTP_PASS) em falta. Configure as variáveis de ambiente!" });
    }

    res.status(200).json({ success: true, message: "Candidatura submetida com sucesso." });
  } catch (error: any) {
    console.error("Erro no registo de parceiro:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
});

// --- ADMIN & CHECK-IN ENDPOINTS ---

app.post('/api/admin/login', async (req, res) => {
  const { email, password } = req.body;
  if (email === 'admin@digitalent.pt' && password === 'Foresp2026') {
    const token = jwt.sign({ admin: true }, process.env.JWT_SECRET || 'fallback-secret-12345', { expiresIn: '8h' });
    res.cookie('admin_token', token, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'strict',
      maxAge: 8 * 60 * 60 * 1000 
    });
    return res.json({ success: true });
  }
  res.status(401).json({ success: false, error: 'Credenciais inválidas' });
});

app.post('/api/admin/logout', (req, res) => {
  res.clearCookie('admin_token');
  res.json({ success: true });
});

app.get('/api/admin/users', authenticateToken, async (req, res) => {
  try {
    const participants = await prisma.participantApplication.findMany();
    const speakers = await prisma.speakerApplication.findMany();
    res.json({ success: true, data: { participants, speakers } });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Erro ao carregar utilizadores.' });
  }
});

app.get('/api/admin/settings', authenticateToken, async (req, res) => {
  try {
    let settings = await prisma.systemSettings.findUnique({ where: { id: "1" } });
    if (!settings) {
      settings = await prisma.systemSettings.create({ data: { id: "1", qaLink: "" } });
    }
    res.json({ success: true, qaLink: settings.qaLink });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Erro ao carregar configurações.' });
  }
});

app.post('/api/admin/settings', authenticateToken, async (req, res) => {
  try {
    const { qaLink } = req.body;
    await prisma.systemSettings.upsert({
      where: { id: "1" },
      update: { qaLink },
      create: { id: "1", qaLink }
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Erro ao guardar configurações.' });
  }
});

app.post('/api/admin/send-reminders', authenticateToken, async (req, res) => {
  try {
    const { emails } = req.body;
    if (!emails || !Array.isArray(emails) || emails.length === 0) {
      return res.status(400).json({ success: false, error: 'Nenhum e-mail fornecido.' });
    }

    const smtpUser = process.env.SMTP_USER || 'digitaltalent2026@gmail.com';
    const smtpPass = process.env.SMTP_PASS;

    if (!smtpPass) {
      return res.status(500).json({ success: false, error: 'Configuração SMTP em falta.' });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '465'),
      secure: process.env.SMTP_SECURE !== 'false',
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    // Calculate days remaining
    const targetNormalized = new Date(2026, 6, 9, 0, 0, 0, 0).getTime(); // July 9, 2026
    const clientDate = new Date();
    const clientNormalized = new Date(clientDate.getFullYear(), clientDate.getMonth(), clientDate.getDate(), 0, 0, 0, 0).getTime();
    const diffInMs = targetNormalized - clientNormalized;
    const daysRemaining = Math.max(0, Math.ceil(diffInMs / (1000 * 60 * 60 * 24)));

    let daysText = `FALTAM ${daysRemaining} DIAS!`;
    if (daysRemaining === 1) daysText = 'FALTA 1 DIA!';
    if (daysRemaining === 0) daysText = 'É HOJE O GRANDE DIA!';

    for (const email of emails) {
      // Find user to get name and registrationCode (could be participant or speaker)
      let user: any = await prisma.participantApplication.findFirst({ where: { emailAddress: email } });
      if (!user) {
        user = await prisma.speakerApplication.findFirst({ where: { emailAddress: email } });
      }

      if (!user) continue;

      const code = user.registrationCode || 'N/A';
      const name = user.fullName || 'Participante';

      const mailOptions = {
        from: `"Digitalent'26 (Equipa)" <${smtpUser}>`,
        to: email,
        subject: `⏳ ${daysText} - O Digitalent'26 aproxima-se!`,
        html: `
          <div style="font-family: Arial, sans-serif; color: #1e293b; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #2563eb;">Olá, ${name}!</h2>
            <p style="font-size: 18px; font-weight: bold; color: #ef4444;">Está chegando a hora de fazer parte de algo especial. ${daysText}</p>
            <p>Estamos muito felizes em contar com a sua presença. Aproveitamos para relembrar o seu Código de Check-in para acesso rápido no dia:</p>
            <div style="background-color: #f8fafc; border-left: 4px solid #2563eb; padding: 20px; margin: 20px 0;">
              <p style="margin: 0 0 5px 0; font-size: 14px; color: #64748b;">O teu Código Único de Inscrição e QR Code de Check-in:</p>
              <p style="margin: 0 0 15px 0; font-size: 13px; color: #2563eb; font-weight: bold;">👉 Clica no código azul abaixo para acederes ao Painel de Perguntas (Q&A)</p>
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="left" valign="middle">
                    <h3 style="margin: 0; color: #0f172a; font-size: 28px; letter-spacing: 2px;">
                      <a href="https://digitalent.pt/checkin?code=${code}" style="color: #2563eb; text-decoration: none;">${code}</a>
                    </h3>
                  </td>
                  <td align="right" valign="middle" width="160">
                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent('https://digitalent.pt/checkin?code=' + code)}" alt="QR Code" style="display: block; border-radius: 8px; border: 2px solid #2563eb;" />
                  </td>
                </tr>
              </table>
            </div>
            <p>Pode apresentar este código à entrada ou aceder ao link acima para utilizar o painel Q&A durante o evento.</p>
            <p>Até breve!<br/><strong>A Equipa da Digitalent</strong></p>
          </div>
        `
      };

      await transporter.sendMail(mailOptions);
    }

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Erro ao enviar e-mails de lembrete.' });
  }
});

app.post('/api/admin/toggle-kit', authenticateToken, async (req, res) => {
  try {
    const { id, type, status } = req.body;
    if (type === 'speaker') {
      await prisma.speakerApplication.update({ where: { id }, data: { status } });
    } else {
      await prisma.participantApplication.update({ where: { id }, data: { status } });
    }
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Erro ao atualizar kit.' });
  }
});

app.post('/api/checkin', checkinLimiter, async (req, res) => {
  try {
    let { code } = req.body;
    if (!code) return res.status(400).json({ success: false, error: 'Código em falta.' });

    // Formatting code automatically if missing hyphen
    code = code.toUpperCase().trim();
    if (code.startsWith('DT26') && !code.startsWith('DT26-')) {
      code = 'DT26-' + code.substring(4);
    }

    let updated = false;
    let participant = await prisma.participantApplication.findFirst({ where: { registrationCode: code } });
    
    if (participant) {
      await prisma.participantApplication.update({
        where: { id: participant.id },
        data: { status: 'Confirmado, brinde liberado' }
      });
      updated = true;
    } else {
      let speaker = await prisma.speakerApplication.findFirst({ where: { registrationCode: code } });
      if (speaker) {
        await prisma.speakerApplication.update({
          where: { id: speaker.id },
          data: { status: 'Confirmado, brinde liberado' }
        });
        updated = true;
      }
    }

    if (!updated) {
      return res.status(404).json({ success: false, error: 'Código não encontrado.' });
    }

    const settings = await prisma.systemSettings.findUnique({ where: { id: "1" } });
    const qaLink = settings?.qaLink || '';

    res.json({ success: true, qaLink });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Erro ao efetuar checkin.' });
  }
});

app.get('/api/admin/generate-qr-pdf', authenticateToken, async (req, res) => {
  try {
    const qrUrl = "https://digitalent.pt/checkin";
    const qrImageBuffer = await QRCode.toBuffer(qrUrl, {
      margin: 1,
      width: 200,
      color: {
        dark: '#000000',
        light: '#ffffff'
      }
    });
    
    const doc = new PDFDocument({ margin: 0, size: 'A4', layout: 'landscape' });
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename="qrcodes.pdf"');
    
    doc.pipe(res);
    
    const logoDigitalent = Buffer.from(logoDigiBase64, 'base64');
    const mascotImg = Buffer.from(mascotBase64, 'base64');
    
    const pageWidth = doc.page.width;
    const pageHeight = doc.page.height;
    
    const cols = 2;
    const rows = 2;
    
    const cellWidth = pageWidth / cols;
    const cellHeight = pageHeight / rows;
    
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = c * cellWidth;
        const y = r * cellHeight;
        
        // Draw dashed borders around the "card"
        doc.lineWidth(1).strokeColor('#4f46e5').dash(3, { space: 3 });
        doc.rect(x + 20, y + 20, cellWidth - 40, cellHeight - 40).stroke();
        doc.undash();
        
        // Logo
        doc.image(logoDigitalent, x + 40, y + 40, { width: 140 });
        
        // Mascot
        doc.image(mascotImg, x + 40, y + 100, { width: 160 });
        
        // QR Code Box (Blue rounded border)
        const qrBoxX = x + 230;
        const qrBoxY = y + 40;
        doc.lineWidth(3).strokeColor('#0000ff');
        doc.roundedRect(qrBoxX, qrBoxY, 150, 150, 10).stroke();
        
        // QR Code Image
        doc.image(qrImageBuffer, qrBoxX + 5, qrBoxY + 5, { width: 140 });
        
        // Phrase
        doc.fontSize(10).fillColor('#1e293b').font('Helvetica-Bold');
        doc.text('"APONTE, ACESSE E LIBERE', x + 230, qrBoxY + 165, { align: 'center', width: 150 });
        doc.text('SUA EXPERIÊNCIA."', x + 230, qrBoxY + 178, { align: 'center', width: 150 });
      }
    }
    
    doc.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao gerar PDF' });
  }
});

const PORT = 3001;
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => console.log(`🚀 API de Automação do WhatsApp ativa na porta ${PORT}`));
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export default app;
