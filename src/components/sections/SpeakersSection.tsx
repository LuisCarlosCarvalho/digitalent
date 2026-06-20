import React from 'react';
import { Typography, Row, Col, Grid, Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

const speakers = [
  // --- ORADOR 1 ---
  { 
    id: 1,
    name: "Orador Confirmado", 
    role: "Estratégia de Crescimento Exponencial", 
    company: "DIGITALENT",
    expertise: "Estratégia de Crescimento Exponencial",
    shortBio: "Brevemente anunciaremos o especialista que irá conduzir este tema e desconstruir os processos de growth para escalar negócios de forma sustentável.",
    image: "https://i.imgur.com/5Q8Y4sI.png" 
  },
  // --- ORADOR 2 ---
  { 
    id: 2,
    name: "Orador Confirmado", 
    role: "Tráfego Pago para Comércio Local", 
    company: "DIGITALENT",
    expertise: "Tráfego Pago para Comércio Local",
    shortBio: "Brevemente anunciaremos o especialista focado no Retorno sobre o Investimento, que atrai clientes reais todos os dias para lojas físicas.",
    image: "https://i.imgur.com/5Q8Y4sI.png" 
  },
  // --- ORADOR 3 ---
  { 
    id: 3,
    name: "Orador Confirmado", 
    role: "Copywriting e Frameworks de Venda", 
    company: "DIGITALENT",
    expertise: "Copywriting e Frameworks de Venda",
    shortBio: "Brevemente anunciaremos o estratega por trás das narrativas e copys que convertem curiosos em clientes pagantes de alta performance.",
    image: "https://i.imgur.com/5Q8Y4sI.png" 
  },
  // --- ORADOR 4 ---
  { 
    id: 4,
    name: "Orador Confirmado", 
    role: "Gestão de Comunidades e Redes Sociais", 
    company: "DIGITALENT",
    expertise: "Gestão de Comunidades e Redes Sociais",
    shortBio: "Brevemente anunciaremos o especialista em criar ligações autênticas através das redes sociais, transformando seguidores em clientes fiéis.",
    image: "https://i.imgur.com/5Q8Y4sI.png" 
  },
  // --- ORADOR 5 ---
  { 
    id: 5,
    name: "Orador Confirmado", 
    role: "Análise de Dados e Business Intelligence", 
    company: "DIGITALENT",
    expertise: "Análise de Dados e Business Intelligence",
    shortBio: "Brevemente anunciaremos o mestre dos números que transforma dados complexos em insights práticos para tomada de decisão e otimização.",
    image: "https://i.imgur.com/5Q8Y4sI.png" 
  },
  // --- ORADOR 6 ---
  { 
    id: 6,
    name: "Orador Confirmado", 
    role: "Posicionamento de Marca e Identidade", 
    company: "DIGITALENT",
    expertise: "Posicionamento de Marca e Identidade",
    shortBio: "Brevemente anunciaremos o designer que constrói marcas inesquecíveis, destacando-as num mercado cada vez mais competitivo.",
    image: "https://i.imgur.com/5Q8Y4sI.png" 
  }
];

const SpeakersSection: React.FC = () => {
  const screens = useBreakpoint();

  return (
    <section id="oradores" style={{ padding: screens.xs ? '60px 5%' : '100px 5%', background: 'var(--bg-base)' }}>
      <div style={{ textAlign: 'center', marginBottom: screens.xs ? '40px' : '60px' }}>
        <Title level={2} style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'var(--text-main)', marginBottom: '16px', textTransform: 'uppercase' }}>Oradores Confirmados</Title>
        <Text style={{ fontSize: '1.1rem', color: 'var(--text-sec)' }}>Especialistas prontos para partilhar o caminho do sucesso.</Text>
      </div>

      <style>
        {`
          .speaker-card {
            position: relative;
            overflow: hidden;
            aspect-ratio: 1 / 1;
            cursor: pointer;
            border-radius: 20px;
            box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.15);
            transition: box-shadow 0.4s ease, transform 0.4s ease;
          }

          .speaker-card:hover {
            box-shadow: 0 20px 30px -5px rgba(37, 99, 235, 0.3);
            transform: translateY(-4px);
          }
          
          .speaker-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
          }
          
          .speaker-card:hover .speaker-image {
            transform: scale(1.08);
          }

          .speaker-info-gradient {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 50px 20px 20px;
            background: linear-gradient(to top, rgba(0, 0, 0, 0.95) 0%, rgba(0,0,0,0.6) 40%, transparent 100%);
            transition: opacity 0.4s ease;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
          }

          .speaker-card:hover .speaker-info-gradient {
            opacity: 0;
            pointer-events: none;
          }

          .speaker-hover-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, rgba(59, 130, 246, 0.95), rgba(29, 78, 216, 0.95));
            opacity: 0;
            transition: opacity 0.4s cubic-bezier(0.25, 1, 0.5, 1);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 30px;
            text-align: center;
            z-index: 10;
          }

          .speaker-card:hover .speaker-hover-overlay {
            opacity: 1;
          }
        `}
      </style>

      <Row gutter={[24, 24]} justify="center">
        {speakers.map((speaker, index) => (
          <Col xs={24} sm={12} md={8} key={index}>
            <div className="speaker-card">
              <img 
                src={speaker.image} 
                alt={speaker.name} 
                className="speaker-image"
              />
              
              {/* Default State */}
              <div className="speaker-info-gradient">
                <Text style={{ color: '#ffffff', fontSize: '1.6rem', fontWeight: 800, marginBottom: '4px', fontFamily: "'Inter', sans-serif" }}>
                  {speaker.name}
                </Text>
                <Text style={{ color: '#f8fafc', fontSize: '1.05rem', fontWeight: 400, marginBottom: '8px' }}>
                  {speaker.role}
                </Text>
                <Text style={{ color: '#60a5fa', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.5px' }}>
                  {speaker.company}
                </Text>
              </div>

              {/* Hover State */}
              <div className="speaker-hover-overlay">
                <Text style={{ color: '#ffffff', fontSize: '1.8rem', fontWeight: 800, marginBottom: '8px', fontFamily: "'Inter', sans-serif" }}>
                  {speaker.name}
                </Text>
                <Text style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '1.05rem', fontStyle: 'italic', marginBottom: '20px' }}>
                  {speaker.expertise}
                </Text>
                <Text style={{ color: '#ffffff', fontSize: '1rem', lineHeight: 1.6, fontWeight: 500, marginBottom: '24px' }}>
                  {speaker.shortBio}
                </Text>
                <Button 
                  type="default" 
                  shape="round" 
                  icon={<ArrowRightOutlined />}
                  style={{
                    background: 'transparent',
                    color: '#ffffff',
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                    fontWeight: 600
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#ffffff';
                    e.currentTarget.style.color = '#2563eb';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#ffffff';
                  }}
                >
                  Saber mais
                </Button>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </section>
  );
};

export default SpeakersSection;
