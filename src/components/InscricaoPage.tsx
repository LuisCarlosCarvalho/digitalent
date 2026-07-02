import React, { useState, useEffect, useCallback } from 'react';
import { Row, Col, Typography, Form, Input, Button, Badge, Card, notification, Space, Modal, Checkbox, ConfigProvider, theme } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, GlobalOutlined, CheckCircleOutlined, ArrowRightOutlined, LockOutlined, InstagramOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

type Language = 'PT' | 'EN';

const dictionary = {
  PT: {
    heroTag: '🔒 FICHEIRO ESTRATÉGICO / CONSULTA LIMITADA',
    heroTitle: 'A vantagem invisível que está a redefinir o marketing em 2026.',
    heroSub: 'Desvende os códigos exatos que empresas tradicionais aplicam para reter carteiras de clientes e gerar lucros maciços com a internet, totalmente blindados contra torções técnicas ou agências abusivas.',
    bullet1: 'O mapa de ação para explodir os seus resultados comerciais.',
    bullet2: 'Garanta Credencial Digital Conectada ao Instagram',
    dossierTitle: 'O Raio-X Impiedoso aos Anúncios que Queimam o Seu Caixa',
    dossierText: 'Cansado de ver o seu dinheiro sumir em orçamentos vazios sem retorno comercial palpável? No dia 9 de Julho, vamos auditar em filtra os campanhas obsoletas que sabotam o seu negócio, entregando de bandeja as ferramentas táticas de conversão imediata.',
    benefit1: 'Estratégias que funcionam agora',
    benefit2: 'Conversão imediata e mensurável',
    benefit3: 'Proteção contra gastos inúteis',
    benefit4: 'Métodos usados pelos líderes de mercado',
    formHeader: 'PASSE GERAL',
    formSub: '(ACESSO ISENTO DE CUSTOS)',
    formDesc: 'Insira os seus dados de verificação abaixo para emitir a sua credencial operacional e aceder ao ecossistema.',
    btnSubmit: 'INSCREVA-SE AGORA',
    dateLabel: '09 DE JULHO 2026',
    preDays: 'FALTAM',
    postDays: 'DIAS',
    gdprTitle: '🔐 Privacidade e Consentimento de Dados',
    gdprText: 'Na Digitalent, levamos a privacidade da tua empresa a sério. Os dados fornecidos são utilizados para processar a tua credencial de ouvinte oficial, enviar o comprovativo digital e dar-te suporte para o evento.',
    gdprAccept: 'Li e aceito o tratamento de dados e os termos do RGPD.',
    btnConfirm: 'Confirmar e Continuar',
    btnCancel: 'Cancelar',
    submitSuccess: 'Dossier Desbloqueado!',
    submitSuccessDesc: 'As credenciais e o PDF de admissão foram despachados para o seu e-mail.',
    backHomeBtn: 'Voltar à Página Principal',
  },
  EN: {
    heroTag: '🔒 CLASSIFIED DOSSIER / RESTRICTED ACCESS',
    heroTitle: 'The invisible advantage reshaping marketing in 2026.',
    heroSub: 'Uncover the exact codes traditional businesses apply to retain client portfolios and generate massive online profits, completely shielded from technical twists or abusive agencies.',
    bullet1: 'The action blueprint to explode your commercial results.',
    bullet2: 'Secure your Digital Credential Connected to LinkedIn (FUTURE-PROOF 2026)',
    dossierTitle: 'The Merciless Analysis of Campaigns Burning Cash',
    dossierText: 'Tired of watching your funds vanish into empty budgets with no tangible return? On July 9th, we will audit without filters the obsolete campaigns sabotaging your business, handing you the tactical conversion tools.',
    benefit1: 'Strategies that work right now',
    benefit2: 'Immediate and measurable return',
    benefit3: 'Protection against useless costs',
    benefit4: 'Methods applied by market leaders',
    formHeader: 'GENERAL PASS',
    formSub: '(COMPLIMENTARY ACCESS)',
    formDesc: 'Enter your verification details below to issue your operational credential and unlock the ecosystem.',
    btnSubmit: 'UNLOCK MY FREE ACCESS',
    dateLabel: 'JULY 09, 2026',
    preDays: 'ONLY',
    postDays: 'DAYS LEFT',
    gdprTitle: '🔐 Data Privacy & Consent',
    gdprText: 'At Digitalent, we take your corporate privacy seriously. The provided data will be processed to generate your listener credentials and dispatch the PDF ticket.',
    gdprAccept: 'I have read and agree to the GDPR data privacy regulations.',
    btnConfirm: 'Confirm & Continue',
    btnCancel: 'Cancel',
    submitSuccess: 'Dossier Unlocked!',
    submitSuccessDesc: 'Your credentials and admission PDF have been dispatched to your e-mail.',
    backHomeBtn: 'Back to Home Page',
  }
};

