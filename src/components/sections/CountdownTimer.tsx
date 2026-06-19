import { useState, useEffect } from 'react';
import { Row, Col, Typography, Button } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';

const { Text } = Typography;

export default function CountdownTimer() {
  const [language, setLanguage] = useState<'PT' | 'EN'>('PT');

  const getDaysRemaining = (): number => {
    // Target date in Portugal's West time zone: July 9, 2026 00:00:00
    const targetNormalized = new Date(2026, 6, 9, 0, 0, 0, 0).getTime(); // July is index 6
    
    // Live client current date
    const clientDate = new Date();
    const clientNormalized = new Date(
      clientDate.getFullYear(),
      clientDate.getMonth(),
      clientDate.getDate(),
      0, 0, 0, 0
    ).getTime();

    // Exact integer remaining days math
    const diffInMs = targetNormalized - clientNormalized;
    const daysRemaining = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
    
    return daysRemaining > 0 ? daysRemaining : 0;
  };

  const [days, setDays] = useState<number>(getDaysRemaining);

  useEffect(() => {
    setDays(getDaysRemaining());

    const interval = setInterval(() => {
      setDays(getDaysRemaining());
    }, 1000 * 60 * 60); // Clean hourly interval update

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ width: '100%', padding: '0 12px', margin: '24px auto', maxWidth: '1200px' }}>
      <Row justify="center" align="middle">
        <Col>
          <div
            style={{
              background: 'rgba(3, 7, 18, 0.65)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(37, 99, 235, 0.3)',
              borderRadius: '9999px',
              padding: '10px 24px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '16px',
              boxShadow: '0 0 35px rgba(37, 99, 235, 0.15), inset 0 0 15px rgba(37, 99, 235, 0.08)',
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {/* Unified Text Layout with Bulletproof Anti-Corruption Font Styling */}
            <Text
              strong
              style={{
                color: '#ffffffff',
                fontSize: '15px',
                letterSpacing: '2px',
                fontWeight: 700,
                textTransform: 'uppercase',
                fontFamily: "'Inter', sans-serif",
                whiteSpace: 'nowrap',
                display: 'inline-flex',
                alignItems: 'center',
              }}
            >
              {language === 'PT' ? (
                <span style={{ display: 'inline-flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                  <span style={{ whiteSpace: 'nowrap', fontFamily: "'Inter', sans-serif" }}>
                    09 DE JULHO 2026
                  </span>
                  <span style={{ color: 'rgba(253, 253, 253, 0.4)', margin: '0 8px', fontWeight: 300 }}>|</span>
                  <span style={{ whiteSpace: 'nowrap', fontFamily: "'Inter', sans-serif" }}>
                    FALTAM <span style={{ fontSize: '18px', fontWeight: 800, fontFamily: 'monospace', margin: '0 2px' }}>{days}</span> DIAS
                  </span>
                </span>
              ) : (
                <span style={{ display: 'inline-flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                  <span style={{ whiteSpace: 'nowrap', fontFamily: "'Inter', sans-serif" }}>
                    JULY 09, 2026
                  </span>
                  <span style={{ color: 'rgba(37, 99, 235, 0.4)', margin: '0 8px', fontWeight: 300 }}>|</span>
                  <span style={{ whiteSpace: 'nowrap', fontFamily: "'Inter', sans-serif" }}>
                    <span style={{ fontSize: '18px', fontWeight: 800, fontFamily: 'monospace', margin: '0 2px' }}>{days}</span> DAYS LEFT
                  </span>
                </span>
              )}
            </Text>

            {/* i18n Language Toggle Button */}
            <Button
              type="text"
              size="small"
              icon={<GlobalOutlined style={{ color: '#ffffffff', fontSize: '15px' }} />}
              onClick={() => setLanguage(l => l === 'PT' ? 'EN' : 'PT')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(37, 99, 235, 0.1)',
                borderRadius: '50%',
                width: '26px',
                height: '26px',
                border: 'none',
                padding: 0,
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(37, 99, 235, 0.2)';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(37, 99, 235, 0.1)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
}
