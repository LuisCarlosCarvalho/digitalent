import { FC } from 'react';
import { Typography, Row, Col, Card, Button, Grid, Space } from 'antd';
import { GoogleOutlined, CompassOutlined, EnvironmentFilled } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { useBreakpoint } = Grid;

const LocationSection: FC = () => {
  const screens = useBreakpoint();

  const sponsors = [
    { name: 'Google', url: 'https://i.imgur.com/UgYNeIO.png' }, // Using logo for placeholder
    { name: 'CISCO', url: 'https://i.imgur.com/UgYNeIO.png' },
    { name: 'Letira', url: 'https://i.imgur.com/UgYNeIO.png' },
    { name: 'Salesforce', url: 'https://i.imgur.com/UgYNeIO.png' },
    { name: 'HubSpot', url: 'https://i.imgur.com/UgYNeIO.png' },
    { name: 'Stripe', url: 'https://i.imgur.com/UgYNeIO.png' },
  ];

  return (
    <section id="informacoes" style={{ background: '#ffffff' }}>
      {/* Sponsors Grid Section */}
      <div style={{ padding: screens.xs ? '60px 5%' : '80px 5%', textAlign: 'center' }}>
        <Title level={3} style={{ color: '#1e293b', marginBottom: '40px', fontWeight: 700 }}>
          Parceiros de Confiança
        </Title>
        
        <Row gutter={[32, 32]} justify="center" align="middle">
          {sponsors.map((sponsor) => (
            <Col key={sponsor.name} xs={12} sm={8} md={4}>
              <div style={{ 
                height: '80px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                filter: 'grayscale(100%) brightness(1.2)',
                opacity: 0.6,
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.filter = 'grayscale(0%)';
                e.currentTarget.style.opacity = '1';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.filter = 'grayscale(100%) brightness(1.2)';
                e.currentTarget.style.opacity = '0.6';
              }}
              >
                <img src={sponsor.url} alt={sponsor.name} style={{ maxWidth: '100%', maxHeight: '40px', objectFit: 'contain' }} />
              </div>
            </Col>
          ))}
        </Row>

        <div style={{ marginTop: '40px' }}>
          <Text style={{ color: '#64748b' }}>
            Quer ser um patrocinador?{' '}
            <a href="mailto:contato@digitalent.pt" style={{ color: '#2563eb', fontWeight: 600 }}>
              Entre em contacto pelo email: contato@digitalent.pt
            </a>
          </Text>
        </div>
      </div>

      {/* Exact Location Section */}
      <div style={{ 
        position: 'relative', 
        height: screens.xs ? '600px' : '700px', 
        width: '100%',
        overflow: 'hidden',
        background: '#f8fafc'
      }}>
        {/* Map Background */}
        <div style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          zIndex: 1 
        }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3013.916183921!2d-8.583!3d40.916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd238f9!2zQXYuIFNhbnRpYWdvIDY4LTg4LCA0NTIwLTQ3MSBSaW8gTWXDo28!5e0!3m2!1spt!2spt!4v1"
            width="100%"
            height="100%"
            style={{ border: 0, filter: 'contrast(1.1) brightness(1.05)' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Location Card Overlay */}
        <div style={{ 
          position: 'relative', 
          zIndex: 2, 
          height: '100%', 
          display: 'flex', 
          alignItems: 'center', 
          padding: '0 5%' 
        }}>
          <Card
            bordered={false}
            style={{
              width: '100%',
              maxWidth: '450px',
              borderRadius: '24px',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              background: '#ffffff',
            }}
            styles={{ body: { padding: screens.xs ? '32px 24px' : '40px' } }}
          >
            <div style={{ textAlign: 'center' }}>
              <EnvironmentFilled style={{ fontSize: '48px', color: '#2563eb', marginBottom: '24px' }} />
              
              <Title level={2} style={{ color: '#1e293b', marginBottom: '16px', fontWeight: 800 }}>
                Localização Exata
              </Title>
              
              <Paragraph style={{ color: '#475569', fontSize: '1.1rem', marginBottom: '32px', lineHeight: 1.6 }}>
                Auditório do IEFP - Rio Meão.<br />
                Estacionamento gratuito disponível no local.
              </Paragraph>

              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <Button
                  type="primary"
                  block
                  size="large"
                  icon={<GoogleOutlined />}
                  href="https://www.google.com/maps/search/?api=1&query=Av.+Santiago+68-88,+Rio+Meão+-+Auditório+do+IEFP"
                  target="_blank"
                  style={{
                    height: '56px',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    fontWeight: 700,
                    background: '#2563eb',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px'
                  }}
                >
                  Abrir no Google Maps
                </Button>
                
                <Button
                  block
                  size="large"
                  icon={<CompassOutlined />}
                  href="https://waze.com/ul?q=Av.%20Santiago%2068-88,%20Rio%20Meão"
                  target="_blank"
                  style={{
                    height: '56px',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: '#1e293b',
                    borderColor: '#e2e8f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px'
                  }}
                >
                  Abrir no Waze
                </Button>
              </Space>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
