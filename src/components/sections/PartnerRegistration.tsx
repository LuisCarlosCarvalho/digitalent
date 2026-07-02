import React, { useState } from 'react';
import { Form, Input, Button, Row, Col, Typography, message, Checkbox, Modal } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const PartnerRegistration: React.FC = () => {
  const [form] = Form.useForm();
  const [lang, setLang] = useState<'PT' | 'EN'>('PT');
  const [loading, setLoading] = useState(false);
  
  // Privacy Modal State
  const [isPrivacyModalVisible, setIsPrivacyModalVisible] = useState(false);
  const [gdprChecked, setGdprChecked] = useState(false);
  const [hasConsented, setHasConsented] = useState(false);
  const [formValuesToSubmit, setFormValuesToSubmit] = useState<any>(null);

  const toggleLang = () => setLang(lang === 'PT' ? 'EN' : 'PT');

  const content = {
    PT: {
      headerLabel: 'Escolha a sua forma de participar na transformação digital de Rio Meão.',
      title: 'Candidatura a Parceiro',
      subtitle: 'Posicione a sua marca diante de empresas e lidere o mercado.',
      companyName: 'Nome da Empresa',
      companyPlaceholder: 'Empresa S.A.',
      contactName: 'Nome do Responsável',
      contactPlaceholder: 'Nome Completo',
      emailAddress: 'E-mail de Contacto',
      emailPlaceholder: 'email@empresa.pt',
      phoneNumber: 'Telemóvel (Opcional)',
      phoneNumberPlaceholder: '9xx xxx xxx',
      objectives: 'Objetivos no Evento',
      objectivesPlaceholder: 'Conte-nos brevemente o que espera alcançar com esta parceria...',
      submit: 'INSCREVA-SE AGORA',
      success: 'Candidatura submetida com sucesso!',
      error: 'Ocorreu um erro ao submeter a candidatura.',
      validationRequired: 'Este campo é obrigatório',
    },
    EN: {
      headerLabel: 'Choose your way to participate in the digital transformation of Rio Meão.',
      title: 'Partner Application',
      subtitle: 'Position your brand in front of companies and lead the market.',
      companyName: 'Company Name',
      companyPlaceholder: 'Company INC',
      contactName: 'Contact Name',
      contactPlaceholder: 'Full Name',
      emailAddress: 'Contact E-mail',
      emailPlaceholder: 'email@company.com',
      phoneNumber: 'Phone (Optional)',
      phoneNumberPlaceholder: '9xx xxx xxx',
      objectives: 'Event Objectives',
      objectivesPlaceholder: 'Briefly tell us what you hope to achieve with this partnership...',
      submit: 'Submit Partner Application',
      success: 'Application submitted successfully!',
      error: 'An error occurred while submitting.',
      validationRequired: 'This field is required',
    }
  };

  const t = content[lang];

  const onFinish = async (values: any) => {

    setLoading(true);
    
    try {
      const response = await fetch('/api/partners/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...values,
          dataProtectionConsent: true
        }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        message.success(t.success);
        form.resetFields();
      } else {
        message.error(data.error || t.error);
      }
    } catch (error) {
      console.error(error);
      message.error(t.error);
    } finally {
      setLoading(false);
    }
  };

  const dossierTheme = {
    background: '#f4f7fb',
    cardBg: '#ffffff',
    primary: '#1d4ed8', 
    text: '#0f172a',
    textMuted: '#475569',
    border: '#e2e8f0',
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
  };

  return (
    <div style={{ backgroundColor: dossierTheme.background, minHeight: '100vh', padding: '60px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: dossierTheme.fontFamily }}>
      
      {/* Privacy Modal */}
      <Modal
        title={<span>🔒 Privacidade, Proteção de Dados e Direito de Imagem</span>}
        open={isPrivacyModalVisible}
        onCancel={() => setIsPrivacyModalVisible(false)}
        maskClosable={false}
        centered
        width={600}
        footer={[
          <Button key="close" type="primary" onClick={() => setIsPrivacyModalVisible(false)} style={{ backgroundColor: dossierTheme.primary, borderColor: dossierTheme.primary }}>
            Fechar
          </Button>
        ]}
      >
        <div style={{ fontSize: '14px', color: '#475569', lineHeight: '1.6' }}>
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
      </Modal>

      {/* Main Container */}
      <div style={{ maxWidth: '800px', width: '100%', position: 'relative' }}>
        
        {/* Language Toggle */}
        <div style={{ position: 'absolute', top: '0px', right: '0px', zIndex: 10 }}>
          <Button 
            type="text" 
            icon={<GlobalOutlined />} 
            onClick={toggleLang}
            style={{ color: dossierTheme.textMuted }}
          >
            {lang === 'PT' ? 'EN' : 'PT'}
          </Button>
        </div>

        {/* Global Header Message */}
        <div style={{ textAlign: 'center', marginBottom: '40px', marginTop: '20px' }}>
          <span style={{ color: dossierTheme.text, fontSize: '16px', fontWeight: 500 }}>
            {t.headerLabel}
          </span>
        </div>

        {/* Form Card */}
        <div style={{ backgroundColor: dossierTheme.cardBg, borderRadius: '24px', padding: '48px', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <Title level={2} style={{ color: dossierTheme.text, margin: '0 0 8px 0', fontWeight: 700 }}>
              {t.title}
            </Title>
            <Paragraph style={{ color: dossierTheme.textMuted, fontSize: '14px' }}>
              {t.subtitle}
            </Paragraph>
          </div>

          <div>
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              requiredMark={false}
              style={{ fontFamily: dossierTheme.fontFamily }}
            >
              <Row gutter={24}>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="companyName"
                    label={<span style={{ color: dossierTheme.text, fontWeight: 600, fontSize: '13px' }}><span style={{color: 'red'}}>*</span> {t.companyName}</span>}
                    rules={[{ required: true, message: t.validationRequired }]}
                  >
                    <Input size="large" placeholder={t.companyPlaceholder} style={{ borderRadius: '8px' }} />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="contactName"
                    label={<span style={{ color: dossierTheme.text, fontWeight: 600, fontSize: '13px' }}><span style={{color: 'red'}}>*</span> {t.contactName}</span>}
                    rules={[{ required: true, message: t.validationRequired }]}
                  >
                    <Input size="large" placeholder={t.contactPlaceholder} style={{ borderRadius: '8px' }} />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    name="emailAddress"
                    label={<span style={{ color: dossierTheme.text, fontWeight: 600, fontSize: '13px' }}><span style={{color: 'red'}}>*</span> {t.emailAddress}</span>}
                    rules={[
                      { required: true, message: t.validationRequired },
                      { type: 'email', message: 'E-mail inválido.' }
                    ]}
                  >
                    <Input size="large" placeholder={t.emailPlaceholder} style={{ borderRadius: '8px' }} />
                  </Form.Item>
                </Col>

                {/* Honeypot field - Invisible to humans, catches bots */}
                <Col xs={24} style={{ display: 'none' }}>
                  <Form.Item name="_hp_website" label="Website">
                    <Input tabIndex={-1} autoComplete="off" />
                  </Form.Item>
                </Col>
                
                <Col xs={24} md={12}>
                  <Form.Item
                    name="phoneNumber"
                    label={<span style={{ color: dossierTheme.text, fontWeight: 600, fontSize: '13px' }}>{t.phoneNumber}</span>}
                  >
                    <Input size="large" placeholder={t.phoneNumberPlaceholder} style={{ borderRadius: '8px' }} />
                  </Form.Item>
                </Col>

                <Col xs={24}>
                  <Form.Item
                    name="objectives"
                    label={<span style={{ color: dossierTheme.text, fontWeight: 600, fontSize: '13px' }}>{t.objectives}</span>}
                  >
                    <Input.TextArea rows={4} size="large" placeholder={t.objectivesPlaceholder} style={{ borderRadius: '8px', resize: 'none' }} />
                  </Form.Item>
                </Col>

                <Col xs={24}>
                  <Form.Item 
                    name="gdpr" 
                    valuePropName="checked" 
                    rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject(new Error(t.validationRequired || "Este campo é obrigatório")) }]}
                    style={{ marginBottom: '16px', textAlign: 'center' }}
                  >
                    <Checkbox style={{ fontSize: '12px', color: dossierTheme.textMuted, fontWeight: 500 }}>
                      Li e aceito a <a onClick={(e) => { e.preventDefault(); setIsPrivacyModalVisible(true); }} style={{ color: dossierTheme.primary }}>política de privacidade e proteção de dados (RGPD)</a>
                    </Checkbox>
                  </Form.Item>
                </Col>

                <Col xs={24}>
                  <Form.Item style={{ margin: '0 0 0 0' }}>
                    <Button 
                      type="default" 
                      htmlType="submit" 
                      size="large" 
                      block 
                      loading={loading}
                      style={{ 
                        borderColor: dossierTheme.primary, 
                        color: dossierTheme.primary, 
                        borderRadius: '100px', 
                        height: '50px', 
                        fontSize: '15px', 
                        fontWeight: 600 
                      }}
                    >
                      {t.submit}
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PartnerRegistration;
