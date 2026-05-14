import React from 'react';
import { Typography, Space, Button, Grid } from 'antd';
import { GoogleOutlined, CompassOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

const LocationSection: React.FC = () => {
  const screens = useBreakpoint();

  return (
    <section id="informacoes" style={{ padding: screens.xs ? '60px 5%' : '120px 5%', background: 'var(--bg-base)' }}>
      <div style={{ marginBottom: screens.xs ? '40px' : '60px', textAlign: 'center' }}>
        <Title level={2} style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: 'var(--text-main)' }}>Onde será o Digitalent 26</Title>
      </div>

      <div style={{
        position: 'relative',
        width: '100%',
        minHeight: '500px',
        borderRadius: '24px',
        overflow: 'hidden',
        background: '#0B1120', 
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        display: 'flex',
        flexDirection: screens.md ? 'row' : 'column',
        padding: screens.xs ? '30px' : '50px'
      }}>
        {/* Background Map Simulation */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          opacity: 0.15,
          backgroundImage: `
            linear-gradient(to right, #475569 1px, transparent 1px),
            linear-gradient(to bottom, #475569 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          zIndex: 1
        }} />

        {/* Gradient Overlay */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.4) 0%, rgba(11, 17, 32, 0.9) 60%)',
          zIndex: 2
        }} />

        {/* Left Content (Logo & Address) */}
        <div style={{ position: 'relative', zIndex: 3, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ 
            background: '#ffffff', 
            padding: '16px', 
            borderRadius: '16px', 
            width: 'fit-content', 
            marginBottom: '20px' 
          }}>
            <img 
              src="https://i.imgur.com/UgYNeIO.png" 
              alt="Digitalent26" 
              style={{ width: '200px' }} 
            />
          </div>
          <Text style={{ color: '#e2e8f0', fontSize: '1.1rem', maxWidth: '300px', fontWeight: 500 }}>
            Av. Santiago 68-88, Rio Meão - Auditório do IEFP
          </Text>
        </div>

        {/* Center Content (Map Pin & UI elements) */}
        <div style={{ position: 'relative', zIndex: 3, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '40px 0' }}>
          <div style={{
            width: '56px', height: '56px', 
            background: '#2563eb', 
            borderRadius: '50% 50% 50% 0', 
            transform: 'rotate(-45deg)',
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            boxShadow: '0 10px 25px rgba(37,99,235,0.6)',
            marginBottom: '40px'
          }}>
            <div style={{ width: '24px', height: '24px', background: '#fff', borderRadius: '50%', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)' }} />
          </div>

          <div style={{ background: '#ffffff', borderRadius: '30px', padding: '12px 24px', display: 'flex', gap: '14px', alignItems: 'center', marginBottom: '16px', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)' }}>
            <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#ef4444' }} />
            <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#f59e0b' }} />
            <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#10b981' }} />
            <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#3b82f6' }} />
            <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: '2px solid #64748b' }} />
          </div>
          
          <div style={{ background: '#ffffff', borderRadius: '30px', padding: '10px 24px', display: 'flex', gap: '16px', alignItems: 'center', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)' }}>
             <Text strong style={{ fontSize: '18px', color: '#64748b' }}>⠿</Text>
             <div style={{ background: '#e2e8f0', borderRadius: '12px', padding: '4px 12px' }}>
                <Text style={{ fontSize: '14px', fontWeight: 700, color: '#334155' }}>T</Text>
             </div>
          </div>
        </div>

        {/* Right Content (Sponsors & Buttons) */}
        <div style={{ position: 'relative', zIndex: 3, flex: 1, display: 'flex', flexDirection: 'column', alignItems: screens.md ? 'flex-end' : 'center', justifyContent: 'space-between' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px 40px', marginBottom: '40px', opacity: 0.85 }}>
            {['Google', 'CISCO', 'Letira', 'Salesforce', 'HubSpot', 'Stripe', 'Aluzenios'].map(brand => (
              <Text key={brand} style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 600, textAlign: 'right', letterSpacing: '0.5px' }}>{brand}</Text>
            ))}
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '20px',
            padding: '24px',
            width: '100%',
            maxWidth: '320px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
          }}>
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <Button 
                block 
                type="primary"
                icon={<GoogleOutlined />} 
                href="https://www.google.com/maps/search/?api=1&query=Av.+Santiago+68-88,+Rio+Meão+-+Auditório+do+IEFP" 
                target="_blank"
                style={{ height: '48px', borderRadius: '12px', fontSize: '1rem', fontWeight: 600, background: '#2563eb', border: 'none' }}
              >
                Abrir no Google Maps
              </Button>
              <Button 
                block 
                ghost
                icon={<CompassOutlined />} 
                href="https://waze.com/ul?q=Av.%20Santiago%2068-88,%20Rio%20Meão" 
                target="_blank"
                style={{ height: '48px', borderRadius: '12px', fontSize: '1rem', fontWeight: 600, borderColor: 'rgba(255,255,255,0.3)', color: '#fff' }}
              >
                Abrir no Waze
              </Button>
            </Space>
          </div>
        </div>

      </div>
    </section>
  );
};

export default LocationSection;
