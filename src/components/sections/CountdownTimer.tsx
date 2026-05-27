import React, { useState, useEffect, useCallback } from 'react';
import { Row, Col, Typography, Space } from 'antd';

const { Text } = Typography;

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer() {
  // Data Alvo definitiva: 09 de Julho de 2026 às 09:00:00 AM (Fuso Horário Local)
  const TARGET_TIMESTAMP = new Date('2026-07-09T09:00:00').getTime();

  // Função isolada e memorizada para evitar recriação de escopo
  const calculateTimeLeft = useCallback((): TimeLeft => {
    const now = Date.now();
    const difference = TARGET_TIMESTAMP - now;

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
  }, [TARGET_TIMESTAMP]);

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    // Atualização forçada a cada segundo
    const intervalId = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Limpeza de memória ao desmontar o componente
    return () => clearInterval(intervalId);
  }, [calculateTimeLeft]);

  const formatDigits = (num: number) => String(num).padStart(2, '0');

  return (
    <div style={{ width: '100%', padding: '0 16px', margin: '24px auto', maxWidth: '1200px' }}>
      <Row justify="center" align="middle">
        <Col xs={24} sm={22} md={18} lg={14}>
          <div
            style={{
              background: 'rgba(37, 99, 235, 0.05)',
              border: '1px solid rgba(37, 99, 235, 0.2)',
              borderRadius: '50px',
              padding: '14px 28px',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '12px',
              backdropFilter: 'blur(8px)',
              boxShadow: '0 4px 12px rgba(37, 99, 235, 0.05)'
            }}
          >
            {/* Target Date Label */}
            <div style={{ flex: '1 1 auto', textAlign: 'center', minWidth: '150px' }}>
              <Text
                strong
                style={{
                  color: '#2563eb',
                  fontSize: '14px',
                  letterSpacing: '1.5px',
                  fontWeight: 700,
                  textTransform: 'uppercase'
                }}
              >
                09 de Julho 2026
              </Text>
            </div>

            {/* Vertical Divider Line */}
            <div className="countdown-divider" style={{ width: '1px', height: '24px', background: 'rgba(37, 99, 235, 0.2)' }}></div>

            {/* Live Counter Digits */}
            <div style={{ flex: '1 1 auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Space size={14} align="center">
                {[
                  { label: 'DIAS', value: timeLeft.days },
                  { label: 'HORAS', value: timeLeft.hours },
                  { label: 'MIN', value: timeLeft.minutes },
                  { label: 'SEG', value: timeLeft.seconds }
                ].map((item, index) => (
                  <React.Fragment key={item.label}>
                    <div style={{ textAlign: 'center', minWidth: '45px' }}>
                      <div style={{ fontSize: '20px', fontWeight: 800, color: '#1e293b', fontFamily: 'monospace', lineHeight: '1' }}>
                        {formatDigits(item.value)}
                      </div>
                      <div style={{ fontSize: '9px', color: '#64748b', marginTop: '4px', fontWeight: 700, letterSpacing: '0.5px' }}>
                        {item.label}
                      </div>
                    </div>
                    {index < 3 && (
                      <span style={{ color: '#2563eb', fontWeight: 700, fontSize: '18px', position: 'relative', top: '-4px' }}>:</span>
                    )}
                  </React.Fragment>
                ))}
              </Space>
            </div>
          </div>
        </Col>
      </Row>

      <style>{`
        @media (max-width: 576px) {
          .countdown-divider {
            display: none !important;
          }
          div[style*="borderRadius: '50px'"] {
            border-radius: 20px !important;
            padding: 16px !important;
            justify-content: center !important;
          }
        }
      `}</style>
    </div>
  );
}
