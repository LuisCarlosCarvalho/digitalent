import React, { useState, useEffect } from 'react';
import { Modal, Typography, Button, Switch, Divider, Space } from 'antd';
import { SafetyCertificateOutlined, InfoCircleOutlined, SettingOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

interface LegalAndCookiesProps {
  isPrivacyOpen: boolean;
  setIsPrivacyOpen: (val: boolean) => void;
  isCookiesOpen: boolean;
  setIsCookiesOpen: (val: boolean) => void;
  isManagerOpen: boolean;
  setIsManagerOpen: (val: boolean) => void;
}

export const LegalAndCookies: React.FC<LegalAndCookiesProps> = ({
  isPrivacyOpen,
  setIsPrivacyOpen,
  isCookiesOpen,
  setIsCookiesOpen,
  isManagerOpen,
  setIsManagerOpen
}) => {
  const [showBanner, setShowBanner] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
  const [marketingEnabled, setMarketingEnabled] = useState(true);

  useEffect(() => {
    const consent = localStorage.getItem('digitalent_cookie_consent');
    if (!consent) {
      setShowBanner(true);
    } else if (consent === 'custom') {
      setAnalyticsEnabled(localStorage.getItem('digitalent_cookie_analytics') === 'true');
      setMarketingEnabled(localStorage.getItem('digitalent_cookie_marketing') === 'true');
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('digitalent_cookie_consent', 'all');
    localStorage.setItem('digitalent_cookie_analytics', 'true');
    localStorage.setItem('digitalent_cookie_marketing', 'true');
    setShowBanner(false);
    setIsManagerOpen(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('digitalent_cookie_consent', 'custom');
    localStorage.setItem('digitalent_cookie_analytics', analyticsEnabled.toString());
    localStorage.setItem('digitalent_cookie_marketing', marketingEnabled.toString());
    setShowBanner(false);
    setIsManagerOpen(false);
  };

  return (
    <>
      {/* Cookie Banner */}
      {showBanner && (
        <div
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: '#ffffff',
            boxShadow: '0 -4px 20px rgba(0,0,0,0.1)',
            padding: '24px',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            borderTop: '1px solid #e2e8f0'
          }}
        >
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <Title level={5} style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <InfoCircleOutlined style={{ fontSize: '18px', color: '#2563eb' }} />
                Valorizamos a sua privacidade
              </Title>
              <Text style={{ color: '#475569', fontSize: '0.95rem', display: 'block', marginTop: '8px' }}>
                Utilizamos cookies essenciais para o funcionamento do site e cookies opcionais para melhorar a sua experiência e analisar o nosso tráfego. Pode aceitar todos os cookies ou gerir as suas preferências.
              </Text>
            </div>
            <Space style={{ alignSelf: 'flex-start', flexWrap: 'wrap' }}>
              <Button type="primary" onClick={handleAcceptAll} style={{ background: '#2563eb' }}>
                Aceitar Todos
              </Button>
              <Button onClick={() => setIsManagerOpen(true)}>
                Gerir Preferências
              </Button>
            </Space>
          </div>
        </div>
      )}

      {/* Privacy Policy Modal */}
      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <SafetyCertificateOutlined style={{ fontSize: '20px', color: '#2563eb' }} />
            <Text strong style={{ fontSize: '1.2rem' }}>Política de Privacidade</Text>
          </div>
        }
        open={isPrivacyOpen}
        onCancel={() => setIsPrivacyOpen(false)}
        footer={
          <Button type="primary" onClick={() => setIsPrivacyOpen(false)} style={{ background: '#2563eb' }}>
            Compreendi
          </Button>
        }
        width={700}
      >
        <div style={{ maxHeight: '60vh', overflowY: 'auto', paddingRight: '10px' }}>
          <Paragraph>
            A sua privacidade é importante para nós. Esta política explica como recolhemos, usamos e protegemos as suas informações pessoais no evento <strong>Digitalent26</strong>.
          </Paragraph>
          
          <Title level={5}>1. Recolha de Dados</Title>
          <Paragraph>
            Recolhemos os dados fornecidos voluntariamente através dos formulários de inscrição, incluindo nome, endereço de e-mail, número de telefone (WhatsApp) e informações corporativas. Estes dados são necessários para processar a sua inscrição, emitir bilhetes e faturas.
          </Paragraph>

          <Title level={5}>2. Uso da Informação</Title>
          <Paragraph>
            Os dados são utilizados exclusivamente para:
            <ul>
              <li>Emissão e envio de bilhetes/comprovativos (via e-mail e WhatsApp);</li>
              <li>Comunicações logísticas ou atualizações importantes sobre o evento;</li>
              <li>Processamento seguro de pagamentos através de parceiros certificados (ex: Stripe);</li>
              <li>Apoio ao cliente.</li>
            </ul>
          </Paragraph>

          <Title level={5}>3. Partilha de Dados</Title>
          <Paragraph>
            Não vendemos nem partilhamos os seus dados pessoais com terceiros para fins de marketing não relacionado. Os seus dados apenas poderão ser partilhados com prestadores de serviços essenciais à realização do evento (ex: processadores de pagamento e plataformas de envio de e-mail), operando sob rigorosos acordos de confidencialidade.
          </Paragraph>

          <Title level={5}>4. Direitos do Titular</Title>
          <Paragraph>
            Nos termos do Regulamento Geral sobre a Proteção de Dados (RGPD), tem o direito de aceder, retificar, apagar ou limitar o tratamento dos seus dados. Para exercer estes direitos, contacte a organização através dos canais oficiais indicados no site.
          </Paragraph>
        </div>
      </Modal>

      {/* Cookie Policy Modal */}
      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <InfoCircleOutlined style={{ fontSize: '20px', color: '#2563eb' }} />
            <Text strong style={{ fontSize: '1.2rem' }}>Política de Cookies</Text>
          </div>
        }
        open={isCookiesOpen}
        onCancel={() => setIsCookiesOpen(false)}
        footer={
          <Button type="primary" onClick={() => setIsCookiesOpen(false)} style={{ background: '#2563eb' }}>
            Compreendi
          </Button>
        }
        width={700}
      >
        <div style={{ maxHeight: '60vh', overflowY: 'auto', paddingRight: '10px' }}>
          <Paragraph>
            A presente Política de Cookies descreve o uso de cookies no site <strong>Digitalent26</strong> para melhorar a sua experiência de navegação e oferecer serviços mais personalizados.
          </Paragraph>
          
          <Title level={5}>O que são Cookies?</Title>
          <Paragraph>
            Cookies são pequenos ficheiros de texto armazenados no seu dispositivo pelo navegador web. Eles ajudam o site a "lembrar-se" das suas preferências e visitas repetidas, assegurando o seu correto funcionamento e permitindo-nos analisar como o site é utilizado.
          </Paragraph>

          <Title level={5}>Tipos de Cookies que Utilizamos</Title>
          
          <Text strong>1. Cookies Estritamente Necessários (Essenciais)</Text>
          <Paragraph>
            Estes cookies são fundamentais para o funcionamento do site e não podem ser desativados. Eles incluem cookies para gestão de sessões, processamento de pagamentos (Stripe) e para armazenar as suas próprias preferências de consentimento de cookies.
          </Paragraph>

          <Text strong>2. Cookies Analíticos</Text>
          <Paragraph>
            Ajudam-nos a compreender como os visitantes interagem com o site, recolhendo informações de forma anónima (ex: Google Analytics). Estes dados permitem-nos melhorar a estrutura e o conteúdo da plataforma.
          </Paragraph>

          <Text strong>3. Cookies de Marketing (Opcionais)</Text>
          <Paragraph>
            Podem ser configurados pelos nossos parceiros de publicidade para construir um perfil dos seus interesses e mostrar-lhe anúncios relevantes do evento Digitalent noutros sites.
          </Paragraph>

          <Title level={5}>Gestão de Cookies</Title>
          <Paragraph>
            Pode gerir as suas preferências a qualquer momento clicando na opção "Gerir Cookies" no rodapé do nosso site. Alternativamente, a maioria dos navegadores permite bloquear ou apagar cookies através das suas definições.
          </Paragraph>
        </div>
      </Modal>

      {/* Cookie Manager Modal */}
      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <SettingOutlined style={{ fontSize: '20px', color: '#2563eb' }} />
            <Text strong style={{ fontSize: '1.2rem' }}>Gerir Preferências de Cookies</Text>
          </div>
        }
        open={isManagerOpen}
        onCancel={() => setIsManagerOpen(false)}
        footer={
          <Space>
            <Button onClick={handleAcceptAll}>Aceitar Todos</Button>
            <Button type="primary" onClick={handleSavePreferences} style={{ background: '#2563eb' }}>
              Guardar Preferências
            </Button>
          </Space>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Paragraph style={{ color: '#64748b' }}>
            Pode escolher quais as categorias de cookies que pretende permitir. As suas preferências aplicar-se-ão a este website.
          </Paragraph>
          
          {/* Essential */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <Text strong style={{ fontSize: '1.05rem' }}>Cookies Estritamente Necessários</Text>
              <Text type="secondary" style={{ color: '#2563eb', fontWeight: 500 }}>Sempre Ativos</Text>
            </div>
            <Text style={{ color: '#64748b', fontSize: '0.9rem' }}>
              Necessários para o funcionamento básico do site, segurança e gestão de pagamentos. Não podem ser desativados.
            </Text>
          </div>
          
          <Divider style={{ margin: '0' }} />

          {/* Analytics */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <Text strong style={{ fontSize: '1.05rem' }}>Cookies Analíticos</Text>
              <Switch checked={analyticsEnabled} onChange={setAnalyticsEnabled} />
            </div>
            <Text style={{ color: '#64748b', fontSize: '0.9rem' }}>
              Ajudam a entender como os visitantes interagem com o site, reportando dados anonimizados para nos ajudar a melhorar.
            </Text>
          </div>

          <Divider style={{ margin: '0' }} />

          {/* Marketing */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <Text strong style={{ fontSize: '1.05rem' }}>Cookies de Marketing</Text>
              <Switch checked={marketingEnabled} onChange={setMarketingEnabled} />
            </div>
            <Text style={{ color: '#64748b', fontSize: '0.9rem' }}>
              Usados para rastrear visitantes através de websites e apresentar anúncios relevantes da Digitalent e campanhas futuras.
            </Text>
          </div>
        </div>
      </Modal>
    </>
  );
};
