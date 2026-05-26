import React, { useState, useEffect } from 'react';
import { Typography } from 'antd';

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
    const targetDate = new Date('2026-07-09T09:00:00').getTime();

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

  // Pulsing colon animation inside style
  const colonStyle: React.CSSProperties = {
    color: '#06b6d4',
    textShadow: '0 0 10px rgba(6, 182, 212, 0.8)',
    fontWeight: 900,
    fontSize: compact ? '1.1rem' : '1.4rem',
    fontFamily: '"Courier New", Courier, monospace',
    margin: compact ? '0 2px' : '0 4px',
    animation: 'pulse 1s infinite',
    lineHeight: 1,
  };

  const numberStyle: React.CSSProperties = {
    fontFamily: '"Courier New", Courier, monospace',
    fontWeight: 900,
    fontSize: compact ? '1.1rem' : '1.4rem',
    color: '#06b6d4',
    textShadow: '0 0 12px rgba(6, 182, 212, 0.9)',
    lineHeight: 1,
    letterSpacing: '1px',
  };

  const labelStyle: React.CSSProperties = {
    fontSize: compact ? '0.5rem' : '0.55rem',
    color: 'rgba(255, 255, 255, 0.45)',
    textTransform: 'uppercase',
    fontWeight: 600,
    letterSpacing: '0.5px',
    textAlign: 'center',
    display: 'block',
    marginTop: compact ? '1px' : '3px',
  };

  const digitBlockStyle = (width: string): React.CSSProperties => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
  });

  return (
    <>
      <div
        className="countdown-capsule notranslate"
        translate="no"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #09132e 0%, #030712 100%)',
          border: '1.5px solid rgba(0, 162, 232, 0.45)',
          borderRadius: '30px',
          padding: compact ? '4px 14px' : '8px 24px',
          boxShadow: '0 0 20px rgba(0, 162, 232, 0.3), inset 0 0 8px rgba(0, 162, 232, 0.15)',
          height: compact ? '40px' : '50px',
          userSelect: 'none',
          transition: 'transform 0.2s ease',
        }}
      >
        {/* Target Date Section */}
        <Text
          className="notranslate"
          style={{
            color: '#ef4444',
            fontWeight: 900,
            fontFamily: '"Courier New", Courier, monospace',
            fontSize: compact ? '0.8rem' : '1rem',
            letterSpacing: '1.5px',
            textShadow: '0 0 10px rgba(239, 68, 68, 0.75)',
            marginRight: compact ? '8px' : '14px',
            whiteSpace: 'nowrap',
          }}
        >
          09 DE JULHO 2026
        </Text>

        {/* Divider */}
        <div
          style={{
            width: '1.5px',
            height: compact ? '20px' : '28px',
            background: 'rgba(0, 162, 232, 0.35)',
            marginRight: compact ? '8px' : '14px',
          }}
        />

        {/* Countdown Digital Section */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {/* Days */}
          <div style={digitBlockStyle(compact ? '20px' : '28px')}>
            <span className="notranslate" style={numberStyle}>{timeLeft.days}</span>
            <span className="notranslate" style={labelStyle}>Dias</span>
          </div>

          <div style={{
            height: compact ? '1.1rem' : '1.4rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'flex-start',
          }}>
            <span className="notranslate" style={colonStyle}>:</span>
          </div>

          {/* Hours */}
          <div style={digitBlockStyle(compact ? '20px' : '28px')}>
            <span className="notranslate" style={numberStyle}>{timeLeft.hours}</span>
            <span className="notranslate" style={labelStyle}>Horas</span>
          </div>

          <div style={{
            height: compact ? '1.1rem' : '1.4rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'flex-start',
          }}>
            <span className="notranslate" style={colonStyle}>:</span>
          </div>

          {/* Minutes */}
          <div style={digitBlockStyle(compact ? '20px' : '28px')}>
            <span className="notranslate" style={numberStyle}>{timeLeft.minutes}</span>
            <span className="notranslate" style={labelStyle}>Min</span>
          </div>

          <div style={{
            height: compact ? '1.1rem' : '1.4rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'flex-start',
          }}>
            <span className="notranslate" style={colonStyle}>:</span>
          </div>

          {/* Seconds */}
          <div style={digitBlockStyle(compact ? '20px' : '28px')}>
            <span className="notranslate" style={numberStyle}>{timeLeft.seconds}</span>
            <span className="notranslate" style={labelStyle}>Seg</span>
          </div>
        </div>
      </div>

      {/* Embedded animation keyframes in standard CSS (rendered outside flex container) */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.35; }
        }
        @media (max-width: 576px) {
          .countdown-capsule {
            transform: scale(0.85);
          }
        }
        @media (max-width: 400px) {
          .countdown-capsule {
            transform: scale(0.72);
          }
        }
      `}} />
    </>
  );
};
