import React, { useState, useEffect } from 'react';
import { Typography, Row, Col } from 'antd';

const { Text } = Typography;

interface CountdownTimerProps {
  compact?: boolean;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ compact = false }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
    isOver: false,
  });

  useEffect(() => {
    // Definir a data alvo exata: 9 de Julho de 2026 às 09:00:00 (WEST / Hora de Portugal, UTC+1)
    // 09:00:00 WEST equivale a 08:00:00 UTC. O mês em JavaScript é 0-indexado (6 = Julho).
    const targetDate = Date.UTC(2026, 6, 9, 8, 0, 0);

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({
          days: '00',
          hours: '00',
          minutes: '00',
          seconds: '00',
          isOver: true,
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({
        days: String(days).padStart(2, '0'),
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0'),
        isOver: false,
      });
    };

    updateTimer();
    const intervalId = setInterval(updateTimer, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const colonStyle: React.CSSProperties = {
    color: '#3b82f6', // Azul Royal vibrante
    textShadow: '0 0 10px rgba(59, 130, 246, 0.6)',
    fontWeight: 800,
    fontSize: compact ? '1.2rem' : '1.8rem',
    fontFamily: "'Outfit', sans-serif",
    margin: compact ? '0 4px' : '0 8px',
    animation: 'pulse 1s infinite',
    lineHeight: 1,
    display: 'inline-block',
    alignSelf: 'center',
  };

  const numberStyle: React.CSSProperties = {
    fontFamily: "'Outfit', sans-serif",
    fontWeight: 800,
    fontSize: compact ? '1.2rem' : '2rem',
    color: '#3b82f6', // Azul Royal vibrante
    textShadow: '0 0 12px rgba(59, 130, 246, 0.7)',
    lineHeight: 1,
  };

  const labelStyle: React.CSSProperties = {
    fontSize: compact ? '0.55rem' : '0.65rem',
    color: 'rgba(255, 255, 255, 0.6)',
    textTransform: 'uppercase',
    fontWeight: 700,
    letterSpacing: '1px',
    textAlign: 'center',
    display: 'block',
    marginTop: '4px',
  };

  return (
    <Row justify="center" align="middle" style={{ width: '100%', margin: '0 auto', padding: '10px 0' }}>
      <Col xs={24} style={{ display: 'flex', justifyContent: 'center' }}>
        <div
          className={`countdown-capsule ${compact ? 'compact' : ''} notranslate`}
          translate="no"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #0f172a 0%, #020617 100%)',
            border: '2px solid rgba(59, 130, 246, 0.45)', // Azul Royal da marca
            borderRadius: '40px',
            padding: compact ? '8px 16px' : '14px 32px',
            boxShadow: '0 10px 30px rgba(59, 130, 246, 0.15), inset 0 0 15px rgba(59, 130, 246, 0.05)',
            userSelect: 'none',
            maxWidth: '100%',
            width: 'fit-content',
            transition: 'all 0.3s ease',
          }}
        >
          {/* Target Date Section */}
          <Text
            className="countdown-badge-date"
            style={{
              color: '#3b82f6',
              fontWeight: 800,
              fontFamily: "'Outfit', sans-serif",
              fontSize: compact ? '0.85rem' : '1.1rem',
              letterSpacing: '2px',
              textShadow: '0 0 8px rgba(59, 130, 246, 0.4)',
              whiteSpace: 'nowrap',
            }}
          >
            09 DE JULHO 2026
          </Text>

          {/* Divider (Hidden on mobile) */}
          <div
            className="countdown-divider"
            style={{
              width: '2px',
              height: compact ? '20px' : '32px',
              background: 'rgba(59, 130, 246, 0.35)',
              margin: compact ? '0 16px' : '0 24px',
            }}
          />

          {/* Countdown Digital Section */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* Days */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: compact ? '30px' : '45px' }}>
              <span style={numberStyle}>{timeLeft.days}</span>
              <span style={labelStyle}>DIAS</span>
            </div>

            <span style={colonStyle}>:</span>

            {/* Hours */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: compact ? '30px' : '45px' }}>
              <span style={numberStyle}>{timeLeft.hours}</span>
              <span style={labelStyle}>HORAS</span>
            </div>

            <span style={colonStyle}>:</span>

            {/* Minutes */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: compact ? '30px' : '45px' }}>
              <span style={numberStyle}>{timeLeft.minutes}</span>
              <span style={labelStyle}>MIN</span>
            </div>

            <span style={colonStyle}>:</span>

            {/* Seconds */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: compact ? '30px' : '45px' }}>
              <span style={numberStyle}>{timeLeft.seconds}</span>
              <span style={labelStyle}>SEG</span>
            </div>
          </div>
        </div>
      </Col>

      {/* Responsive styling to guarantee centering, no overflows, and elegant stacking */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.25; }
        }
        @media (max-width: 600px) {
          .countdown-capsule {
            flex-direction: column !important;
            border-radius: 24px !important;
            padding: 16px 24px !important;
            gap: 12px !important;
            width: 100% !important;
            max-width: 320px !important;
          }
          .countdown-divider {
            display: none !important;
          }
          .countdown-badge-date {
            margin-right: 0 !important;
            font-size: 0.95rem !important;
            text-align: center;
          }
        }
        @media (max-width: 350px) {
          .countdown-capsule {
            padding: 12px 16px !important;
          }
          .countdown-capsule span {
            font-size: 1.5rem !important;
          }
        }
      `}} />
    </Row>
  );
};
