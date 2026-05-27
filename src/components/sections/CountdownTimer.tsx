import React from 'react';
import { Row, Col, Typography } from 'antd';

const { Text } = Typography;

export default function CountdownTimer() {
  // Configuração das datas em formato padrão ISO
  const TARGET_DATE = new Date('2026-07-09T00:00:00');
  const CURRENT_DATE = new Date('2026-05-27T00:00:00'); // Data atual síncrona do sistema

  // Cálculo preciso da diferença de dias absolutos
  const diffInMs = TARGET_DATE.getTime() - CURRENT_DATE.getTime();
  const daysRemaining = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

  return (
    <div style={{ width: '100%', padding: '0 16px', margin: '24px auto', maxWidth: '1200px' }}>
      <Row justify="center" align="middle">
        <Col xs={24} sm={22} md={16} lg={12}>
          <div
            style={{
              background: 'rgba(37, 99, 235, 0.04)',
              border: '1px solid rgba(37, 99, 235, 0.2)',
              borderRadius: '50px',
              padding: '12px 32px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '24px',
              boxShadow: '0 2px 8px rgba(37, 99, 235, 0.03)'
            }}
          >
            {/* Bloco de Data Base */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Text
                strong
                style={{
                  color: '#2563eb',
                  fontSize: '13px',
                  letterSpacing: '1.5px',
                  fontWeight: 700,
                  textTransform: 'uppercase'
                }}
              >
                09 de Julho 2026
              </Text>
            </div>

            {/* Divisor Vertical */}
            <div 
              style={{ 
                width: '1px', 
                height: '20px', 
                background: 'rgba(37, 99, 235, 0.2)' 
              }}
            ></div>

            {/* Contador Simplificado Baseado em Dias */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span 
                style={{ 
                  color: '#2563eb', 
                  fontSize: '22px', 
                  fontWeight: 400, 
                  letterSpacing: '0.5px' 
                }}
              >
                FALTA
              </span>
              <span 
                style={{ 
                  color: '#2563eb', 
                  fontSize: '38px', 
                  fontWeight: 600, 
                  lineHeight: '1',
                  fontFamily: 'system-ui, sans-serif',
                  position: 'relative',
                  top: '-2px'
                }}
              >
                {daysRemaining}
              </span>
              <span 
                style={{ 
                  color: '#2563eb', 
                  fontSize: '22px', 
                  fontWeight: 500, 
                  letterSpacing: '0.5px' 
                }}
              >
                DIAS
              </span>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
