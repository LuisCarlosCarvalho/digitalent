import React, { useEffect, useState, Suspense, lazy } from "react";
import {
  Layout,
  Button,
  Typography,
  Row,
  Col,
  Space,
  ConfigProvider,
  Card,
  Divider,
  Statistic,
  Form,
  Input,
  Badge,
  notification,
  Dropdown,
  theme,
  Drawer,
  Grid,
  Spin,
  Modal,
  Checkbox,
} from "antd";
import {
  RocketOutlined,
  CalendarOutlined,
  TeamOutlined,
  RiseOutlined,
  CheckCircleOutlined,
  SolutionOutlined,
  UserOutlined,
  ShopOutlined,
  MailOutlined as MailIcon,
  PhoneOutlined as PhoneIcon,
  DesktopOutlined,
  MoonOutlined,
  SunOutlined,
  MenuOutlined,
  EyeOutlined,
} from "@ant-design/icons";

const SpeakersSection = lazy(() => import("./sections/SpeakersSection"));
const LocationSection = lazy(() => import("./sections/LocationSection"));
const ScheduleSection = lazy(() => import("./sections/ScheduleSection"));
import CountdownTimer from "./sections/CountdownTimer";
import MainHeroPage from "./sections/MainHeroPage";
import { Footer as CustomFooter } from "./Footer";

const { Header, Content } = Layout;
const { Title, Text, Paragraph } = Typography;

const getBaseThemeConfig = () => ({
  algorithm: theme.defaultAlgorithm,
  token: {
    colorPrimary: "#2563eb", // Azul Royal da Marca
    colorBgBase: "#f8fafc",
    colorTextBase: "#0f172a",
    borderRadius: 8,
    fontFamily: "'Inter', sans-serif",
  },
  components: {
    Button: {
      colorPrimary: "#2563eb",
      algorithm: true,
    },
    Input: {
      colorBgContainer: "#f8fafc",
    },
  },
});

const { useBreakpoint } = Grid;

const LandingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [loading, setLoading] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [showStickyCTA, setShowStickyCTA] = useState(false);

  const screens = useBreakpoint();

  const [hasConsented, setHasConsented] = useState(false);
  const [gdprModalVisible, setGdprModalVisible] = useState(false);
  const [gdprChecked, setGdprChecked] = useState(false);



  // Scroll listener for Sticky CTA
  useEffect(() => {
    const handleScroll = () => {
      setShowStickyCTA(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  const handleFormSubmit = async (
    values: Record<string, string>,
    type: "Participante" | "Parceiro",
  ) => {
    setLoading(true);
    try {
      const env = (import.meta as unknown as { env: Record<string, string | undefined> }).env;
      const apiUrl = env.VITE_API_URL || "";

      let endpoint = "";
      let payload = {};

      if (type === "Participante") {
        endpoint = "/api/participants/register";
        payload = {
          fullName: values.nome,
          emailAddress: values.email,
          phoneNumber: values.telemovel,
          companyName: values.empresa,
          dataProtectionConsent: true
        };
      } else {
        endpoint = "/api/partners/register";
        payload = {
          companyName: values.empresa,
          contactName: values.responsavel,
          emailAddress: values.email,
          phoneNumber: values.telemovel,
          objectives: values.objetivos,
          dataProtectionConsent: true
        };
      }

      const response = await fetch(`${apiUrl}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        // Track Facebook Pixel Event
        if (typeof window !== 'undefined' && (window as any).fbq) {
          (window as any).fbq('track', 'Lead', {
            content_name: type,
            status: 'Success'
          });
        }
        setSuccessModalVisible(true);
      } else {
        throw new Error("HTTP error " + response.status);
      }
    } catch (err) {
      notification.error({
        message: "Erro no Registo",
        description:
          "Não foi possível processar a tua inscrição neste momento. Por favor, verifica a tua ligação ou tenta novamente.",
        placement: "topRight",
        style: {
          fontFamily: "'Inter', sans-serif",
          color: "#1e293b",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const scrollToRegistration = (tabKey: string) => {
    setActiveTab(tabKey);
    const element = document.getElementById("inscricao");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const sponsorLogos = [
    "https://i.imgur.com/1USX4Kp.png",
    "https://i.imgur.com/n0g2qAC.png",
    "https://i.imgur.com/SFWphsk.png",
    "https://i.imgur.com/Plb9o3i.png",
    "https://i.imgur.com/EpDGrzT.png",
    "https://i.imgur.com/KvjOZO6.png",
    "https://i.imgur.com/bfYdCUW.png"
  ];

  return (
    <ConfigProvider theme={getBaseThemeConfig()}>
      <Layout style={{ minHeight: "100vh", background: "var(--bg-base)" }}>
        {/* Navigation Bar */}
        <Header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1000,
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "var(--header-bg)",
            backdropFilter: "blur(10px)",
            borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
            padding: "0 5%",
            height: "80px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src="https://i.imgur.com/EpDGrzT.png"
              alt="Digitalent26 Logo"
              style={{ height: "50px", width: "auto", marginRight: "10px" }}
            />
          </div>

          {screens.md && (
            <div
              className="desktop-menu"
              style={{ display: "flex", gap: "20px" }}
            >
              <Button
                type="link"
                href="#sobre"
                className="menu-link-btn"
                style={{ color: "var(--text-main)", fontWeight: 600 }}
              >
                Sobre
              </Button>
              <Button
                type="link"
                href="#oradores"
                className="menu-link-btn"
                style={{ color: "var(--text-main)", fontWeight: 600 }}
              >
                Oradores
              </Button>
              <Button
                type="link"
                href="#cronograma"
                className="menu-link-btn"
                style={{ color: "var(--text-main)", fontWeight: 600 }}
              >
                Cronograma
              </Button>
              <Button
                type="link"
                href="#informacoes"
                className="menu-link-btn"
                style={{ color: "var(--text-main)", fontWeight: 600 }}
              >
                Informações
              </Button>
            </div>
          )}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: screens.xs ? "8px" : "16px",
            }}
          >

            {screens.md && (
              <Button
                type="primary"
                shape="round"
                size="large"
                onClick={() => scrollToRegistration("1")}
                style={{
                  fontWeight: 600,
                  padding: "0 30px",
                }}
              >
                INSCREVA-SE AGORA
              </Button>
            )}

            {!screens.md && (
              <Button
                type="text"
                icon={<MenuOutlined />}
                style={{ fontSize: "1.5rem", color: "#2563eb" }}
                onClick={() => setMobileMenuVisible(true)}
              />
            )}
          </div>

          <Drawer
            title={
              <span style={{ color: "#2563eb", fontWeight: 800 }}>Menu</span>
            }
            placement="right"
            onClose={() => setMobileMenuVisible(false)}
            open={mobileMenuVisible}
            styles={{
              body: { padding: "24px", background: "var(--bg-base)" },
              header: {
                background: "var(--header-bg)",
                borderBottom: "1px solid rgba(0,0,0,0.05)",
              },
            }}
            closeIcon={<span style={{ color: "var(--text-main)" }}>X</span>}
          >
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              <Button
                type="link"
                block
                href="#sobre"
                className="menu-link-btn"
                onClick={() => setMobileMenuVisible(false)}
                style={{
                  textAlign: "left",
                  color: "var(--text-main)",
                  fontSize: "1.2rem",
                  padding: 0,
                }}
              >
                Sobre
              </Button>
              <Divider
                style={{ margin: 0, borderColor: "var(--border-color)" }}
              />
              <Button
                type="link"
                block
                href="#oradores"
                className="menu-link-btn"
                onClick={() => setMobileMenuVisible(false)}
                style={{
                  textAlign: "left",
                  color: "var(--text-main)",
                  fontSize: "1.2rem",
                  padding: 0,
                }}
              >
                Oradores
              </Button>
              <Divider
                style={{ margin: 0, borderColor: "var(--border-color)" }}
              />
              <Button
                type="link"
                block
                href="#cronograma"
                className="menu-link-btn"
                onClick={() => setMobileMenuVisible(false)}
                style={{
                  textAlign: "left",
                  color: "var(--text-main)",
                  fontSize: "1.2rem",
                  padding: 0,
                }}
              >
                Cronograma
              </Button>
              <Divider
                style={{ margin: 0, borderColor: "var(--border-color)" }}
              />
              <Button
                type="link"
                block
                href="#informacoes"
                className="menu-link-btn"
                onClick={() => setMobileMenuVisible(false)}
                style={{
                  textAlign: "left",
                  color: "var(--text-main)",
                  fontSize: "1.2rem",
                  padding: 0,
                }}
              >
                Informações
              </Button>
              <Divider
                style={{ margin: 0, borderColor: "var(--border-color)" }}
              />
              <Button
                type="primary"
                block
                size="large"
                onClick={() => {
                  setMobileMenuVisible(false);
                  scrollToRegistration("1");
                }}
                style={{
                  marginTop: "20px",
                  height: "48px",
                  fontSize: "1.1rem",
                  borderRadius: "8px",
                }}
              >
                INSCREVA-SE AGORA
              </Button>
            </Space>
          </Drawer>
        </Header>

        <Content>


          {/* Urgency Ticker Section */}
          <div
            style={{
              background: "#2563eb",
              color: "#ffffff",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              fontWeight: 500,
              fontSize: "1.1rem",
              letterSpacing: "1px",
            }}
          >
            <div
              className="marquee-container"
              style={{ margin: 0, padding: "8px 0", flex: 1 }}
            >
              <div
                className="marquee-content"
                style={{ animationDuration: "25s" }}
              >
                {[...Array(15)].map((_, i) => (
                  <div
                    key={i}
                    style={{ margin: "0 20px", whiteSpace: "nowrap" }}
                  >
                    EVENTO GRATUITO - VAGAS LIMITADAS
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Hero Section */}
          <div id="inicio">
            <MainHeroPage />
          </div>

            <Row gutter={[24, 24]} style={{ marginTop: "100px" }}>
              <Col xs={24} sm={12} lg={6}>
                <div style={{ textAlign: "center", padding: "20px" }}>
                  <EyeOutlined
                    style={{
                      fontSize: "32px",
                      color: "#2563eb",
                      marginBottom: "15px",
                    }}
                  />
                  <Title level={5} style={{ color: "var(--text-main)", fontSize: "1.1rem" }}>
                    Aumente a visibilidade do seu negócio
                  </Title>
                  <Text style={{ color: "var(--text-sec)", fontSize: "0.95rem" }}>
                    Descubra como ser encontrado por mais pessoas no Google, nas redes sociais e nos canais digitais mais relevantes para a sua atividade.
                  </Text>
                </div>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <div style={{ textAlign: "center", padding: "20px" }}>
                  <TeamOutlined
                    style={{
                      fontSize: "32px",
                      color: "#2563eb",
                      marginBottom: "15px",
                    }}
                  />
                  <Title level={5} style={{ color: "var(--text-main)", fontSize: "1.1rem" }}>
                    Atraia mais clientes
                  </Title>
                  <Text style={{ color: "var(--text-sec)", fontSize: "0.95rem" }}>
                    Aprenda estratégias práticas para transformar a sua presença digital em oportunidades reais de negócio e aumentar o número de clientes.
                  </Text>
                </div>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <div style={{ textAlign: "center", padding: "20px" }}>
                  <DesktopOutlined
                    style={{
                      fontSize: "32px",
                      color: "#2563eb",
                      marginBottom: "15px",
                    }}
                  />
                  <Title level={5} style={{ color: "var(--text-main)", fontSize: "1.1rem" }}>
                    Utilize ferramentas e técnicas acessíveis
                  </Title>
                  <Text style={{ color: "var(--text-sec)", fontSize: "0.95rem" }}>
                    Conheça soluções digitais simples e eficazes que pode implementar de imediato, mesmo sem conhecimentos técnicos avançados.
                  </Text>
                </div>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <div style={{ textAlign: "center", padding: "20px" }}>
                  <RocketOutlined
                    style={{
                      fontSize: "32px",
                      color: "#2563eb",
                      marginBottom: "15px",
                    }}
                  />
                  <Title level={5} style={{ color: "var(--text-main)", fontSize: "1.1rem" }}>
                    Crie um plano de crescimento para o futuro
                  </Title>
                  <Text style={{ color: "var(--text-sec)", fontSize: "0.95rem" }}>
                    Saia do evento com ideias concretas e uma visão clara sobre como utilizar o digital para fazer crescer o seu negócio de forma sustentável.
                  </Text>
                </div>
              </Col>
            </Row>

          {/* About Section */}
          <section
            id="sobre"
            style={{ padding: "100px 5%", background: "var(--bg-alt)" }}
          >
            <Row gutter={[48, 48]} align="middle">
              <Col xs={24} lg={12}>
                <div style={{ paddingRight: "20px" }}>
                  <Title
                    level={2}
                    style={{
                      fontSize: "clamp(2rem, 4vw, 3rem)",
                      color: "var(--text-main)",
                      marginBottom: "24px",
                    }}
                  >
                    Este evento é{" "}
                    <span style={{ color: "#2563eb" }}>
                      para si, se tem...
                    </span>
                  </Title>
                  <Paragraph
                    style={{
                      fontSize: "1.1rem",
                      color: "var(--text-sec)",
                      marginBottom: "32px",
                    }}
                  >
                    Sabemos que gerir um negócio local não é fácil. Entre a
                    operação diária e o atendimento ao cliente, sobra pouco
                    tempo para o marketing. Muitos sentem receio da tecnologia ou
                    acham que o digital é apenas para grandes marcas.
                  </Paragraph>
                  <Space
                    direction="vertical"
                    size="middle"
                    style={{ width: "100%" }}
                  >
                    {[
                      {
                        title: "Falta de Tempo",
                        desc: "O dia a dia do negócio ocupa-lhe parte do tempo e a presença online acaba por ficar para segundo plano.",
                      },
                      {
                        title: "Receio da Tecnologia",
                        desc: "Sente que o digital é cada vez mais importante, mas tem dúvidas sobre como utilizar a tecnologia a favor do seu negócio.",
                      },
                      {
                        title: "Resultados Lentos",
                        desc: "Já investiu tempo ou dinheiro no digital, mas os resultados demoram a aparecer e não sabe exatamente o que está a funcionar.",
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          gap: "16px",
                          alignItems: "flex-start",
                        }}
                      >
                        <CheckCircleOutlined
                          style={{
                            color: "#2563eb",
                            fontSize: "24px",
                            marginTop: "4px",
                          }}
                        />
                        <div>
                          <Text
                            strong
                            style={{
                              fontSize: "1.1rem",
                              display: "block",
                              color: "var(--text-main)",
                            }}
                          >
                            {item.title}
                          </Text>
                          <Text style={{ color: "var(--text-sec)" }}>
                            {item.desc}
                          </Text>
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
                    background: "var(--card-bg)",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    borderRadius: "24px",
                    padding: "20px",
                  }}
                >
                  <SolutionOutlined
                    style={{
                      fontSize: "48px",
                      color: "#2563eb",
                      marginBottom: "24px",
                    }}
                  />
                  <Title level={3} style={{ color: "var(--text-main)" }}>
                    A Solução Digitalent26
                  </Title>
                  <Paragraph style={{ color: "var(--text-sec)" }}>
                    O Digitalent26 não é apenas mais um evento teórico. É um
                    acelerador prático do qual sairá com o plano exato para
                    digitalizar a sua presença e aumentar a faturação utilizando
                    o poder da internet.
                  </Paragraph>
                  <Divider style={{ borderColor: "rgba(0, 0, 0, 0.05)" }} />
                  <div style={{ marginTop: "16px" }}>
                    <Button
                      type="primary"
                      shape="round"
                      size="large"
                      onClick={() => scrollToRegistration("1")}
                      style={{
                        height: "50px",
                        padding: "0 40px",
                        fontSize: "1rem",
                        fontWeight: 600,
                        background: "linear-gradient(90deg, #06b6d4, #2563eb)",
                        border: "none",
                        boxShadow: "0 10px 20px rgba(6, 182, 212, 0.3)",
                        width: "100%"
                      }}
                    >
                      INSCREVA-SE AGORA
                    </Button>
                  </div>
                </Card>
              </Col>
            </Row>
          </section>

          <Suspense
            fallback={
              <div style={{ padding: "120px 0", textAlign: "center" }}>
                <Spin size="large" />
              </div>
            }
          >
            <SpeakersSection />
          </Suspense>

          {/* Schedule & Sponsors Section */}
          <Suspense
            fallback={
              <div style={{ padding: "100px 0", textAlign: "center" }}>
                <Spin size="large" />
              </div>
            }
          >
            <ScheduleSection onRegisterClick={scrollToRegistration} />
          </Suspense>

          {/* Location Section */}
          <Suspense
            fallback={
              <div style={{ padding: "120px 0", textAlign: "center" }}>
                <Spin size="large" />
              </div>
            }
          >
            <LocationSection />
          </Suspense>

          {/* Registration Section */}
          <section
            id="inscricao"
            style={{ padding: "120px 5%", background: "var(--bg-alt)" }}
          >
            <div style={{ textAlign: "center", marginBottom: "60px" }}>
              <Title
                level={2}
                style={{
                  fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
                  color: "var(--text-main)",
                }}
              >
                INSCREVA-SE AGORA
              </Title>
              <Paragraph
                style={{ fontSize: "1.2rem", color: "var(--text-sec)" }}
              >
                Escolha a sua forma de participar na transformação digital de
                Rio Meão.
              </Paragraph>
            </div>

            <Row justify="center">
              <Col xs={24} md={20} lg={16} xl={14}>
                <div
                  style={{
                    background: "var(--card-bg)",
                    border: "1px solid #e2e8f0",
                    borderRadius: "32px",
                    padding: "40px",
                    boxShadow: "0 20px 50px rgba(0, 0, 0, 0.05)",
                  }}
                >
                  
                    <div style={{ paddingTop: "10px" }}>
                      <div
                        style={{
                          textAlign: "center",
                          marginBottom: "24px",
                        }}
                      >
                        <Badge
                          count="INSCRIÇÃO"
                          style={{
                            backgroundColor: "#2563eb",
                            padding: "0 20px",
                            height: "32px",
                            lineHeight: "32px",
                            fontSize: "0.9rem",
                            fontWeight: 800,
                            borderRadius: "16px",
                            letterSpacing: "0.5px",
                          }}
                        />
                        <Title
                          level={4}
                          style={{
                            marginTop: "20px",
                            marginBottom: "8px",
                            color: "var(--text-main)",
                            fontWeight: 800,
                          }}
                        >
                          Participante
                        </Title>
                        <Text
                          style={{
                            color: "var(--text-sec)",
                            fontSize: "0.9rem",
                          }}
                        >
                          Acesso total às palestras, networking e recursos
                          exclusivos do evento.
                        </Text>
                      </div>

                      {/* Ticket Container */}
                      <div
                        style={{
                          position: "relative",
                          border: "2px solid #2563eb",
                          borderRadius: "16px",
                          padding: "40px 24px 16px",
                          marginTop: "30px",
                        }}
                      >
                        {/* Top Border Mask */}
                        <div
                          style={{
                            position: "absolute",
                            top: "-2px",
                            left: "50%",
                            transform: "translateX(-50%)",
                            width: "64px",
                            height: "4px",
                            background: "var(--card-bg)",
                            zIndex: 1,
                          }}
                        />

                        {/* Top Notch */}
                        <div
                          style={{
                            position: "absolute",
                            top: "-2px",
                            left: "50%",
                            transform: "translateX(-50%)",
                            width: "60px",
                            height: "30px",
                            background: "transparent",
                            borderBottomLeftRadius: "30px",
                            borderBottomRightRadius: "30px",
                            border: "2px solid #2563eb",
                            borderTop: "none",
                            zIndex: 2,
                          }}
                        />

                        <div>
                          <Form
                            layout="vertical"
                            onFinish={(values) =>
                              handleFormSubmit(values, "Participante")
                            }
                          >
                          <Row gutter={16}>
                            <Col xs={24} md={12}>
                              <Form.Item
                                label={
                                  <Text
                                    strong
                                    style={{
                                      color: "var(--text-main)",
                                      fontSize: "0.85rem",
                                    }}
                                  >
                                    <span style={{ color: "#ef4444" }}>
                                      *
                                    </span>{" "}
                                    Nome Completo
                                  </Text>
                                }
                                name="nome"
                                rules={[
                                  {
                                    required: true,
                                    message:
                                      "Por favor, insira o seu nome.",
                                  },
                                ]}
                              >
                                <Input
                                  prefix={
                                    <UserOutlined
                                      style={{ color: "#94a3b8" }}
                                    />
                                  }
                                  placeholder="Ex: João Silva"
                                  size="large"
                                  style={{ borderRadius: "8px" }}
                                />
                              </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                              <Form.Item
                                label={
                                  <Text
                                    strong
                                    style={{
                                      color: "var(--text-main)",
                                      fontSize: "0.85rem",
                                    }}
                                  >
                                    Telemóvel (Opcional)
                                  </Text>
                                }
                                name="telemovel"
                              >
                                <Input
                                  prefix={
                                    <PhoneIcon
                                      style={{ color: "#94a3b8" }}
                                    />
                                  }
                                  placeholder="912 345 678"
                                  size="large"
                                  style={{ borderRadius: "8px" }}
                                />
                              </Form.Item>
                            </Col>
                          </Row>

                          <Form.Item
                            label={
                              <Text
                                strong
                                style={{
                                  color: "var(--text-main)",
                                  fontSize: "0.85rem",
                                }}
                              >
                                <span style={{ color: "#ef4444" }}>
                                  *
                                </span>{" "}
                                E-mail
                              </Text>
                            }
                            name="email"
                            rules={[
                              {
                                required: true,
                                type: "email",
                                message: "Insira um e-mail válido.",
                              },
                            ]}
                          >
                            <Input
                              prefix={
                                <MailIcon style={{ color: "#94a3b8" }} />
                              }
                              placeholder="joao@empresa.pt"
                              size="large"
                              style={{ borderRadius: "8px" }}
                            />
                          </Form.Item>

                          <Form.Item
                            label={
                              <Text
                                strong
                                style={{
                                  color: "var(--text-main)",
                                  fontSize: "0.85rem",
                                }}
                              >
                                Nome da Empresa / Ramo (Opcional)
                              </Text>
                            }
                            name="empresa"
                          >
                            <Input
                              prefix={
                                <ShopOutlined
                                  style={{ color: "#94a3b8" }}
                                />
                              }
                              placeholder="Ex: Café Central / Restauração"
                              size="large"
                              style={{ borderRadius: "8px" }}
                            />
                          </Form.Item>

                          <Form.Item
                            name="gdpr"
                            valuePropName="checked"
                            rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject(new Error("Este campo é obrigatório")) }]}
                            style={{ marginTop: "16px", marginBottom: "24px", textAlign: "center" }}
                          >
                            <Checkbox style={{ fontSize: "12px", color: "var(--text-sec)", fontWeight: 500 }}>
                              Li e aceito a <a onClick={(e) => { e.preventDefault(); setGdprModalVisible(true); }} style={{ color: "#2563eb" }}>política de privacidade e proteção de dados (RGPD)</a>
                            </Checkbox>
                          </Form.Item>

                          <Form.Item
                            style={{
                              marginTop: "0",
                              marginBottom: "24px",
                            }}
                          >
                            <Button
                              type="primary"
                              size="large"
                              shape="round"
                              htmlType="submit"
                              block
                              loading={loading}
                              disabled={loading}
                              style={{
                                height: "56px",
                                fontSize: "1.1rem",
                                fontWeight: 700,
                                background: "#2563eb",
                              }}
                            >
                              INSCREVA-SE AGORA
                            </Button>
                          </Form.Item>
                        </Form>
                        </div>

                        {/* Benefits & Barcode Row */}
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            flexWrap: "wrap",
                            gap: "20px",
                          }}
                        >
                          <div
                            style={{
                              fontSize: "0.85rem",
                              color: "var(--text-main)",
                              fontWeight: 500,
                              lineHeight: 1.6,
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                gap: "8px",
                                alignItems: "center",
                              }}
                            >
                              <span
                                style={{
                                  color: "#2563eb",
                                  fontSize: "10px",
                                }}
                              >
                                ❯
                              </span>{" "}
                              Acesso total ao evento
                            </div>
                            <div
                              style={{
                                display: "flex",
                                gap: "8px",
                                alignItems: "center",
                              }}
                            >
                              <span
                                style={{
                                  color: "#2563eb",
                                  fontSize: "10px",
                                }}
                              >
                                ❯
                              </span>{" "}
                              Coffee-break
                            </div>
                            <div
                              style={{
                                display: "flex",
                                gap: "8px",
                                alignItems: "center",
                              }}
                            >
                              <span
                                style={{
                                  color: "#2563eb",
                                  fontSize: "10px",
                                }}
                              >
                                ❯
                              </span>{" "}
                              Kit Digitalent'26
                            </div>
                            <div
                              style={{
                                display: "flex",
                                gap: "8px",
                                alignItems: "center",
                              }}
                            >
                              <span
                                style={{
                                  color: "#2563eb",
                                  fontSize: "10px",
                                }}
                              >
                                ❯
                              </span>{" "}
                              Rede de networking
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                            }}
                          >
                            {/* CSS Barcode Simulation to avoid external images */}
                            <div
                              style={{
                                display: "flex",
                                height: "50px",
                                gap: "2px",
                                alignItems: "flex-end",
                              }}
                            >
                              {[
                                2, 4, 1, 3, 2, 1, 5, 1, 2, 3, 1, 4, 2, 1,
                                2, 3, 1, 2, 4,
                              ].map((w, i) => (
                                <div
                                  key={i}
                                  style={{
                                    width: `${w * 2}px`,
                                    height: "100%",
                                    background: "var(--text-main)",
                                  }}
                                />
                              ))}
                            </div>
                            <div
                              style={{
                                writingMode: "vertical-rl",
                                transform: "rotate(180deg)",
                                fontSize: "0.65rem",
                                color: "#94a3b8",
                                letterSpacing: "1px",
                              }}
                            >
                              Digitalent´26
                            </div>
                          </div>
                        </div>

                        {/* Dashed Divider */}
                        <div
                          style={{
                            borderTop: "2px dashed #2563eb",
                            margin: "20px -24px 12px",
                            position: "relative",
                          }}
                        />

                      </div>
                      

                    </div>
                  
                </div>
              </Col>
            </Row>
          </section>
        </Content>

        <CustomFooter />

        {/* Sticky Mobile CTA */}
        {screens.xs && showStickyCTA && (
          <div
            style={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              padding: "16px 5%",
              background: "var(--bg-base)",
              borderTop: "1px solid rgba(0,0,0,0.1)",
              boxShadow: "0 -4px 10px rgba(0,0,0,0.05)",
              zIndex: 999,
              animation: "slideUp 0.3s ease-out",
            }}
          >
            <Button
              type="primary"
              block
              size="large"
              onClick={() => {
                scrollToRegistration("1");
                setShowStickyCTA(false);
              }}
              style={{
                height: "48px",
                fontSize: "1.1rem",
                borderRadius: "8px",
                boxShadow: "0 4px 15px rgba(37, 99, 235, 0.4)",
              }}
            >
              Inscrição Grátis
            </Button>
          </div>
        )}

        <Modal
          title="🔐 Privacidade, Proteção de Dados e Direito de Imagem"
          open={gdprModalVisible}
          onCancel={() => setGdprModalVisible(false)}
          footer={[
            <Button key="close" type="primary" onClick={() => setGdprModalVisible(false)} style={{ background: "#2563eb", borderColor: "#2563eb" }}>
              Fechar
            </Button>
          ]}
        >
          <Paragraph>
            Na Digitalent, levamos a sua privacidade a sério. Os dados pessoais que nos são fornecidos são utilizados exclusivamente para gerir a sua inscrição ou proposta de parceria, bem como para comunicar consigo de forma relevante.
          </Paragraph>
          <Paragraph>
            Os seus dados são tratados de forma segura, transparente e em conformidade com o RGPD e a legislação portuguesa em vigor.
          </Paragraph>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li>✔ Utilizamos os seus dados apenas para as finalidades indicadas</li>
            <li>✔ Não partilhamos informação sem fundamento legal</li>
            <li>✔ Garantimos os seus direitos de acesso, retificação e eliminação</li>
          </ul>
          
          <Title level={5} style={{ marginTop: '20px', color: 'var(--text-main)', fontWeight: 600 }}>
            📸 Captação e Utilização de Imagem
          </Title>
          <Paragraph>
            Informamos que, no âmbito do evento, poderão ser captadas imagens (fotografias e vídeo) para fins de comunicação e divulgação nas nossas plataformas, nomeadamente redes sociais, website e materiais promocionais da Digitalent.
          </Paragraph>
          <Paragraph>
            Ao participar no evento, autoriza a recolha e utilização da sua imagem para estes fins, podendo a qualquer momento retirar o seu consentimento.
          </Paragraph>
          
          <Paragraph style={{ marginTop: '16px' }}>
            Poderá, a qualquer momento, solicitar a alteração, remoção dos seus dados ou revogar a autorização de utilização de imagem através de:<br />
            📧 <strong>privacidade@digitalent.pt</strong>
          </Paragraph>
          
        </Modal>

        {/* Success Modal (Attendee & Partner) */}
        <Modal
          open={successModalVisible}
          onCancel={() => setSuccessModalVisible(false)}
          footer={null}
          centered
          width={480}
          style={{ borderRadius: "24px", overflow: "hidden" }}
          styles={{
            body: {
              padding: "32px 24px",
              textAlign: "center",
              background: "#ffffff",
            }
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <CheckCircleOutlined
              style={{
                fontSize: "64px",
                color: "#22c55e",
                marginBottom: "20px",
              }}
            />
            <Title
              level={3}
              style={{
                color: "#1e293b",
                fontWeight: 800,
                marginBottom: "16px",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Inscrição Confirmada!
            </Title>
            <Paragraph
              style={{
                color: "#475569",
                fontSize: "15px",
                lineHeight: "1.6",
                marginBottom: "28px",
                fontFamily: "'Inter', sans-serif",
                textAlign: "center",
              }}
            >
              Olá! O teu comprovativo oficial em PDF foi gerado e enviado com sucesso para a nossa organização via WhatsApp. Vemo-nos no Auditório do IEFP Rio Meão!
            </Paragraph>
            <Button
              type="primary"
              size="large"
              shape="round"
              onClick={() => setSuccessModalVisible(false)}
              style={{
                height: "50px",
                padding: "0 40px",
                fontSize: "1rem",
                fontWeight: 700,
                background: "#2563eb",
                borderColor: "#2563eb",
                boxShadow: "0 4px 14px rgba(37, 99, 235, 0.3)",
              }}
            >
              Excelente!
            </Button>
          </div>
        </Modal>
      </Layout>
    </ConfigProvider>
  );
};

export default LandingPage;
