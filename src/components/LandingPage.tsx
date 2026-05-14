import React, { useEffect, useState } from 'react';
import { Layout, Button, Typography, Row, Col, Space, ConfigProvider, Card, Timeline, Divider, Statistic, Tabs, Form, Input, Select, Badge, notification, Dropdown, theme } from 'antd';
import { RocketOutlined, CalendarOutlined, ArrowRightOutlined, GlobalOutlined, TeamOutlined, RiseOutlined, CheckCircleOutlined, ClockCircleOutlined, SolutionOutlined, BulbOutlined, PhoneOutlined, MailOutlined, EnvironmentOutlined, GoogleOutlined, CompassOutlined, UserOutlined, ShopOutlined, MailOutlined as MailIcon, PhoneOutlined as PhoneIcon, InstagramOutlined, LinkedinOutlined, DesktopOutlined, MoonOutlined, SunOutlined, DownOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;
const { Title, Text, Paragraph } = Typography;

const getBaseThemeConfig = (isDark: boolean) => ({
  algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
  token: {
    colorPrimary: '#2563eb', // Azul Royal da Marca
    colorBgBase: isDark ? '#0b0f19' : '#f8fafc',
    colorTextBase: isDark ? '#f8fafc' : '#0f172a',
    borderRadius: 8,
    fontFamily: "'Outfit', sans-serif",
  },
  components: {
    Button: {
      colorPrimary: '#2563eb',
      algorithm: true,
    },
    Input: {
      colorBgContainer: isDark ? '#111827' : '#f8fafc',
    }
  }
});

type ThemeMode = 'light' | 'dark' | 'auto';

const LandingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('1');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [themeMode, setThemeMode] = useState<ThemeMode>('auto');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Carregar tema salvo
  useEffect(() => {
    const savedTheme = localStorage.getItem('themeMode') as ThemeMode;
    if (savedTheme) {
      setThemeMode(savedTheme);
    }
  }, []);

  // Lidar com a lógica do Dark Mode dinâmico
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (themeMode === 'auto') setIsDarkMode(mediaQuery.matches);
    };

    if (themeMode === 'auto') {
      setIsDarkMode(mediaQuery.matches);
    } else {
      setIsDarkMode(themeMode === 'dark');
    }

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [themeMode]);

  // Atualizar a tag HTML para as variáveis CSS globais funcionarem
  useEffect(() => {
    if (isDarkMode) {
      document.body.setAttribute('data-theme', 'dark');
    } else {
      document.body.removeAttribute('data-theme');
    }
    localStorage.setItem('themeMode', themeMode);
  }, [isDarkMode, themeMode]);

  const handleThemeChange = (info: any) => {
    setThemeMode(info.key as ThemeMode);
  };

  const handleFormSubmit = async (values: any, type: 'Participante' | 'Parceiro') => {
    setIsSubmitting(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || '';
      const response = await fetch(`${apiUrl}/api/register-whatsapp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formType: type,
          name: values.nome || values.responsavel,
          email: values.email,
          phone: values.telemovel,
          company: values.empresa || '',
          sponsorshipLevel: values.nivel || '',
          adminNumber: '351964300708'
        }),
      });

      if (response.ok) {
        notification.success({
          message: 'Inscrição Confirmada!',
          description: 'O seu comprovativo foi gerado e enviado com sucesso.',
          placement: 'topRight'
        });
      } else {
        throw new Error('Server error');
      }
    } catch (error) {
      notification.error({
        message: 'Erro no Processamento',
        description: 'Não foi possível processar a sua inscrição. Por favor, tente novamente.',
        placement: 'topRight'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToRegistration = (tabKey: string) => {
    setActiveTab(tabKey);
    const element = document.getElementById('inscricao');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ConfigProvider theme={getBaseThemeConfig(isDarkMode)}>
      <Layout style={{ minHeight: '100vh', background: 'var(--bg-base)' }}>
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
            background: 'var(--header-bg)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
            padding: '0 5%',
            height: '80px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src="https://i.imgur.com/UgYNeIO.png" alt="Digitalent26 Logo" style={{ height: '50px', width: 'auto', marginRight: '10px' }} />
            <Title level={4} style={{ margin: 0, color: '#2563eb', fontWeight: 800 }}>
              Digitalent26
            </Title>
          </div>
          
          <div className="desktop-menu" style={{ display: 'flex', gap: '20px' }}>
            <Button type="link" href="#sobre" style={{ color: 'var(--text-main)', fontWeight: 600 }}>Sobre</Button>
            <Button type="link" href="#oradores" style={{ color: 'var(--text-main)', fontWeight: 600 }}>Oradores</Button>
            <Button type="link" href="#cronograma" style={{ color: 'var(--text-main)', fontWeight: 600 }}>Cronograma</Button>
            <Button type="link" href="#informacoes" style={{ color: 'var(--text-main)', fontWeight: 600 }}>Informações</Button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Dropdown 
              menu={{
                items: [
                  { key: 'light', icon: <SunOutlined />, label: 'Light Mode' },
                  { key: 'dark', icon: <MoonOutlined />, label: 'Dark Mode' },
                  { key: 'auto', icon: <DesktopOutlined />, label: 'System (Auto)' }
                ],
                onClick: handleThemeChange,
                selectedKeys: [themeMode]
              }}
              placement="bottomRight"
            >
              <Button type="text" shape="circle" style={{ color: 'var(--text-main)', fontSize: '1.2rem' }}>
                {themeMode === 'light' ? <SunOutlined /> : themeMode === 'dark' ? <MoonOutlined /> : <DesktopOutlined />}
              </Button>
            </Dropdown>

            <Button 
              type="primary" 
              shape="round" 
              size="large" 
              onClick={() => scrollToRegistration('1')}
              style={{ 
                fontWeight: 600,
                padding: '0 30px'
              }}
            >
              Inscrição Gratuita
            </Button>
          </div>
        </Header>

        <Content>
          {/* Top Marquee Section */}
          <div style={{ 
            padding: '12px 0', 
            background: 'var(--header-bg)', 
            borderBottom: '1px solid rgba(128, 128, 128, 0.1)',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center'
          }}>
            <div style={{ padding: '0 5%', marginRight: '20px', zIndex: 2, background: 'var(--header-bg)', position: 'relative' }}>
              <Text type="secondary" style={{ letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.75rem', color: 'var(--text-sec)', whiteSpace: 'nowrap', fontWeight: 600 }}>
                Marcas que Confiam
              </Text>
            </div>
            <div className="marquee-container" style={{ margin: 0, flex: 1, maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)' }}>
              <div className="marquee-content" style={{ animationDuration: '30s' }}>
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="sponsor-logo" style={{ margin: '0 30px' }}>
                    <img 
                      src={`https://api.dicebear.com/7.x/initials/svg?seed=Brand${i+1}&backgroundColor=e2e8f0&textColor=1e293b&fontFamily=Arial&fontSize=40`} 
                      alt={`Sponsor ${i+1}`}
                      style={{ height: '24px', opacity: 0.6, filter: 'grayscale(100%)' }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Hero Section */}
          <section id="inicio" style={{ 
            padding: '120px 5% 100px', 
            background: 'var(--bg-base)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <Row justify="center" align="middle" style={{ position: 'relative', zIndex: 1 }}>
              <Col xs={24} md={20} lg={16} style={{ textAlign: 'center' }}>
                <Space orientation="vertical" size="large" style={{ width: '100%' }}>
                  <div style={{ marginBottom: '30px' }}>
                    <img src="https://i.imgur.com/UgYNeIO.png" alt="Digitalent26 Large Logo" style={{ maxWidth: '280px', width: '100%', height: 'auto' }} />
                  </div>
                  <div style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '10px', 
                    padding: '8px 16px', 
                    background: 'rgba(37, 99, 235, 0.05)', 
                    borderRadius: '50px', 
                    border: '1px solid rgba(37, 99, 235, 0.1)',
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
                    color: 'var(--text-main)',
                    letterSpacing: '-0.02em'
                  }}>
                    Transforme o seu <span style={{ color: '#2563eb' }}>Negócio Local</span> na Era Digital
                  </Title>

                  <Paragraph style={{ 
                    fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', 
                    color: 'var(--text-sec)', 
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
                        boxShadow: '0 10px 30px rgba(37, 99, 235, 0.2)'
                      }}
                    >
                      Inscrição Gratuita
                    </Button>
                    <Button 
                      size="large" 
                      shape="round"
                      icon={<CalendarOutlined />} 
                      href="#cronograma"
                      style={{ 
                        height: '60px', 
                        padding: '0 32px', 
                        fontSize: '1.1rem', 
                        color: 'var(--text-main)',
                        borderColor: 'var(--border-color)'
                      }}
                    >
                      Ver Agenda
                    </Button>
                  </Space>
                </Space>
              </Col>
            </Row>

            <Row gutter={[24, 24]} style={{ marginTop: '100px' }}>
              <Col xs={24} md={8}>
                <div style={{ textAlign: 'center', padding: '20px' }}>
                  <RiseOutlined style={{ fontSize: '32px', color: '#2563eb', marginBottom: '15px' }} />
                  <Title level={5} style={{ color: 'var(--text-main)' }}>Crescimento Real</Title>
                  <Text style={{ color: 'var(--text-sec)' }}>Focado em resultados mensuráveis para o seu negócio.</Text>
                </div>
              </Col>
              <Col xs={24} md={8}>
                <div style={{ textAlign: 'center', padding: '20px' }}>
                  <TeamOutlined style={{ fontSize: '32px', color: '#2563eb', marginBottom: '15px' }} />
                  <Title level={5} style={{ color: 'var(--text-main)' }}>Comunidade Local</Title>
                  <Text style={{ color: 'var(--text-sec)' }}>Conecte-se com outros empresários da sua região.</Text>
                </div>
              </Col>
              <Col xs={24} md={8}>
                <div style={{ textAlign: 'center', padding: '20px' }}>
                  <RocketOutlined style={{ fontSize: '32px', color: '#2563eb', marginBottom: '15px' }} />
                  <Title level={5} style={{ color: 'var(--text-main)' }}>Estratégia Ágil</Title>
                  <Text style={{ color: 'var(--text-sec)' }}>Implementação rápida e eficiente sem complicações.</Text>
                </div>
              </Col>
            </Row>
          </section>

          {/* About Section */}
          <section id="sobre" style={{ padding: '100px 5%', background: 'var(--bg-alt)' }}>
            <Row gutter={[48, 48]} align="middle">
              <Col xs={24} lg={12}>
                <div style={{ paddingRight: '20px' }}>
                  <Title level={2} style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--text-main)', marginBottom: '24px' }}>
                    O Desafio do <span style={{ color: '#2563eb' }}>Negócio Tradicional</span>
                  </Title>
                  <Paragraph style={{ fontSize: '1.1rem', color: 'var(--text-sec)', marginBottom: '32px' }}>
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
                          <Text strong style={{ fontSize: '1.1rem', display: 'block', color: 'var(--text-main)' }}>{item.title}</Text>
                          <Text style={{ color: 'var(--text-sec)' }}>{item.desc}</Text>
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
                    background:  'var(--card-bg)',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    borderRadius: '24px',
                    padding: '20px'
                  }}
                >
                  <SolutionOutlined style={{ fontSize: '48px', color: '#2563eb', marginBottom: '24px' }} />
                  <Title level={3} style={{ color: 'var(--text-main)' }}>A Solução Digitalent26</Title>
                  <Paragraph style={{ color: 'var(--text-sec)' }}>
                    O Digitalent26 não é apenas mais um evento teórico. É um acelerador prático onde sairá com o plano exato para digitalizar a sua presença e aumentar a faturação utilizando o poder da internet.
                  </Paragraph>
                  <Divider style={{ borderColor: 'rgba(0, 0, 0, 0.05)' }} />
                  <Row gutter={[16, 16]}>
                    <Col span={12}>
                      <Statistic title={<span style={{color: 'var(--text-sec)'}}>Eficácia</span>} value={98} suffix="%" valueStyle={{ color: 'var(--text-main)', fontWeight: 'bold' }} />
                    </Col>
                    <Col span={12}>
                      <Statistic title={<span style={{color: 'var(--text-sec)'}}>Retorno</span>} value="ROI+" valueStyle={{ color: 'var(--text-main)', fontWeight: 'bold' }} />
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </section>

          {/* Speakers Section */}
          <section id="oradores" style={{ padding: '120px 5%', background: 'var(--bg-base)' }}>
            <div style={{ textAlign: 'center', marginBottom: '80px' }}>
              <Title level={2} style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: 'var(--text-main)', marginBottom: '16px' }}>Oradores Confirmados</Title>
              <Text style={{ fontSize: '1.2rem', color: 'var(--text-sec)' }}>Especialistas prontos para partilhar o caminho do sucesso.</Text>
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
                <Card 
                  key={index} 
                  bordered={false} 
                  style={{ 
                    background:  'var(--card-bg)', 
                    borderRadius: '24px', 
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                  bodyStyle={{ padding: '40px' }}
                >
                  <Row gutter={[48, 48]} align="middle" style={{ flexDirection: index % 2 !== 0 ? 'row-reverse' : 'row' }}>
                    <Col xs={24} lg={10}>
                      <div style={{ 
                        position: 'relative', 
                        borderRadius: '16px', 
                        overflow: 'hidden',
                        aspectRatio: '3/4',
                        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)'
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
                          padding: '30px',
                          background: 'linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, transparent 100%)',
                          zIndex: 3
                        }}>
                          <Title level={3} style={{ color: '#fff', margin: 0, fontWeight: 800 }}>{speaker.name}</Title>
                          <Text style={{ color: 'var(--border-color)', fontSize: '1.1rem', opacity: 0.9 }}>{speaker.role}</Text>
                          <br />
                          <Text strong style={{ color: 'var(--brand-blue)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{speaker.company}</Text>
                        </div>
                      </div>
                    </Col>
                    <Col xs={24} lg={14}>
                      <div style={{ padding: '0 10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                          <div style={{ width: '40px', height: '2px', background: '#2563eb' }} />
                          <Text strong style={{ color: '#2563eb', fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
                            Especialista em...
                          </Text>
                        </div>
                        
                        <Title level={2} style={{ color: 'var(--text-main)', marginBottom: '32px', fontSize: '2.2rem' }}>
                          {speaker.expertise}
                        </Title>

                        {speaker.bio.map((paragraph, pIndex) => (
                          <Paragraph key={pIndex} style={{ fontSize: '1.15rem', color: 'var(--text-sec)', lineHeight: '1.8', marginBottom: '24px', textAlign: 'justify' }}>
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

          {/* Schedule Section */}
          <section id="cronograma" style={{ padding: '100px 5%', background: 'var(--bg-alt)' }}>
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
              <Title level={2} style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--text-main)' }}>Cronograma do Evento</Title>
              <Text type="secondary" style={{ fontSize: '1.1rem', color: 'var(--text-sec)' }}>Um dia intensivo focado em resultados práticos.</Text>
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
                          <Title level={4} style={{ color: 'var(--text-main)' }}>Abertura & Desmistificação</Title>
                          <Text type="secondary" style={{ color: 'var(--text-sec)' }}>O marketing digital para pequenos negócios sem complicações.</Text>
                        </div>
                      ),
                      dot: <BulbOutlined style={{ fontSize: '20px', color: '#2563eb' }} />,
                    },
                    {
                      label: <Text style={{ color: '#2563eb', fontWeight: 700 }}>10:30</Text>,
                      children: (
                        <div style={{ textAlign: 'right', marginBottom: '40px' }}>
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
          <section style={{ padding: '40px 0 80px', background: 'var(--bg-alt)', overflow: 'hidden' }}>
            <Row justify="center">
              <Col xs={22} md={16} lg={12}>
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
                    onClick={() => scrollToRegistration('2')}
                  >
                    Receber Dossier de Patrocínio
                  </Button>
                </Card>
              </Col>
            </Row>
          </section>

          {/* Location Section */}
          <section id="informacoes" style={{ padding: '120px 5%', background: 'var(--bg-base)' }}>
            <div style={{ marginBottom: '60px' }}>
              <Title level={2} style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: 'var(--text-main)' }}>Onde será o Digitalent 26</Title>
              <Paragraph style={{ fontSize: '1.2rem', color: 'var(--text-sec)' }}>Prepare-se para um dia de imersão total no IEFP de Rio Meão.</Paragraph>
            </div>

            <Row gutter={[64, 64]} align="middle">
              <Col xs={24} md={12}>
                <Space orientation="vertical" size={40} style={{ width: '100%' }}>
                  <div>
                    <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', marginBottom: '32px' }}>
                      <EnvironmentOutlined style={{ fontSize: '28px', color: '#2563eb', marginTop: '5px' }} />
                      <div>
                        <Text strong style={{ fontSize: '1.2rem', display: 'block', color: 'var(--text-main)' }}>Endereço</Text>
                        <Text style={{ fontSize: '1.1rem', color: 'var(--text-sec)' }}>Av. Santiago 68-88, Rio Meão - Auditório do IEFP</Text>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', marginBottom: '32px' }}>
                      <PhoneOutlined style={{ fontSize: '28px', color: '#2563eb', marginTop: '5px' }} />
                      <div>
                        <Text strong style={{ fontSize: '1.2rem', display: 'block', color: 'var(--text-main)' }}>Telefone</Text>
                        <Text style={{ fontSize: '1.1rem', color: 'var(--text-sec)' }}>999 999 999</Text>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', marginBottom: '32px' }}>
                      <MailOutlined style={{ fontSize: '28px', color: '#2563eb', marginTop: '5px' }} />
                      <div>
                        <Text strong style={{ fontSize: '1.2rem', display: 'block', color: 'var(--text-main)' }}>Email</Text>
                        <Text style={{ fontSize: '1.1rem', color: 'var(--text-sec)' }}>contato@digitalent.pt</Text>
                      </div>
                    </div>
                  </div>

                  <Card style={{ background: 'var(--bg-alt)', borderColor: 'var(--border-color)', borderRadius: '16px' }}>
                    <Title level={5} style={{ color: '#2563eb', marginBottom: '16px' }}>Horário do Evento</Title>
                    <Space orientation="vertical" style={{ width: '100%' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Text style={{ color: 'var(--text-sec)' }}>Início</Text>
                        <Text strong style={{ color: 'var(--text-main)' }}>10:00</Text>
                      </div>
                      <Divider style={{ margin: '8px 0', borderColor: 'var(--border-color)' }} />
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Text style={{ color: 'var(--text-sec)' }}>Almoço</Text>
                        <Text strong style={{ color: 'var(--text-main)' }}>12:00 - 13:00</Text>
                      </div>
                      <Divider style={{ margin: '8px 0', borderColor: 'var(--border-color)' }} />
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Text style={{ color: 'var(--text-sec)' }}>Encerramento</Text>
                        <Text strong style={{ color: 'var(--text-main)' }}>17:00</Text>
                      </div>
                    </Space>
                  </Card>
                </Space>
              </Col>

              <Col xs={24} md={12}>
                <div style={{ 
                  position: 'relative', 
                  borderRadius: '30px', 
                  overflow: 'hidden', 
                  height: '500px',
                  background: 'var(--bg-alt)',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  padding: '40px'
                }}>
                  <div style={{ 
                    position: 'absolute', 
                    top: 0, left: 0, right: 0, bottom: 0, 
                    opacity: 0.05, 
                    backgroundImage: 'radial-gradient(#2563eb 1px, transparent 1px)', 
                    backgroundSize: '20px 20px' 
                  }} />
                  
                  <div style={{ position: 'relative', zIndex: 2 }}>
                    <EnvironmentOutlined style={{ fontSize: '64px', color: '#2563eb', marginBottom: '24px' }} />
                    <Title level={3} style={{ color: 'var(--text-main)' }}>Localização Exata</Title>
                    <Paragraph style={{ color: 'var(--text-sec)', marginBottom: '40px' }}>
                      Auditório do IEFP - Rio Meão.<br />Estacionamento gratuito disponível no local.
                    </Paragraph>
                    
                    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                      <Button 
                        block 
                        size="large" 
                        type="primary"
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
                        style={{ height: '56px', borderRadius: '12px', fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-main)', borderColor: 'var(--border-color)' }}
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
          <section id="inscricao" style={{ padding: '120px 5%', background: 'var(--bg-alt)' }}>
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
              <Title level={2} style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: 'var(--text-main)' }}>Garanta a Sua Presença</Title>
              <Paragraph style={{ fontSize: '1.2rem', color: 'var(--text-sec)' }}>Escolha a sua forma de participar na transformação digital de Rio Meão.</Paragraph>
            </div>

            <Row justify="center">
              <Col xs={24} md={20} lg={16} xl={14}>
                <div style={{ 
                  background:  'var(--card-bg)', 
                  border: '1px solid #e2e8f0', 
                  borderRadius: '32px', 
                  padding: '40px',
                  boxShadow: '0 20px 50px rgba(0, 0, 0, 0.05)'
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
                              <Title level={4} style={{ marginTop: '20px', color: 'var(--text-main)' }}>Ouvinte / Participante Local</Title>
                              <Text style={{ color: 'var(--text-sec)' }}>Acesso total às palestras, networking e recursos exclusivos do evento.</Text>
                            </div>

                            <Form 
                              layout="vertical" 
                              onFinish={(values) => handleFormSubmit(values, 'Participante')}
                            >
                              <Row gutter={16}>
                                <Col xs={24} md={12}>
                                  <Form.Item label={<Text strong style={{ color: 'var(--text-main)' }}>Nome Completo</Text>} name="nome" rules={[{ required: true, message: 'Por favor, insira o seu nome.' }]}>
                                    <Input prefix={<UserOutlined style={{ color: '#94a3b8' }} />} placeholder="Ex: João Silva" size="large" />
                                  </Form.Item>
                                </Col>
                                <Col xs={24} md={12}>
                                  <Form.Item label={<Text strong style={{ color: 'var(--text-main)' }}>Telemóvel</Text>} name="telemovel" rules={[{ required: true, message: 'Por favor, insira o seu contacto.' }]}>
                                    <Input prefix={<PhoneIcon style={{ color: '#94a3b8' }} />} placeholder="912 345 678" size="large" />
                                  </Form.Item>
                                </Col>
                              </Row>

                              <Form.Item label={<Text strong style={{ color: 'var(--text-main)' }}>E-mail Profissional</Text>} name="email" rules={[{ required: true, type: 'email', message: 'Insira um e-mail válido.' }]}>
                                <Input prefix={<MailIcon style={{ color: '#94a3b8' }} />} placeholder="joao@empresa.pt" size="large" />
                              </Form.Item>

                              <Form.Item label={<Text strong style={{ color: 'var(--text-main)' }}>Nome da Empresa / Ramo (Opcional)</Text>} name="empresa">
                                <Input prefix={<ShopOutlined style={{ color: '#94a3b8' }} />} placeholder="Ex: Café Central / Restauração" size="large" />
                              </Form.Item>

                              <Form.Item style={{ marginTop: '40px' }}>
                                <Button 
                                  type="primary" 
                                  size="large" 
                                  shape="round" 
                                  htmlType="submit"
                                  block
                                  loading={isSubmitting}
                                  style={{ 
                                    height: '60px', 
                                    fontSize: '1.1rem', 
                                    fontWeight: 700,
                                    boxShadow: '0 4px 14px 0 rgba(37, 99, 235, 0.39)'
                                  }}
                                >
                                  Quero me inscrever agora
                                </Button>
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
                              <Title level={4} style={{ color: 'var(--text-main)' }}>Candidatura a Patrocínio</Title>
                              <Text style={{ color: 'var(--text-sec)' }}>Posicione a sua marca perante centenas de decisões locais e lidere o mercado.</Text>
                            </div>

                            <Form 
                              layout="vertical"
                              onFinish={(values) => handleFormSubmit(values, 'Parceiro')}
                            >
                              <Row gutter={16}>
                                <Col xs={24} md={12}>
                                  <Form.Item label={<Text strong style={{ color: 'var(--text-main)' }}>Nome da Empresa</Text>} name="empresa" rules={[{ required: true }]}>
                                    <Input prefix={<ShopOutlined style={{ color: '#94a3b8' }} />} placeholder="Empresa S.A." size="large" />
                                  </Form.Item>
                                </Col>
                                <Col xs={24} md={12}>
                                  <Form.Item label={<Text strong style={{ color: 'var(--text-main)' }}>Nome do Responsável</Text>} name="responsavel" rules={[{ required: true }]}>
                                    <Input prefix={<UserOutlined style={{ color: '#94a3b8' }} />} placeholder="Nome Completo" size="large" />
                                  </Form.Item>
                                </Col>
                              </Row>

                              <Row gutter={16}>
                                <Col xs={24} md={12}>
                                  <Form.Item label={<Text strong style={{ color: 'var(--text-main)' }}>E-mail de Contacto</Text>} name="email" rules={[{ required: true, type: 'email' }]}>
                                    <Input prefix={<MailIcon style={{ color: '#94a3b8' }} />} placeholder="email@empresa.pt" size="large" />
                                  </Form.Item>
                                </Col>
                                <Col xs={24} md={12}>
                                  <Form.Item label={<Text strong style={{ color: 'var(--text-main)' }}>Telemóvel</Text>} name="telemovel" rules={[{ required: true }]}>
                                    <Input prefix={<PhoneIcon style={{ color: '#94a3b8' }} />} placeholder="9xx xxx xxx" size="large" />
                                  </Form.Item>
                                </Col>
                              </Row>

                              <Form.Item label={<Text strong style={{ color: 'var(--text-main)' }}>Nível de Interesse</Text>} name="nivel" rules={[{ required: true }]}>
                                <Select size="large" placeholder="Selecione o nível de patrocínio">
                                  <Select.Option value="bronze">Passe Bronze</Select.Option>
                                  <Select.Option value="prata">Passe Prata</Select.Option>
                                  <Select.Option value="ouro">Passe Ouro</Select.Option>
                                  <Select.Option value="investidor">Quero ser Investidor Principal</Select.Option>
                                </Select>
                              </Form.Item>

                              <Form.Item label={<Text strong style={{ color: 'var(--text-main)' }}>Objetivos no Evento</Text>} name="objetivos">
                                <Input.TextArea rows={4} placeholder="Conte-nos brevemente o que espera alcançar com esta parceria..." style={{ borderRadius: '12px', background: 'var(--bg-alt)' }} />
                              </Form.Item>

                              <Form.Item style={{ marginTop: '40px' }}>
                                <Button 
                                  type="default" 
                                  htmlType="submit" 
                                  block 
                                  size="large" 
                                  loading={isSubmitting}
                                  style={{ 
                                    height: '60px', 
                                    fontSize: '1.1rem', 
                                    fontWeight: 700, 
                                    borderRadius: '30px',
                                    border: '2px solid #2563eb',
                                    color: '#2563eb'
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
          background: 'var(--bg-base)', 
          borderTop: '1px solid #e2e8f0',
          padding: '40px 0'
        }}>
          <Space size="large" style={{ marginBottom: '20px' }}>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-sec)', fontSize: '24px', transition: 'color 0.3s' }} className="social-icon">
              <InstagramOutlined />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-sec)', fontSize: '24px', transition: 'color 0.3s' }} className="social-icon">
              <LinkedinOutlined />
            </a>
          </Space>
          <br />
          <Text style={{ color: 'var(--text-sec)' }}>
            © 2026 Digitalent26 - Marketing com Visão. Desenvolvido pela{' '}
            <a 
              href="https://fslsolution.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ color: '#2563eb', fontWeight: 600 }}
            >
              @FSLSolution
            </a>
            {' '} - Todos os direitos reservados.
          </Text>
        </Footer>
      </Layout>
    </ConfigProvider>
  );
};

export default LandingPage;
