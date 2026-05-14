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
          <Col xs={24} md={18} lg={12}>
            <Timeline
              mode={screens.xs ? 'left' : 'alternate'}
              items={[
                {
                  label: <Text style={{ color: '#2563eb', fontWeight: 700 }}>09:00</Text>,
                  children: (
                    <div style={{ textAlign: screens.xs ? 'left' : 'left', marginBottom: '40px' }}>
                      <Title level={4} style={{ color: 'var(--text-main)' }}>Abertura & Desmistificação</Title>
                      <Text type="secondary" style={{ color: 'var(--text-sec)' }}>O marketing digital para pequenos negócios sem complicações.</Text>
                    </div>
                  ),
                  dot: <BulbOutlined style={{ fontSize: '20px', color: '#2563eb' }} />,
                },
                {
                  label: <Text style={{ color: '#2563eb', fontWeight: 700 }}>10:30</Text>,
                  children: (
                    <div style={{ textAlign: screens.xs ? 'left' : 'right', marginBottom: '40px' }}>
                      <Title level={4} style={{ color: 'var(--text-main)' }}>Tráfego Pago Local</Title>
                      <Text type="secondary" style={{ color: 'var(--text-sec)' }}>Como usar Google e Meta Ads para atrair clientes à sua porta.</Text>
                    </div>
                  ),
                  dot: <RocketOutlined style={{ fontSize: '20px', color: '#2563eb' }} />,
                },
                {
                  label: <Text style={{ color: '#2563eb', fontWeight: 700 }}>14:00</Text>,
                  children: (
                    <div style={{ textAlign: 'left', marginBottom: '40px' }}>
                      <Title level={4} style={{ color: 'var(--text-main)' }}>Copywriting e Vendas</Title>
                      <Text type="secondary" style={{ color: 'var(--text-sec)' }}>Frameworks de comunicação persuasiva para fechar mais negócios.</Text>
                    </div>
                  ),
                  dot: <SolutionOutlined style={{ fontSize: '20px', color: '#2563eb' }} />,
                },
                {
                  children: (
                    <div style={{ textAlign: screens.xs ? 'left' : 'center', marginTop: '20px' }}>
                      <Button type="primary" size="large" onClick={() => onRegisterClick('1')}>Quero Inscrever-me</Button>
                    </div>
                  ),
                  dot: <ClockCircleOutlined style={{ fontSize: '20px', color: '#2563eb' }} />,
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
              <Title level={4} style={{ color: 'var(--text-main)' }}>Seja um Patrocinador</Title>
              <Paragraph style={{ color: 'var(--text-sec)' }}>
                Posicione a sua marca diante de centenas de pequenas empresas locais e lidere a transformação digital na região.
              </Paragraph>
              <Button 
                type="primary" 
                shape="round" 
                icon={<RocketOutlined />}
                onClick={() => onRegisterClick('2')}
              >
                Receber Dossier de Patrocínio
              </Button>
            </Card>
          </Col>
        </Row>
      </section>
    </>
  );
};

export default ScheduleSection;
