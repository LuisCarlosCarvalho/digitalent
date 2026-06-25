import React from 'react';
import { Typography, Row, Col, Grid, Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

const speakers = [
  // --- ORADOR 1 ---
  { 
    id: 1,
    name: "Arménio Ganga", 
    role: "Gestão de Inteligência Artificial na Era Digital", 
    company: "GANGAS DIGITAL",
    expertise: "Gestão de Inteligência Artificial na Era Digital",
    shortBio: "Especialista em Growth Hacking e Marketing de Performance (Google Partner), focado em maximizar o ROI de negócios através de campanhas de tráfego pago e estratégias de aquisição digital.\n\nCom mais de 9 anos de experiência, geri o crescimento de mais de 500 empresas, supervisionando atualmente carteiras de investimento (PPC) superiores a 100.000 € por mês.\n\nAdoto um método de trabalho transparente e orientado a resultados, garantindo alinhamento estratégico, eficiência e escalabilidade em cada projeto.",
    image: "https://i.imgur.com/PBEY1If.jpeg",
    linkedin: "https://www.linkedin.com/in/armenioganga"
  },
  // --- ORADOR 2 ---
  { 
    id: 2,
    name: "Diogo Gaspar", 
    role: "Gestão da Transformação Digital", 
    company: "IA & AUTOMAÇÃO (ASCENDIA)",
    expertise: "Gestão da Transformação Digital",
    shortBio: "A maioria das imobiliárias perde leads todos os dias.\nNão por falta de investimento em marketing — mas porque ninguém responde rápido o suficiente, o follow-up morre ao terceiro contacto, e os leads \"frios\" ficam esquecidos no CRM.\n\nEu criei a Ascendia para resolver exatamente isto.\nConstruo sistemas com inteligência artificial e automação que tratam dos processos que drenam tempo e perdem dinheiro — para que as equipas comerciais se foquem no que realmente importa: fechar negócios.\nSe perdes leads, tens processos lentos, ou a tua equipa gasta tempo em tarefas que deviam ser automáticas — vamos conversar.\n🌐 ascendia.pt\n📩 diogo@ascendia.pt",
    image: "https://i.imgur.com/5Q8Y4sI.png",
    linkedin: "https://www.linkedin.com/in/diogo-gaspar-916544340"
  },
  // --- ORADOR 3 ---
  { 
    id: 3,
    name: "Edgar Alves", 
    role: "Dados e Tomada de Decisão no Digital", 
    company: "MULTIMAKING SPORTS",
    expertise: "Dados e Tomada de Decisão no Digital",
    shortBio: "Nos bastidores do desporto, há histórias que merecem ser contadas com profundidade.\nProduzimos podcasts e conteúdo estratégico que transformam essas histórias em autoridade para marcas.\nComunicação com propósito, consistência e impacto.\n📲 @multimaking.sports",
    image: "https://i.imgur.com/nQD2c9Q.jpeg",
    linkedin: "https://www.instagram.com/multimaking.sports?igsh=cXA3Y3Z3OThoM3Bu&utm_source=qr"
  },
  // --- ORADOR 4 ---
  { 
    id: 4,
    name: "Filipe Duarte", 
    role: "Gestão e Automação com IA", 
    company: "IA & AUTOMAÇÃO (ASCENDIA)",
    expertise: "Gestão e Automação com IA",
    shortBio: "Trabalho com automação e inteligência artificial porque vi, na prática, como a maioria das empresas perde oportunidades todos os dias.\nAo longo do tempo, comecei a reparar em padrões: tarefas repetitivas, processos pouco claros e uma dependência excessiva de intervenção humana para coisas que já poderiam ser sistematizadas.\nAinda existe uma aversão ao uso de IA, mas isto porque a maioria das pessoas não sabe o impacto que uma automação no seu negócio pode ter com o uso da IA.\nGosto de dizer aos meus clientes que uma automação com IA é como um ajudante que vai te surpreender quando tu decides delegar uma tarefa.",
    image: "https://i.imgur.com/5Q8Y4sI.png",
    linkedin: "https://www.linkedin.com/in/filipe-duarte-969372309"
  },
  // --- ORADOR 5 ---
  { 
    id: 5,
    name: "Inês Sá Silva", 
    role: "Redes Sociais e Marketing de Influência na Era da IA", 
    company: "Digital Experience (DX)",
    expertise: "Redes Sociais e Marketing de Influência na Era da IA",
    shortBio: "Inês é especialista em Social Media e Marketing orientado por dados, com formação em Gestão e mestrado na área de Data-Driven Marketing. Atualmente a aprofundar competências em Content Marketing, combina pensamento analítico com criatividade para desenvolver estratégias digitais eficazes e orientadas para resultados.\n\nCom experiência em e-commerce, finanças e gestão de redes sociais, destaca-se pela sua visão estratégica, capacidade de liderança e foco na performance. A sua abordagem prática e orientada para impacto promete trazer insights relevantes e aplicáveis a quem procura evoluir na área do marketing digital.",
    image: "https://i.imgur.com/gVJhUZD.jpeg",
    linkedin: "https://www.linkedin.com/in/ines-sa-silva"
  },
  // --- ORADOR 6 ---
  { 
    id: 6,
    name: "Ricardo Carneiro", 
    role: "Estratégia digital & gestão de marcas", 
    company: "BLUE BOLT AGENCY",
    expertise: "Estratégia digital & gestão de marcas",
    shortBio: "Marketing Digital | CMO\nLicenciado em Ciências da Comunicação, Mestre em Multimédia com especialização em Educação, mas foi no Marketing que descobri a minha verdadeira vocação, concluindo em 2018 o Mestrado em Marketing na Universidade de Aveiro. Atualmente sou Head of Marketing na Blue Bolt Agency.",
    image: "https://i.imgur.com/VTRsQ0k.jpeg",
    linkedin: "https://www.linkedin.com/in/ricardo-doria-carneiro"
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
            z-index: 10;
            display: flex;
            flex-direction: column;
          }

          .speaker-hover-content {
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 20px;
            text-align: center;
          }

          .speaker-bio-text {
            color: #ffffff;
            font-size: 0.95rem;
            line-height: 1.5;
            font-weight: 500;
            margin-bottom: 20px;
            display: -webkit-box;
            -webkit-line-clamp: 5;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: pre-wrap;
          }

          .speaker-hover-name {
            color: #ffffff;
            font-size: 1.8rem;
            font-weight: 800;
            margin-bottom: 8px;
            font-family: 'Inter', sans-serif;
          }

          .speaker-hover-expertise {
            color: rgba(255, 255, 255, 0.9);
            font-size: 1.05rem;
            font-style: italic;
            margin-bottom: 20px;
          }

          @media (max-width: 768px) {
            .speaker-card {
              aspect-ratio: 3 / 4; /* provide a bit more vertical room on mobile */
            }
            .speaker-hover-content {
              padding: 15px;
            }
            .speaker-hover-name {
              font-size: 1.5rem;
              margin-bottom: 4px;
            }
            .speaker-hover-expertise {
              font-size: 0.9rem;
              margin-bottom: 12px;
            }
            .speaker-bio-text {
              font-size: 0.85rem;
              margin-bottom: 16px;
              line-height: 1.4;
              -webkit-line-clamp: 6; /* allow one more line on mobile since text is smaller */
            }
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
                <div className="speaker-hover-content">
                  <Text className="speaker-hover-name">
                    {speaker.name}
                  </Text>
                  <Text className="speaker-hover-expertise">
                    {speaker.expertise}
                  </Text>
                  <Text className="speaker-bio-text">
                    {speaker.shortBio}
                  </Text>
                  <Button 
                    type="default" 
                    shape="round" 
                    icon={<ArrowRightOutlined />}
                    href={speaker.linkedin || undefined}
                    target={speaker.linkedin ? "_blank" : undefined}
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
            </div>
          </Col>
        ))}
      </Row>
    </section>
  );
};

export default SpeakersSection;
