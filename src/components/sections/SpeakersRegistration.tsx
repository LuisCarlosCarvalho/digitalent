import React, { useState } from 'react';
import { Form, Input, Button, Upload, Checkbox, Row, Col, Typography, message, Select, Modal } from 'antd';
import { InboxOutlined, GlobalOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';

const { Title, Paragraph } = Typography;

const SpeakersRegistration: React.FC = () => {
  const [form] = Form.useForm();
  const [lang, setLang] = useState<'PT' | 'EN'>('PT');
  const [loading, setLoading] = useState(false);
  const [isPrivacyModalVisible, setIsPrivacyModalVisible] = useState(false);
  const [gdprChecked, setGdprChecked] = useState(false);
  const [hasConsented, setHasConsented] = useState(false);
  const [formValuesToSubmit, setFormValuesToSubmit] = useState<any>(null);
  const [profilePhoto, setProfilePhoto] = useState<UploadFile[]>([]);
  const [companyLogo, setCompanyLogo] = useState<UploadFile[]>([]);

  const toggleLang = () => setLang(lang === 'PT' ? 'EN' : 'PT');

  const content = {
    PT: {
      title: 'Candidatura a Orador',
      subtitle: 'Partilhe a sua visão no palco principal do Digitalent26.',
      fullName: 'Nome Completo',
      professionalTitle: 'Título Profissional',
      companyName: 'Empresa',
      whatsappNumber: 'Número de WhatsApp/Telemóvel',
      emailAddress: 'Endereço de E-mail',
      speakerTopic: 'Tema/Tópico da Palestra',
      profilePhoto: 'Foto de Perfil Profissional',
      companyLogo: 'Logotipo da Empresa',
      observations: 'Observações Adicionais (Opcional)',
      uploadHint: 'Clique ou arraste o ficheiro para esta área',
      rgpd: 'Privacidade, Proteção de Dados e Direito de Imagem (Aceitar Termos)',
      submit: 'INSCREVA-SE AGORA',
      success: 'Candidatura submetida com sucesso!',
      error: 'Ocorreu um erro ao submeter a candidatura.',
      validationRequired: 'Este campo é obrigatório',
    },
    EN: {
      title: 'Speaker Application',
      subtitle: 'Share your vision on the main stage of Digitalent26.',
      fullName: 'Full Name',
      professionalTitle: 'Professional Title',
      companyName: 'Company Name',
      whatsappNumber: 'WhatsApp/Phone Number',
      emailAddress: 'Email Address',
      speakerTopic: 'Speaker Topic/Theme',
      profilePhoto: 'Professional Profile Photo',
      companyLogo: 'Company Logo',
      observations: 'Additional Observations (Optional)',
      uploadHint: 'Click or drag file to this area to upload',
      rgpd: 'Privacy, Data Protection and Image Rights (Accept Terms)',
      submit: 'Submit Application',
      success: 'Application submitted successfully!',
      error: 'An error occurred while submitting the application.',
      validationRequired: 'This field is required',
    }
  };

  const t = content[lang];



  const onFinish = async (values: any) => {

    setLoading(true);
    
    const formData = new FormData();
    formData.append('fullName', values.fullName);
    formData.append('professionalTitle', values.professionalTitle);
    formData.append('companyName', values.companyName);
    formData.append('whatsappNumber', values.whatsappNumber);
    formData.append('emailAddress', values.emailAddress);
    formData.append('speakerTopic', values.speakerTopic);
    formData.append('observations', values.observations || '');
    formData.append('dataProtectionConsent', values.dataProtectionConsent ? 'true' : 'false');

    if (profilePhoto.length > 0) {
      const file = (profilePhoto[0] as any).originFileObj || profilePhoto[0];
      formData.append('profilePhoto', file as Blob);
    }
    if (companyLogo.length > 0) {
      const file = (companyLogo[0] as any).originFileObj || companyLogo[0];
      formData.append('companyLogo', file as Blob);
    }

    try {
      const response = await fetch('/api/speakers/register', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok && data.success) {
        message.success(t.success);
        form.resetFields();
        setProfilePhoto([]);
        setCompanyLogo([]);
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
    background: '#f8fafc',
    cardBg: '#ffffff',
    primary: '#2563eb',
    text: '#0f172a',
    textMuted: '#475569',
    border: '#e2e8f0',
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
  };

  return (
    <Row style={{ minHeight: '100vh', backgroundColor: dossierTheme.cardBg, fontFamily: dossierTheme.fontFamily, margin: 0 }}>
      
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

      <Col xs={0} lg={10} xl={12} style={{ padding: 0 }}>
        <div style={{
          width: '100%',
          height: '100%',
          minHeight: '100vh',
          backgroundImage: `url('https://i.imgur.com/Cio252N.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'sticky',
          top: 0
        }} />
      </Col>

      <Col xs={24} lg={14} xl={12} style={{ display: 'flex', flexDirection: 'column', padding: '60px 40px', position: 'relative' }}>
        <div style={{ maxWidth: '700px', width: '100%', margin: '0 auto' }}>
        
        {/* Language Toggle */}
        <div style={{ position: 'absolute', top: '30px', right: '30px' }}>
          <Button 
            type="text" 
            icon={<GlobalOutlined />} 
            onClick={toggleLang}
            style={{ color: dossierTheme.textMuted, border: `1px solid ${dossierTheme.border}` }}
          >
            {lang === 'PT' ? 'EN' : 'PT'}
          </Button>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <img 
            src="https://i.imgur.com/Du80yJk.png" 
            alt="Digitalent26 Logo" 
            style={{ 
              maxWidth: '180px', 
              marginBottom: '24px', 
              filter: 'drop-shadow(0 0 15px rgba(37, 99, 235, 0.3))',
              display: 'block',
              margin: '0 auto 24px auto'
            }} 
          />
          <Title level={2} style={{ color: dossierTheme.text, margin: 0, fontWeight: 700 }}>
            {t.title}
          </Title>
          <Paragraph style={{ color: dossierTheme.primary, fontSize: '16px', marginTop: '8px' }}>
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
                name="fullName"
                label={<span style={{ color: dossierTheme.text }}>{t.fullName}</span>}
                rules={[{ required: true, message: t.validationRequired }]}
              >
                <Input size="large" style={{ backgroundColor: dossierTheme.background, color: dossierTheme.text, borderColor: dossierTheme.border }} />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="professionalTitle"
                label={<span style={{ color: dossierTheme.text }}>{t.professionalTitle}</span>}
                rules={[{ required: true, message: t.validationRequired }]}
              >
                <Input size="large" style={{ backgroundColor: dossierTheme.background, color: dossierTheme.text, borderColor: dossierTheme.border }} />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                name="companyName"
                label={<span style={{ color: dossierTheme.text }}>{t.companyName}</span>}
                rules={[{ required: true, message: t.validationRequired }]}
              >
                <Input size="large" style={{ backgroundColor: dossierTheme.background, color: dossierTheme.text, borderColor: dossierTheme.border }} />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="whatsappNumber"
                label={<span style={{ color: dossierTheme.text }}>{t.whatsappNumber}</span>}
                rules={[{ required: true, message: t.validationRequired }]}
              >
                <Input size="large" style={{ backgroundColor: dossierTheme.background, color: dossierTheme.text, borderColor: dossierTheme.border }} />
              </Form.Item>
            </Col>

            <Col xs={24}>
              <Form.Item
                name="emailAddress"
                label={<span style={{ color: dossierTheme.text }}>{t.emailAddress}</span>}
                rules={[{ required: true, type: 'email', message: t.validationRequired }]}
              >
                <Input size="large" style={{ backgroundColor: dossierTheme.background, color: dossierTheme.text, borderColor: dossierTheme.border }} />
              </Form.Item>
            </Col>

            {/* Honeypot field - Invisible to humans, catches bots */}
            <Col xs={24} style={{ display: 'none' }}>
              <Form.Item name="_hp_website" label="Website">
                <Input tabIndex={-1} autoComplete="off" />
              </Form.Item>
            </Col>

            <Col xs={24}>
              <Form.Item
                name="speakerTopic"
                label={<span style={{ color: dossierTheme.text }}>{t.speakerTopic}</span>}
                rules={[{ required: true, message: t.validationRequired }]}
              >
                <Select 
                  size="large" 
                  placeholder={lang === 'PT' ? "Selecione o tema pretendido" : "Select the intended theme"}
                  style={{ width: '100%' }}
                  popupStyle={{ backgroundColor: dossierTheme.cardBg, color: dossierTheme.text }}
                >
                  <Select.Option value="Estratégia Digital & Gestão de Marcas (09:50 - 10:20)">Estratégia Digital & Gestão de Marcas (09:50 - 10:20)</Select.Option>
                  <Select.Option value="Entre Dados e Decisões: A Nova Estrutura do Talento e do Desempenho no Digital (10:25 - 10:50)">Entre Dados e Decisões: A Nova Estrutura do Talento e do Desempenho no Digital (10:25 - 10:50)</Select.Option>
                  <Select.Option value="Redes Sociais e Marketing de Influência na Era da IA (11:20 - 11:50)">Redes Sociais e Marketing de Influência na Era da IA (11:20 - 11:50)</Select.Option>
                  <Select.Option value="Gestão de Inteligência Artificial na Era Digital (11:55 - 12:30)">Gestão de Inteligência Artificial na Era Digital (11:55 - 12:30)</Select.Option>
                  <Select.Option value="Personalização em Escala com IA (14:15 - 14:45)">Personalização em Escala com IA (14:15 - 14:45)</Select.Option>
                  <Select.Option value="SEO para Otimização na Inteligência Artificial (14:50 - 15:15)">SEO para Otimização na Inteligência Artificial (14:50 - 15:15)</Select.Option>
                  <Select.Option value="O Futuro da Criação de Conteúdo com IA (15:30 - 16:00)">O Futuro da Criação de Conteúdo com IA (15:30 - 16:00)</Select.Option>
                  <Select.Option value="Gestão da Transformação Digital na Perspetiva de Empreendedores (16:00 - 16:30)">Gestão da Transformação Digital na Perspetiva de Empreendedores (16:00 - 16:30)</Select.Option>
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item label={<span style={{ color: dossierTheme.text }}>{t.profilePhoto}</span>}>
                <Upload.Dragger
                  accept="image/*"
                  fileList={profilePhoto}
                  beforeUpload={(file) => {
                    setProfilePhoto([file]);
                    return false;
                  }}
                  onRemove={() => setProfilePhoto([])}
                  style={{ backgroundColor: dossierTheme.background, borderColor: dossierTheme.border }}
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined style={{ color: dossierTheme.primary }} />
                  </p>
                  <p className="ant-upload-text" style={{ color: dossierTheme.text }}>{t.uploadHint}</p>
                </Upload.Dragger>
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item label={<span style={{ color: dossierTheme.text }}>{t.companyLogo}</span>}>
                <Upload.Dragger
                  accept="image/*"
                  fileList={companyLogo}
                  beforeUpload={(file) => {
                    setCompanyLogo([file]);
                    return false;
                  }}
                  onRemove={() => setCompanyLogo([])}
                  style={{ backgroundColor: dossierTheme.background, borderColor: dossierTheme.border }}
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined style={{ color: dossierTheme.primary }} />
                  </p>
                  <p className="ant-upload-text" style={{ color: dossierTheme.text }}>{t.uploadHint}</p>
                </Upload.Dragger>
              </Form.Item>
            </Col>

            <Col xs={24}>
              <Form.Item
                name="observations"
                label={<span style={{ color: dossierTheme.text }}>{t.observations}</span>}
              >
                <Input.TextArea 
                  rows={4} 
                  size="large" 
                  placeholder={lang === 'PT' ? "Coloque aqui alguma informação adicional que ache relevante..." : "Place any additional relevant information here..."}
                  style={{ backgroundColor: dossierTheme.background, color: dossierTheme.text, borderColor: dossierTheme.border, resize: 'none' }} 
                />
              </Form.Item>
            </Col>

            <Col xs={24}>
              <Form.Item
                name="dataProtectionConsent"
                valuePropName="checked"
                rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject(new Error(t.validationRequired)) }]}
                style={{ marginTop: '16px', textAlign: 'center' }}
              >
                <Checkbox style={{ color: dossierTheme.textMuted, fontSize: "12px", fontWeight: 500 }}>
                  Li e aceito a <a onClick={(e) => { e.preventDefault(); setIsPrivacyModalVisible(true); }} style={{ color: dossierTheme.primary }}>política de privacidade e proteção de dados (RGPD)</a>
                </Checkbox>
              </Form.Item>
            </Col>

            <Col xs={24}>
              <Form.Item style={{ margin: 0 }}>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  size="large" 
                  block 
                  loading={loading}
                  style={{ backgroundColor: dossierTheme.primary, borderColor: dossierTheme.primary, height: '50px', fontSize: '16px', fontWeight: 600 }}
                >
                  {t.submit}
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        </div>
        </div>
      </Col>
    </Row>
  );
};

export default SpeakersRegistration;
