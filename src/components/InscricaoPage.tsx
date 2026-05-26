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
  ArrowLeftOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

const { Header, Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { useBreakpoint } = Grid;

// Premium Light Theme Token Configuration
const lightThemeConfig = {
  algorithm: theme.defaultAlgorithm,
  token: {
    colorPrimary: "#2563eb", // Royal Blue
    colorBgBase: "#ffffff", // Pure White Background
    colorTextBase: "#1e293b", // Slate 800 Dark Text
    colorBgContainer: "#f8fafc", // Slate 50 Surface Background
    borderRadius: 12,
    fontFamily: "'Outfit', sans-serif",
  },
  components: {
    Button: {
      colorPrimary: "#2563eb",
      colorPrimaryHover: "#1d4ed8",
      controlHeightLG: 56,
      borderRadiusLG: 28,
    },
    Input: {
      colorBgContainer: "#ffffff",
      colorBorder: "#cbd5e1",
      colorTextPlaceholder: "#94a3b8",
      controlHeightLG: 50,
    },
    Card: {
      colorBgContainer: "#f8fafc",
      colorBorder: "#e2e8f0",
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05)",
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
          color: "#1e293b",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ConfigProvider theme={lightThemeConfig}>
      <Layout style={{ minHeight: "100vh", background: "#ffffff", position: "relative" }}>
        
        {/* Dossier Grid Pattern Overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: "radial-gradient(#2563eb05 1px, transparent 1px)",
            backgroundSize: "16px 16px",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* Header Section */}
        <Header
          style={{
            background: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(8px)",
            borderBottom: "1px solid #e2e8f0",
            height: "70px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 5%",
            position: "sticky",
            top: 0,
            zIndex: 10,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }} onClick={() => window.location.href = "/"}>
            <ArrowLeftOutlined style={{ marginRight: "8px", color: "#2563eb", fontSize: "1.1rem" }} />
            <Text strong style={{ color: "#64748b", fontSize: "0.95rem" }}>
              Voltar ao Site Principal
            </Text>
          </div>
          <div>
            <img
              src="https://i.imgur.com/EpDGrzT.png"
              alt="Digitalent Logo"
              style={{ height: "40px", width: "auto" }}
            />
          </div>
        </Header>

        {/* Content Body */}
        <Content style={{ position: "relative", zIndex: 1, padding: screens.xs ? "32px 16px 80px" : "64px 24px 100px" }}>
          
          {/* Main Dossier Container */}
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <Row justify="center">
              <Col xs={24} sm={22} md={18} lg={13} style={{ textAlign: "center" }}>
                
                {/* Logo top display */}
                <div style={{ marginBottom: "32px", display: "inline-block", position: "relative" }}>
                  <div 
                    style={{ 
                      position: "absolute", 
                      width: "180px", 
                      height: "180px", 
                      background: "rgba(37, 99, 235, 0.08)", 
                      filter: "blur(35px)", 
                      borderRadius: "50%", 
                      top: "50%", 
                      left: "50%", 
                      transform: "translate(-50%, -50%)", 
                      zIndex: 0 
                    }}
                  />
                  <img
                    src="https://i.imgur.com/EpDGrzT.png"
                    alt="Digitalent26 Logo"
                    style={{ 
                      width: "220px", 
                      height: "auto", 
                      position: "relative", 
                      zIndex: 1, 
                      filter: "drop-shadow(0px 10px 20px rgba(0,0,0,0.05))" 
                    }}
                  />
                </div>

                {/* Badge Restricted */}
                <Space direction="vertical" size={12} style={{ width: "100%", marginBottom: "28px" }}>
                  <Badge 
                    status="error" 
                    text={<span style={{ color: "#ef4444", fontWeight: 700, letterSpacing: "1.2px", fontSize: "11px" }}>⚠️ RELATÓRIO SUBTERRÂNEO / INFORMAÇÃO RESTRITA</span>} 
                    style={{ background: "#fef2f2", padding: "6px 18px", borderRadius: "50px", border: "1px solid #fee2e2" }}
                  />
                  
                  {/* Hero Headline */}
                  <Title level={1} style={{ color: "#1e293b", fontSize: screens.xs ? "28px" : "38px", fontWeight: 900, letterSpacing: "-1.5px", lineHeight: "1.2", marginTop: "12px" }}>
                    A vantagem invisível que está a redefinir o marketing em 2026.
                  </Title>
                  
                  {/* Subheadline */}
                  <Paragraph style={{ color: "#64748b", fontSize: "15px", maxWidth: "720px", margin: "0 auto", lineHeight: "1.6", fontWeight: 400 }}>
                    Desvele os códigos exatos que empresas tradicionais aplicam para reter carteiras de clientes e gerar lucros maciços com a internet, totalmente blindados contra jargões técnicos ou agências abusivas. O mapa de ação para explodir os seus resultados comerciais.
                  </Paragraph>

                  {/* LinkedIn Certification Badge */}
                  <div style={{ marginTop: "4px" }}>
                    <Badge 
                      count={
                        <Space style={{ padding: "6px 14px", background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: "30px" }}>
                          <SafetyCertificateOutlined style={{ color: "#2563eb", fontSize: "14px" }} /> 
                          <span style={{ color: "#2563eb", fontWeight: 700, fontSize: "11px", letterSpacing: "0.3px" }}>
                            Garante Credencial Digital Conectada ao LinkedIn (FUTURE-PROOF 2026)
                          </span>
                        </Space>
                      }
                    />
                  </div>
                </Space>

                {/* The Hook Block (Secret Intelligence Dossier Styled Card) */}
                <Card
                  style={{
                    background: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    borderRadius: "16px",
                    textAlign: "left",
                    marginBottom: "32px",
                    boxShadow: "0 4px 20px -2px rgba(37,99,235,0.02)"
                  }}
                  styles={{ body: { padding: "24px" } }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                    <LockOutlined style={{ color: "#2563eb", fontSize: "16px" }} />
                    <span style={{ color: "#2563eb", fontWeight: 800, fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px" }}>
                      Dossiê Antidesperdício de Capital
                    </span>
                  </div>
                  <Title level={3} style={{ color: "#1e293b", marginTop: 0, fontSize: "19px", fontWeight: 800, letterSpacing: "-0.3px" }}>
                    O Raio-X Impiedoso aos Anúncios que Queimam o Seu Caixa
                  </Title>
                  <Paragraph style={{ color: "#475569", fontSize: "13.5px", lineHeight: "1.6", margin: 0 }}>
                    Cansado de ver o seu dinheiro sumir em orçamentos vazios sem retorno comercial palpável? No dia 9 de Julho, vamos auditar sem filtros as campanhas obsoletas que sabotam o seu negócio, entregando de bandeja as ferramentas táticas de conversão imediata.
                  </Paragraph>
                </Card>

                {/* Bloco de Formulário Clean e Focado */}
                <div
                  style={{ 
                    background: "#ffffff", 
                    border: "1px solid #e2e8f0", 
                    padding: screens.xs ? "24px 20px" : "36px", 
                    borderRadius: "20px", 
                    boxShadow: "0 20px 25px -5px rgba(0,0,0,0.02), 0 10px 10px -5px rgba(0,0,0,0.02)" 
                  }}
                >
                  <Title level={4} style={{ color: "#1e293b", marginBottom: "4px", fontWeight: 800, fontSize: "18px" }}>
                    Passe Geral (Acesso Isento de Custos)
                  </Title>
                  <Paragraph style={{ color: "#64748b", marginBottom: "24px", fontSize: "13px" }}>
                    Insira os seus dados de verificação abaixo para emitir a sua credencial operacional e aceder ao ecossistema.
                  </Paragraph>

                  <div onClickCapture={handleFormInteraction} onFocusCapture={handleFormInteraction}>
                    <Form form={form} layout="vertical" onFinish={handleFormSubmit} requiredMark={false}>
                      <Form.Item 
                        name="name" 
                        rules={[{ required: true, message: "Por favor, indique o seu nome completo." }]}
                      >
                        <Input 
                          prefix={<UserOutlined style={{ color: "#94a3b8" }} />} 
                          placeholder="Nome do Proprietário / Diretor" 
                          size="large" 
                          style={{ borderRadius: "8px", height: "44px" }} 
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
                          prefix={<MailOutlined style={{ color: "#94a3b8" }} />} 
                          placeholder="E-mail de Contacto Direto" 
                          size="large" 
                          style={{ borderRadius: "8px", height: "44px" }} 
                        />
                      </Form.Item>

                      <Form.Item 
                        name="phone" 
                        rules={[{ required: true, message: "Introduza o seu telemóvel." }]}
                      >
                        <Input 
                          prefix={<PhoneOutlined style={{ color: "#94a3b8" }} />} 
                          placeholder="Telemóvel Corporativo (WhatsApp)" 
                          size="large" 
                          style={{ borderRadius: "8px", height: "44px" }} 
                        />
                      </Form.Item>

                      <Form.Item style={{ marginBottom: 0, marginTop: "28px" }}>
                        <Button 
                          type="primary" 
                          htmlType="submit" 
                          size="large" 
                          loading={loading}
                          disabled={loading}
                          block
                          icon={<ArrowRightOutlined />}
                          style={{
                            height: "50px",
                            background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                            border: "none",
                            borderRadius: "8px",
                            fontWeight: 700,
                            fontSize: "15px",
                            letterSpacing: "0.5px",
                            boxShadow: "0 4px 14px rgba(37,99,235,0.25)"
                          }}
                        >
                          DESBLOQUEAR MEU ACESSO GRATUITO
                        </Button>
                      </Form.Item>
                    </Form>
                  </div>
                </div>

                {/* Footer Brand Info */}
                <div style={{ textAlign: "center", marginTop: "40px", color: "#64748b", fontSize: "0.8rem" }}>
                  Digitalent.pt © 2026. Todos os direitos reservados.
                  <br />
                  Evento presencial no Auditório do IEFP Rio Meão.
                </div>

              </Col>
            </Row>
          </div>
        </Content>

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
          <Paragraph>
            Na Digitalent, levamos a privacidade da tua empresa a sério. Os dados fornecidos são utilizados para processar a tua credencial de ouvinte oficial, enviar o comprovativo digital e dar-te suporte para o evento.
          </Paragraph>
          <Paragraph>
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
              background: "#ffffff",
              borderRadius: "16px",
            }
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div
              style={{
                width: "72px",
                height: "72px",
                background: "#f0fdf4",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "24px",
                border: "2px solid #bbf7d0",
              }}
            >
              <CheckCircleOutlined style={{ fontSize: "36px", color: "#22c55e" }} />
            </div>
            
            <Title level={2} style={{ color: "#1e293b", fontWeight: 900, fontSize: "24px", marginBottom: "12px", letterSpacing: "-0.01em" }}>
              Dossier Desbloqueado com Sucesso!
            </Title>
            
            <Paragraph style={{ color: "#475569", fontSize: "15px", lineHeight: 1.6, marginBottom: "32px" }}>
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
