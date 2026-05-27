import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Space } from 'antd';

const { Text } = Typography;

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer() {
  // Data Alvo: 09 de Julho de 2026 às 09:00:00
  const targetDate = new Date('2026-07-09T09:00:00').getTime();

  const calculateTimeLeft = (): TimeLeft => {
    const difference = targetDate - new Date().getTime();
    let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Formatar números com zero à esquerda (ex: 09 em vez de 9)
  const formatNumber = (num: number) => String(num).padStart(2, '0');

  return (
    <div style={{ width: '100%', padding: '0 16px', margin: '20px 0' }}>
      <Row justify="center" align="middle">
        <Col xs={24} sm={22} md={18} lg={14}>
          <div 
            className="countdown-container"
            style={{
              background: 'rgba(37, 99, 235, 0.08)',
              border: '1px solid rgba(37, 99, 235, 0.3)',
              borderRadius: '50px',
              padding: '12px 24px',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '12px',
              boxShadow: '0 0 20px rgba(37, 99, 235, 0.15)'
            }}
          >
            {/* Bloco da Data do Evento */}
            <div style={{ flex: '1 1 auto', textAlign: 'center', minWidth: '140px' }}>
              <Text 
                strong 
                style={{ 
                  color: '#2563eb', 
                  fontSize: '14px', 
                  letterSpacing: '2px',
                  textTransform: 'uppercase'
                }}
              >
                09 de Julho 2026
              </Text>
            </div>

            {/* Linha Divisória Oculta no Mobile */}
            <div className="hidden-mobile" style={{ width: '1px', height: '24px', background: 'rgba(37, 99, 235, 0.3)' }}></div>

            {/* Bloco dos Números Regressivos */}
            <div style={{ flex: '1 1 auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Space size={16} align="center">
                {[
                  { label: 'DIAS', value: timeLeft.days },
                  { label: 'HORAS', value: timeLeft.hours },
                  { label: 'MIN', value: timeLeft.minutes },
                  { label: 'SEG', value: timeLeft.seconds }
                ].map((item, index) => (
                  <React.Fragment key={item.label}>
                    <div style={{ textAlign: 'center', display: 'inline-block', minWidth: '42px' }}>
                      <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#1e293b', fontFamily: 'monospace', lineHeight: '1' }}>
                        {formatNumber(item.value)}
                      </div>
                      <div style={{ fontSize: '9px', color: '#64748b', marginTop: '4px', fontWeight: '600', letterSpacing: '0.5px' }}>
                        {item.label}
                      </div>
                    </div>
                    {index < 3 && (
                      <span style={{ color: '#2563eb', fontWeight: 'bold', fontSize: '18px', alignSelf: 'flex-start', marginTop: '-2px' }}>:</span>
                    )}
                  </React.Fragment>
                ))}
              </Space>
            </div>
          </div>
        </Col>
      </Row>

      {/* Estilos CSS Embutidos para Ajustes de Tela */}
      <style>{`
        @media (max-width: 576px) {
          .countdown-container {
            border-radius: 24px !important;
            padding: 16px !important;
            justify-content: center !important;
            gap: 8px !important;
          }
          .hidden-mobile {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
