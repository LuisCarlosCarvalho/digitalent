import { Layout, Button, Typography, Row, Col, Space, ConfigProvider, theme, Card, Timeline, Divider, Statistic, Tabs, Form, Input, Select, Badge, message } from 'antd';
import { RocketOutlined, CalendarOutlined, ArrowRightOutlined, GlobalOutlined, TeamOutlined, RiseOutlined, CheckCircleOutlined, ClockCircleOutlined, SolutionOutlined, BulbOutlined, PhoneOutlined, MailOutlined, EnvironmentOutlined, GoogleOutlined, CompassOutlined, UserOutlined, ShopOutlined, MailOutlined as MailIcon, PhoneOutlined as PhoneIcon } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;
const { Title, Text, Paragraph } = Typography;

const LandingPage: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState('1');

  const scrollToRegistration = (tabKey: string) => {
    setActiveTab(tabKey);
    const element = document.getElementById('inscricao');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#2563eb',
          colorBgBase: '#0b0f19',
          colorTextBase: '#cbd5e1',
          fontFamily: 'Outfit, sans-serif',
        },
      }}
    >
      <Layout style={{ minHeight: '100vh', background: '#0b0f19' }}>
        {/* Navigation Bar */}
        <Header 
          style={{ 
            position: 'sticky', 
            top: 0, 
            zIndex: 1000, 
            width: '100%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            background: 'rgba(11, 15, 25, 0.8)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid rgba(203, 213, 225, 0.1)',
            padding: '0 5%',
            height: '80px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src="https://i.imgur.com/UgYNeIO.png" alt="Digitalent26 Logo" style={{ height: '50px', width: 'auto', marginRight: '10px' }} />
            <Title level={4} style={{ margin: 0, background: 'linear-gradient(45deg, #2563eb, #60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 800 }}>
              Digitalent26
            </Title>
          </div>
          
          <div className="desktop-menu" style={{ display: 'flex', gap: '20px' }}>
            <Button type="link" href="#sobre" style={{ color: '#cbd5e1' }}>Sobre</Button>
            <Button type="link" href="#oradores" style={{ color: '#cbd5e1' }}>Oradores</Button>
            <Button type="link" href="#cronograma" style={{ color: '#cbd5e1' }}>Cronograma</Button>
            <Button type="link" href="#informacoes" style={{ color: '#cbd5e1' }}>Informações</Button>
          </div>

          <Button 
            type="primary" 
            shape="round" 
            size="large" 
            onClick={() => scrollToRegistration('1')}
            style={{ 
              background: 'linear-gradient(90deg, #2563eb 0%, #1d4ed8 100%)',
              border: 'none',
              fontWeight: 600,
              padding: '0 30px'
            }}
          >
            Reservar Lugar
          </Button>
        </Header>

        <Content>
          {/* Hero Section */}
          <section id="inicio" style={{ 
            padding: '120px 5% 100px', 
            background: 'radial-gradient(circle at 50% -20%, rgba(37, 99, 235, 0.15) 0%, rgba(11, 15, 25, 1) 70%)',
            overflow: 'hidden',
            position: 'relative'
          }}>
            {/* Background Glow Effect */}
            <div style={{
              position: 'absolute',
              top: '10%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '600px',
              height: '600px',
              background: 'rgba(37, 99, 235, 0.1)',
              filter: 'blur(150px)',
              borderRadius: '50%',
              zIndex: 0
            }} />

            <Row justify="center" align="middle" style={{ position: 'relative', zIndex: 1 }}>
              <Col xs={24} md={20} lg={16} style={{ textAlign: 'center' }}>
                <Space orientation="vertical" size="large" style={{ width: '100%' }}>
                  <div style={{ marginBottom: '30px' }}>
                    <img src="https://i.imgur.com/UgYNeIO.png" alt="Digitalent26 Large Logo" style={{ maxWidth: '280px', width: '100%', height: 'auto', filter: 'drop-shadow(0 0 20px rgba(37, 99, 235, 0.3))' }} />
                  </div>
                  <div style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '10px', 
                    padding: '8px 16px', 
                    background: 'rgba(37, 99, 235, 0.1)', 
                    borderRadius: '50px', 
                    border: '1px solid rgba(37, 99, 235, 0.2)',
                    marginBottom: '20px'
                  }}>
                    <GlobalOutlined style={{ color: '#2563eb' }} />
                    <Text style={{ color: '#2563eb', fontWeight: 600, fontSize: '14px', letterSpacing: '1px' }}>
                      MARKETING COM VISÃO
                    </Text>
                  </div>

                  <Title style={{ 
                    fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', 
                    lineHeight: 1.1, 
                    fontWeight: 800, 
                    marginBottom: '24px',
                    letterSpacing: '-0.02em'
                  }}>
                    Transforme o seu <span style={{ color: '#2563eb' }}>Negócio Local</span> na Era Digital
                  </Title>

                  <Paragraph style={{ 
                    fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', 
                    color: '#94a3b8', 
                    maxWidth: '800px', 
                    margin: '0 auto 40px',
                    lineHeight: 1.6
                  }}>
                    Capacitamos pequenas empresas portuguesas com as estratégias de marketing digital mais avançadas para dominar o mercado local e atrair clientes qualificados todos os dias.
                  </Paragraph>

                  <Space size="middle" wrap style={{ justifyContent: 'center' }}>
                    <Button 
                      type="primary" 
                      shape="round" 
                      size="large" 
                      onClick={() => scrollToRegistration('1')}
                      style={{ 
                        height: '60px', 
                        padding: '0 40px', 
                        fontSize: '1.1rem', 
                        fontWeight: 700,
                        background: 'linear-gradient(90deg, #2563eb 0%, #1d4ed8 100%)', 
                        border: 'none',
                        boxShadow: '0 10px 30px rgba(37, 99, 235, 0.4)'
                      }}
                    >
                      Reservar o Meu Lugar
                    </Button>
                    <Button 
                      type="default" 
                      size="large" 
                      ghost 
                      icon={<CalendarOutlined />} 
                      href="#cronograma"
                      style={{ 
                        height: '48px', 
                        padding: '0 32px', 
                        fontSize: '18px', 
                        borderColor: 'rgba(203, 213, 225, 0.3)',
                        color: '#f8fafc',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      Ver Agenda
                    </Button>
                  </Space>
                </Space>
              </Col>
            </Row>

            {/* Floating Features (Subtle) */}
            <Row gutter={[24, 24]} style={{ marginTop: '100px', opacity: 0.8 }}>
              <Col xs={24} md={8}>
                <div style={{ textAlign: 'center', padding: '20px' }}>
                  <RiseOutlined style={{ fontSize: '32px', color: '#2563eb', marginBottom: '15px' }} />
                  <Title level={5}>Crescimento Real</Title>
                  <Text>Focado em resultados mensuráveis para o seu negócio.</Text>
                </div>
              </Col>
              <Col xs={24} md={8}>
                <div style={{ textAlign: 'center', padding: '20px' }}>
                  <TeamOutlined style={{ fontSize: '32px', color: '#2563eb', marginBottom: '15px' }} />
                  <Title level={5}>Comunidade Local</Title>
                  <Text>Conecte-se com outros empresários da sua região.</Text>
                </div>
              </Col>
              <Col xs={24} md={8}>
                <div style={{ textAlign: 'center', padding: '20px' }}>
                  <RocketOutlined style={{ fontSize: '32px', color: '#2563eb', marginBottom: '15px' }} />
                  <Title level={5}>Estratégia Ágil</Title>
                  <Text>Implementação rápida e eficiente sem complicações.</Text>
                </div>
              </Col>
            </Row>
          </section>

          {/* About Section */}
          <section id="sobre" style={{ padding: '100px 5%', background: '#0b0f19' }}>
            <Row gutter={[48, 48]} align="middle">
              <Col xs={24} lg={12}>
                <div style={{ paddingRight: '20px' }}>
                  <Title level={2} style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '24px' }}>
                    O Desafio do <span style={{ color: '#2563eb' }}>Negócio Tradicional</span>
                  </Title>
                  <Paragraph style={{ fontSize: '1.1rem', color: '#94a3b8', marginBottom: '32px' }}>
                    Sabemos que gerir um negócio local não é fácil. Entre a operação diária e o atendimento ao cliente, sobra pouco tempo para o marketing. Muitos sentem medo da tecnologia ou acham que o digital é apenas para grandes marcas.
                  </Paragraph>
                  <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                    {[
                      { title: "Falta de Tempo", desc: "Aprenda a automatizar processos de atração de clientes." },
                      { title: "Medo da Tecnologia", desc: "Ferramentas simples e intuitivas desenhadas para si." },
                      { title: "Resultados Lentos", desc: "Estratégias de tráfego local com retorno imediato." }
                    ].map((item, index) => (
                      <div key={index} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                        <CheckCircleOutlined style={{ color: '#2563eb', fontSize: '24px', marginTop: '4px' }} />
                        <div>
                          <Text strong style={{ fontSize: '1.1rem', display: 'block' }}>{item.title}</Text>
                          <Text style={{ color: '#64748b' }}>{item.desc}</Text>
                        </div>
                      </div>
                    ))}
                  </Space>
                </div>
              </Col>
              <Col xs={24} lg={12}>
                <Card 
                  bordered={false} 
                  style={{ 
                    background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(11, 15, 25, 1) 100%)',
                    border: '1px solid rgba(37, 99, 235, 0.2)',
                    borderRadius: '24px',
                    padding: '20px'
                  }}
                >
                  <SolutionOutlined style={{ fontSize: '48px', color: '#2563eb', marginBottom: '24px' }} />
                  <Title level={3}>A Solução Digitalent26</Title>
                  <Paragraph style={{ color: '#94a3b8' }}>
                    O Digitalent26 não é apenas mais um evento teórico. É um acelerador prático onde sairá com o plano exato para digitalizar a sua presença e aumentar a faturação utilizando o poder da internet.
                  </Paragraph>
                  <Divider style={{ borderColor: 'rgba(203, 213, 225, 0.1)' }} />
                  <Row gutter={[16, 16]}>
                    <Col span={12}>
                      <Statistic title="Eficácia" value={98} suffix="%" />
                    </Col>
                    <Col span={12}>
                      <Statistic title="Retorno" value="ROI+" />
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </section>

          {/* Speakers Section - Redesigned based on image_2.png */}
          <section id="oradores" style={{ padding: '120px 5%', background: '#0b0f19' }}>
            <div style={{ textAlign: 'center', marginBottom: '80px' }}>
              <Title level={2} style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: '#f8fafc', marginBottom: '16px' }}>Oradores Confirmados</Title>
              <Text style={{ fontSize: '1.2rem', color: '#94a3b8' }}>Especialistas prontos para partilhar o caminho do sucesso.</Text>
            </div>

            <Space orientation="vertical" size={100} style={{ width: '100%' }}>
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
                <Row key={index} gutter={[64, 48]} align="middle" style={{ flexDirection: index % 2 !== 0 ? 'row-reverse' : 'row' }}>
                  {/* Left Side: Photo with Glow and Overlay */}
                  <Col xs={24} lg={10}>
                    <div style={{ 
                      position: 'relative', 
                      borderRadius: '30px', 
                      overflow: 'hidden',
                      boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
                      aspectRatio: '3/4',
                      background: '#111827'
                    }}>
                      {/* Glow Effect behind speaker */}
                      <div style={{
                        position: 'absolute',
                        bottom: '20%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '100%',
                        height: '60%',
                        background: 'radial-gradient(ellipse at center, rgba(37, 99, 235, 0.4) 0%, rgba(37, 99, 235, 0) 70%)',
                        zIndex: 1,
                        filter: 'blur(40px)'
                      }} />
                      
                      <img 
                        src={speaker.image} 
                        alt={speaker.name} 
                        style={{ 
                          width: '100%', 
                          height: '100%', 
                          objectFit: 'cover',
                          position: 'relative',
                          zIndex: 2
                        }} 
                      />

                      {/* Overlay Text */}
                      <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: '40px 30px',
                        background: 'linear-gradient(to top, rgba(11, 15, 25, 1) 0%, rgba(11, 15, 25, 0.8) 40%, transparent 100%)',
                        zIndex: 3
                      }}>
                        <Title level={3} style={{ color: '#fff', margin: 0, fontWeight: 800 }}>{speaker.name}</Title>
                        <Text style={{ color: '#fff', fontSize: '1.1rem', opacity: 0.9 }}>{speaker.role}</Text>
                        <br />
                        <Text strong style={{ color: '#2563eb', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{speaker.company}</Text>
                      </div>
                    </div>
                  </Col>

                  {/* Right Side: Biography */}
                  <Col xs={24} lg={14}>
                    <div style={{ padding: '0 10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                        <div style={{ width: '40px', height: '2px', background: '#2563eb' }} />
                        <Text strong style={{ color: '#2563eb', fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
                          Especialista em...
                        </Text>
                      </div>
                      
                      <Title level={2} style={{ color: '#f8fafc', marginBottom: '32px', fontSize: '2.2rem' }}>
                        {speaker.expertise}
                      </Title>

                      {speaker.bio.map((paragraph, pIndex) => (
                        <Paragraph key={pIndex} style={{ fontSize: '1.15rem', color: '#94a3b8', lineHeight: '1.8', marginBottom: '24px', textAlign: 'justify' }}>
                          {paragraph}
                        </Paragraph>
                      ))}

                      <Button type="link" icon={<ArrowRightOutlined />} style={{ color: '#2563eb', padding: 0, fontSize: '1.1rem', fontWeight: 600 }}>
                        Saber mais sobre {speaker.name.split(' ')[0]}
                      </Button>
                    </div>
                  </Col>
                </Row>
              ))}
            </Space>
          </section>

          {/* Schedule Section */}
          <section id="cronograma" style={{ padding: '100px 5%', background: 'rgba(37, 99, 235, 0.02)' }}>
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
              <Title level={2} style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>Cronograma do Evento</Title>
              <Text type="secondary" style={{ fontSize: '1.1rem' }}>Um dia intensivo focado em resultados práticos.</Text>
            </div>
            
            <Row justify="center">
              <Col xs={24} md={18} lg={12}>
                <Timeline
                  mode="alternate"
                  items={[
                    {
                      label: <Text style={{ color: '#2563eb', fontWeight: 700 }}>09:00</Text>,
                      children: (
                        <div style={{ textAlign: 'left', marginBottom: '40px' }}>
                          <Title level={4}>Abertura & Desmistificação</Title>
                          <Text type="secondary">O marketing digital para pequenos negócios sem complicações.</Text>
                        </div>
                      ),
                      dot: <BulbOutlined style={{ fontSize: '20px', color: '#2563eb' }} />,
                    },
                    {
                      label: <Text style={{ color: '#2563eb', fontWeight: 700 }}>10:30</Text>,
                      children: (
                        <div style={{ textAlign: 'right', marginBottom: '40px' }}>
                          <Title level={4}>Tráfego Pago Local</Title>
                          <Text type="secondary">Como usar Google e Meta Ads para atrair clientes à sua porta.</Text>
                        </div>
                      ),
                      dot: <RocketOutlined style={{ fontSize: '20px', color: '#2563eb' }} />,
                    },
                    {
                      label: <Text style={{ color: '#2563eb', fontWeight: 700 }}>14:00</Text>,
                      children: (
                        <div style={{ textAlign: 'left', marginBottom: '40px' }}>
                          <Title level={4}>Copywriting e Vendas</Title>
                          <Text type="secondary">Frameworks de comunicação persuasiva para fechar mais negócios.</Text>
                        </div>
                      ),
                      dot: <SolutionOutlined style={{ fontSize: '20px', color: '#2563eb' }} />,
                    },
                    {
                      children: (
                        <div style={{ textAlign: 'center', marginTop: '20px' }}>
                          <Button type="primary" size="large" onClick={() => scrollToRegistration('1')}>Quero Inscrever-me</Button>
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
          <section style={{ padding: '80px 0', background: '#0b0f19', overflow: 'hidden' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <Text type="secondary" style={{ letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.8rem' }}>Marcas que Confiam</Text>
            </div>
            
            {/* Infinite Marquee Wrapper */}
            <div className="marquee-container" style={{ marginBottom: '60px' }}>
              <div className="marquee-content">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="sponsor-logo">
                    <img 
                      src={`https://api.dicebear.com/7.x/initials/svg?seed=Brand${i+1}&backgroundColor=1f2937&fontFamily=Arial&fontSize=40`} 
                      alt={`Sponsor ${i+1}`}
                      style={{ height: '40px', filter: 'grayscale(100%) brightness(1.5)', opacity: 0.6 }}
                    />
                  </div>
                ))}
              </div>
            </div>

            <Row justify="center">
              <Col xs={22} md={16} lg={12}>
                <Card 
                  bordered={false}
                  style={{ 
                    background: 'rgba(37, 99, 235, 0.05)', 
                    border: '1px dashed rgba(37, 99, 235, 0.3)',
                    borderRadius: '20px',
                    textAlign: 'center'
                  }}
                >
                  <Title level={4}>Seja um Patrocinador</Title>
                  <Paragraph style={{ color: '#94a3b8' }}>
                    Posicione a sua marca diante de centenas de pequenas empresas locais e lidere a transformação digital na região.
                  </Paragraph>
                  <Button 
                    type="primary" 
                    shape="round" 
                    icon={<RocketOutlined />}
                    onClick={() => scrollToRegistration('2')}
                  >
                    Receber Dossier de Patrocínio
                  </Button>
                </Card>
              </Col>
            </Row>
          </section>

          {/* Location Section */}
          <section id="informacoes" style={{ padding: '120px 5%', background: '#0b0f19' }}>
            <div style={{ marginBottom: '60px' }}>
              <Title level={2} style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)' }}>Onde será o Digitalent 26</Title>
              <Paragraph style={{ fontSize: '1.2rem', color: '#94a3b8' }}>Prepare-se para um dia de imersão total no IEFP de Rio Meão.</Paragraph>
            </div>

            <Row gutter={[64, 64]} align="middle">
              {/* Left Column: Contact & Details */}
              <Col xs={24} md={12}>
                <Space orientation="vertical" size={40} style={{ width: '100%' }}>
                  <div>
                    <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', marginBottom: '32px' }}>
                      <EnvironmentOutlined style={{ fontSize: '28px', color: '#2563eb', marginTop: '5px' }} />
                      <div>
                        <Text strong style={{ fontSize: '1.2rem', display: 'block', color: '#fff' }}>Endereço</Text>
                        <Text style={{ fontSize: '1.1rem', color: '#94a3b8' }}>Av. Santiago 68-88, Rio Meão - Auditório do IEFP</Text>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', marginBottom: '32px' }}>
                      <PhoneOutlined style={{ fontSize: '28px', color: '#2563eb', marginTop: '5px' }} />
                      <div>
                        <Text strong style={{ fontSize: '1.2rem', display: 'block', color: '#fff' }}>Telefone</Text>
                        <Text style={{ fontSize: '1.1rem', color: '#94a3b8' }}>999 999 999</Text>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', marginBottom: '32px' }}>
                      <MailOutlined style={{ fontSize: '28px', color: '#2563eb', marginTop: '5px' }} />
                      <div>
                        <Text strong style={{ fontSize: '1.2rem', display: 'block', color: '#fff' }}>Email</Text>
                        <Text style={{ fontSize: '1.1rem', color: '#94a3b8' }}>contato@digitalent.pt</Text>
                      </div>
                    </div>
                  </div>

                  <Card style={{ background: 'rgba(255, 255, 255, 0.02)', borderColor: 'rgba(203, 213, 225, 0.1)', borderRadius: '16px' }}>
                    <Title level={5} style={{ color: '#2563eb', marginBottom: '16px' }}>Horário do Evento</Title>
                    <Space orientation="vertical" style={{ width: '100%' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Text>Início</Text>
                        <Text strong color="#fff">10:00</Text>
                      </div>
                      <Divider style={{ margin: '8px 0', borderColor: 'rgba(203, 213, 225, 0.05)' }} />
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Text>Almoço</Text>
                        <Text strong color="#fff">12:00 - 13:00</Text>
                      </div>
                      <Divider style={{ margin: '8px 0', borderColor: 'rgba(203, 213, 225, 0.05)' }} />
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Text>Encerramento</Text>
                        <Text strong color="#fff">17:00</Text>
                      </div>
                    </Space>
                  </Card>
                </Space>
              </Col>

              {/* Right Column: Interactive Map Placeholder */}
              <Col xs={24} md={12}>
                <div style={{ 
                  position: 'relative', 
                  borderRadius: '30px', 
                  overflow: 'hidden', 
                  height: '500px',
                  background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  padding: '40px'
                }}>
                  {/* Decorative Map Pattern (Simplified) */}
                  <div style={{ 
                    position: 'absolute', 
                    top: 0, left: 0, right: 0, bottom: 0, 
                    opacity: 0.1, 
                    backgroundImage: 'radial-gradient(#2563eb 1px, transparent 1px)', 
                    backgroundSize: '20px 20px' 
                  }} />
                  
                  <div style={{ position: 'relative', zIndex: 2 }}>
                    <EnvironmentOutlined style={{ fontSize: '64px', color: '#2563eb', marginBottom: '24px', filter: 'drop-shadow(0 0 10px rgba(37, 99, 235, 0.5))' }} />
                    <Title level={3} style={{ color: '#fff' }}>Localização Exata</Title>
                    <Paragraph style={{ color: '#94a3b8', marginBottom: '40px' }}>
                      Auditório do IEFP - Rio Meão.<br />Estacionamento gratuito disponível no local.
                    </Paragraph>
                    
                    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                      <Button 
                        block 
                        size="large" 
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
                        style={{ height: '56px', borderRadius: '12px', fontSize: '1.1rem', fontWeight: 600, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}
                      >
                        Abrir no Waze
                      </Button>
                    </Space>
                  </div>
                </div>
              </Col>
            </Row>
          </section>

          {/* Registration Section */}
          <section id="inscricao" style={{ padding: '120px 5%', background: '#0b0f19' }}>
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
              <Title level={2} style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: '#f8fafc' }}>Garanta a Sua Presença</Title>
              <Paragraph style={{ fontSize: '1.2rem', color: '#94a3b8' }}>Escolha a sua forma de participar na transformação digital de Rio Meão.</Paragraph>
            </div>

            <Row justify="center">
              <Col xs={24} md={20} lg={16} xl={14}>
                <div style={{ 
                  background: 'rgba(255, 255, 255, 0.02)', 
                  border: '1px solid rgba(255, 255, 255, 0.05)', 
                  borderRadius: '32px', 
                  padding: '40px',
                  boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)'
                }}>
                  <Tabs 
                    activeKey={activeTab}
                    onChange={(key) => setActiveTab(key)}
                    centered 
                    size="large"
                    items={[
                      {
                        key: '1',
                        label: 'Inscrição de Participante',
                        children: (
                          <div style={{ paddingTop: '30px' }}>
                            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                              <Badge count="100% Gratuito" style={{ backgroundColor: '#2563eb', padding: '0 15px', height: '30px', lineHeight: '30px', fontSize: '1rem', borderRadius: '15px' }} />
                              <Title level={4} style={{ marginTop: '20px' }}>Ouvinte / Participante Local</Title>
                              <Text style={{ color: '#94a3b8' }}>Acesso total às palestras, networking e recursos exclusivos do evento.</Text>
                            </div>

                            <Form 
                              layout="vertical" 
                              onFinish={(values) => {
                                console.log('Participante Data:', values);
                                message.success('Inscrição enviada com sucesso! Verifique o seu email.');
                              }}
                            >
                              <Row gutter={16}>
                                <Col xs={24} md={12}>
                                  <Form.Item label="Nome Completo" name="nome" rules={[{ required: true, message: 'Por favor, insira o seu nome.' }]}>
                                    <Input prefix={<UserOutlined />} placeholder="Ex: João Silva" size="large" />
                                  </Form.Item>
                                </Col>
                                <Col xs={24} md={12}>
                                  <Form.Item label="Telemóvel" name="telemovel" rules={[{ required: true, message: 'Por favor, insira o seu contacto.' }]}>
                                    <Input prefix={<PhoneIcon />} placeholder="912 345 678" size="large" />
                                  </Form.Item>
                                </Col>
                              </Row>

                              <Form.Item label="E-mail Profissional" name="email" rules={[{ required: true, type: 'email', message: 'Insira um e-mail válido.' }]}>
                                <Input prefix={<MailIcon />} placeholder="joao@empresa.pt" size="large" />
                              </Form.Item>

                              <Form.Item label="Nome da Empresa / Ramo (Opcional)" name="empresa">
                                <Input prefix={<ShopOutlined />} placeholder="Ex: Café Central / Restauração" size="large" />
                              </Form.Item>

                              <Form.Item style={{ marginTop: '40px' }}>
                                <Space size="large">
                                  <Button 
                                    type="primary" 
                                    size="large" 
                                    shape="round" 
                                    htmlType="submit"
                                    style={{ 
                                      height: '60px', 
                                      padding: '0 40px', 
                                      fontSize: '1.1rem', 
                                      fontWeight: 700,
                                      background: 'linear-gradient(90deg, #2563eb 0%, #1d4ed8 100%)',
                                      border: 'none',
                                      boxShadow: '0 10px 30px rgba(37, 99, 235, 0.4)'
                                    }}
                                  >
                                    Quero me inscrever agora
                                  </Button>
                                </Space>
                                <Text type="secondary" style={{ display: 'block', textAlign: 'center', marginTop: '16px', fontSize: '0.85rem' }}>
                                  Ao inscrever-se, concorda com a nossa Política de Privacidade.
                                </Text>
                              </Form.Item>
                            </Form>
                          </div>
                        ),
                      },
                      {
                        key: '2',
                        label: 'Parceiro / Investidor',
                        children: (
                          <div style={{ paddingTop: '30px' }}>
                            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                              <Title level={4}>Candidatura a Patrocínio</Title>
                              <Text style={{ color: '#94a3b8' }}>Posicione a sua marca perante centenas de decisões locais e lidere o mercado.</Text>
                            </div>

                            <Form 
                              layout="vertical"
                              onFinish={(values) => {
                                console.log('Parceiro Data:', values);
                                message.success('Candidatura recebida. A nossa equipa entrará em contacto em breve.');
                              }}
                            >
                              <Row gutter={16}>
                                <Col xs={24} md={12}>
                                  <Form.Item label="Nome da Empresa" name="empresa" rules={[{ required: true }]}>
                                    <Input prefix={<ShopOutlined />} placeholder="Empresa S.A." size="large" />
                                  </Form.Item>
                                </Col>
                                <Col xs={24} md={12}>
                                  <Form.Item label="Nome do Responsável" name="responsavel" rules={[{ required: true }]}>
                                    <Input prefix={<UserOutlined />} placeholder="Nome Completo" size="large" />
                                  </Form.Item>
                                </Col>
                              </Row>

                              <Row gutter={16}>
                                <Col xs={24} md={12}>
                                  <Form.Item label="E-mail de Contacto" name="email" rules={[{ required: true, type: 'email' }]}>
                                    <Input prefix={<MailIcon />} placeholder="email@empresa.pt" size="large" />
                                  </Form.Item>
                                </Col>
                                <Col xs={24} md={12}>
                                  <Form.Item label="Telemóvel" name="telemovel" rules={[{ required: true }]}>
                                    <Input prefix={<PhoneIcon />} placeholder="9xx xxx xxx" size="large" />
                                  </Form.Item>
                                </Col>
                              </Row>

                              <Form.Item label="Nível de Interesse" name="nivel" rules={[{ required: true }]}>
                                <Select size="large" placeholder="Selecione o nível de patrocínio">
                                  <Select.Option value="bronze">Passe Bronze</Select.Option>
                                  <Select.Option value="prata">Passe Prata</Select.Option>
                                  <Select.Option value="ouro">Passe Ouro</Select.Option>
                                  <Select.Option value="investidor">Quero ser Investidor Principal</Select.Option>
                                </Select>
                              </Form.Item>

                              <Form.Item label="Objetivos no Evento" name="objetivos">
                                <Input.TextArea rows={4} placeholder="Conte-nos brevemente o que espera alcançar com esta parceria..." style={{ borderRadius: '12px' }} />
                              </Form.Item>

                              <Form.Item style={{ marginTop: '40px' }}>
                                <Button 
                                  type="default" 
                                  htmlType="submit" 
                                  block 
                                  size="large" 
                                  className="investor-btn"
                                  style={{ 
                                    height: '64px', 
                                    fontSize: '1.2rem', 
                                    fontWeight: 700, 
                                    borderRadius: '16px',
                                    border: '2px solid #cbd5e1',
                                    background: 'transparent',
                                    color: '#cbd5e1',
                                    transition: 'all 0.3s ease'
                                  }}
                                >
                                  Enviar Candidatura a Patrocínio
                                </Button>
                              </Form.Item>
                            </Form>
                          </div>
                        ),
                      },
                    ]}
                  />
                </div>
              </Col>
            </Row>
          </section>
        </Content>

        <Footer style={{ 
          textAlign: 'center', 
          background: '#0b0f19', 
          borderTop: '1px solid rgba(203, 213, 225, 0.1)',
          padding: '40px 0'
        }}>
          <Text style={{ color: '#64748b' }}>
            © {new Date().getFullYear()} Digitalent26 - Marketing com Visão. Todos os direitos reservados.
          </Text>
        </Footer>
      </Layout>
    </ConfigProvider>
  );
};

export default LandingPage;
