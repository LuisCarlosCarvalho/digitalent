import express from 'express';
import cors from 'cors';
import PDFDocument from 'pdfkit';
import axios from 'axios';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import Stripe from 'stripe';
import multer from 'multer';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16' as any,
});

const app = express();
app.use(cors());
app.use(express.json());

const prisma = new PrismaClient();
const upload = multer({ storage: multer.memoryStorage() });

// Número do Administrador configurado por si
const ADMIN_WHATSAPP_NUMBER = "351964300708"; 

app.post('/api/register-whatsapp', async (req, res) => {
  const { formType, name, email, phone, company, sponsorshipLevel, adminNumber } = req.body;

  // Usa o número enviado pelo frontend ou o padrão configurado acima
  const targetNumber = adminNumber || ADMIN_WHATSAPP_NUMBER;
  const registrationCode = 'DT26-' + Math.random().toString(36).substring(2, 8).toUpperCase();

  try {
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
                <p>A tua inscrição para o <strong>Digitalent'26</strong> (${formType}) foi confirmada.</p>
                <div style="background-color: #f8fafc; border-left: 4px solid #2563eb; padding: 15px; margin: 20px 0;">
                  <p style="margin: 0; font-size: 14px; color: #64748b;">O teu Código Único de Inscrição:</p>
                  <h3 style="margin: 5px 0 0 0; color: #0f172a; font-size: 24px; letter-spacing: 2px;">${registrationCode}</h3>
                </div>
                <p>Guarda este código. O teu PDF de admissão e credenciais de acesso ao Dossiê Antidesperdício foram também emitidos e enviados.</p>
                <p>Estamos ansiosos por te ver impulsionar os teus resultados no Digitalent'26.</p>
                <br/>
                <p>Até breve,</p>
                <p><strong>Equipa Marketing | Digitalent'26</strong></p>
              </div>
            `
          };

          await transporter.sendMail(mailOptionsAdmin);
          await transporter.sendMail(mailOptionsUser);
          console.log(`📧 E-mail de confirmação enviado para admin e para ${email}`);
        } else {
          console.warn("⚠️ SMTP_PASS não configurado no .env. Ignorando envio de e-mail.");
        }
      } catch (emailError) {
        console.error("❌ Erro ao enviar e-mail de notificação:", emailError);
      }

      // 4. Comunicação Invisível com a API de Integração do WhatsApp
      const base64Pdf = pdfBuffer.toString('base64');
      
      try {
        if (!process.env.WHATSAPP_API_URL || !process.env.WHATSAPP_API_TOKEN) {
            console.warn("⚠️ WHATSAPP_API_URL ou TOKEN não configurados no .env. O registo foi processado mas a mensagem não foi enviada.");
            return res.status(200).json({ success: true, message: "Registo processado localmente (Simulação)." });
        }

        await axios.post(`${process.env.WHATSAPP_API_URL}/send-document`, {
          number: targetNumber,
          caption: textMessage,
          document: `data:application/pdf;base64,${base64Pdf}`,
          fileName: `Inscricao_${name.replace(/\s+/g, '_')}.pdf`
        }, {
          headers: { 'Authorization': `Bearer ${process.env.WHATSAPP_API_TOKEN}` }
        });

        return res.status(200).json({ success: true, message: "Registo processado e enviado via WhatsApp." });
      } catch (apiError) {
        console.error("Erro na API do WhatsApp:", apiError);
        // Retornamos 200 para o front não "travar", mas logamos o erro
        return res.status(200).json({ success: true, warning: "Registo salvo, mas erro ao disparar WhatsApp." });
      }
    });

    // Design do PDF
    doc.rect(0, 0, doc.page.width, doc.page.height).fill('#0b0f19');
    doc.fillColor('#ffffff');
    doc.fontSize(24).fillColor('#2563eb').text('DIGITALENT26', { align: 'center' });
    doc.fontSize(12).fillColor('#cbd5e1').text('Marketing com Visão - Comprovativo de Candidatura', { align: 'center' });
    doc.moveDown(2);
    
    doc.fontSize(14).fillColor('#ffffff').text(`Detalhes do Registo (${formType})`, { underline: true });
    doc.moveDown();
    doc.fontSize(12).fillColor('#cbd5e1').text(`Nome Completo: ${name}`);
    doc.text(`E-mail de Contacto: ${email}`);
    doc.text(`Telemóvel: ${phone}`);
    if (company) doc.text(`Empresa associada: ${company}`);
    if (sponsorshipLevel) doc.text(`Lote/Nível de Interesse: ${sponsorshipLevel}`);
    doc.moveDown();
    doc.fontSize(14).fillColor('#ffffff').text(`Código de Inscrição Único: ${registrationCode}`);
    
    doc.moveDown(3);
    doc.fontSize(10).fillColor('#94a3b8').text('Emitido automaticamente pela plataforma Digitalent26 Core SaaS.', { align: 'center' });

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
            <div style="background-color: #f8fafc; border-left: 4px solid #2563eb; padding: 15px; margin: 20px 0;">
              <p style="margin: 0; font-size: 14px; color: #64748b;">O teu Código de Acompanhamento é:</p>
              <h3 style="margin: 5px 0 0 0; color: #0f172a; font-size: 24px; letter-spacing: 2px;">${registrationCode}</h3>
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
            <div style="background-color: #f8fafc; border-left: 4px solid #2563eb; padding: 15px; margin: 20px 0;">
              <p style="margin: 0; font-size: 14px; color: #64748b;">O teu Código Único de Inscrição:</p>
              <h3 style="margin: 5px 0 0 0; color: #0f172a; font-size: 24px; letter-spacing: 2px;">${registrationCode}</h3>
            </div>
            <p>Guarda este código, pois será o teu bilhete de acesso no dia do evento.</p>
            <p>Fica atento à tua caixa de correio para mais novidades e detalhes sobre o cronograma. Estamos ansiosos por te receber!</p>
            <br/>
            <p>Até breve,</p>
            <p><strong>Equipa Marketing | Digitalent'26</strong></p>
          </div>
        `
      };

      await transporter.sendMail(mailOptionsAdmin);
      await transporter.sendMail(mailOptionsParticipant);
    } else {
      console.warn("⚠️ SMTP_PASS não configurado no .env. Ignorando envio de e-mail de participante.");
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
          </div>
        `
      };

      await transporter.sendMail(mailOptionsAdmin);
      await transporter.sendMail(mailOptionsPartner);
    } else {
      console.warn("⚠️ SMTP_PASS não configurado no .env. Ignorando envio de e-mail de parceiro.");
    }

    res.status(200).json({ success: true, message: "Candidatura submetida com sucesso." });
  } catch (error: any) {
    console.error("Erro no registo de parceiro:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
});

const PORT = 3001;
app.listen(PORT, () => console.log(`🚀 API de Automação do WhatsApp ativa na porta ${PORT}`));
