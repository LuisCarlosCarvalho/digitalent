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
} from "@ant-design/icons";

const SpeakersSection = lazy(() => import("./sections/SpeakersSection"));
const LocationSection = lazy(() => import("./sections/LocationSection"));
const ScheduleSection = lazy(() => import("./sections/ScheduleSection"));
import { CountdownTimer } from "./CountdownTimer";
import { Footer as CustomFooter } from "./Footer";

const { Header, Content } = Layout;
const { Title, Text, Paragraph } = Typography;

const getBaseThemeConfig = (isDark: boolean) => ({
  algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
  token: {
    colorPrimary: "#2563eb", // Azul Royal da Marca
    colorBgBase: isDark ? "#0b0f19" : "#f8fafc",
    colorTextBase: isDark ? "#f8fafc" : "#0f172a",
    borderRadius: 8,
    fontFamily: "'Outfit', sans-serif",
  },
  components: {
    Button: {
      colorPrimary: "#2563eb",
      algorithm: true,
    },
    Input: {
      colorBgContainer: isDark ? "#111827" : "#f8fafc",
    },
  },
});

type ThemeMode = "light" | "dark" | "auto";

const { useBreakpoint } = Grid;

const LandingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [loading, setLoading] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  // Inicialização do tema
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("themeMode") as ThemeMode) || "auto";
    }
    return "auto";
  });

  // Estado para capturar a preferência do sistema
  const [systemDarkMode, setSystemDarkMode] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
      : false,
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => setSystemDarkMode(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Valor derivado para o modo escuro atual
  const isDarkMode =
    themeMode === "auto" ? systemDarkMode : themeMode === "dark";

  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [showStickyCTA, setShowStickyCTA] = useState(false);

  const screens = useBreakpoint();

  const [hasConsented, setHasConsented] = useState(false);
  const [gdprModalVisible, setGdprModalVisible] = useState(false);
  const [gdprChecked, setGdprChecked] = useState(false);

  const handleFormInteraction = (e: React.SyntheticEvent) => {
    if (!hasConsented) {
      e.preventDefault();
      e.stopPropagation();
      setGdprModalVisible(true);
      if (e.target instanceof HTMLElement) {
        e.target.blur();
      }
    }
  };

  // Scroll listener for Sticky CTA
  useEffect(() => {
    const handleScroll = () => {
      setShowStickyCTA(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Atualizar a tag HTML para as variáveis CSS globais funcionarem e persistir escolha
  useEffect(() => {
    if (isDarkMode) {
      document.body.setAttribute("data-theme", "dark");
    } else {
      document.body.removeAttribute("data-theme");
    }
    localStorage.setItem("themeMode", themeMode);
  }, [isDarkMode, themeMode]);

  const handleThemeChange = (info: { key: string }) => {
    setThemeMode(info.key as ThemeMode);
  };

  const handleFormSubmit = async (
    values: Record<string, string>,
    type: "Participante" | "Parceiro",
  ) => {
    setLoading(true);
    try {
      const env = (import.meta as unknown as { env: Record<string, string | undefined> }).env;
      const apiUrl = env.VITE_API_URL || "";
      const waToken = env.VITE_WHATSAPP_TOKEN || "";

      const response = await fetch(`${apiUrl}/api/register-whatsapp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(waToken ? { Authorization: `Bearer ${waToken}` } : {}),
        },
        body: JSON.stringify({
          formType: type,
          name: values.nome || values.responsavel,
          email: values.email,
          phone: values.telemovel,
          company: values.empresa || "",
          sponsorshipLevel: values.nivel || "",
          adminNumber: "351964300708",
        }),
      });

      if (response.ok) {
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
          fontFamily: "'Outfit', sans-serif",
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

  return (
    <ConfigProvider theme={getBaseThemeConfig(isDarkMode)}>
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
            <Dropdown
              menu={{
                items: [
                  { key: "light", icon: <SunOutlined />, label: "Light Mode" },
                  { key: "dark", icon: <MoonOutlined />, label: "Dark Mode" },
                  {
                    key: "auto",
                    icon: <DesktopOutlined />,
                    label: "System (Auto)",
                  },
                ],
                onClick: handleThemeChange,
                selectedKeys: [themeMode],
              }}
              placement="bottomRight"
            >
              <Button
                type="text"
                shape="circle"
                style={{ color: "var(--text-main)", fontSize: "1.2rem" }}
              >
                {themeMode === "light" ? (
                  <SunOutlined />
                ) : themeMode === "dark" ? (
                  <MoonOutlined />
                ) : (
                  <DesktopOutlined />
                )}
              </Button>
            </Dropdown>

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
                Garanta o seu lugar
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
                Garanta o seu lugar
              </Button>
            </Space>
          </Drawer>
        </Header>

        <Content>
          {/* Top Marquee Section */}
          <div
            style={{
              padding: "24px 0 12px",
              background: "var(--header-bg)",
              borderBottom: "1px solid rgba(128, 128, 128, 0.1)",
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
                AGRADECIMENTOS:
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
                  animationDuration: "25s",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {/* Repetindo os logos para garantir scroll infinito contínuo e sem cortes */}
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="sponsor-logo"
                    style={{
                      margin: "0 20px",
                      transition: "transform 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    <img
                      src="https://i.imgur.com/1USX4Kp.png"
                      alt={`Apoiador ${(i % 6) + 1}`}
                      style={{
                        height: screens.xs ? "70px" : "100px",
                        width: "auto",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

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
                    Vagas Limitadas    "Garanta o seu lugar"
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Hero Section */}
          <section
            id="inicio"
            style={{
              padding: screens.xs ? "30px 5% 80px" : "40px 5% 100px",
              background: "var(--bg-base)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Row
              justify="center"
              align="middle"
              style={{ position: "relative", zIndex: 1 }}
            >
              <Col xs={24} md={20} lg={16} style={{ textAlign: "center" }}>
                <Space
                  orientation="vertical"
                  size="large"
                  style={{ width: "100%" }}
                >
                  <div style={{ marginBottom: "20px" }}>
                    <img
                      src="https://i.imgur.com/EpDGrzT.png"
                      alt="Digitalent26 Large Logo"
                      style={{
                        maxWidth: "380px",
                        width: "100%",
                        height: "auto",
                      }}
                    />
                  </div>

                  {/* Prominent Hero Countdown Timer */}
                  <div style={{ marginBottom: "10px" }}>
                    <CountdownTimer />
                  </div>

                  <Title
                    style={{
                      fontSize: "clamp(2.5rem, 8vw, 4.5rem)",
                      lineHeight: 1.1,
                      fontWeight: 800,
                      marginBottom: "24px",
                      color: "var(--text-main)",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    Eleve seu{" "}
                    <span style={{ color: "#2563eb" }}>Negócio Local</span>
                    <br />
                    para o Digital
                  </Title>

                  <Paragraph
                    style={{
                      fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
                      color: "var(--text-sec)",
                      maxWidth: "1200px",
                      margin: "0 auto 50px",
                      lineHeight: 1.6,
                      textAlign: "justify",
                    }}
                  >
                    O Digitalent’26 nasce como ponto de encontro de mentes
                    inquietas que procuram transformar o futuro do mercado. Sob
                    o conceito Marketing com Visão, o evento vai além das
                    métricas superficiais, mergulhando nas estratégias e
                    tendências que estão a redefinir a ligação entre marcas e
                    pessoas. O evento reúne especialistas e talentos para
                    oferecer uma experiência única a quem não quer apenas
                    acompanhar a evolução digital, mas sim vivenciá-la com
                    resultados reais.
                  </Paragraph>

                  <Space
                    size="middle"
                    wrap
                    style={{ justifyContent: "center" }}
                  >
                    <Button
                      type="primary"
                      shape="round"
                      size="large"
                      onClick={() => scrollToRegistration("1")}
                      style={{
                        height: "60px",
                        padding: "0 40px",
                        fontSize: "1.1rem",
                        fontWeight: 700,
                        boxShadow: "0 10px 30px rgba(37, 99, 235, 0.2)",
                      }}
                    >
                      Garanta o seu lugar
                    </Button>
                    <Button
                      size="large"
                      shape="round"
                      icon={<CalendarOutlined />}
                      href="#cronograma"
                      style={{
                        height: "60px",
                        padding: "0 32px",
                        fontSize: "1.1rem",
                        color: "var(--text-main)",
                        borderColor: "var(--border-color)",
                      }}
                    >
                      Ver Agenda
                    </Button>
                  </Space>
                </Space>
              </Col>
            </Row>

            <Row gutter={[24, 24]} style={{ marginTop: "100px" }}>
              <Col xs={24} md={8}>
                <div style={{ textAlign: "center", padding: "20px" }}>
                  <RiseOutlined
                    style={{
                      fontSize: "32px",
                      color: "#2563eb",
                      marginBottom: "15px",
                    }}
                  />
                  <Title level={5} style={{ color: "var(--text-main)" }}>
                    Crescimento Real
                  </Title>
                  <Text style={{ color: "var(--text-sec)" }}>
                    Focado em resultados mensuráveis para o seu negócio.
                  </Text>
                </div>
              </Col>
              <Col xs={24} md={8}>
                <div style={{ textAlign: "center", padding: "20px" }}>
                  <TeamOutlined
                    style={{
                      fontSize: "32px",
                      color: "#2563eb",
                      marginBottom: "15px",
                    }}
                  />
                  <Title level={5} style={{ color: "var(--text-main)" }}>
                    Comunidade Local
                  </Title>
                  <Text style={{ color: "var(--text-sec)" }}>
                    Conecte-se com outros empresários da sua região.
                  </Text>
                </div>
              </Col>
              <Col xs={24} md={8}>
                <div style={{ textAlign: "center", padding: "20px" }}>
                  <RocketOutlined
                    style={{
                      fontSize: "32px",
                      color: "#2563eb",
                      marginBottom: "15px",
                    }}
                  />
                  <Title level={5} style={{ color: "var(--text-main)" }}>
                    Estratégia Ágil
                  </Title>
                  <Text style={{ color: "var(--text-sec)" }}>
                    Implementação rápida e eficiente sem complicações.
                  </Text>
                </div>
              </Col>
            </Row>
          </section>

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
                    O Desafio do{" "}
                    <span style={{ color: "#2563eb" }}>
                      Negócio Tradicional
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
                        desc: "Aprenda a automatizar processos de atração de clientes.",
                      },
                      {
                        title: "Receio da Tecnologia",
                        desc: "Ferramentas simples e intuitivas desenhadas para si.",
                      },
                      {
                        title: "Resultados Lentos",
                        desc: "Estratégias de tráfego local com retorno imediato.",
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
                  <Row gutter={[16, 16]}>
                    <Col span={12}>
                      <Statistic
                        title={
                          <span style={{ color: "var(--text-sec)" }}>
                            Eficácia
                          </span>
                        }
                        value={98}
                        suffix="%"
                        valueStyle={{
                          color: "var(--text-main)",
                          fontWeight: "bold",
                        }}
                      />
                    </Col>
                    <Col span={12}>
                      <Statistic
                        title={
                          <span style={{ color: "var(--text-sec)" }}>
                            Retorno
                          </span>
                        }
                        value="ROI+"
                        valueStyle={{
                          color: "var(--text-main)",
                          fontWeight: "bold",
                        }}
                      />
                    </Col>
                  </Row>
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
                Garanta o seu lugar
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
                  {activeTab === "1" ? (
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

                        <div onClickCapture={handleFormInteraction} onFocusCapture={handleFormInteraction}>
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
                            style={{
                              marginTop: "32px",
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
                              Enviar Inscrição
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
                              Acesso total ao evento no dia
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
                              Acesso ao coffee-break
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
                              Brindes do Evento
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
                              Network com grandes agencias
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

                        <Text
                          style={{
                            display: "block",
                            textAlign: "center",
                            fontSize: "0.8rem",
                            color: "var(--text-main)",
                            fontWeight: 500,
                          }}
                        >
                          Ao inscrever-se, concorda com a nossa Politica
                          de Privacidade
                        </Text>
                      </div>
                      
                      <div style={{ textAlign: "center", marginTop: "30px" }}>
                        <Button
                          type="link"
                          onClick={() => setActiveTab("2")}
                          style={{ color: "#2563eb", fontWeight: 600, fontSize: "1rem" }}
                        >
                          Quero candidatar a minha empresa como Apoiador ➔
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div style={{ paddingTop: "10px" }}>
                      <div
                        style={{
                          textAlign: "center",
                          marginBottom: "32px",
                        }}
                      >
                        <Title
                          level={4}
                          style={{ color: "var(--text-main)" }}
                        >
                          Candidatura a Apoiador
                        </Title>
                        <Text style={{ color: "var(--text-sec)" }}>
                          Posicione a sua marca diante de
                          empresas e lidere o mercado.
                        </Text>
                      </div>

                      <div onClickCapture={handleFormInteraction} onFocusCapture={handleFormInteraction}>
                        <Form
                          layout="vertical"
                          onFinish={(values) =>
                            handleFormSubmit(values, "Parceiro")
                          }
                        >
                        <Row gutter={16}>
                          <Col xs={24} md={12}>
                            <Form.Item
                              label={
                                <Text
                                  strong
                                  style={{ color: "var(--text-main)" }}
                                >
                                  Nome da Empresa
                                </Text>
                              }
                              name="empresa"
                              rules={[{ required: true }]}
                            >
                              <Input
                                prefix={
                                  <ShopOutlined
                                    style={{ color: "#94a3b8" }}
                                  />
                                }
                                placeholder="Empresa S.A."
                                size="large"
                              />
                            </Form.Item>
                          </Col>
                          <Col xs={24} md={12}>
                            <Form.Item
                              label={
                                <Text
                                  strong
                                  style={{ color: "var(--text-main)" }}
                                >
                                  Nome do Responsável
                                </Text>
                              }
                              name="responsavel"
                              rules={[{ required: true }]}
                            >
                              <Input
                                prefix={
                                  <UserOutlined
                                    style={{ color: "#94a3b8" }}
                                  />
                                }
                                placeholder="Nome Completo"
                                size="large"
                              />
                            </Form.Item>
                          </Col>
                        </Row>

                        <Row gutter={16}>
                          <Col xs={24} md={12}>
                            <Form.Item
                              label={
                                <Text
                                  strong
                                  style={{ color: "var(--text-main)" }}
                                >
                                  E-mail de Contacto
                                </Text>
                              }
                              name="email"
                              rules={[{ required: true, type: "email" }]}
                            >
                              <Input
                                prefix={
                                  <MailIcon
                                    style={{ color: "#94a3b8" }}
                                  />
                                }
                                placeholder="email@empresa.pt"
                                size="large"
                              />
                            </Form.Item>
                          </Col>
                          <Col xs={24} md={12}>
                            <Form.Item
                              label={
                                <Text
                                  strong
                                  style={{ color: "var(--text-main)" }}
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
                                placeholder="9xx xxx xxx"
                                size="large"
                              />
                            </Form.Item>
                          </Col>
                        </Row>
                        <Form.Item
                          label={
                            <Text
                              strong
                              style={{ color: "var(--text-main)" }}
                            >
                              Objetivos no Evento
                            </Text>
                          }
                          name="objetivos"
                        >
                          <Input.TextArea
                            rows={4}
                            placeholder="Conte-nos brevemente o que espera alcançar com esta parceria..."
                            style={{
                              borderRadius: "12px",
                              background: "var(--bg-alt)",
                            }}
                          />
                        </Form.Item>

                        <Form.Item style={{ marginTop: "40px" }}>
                          <Button
                            type="default"
                            htmlType="submit"
                            block
                            size="large"
                            loading={loading}
                            disabled={loading}
                            style={{
                              height: "60px",
                              fontSize: "1.1rem",
                              fontWeight: 700,
                              borderRadius: "30px",
                              border: "2px solid #2563eb",
                              color: "#2563eb",
                            }}
                          >
                            Enviar Candidatura a Apoiador
                          </Button>
                        </Form.Item>
                      </Form>
                      </div>
                      
                      <div style={{ textAlign: "center", marginTop: "30px" }}>
                        <Button
                          type="link"
                          onClick={() => setActiveTab("1")}
                          style={{ color: "#2563eb", fontWeight: 600, fontSize: "1rem" }}
                        ></Button>
                      </div>
                    </div>
                  )}
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
            <Button key="cancel" onClick={() => setGdprModalVisible(false)}>
              Cancelar
            </Button>,
            <Button 
              key="submit" 
              type="primary" 
              disabled={!gdprChecked}
              onClick={() => {
                setHasConsented(true);
                setGdprModalVisible(false);
              }}
            >
              Confirmar
            </Button>,
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
          
          <Checkbox 
            checked={gdprChecked} 
            onChange={(e) => setGdprChecked(e.target.checked)}
            style={{ marginTop: '16px', fontWeight: 500 }}
          >
            Ao submeter os seus dados, está a concordar com o seu tratamento para as finalidades acima descritas.
          </Checkbox>
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
                fontFamily: "'Outfit', sans-serif",
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
                fontFamily: "'Outfit', sans-serif",
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
