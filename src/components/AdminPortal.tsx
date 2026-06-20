import React, { useEffect, useState } from 'react';
import { Row, Col, Typography, Input, Button, Table, Tabs, message, Tag, Switch } from 'antd';
import { ReloadOutlined, PrinterOutlined } from '@ant-design/icons';
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

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token === 'admin-token-123') {
      setIsAuthenticated(true);
      fetchData();
    }
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
        localStorage.setItem('adminToken', data.token);
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

  const fetchData = async () => {
    try {
      const [usersRes, settingsRes] = await Promise.all([
        fetch('/api/admin/users'),
        fetch('/api/admin/settings')
      ]);
      const usersData = await usersRes.json();
      const settingsData = await settingsRes.json();

      if (usersData.success) {
        setParticipants(usersData.data.participants || []);
        setSpeakers(usersData.data.speakers || []);
      }
      if (settingsData.success) {
        setQaLink(settingsData.qaLink || '');
      }
    } catch (e) {
      console.error(e);
      message.error('Erro ao carregar dados.');
    }
  };

  const handleSaveSettings = async () => {
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
      const newStatus = checked ? 'Confirmado, kit entregue' : 'Confirmado, kit liberado';
      
      const res = await fetch('/api/admin/toggle-kit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: record.id, type, status: newStatus })
      });
      if (res.ok) {
        message.success('Status do kit atualizado!');
        fetchData(); // Recarrega os dados
      } else {
        message.error('Erro ao atualizar kit.');
      }
    } catch (e) {
      message.error('Erro de ligação ao servidor.');
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
    { title: 'Código Único', dataIndex: 'registrationCode', key: 'registrationCode', render: (text: string) => <Text code>{text}</Text> },
    { title: 'Status', dataIndex: 'status', key: 'status', render: (text: string) => {
        const isConfirmed = text.includes('Confirmado');
        return <Tag color={isConfirmed ? 'success' : 'warning'}>{text}</Tag>;
    }},
    { title: 'Kits', key: 'kit', render: (_: any, record: any) => (
      <Switch 
        checked={record.status.includes('entregue')}
        onChange={(checked) => handleToggleKit(record, checked)}
        checkedChildren="Entregue"
        unCheckedChildren="Pendente"
        disabled={!record.status.includes('Confirmado')}
      />
    )},
  ];

  const estudantes = participants.filter(p => p.category?.toLowerCase() === 'estudante');
  const empresas = participants.filter(p => p.category?.toLowerCase() === 'empresa' || p.category?.toLowerCase() === 'ouvinte');

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', padding: '40px 20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Row justify="space-between" align="middle" style={{ marginBottom: '24px' }} className="no-print">
          <Col>
            <Title level={2} style={{ margin: 0, color: '#0f172a' }}>Gestão de Check-in</Title>
          </Col>
          <Col>
            <Button icon={<ReloadOutlined />} onClick={fetchData} style={{ marginRight: '12px' }}>Atualizar</Button>
            <Button icon={<PrinterOutlined />} type="default" onClick={() => window.print()}>Imprimir Lista</Button>
            <Button type="text" onClick={() => { localStorage.removeItem('adminToken'); setIsAuthenticated(false); }} style={{ marginLeft: '12px', color: '#ef4444' }}>Sair</Button>
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
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab={`Ouvintes Estudantes (${estudantes.length})`} key="1">
              <Table dataSource={estudantes} columns={columns} rowKey="id" pagination={false} />
            </Tabs.TabPane>
            <Tabs.TabPane tab={`Ouvintes Empresas (${empresas.length})`} key="2">
              <Table dataSource={empresas} columns={columns} rowKey="id" pagination={false} />
            </Tabs.TabPane>
            <Tabs.TabPane tab={`Oradores (${speakers.length})`} key="3">
              <Table dataSource={speakers} columns={columns} rowKey="id" pagination={false} />
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
