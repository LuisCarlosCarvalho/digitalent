import React from 'react';
import { Typography, Row, Col, Space, Card, Divider, Button, Grid } from 'antd';
import { EnvironmentOutlined, PhoneOutlined, MailOutlined, GoogleOutlined, CompassOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { useBreakpoint } = Grid;

const LocationSection: React.FC = () => {
  const screens = useBreakpoint();

  return (
    <section id="informacoes" style={{ padding: screens.xs ? '60px 5%' : '120px 5%', background: 'var(--bg-base)' }}>
      <div style={{ marginBottom: screens.xs ? '40px' : '60px' }}>
        <Title level={2} style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: 'var(--text-main)' }}>Onde será o Digitalent 26</Title>
        <Paragraph style={{ fontSize: '1.2rem', color: 'var(--text-sec)' }}>Prepare-se para um dia de imersão total no IEFP de Rio Meão.</Paragraph>
      </div>

      <Row gutter={[64, 64]} align="middle">
        <Col xs={24} md={12}>
          <Space orientation="vertical" size={screens.xs ? 30 : 40} style={{ width: '100%' }}>
            <div>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', marginBottom: '32px' }}>
                <EnvironmentOutlined style={{ fontSize: '28px', color: '#2563eb', marginTop: '5px' }} />
                <div>
                  <Text strong style={{ fontSize: '1.2rem', display: 'block', color: 'var(--text-main)' }}>Endereço</Text>
                  <Text style={{ fontSize: '1.1rem', color: 'var(--text-sec)' }}>Av. Santiago 68-88, Rio Meão - Auditório do IEFP</Text>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', marginBottom: '32px' }}>
                <PhoneOutlined style={{ fontSize: '28px', color: '#2563eb', marginTop: '5px' }} />
                <div>
                  <Text strong style={{ fontSize: '1.2rem', display: 'block', color: 'var(--text-main)' }}>Telefone</Text>
                  <Text style={{ fontSize: '1.1rem', color: 'var(--text-sec)' }}>999 999 999</Text>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', marginBottom: '32px' }}>
                <MailOutlined style={{ fontSize: '28px', color: '#2563eb', marginTop: '5px' }} />
                <div>
                  <Text strong style={{ fontSize: '1.2rem', display: 'block', color: 'var(--text-main)' }}>Email</Text>
                  <Text style={{ fontSize: '1.1rem', color: 'var(--text-sec)' }}>contato@digitalent.pt</Text>
                </div>
              </div>
            </div>

            <Card style={{ background: 'var(--bg-alt)', borderColor: 'var(--border-color)', borderRadius: '16px' }}>
              <Title level={5} style={{ color: '#2563eb', marginBottom: '16px' }}>Horário do Evento</Title>
              <Space orientation="vertical" style={{ width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Text style={{ color: 'var(--text-sec)' }}>Início</Text>
                  <Text strong style={{ color: 'var(--text-main)' }}>10:00</Text>
                </div>
                <Divider style={{ margin: '8px 0', borderColor: 'var(--border-color)' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Text style={{ color: 'var(--text-sec)' }}>Almoço</Text>
                  <Text strong style={{ color: 'var(--text-main)' }}>12:00 - 13:00</Text>
                </div>
                <Divider style={{ margin: '8px 0', borderColor: 'var(--border-color)' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Text style={{ color: 'var(--text-sec)' }}>Encerramento</Text>
                  <Text strong style={{ color: 'var(--text-main)' }}>17:00</Text>
                </div>
              </Space>
            </Card>
          </Space>
        </Col>

        <Col xs={24} md={12}>
          <div style={{ 
            position: 'relative', 
            borderRadius: '30px', 
            overflow: 'hidden', 
            height: screens.xs ? '400px' : '500px',
            background: 'var(--bg-alt)',
            border: '1px solid #e2e8f0',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            padding: screens.xs ? '20px' : '40px'
          }}>
            <div style={{ 
              position: 'absolute', 
              top: 0, left: 0, right: 0, bottom: 0, 
              opacity: 0.05, 
              backgroundImage: 'radial-gradient(#2563eb 1px, transparent 1px)', 
              backgroundSize: '20px 20px' 
            }} />
            
            <div style={{ position: 'relative', zIndex: 2, width: '100%' }}>
              <EnvironmentOutlined style={{ fontSize: '64px', color: '#2563eb', marginBottom: '24px' }} />
              <Title level={3} style={{ color: 'var(--text-main)' }}>Localização Exata</Title>
              <Paragraph style={{ color: 'var(--text-sec)', marginBottom: '40px' }}>
                Auditório do IEFP - Rio Meão.<br />Estacionamento gratuito disponível no local.
              </Paragraph>
              
              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <Button 
                  block 
                  size="large" 
                  type="primary"
                  icon={<GoogleOutlined />} 
                  href="https://www.google.com/maps/search/?api=1&query=Av.+Santiago+68-88,+Rio+Meão+-+Auditório+do+IEFP" 
                  target="_blank"
                  style={{ height: '56px', borderRadius: '12px', fontSize: '1.1rem', fontWeight: 600 }}
                >
                  Abrir no Google Maps
                </Button>
                <Button 
                  block 
                  size="large" 
                  icon={<CompassOutlined />} 
                  href="https://waze.com/ul?q=Av.%20Santiago%2068-88,%20Rio%20Meão" 
                  target="_blank"
                  style={{ height: '56px', borderRadius: '12px', fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-main)', borderColor: 'var(--border-color)' }}
                >
                  Abrir no Waze
                </Button>
              </Space>
            </div>
          </div>
        </Col>
      </Row>
    </section>
  );
};

export default LocationSection;
