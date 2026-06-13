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

  return (
    <>
      {/* Schedule Section */}
      <section id="cronograma" style={{ padding: screens.xs ? '60px 5%' : '100px 5%', background: 'var(--bg-alt)' }}>
        <div style={{ textAlign: 'center', marginBottom: screens.xs ? '40px' : '60px' }}>
          <Title level={2} style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--text-main)' }}>Cronograma do Evento</Title>
          <Text type="secondary" style={{ fontSize: '1.1rem', color: 'var(--text-sec)' }}>Um dia intensivo focado em resultados práticos.</Text>
        </div>
        
        <Row justify="center">
          <Col xs={24} md={22} lg={18}>
            <Timeline
              mode="left"
              items={[
                {
                  label: <Text style={{ color: '#2563eb', fontWeight: 800, fontSize: '1rem', whiteSpace: 'nowrap' }}>09h00 - 09h20</Text>,
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
                  label: <Text style={{ color: '#2563eb', fontWeight: 800, fontSize: '1rem', whiteSpace: 'nowrap' }}>09h20 - 09h50</Text>,
                  children: (
                    <div style={{ marginBottom: '24px', paddingLeft: '10px' }}>
                      <Title level={5} style={{ margin: 0, color: 'var(--text-main)', fontSize: '1.1rem', fontWeight: 700 }}>
                        Sessão de Abertura Oficial
                      </Title>
                      <div style={{ marginTop: '8px' }}>
                        <div style={{ marginBottom: '4px' }}>
                          <Text style={{ color: 'var(--text-sec)', fontSize: '0.95rem' }}>• Intervenção institucional: </Text>
                          <Text strong style={{ color: 'var(--text-main)', fontSize: '0.95rem' }}>Dr.ª Presidente do IEFP</Text>
                        </div>
                        <div>
                          <Text style={{ color: 'var(--text-sec)', fontSize: '0.95rem' }}>• Coordenadora da Ação de Formação: </Text>
                          <Text strong style={{ color: 'var(--text-main)', fontSize: '0.95rem' }}>Dr.ª Fernanda Cardoso</Text>
                        </div>
                      </div>
                    </div>
                  ),
                  dot: <BulbOutlined style={{ fontSize: '18px', color: '#2563eb' }} />,
                },
                {
                  label: <Text style={{ color: '#2563eb', fontWeight: 800, fontSize: '1rem', whiteSpace: 'nowrap' }}>09h50 - 10h20</Text>,
                  children: (
                    <div style={{ marginBottom: '24px', paddingLeft: '10px' }}>
                      <Title level={5} style={{ margin: 0, color: 'var(--text-main)', fontSize: '1.1rem', fontWeight: 700 }}>
                        Palestra: Estratégia Digital & Gestão de Marcas
                      </Title>
                      <div style={{ marginTop: '4px' }}>
                        <Text type="secondary" style={{ fontSize: '0.9rem', color: 'var(--text-sec)' }}>Oradora: </Text>
                        <Text strong style={{ color: 'var(--text-main)', fontSize: '0.95rem' }}>Reservado</Text>
                        <Text style={{ color: 'var(--text-sec)', fontSize: '0.9rem' }}> (Senior Global Brand Manager - Mimosa na Lactogal)</Text>
                      </div>
                    </div>
                  ),
                  dot: <RocketOutlined style={{ fontSize: '18px', color: '#2563eb' }} />,
                },
                {
                  label: <Text style={{ color: '#2563eb', fontWeight: 800, fontSize: '1rem', whiteSpace: 'nowrap' }}>10h20 - 10h50</Text>,
                  children: (
                    <div style={{ marginBottom: '24px', paddingLeft: '10px' }}>
                      <Title level={5} style={{ margin: 0, color: 'var(--text-main)', fontSize: '1.1rem', fontWeight: 700 }}>
                        Palestra: Entre Dados e Decisões: A Nova Estrutura do Talento e do Desempenho no Digital
                      </Title>
                      <div style={{ marginTop: '4px' }}>
                        <Text type="secondary" style={{ fontSize: '0.9rem', color: 'var(--text-sec)' }}>Orador: </Text>
                        <Text strong style={{ color: 'var(--text-main)', fontSize: '0.95rem' }}>Sérgio Vieira</Text>
                        <Text style={{ color: 'var(--text-sec)', fontSize: '0.9rem' }}> (Head of Sales & Innovation na Elevus Group)</Text>
                      </div>
                    </div>
                  ),
                  dot: <SolutionOutlined style={{ fontSize: '18px', color: '#2563eb' }} />,
                },
                {
                  label: <Text style={{ color: '#059669', fontWeight: 800, fontSize: '1rem', whiteSpace: 'nowrap' }}>10h50 - 11h20</Text>,
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
                  label: <Text style={{ color: '#2563eb', fontWeight: 800, fontSize: '1rem', whiteSpace: 'nowrap' }}>11h20 - 11h50</Text>,
                  children: (
                    <div style={{ marginBottom: '24px', paddingLeft: '10px' }}>
                      <Title level={5} style={{ margin: 0, color: 'var(--text-main)', fontSize: '1.1rem', fontWeight: 700 }}>
                        Palestra: Redes Sociais e Marketing de Influência na Era da IA
                      </Title>
                      <div style={{ marginTop: '4px' }}>
                        <Text type="secondary" style={{ fontSize: '0.9rem', color: 'var(--text-sec)' }}>Oradora: </Text>
                        <Text strong style={{ color: 'var(--text-main)', fontSize: '0.95rem' }}>Reservado</Text>
                        <Text style={{ color: 'var(--text-sec)', fontSize: '0.9rem' }}> (Fundadora & CEO na Syena)</Text>
                      </div>
                    </div>
                  ),
                  dot: <RocketOutlined style={{ fontSize: '18px', color: '#2563eb' }} />,
                },
                {
                  label: <Text style={{ color: '#2563eb', fontWeight: 800, fontSize: '1rem', whiteSpace: 'nowrap' }}>11h50 - 12h30</Text>,
                  children: (
                    <div style={{ marginBottom: '24px', paddingLeft: '10px' }}>
                      <Title level={5} style={{ margin: 0, color: 'var(--text-main)', fontSize: '1.1rem', fontWeight: 700 }}>
                        Painel Temático: Gestão de Inteligência Artificial na Era Digital
                      </Title>
                      <div style={{ marginTop: '6px' }}>
                        <div style={{ color: 'var(--text-sec)', fontSize: '0.9rem', marginBottom: '2px' }}>Oradores:</div>
                        <Text strong style={{ color: 'var(--text-main)', fontSize: '0.95rem' }}>Reservado</Text> <Text style={{ color: 'var(--text-sec)', fontSize: '0.90rem' }}>(Aero Agency), </Text>
                        <Text strong style={{ color: 'var(--text-main)', fontSize: '0.95rem' }}>Reservado</Text> <Text style={{ color: 'var(--text-sec)', fontSize: '0.90rem' }}>(Fundação Champalimaud) </Text>
                        <Text style={{ color: 'var(--text-sec)', fontSize: '0.90rem' }}>e </Text>
                        <Text strong style={{ color: 'var(--text-main)', fontSize: '0.95rem' }}>Reservados</Text> <Text style={{ color: 'var(--text-sec)', fontSize: '0.90rem' }}>(Corticeira Amorim)</Text>
                      </div>
                    </div>
                  ),
                  dot: <SolutionOutlined style={{ fontSize: '18px', color: '#2563eb' }} />,
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
                  label: <Text style={{ color: '#2563eb', fontWeight: 800, fontSize: '1rem', whiteSpace: 'nowrap' }}>14h15 - 14h45</Text>,
                  children: (
                    <div style={{ marginBottom: '24px', paddingLeft: '10px' }}>
                      <Title level={5} style={{ margin: 0, color: 'var(--text-main)', fontSize: '1.1rem', fontWeight: 700 }}>
                        Palestra: Personalização em Escala com IA
                      </Title>
                      <div style={{ marginTop: '4px' }}>
                        <Text type="secondary" style={{ fontSize: '0.9rem', color: 'var(--text-sec)' }}>Orador: </Text>
                        <Text strong style={{ color: 'var(--text-main)', fontSize: '0.95rem' }}>Reservado</Text>
                        <Text style={{ color: 'var(--text-sec)', fontSize: '0.9rem' }}> (Co-Founder na Digital Alchimia)</Text>
                      </div>
                    </div>
                  ),
                  dot: <RocketOutlined style={{ fontSize: '18px', color: '#2563eb' }} />,
                },
                {
                  label: <Text style={{ color: '#2563eb', fontWeight: 800, fontSize: '1rem', whiteSpace: 'nowrap' }}>14h45 - 15h15</Text>,
                  children: (
                    <div style={{ marginBottom: '24px', paddingLeft: '10px' }}>
                      <Title level={5} style={{ margin: 0, color: 'var(--text-main)', fontSize: '1.1rem', fontWeight: 700 }}>
                        Palestra: SEO para Otimização na Inteligência Artificial
                      </Title>
                      <div style={{ marginTop: '4px' }}>
                        <Text type="secondary" style={{ fontSize: '0.9rem', color: 'var(--text-sec)' }}>Orador: </Text>
                        <Text strong style={{ color: 'var(--text-main)', fontSize: '0.95rem' }}>Reservado</Text>
                        <Text style={{ color: 'var(--text-sec)', fontSize: '0.9rem' }}> (Consultor & Orador de Marketing Digital)</Text>
                      </div>
                    </div>
                  ),
                  dot: <SolutionOutlined style={{ fontSize: '18px', color: '#2563eb' }} />,
                },
                {
                  label: <Text style={{ color: '#059669', fontWeight: 800, fontSize: '1rem', whiteSpace: 'nowrap' }}>15h15 - 15h30</Text>,
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
                  label: <Text style={{ color: '#2563eb', fontWeight: 800, fontSize: '1rem', whiteSpace: 'nowrap' }}>15h30 - 16h00</Text>,
                  children: (
                    <div style={{ marginBottom: '24px', paddingLeft: '10px' }}>
                      <Title level={5} style={{ margin: 0, color: 'var(--text-main)', fontSize: '1.1rem', fontWeight: 700 }}>
                        Palestra: O Futuro da Criação de Conteúdo com IA
                      </Title>
                      <div style={{ marginTop: '4px' }}>
                        <Text type="secondary" style={{ fontSize: '0.9rem', color: 'var(--text-sec)' }}>Orador: </Text>
                        <Text strong style={{ color: 'var(--text-main)', fontSize: '0.95rem' }}>Reservado</Text>
                        <Text style={{ color: 'var(--text-sec)', fontSize: '0.9rem' }}> (AI Consulting & Innovation Strategist na Certidata)</Text>
                      </div>
                    </div>
                  ),
                  dot: <BulbOutlined style={{ fontSize: '18px', color: '#2563eb' }} />,
                },
                {
                  label: <Text style={{ color: '#2563eb', fontWeight: 800, fontSize: '1rem', whiteSpace: 'nowrap' }}>16h00 - 16h30</Text>,
                  children: (
                    <div style={{ marginBottom: '24px', paddingLeft: '10px' }}>
                      <Title level={5} style={{ margin: 0, color: 'var(--text-main)', fontSize: '1.1rem', fontWeight: 700 }}>
                        Painel Temático: Gestão da Transformação Digital na Perspetiva de Empreendedores
                      </Title>
                      <div style={{ marginTop: '6px' }}>
                        <div style={{ color: 'var(--text-sec)', fontSize: '0.9rem', marginBottom: '2px' }}>Oradores Convidados:</div>
                        <Text strong style={{ color: 'var(--text-main)', fontSize: '0.95rem' }}>Reservado</Text> <Text style={{ color: 'var(--text-sec)', fontSize: '0.90rem' }}>(Blip), </Text>
                        <Text strong style={{ color: 'var(--text-main)', fontSize: '0.95rem' }}>Reservado</Text> <Text style={{ color: 'var(--text-sec)', fontSize: '0.90rem' }}>(coCEO LOBA) </Text>
                        <Text style={{ color: 'var(--text-sec)', fontSize: '0.90rem' }}>e </Text>
                        <Text strong style={{ color: 'var(--text-main)', fontSize: '0.95rem' }}>Reservado</Text> <Text style={{ color: 'var(--text-sec)', fontSize: '0.90rem' }}>(Partner Link&Grow)</Text>
                      </div>
                    </div>
                  ),
                  dot: <SolutionOutlined style={{ fontSize: '18px', color: '#2563eb' }} />,
                },
                {
                  label: <Text style={{ color: '#2563eb', fontWeight: 800, fontSize: '1rem', whiteSpace: 'nowrap' }}>16h30 - 17h00</Text>,
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
                      <Button type="primary" size="large" onClick={() => onRegisterClick('1')}>Garantir a Minha Vaga</Button>
                    </div>
                  ),
                  dot: <RocketOutlined style={{ fontSize: '20px', color: '#2563eb' }} />,
                }
              ]}
            />
          </Col>
        </Row>
      </section>

      {/* Sponsors Section */}
      <section style={{ padding: screens.xs ? '40px 5% 60px' : '40px 0 80px', background: 'var(--bg-alt)', overflow: 'hidden' }}>
        <Row justify="center">
          <Col xs={24} md={16} lg={12}>
            <Card 
              bordered={false}
              style={{ 
                background:  'var(--card-bg)', 
                border: '1px dashed #cbd5e1',
                borderRadius: '20px',
                textAlign: 'center',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)'
              }}
            >
              <Title level={4} style={{ color: 'var(--text-main)' }}>Seja um Parceiro</Title>
              <Paragraph style={{ color: 'var(--text-sec)' }}>
                Posicione a sua marca diante de centenas de pequenas empresas locais e lidere a transformação digital na região.
              </Paragraph>
              <Button 
                type="primary" 
                shape="round" 
                icon={<RocketOutlined />}
                onClick={() => onRegisterClick('2')}
              >
                Quero ser Parceiro
              </Button>
            </Card>
          </Col>
        </Row>
      </section>
    </>
  );
};

export default ScheduleSection;
