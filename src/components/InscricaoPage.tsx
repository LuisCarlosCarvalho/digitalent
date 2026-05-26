import React, { useState, useEffect } from "react";
import {
  Layout,
  Button,
  Typography,
  Row,
  Col,
  ConfigProvider,
  Card,
  Form,
  Input,
  Badge,
  notification,
  theme,
  Modal,
  Checkbox,
  Grid,
  Space,
} from "antd";
import {
  LockOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  SafetyCertificateOutlined,
  ArrowRightOutlined,
  CheckCircleOutlined,
  SettingOutlined,
  SafetyOutlined,
  AimOutlined,
  FileTextOutlined,
  TeamOutlined,
  RocketOutlined,
  TrophyOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { useBreakpoint } = Grid;

// Premium High-Tech Dark Theme Token Configuration
const darkThemeConfig = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: "#2563eb", // Royal Blue
    colorBgBase: "#030712", // Deep slate background
    colorTextBase: "#f8fafc", // Light gray/slate text
    colorBgContainer: "#0b1329", // Deep slate surface
    borderRadius: 12,
    fontFamily: "'Outfit', sans-serif",
  },
  components: {
    Button: {
      colorPrimary: "#2563eb",
      colorPrimaryHover: "#3b82f6",
      controlHeightLG: 52,
      borderRadiusLG: 8,
    },
    Input: {
      colorBgContainer: "#0f172a",
      colorBorder: "#1e293b",
      colorText: "#ffffff",
      colorTextPlaceholder: "#64748b",
      controlHeightLG: 48,
    },
    Card: {
      colorBgContainer: "#0b1329",
      colorBorder: "rgba(37, 99, 235, 0.15)",
    },
    Checkbox: {
      colorPrimary: "#2563eb",
    },
  },
};

