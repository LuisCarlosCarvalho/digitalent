import React from 'react';
import { Row, Col, Typography, Button, ConfigProvider } from 'antd';
import CountdownTimer from './CountdownTimer';
import NetworkBackground from '../NetworkBackground';

const { Title, Paragraph } = Typography;

const MainHeroPage: React.FC = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "'Inter', sans-serif",
        }
      }}
    >
      <section style={{ 
        position: 'relative',
        minHeight: '80vh',
        display: 'flex',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, rgba(224, 251, 245, 0.88) 0%, rgba(224, 242, 254, 0.88) 100%), url("https://i.imgur.com/DlYA1td.jpeg") center/cover no-repeat',
      }}>
        <style>
          {`
            .hero-right-bg {
              background: linear-gradient(135deg, #4fd1c5 0%, #3b82f6 100%);
              position: absolute;
              top: 0; bottom: 0; left: 0; right: 0;
              z-index: 0;
              opacity: 0.9;
            }
            @media (min-width: 768px) {
              .hero-right-bg {
                clip-path: polygon(15% 0, 100% 0, 100% 100%, 0 100%);
              }
            }
            .hero-right-content {
              padding: 60px 5% 60px 5%;
            }
            @media (min-width: 768px) {
              .hero-right-content {
                padding: 40px 5% 40px 20%;
              }
            }
          `}
        </style>
        
        <Row style={{ width: '100%', margin: 0 }}>
          
          {/* Left Side: Logo and Countdown */}
          <Col xs={24} md={12} style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            alignItems: 'center',
            padding: '40px 20px',
            position: 'relative',
            zIndex: 1,
            minHeight: '400px'
          }}>
            <img 
              src="https://i.imgur.com/EpDGrzT.png" 
              alt="Digitalent26" 
              style={{ maxWidth: '100%', width: '550px', marginBottom: '30px' }} 
            />
            
            <div style={{ marginTop: '10px' }}>
              <CountdownTimer />
            </div>
          </Col>

          {/* Right Side: Blue Angled Overlay & Text */}
          <Col xs={24} md={12} style={{ position: 'relative', minHeight: '400px' }}>
            {/* The blue angled shape */}
            <div className="hero-right-bg" />
            
            {/* Network Particles Background Overlay */}
            <div 
              className="hero-right-bg"
              style={{
                zIndex: 1, // Same as background but above the gradient
                pointerEvents: 'none',
                background: 'transparent'
              }}
            >
              <NetworkBackground />
            </div>
            
            {/* Content inside the right side */}
            <div 
              className="hero-right-content"
              style={{
                position: 'relative',
                zIndex: 2,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Title style={{ 
                color: 'white', 
                fontSize: 'clamp(3rem, 6vw, 5rem)', 
                fontWeight: 800,
                lineHeight: 1.1,
                marginBottom: '20px',
                textTransform: 'uppercase',
                fontFamily: "'Inter', sans-serif"
              }}>
                ELEVE O SEU<br/>
                <span style={{ color: '#1e3a8a', textTransform: 'none', fontWeight: 500 }}>Negócio Local</span><br/>
                À ERA DIGITAL
              </Title>

              <Paragraph style={{ 
                color: '#0f172a', 
                fontSize: '1.4rem', 
                fontWeight: 500,
                maxWidth: '550px',
                marginBottom: '40px',
                lineHeight: 1.6,
                fontFamily: "'Inter', sans-serif"
              }}>
                Descubra estratégias práticas para aumentar a sua visibilidade, atrair mais clientes e fazer crescer o seu negócio através do digital.
              </Paragraph>

              <div>
                <Button 
                  type="primary"
                  shape="round"
                  size="large"
                  onClick={() => {
                    const el = document.getElementById('inscricao');
                    if(el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  style={{
                    height: '56px',
                    padding: '0 40px',
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    background: 'linear-gradient(90deg, #06b6d4, #2563eb)',
                    border: 'none',
                    boxShadow: '0 10px 20px rgba(6, 182, 212, 0.3)'
                  }}
                >
                  INSCREVA-SE AGORA
                </Button>
              </div>
            </div>
          </Col>

        </Row>
      </section>
    </ConfigProvider>
  );
};

export default MainHeroPage;
