import express from 'express';
import cors from 'cors';
import PDFDocument from 'pdfkit';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Número do Administrador configurado por si
const ADMIN_WHATSAPP_NUMBER = "351964300708"; 

app.post('/api/register-whatsapp', async (req, res) => {
  const { formType, name, email, phone, company, sponsorshipLevel, adminNumber } = req.body;

  // Usa o número enviado pelo frontend ou o padrão configurado acima
  const targetNumber = adminNumber || ADMIN_WHATSAPP_NUMBER;

  try {
    // 1. Instanciar e Criar o PDF em memória (Buffer)
    const doc = new PDFDocument({ margin: 50 });
    const buffers: Buffer[] = [];
    
    doc.on('data', (chunk: Buffer) => buffers.push(chunk));
    doc.on('end', async () => {
      const pdfBuffer = Buffer.concat(buffers);

      // 2. Preparar os dados para envio
      const textMessage = `*Novo Registo Digitalent26*\n\n*Tipo:* ${formType}\n*Nome:* ${name}\n*Email:* ${email}\n*Telemóvel:* ${phone}\n${company ? `*Empresa:* ${company}\n` : ''}${sponsorshipLevel ? `*Nível de Patrocínio:* ${sponsorshipLevel}\n` : ''}`;

      // 3. Comunicação Invisível com a API de Integração do WhatsApp
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
    
    doc.moveDown(3);
    doc.fontSize(10).fillColor('#94a3b8').text('Emitido automaticamente pela plataforma Digitalent26 Core SaaS.', { align: 'center' });

    doc.end();

  } catch (error: unknown) {
    console.error("Erro interno no envio invisível:", error);
    res.status(500).json({ success: false, error: "Erro ao processar e disparar fluxo automático." });
  }
});

const PORT = 3001;
app.listen(PORT, () => console.log(`🚀 API de Automação do WhatsApp ativa na porta ${PORT}`));
