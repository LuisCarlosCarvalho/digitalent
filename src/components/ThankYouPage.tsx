import React from "react";
import { Layout, Typography, ConfigProvider, theme } from "antd";
import "../index.css";

const { Content } = Layout;
const { Title, Text } = Typography;

const getBaseThemeConfig = () => ({
  algorithm: theme.defaultAlgorithm,
  token: {
    colorPrimary: "#2563eb",
    colorBgBase: "#f8fafc",
    colorTextBase: "#0f172a",
    borderRadius: 8,
    fontFamily: "'Inter', sans-serif",
  },
});

const ThankYouPage: React.FC = () => {
  return (
    <ConfigProvider theme={getBaseThemeConfig()}>
      <Layout 
        style={{ 
          minHeight: "100vh", 
          background: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/bg-evento.jpeg') center / cover no-repeat",
        }}
      >
        <Content
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            textAlign: "center",
          }}
        >
          {/* Logo (Digitalent / Gotalent) */}
          <img
            src="https://i.imgur.com/EpDGrzT.png"
            alt="Digitalent Logo"
            style={{ maxWidth: "300px", marginBottom: "40px" }}
          />
          
          <Title level={1} style={{ color: "#ffffff", marginBottom: "20px" }}>
            Obrigado, pelo sucesso do evento...
          </Title>
          
          <Text style={{ fontSize: "1.5rem", color: "#e2e8f0" }}>
            Aguarde novidades
          </Text>
        </Content>
      </Layout>
    </ConfigProvider>
  );
};

export default ThankYouPage;
