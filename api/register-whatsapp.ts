import type { VercelRequest, VercelResponse } from '@vercel/node';
import PDFDocument from 'pdfkit';
import axios from 'axios';
import nodemailer from 'nodemailer';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS Configuration
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ success: false, error: 'Method Not Allowed' });
    return;
  }

  const { formType, name, email, phone, company, sponsorshipLevel, adminNumber } = req.body;
  const ADMIN_WHATSAPP_NUMBER = "351964300708";
  const targetNumber = adminNumber || ADMIN_WHATSAPP_NUMBER;

  try {
    // 1. Instanciar e Criar o PDF em memória (Buffer)
    const doc = new PDFDocument({ margin: 50 });
    const buffers: Buffer[] = [];
    
    doc.on('data', (chunk: Buffer) => buffers.push(chunk));
    
    await new Promise<void>((resolve, reject) => {
      doc.on('end', async () => {
        try {
          const pdfBuffer = Buffer.concat(buffers);
          const textMessage = `*Novo Registo Digitalent26*\n\n*Tipo:* ${formType}\n*Nome:* ${name}\n*Email:* ${email}\n*Telemóvel:* ${phone}\n${company ? `*Empresa:* ${company}\n` : ''}${sponsorshipLevel ? `*Nível de Patrocínio:* ${sponsorshipLevel}\n` : ''}`;

          // 2. Enviar E-mail de Notificação com o PDF anexo
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

              const mailOptions = {
                from: `"Digitalent26" <${smtpUser}>`,
                to: receiverEmail,
                subject: `📢 Nova Inscrição (${formType}) - ${name}`,
                text: `Olá,\n\nUma nova inscrição foi realizada no site Digitalent26!\n\nDetalhes da Inscrição:\n---------------------------\nTipo: ${formType}\nNome: ${name}\nE-mail: ${email}\nTelemóvel: ${phone}\n${company ? `Empresa: ${company}\n` : ''}${sponsorshipLevel ? `Nível de Patrocínio: ${sponsorshipLevel}\n` : ''}\nO comprovativo em PDF está anexado a este e-mail.\n\nAtenciosamente,\nDigitalent26 Core SaaS`,
                attachments: [
                  {
                    filename: `Inscricao_${name.replace(/\s+/g, '_')}.pdf`,
                    content: pdfBuffer,
                  },
                ],
              };

              await transporter.sendMail(mailOptions);
              console.log(`📧 E-mail de confirmação enviado para ${receiverEmail}`);
            } else {
              console.warn("⚠️ SMTP_PASS não configurado no .env / Vercel. Ignorando envio de e-mail.");
            }
          } catch (emailError) {
            console.error("❌ Erro ao enviar e-mail de notificação:", emailError);
          }

          // 3. Comunicação Invisível com a API de Integração do WhatsApp
          const base64Pdf = pdfBuffer.toString('base64');
          
          try {
            if (!process.env.WHATSAPP_API_URL || !process.env.WHATSAPP_API_TOKEN) {
              console.warn("⚠️ WHATSAPP_API_URL ou TOKEN não configurados no .env / Vercel. O registo foi processado mas a mensagem não foi enviada.");
              resolve();
              return;
            }

            await axios.post(`${process.env.WHATSAPP_API_URL}/send-document`, {
              number: targetNumber,
              caption: textMessage,
              document: `data:application/pdf;base64,${base64Pdf}`,
              fileName: `Inscricao_${name.replace(/\s+/g, '_')}.pdf`
            }, {
              headers: { 'Authorization': `Bearer ${process.env.WHATSAPP_API_TOKEN}` }
            });

            resolve();
          } catch (apiError) {
            console.error("Erro na API do WhatsApp:", apiError);
            // Resolvemos de qualquer forma para não travar a resposta HTTP
            resolve();
          }
        } catch (err) {
          reject(err);
        }
      });

      doc.on('error', (err) => {
        reject(err);
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
      
      doc.moveDown(3);
      doc.fontSize(10).fillColor('#94a3b8').text('Emitido automaticamente pela plataforma Digitalent26 Core SaaS.', { align: 'center' });

      doc.end();
    });

    return res.status(200).json({ success: true, message: "Registo processado com sucesso." });

  } catch (error: any) {
    console.error("Erro interno no envio:", error);
    return res.status(500).json({ success: false, error: "Erro ao processar e disparar fluxo automático." });
  }
}
