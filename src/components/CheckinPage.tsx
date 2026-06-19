import React, { useState } from 'react';
import { Typography, Input, Button, message, ConfigProvider } from 'antd';
import { QrcodeOutlined, CheckCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const CheckinPage: React.FC = () => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleConfirm = async () => {
    if (!code.trim()) {
      message.error('Por favor, insira o seu Código Único.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/checkin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: code.trim().toUpperCase() })
      });
      const data = await res.json();

      if (data.success) {
        setSuccess(true);
        message.success('Presença confirmada com sucesso!');
        
        // Redirecionamento automático após 2 segundos
        setTimeout(() => {
          if (data.qaLink) {
            window.location.href = data.qaLink;
          }
        }, 2000);

      } else {
        message.error(data.error || 'Código inválido ou não encontrado.');
      }
    } catch (e) {
      message.error('Erro de ligação ao servidor.');
    }
    setLoading(false);
  };

  if (success) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#0a0f1d', padding: '20px', textAlign: 'center' }}>
        <CheckCircleOutlined style={{ fontSize: '80px', color: '#22c55e', marginBottom: '24px' }} />
        <Title level={2} style={{ color: '#fff', marginBottom: '16px' }}>Confirmado!</Title>
        <Paragraph style={{ color: '#94a3b8', fontSize: '16px', maxWidth: '400px' }}>
          A tua presença foi confirmada e o kit está liberado. Vais ser redirecionado(a) para o painel de perguntas em instantes...
        </Paragraph>
      </div>
    );
  }

  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#2563eb' } }}>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f8fafc', padding: '20px' }}>
        <div style={{ background: '#fff', padding: '40px 30px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', width: '100%', maxWidth: '420px', textAlign: 'center' }}>
          
          <div style={{ background: 'rgba(37, 99, 235, 0.1)', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
             <QrcodeOutlined style={{ fontSize: '40px', color: '#2563eb' }} />
          </div>

          <Title level={3} style={{ color: '#0f172a', marginBottom: '8px' }}>Validação de Entrada</Title>
          <Paragraph style={{ color: '#64748b', marginBottom: '32px' }}>
            Insere o Código Único que recebeste no email aquando da inscrição.
          </Paragraph>

          <Input 
            placeholder="Ex: DT26-A1B2C3" 
            value={code} 
            onChange={e => setCode(e.target.value)} 
            style={{ marginBottom: '24px', textAlign: 'center', fontSize: '18px', letterSpacing: '2px', height: '56px', borderRadius: '12px' }} 
            size="large"
            onPressEnter={handleConfirm}
          />
          
          <Button 
            type="primary" 
            block 
            size="large" 
            onClick={handleConfirm} 
            loading={loading} 
            style={{ height: '56px', fontSize: '16px', fontWeight: 600, borderRadius: '12px', background: '#2563eb' }}
          >
            Confirmar Presença
          </Button>

        </div>
      </div>
    </ConfigProvider>
  );
};

export default CheckinPage;
