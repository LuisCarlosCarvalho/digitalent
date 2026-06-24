import React, { useState } from "react";
import { Layout, Divider, Space, Typography } from "antd";
import { LegalAndCookies } from "./policies/LegalAndCookies";
import {
  InstagramOutlined,
  LinkedinOutlined,
  FacebookOutlined,
} from "@ant-design/icons";

const { Footer: AntdFooter } = Layout;
const { Text } = Typography;

export const Footer: React.FC = () => {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isCookiesOpen, setIsCookiesOpen] = useState(false);
  const [isManagerOpen, setIsManagerOpen] = useState(false);

  return (
    <AntdFooter
      style={{
        background: "#ffffff",
        padding: "0 0 40px 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      {/* Top Layer: Subtle horizontal divider */}
      <Divider 
        style={{ 
          margin: "0 0 40px 0", 
          borderColor: "#f1f5f9",
          borderWidth: "1px"
        }} 
      />

      {/* Main Content Area */}
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          padding: "0 24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "24px",
        }}
      >
        {/* Social Icons Layer */}
        <Space 
          size={24} 
          style={{ 
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <a
            href="https://www.instagram.com/digitalent26"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#1e293b",
              fontSize: "22px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.3s ease",
            }}
            className="footer-social-icon"
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#2563eb";
              e.currentTarget.style.transform = "translateY(-3px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#1e293b";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <InstagramOutlined />
          </a>
          <a
            href="https://www.linkedin.com/company/digitalent26/?viewAsMember=true"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#1e293b",
              fontSize: "22px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.3s ease",
            }}
            className="footer-social-icon"
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#2563eb";
              e.currentTarget.style.transform = "translateY(-3px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#1e293b";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <LinkedinOutlined />
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=61590137976137"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#1e293b",
              fontSize: "22px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.3s ease",
            }}
            className="footer-social-icon"
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#2563eb";
              e.currentTarget.style.transform = "translateY(-3px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#1e293b";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <FacebookOutlined />
          </a>
        </Space>

        {/* Policies Links */}
        <Space size={32} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Text 
            style={{ cursor: 'pointer', color: '#64748b', fontSize: '14px', transition: 'color 0.3s' }} 
            onClick={() => setIsPrivacyOpen(true)}
            onMouseEnter={(e) => e.currentTarget.style.color = '#2563eb'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#64748b'}
          >
            Política de Privacidade
          </Text>
          <Text 
            style={{ cursor: 'pointer', color: '#64748b', fontSize: '14px', transition: 'color 0.3s' }} 
            onClick={() => setIsCookiesOpen(true)}
            onMouseEnter={(e) => e.currentTarget.style.color = '#2563eb'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#64748b'}
          >
            Política de Cookies
          </Text>
          <Text 
            style={{ cursor: 'pointer', color: '#64748b', fontSize: '14px', transition: 'color 0.3s' }} 
            onClick={() => setIsManagerOpen(true)}
            onMouseEnter={(e) => e.currentTarget.style.color = '#2563eb'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#64748b'}
          >
            Gerir Cookies
          </Text>
        </Space>

        {/* Text / Copyright Layer */}
        <div
          style={{
            textAlign: "center",
            width: "100%",
          }}
        >
          <Text
            style={{
              color: "#1e293b",
              fontSize: "14px",
              lineHeight: "1.6",
              fontWeight: 400,
              display: "block",
            }}
          >
            © 2026 Digitalent26 - Marketing com Visão. Desenvolvido pela{" "}
            <a
              href="https://umbulab.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#2563eb",
                fontWeight: 600,
                textDecoration: "none",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#1d4ed8";
                e.currentTarget.style.textDecoration = "underline";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#2563eb";
                e.currentTarget.style.textDecoration = "none";
              }}
            >
              @FSLSolution
            </a>{" "}
            - Todos os direitos reservados.
          </Text>
        </div>
      </div>

      <LegalAndCookies 
        isPrivacyOpen={isPrivacyOpen}
        setIsPrivacyOpen={setIsPrivacyOpen}
        isCookiesOpen={isCookiesOpen}
        setIsCookiesOpen={setIsCookiesOpen}
        isManagerOpen={isManagerOpen}
        setIsManagerOpen={setIsManagerOpen}
      />
    </AntdFooter>
  );
};
