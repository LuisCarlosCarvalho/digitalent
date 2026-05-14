import React from 'react';
import { Typography, Row, Col, Space, Card, Button, Grid } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { useBreakpoint } = Grid;

const SpeakersSection: React.FC = () => {
  const screens = useBreakpoint();

  return (
    <section id="oradores" style={{ padding: screens.xs ? '60px 5%' : '120px 5%', background: 'var(--bg-base)' }}>
      <div style={{ textAlign: 'center', marginBottom: screens.xs ? '40px' : '80px' }}>
        <Title level={2} style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'var(--text-main)', marginBottom: '16px' }}>Oradores Confirmados</Title>
        <Text style={{ fontSize: '1.1rem', color: 'var(--text-sec)' }}>Especialistas prontos para partilhar o caminho do sucesso.</Text>
      </div>

      <Space orientation="vertical" size={screens.xs ? 40 : 100} style={{ width: '100%' }}>
        {[
          { 
            name: "Carlos Silva", 
            role: "Growth Specialist & CEO", 
            company: "Digitalent26",
            expertise: "Estratégia de Crescimento Exponencial",
            bio: [
              "Carlos Silva é uma figura de referência no panorama do marketing digital em Portugal, acumulando mais de 15 anos de experiência na transformação de negócios tradicionais em potências digitais. Como CEO da Digitalent26, liderou projetos que resultaram em crescimentos de faturação superiores a 300% para PMEs locais.",
              "A sua abordagem foca-se na desmistificação da tecnologia, tornando ferramentas complexas em processos simples e rentáveis. Neste evento, Carlos irá partilhar o 'roadmap' exato que utilizou para escalar dezenas de negócios, focando-se em resultados práticos e sustentáveis a longo prazo."
            ],
            image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop" 
          },
          { 
            name: "Ana Rocha", 
            role: "Local Traffic Expert", 
            company: "Ads Master",
            expertise: "Tráfego Pago para Comércio Local",
            bio: [
              "Ana Rocha é especialista em gestão de tráfego pago, com foco exclusivo em atrair clientes para lojas físicas e serviços locais. Com passagens por agências internacionais, Ana domina as plataformas Google e Meta Ads como poucos, focando-se sempre no Retorno sobre o Investimento (ROI).",
              "A sua metodologia permite que pequenos empresários compitam com grandes marcas, utilizando orçamentos otimizados e segmentação geográfica precisa. Durante a sua sessão, Ana irá revelar as campanhas 'chave-na-mão' que qualquer negócio local pode implementar para encher a sua agenda já amanhã."
            ],
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop" 
          },
          { 
            name: "Pedro Mendes", 
            role: "Content Strategy Director", 
            company: "SFL Solution",
            expertise: "Copywriting e Frameworks de Venda",
            bio: [
              "Pedro Mendes é o cérebro por trás de algumas das campanhas de comunicação mais eficazes em Portugal. Diretor de Estratégia de Conteúdo na SFL Solution, Pedro especializou-se na arte de converter palavras em vendas diretas através de 'Copywriting' de alta performance.",
              "Acredita que a história de um negócio é a sua maior vantagem competitiva. No Digitalent26, Pedro irá ensinar como construir uma narrativa poderosa que cria desejo imediato nos clientes e como estruturar mensagens que fecham vendas de forma automática, eliminando a resistência do preço."
            ],
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop" 
          }
        ].map((speaker, index) => (
          <Card 
            key={index} 
            bordered={false} 
            style={{ 
              background:  'var(--card-bg)', 
              borderRadius: '24px', 
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
            }}
            styles={{ body: { padding: screens.xs ? '20px' : '40px' } }}
          >
            <Row gutter={[48, 48]} align="middle" style={{ flexDirection: screens.lg ? (index % 2 !== 0 ? 'row-reverse' : 'row') : 'column' }}>
              <Col xs={24} md={24} lg={10}>
                <div style={{ 
                  position: 'relative', 
                  borderRadius: '16px', 
                  overflow: 'hidden',
                  aspectRatio: screens.xs ? '4/3' : '3/4',
                  boxShadow: screens.xs ? '0 0 25px rgba(37, 99, 235, 0.4)' : '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)'
                }}>
                  <img 
                    src={speaker.image} 
                    alt={speaker.name} 
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover'
                    }} 
                  />
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: screens.xs ? '20px' : '30px',
                    background: 'linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, transparent 100%)',
                    zIndex: 3
                  }}>
                    <Title level={3} style={{ color: '#fff', margin: 0, fontWeight: 800, fontSize: screens.xs ? '1.5rem' : '1.75rem' }}>{speaker.name}</Title>
                    <Text style={{ color: 'var(--border-color)', fontSize: '1rem', opacity: 0.9 }}>{speaker.role}</Text>
                    <br />
                    <Text strong style={{ color: 'var(--brand-blue)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{speaker.company}</Text>
                  </div>
                </div>
              </Col>
              <Col xs={24} md={24} lg={14}>
                <div style={{ padding: screens.xs ? '0' : '0 10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <div style={{ width: '40px', height: '2px', background: '#2563eb' }} />
                    <Text strong style={{ color: '#2563eb', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
                      Especialista em...
                    </Text>
                  </div>
                  
                  <Title level={2} style={{ color: 'var(--text-main)', marginBottom: '24px', fontSize: screens.xs ? '1.8rem' : '2.2rem' }}>
                    {speaker.expertise}
                  </Title>

                  {speaker.bio.map((paragraph, pIndex) => (
                    <Paragraph key={pIndex} style={{ fontSize: screens.xs ? '1.05rem' : '1.15rem', color: 'var(--text-sec)', lineHeight: '1.7', marginBottom: '20px', textAlign: 'left' }}>
                      {paragraph}
                    </Paragraph>
                  ))}

                  <Button type="link" icon={<ArrowRightOutlined />} style={{ color: '#2563eb', padding: 0, fontSize: '1.1rem', fontWeight: 600 }}>
                    Saber mais sobre {speaker.name.split(' ')[0]}
                  </Button>
                </div>
              </Col>
            </Row>
          </Card>
        ))}
      </Space>
    </section>
  );
};

export default SpeakersSection;