const InscricaoPage: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [gdprModalVisible, setGdprModalVisible] = useState(false);
  const [gdprChecked, setGdprChecked] = useState(false);
  const [hasConsented, setHasConsented] = useState(false);
  const [formValuesToSubmit, setFormValuesToSubmit] = useState<any>(null);
  
  const screens = useBreakpoint();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  const handleFormSubmit = async (values: any) => {
    if (!hasConsented) {
      setFormValuesToSubmit(values);
      setGdprModalVisible(true);
      return;
    }

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
          formType: "DOSSIER_SUBTERRANEO_PME",
          name: values.name,
          email: values.email,
          phone: values.phone,
          company: "PME Local",
          sponsorshipLevel: "Acesso Geral Gratuito",
          adminNumber: "351964300708",
        }),
      });

      if (response.ok) {
        notification.success({
          message: "Dossier Desbloqueado com Sucesso!",
          description: "O seu documento operacional exclusivo e o bilhete digital foram enviados para a nossa central de atendimento via WhatsApp.",
          placement: "topRight",
          style: { fontFamily: "'Outfit', sans-serif" }
        });
        setSuccessModalVisible(true);
        form.resetFields();
      } else {
        throw new Error("HTTP error " + response.status);
      }
    } catch (err) {
      notification.error({
        message: "Falha na Transmissão de Segurança",
        description: "Por favor, valide os seus dados e tente enviar novamente.",
        placement: "topRight",
        style: {
          fontFamily: "'Outfit', sans-serif",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const triggerScrollToForm = () => {
    const element = document.getElementById("passe-geral-form");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <ConfigProvider theme={darkThemeConfig}>
      <Layout style={{ minHeight: "100vh", background: "#020617", position: "relative", overflowX: "hidden" }}>
        
        {/* Custom CSS for Book Floating Animations & Neon Text Shadows */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes floatBook {
            0% { transform: rotateY(-25deg) rotateX(12deg) translateY(0px); }
            50% { transform: rotateY(-25deg) rotateX(12deg) translateY(-12px); }
            100% { transform: rotateY(-25deg) rotateX(12deg) translateY(0px); }
          }
          @keyframes pulseGlow {
            0% { opacity: 0.4; transform: scale(0.95); }
            50% { opacity: 0.8; transform: scale(1.05); }
            100% { opacity: 0.4; transform: scale(0.95); }
          }
          .floating-book {
            animation: floatBook 6s infinite ease-in-out;
          }
          .neon-glow-platform {
            animation: pulseGlow 3s infinite ease-in-out;
          }
          .glow-text {
            color: #3b82f6;
            text-shadow: 0 0 20px rgba(59, 130, 246, 0.4);
          }
          .card-hover:hover {
            border-color: #2563eb !important;
            box-shadow: 0 10px 30px -10px rgba(37, 99, 235, 0.15) !important;
            transition: all 0.3s ease;
          }
        `}} />

        {/* Global subtle radial gradient glow overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: "radial-gradient(circle at 75% 20%, rgba(37, 99, 235, 0.12), transparent 45%), radial-gradient(circle at 20% 60%, rgba(37, 99, 235, 0.08), transparent 40%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* Main Content Body */}
        <Content style={{ position: "relative", zIndex: 1, padding: screens.xs ? "24px 16px 140px" : "48px 24px 160px" }}>
          
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            
            {/* TOP BAR BRAND ROW */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px" }}>
              <div style={{ cursor: "pointer" }} onClick={() => window.location.href = "/"}>
                <img
                  src="https://i.imgur.com/EpDGrzT.png"
                  alt="DigitalentLogo"
                  style={{ height: "42px", width: "auto" }}
                />
              </div>
              <Badge 
                status="error" 
                text={<span style={{ color: "#ef4444", fontWeight: 700, letterSpacing: "1.2px", fontSize: "11px" }}>🔒 RELATÓRIO SUBTERRÂNEO / INFORMAÇÃO RESTRITA</span>} 
                style={{ background: "rgba(254, 242, 242, 0.05)", padding: "6px 18px", borderRadius: "50px", border: "1px solid rgba(239, 68, 68, 0.2)" }}
              />
            </div>

            {/* TWO COLUMN GRID LAYOUT */}
            <Row gutter={[40, 40]} justify="center" align="middle" style={{ marginBottom: "50px" }}>
              
              {/* LEFT COLUMN: Narrative & Info */}
              <Col xs={24} lg={13} style={{ textAlign: "left" }}>
                
                {/* Hero Headline */}
                <Title level={1} style={{ color: "#ffffff", fontSize: screens.xs ? "30px" : "42px", fontWeight: 900, letterSpacing: "-1.5px", lineHeight: "1.2", marginBottom: "16px" }}>
                  A vantagem invisível <br className="hidden-xs" />
                  que está a redefinir <br className="hidden-xs" />
                  o <span className="glow-text">marketing</span> em <span style={{ color: "#f97316" }}>2026</span>.
                </Title>
                
                {/* Subheadline */}
                <Paragraph style={{ color: "#94a3b8", fontSize: "15px", lineHeight: "1.6", fontWeight: 400, marginBottom: "24px" }}>
                  Desvende os códigos exatos que empresas tradicionais aplicam para reter carteiras de clientes e gerar lucros maciços com a internet, totalmente blindados contra jargões técnicos ou agências abusivas.
                </Paragraph>

                {/* Concentric Circle Icon highlight */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                  <div style={{ width: "24px", height: "24px", borderRadius: "50%", border: "2px solid #2563eb", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#2563eb" }} />
                  </div>
                  <Text style={{ color: "#cbd5e1", fontSize: "14.5px", fontWeight: 500 }}>
                    O mapa de ação para explodir os seus resultados comerciais.
                  </Text>
                </div>

                {/* LinkedIn Badge */}
                <div style={{ marginBottom: "32px" }}>
                  <div
                    style={{
                      background: "rgba(37, 99, 235, 0.05)",
                      border: "1px solid rgba(37, 99, 235, 0.3)",
                      padding: "10px 18px",
                      borderRadius: "30px",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      boxShadow: "0 2px 10px rgba(37, 99, 235, 0.05)",
                    }}
                  >
                    <SafetyCertificateOutlined style={{ color: "#2563eb", fontSize: "14px" }} /> 
                    <span style={{ color: "#3b82f6", fontWeight: 700, fontSize: "11px", letterSpacing: "0.3px" }}>
                      Garanta Credencial Digital Conectada ao LinkedIn (FUTURE-PROOF 2026)
                    </span>
                  </div>
                </div>

                {/* Dossier Card */}
                <Card
                  style={{
                    background: "rgba(11, 19, 41, 0.65)",
                    border: "1px solid rgba(37, 99, 235, 0.15)",
                    borderRadius: "16px",
                    boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5)",
                  }}
                  styles={{ body: { padding: "28px" } }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                    <UserOutlined style={{ color: "#2563eb", fontSize: "16px" }} />
                    <span style={{ color: "#2563eb", fontWeight: 800, fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px" }}>
                      DOSSIÊ ANTIDESPERDÍCIO DE CAPITAL
                    </span>
                  </div>
                  
                  <Title level={3} style={{ color: "#ffffff", marginTop: 0, fontSize: "19px", fontWeight: 800, letterSpacing: "-0.3px", marginBottom: "12px" }}>
                    O Raio-X Impiedoso aos Anúncios que Queimam o Seu Caixa
                  </Title>
                  
                  <Paragraph style={{ color: "#94a3b8", fontSize: "13.5px", lineHeight: "1.6", marginBottom: "28px" }}>
                    Cansado de ver o seu dinheiro sumir em orçamentos vazios sem retorno comercial palpável? No dia <span style={{ color: "#2563eb", fontWeight: 600 }}>9 de Julho</span>, vamos auditar sem filtros as campanhas obsoletas que sabotam o seu negócio, entregando de bandeja as ferramentas táticas de conversão imediata.
                  </Paragraph>

                  {/* 4 Columns Features Grid */}
                  <Row gutter={[12, 16]}>
                    {[
                      { icon: <SettingOutlined />, label: "Estratégias que funcionam agora" },
                      { icon: <LockOutlined />, label: "Conversão imediata e mensurável" },
                      { icon: <SafetyOutlined />, label: "Proteção contra gastos inúteis" },
                      { icon: <AimOutlined />, label: "Métodos usados pelos líderes de mercado" },
                    ].map((feature, i) => (
                      <Col xs={12} sm={6} key={i}>
                        <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                          <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "rgba(37, 99, 235, 0.08)", border: "1px solid rgba(37, 99, 235, 0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", color: "#2563eb" }}>
                            {feature.icon}
                          </div>
                          <Text style={{ color: "#94a3b8", fontSize: "11px", fontWeight: 500, lineHeight: "1.3", display: "block" }}>
                            {feature.label}
                          </Text>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </Card>

              </Col>

              {/* RIGHT COLUMN: 3D Book & Passe Geral Form */}
              <Col xs={24} lg={11} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                
                {/* Stunning 3D glowing Book Mockup */}
                <div style={{ position: "relative", width: "260px", height: "330px", marginBottom: "40px", perspective: "1000px" }}>
                  {/* Glowing platform on floor */}
                  <div 
                    className="neon-glow-platform"
                    style={{
                      position: "absolute",
                      bottom: "-15px",
                      left: "10%",
                      width: "80%",
                      height: "40px",
                      background: "radial-gradient(ellipse, rgba(37, 99, 235, 0.3) 0%, transparent 70%)",
                      borderRadius: "50%",
                      zIndex: 0
                    }} 
                  />
                  
                  {/* Glowing circular rings */}
                  <div style={{
                    position: "absolute",
                    bottom: "-18px",
                    left: "5%",
                    width: "90%",
                    height: "45px",
                    border: "2px solid rgba(37, 99, 235, 0.35)",
                    borderRadius: "50%",
                    transform: "rotateX(75deg)",
                    boxShadow: "0 0 25px rgba(37, 99, 235, 0.5)",
                    zIndex: 0
                  }} />
                  <div style={{
                    position: "absolute",
                    bottom: "-25px",
                    left: "-5%",
                    width: "110%",
                    height: "55px",
                    border: "1px solid rgba(37, 99, 235, 0.15)",
                    borderRadius: "50%",
                    transform: "rotateX(75deg)",
                    boxShadow: "0 0 35px rgba(37, 99, 235, 0.2)",
                    zIndex: 0
                  }} />

                  {/* Actual 3D Book */}
                  <div className="floating-book" style={{
                    width: "100%",
                    height: "100%",
                    position: "relative",
                    transform: "rotateY(-25deg) rotateX(12deg)",
                    transformStyle: "preserve-3d",
                    zIndex: 1,
                  }}>
                    {/* Spine */}
                    <div style={{
                      position: "absolute",
                      width: "24px",
                      height: "100%",
                      background: "linear-gradient(90deg, #090e1f 0%, #1e3a8a 50%, #090e1f 100%)",
                      transform: "rotateY(-90deg) translateZ(12px)",
                      transformOrigin: "left center",
                      borderLeft: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "2px 0 0 2px"
                    }} />
                    
                    {/* Front Cover */}
                    <div style={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      background: "linear-gradient(135deg, #080f27 0%, #0b1329 100%)",
                      transform: "translateZ(12px)",
                      borderRadius: "0 8px 8px 0",
                      border: "1px solid rgba(37, 99, 235, 0.35)",
                      boxShadow: "inset 0 0 25px rgba(37, 99, 235, 0.25), 15px 15px 35px rgba(0,0,0,0.6)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "20px",
                      boxSizing: "border-box"
                    }}>
                      <div style={{
                        border: "1px dashed rgba(37, 99, 235, 0.3)",
                        width: "100%",
                        height: "100%",
                        borderRadius: "6px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "16px",
                        boxSizing: "border-box",
                        position: "relative"
                      }}>
                        <Text style={{
                          fontSize: "10px",
                          fontWeight: 800,
                          color: "#3b82f6",
                          letterSpacing: "2.5px",
                          textTransform: "uppercase",
                          marginBottom: "16px"
                        }}>
                          DOSSIÊ
                        </Text>
                        <Title level={4} style={{
                          color: "#ffffff",
                          fontWeight: 900,
                          textAlign: "center",
                          fontSize: "16px",
                          margin: "0 0 24px 0",
                          letterSpacing: "0.5px",
                          lineHeight: "1.4"
                        }}>
                          ANTIDESPERDÍCIO<br/>DE CAPITAL
                        </Title>
                        <div style={{
                          width: "44px",
                          height: "44px",
                          borderRadius: "50%",
                          background: "rgba(37, 99, 235, 0.08)",
                          border: "1px solid rgba(37, 99, 235, 0.3)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: "0 0 15px rgba(37, 99, 235, 0.25)"
                        }}>
                          <LockOutlined style={{ color: "#3b82f6", fontSize: "18px" }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Form Box */}
                <div
                  id="passe-geral-form"
                  style={{
                    background: "rgba(11, 19, 41, 0.7)",
                    border: "1px solid rgba(37, 99, 235, 0.15)",
                    padding: screens.xs ? "24px 20px" : "36px",
                    borderRadius: "16px",
                    boxShadow: "0 20px 25px -5px rgba(0,0,0,0.3), 0 10px 10px -5px rgba(0,0,0,0.3)",
                    width: "100%",
                    maxWidth: "460px",
                  }}
                >
                  <Title level={4} style={{ color: "#ffffff", marginBottom: "4px", fontWeight: 800, fontSize: "18px", textAlign: "center" }}>
                    PASSE GERAL<br />
                    <span style={{ color: "#3b82f6", fontSize: "14px" }}>(ACESSO ISENTO DE CUSTOS)</span>
                  </Title>
                  <Paragraph style={{ color: "#94a3b8", marginBottom: "24px", fontSize: "13px", textAlign: "center" }}>
                    Insira os seus dados de verificação abaixo para emitir a sua credencial operacional e aceder ao ecossistema.
                  </Paragraph>

                  <div onClickCapture={handleFormInteraction} onFocusCapture={handleFormInteraction}>
                    <Form form={form} layout="vertical" onFinish={handleFormSubmit} requiredMark={false}>
                      <Form.Item 
                        name="name" 
                        rules={[{ required: true, message: "Por favor, indique o seu nome completo." }]}
                      >
                        <Input 
                          prefix={<UserOutlined style={{ color: "#475569" }} />} 
                          placeholder="Nome do Proprietário / Diretor" 
                          size="large" 
                          style={{ background: "#0f172a", border: "1px solid #1e293b", color: "#ffffff" }} 
                        />
                      </Form.Item>

                      <Form.Item 
                        name="email" 
                        rules={[
                          { required: true, message: "Introduza um e-mail profissional válido." },
                          { type: "email", message: "Indique um formato de e-mail válido." }
                        ]}
                      >
                        <Input 
                          prefix={<MailOutlined style={{ color: "#475569" }} />} 
                          placeholder="E-mail de Contacto Direto" 
                          size="large" 
                          style={{ background: "#0f172a", border: "1px solid #1e293b", color: "#ffffff" }} 
                        />
                      </Form.Item>

                      <Form.Item 
                        name="phone" 
                        rules={[{ required: true, message: "Introduza o seu telemóvel." }]}
                      >
                        <Input 
                          prefix={<PhoneOutlined style={{ color: "#475569" }} />} 
                          placeholder="Telemóvel Corporativo (WhatsApp)" 
                          size="large" 
                          style={{ background: "#0f172a", border: "1px solid #1e293b", color: "#ffffff" }} 
                        />
                      </Form.Item>

                      <Form.Item style={{ marginBottom: 0, marginTop: "24px" }}>
                        <Button 
                          type="primary" 
                          htmlType="submit" 
                          size="large" 
                          loading={loading}
                          disabled={loading}
                          block
                          style={{
                            height: "50px",
                            background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                            border: "none",
                            borderRadius: "8px",
                            fontWeight: 700,
                            fontSize: "15px",
                            letterSpacing: "0.5px",
                            boxShadow: "0 4px 14px rgba(37,99,235,0.3)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "8px"
                          }}
                        >
                          <span>DESBLOQUEAR MEU ACESSO GRATUITO</span>
                          <ArrowRightOutlined />
                        </Button>
                      </Form.Item>
                    </Form>
                  </div>
                </div>

              </Col>
            </Row>

            {/* HORIZONTAL INFO ROW (Divider + Details) */}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "24px", marginBottom: "50px" }}>
              <Row gutter={[20, 20]} justify="space-between" align="middle" style={{ textAlign: "center" }}>
                <Col xs={24} md={6}>
                  <Space style={{ color: "#94a3b8" }}>
                    <CalendarOutlined style={{ color: "#2563eb" }} />
                    <Text strong style={{ color: "#cbd5e1" }}>09 DE JULHO, 2026</Text>
                  </Space>
                </Col>
                <Col xs={24} md={8}>
                  <Space style={{ color: "#94a3b8" }}>
                    <EnvironmentOutlined style={{ color: "#2563eb" }} />
                    <Text strong style={{ color: "#cbd5e1" }}>AUDITÓRIO DO IEFP RIO MAIOR</Text>
                  </Space>
                </Col>
                <Col xs={24} md={5}>
                  <Space style={{ color: "#94a3b8" }}>
                    <SafetyCertificateOutlined style={{ color: "#2563eb" }} />
                    <Text strong style={{ color: "#cbd5e1" }}>EVENTO PRESENCIAL</Text>
                  </Space>
                </Col>
                <Col xs={24} md={5}>
                  <Text style={{ color: "#64748b", fontSize: "11px" }}>
                    Digitalent.pt © 2026. Todos os direitos reservados.
                  </Text>
                </Col>
              </Row>
            </div>

            {/* BENEFIT SECTION: O QUE VAI RECEBER AO GARANTIR O SEU ACESSO */}
            <div style={{ textAlign: "center", marginBottom: "60px" }}>
              <Text style={{ color: "#3b82f6", fontWeight: 800, fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", display: "block", marginBottom: "32px" }}>
                O QUE VAI RECEBER AO GARANTIR O SEU ACESSO
              </Text>
              
              <Row gutter={[24, 24]}>
                {[
                  { icon: <FileTextOutlined />, title: "RELATÓRIO EXCLUSIVO", desc: "Dossier Antidesperdício de Capital" },
                  { icon: <TrophyOutlined />, title: "CREDENCIAL DIGITAL", desc: "Conectada ao LinkedIn (FUTURE-PROOF 2026)" },
                  { icon: <TeamOutlined />, title: "ACESSO À COMUNIDADE", desc: "Networking com profissionais de alta performance" },
                  { icon: <RocketOutlined />, title: "ATUALIZAÇÕES ESTRATÉGICAS", desc: "Conteúdos e ferramentas de aplicação imediata" },
                ].map((item, i) => (
                  <Col xs={24} sm={12} md={6} key={i}>
                    <Card
                      className="card-hover"
                      style={{
                        background: "rgba(11, 19, 41, 0.4)",
                        border: "1px solid rgba(255,255,255,0.04)",
                        borderRadius: "12px",
                        textAlign: "center",
                        height: "100%",
                      }}
                      styles={{ body: { padding: "24px 16px" } }}
                    >
                      <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "rgba(37, 99, 235, 0.08)", border: "1px solid rgba(37, 99, 235, 0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", color: "#2563eb", margin: "0 auto 16px" }}>
                        {item.icon}
                      </div>
                      <Text strong style={{ color: "#3b82f6", fontSize: "11px", letterSpacing: "1px", display: "block", marginBottom: "8px" }}>
                        {item.title}
                      </Text>
                      <Text style={{ color: "#94a3b8", fontSize: "13px", fontWeight: 400, display: "block", lineHeight: "1.4" }}>
                        {item.desc}
                      </Text>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>

          </div>
        </Content>

        {/* BOTTOM STICKY BANNER BAR */}
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            background: "rgba(2, 6, 23, 0.95)",
            backdropFilter: "blur(12px)",
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            padding: "16px 5%",
            zIndex: 999,
            display: "flex",
            flexDirection: screens.xs ? "column" : "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <img
              src="https://i.imgur.com/EpDGrzT.png"
              alt="Digitalent26"
              style={{ height: "30px", width: "auto" }}
            />
          </div>
          
          <Text style={{ color: "#ffffff", fontSize: screens.xs ? "13px" : "15px", fontWeight: 700, letterSpacing: "0.5px", textAlign: "center" }}>
            O FUTURO DO MARKETING COMEÇA COM <span style={{ color: "#f97316" }}>UMA DECISÃO.</span>
          </Text>
          
          <Button
            type="primary"
            onClick={triggerScrollToForm}
            style={{
              height: "44px",
              background: "#f97316",
              borderColor: "#f97316",
              color: "#ffffff",
              fontWeight: 800,
              fontSize: "13px",
              padding: "0 24px",
              boxShadow: "0 4px 15px rgba(249, 115, 22, 0.35)",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              borderRadius: "6px"
            }}
          >
            <span>GARANTA JÁ O SEU ACESSO GRATUITO</span>
            <ArrowRightOutlined />
          </Button>
        </div>

        {/* GDPR Privacy Modal */}
        <Modal
          title="🔐 Privacidade e Consentimento de Dados"
          open={gdprModalVisible}
          onCancel={() => setGdprModalVisible(false)}
          okText="Confirmar e Continuar"
          cancelText="Cancelar"
          okButtonProps={{ disabled: !gdprChecked, style: { background: "#2563eb", borderColor: "#2563eb" } }}
          onOk={() => {
            setHasConsented(true);
            setGdprModalVisible(false);
            if (formValuesToSubmit) {
              handleFormSubmit(formValuesToSubmit);
              setFormValuesToSubmit(null);
            }
          }}
          centered
          width={500}
        >
          <Paragraph style={{ color: "#475569" }}>
            Na Digitalent, levamos a privacidade da tua empresa a sério. Os dados fornecidos são utilizados para processar a tua credencial de ouvinte oficial, enviar o comprovativo digital e dar-te suporte para o evento.
          </Paragraph>
          <Paragraph style={{ color: "#475569" }}>
            Ao inscrever-te, estás a concordar com as seguintes diretrizes:
          </Paragraph>
          <ul style={{ paddingLeft: "20px", color: "#475569", marginBottom: "20px" }}>
            <li>Utilização segura e confidencial de dados para envio via WhatsApp e E-mail.</li>
            <li>Autorização de captação de imagem para fins de comunicação jornalística e promocional do evento Digitalent’26.</li>
            <li>Direito a retificar ou apagar a qualquer momento através de <strong>privacidade@digitalent.pt</strong>.</li>
          </ul>
          <Checkbox
            checked={gdprChecked}
            onChange={(e) => setGdprChecked(e.target.checked)}
            style={{ fontWeight: 600, color: "#1e293b" }}
          >
            Li e aceito o tratamento de dados e os termos do RGPD.
          </Checkbox>
        </Modal>

        {/* Success Modal */}
        <Modal
          open={successModalVisible}
          onCancel={() => setSuccessModalVisible(false)}
          footer={null}
          centered
          width={480}
          styles={{
            body: {
              padding: "40px 24px",
              textAlign: "center",
              background: "#0b1329",
              borderRadius: "16px",
              border: "1px solid rgba(37, 99, 235, 0.2)"
            }
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div
              style={{
                width: "72px",
                height: "72px",
                background: "rgba(34, 197, 94, 0.1)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "24px",
                border: "2px solid rgba(34, 197, 94, 0.3)",
              }}
            >
              <CheckCircleOutlined style={{ fontSize: "36px", color: "#22c55e" }} />
            </div>
            
            <Title level={2} style={{ color: "#ffffff", fontWeight: 900, fontSize: "24px", marginBottom: "12px", letterSpacing: "-0.01em" }}>
              Dossier Desbloqueado com Sucesso!
            </Title>
            
            <Paragraph style={{ color: "#94a3b8", fontSize: "15px", lineHeight: 1.6, marginBottom: "32px" }}>
              O teu documento operacional exclusivo e o bilhete digital foram enviados para a nossa central de atendimento via WhatsApp. Vemo-nos no evento!
            </Paragraph>
            
            <Button
              type="primary"
              size="large"
              onClick={() => {
                setSuccessModalVisible(false);
                window.location.href = "/";
              }}
              style={{
                height: "50px",
                padding: "0 36px",
                fontSize: "1rem",
                fontWeight: 700,
                background: "#2563eb",
                borderColor: "#2563eb",
                borderRadius: "25px",
                boxShadow: "0 8px 16px rgba(37, 99, 235, 0.2)",
              }}
            >
              Voltar à Página Principal
            </Button>
          </div>
        </Modal>

      </Layout>
    </ConfigProvider>
  );
};

export default InscricaoPage;
