import React, { useEffect, useState, Suspense, lazy } from 'react';
import { Layout, Button, Typography, Row, Col, Space, ConfigProvider, Card, Divider, Statistic, Tabs, Form, Input, Select, Badge, notification, Dropdown, theme, Drawer, Grid } from 'antd';
import { RocketOutlined, CalendarOutlined, GlobalOutlined, TeamOutlined, RiseOutlined, CheckCircleOutlined, SolutionOutlined, UserOutlined, ShopOutlined, MailOutlined as MailIcon, PhoneOutlined as PhoneIcon, InstagramOutlined, LinkedinOutlined, DesktopOutlined, MoonOutlined, SunOutlined, MenuOutlined } from '@ant-design/icons';

const SpeakersSection = lazy(() => import('./sections/SpeakersSection'));
const LocationSection = lazy(() => import('./sections/LocationSection'));
const ScheduleSection = lazy(() => import('./sections/ScheduleSection'));

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

const { useBreakpoint } = Grid;

const LandingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('1');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [themeMode, setThemeMode] = useState<ThemeMode>('auto');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  
  const screens = useBreakpoint();

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

  // Scroll listener for Sticky CTA
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 600) {
        setShowStickyCTA(true);
      } else {
        setShowStickyCTA(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
          
          {screens.md && (
            <div className="desktop-menu" style={{ display: 'flex', gap: '20px' }}>
              <Button type="link" href="#sobre" style={{ color: 'var(--text-main)', fontWeight: 600 }}>Sobre</Button>
              <Button type="link" href="#oradores" style={{ color: 'var(--text-main)', fontWeight: 600 }}>Oradores</Button>
              <Button type="link" href="#cronograma" style={{ color: 'var(--text-main)', fontWeight: 600 }}>Cronograma</Button>
              <Button type="link" href="#informacoes" style={{ color: 'var(--text-main)', fontWeight: 600 }}>Informações</Button>
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: screens.xs ? '8px' : '16px' }}>
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

            {screens.md && (
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
            )}

            {!screens.md && (
              <Button 
                type="text" 
                icon={<MenuOutlined />} 
                style={{ fontSize: '1.5rem', color: '#2563eb' }}
                onClick={() => setMobileMenuVisible(true)}
              />
            )}
          </div>

          <Drawer
            title={<span style={{ color: '#2563eb', fontWeight: 800 }}>Menu</span>}
            placement="right"
            onClose={() => setMobileMenuVisible(false)}
            open={mobileMenuVisible}
            bodyStyle={{ padding: '24px', background: 'var(--bg-base)' }}
            headerStyle={{ background: 'var(--header-bg)', borderBottom: '1px solid rgba(0,0,0,0.05)' }}
            closeIcon={<span style={{ color: 'var(--text-main)' }}>X</span>}
          >
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <Button type="link" block href="#sobre" onClick={() => setMobileMenuVisible(false)} style={{ textAlign: 'left', color: 'var(--text-main)', fontSize: '1.2rem', padding: 0 }}>Sobre</Button>
              <Divider style={{ margin: 0, borderColor: 'var(--border-color)' }} />
              <Button type="link" block href="#oradores" onClick={() => setMobileMenuVisible(false)} style={{ textAlign: 'left', color: 'var(--text-main)', fontSize: '1.2rem', padding: 0 }}>Oradores</Button>
              <Divider style={{ margin: 0, borderColor: 'var(--border-color)' }} />
              <Button type="link" block href="#cronograma" onClick={() => setMobileMenuVisible(false)} style={{ textAlign: 'left', color: 'var(--text-main)', fontSize: '1.2rem', padding: 0 }}>Cronograma</Button>
              <Divider style={{ margin: 0, borderColor: 'var(--border-color)' }} />
              <Button type="link" block href="#informacoes" onClick={() => setMobileMenuVisible(false)} style={{ textAlign: 'left', color: 'var(--text-main)', fontSize: '1.2rem', padding: 0 }}>Informações</Button>
              <Divider style={{ margin: 0, borderColor: 'var(--border-color)' }} />
              <Button 
                type="primary" 
                block 
                size="large" 
                onClick={() => {
                  setMobileMenuVisible(false);
                  scrollToRegistration('1');
                }}
                style={{ marginTop: '20px', height: '48px', fontSize: '1.1rem', borderRadius: '8px' }}
              >
                Inscrição Gratuita
              </Button>
            </Space>
          </Drawer>
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
                      src="/client-logo-v2.png" 
                      alt={`Sponsor ${i+1}`}
                      style={{ height: '120px', objectFit: 'contain' }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Hero Section */}
          <section id="inicio" style={{ 
            padding: screens.xs ? '60px 5% 80px' : '120px 5% 100px', 
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
                    O Digital Talent ’26 nasce como o ponto de encontro de mentes inquietas que procuram transformar o futuro do mercado. Sob o conceito Marketing com Visão, o evento vai além das métricas superficiais, mergulhando nas estratégias e tendências que estão a redefinir a ligação entre marcas e pessoas. O evento reúne especialistas e talentos para oferecer uma experiência única a quem não quer apenas acompanhar a evolução digital, mas sim vivenciá-la com resultados reais.
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
          <Suspense fallback={<div style={{ padding: '120px 5%', textAlign: 'center', color: 'var(--text-sec)' }}>A carregar oradores...</div>}>
            <SpeakersSection />
          </Suspense>

          {/* Schedule & Sponsors Section */}
          <Suspense fallback={<div style={{ padding: '100px 5%', textAlign: 'center', color: 'var(--text-sec)' }}>A carregar cronograma...</div>}>
            <ScheduleSection onRegisterClick={scrollToRegistration} />
          </Suspense>

          {/* Location Section */}
          <Suspense fallback={<div style={{ padding: '120px 5%', textAlign: 'center', color: 'var(--text-sec)' }}>A carregar mapa...</div>}>
            <LocationSection />
          </Suspense>

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

        {/* Sticky Mobile CTA */}
        {screens.xs && showStickyCTA && (
          <div style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '16px 5%',
            background: 'var(--bg-base)',
            borderTop: '1px solid rgba(0,0,0,0.1)',
            boxShadow: '0 -4px 10px rgba(0,0,0,0.05)',
            zIndex: 999,
            animation: 'slideUp 0.3s ease-out'
          }}>
            <Button 
              type="primary" 
              block 
              size="large" 
              onClick={() => {
                scrollToRegistration('1');
                setShowStickyCTA(false);
              }}
              style={{ height: '48px', fontSize: '1.1rem', borderRadius: '8px', boxShadow: '0 4px 15px rgba(37, 99, 235, 0.4)' }}
            >
              Inscrição Grátis
            </Button>
          </div>
        )}
      </Layout>
    </ConfigProvider>
  );
};

export default LandingPage;
