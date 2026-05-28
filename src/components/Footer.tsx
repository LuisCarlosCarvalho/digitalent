import React from "react";
import { Layout, Divider, Space, Typography } from "antd";
import {
  InstagramOutlined,
  LinkedinOutlined,
  FacebookOutlined,
} from "@ant-design/icons";

const { Footer: AntdFooter } = Layout;
const { Text } = Typography;

export const Footer: React.FC = () => {
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
              href="https://fslsolution.com"
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
    </AntdFooter>
  );
};
