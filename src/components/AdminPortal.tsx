import React, { useEffect, useState } from 'react';
import { Row, Col, Typography, Input, Button, Table, Tabs, message, Tag, Switch, Popconfirm } from 'antd';
import { ReloadOutlined, PrinterOutlined, QrcodeOutlined, MailOutlined } from '@ant-design/icons';
import '../index.css';

const { Title, Text } = Typography;

const AdminPortal: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [qaLink, setQaLink] = useState('');
  const [participants, setParticipants] = useState<any[]>([]);
  const [speakers, setSpeakers] = useState<any[]>([]);
  const [searchText, setSearchText] = useState('');
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [sendingEmails, setSendingEmails] = useState(false);

  useEffect(() => {
    // Attempt to load data on mount to verify session
    fetchData(true);
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (data.success) {
        setIsAuthenticated(true);
        message.success('Login efetuado com sucesso!');
        fetchData();
      } else {
        message.error('Credenciais inválidas.');
      }
    } catch (e) {
      message.error('Erro de ligação ao servidor.');
    }
    setLoading(false);
  };

  const fetchData = async (isInitialCheck = false) => {
    try {
      const [usersRes, settingsRes] = await Promise.all([
        fetch('/api/admin/users', { credentials: 'same-origin' }),
        fetch('/api/admin/settings', { credentials: 'same-origin' })
      ]);
      const usersData = await usersRes.json();
      const settingsData = await settingsRes.json();

      if (usersData.success) {
        setParticipants(usersData.data.participants || []);
        setSpeakers(usersData.data.speakers || []);
        setIsAuthenticated(true);
      } else if (isInitialCheck) {
        setIsAuthenticated(false);
      }
      if (settingsData.success) {
        setQaLink(settingsData.qaLink || '');
      }
    } catch (e) {
      console.error(e);
      if (!isInitialCheck) message.error('Erro ao carregar dados. Faça login novamente.');
    }
  };

  const handleSaveSettings = async () => {
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ qaLink })
      });
      if (res.ok) {
        message.success('Configuração guardada com sucesso!');
      } else {
        message.error('Erro ao guardar.');
      }
    } catch (e) {
      message.error('Erro de ligação ao servidor.');
    }
  };

  const handleToggleKit = async (record: any, checked: boolean) => {
    try {
      // Diferenciar entre orador e participante usando campo específico
      const type = record.professionalTitle !== undefined ? 'speaker' : 'participant'; 
      const newStatus = checked ? 'Confirmado, brinde entregue' : 'Confirmado, brinde liberado';
      
      const res = await fetch('/api/admin/toggle-kit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ id: record.id, type, status: newStatus })
      });
      if (res.ok) {
        message.success('Status do brinde atualizado!');
        fetchData(); // Recarrega os dados
      } else {
        message.error('Erro ao atualizar brinde.');
      }
    } catch (e) {
      message.error('Erro de ligação ao servidor.');
    }
  };

  const handleCheckin = async (code: string) => {
    try {
      const res = await fetch('/api/checkin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ code })
      });
      if (res.ok) {
        message.success('Inscrição confirmada com sucesso!');
        fetchData();
      } else {
        message.error('Erro ao confirmar inscrição.');
      }
    } catch (e) {
      message.error('Erro de ligação ao servidor.');
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      setIsAuthenticated(false);
      message.success('Sessão terminada.');
    } catch (e) {
      setIsAuthenticated(false);
    }
  };

  const handleSendEmails = async () => {
    if (selectedRowKeys.length === 0) {
      message.warning('Por favor, selecione pelo menos uma pessoa para enviar e-mail.');
      return;
    }
    setSendingEmails(true);
    try {
      const res = await fetch('/api/admin/send-reminders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emails: selectedRowKeys })
      });
      const data = await res.json();
      if (data.success) {
        message.success(`E-mails enviados com sucesso para ${selectedRowKeys.length} pessoas!`);
        setSelectedRowKeys([]); // Reset selection
      } else {
        message.error('Erro ao enviar e-mails: ' + data.error);
      }
    } catch (err) {
      message.error('Erro de ligação ao servidor.');
    } finally {
      setSendingEmails(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f8fafc' }}>
        <div style={{ background: '#fff', padding: '40px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
          <img src="https://i.imgur.com/EpDGrzT.png" alt="Digitalent26" style={{ width: '200px', marginBottom: '20px' }} />
          <Title level={4} style={{ marginBottom: '24px', color: '#0f172a' }}>Portal de Check-in</Title>
          <Input 
            placeholder="E-mail" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            style={{ marginBottom: '16px' }} 
            size="large"
          />
          <Input.Password 
            placeholder="Senha" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            style={{ marginBottom: '24px' }} 
            size="large"
            onPressEnter={handleLogin}
          />
          <Button type="primary" block size="large" onClick={handleLogin} loading={loading} style={{ background: '#2563eb' }}>
            Entrar
          </Button>
        </div>
      </div>
    );
  }

  const columns = [
    { title: 'Nome', dataIndex: 'fullName', key: 'fullName', render: (text: string) => <strong>{text}</strong> },
    { title: 'Email', dataIndex: 'emailAddress', key: 'emailAddress' },
    { title: 'Código Único', dataIndex: 'registrationCode', key: 'registrationCode', render: (text: string) => (
      <Popconfirm 
        title="Confirmar Inscrição?" 
        description="Tem a certeza que deseja confirmar a presença (check-in) deste participante?" 
        onConfirm={() => handleCheckin(text)} 
        okText="Sim" 
        cancelText="Não"
      >
        <Tag color="gold" style={{ cursor: 'pointer', fontSize: '14px', padding: '4px 8px' }}>{text}</Tag>
      </Popconfirm>
    )},
    { title: 'Status', dataIndex: 'status', key: 'status', render: (text: string) => {
        const isConfirmed = text.includes('Confirmado');
        return <Tag color={isConfirmed ? 'success' : 'warning'}>{text}</Tag>;
    }},
    { title: 'Brindes', key: 'brinde', render: (_: any, record: any) => (
      <Switch 
        checked={record.status.includes('entregue')}
        onChange={(checked) => handleToggleKit(record, checked)}
        checkedChildren="Entregue"
        unCheckedChildren="Pendente"
      />
    )},
  ];

  const filteredParticipants = participants.filter(p => 
    !searchText || p.registrationCode?.toLowerCase().includes(searchText.toLowerCase())
  );

  const filteredSpeakers = speakers.filter(p => 
    !searchText || p.registrationCode?.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', padding: '40px 20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Row justify="space-between" align="middle" style={{ marginBottom: '24px' }} className="no-print">
          <Col>
            <Title level={2} style={{ margin: 0, color: '#0f172a' }}>Gestão de Check-in</Title>
          </Col>
          <Col>
            <Button icon={<MailOutlined />} type="primary" onClick={handleSendEmails} loading={sendingEmails} style={{ marginRight: '12px', background: '#10b981' }}>Enviar E-mail</Button>
            <Button icon={<ReloadOutlined />} onClick={() => fetchData(false)} style={{ marginRight: '12px' }}>Atualizar</Button>
            <Button icon={<QrcodeOutlined />} type="primary" onClick={() => window.open('/api/admin/generate-qr-pdf', '_blank')} style={{ marginRight: '12px', background: '#2563eb' }}>Imprimir QR Codes</Button>
            <Button icon={<PrinterOutlined />} type="default" onClick={() => window.print()}>Imprimir Lista</Button>
            <Button type="text" onClick={handleLogout} style={{ marginLeft: '12px', color: '#ef4444' }}>Sair</Button>
          </Col>
        </Row>

        <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)', marginBottom: '24px' }} className="no-print">
          <Text strong>Link do Painel (Q&A):</Text>
          <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
            <Input 
              value={qaLink} 
              onChange={e => setQaLink(e.target.value)} 
              placeholder="ex: https://agentetalent.vercel.app/event/000/join" 
              size="large"
            />
            <Button type="primary" size="large" onClick={handleSaveSettings} style={{ background: '#2563eb' }}>Guardar</Button>
          </div>
        </div>

        <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
          <Tabs 
            defaultActiveKey="1"
            tabBarExtraContent={
              <Input.Search 
                placeholder="Procurar código (ex: H57K)..." 
                allowClear 
                onChange={e => setSearchText(e.target.value)}
                style={{ width: 250, marginBottom: 8 }}
              />
            }
          >
            <Tabs.TabPane tab={`Ouvintes / Empresas (${filteredParticipants.length})`} key="1">
              <Table 
                dataSource={filteredParticipants} 
                columns={columns} 
                rowKey="emailAddress" 
                pagination={false} 
                rowSelection={{
                  selectedRowKeys,
                  onChange: setSelectedRowKeys
                }}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab={`Oradores (${filteredSpeakers.length})`} key="2">
              <Table 
                dataSource={filteredSpeakers} 
                columns={columns} 
                rowKey="emailAddress" 
                pagination={false} 
                rowSelection={{
                  selectedRowKeys,
                  onChange: setSelectedRowKeys
                }}
              />
            </Tabs.TabPane>
          </Tabs>
        </div>
        
        {/* Print Only Title */}
        <div className="print-only" style={{ display: 'none' }}>
           <h1>Lista de Check-in - Digitalent'26</h1>
        </div>
      </div>
    </div>
  );
};

export default AdminPortal;
