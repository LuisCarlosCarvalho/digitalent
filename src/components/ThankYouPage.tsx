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

const sponsorLogos = [
  "https://i.imgur.com/1USX4Kp.png",
  "https://i.imgur.com/n0g2qAC.png",
  "https://i.imgur.com/SFWphsk.png",
  "https://i.imgur.com/Plb9o3i.png",
  "https://i.imgur.com/EpDGrzT.png",
  "https://i.imgur.com/KvjOZO6.png",
  "https://i.imgur.com/bfYdCUW.png",
  "https://i.imgur.com/iFG6dJM.png",
  "https://i.imgur.com/Wi15eOJ.png",
  "https://i.imgur.com/0chPN8K.png",
  "https://i.imgur.com/dKAKHTL.png",
  "https://i.imgur.com/woVb34r.png",
  "https://i.imgur.com/ornrxZ9.png",
  "https://i.imgur.com/lFpdYo0.png",
  "https://i.imgur.com/is2UOaX.png",
  "https://i.imgur.com/oy0J23M.png",
  "https://i.imgur.com/5zgGbnp.png",
];

const ThankYouPage: React.FC = () => {
  return (
    <ConfigProvider theme={getBaseThemeConfig()}>
      <div style={{
        minHeight: "100vh",
        width: "100%",
        backgroundImage: "url('https://i.imgur.com/MG6J1tf.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column"
      }}>
        {/* Top Banner (Like the mockup) */}
        <div style={{ 
          background: "rgba(255, 255, 255, 0.85)", 
          borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
          padding: "10px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%"
        }}>
          <Title level={2} style={{ 
            margin: 0, 
            color: "#0f172a", 
            textTransform: "uppercase", 
            fontWeight: 800,
            whiteSpace: "nowrap",
            marginRight: "20px"
          }}>
            OBRIGADO!!!
          </Title>
          <div className="marquee-container" style={{ padding: "0", flex: 1, overflow: "hidden" }}>
            <div className="marquee-content" style={{ animationDuration: "40s" }}>
              {sponsorLogos.concat(sponsorLogos).map((logo, index) => (
                <div key={index} className="sponsor-logo">
                  <img src={logo} alt={`Parceiro ${index}`} style={{ height: "45px", objectFit: "contain", maxWidth: "120px" }} />
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <Layout style={{ flex: 1, background: "transparent" }}>
          <Content
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              justifyContent: "flex-end",
              padding: "40px",
              textAlign: "center",
              flex: 1,
            }}
          >
            {/* Logo (Digitalent / Gotalent) com fundo subtil */}
            <div style={{ 
              background: "rgba(255, 255, 255, 0.7)", 
              padding: "32px", 
              borderRadius: "16px",
              boxShadow: "0 16px 32px rgba(0, 0, 0, 0.2)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255, 255, 255, 0.5)"
            }}>
              <img
                src="https://i.imgur.com/EpDGrzT.png"
                alt="Digitalent Logo"
                style={{ maxWidth: "280px", marginBottom: "16px" }}
              />
              <Text style={{ fontSize: "1.4rem", color: "#0f172a", fontWeight: 700, display: "block" }}>
                Aguarde novidades
              </Text>
            </div>
          </Content>
        </Layout>
      </div>
    </ConfigProvider>
  );
};

export default ThankYouPage;
