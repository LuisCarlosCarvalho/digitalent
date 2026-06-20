import React, { useState } from 'react';
import { Form, Input, Button, Row, Col, Typography, message, Checkbox, Modal, Select } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const ParticipantRegistration: React.FC = () => {
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
      badge: 'INSCRIÇÃO',
      title: 'Participante',
      subtitle: 'Acesso total às palestras, networking e recursos exclusivos do evento.',
      fullName: 'Nome Completo',
      fullNamePlaceholder: 'Ex: João Silva',
      phoneNumber: 'Telemóvel (Opcional)',
      phoneNumberPlaceholder: '912 345 678',
      emailAddress: 'E-mail',
      emailPlaceholder: 'joao@empresa.pt',
      companyName: 'Nome da Empresa / Ramo (Opcional)',
      companyPlaceholder: 'Ex: Café Central / Restauração',
      submit: 'INSCREVA-SE AGORA',
      success: 'Inscrição submetida com sucesso!',
      error: 'Ocorreu um erro ao submeter a inscrição.',
      category: 'Categoria de Participante',
      categoryPlaceholder: 'Selecione a sua categoria',
      categoryStudent: 'Estudante',
      categoryCompany: 'Empresa / Ouvinte',
      privacyFooter: 'Ao inscrever-se, concorda com a nossa Politica de Privacidade',
      validationRequired: 'Este campo é obrigatório.',
      perks: [
        'Acesso total ao event',
        'Coffee-break',
        "Kit Digitalent'26",
        'Rede de networking'
      ]
    },
    EN: {
      badge: 'REGISTRATION',
      title: 'Attendee',
      subtitle: 'Full access to lectures, networking, and exclusive event resources.',
      fullName: 'Full Name',
      fullNamePlaceholder: 'Ex: John Smith',
      phoneNumber: 'Phone (Optional)',
      phoneNumberPlaceholder: '912 345 678',
      emailAddress: 'E-mail',
      emailPlaceholder: 'john@company.com',
      companyName: 'Company Name / Industry (Optional)',
      companyPlaceholder: 'Ex: Central Cafe / Food',
      submit: 'Submit Registration',
      success: 'Registration submitted successfully!',
      error: 'An error occurred while submitting.',
      category: 'Participant Category',
      categoryPlaceholder: 'Select your category',
      categoryStudent: 'Student',
      categoryCompany: 'Company / Regular Attendee',
      privacyFooter: 'By registering, you agree to our Privacy Policy',
      validationRequired: 'This field is required.',
      perks: [
        'Full access to the event',
        'Coffee-break',
        "Digitalent'26 Kit",
        'Networking'
      ]
    }
  };

  const t = content[lang];

  const onFinish = async (values: any) => {

    setLoading(true);
    
    try {
      const response = await fetch('/api/participants/register', {
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
    primary: '#1d4ed8', // A slightly stronger blue for the border/button
    text: '#0f172a',
    textMuted: '#475569',
    border: '#e2e8f0',
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
  };

  return (
    <div style={{ backgroundColor: dossierTheme.background, minHeight: '100vh', padding: '60px 20px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: dossierTheme.fontFamily }}>
      
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

      <div style={{ maxWidth: '700px', width: '100%', backgroundColor: dossierTheme.cardBg, borderRadius: '24px', padding: '40px 40px', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)', position: 'relative' }}>
        
        {/* Language Toggle */}
        <div style={{ position: 'absolute', top: '24px', right: '24px' }}>
          <Button 
            type="text" 
            icon={<GlobalOutlined />} 
            onClick={toggleLang}
            style={{ color: dossierTheme.textMuted }}
          >
            {lang === 'PT' ? 'EN' : 'PT'}
          </Button>
        </div>

        {/* Header section */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ 
            display: 'inline-block', 
            backgroundColor: dossierTheme.primary, 
            color: '#fff', 
            padding: '6px 24px', 
            borderRadius: '20px', 
            fontWeight: 600, 
            fontSize: '14px',
            marginBottom: '16px',
            letterSpacing: '0.5px'
          }}>
            {t.badge}
          </div>
          <Title level={2} style={{ color: dossierTheme.text, margin: '0 0 8px 0', fontWeight: 800 }}>
            {t.title}
          </Title>
          <Paragraph style={{ color: dossierTheme.textMuted, fontSize: '15px' }}>
            {t.subtitle}
          </Paragraph>
        </div>

        {/* Form Container (Blue bordered box) */}
        <div>
          <div style={{ 
            border: `2px solid ${dossierTheme.primary}`, 
            borderRadius: '16px', 
            padding: '32px',
            position: 'relative'
          }}>
            
            {/* Top decorative notch */}
            <div style={{
              position: 'absolute',
              top: '-10px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '40px',
              height: '20px',
              backgroundColor: dossierTheme.cardBg,
              borderBottomLeftRadius: '20px',
              borderBottomRightRadius: '20px',
              borderBottom: `2px solid ${dossierTheme.primary}`,
              borderLeft: `2px solid ${dossierTheme.primary}`,
              borderRight: `2px solid ${dossierTheme.primary}`,
              borderTop: `2px solid ${dossierTheme.cardBg}`,
              zIndex: 1
            }}></div>

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
                    name="fullName"
                    label={<span style={{ color: dossierTheme.text, fontWeight: 600 }}><span style={{color: 'red'}}>*</span> {t.fullName}</span>}
                    rules={[{ required: true, message: t.validationRequired }]}
                  >
                    <Input size="large" placeholder={t.fullNamePlaceholder} style={{ borderRadius: '8px' }} />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="phoneNumber"
                    label={<span style={{ color: dossierTheme.text, fontWeight: 600 }}>{t.phoneNumber}</span>}
                  >
                    <Input size="large" placeholder={t.phoneNumberPlaceholder} style={{ borderRadius: '8px' }} />
                  </Form.Item>
                </Col>

                <Col xs={24}>
                  <Form.Item
                    name="emailAddress"
                    label={<span style={{ color: dossierTheme.text, fontWeight: 600 }}><span style={{color: 'red'}}>*</span> {t.emailAddress}</span>}
                    rules={[{ required: true, type: 'email', message: t.validationRequired }]}
                  >
                    <Input size="large" placeholder={t.emailPlaceholder} style={{ borderRadius: '8px' }} />
                  </Form.Item>
                </Col>

                <Col xs={24}>
                  <Form.Item
                    name="category"
                    label={<span style={{ color: dossierTheme.text, fontWeight: 600 }}><span style={{color: 'red'}}>*</span> {t.category}</span>}
                    rules={[{ required: true, message: t.validationRequired }]}
                  >
                    <Select size="large" placeholder={t.categoryPlaceholder} style={{ borderRadius: '8px' }}>
                      <Select.Option value="Estudante">{t.categoryStudent}</Select.Option>
                      <Select.Option value="Empresa">{t.categoryCompany}</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col xs={24}>
                  <Form.Item
                    name="companyName"
                    label={<span style={{ color: dossierTheme.text, fontWeight: 600 }}>{t.companyName}</span>}
                  >
                    <Input size="large" placeholder={t.companyPlaceholder} style={{ borderRadius: '8px' }} />
                  </Form.Item>
                </Col>

                <Col xs={24}>
                  <Form.Item 
                    name="gdpr" 
                    valuePropName="checked" 
                    rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject(new Error(t.validationRequired)) }]}
                    style={{ marginBottom: '16px', textAlign: 'center' }}
                  >
                    <Checkbox style={{ fontSize: '12px', color: dossierTheme.textMuted, fontWeight: 500 }}>
                      Li e aceito a <a onClick={(e) => { e.preventDefault(); setIsPrivacyModalVisible(true); }} style={{ color: dossierTheme.primary }}>política de privacidade e proteção de dados (RGPD)</a>
                    </Checkbox>
                  </Form.Item>
                </Col>

                <Col xs={24}>
                  <Form.Item style={{ margin: '0 0 24px 0' }}>
                    <Button 
                      type="primary" 
                      htmlType="submit" 
                      size="large" 
                      block 
                      loading={loading}
                      style={{ backgroundColor: dossierTheme.primary, borderRadius: '100px', height: '48px', fontSize: '16px', fontWeight: 600 }}
                    >
                      {t.submit}
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>

            {/* Bottom Info Section */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '16px' }}>
              <div style={{ fontSize: '13px', color: dossierTheme.primary, fontWeight: 500, lineHeight: '1.8' }}>
                {t.perks.map((perk, idx) => (
                  <div key={idx}>&gt; {perk}</div>
                ))}
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {/* Simulated Barcode */}
                <svg width="80" height="30" viewBox="0 0 100 30" fill="black" xmlns="http://www.w3.org/2000/svg">
                  <rect x="0" width="3" height="30"/>
                  <rect x="5" width="2" height="30"/>
                  <rect x="9" width="4" height="30"/>
                  <rect x="15" width="2" height="30"/>
                  <rect x="19" width="1" height="30"/>
                  <rect x="22" width="5" height="30"/>
                  <rect x="29" width="2" height="30"/>
                  <rect x="33" width="3" height="30"/>
                  <rect x="38" width="1" height="30"/>
                  <rect x="41" width="4" height="30"/>
                  <rect x="47" width="2" height="30"/>
                  <rect x="51" width="3" height="30"/>
                  <rect x="56" width="1" height="30"/>
                  <rect x="59" width="4" height="30"/>
                  <rect x="65" width="2" height="30"/>
                  <rect x="69" width="3" height="30"/>
                  <rect x="74" width="2" height="30"/>
                  <rect x="78" width="4" height="30"/>
                  <rect x="84" width="1" height="30"/>
                  <rect x="87" width="3" height="30"/>
                  <rect x="92" width="2" height="30"/>
                  <rect x="96" width="4" height="30"/>
                </svg>
                <div style={{ writingMode: 'vertical-rl', fontSize: '10px', color: '#94a3b8', marginLeft: '6px', transform: 'rotate(180deg)' }}>
                  Digitalent'26
                </div>
              </div>
            </div>



          </div>
        </div>

      </div>
    </div>
  );
};

export default ParticipantRegistration;
