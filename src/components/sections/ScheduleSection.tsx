import React from 'react';
import { Typography, Row, Col, Card, Button, Timeline, Grid } from 'antd';
import { RocketOutlined, ClockCircleOutlined, SolutionOutlined, BulbOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { useBreakpoint } = Grid;

interface ScheduleSectionProps {
  onRegisterClick: (tabKey: string) => void;
}

const ScheduleSection: React.FC<ScheduleSectionProps> = ({ onRegisterClick }) => {
  const screens = useBreakpoint();

  const sponsorLogos = [
    "https://i.imgur.com/n0g2qAC.png",
    "https://i.imgur.com/SFWphsk.png",
    "https://i.imgur.com/Plb9o3i.png",
    "https://i.imgur.com/EpDGrzT.png",
    "https://i.imgur.com/KvjOZO6.png",
    "https://i.imgur.com/bfYdCUW.png",
    "https://i.imgur.com/iFG6dJM.png",
    "https://i.imgur.com/Sayi70U.png",
    "https://i.imgur.com/Wi15eOJ.png",
    "https://i.imgur.com/0chPN8K.png",
    "https://i.imgur.com/9kdza66.png",
    "https://i.imgur.com/dKAKHTL.png",
    "https://i.imgur.com/woVb34r.png",
    "https://i.imgur.com/ornrxZ9.png",
    "https://i.imgur.com/lFpdYo0.png"
  ];

  return (
    <>
      {/* Schedule Section */}
      <section id="programa" style={{ padding: screens.xs ? '60px 5%' : '100px 5%', background: 'var(--bg-alt)' }}>
        <div style={{ textAlign: 'center', marginBottom: screens.xs ? '40px' : '60px' }}>
          <Title level={2} style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--text-main)' }}>PROGRAMA DO EVENTO</Title>
          <Text type="secondary" style={{ fontSize: '1.1rem', color: 'var(--text-sec)' }}>Um dia intensivo focado em resultados práticos.</Text>
        </div>
        
        <Row justify="center">
          <Col xs={24} md={22} lg={18}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <Timeline
                mode="left"
                            items={[
                {
                  label: <Text style={{ color: '#2563eb', fontWeight: 800, fontSize: '1rem', whiteSpace: 'nowrap' }}>09h00 - 09h30</Text>,
                  children: (
                    <div style={{ marginBottom: '24px', paddingLeft: '10px' }}>
                      <Title level={5} style={{ margin: 0, color: 'var(--text-main)', fontSize: '1.1rem', fontWeight: 700 }}>
                        Check-in & Receção de Participantes
                      </Title>
                      <Text style={{ color: 'var(--text-sec)', fontSize: '0.95rem' }}>
                        Acolhimento dos participantes e entrega de credenciais e materiais exclusivos do evento.
                      </Text>
                    </div>
                  ),
                  dot: <ClockCircleOutlined style={{ fontSize: '18px', color: '#2563eb' }} />,
                },
                {
                  label: <Text style={{ color: '#2563eb', fontWeight: 800, fontSize: '1rem', whiteSpace: 'nowrap' }}>09h30 - 09h45</Text>,
                  children: (
                    <div style={{ marginBottom: '24px', paddingLeft: '10px' }}>
                      <Title level={5} style={{ margin: 0, color: 'var(--text-main)', fontSize: '1.1rem', fontWeight: 700 }}>
                        Sessão de Abertura Oficial
                      </Title>
                      <div style={{ marginTop: '8px' }}>
                        <div style={{ marginBottom: '4px' }}>
                          <Text style={{ color: 'var(--text-sec)', fontSize: '0.95rem', display: 'block' }}>Intervenção institucional: Directora do IEFP:</Text>
                          <Text strong style={{ color: 'var(--text-main)', fontSize: '0.95rem', display: 'block' }}>Dr.ª Fátima Bastos</Text>
                        </div>
                        <div>
                          <Text style={{ color: 'var(--text-sec)', fontSize: '0.95rem', display: 'block' }}>Coordenadora da Ação de Formação:</Text>
                          <Text strong style={{ color: 'var(--text-main)', fontSize: '0.95rem', display: 'block' }}>Dr.ª Fernanda Cardoso</Text>
                        </div>
                      </div>
                    </div>
                  ),
                  dot: <BulbOutlined style={{ fontSize: '18px', color: '#2563eb' }} />,
                },
                {
                  label: <Text style={{ color: '#2563eb', fontWeight: 800, fontSize: '1rem', whiteSpace: 'nowrap' }}>09h45 - 10h30</Text>,
                  children: (
                    <div style={{ marginBottom: '24px', paddingLeft: '10px' }}>
                      <Title level={5} style={{ margin: 0, color: 'var(--text-main)', fontSize: '1.1rem', fontWeight: 700 }}>
                        Palestra: Comunicação Assertiva na Era Digital
                      </Title>
                      <div style={{ marginTop: '4px' }}>
                        <Text type="secondary" style={{ fontSize: '0.9rem', color: 'var(--text-sec)' }}>Oradora: </Text>
                        <Text strong style={{ color: 'var(--text-main)', fontSize: '0.95rem' }}>Susana Carina Cunha</Text>
                        <Text style={{ color: 'var(--text-sec)', fontSize: '0.9rem' }}> (Empower Think)</Text>
                      </div>
                    </div>
                  ),
                  dot: <SolutionOutlined style={{ fontSize: '18px', color: '#2563eb' }} />,
                },
                {
                  label: <Text style={{ color: '#2563eb', fontWeight: 800, fontSize: '1rem', whiteSpace: 'nowrap' }}>10h30 - 11h15</Text>,
                  children: (
                    <div style={{ marginBottom: '24px', paddingLeft: '10px' }}>
                      <Title level={5} style={{ margin: 0, color: 'var(--text-main)', fontSize: '1.1rem', fontWeight: 700 }}>
                        Palestra: Estratégia Digital & Gestão de Marcas
                      </Title>
                      <div style={{ marginTop: '4px' }}>
                        <Text type="secondary" style={{ fontSize: '0.9rem', color: 'var(--text-sec)' }}>Orador: </Text>
                        <Text strong style={{ color: 'var(--text-main)', fontSize: '0.95rem' }}>Ricardo Carneiro</Text>
                        <Text style={{ color: 'var(--text-sec)', fontSize: '0.9rem' }}> (Blue Bolt Agency)</Text>
                      </div>
                    </div>
                  ),
                  dot: <SolutionOutlined style={{ fontSize: '18px', color: '#2563eb' }} />,
                },
                {
                  label: <Text style={{ color: '#059669', fontWeight: 800, fontSize: '1rem', whiteSpace: 'nowrap' }}>11h15 - 11h35</Text>,
                  children: (
                    <div style={{ marginBottom: '24px', paddingLeft: '10px', background: 'rgba(5, 150, 105, 0.04)', padding: '12px 16px', borderRadius: '12px', borderLeft: '3px solid #059669' }}>
                      <Title level={5} style={{ margin: 0, color: '#059669', fontSize: '1.1rem', fontWeight: 700 }}>
                        Coffee Break & Networking Ativo
                      </Title>
                      <Text style={{ color: 'var(--text-sec)', fontSize: '0.95rem' }}>
                        Uma pausa excelente para descontrair, trocar contactos e debater novas oportunidades de negócio.
                      </Text>
                    </div>
                  ),
                  dot: <ClockCircleOutlined style={{ fontSize: '18px', color: '#059669' }} />,
                },
                {
                  label: <Text style={{ color: '#2563eb', fontWeight: 800, fontSize: '1rem', whiteSpace: 'nowrap' }}>11h45 - 12h30</Text>,
                  children: (
                    <div style={{ marginBottom: '24px', paddingLeft: '10px' }}>
                      <Title level={5} style={{ margin: 0, color: 'var(--text-main)', fontSize: '1.1rem', fontWeight: 700 }}>
                        Palestra: Gestão de Redes Sociais e Marketing de Influência na Era da IA
                      </Title>
                      <div style={{ marginTop: '4px' }}>
                        <Text type="secondary" style={{ fontSize: '0.9rem', color: 'var(--text-sec)' }}>Oradora: </Text>
                        <Text strong style={{ color: 'var(--text-main)', fontSize: '0.95rem' }}>Inês Sá Silva</Text>
                        <Text style={{ color: 'var(--text-sec)', fontSize: '0.9rem' }}> (Digital Experience - DX)</Text>
                      </div>
                    </div>
                  ),
                  dot: <RocketOutlined style={{ fontSize: '18px', color: '#2563eb' }} />,
                },
                {
                  label: <Text style={{ color: '#059669', fontWeight: 800, fontSize: '1rem', whiteSpace: 'nowrap' }}>12h30 - 14h15</Text>,
                  children: (
                    <div style={{ marginBottom: '24px', paddingLeft: '10px', background: 'rgba(5, 150, 105, 0.04)', padding: '12px 16px', borderRadius: '12px', borderLeft: '3px solid #059669' }}>
                      <Title level={5} style={{ margin: 0, color: '#059669', fontSize: '1.1rem', fontWeight: 700 }}>
                        Pausa para Almoço
                      </Title>
                      <Text style={{ color: 'var(--text-sec)', fontSize: '0.95rem' }}>
                        Pausa livre para almoço e descanso dos oradores e participantes.
                      </Text>
                    </div>
                  ),
                  dot: <ClockCircleOutlined style={{ fontSize: '18px', color: '#059669' }} />,
                },
                {
                  label: <Text style={{ color: '#2563eb', fontWeight: 800, fontSize: '1rem', whiteSpace: 'nowrap' }}>14h15 - 15h00</Text>,
                  children: (
                    <div style={{ marginBottom: '24px', paddingLeft: '10px' }}>
                      <Title level={5} style={{ margin: 0, color: 'var(--text-main)', fontSize: '1.1rem', fontWeight: 700 }}>
                        Palestra: O Futuro da Criação de Conteúdo com IA
                      </Title>
                      <div style={{ marginTop: '4px' }}>
                        <Text type="secondary" style={{ fontSize: '0.9rem', color: 'var(--text-sec)' }}>Orador: </Text>
                        <Text strong style={{ color: 'var(--text-main)', fontSize: '0.95rem' }}>Filipe Monteiro</Text>
                        <Text style={{ color: 'var(--text-sec)', fontSize: '0.9rem' }}> (Lead Lab)</Text>
                      </div>
                    </div>
                  ),
                  dot: <RocketOutlined style={{ fontSize: '18px', color: '#2563eb' }} />,
                },
                {
                  label: <Text style={{ color: '#2563eb', fontWeight: 800, fontSize: '1rem', whiteSpace: 'nowrap' }}>15h00 - 15h45</Text>,
                  children: (
                    <div style={{ marginBottom: '24px', paddingLeft: '10px' }}>
                      <Title level={5} style={{ margin: 0, color: 'var(--text-main)', fontSize: '1.1rem', fontWeight: 700 }}>
                        Palestra: Gestão de Inteligência Artificial na Era Digital
                      </Title>
                      <div style={{ marginTop: '4px' }}>
                        <Text type="secondary" style={{ fontSize: '0.9rem', color: 'var(--text-sec)' }}>Orador: </Text>
                        <Text strong style={{ color: 'var(--text-main)', fontSize: '0.95rem' }}>Arménio Ganga</Text>
                        <Text style={{ color: 'var(--text-sec)', fontSize: '0.9rem' }}> (Gangas Digital)</Text>
                      </div>
                    </div>
                  ),
                  dot: <RocketOutlined style={{ fontSize: '18px', color: '#2563eb' }} />,
                },
                {
                  label: <Text style={{ color: '#059669', fontWeight: 800, fontSize: '1rem', whiteSpace: 'nowrap' }}>15h45 - 16h00</Text>,
                  children: (
                    <div style={{ marginBottom: '24px', paddingLeft: '10px', background: 'rgba(5, 150, 105, 0.04)', padding: '12px 16px', borderRadius: '12px', borderLeft: '3px solid #059669' }}>
                      <Title level={5} style={{ margin: 0, color: '#059669', fontSize: '1.1rem', fontWeight: 700 }}>
                        Pausa & Digital Networking
                      </Title>
                      <Text style={{ color: 'var(--text-sec)', fontSize: '0.95rem' }}>
                        Momento dinâmico de troca rápida de experiências e ampliação da rede de contactos digitais.
                      </Text>
                    </div>
                  ),
                  dot: <ClockCircleOutlined style={{ fontSize: '18px', color: '#059669' }} />,
                },
                {
                  label: <Text style={{ color: '#2563eb', fontWeight: 800, fontSize: '1rem', whiteSpace: 'nowrap' }}>16h00 - 16h45</Text>,
                  children: (
                    <div style={{ marginBottom: '24px', paddingLeft: '10px' }}>
                      <Title level={5} style={{ margin: 0, color: 'var(--text-main)', fontSize: '1.1rem', fontWeight: 700 }}>
                        Palestra: Gestão da Transformação Digital na Perspetiva de Empreendedores
                      </Title>
                      <div style={{ marginTop: '4px' }}>
                        <Text type="secondary" style={{ fontSize: '0.9rem', color: 'var(--text-sec)' }}>Oradores: </Text>
                        <Text strong style={{ color: 'var(--text-main)', fontSize: '0.95rem' }}>Filipe Duarte e Diogo Gaspar</Text>
                        <Text style={{ color: 'var(--text-sec)', fontSize: '0.9rem' }}> (Ascendi)</Text>
                      </div>
                    </div>
                  ),
                  dot: <BulbOutlined style={{ fontSize: '18px', color: '#2563eb' }} />,
                },
                {
                  label: <Text style={{ color: '#2563eb', fontWeight: 800, fontSize: '1rem', whiteSpace: 'nowrap' }}>16h45 - 17h00</Text>,
                  children: (
                    <div style={{ marginBottom: '24px', paddingLeft: '10px' }}>
                      <Title level={5} style={{ margin: 0, color: 'var(--text-main)', fontSize: '1.1rem', fontWeight: 700 }}>
                        Encerramento e Manifesto 2026
                      </Title>
                      <Text style={{ color: 'var(--text-sec)', fontSize: '0.95rem' }}>
                        Resumo estratégico do dia, apresentação do Manifesto 2026 e considerações finais.
                      </Text>
                    </div>
                  ),
                  dot: <BulbOutlined style={{ fontSize: '18px', color: '#2563eb' }} />,
                },
                {
                  label: <Text style={{ color: '#dc2626', fontWeight: 800, fontSize: '1rem', whiteSpace: 'nowrap' }}>17h00</Text>,
                  children: (
                    <div style={{ marginBottom: '24px', paddingLeft: '10px' }}>
                      <Title level={5} style={{ margin: 0, color: '#dc2626', fontSize: '1.1rem', fontWeight: 700 }}>
                        Fim do Evento
                      </Title>
                      <Text style={{ color: 'var(--text-sec)', fontSize: '0.95rem' }}>
                        Encerramento oficial das atividades. Agradecemos a presença de todos!
                      </Text>
                    </div>
                  ),
                  dot: <ClockCircleOutlined style={{ fontSize: '18px', color: '#dc2626' }} />,
                },
                {
                  children: (
                    <div style={{ textAlign: 'left', marginTop: '30px', paddingLeft: '10px' }}>
                      <Button type="primary" size="large" onClick={() => onRegisterClick('1')}>INSCREVA-SE AGORA</Button>
                    </div>
                  ),
                  dot: <RocketOutlined style={{ fontSize: '20px', color: '#2563eb' }} />,
                }
              ]}
            />
            </div>
          </Col>
        </Row>
      </section>

      {/* Sponsors Carousel Section */}
      <div
        style={{
          padding: "24px 0 12px",
          background: "var(--bg-alt)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <Text
            type="secondary"
            style={{
              letterSpacing: "2px",
              textTransform: "uppercase",
              fontSize: "0.75rem",
              color: "var(--text-sec)",
              fontWeight: 600,
            }}
          >
            Apoiadores:
          </Text>
        </div>
        <div
          className="marquee-container"
          style={{
            margin: 0,
            padding: "10px 0",
            width: "100%",
            maskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          }}
        >
          <div
            className="marquee-content"
            style={{
              animationDuration: "40s",
              display: "flex",
              alignItems: "center",
            }}
          >
            {/* Repetindo os logos para garantir scroll infinito contínuo e sem cortes */}
            {[...sponsorLogos, ...sponsorLogos, ...sponsorLogos, ...sponsorLogos].map((logoUrl, i) => (
              <div
                key={i}
                className="sponsor-logo"
                style={{
                  margin: "0 20px",
                }}
              >
                <img
                  src={logoUrl}
                  alt={`Parceiro ${i + 1}`}
                  style={{
                    height: screens.xs ? "70px" : "100px",
                    width: "auto",
                    objectFit: "contain",
                    filter: "grayscale(100%)",
                    opacity: 0.7,
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.filter = "grayscale(0%)";
                    e.currentTarget.style.opacity = "1";
                    e.currentTarget.style.transform = "scale(1.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.filter = "grayscale(100%)";
                    e.currentTarget.style.opacity = "0.7";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ScheduleSection;