const lightThemeConfig = {
  algorithm: theme.defaultAlgorithm,
  token: {
    colorPrimary: "#2563eb",
    colorBgBase: "#ffffff",
    colorTextBase: "#0f172a",
    colorBgContainer: "#ffffff",
    borderRadius: 12,
    fontFamily: "'Inter', sans-serif",
  },
  components: {
    Button: {
      colorPrimary: "#2563eb",
      colorPrimaryHover: "#1d4ed8",
      controlHeightLG: 52,
      borderRadiusLG: 8,
    },
    Input: {
      colorBgContainer: "#ffffff",
      colorBorder: "#cbd5e1",
      colorText: "#0f172a",
      colorTextPlaceholder: "#94a3b8",
      controlHeightLG: 44,
    },
    Card: {
      colorBgContainer: "rgba(255, 255, 255, 0.9)",
      colorBorder: "#e2e8f0",
    },
    Checkbox: {
      colorPrimary: "#2563eb",
    },
  },
};

export default function InscriptionPage() {
  const [form] = Form.useForm();
  const [lang, setLang] = useState<Language>('PT');
  const [loading, setLoading] = useState<boolean>(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [gdprModalVisible, setGdprModalVisible] = useState(false);
  const [gdprChecked, setGdprChecked] = useState(false);
  const [hasConsented, setHasConsented] = useState(false);
  const [formValuesToSubmit, setFormValuesToSubmit] = useState<any>(null);

  const TARGET_DATE_STR = '2026-07-09';
  const t = dictionary[lang];

  const calculateDaysRemaining = useCallback((): number => {
    const target = new Date(`${TARGET_DATE_STR}T00:00:00`);
    const now = new Date();
    const currentNormalized = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const diffInMs = target.getTime() - currentNormalized.getTime();
    const days = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 0;
  }, []);

  const [daysRemaining, setDaysRemaining] = useState<number>(calculateDaysRemaining());

  useEffect(() => {
    window.scrollTo(0, 0);
    setDaysRemaining(calculateDaysRemaining());

    const intervalId = setInterval(() => {
      setDaysRemaining(calculateDaysRemaining());
    }, 3600000);
    return () => clearInterval(intervalId);
  }, [calculateDaysRemaining]);

  const handleSubmit = async (values: any) => {

    setLoading(true);
    try {
      const response = await fetch('/api/register-whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'FREE_CYBER_DOSSIER',
          name: values.name,
          email: values.email,
          phone: values.phone,
          company: "PME Local",
          sponsorshipLevel: "Acesso Geral Gratuito",
          languagePreference: lang,
          tier: "FREE"
        }),
      });
      const data = await response.json();
      if (response.ok || data.success) {
        // Track Facebook Pixel Event
        if (typeof window !== 'undefined' && (window as any).fbq) {
          (window as any).fbq('track', 'CompleteRegistration', {
            content_name: 'Dossier Antidesperdício',
            status: 'Success'
          });
        }

        notification.success({
          message: t.submitSuccess,
          description: t.submitSuccessDesc,
          placement: 'topRight',
          style: { fontFamily: safeFont }
        });
        setSuccessModalVisible(true);
        form.resetFields();
      } else {
        throw new Error(data.error || "Erro desconhecido");
      }
    } catch (error: any) {
      notification.error({
        message: 'Erro no Registo',
        description: error.message || (lang === 'PT' ? 'Ocorreu uma falha técnica na validação.' : 'An operational failure occurred during validation.'),
        placement: 'topRight',
        style: { fontFamily: safeFont }
      });
    } finally {
      setLoading(false);
    }
  };

  const safeFont = "'Inter', sans-serif";

  return (
    <ConfigProvider theme={lightThemeConfig}>
      <div 
        className="moving-grid" 
        style={{ 
          background: '#ffffff', 
          minHeight: '100vh', 
          padding: '40px 16px 120px', 
          color: '#0f172a', 
          fontFamily: safeFont, 
          backgroundImage: 'radial-gradient(rgba(15, 23, 42, 0.05) 1px, transparent 1px)', 
          backgroundSize: '24px 24px', 
          position: 'relative', 
          overflowX: 'hidden' 
        }}
      >
        
        {/* Animated Cyber Gradient Orbs (Marketing Depth and Floating Motion) */}
        <div style={{
          position: 'absolute',
          top: '8%',
          right: '5%',
          width: '550px',
          height: '550px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(37, 99, 235, 0.12) 0%, transparent 70%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
          zIndex: 0,
          animation: 'orbFloat1 20s ease-in-out infinite'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '12%',
          left: '2%',
          width: '650px',
          height: '650px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(249, 115, 22, 0.07) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 0,
          animation: 'orbFloat2 28s ease-in-out infinite'
        }} />

        {/* Dynamic Campaign Audit Scanning Laser Effect */}
        <div className="scan-laser" style={{
          position: 'absolute',
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(37, 99, 235, 0.45) 50%, transparent 100%)',
          boxShadow: '0 0 15px rgba(37, 99, 235, 0.6)',
          pointerEvents: 'none',
          zIndex: 1
        }} />

        {/* Glow platforms */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: 'radial-gradient(circle at 50% 25%, rgba(37, 99, 235, 0.08), transparent 45%)', pointerEvents: 'none', zIndex: 0 }} />

        {/* CSS book float & background animations */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes floatBook {
            0% { transform: rotateY(-25deg) rotateX(12deg) translateY(0px); }
            50% { transform: rotateY(-25deg) rotateX(12deg) translateY(-12px); }
            100% { transform: rotateY(-25deg) rotateX(12deg) translateY(0px); }
          }
          .floating-book { animation: floatBook 6s infinite ease-in-out; }

          /* Slowly moving background grid representing data flow and marketing traffic */
          @keyframes gridMove {
            0% { background-position: 0 0; }
            100% { background-position: 24px 24px; }
          }
          .moving-grid {
            animation: gridMove 40s linear infinite;
          }

          /* Floating dynamic gradient background orbs */
          @keyframes orbFloat1 {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(50px, -70px) scale(1.15); }
            66% { transform: translate(-30px, 40px) scale(0.92); }
            100% { transform: translate(0px, 0px) scale(1); }
          }
          @keyframes orbFloat2 {
            0% { transform: translate(0px, 0px) scale(1); }
            50% { transform: translate(-60px, 70px) scale(1.22); }
            100% { transform: translate(0px, 0px) scale(1); }
          }

          /* Auditing scan-line vertical movement representing the ad review concept */
          @keyframes scanLine {
            0% { top: -5%; opacity: 0; }
            10% { opacity: 0.85; }
            90% { opacity: 0.85; }
            100% { top: 105%; opacity: 0; }
          }
          .scan-laser {
            animation: scanLine 12s linear infinite;
          }

          .insta-btn-glow {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
          }
          .insta-btn-glow:hover {
            transform: scale(1.05) translateY(-1px) !important;
            box-shadow: 0 6px 18px rgba(220, 39, 67, 0.45) !important;
            filter: brightness(1.1);
          }
        `}} />

        {/* NAVBAR (Badge and Lang Switcher strictly on the top-right) */}
        <div style={{ maxWidth: '1200px', margin: '0 auto 40px auto', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', position: 'relative', zIndex: 10 }}>
          <Space size={16}>
            <Badge status="error" text={<span style={{ color: '#ef4444', fontWeight: 700, fontSize: '11px', letterSpacing: '1px', fontFamily: safeFont }}>{t.heroTag}</span>} style={{ background: 'rgba(239, 68, 68, 0.08)', padding: '6px 16px', borderRadius: '4px', border: '1px solid rgba(239, 68, 68, 0.15)' }} />
            <Button type="text" size="small" icon={<GlobalOutlined style={{ color: '#2563eb' }} />} onClick={() => setLang(lang === 'PT' ? 'EN' : 'PT')} style={{ color: '#0f172a', fontWeight: 700, fontSize: '13px', fontFamily: safeFont, background: 'rgba(37, 99, 235, 0.08)', borderRadius: '50px', padding: '4px 12px', height: 'auto', border: 'none' }}>
              {lang === 'PT' ? 'EN' : 'PT'}
            </Button>
          </Space>
        </div>

        {/* BODY HERO */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 5 }}>
          <Row gutter={[40, 40]} align="middle">
            
            {/* COLUNA ESQUERDA - LOGOTIPO GRANDE, TEXTO E STORYTELLING */}
            <Col xs={24} lg={13}>
              {/* Enlarge and Realign Logo Left Above the Headline */}
              <div style={{ cursor: "pointer", marginBottom: '32px', textAlign: 'left' }} onClick={() => window.location.href = "/"}>
                <img src="https://i.imgur.com/EpDGrzT.png" alt="Digitalent26" style={{ height: 'clamp(90px, 12vw, 130px)', width: 'auto', display: 'block', maxWidth: '100%' }} />
              </div>

              <Title level={1} style={{ color: '#0f172a', fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 900, lineHeight: '1.15', letterSpacing: '-1.5px', marginBottom: '20px', fontFamily: safeFont }}>
                {lang === 'PT' ? (
                  <>A vantagem invisível que está a redefinir o <span style={{ color: '#2563eb' }}>marketing</span> em 2026.</>
                ) : (
                  <>The invisible advantage reshaping <span style={{ color: '#2563eb' }}>marketing</span> in 2026.</>
                )}
              </Title>
              <Paragraph style={{ color: '#475569', fontSize: '16px', lineHeight: '1.6', marginBottom: '28px', fontFamily: safeFont }}>
                {t.heroSub}
              </Paragraph>

              <Space direction="vertical" size={14} style={{ width: '100%', marginBottom: '32px' }}>
                <Space align="start"><CheckCircleOutlined style={{ color: '#2563eb', marginTop: '3px' }} /> <Text style={{ color: '#1e293b', fontFamily: safeFont }}>{t.bullet1}</Text></Space>
                <Space align="start">
                  <CheckCircleOutlined style={{ color: '#2563eb', marginTop: '3px' }} />
                  {lang === 'PT' ? (
                    <span style={{ display: 'inline-flex', alignItems: 'center', flexWrap: 'wrap', gap: '6px', lineHeight: '1.4' }}>
                      <Text style={{ color: '#1e293b', fontWeight: 600, fontFamily: safeFont }}>
                        Garanta Credencial Digital Conectada ao
                      </Text>
                      <Button 
                        type="primary" 
                        size="small" 
                        icon={<InstagramOutlined />} 
                        href="https://www.instagram.com/digitalent26/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ 
                          background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)', 
                          border: 'none', 
                          borderRadius: '6px', 
                          fontWeight: 700, 
                          fontFamily: safeFont, 
                          fontSize: '12px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          padding: '4px 10px',
                          height: '26px',
                          boxShadow: '0 4px 12px rgba(220, 39, 67, 0.25)'
                        }}
                        className="insta-btn-glow"
                      >
                        Instagram
                      </Button>
                    </span>
                  ) : (
                    <Text style={{ color: '#1e293b', fontWeight: 600, fontFamily: safeFont }}>{t.bullet2}</Text>
                  )}
                </Space>
              </Space>

              {/* CARD INTERNO - RAIO X DOS ANÚNCIOS */}
              <Card style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px' }} styles={{ body: { padding: '24px' } }}>
                <Space style={{ marginBottom: '8px' }}><span style={{ color: '#2563eb', fontWeight: 800, fontSize: '11px', letterSpacing: '1px', fontFamily: safeFont }}>DOSSIÊ ANTIDESPERDÍCIO DE CAPITAL</span></Space>
                <Title level={3} style={{ color: '#0f172a', fontSize: '20px', fontWeight: 800, marginTop: 0, marginBottom: '12px', fontFamily: safeFont }}>{t.dossierTitle}</Title>
                <Paragraph style={{ color: '#475569', fontSize: '14px', lineHeight: '1.6', marginBottom: '20px', fontFamily: safeFont }}>{t.dossierText}</Paragraph>
                <Row gutter={[12, 12]} style={{ textAlign: 'center' }}>
                  {[t.benefit1, t.benefit2, t.benefit3, t.benefit4].map((b, i) => (
                    <Col xs={12} sm={6} key={i}>
                      <div style={{ background: 'rgba(37, 99, 235, 0.04)', border: '1px solid rgba(37, 99, 235, 0.1)', padding: '12px 6px', borderRadius: '8px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: '#475569', fontSize: '11px', fontWeight: 600, fontFamily: safeFont, display: 'block', lineHeight: '1.3' }}>{b}</Text>
                      </div>
                    </Col>
                  ))}
                </Row>
              </Card>
            </Col>

            {/* COLUNA DIREITA - LIVRO MOCKUP E FORMULÁRIO DE INSCRIÇÃO */}
            <Col xs={24} lg={11} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              
              {/* Premium 3D Mockup Book */}
              <div style={{ position: 'relative', width: '250px', height: '310px', marginBottom: '40px', perspective: '1000px' }}>
                <div style={{ position: 'absolute', bottom: '-15px', left: '10%', width: '80%', height: '35px', background: 'radial-gradient(ellipse, rgba(37, 99, 235, 0.3) 0%, transparent 70%)', borderRadius: '50%', zIndex: 0 }} />
                
                <div className="floating-book" style={{ width: '100%', height: '100%', position: 'relative', transform: 'rotateY(-25deg) rotateX(12deg)', transformStyle: 'preserve-3d', zIndex: 1 }}>
                  {/* Spine */}
                  <div style={{ position: 'absolute', width: '22px', height: '100%', background: 'linear-gradient(90deg, #090e1f 0%, #1e3a8a 50%, #090e1f 100%)', transform: 'rotateY(-90deg) translateZ(11px)', transformOrigin: 'left center', borderLeft: '1px solid rgba(255,255,255,0.1)', borderRadius: '2px 0 0 2px' }} />
                  
                  {/* Cover */}
                  <div style={{ position: 'absolute', width: '100%', height: '100%', background: 'linear-gradient(135deg, #080f27 0%, #0b1329 100%)', transform: 'translateZ(11px)', borderRadius: '0 8px 8px 0', border: '1px solid rgba(37, 99, 235, 0.35)', boxShadow: 'inset 0 0 25px rgba(37, 99, 235, 0.25), 15px 15px 35px rgba(0,0,0,0.6)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', boxSizing: 'border-box' }}>
                    <div style={{ border: '1px dashed rgba(37, 99, 235, 0.3)', width: '100%', height: '100%', borderRadius: '6px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '16px', boxSizing: 'border-box' }}>
                      <Text style={{ fontSize: '9px', fontWeight: 800, color: '#3b82f6', letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '14px', fontFamily: safeFont }}>DOSSIÊ</Text>
                      <Title level={4} style={{ color: '#ffffff', fontWeight: 900, textAlign: 'center', fontSize: '15px', margin: '0 0 20px 0', letterSpacing: '0.5px', lineHeight: '1.4', fontFamily: safeFont }}>ANTIDESPERDÍCIO<br/>DE CAPITAL</Title>
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(37, 99, 235, 0.08)', border: '1px solid rgba(37, 99, 235, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 15px rgba(37, 99, 235, 0.25)' }}>
                        <LockOutlined style={{ color: '#3b82f6', fontSize: '16px' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* FORMULÁRIO GERAL DE ACESSO */}
              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '32px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.04)', width: '100%', maxWidth: '460px' }}>
                <Title level={4} style={{ color: '#0f172a', textAlign: 'center', marginBottom: '2px', fontWeight: 800, fontSize: '20px', letterSpacing: '0.5px', fontFamily: safeFont }}>{t.formHeader}</Title>
                <Title level={5} style={{ color: '#2563eb', textAlign: 'center', marginTop: 0, marginBottom: '14px', fontSize: '13px', fontWeight: 700, fontFamily: safeFont }}>{t.formSub}</Title>
                <Paragraph style={{ color: '#475569', textAlign: 'center', fontSize: '13px', marginBottom: '24px', fontFamily: safeFont }}>{t.formDesc}</Paragraph>

                <div>
                  <Form form={form} layout="vertical" onFinish={handleSubmit} requiredMark={false}>
                    <Form.Item name="name" rules={[{ required: true, message: 'Insira o seu nome.' }]}>
                      <Input prefix={<UserOutlined style={{ color: '#64748b' }} />} placeholder="Nome do Proprietário / Diretor" style={{ background: '#ffffff', border: '1px solid #cbd5e1', color: '#0f172a', height: '44px', borderRadius: '8px' }} />
                    </Form.Item>
                    <Form.Item name="email" rules={[{ required: true, type: 'email', message: 'Insira o e-mail.' }]}>
                      <Input prefix={<MailOutlined style={{ color: '#64748b' }} />} placeholder="E-mail de Contacto Direto" style={{ background: '#ffffff', border: '1px solid #cbd5e1', color: '#0f172a', height: '44px', borderRadius: '8px' }} />
                    </Form.Item>
                    <Form.Item name="phone" rules={[{ required: true, message: 'Insira o telemóvel.' }]}>
                      <Input prefix={<PhoneOutlined style={{ color: '#64748b' }} />} placeholder="Telemóvel Corporativo (WhatsApp)" style={{ background: '#ffffff', border: '1px solid #cbd5e1', color: '#0f172a', height: '44px', borderRadius: '8px' }} />
                    </Form.Item>
                    
                    <Form.Item 
                      name="gdpr" 
                      valuePropName="checked" 
                      rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject(new Error("Este campo é obrigatório")) }]}
                      style={{ marginBottom: '16px', textAlign: 'center' }}
                    >
                      <Checkbox style={{ fontSize: '12px', color: '#475569', fontWeight: 500 }}>
                        Li e aceito a <a onClick={(e) => { e.preventDefault(); setGdprModalVisible(true); }} style={{ color: '#2563eb' }}>política de privacidade e proteção de dados (RGPD)</a>
                      </Checkbox>
                    </Form.Item>

                    <Form.Item style={{ marginBottom: 0, marginTop: '8px' }}>
                      <Button type="primary" htmlType="submit" size="large" loading={loading} block style={{ height: '50px', background: '#2563eb', borderColor: '#2563eb', borderRadius: '8px', fontWeight: 700, fontSize: '14px', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                        {t.btnSubmit} <ArrowRightOutlined />
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              </div>
            </Col>
          </Row>

          {/* CONTADOR DE DIAS INCORPORADO E CENTRALIZADO COM REGRA NO-WRAP CONTRA QUEBRA DA image_caefa2.png */}
          <div style={{ width: '100%', margin: '40px auto', textAlign: 'center' }}>
            <div style={{ background: 'rgba(37, 99, 235, 0.04)', border: '1px solid rgba(37, 99, 235, 0.2)', borderRadius: '50px', padding: '12px 32px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '20px', flexWrap: 'nowrap', boxShadow: '0 2px 8px rgba(37, 99, 235, 0.03)' }}>
              <Text strong style={{ color: '#2563eb', fontSize: '13px', letterSpacing: '1.5px', whiteSpace: 'nowrap', fontFamily: safeFont }}>
                {t.dateLabel}
              </Text>
              <div style={{ width: '1px', height: '20px', background: 'rgba(37, 99, 235, 0.2)' }}></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}>
                <span style={{ color: '#2563eb', fontSize: '20px', fontWeight: 500, fontFamily: safeFont }}>{t.preDays}</span>
                <span style={{ color: '#2563eb', fontSize: '36px', fontWeight: 700, lineHeight: '1', fontFamily: safeFont, position: 'relative', top: '-1px' }}>{daysRemaining}</span>
                <span style={{ color: '#2563eb', fontSize: '20px', fontWeight: 500, fontFamily: safeFont }}>{t.postDays}</span>
              </div>
            </div>
          </div>

        </div>

        {/* GDPR Privacy Modal */}
        <Modal
          title={<span>🔒 {lang === 'PT' ? 'Privacidade, Proteção de Dados e Direito de Imagem' : 'Privacy, Data Protection and Image Rights'}</span>}
          open={gdprModalVisible}
          onCancel={() => setGdprModalVisible(false)}
          footer={[
            <Button key="close" type="primary" onClick={() => setGdprModalVisible(false)} style={{ background: "#2563eb", borderColor: "#2563eb" }}>
              {lang === 'PT' ? 'Fechar' : 'Close'}
            </Button>
          ]}
          centered
          width={600}
        >
          {lang === 'PT' ? (
            <div style={{ fontSize: '14px', color: '#475569', lineHeight: '1.6', fontFamily: safeFont }}>
              <p>Na Digitalent, levamos a sua privacidade a sério. Os dados pessoais que nos são fornecidos são utilizados exclusivamente para gerir a sua inscrição ou proposta de parceria, bem como para comunicar consigo de forma relevante.</p>
              <p>Os seus dados são tratados de forma segura, transparente e em conformidade com o RGPD e a legislação portuguesa em vigor.</p>
              <ul style={{ listStyleType: 'none', paddingLeft: 0, marginBottom: '24px' }}>
                <li>✓ Utilizamos os seus dados apenas para as finalidades indicadas</li>
                <li>✓ Não partilhamos informação sem fundamento legal</li>
                <li>✓ Garantimos os seus direitos de acesso, retificação e eliminação</li>
              </ul>

              <p style={{ fontWeight: 600, fontSize: '15px', color: '#0f172a', marginBottom: '8px' }}>📸 Captação e Utilização de Imagem</p>
              <p>Informamos que, no âmbito do evento, poderão ser captadas imagens (fotografias e vídeo) para fins de comunicação e divulgação nas nossas plataformas, nomeadamente redes sociais, website e materiais promocionais da Digitalent.</p>
              <p>Ao participar no evento, autoriza a recolha e utilização da sua imagem para estes fins, podendo a qualquer momento retirar o seu consentimento.</p>
              <p>Poderá, a qualquer momento, solicitar a alteração, remoção dos seus dados ou revogar a autorização de utilização de imagem através de:<br/>
              <span style={{ fontWeight: 600, color: '#0f172a' }}>📧 privacidade@digitalent.pt</span></p>

            </div>
          ) : (
            <div style={{ fontSize: '14px', color: '#475569', lineHeight: '1.6', fontFamily: safeFont }}>
              <p>At Digitalent, we take your privacy seriously. The personal data provided to us is used exclusively to manage your registration or partnership proposal, as well as to communicate with you in a relevant way.</p>
              <p>Your data is treated securely, transparently, and in compliance with the GDPR and current Portuguese legislation.</p>
              <ul style={{ listStyleType: 'none', paddingLeft: 0, marginBottom: '24px' }}>
                <li>✓ We use your data only for the indicated purposes</li>
                <li>✓ We do not share information without a legal basis</li>
                <li>✓ We guarantee your rights of access, rectification, and deletion</li>
              </ul>

              <p style={{ fontWeight: 600, fontSize: '15px', color: '#0f172a', marginBottom: '8px' }}>📸 Image Capture and Use</p>
              <p>Please note that during the event, images (photographs and video) may be captured for communication and dissemination purposes on our platforms, namely social networks, website, and promotional materials of Digitalent.</p>
              <p>By participating in the event, you authorize the collection and use of your image for these purposes, and you can withdraw your consent at any time.</p>
              <p>You may, at any time, request the modification or removal of your data or revoke the authorization for image use via:<br/>
              <span style={{ fontWeight: 600, color: '#0f172a' }}>📧 privacidade@digitalent.pt</span></p>

            </div>
          )}
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
              border: "1px solid #e2e8f0"
            }
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ width: "72px", height: "72px", background: "rgba(34, 197, 94, 0.1)", borderRadius: "50%", display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "center", marginBottom: "24px", border: "2px solid rgba(34, 197, 94, 0.3)" }}>
              <CheckCircleOutlined style={{ fontSize: "36px", color: "#22c55e" }} />
            </div>
            
            <Title level={2} style={{ color: "#0f172a", fontWeight: 900, fontSize: "24px", marginBottom: "12px", letterSpacing: "-0.01em", fontFamily: safeFont }}>
              {t.submitSuccess}
            </Title>
            
            <Paragraph style={{ color: "#475569", fontSize: "15px", lineHeight: 1.6, marginBottom: "32px", fontFamily: safeFont }}>
              {t.submitSuccessDesc}
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
                fontFamily: safeFont
              }}
            >
              {t.backHomeBtn}
            </Button>
          </div>
        </Modal>

      </div>
    </ConfigProvider>
  );
}
