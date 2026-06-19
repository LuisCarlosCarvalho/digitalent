import type { FC } from 'react';
import { Typography, Row, Col, Card, Button, Grid, Space } from 'antd';
import { GoogleOutlined, CompassOutlined, EnvironmentFilled } from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const { useBreakpoint } = Grid;

const LocationSection: FC = () => {
  const screens = useBreakpoint();

  const sponsors = [
    { name: 'Deixe sua Marca', url: 'https://i.imgur.com/1USX4Kp.png' },
    { name: 'Patrocinador 1', url: 'https://i.imgur.com/n0g2qAC.png' },
    { name: 'Patrocinador 2', url: 'https://i.imgur.com/SFWphsk.png' },
    { name: 'Patrocinador 3', url: 'https://i.imgur.com/Plb9o3i.png' },
    { name: 'Patrocinador 4', url: 'https://i.imgur.com/EpDGrzT.png' },
  ];

  return (
    <section id="informacoes" style={{ background: '#ffffff' }}>

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
                IEFP Rio Meão
              </Title>
              
              <Paragraph style={{ color: '#475569', fontSize: '1.1rem', marginBottom: '32px', lineHeight: 1.6 }}>
                Auditório do IEFP - Rio Meão.<br />
                Morada. Av. de Santiago, 88, 4520-462 Rio Meã.
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
                    color: '#000000',
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
