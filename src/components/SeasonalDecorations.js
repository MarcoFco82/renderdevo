// components/SeasonalDecorations.js - 🎄 CHRISTMAS DECORATIONS
'use client';
import { useEffect, useState } from 'react';

const SeasonalDecorations = () => {
  const [isMounted, setIsMounted] = useState(false);

  // 🎄 CONFIGURACIÓN NAVIDAD - Azules + Rojo
  const glowConfig = {
    intensity: 0.7,
    blur: 5,
    ice: 'rgba(168, 218, 220, 0.8)',      // Azul hielo
    skyBlue: 'rgba(91, 192, 235, 0.7)',   // Azul cielo
    red: 'rgba(196, 30, 58, 0.7)',        // Rojo navideño
    white: 'rgba(255, 255, 255, 0.9)'
  };

  // 🎄 PATTERN NAVIDEÑO - Luces en azules y rojo
  const headerGraphics = `
    <svg width="100%" height="32" viewBox="0 0 1200 32" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMin meet">
      <defs>
        <!-- FILTROS DE GLOW NAVIDEÑO -->
        <filter id="iceGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="${glowConfig.blur}" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        
        <filter id="redGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="${glowConfig.blur}" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        
        <filter id="whiteGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        <!-- ⭐ PATRÓN DE LUCES NAVIDEÑAS -->
        <pattern id="xmasLightsPattern" x="0" y="0" width="200" height="32" patternUnits="userSpaceOnUse">
          <!-- Cable de luces -->
          <path d="M0,8 Q40,12 80,8 Q120,4 160,8 Q200,12 200,8" 
                stroke="rgba(60, 70, 80, 0.5)" stroke-width="1.5" fill="none"/>
          
          <!-- 🔴 Luz Roja -->
          <g transform="translate(40, 12)">
            <rect x="-2" y="-6" width="4" height="4" fill="rgba(80, 80, 80, 0.8)" rx="0.5"/>
            <ellipse cx="0" cy="2" rx="4" ry="5" fill="${glowConfig.red.split(')')[0]})" filter="url(#redGlow)">
              <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite"/>
            </ellipse>
            <ellipse cx="-1" cy="0" rx="1" ry="1.5" fill="rgba(255,255,255,0.4)"/>
          </g>
          
          <!-- 🔵 Luz Azul Hielo -->
          <g transform="translate(90, 8)">
            <rect x="-2" y="-6" width="4" height="4" fill="rgba(80, 80, 80, 0.8)" rx="0.5"/>
            <ellipse cx="0" cy="2" rx="4" ry="5" fill="${glowConfig.ice.split(')')[0]})" filter="url(#iceGlow)">
              <animate attributeName="opacity" values="0.6;1;0.6" dur="2.3s" begin="0.3s" repeatCount="indefinite"/>
            </ellipse>
            <ellipse cx="-1" cy="0" rx="1" ry="1.5" fill="rgba(255,255,255,0.5)"/>
          </g>
          
          <!-- ⚪ Luz Blanca -->
          <g transform="translate(140, 12)">
            <rect x="-2" y="-6" width="4" height="4" fill="rgba(80, 80, 80, 0.8)" rx="0.5"/>
            <ellipse cx="0" cy="2" rx="3.5" ry="4.5" fill="${glowConfig.white.split(')')[0]})" filter="url(#whiteGlow)">
              <animate attributeName="opacity" values="0.6;1;0.6" dur="1.8s" begin="0.6s" repeatCount="indefinite"/>
            </ellipse>
            <ellipse cx="-1" cy="0" rx="0.8" ry="1.2" fill="rgba(255,255,255,0.6)"/>
          </g>
          
          <!-- 🔵 Luz Azul Cielo -->
          <g transform="translate(185, 8)">
            <rect x="-2" y="-6" width="4" height="4" fill="rgba(80, 80, 80, 0.8)" rx="0.5"/>
            <ellipse cx="0" cy="2" rx="3.5" ry="4.5" fill="${glowConfig.skyBlue.split(')')[0]})" filter="url(#iceGlow)">
              <animate attributeName="opacity" values="0.5;0.9;0.5" dur="2.5s" begin="0.9s" repeatCount="indefinite"/>
            </ellipse>
            <ellipse cx="-1" cy="0" rx="0.8" ry="1.2" fill="rgba(255,255,255,0.5)"/>
          </g>
        </pattern>

        <!-- ❄️ PATRÓN DE COPOS DECORATIVOS -->
        <pattern id="snowflakesPattern" x="0" y="0" width="300" height="32" patternUnits="userSpaceOnUse">
          <!-- Copo grande -->
          <g transform="translate(75, 16)" opacity="0.5">
            <line x1="0" y1="-5" x2="0" y2="5" stroke="white" stroke-width="0.8"/>
            <line x1="-4.3" y1="-2.5" x2="4.3" y2="2.5" stroke="white" stroke-width="0.8"/>
            <line x1="-4.3" y1="2.5" x2="4.3" y2="-2.5" stroke="white" stroke-width="0.8"/>
            <!-- Ramitas -->
            <line x1="0" y1="-3" x2="1.5" y2="-4" stroke="white" stroke-width="0.5"/>
            <line x1="0" y1="-3" x2="-1.5" y2="-4" stroke="white" stroke-width="0.5"/>
            <line x1="0" y1="3" x2="1.5" y2="4" stroke="white" stroke-width="0.5"/>
            <line x1="0" y1="3" x2="-1.5" y2="4" stroke="white" stroke-width="0.5"/>
            <animate attributeName="opacity" values="0.3;0.6;0.3" dur="4s" repeatCount="indefinite"/>
          </g>
          
          <!-- Copo mediano azul -->
          <g transform="translate(150, 10)" opacity="0.4">
            <line x1="0" y1="-4" x2="0" y2="4" stroke="${glowConfig.ice.split(',')[0]}, 0.8)" stroke-width="0.7"/>
            <line x1="-3.5" y1="-2" x2="3.5" y2="2" stroke="${glowConfig.ice.split(',')[0]}, 0.8)" stroke-width="0.7"/>
            <line x1="-3.5" y1="2" x2="3.5" y2="-2" stroke="${glowConfig.ice.split(',')[0]}, 0.8)" stroke-width="0.7"/>
            <animate attributeName="opacity" values="0.2;0.5;0.2" dur="3.5s" begin="1s" repeatCount="indefinite"/>
          </g>
          
          <!-- Copo pequeño -->
          <g transform="translate(225, 20)" opacity="0.35">
            <line x1="0" y1="-3" x2="0" y2="3" stroke="white" stroke-width="0.6"/>
            <line x1="-2.6" y1="-1.5" x2="2.6" y2="1.5" stroke="white" stroke-width="0.6"/>
            <line x1="-2.6" y1="1.5" x2="2.6" y2="-1.5" stroke="white" stroke-width="0.6"/>
            <animate attributeName="opacity" values="0.2;0.45;0.2" dur="3s" begin="2s" repeatCount="indefinite"/>
          </g>
          
          <!-- Copo pequeño azul -->
          <g transform="translate(270, 14)" opacity="0.3">
            <line x1="0" y1="-2.5" x2="0" y2="2.5" stroke="${glowConfig.skyBlue.split(',')[0]}, 0.7)" stroke-width="0.5"/>
            <line x1="-2.2" y1="-1.25" x2="2.2" y2="1.25" stroke="${glowConfig.skyBlue.split(',')[0]}, 0.7)" stroke-width="0.5"/>
            <line x1="-2.2" y1="1.25" x2="2.2" y2="-1.25" stroke="${glowConfig.skyBlue.split(',')[0]}, 0.7)" stroke-width="0.5"/>
            <animate attributeName="opacity" values="0.15;0.4;0.15" dur="4.5s" begin="0.5s" repeatCount="indefinite"/>
          </g>
        </pattern>

        <!-- Gradiente para efecto de profundidad -->
        <linearGradient id="fadeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:rgba(0,0,0,0.3);stop-opacity:1" />
          <stop offset="10%" style="stop-color:rgba(0,0,0,0);stop-opacity:1" />
          <stop offset="90%" style="stop-color:rgba(0,0,0,0);stop-opacity:1" />
          <stop offset="100%" style="stop-color:rgba(0,0,0,0.3);stop-opacity:1" />
        </linearGradient>
      </defs>

      <!-- FONDO TRANSPARENTE -->
      <rect width="100%" height="32" fill="transparent"/>
      
      <!-- 🎄 CAPA DE LUCES NAVIDEÑAS -->
      <rect x="-600" width="2400" height="32" fill="url(#xmasLightsPattern)" opacity="0.95"/>
      
      <!-- ❄️ CAPA DE COPOS -->
      <rect x="-600" width="2400" height="32" fill="url(#snowflakesPattern)" opacity="0.6"/>
      
      <!-- Efecto de fade en los bordes -->
      <rect width="100%" height="32" fill="url(#fadeGradient)" opacity="0.5"/>
      
      <!-- Línea decorativa sutil azul -->
      <line x1="0" y1="30" x2="100%" y2="30" stroke="rgba(168, 218, 220, 0.25)" stroke-width="0.5">
        <animate attributeName="stroke-opacity" values="0.15;0.35;0.15" dur="4s" repeatCount="indefinite"/>
      </line>
    </svg>
  `;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="seasonal-decorations">
      <div 
        className="header-graphics"
        dangerouslySetInnerHTML={{ __html: headerGraphics }}
      />
      
      <style jsx>{`
        .seasonal-decorations {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 10000;
        }

        .header-graphics {
          position: absolute;
          top: 75px;
          left: 0;
          width: 100%;
          height: 32px;
          opacity: 0.9;
          display: flex;
          justify-content: center;
          overflow: hidden;
          z-index: 10001;
        }

        .header-graphics svg {
          width: 100%;
          height: 100%;
          min-width: 1200px;
        }

        /* RESPONSIVE */
        @media (max-width: 768px) {
          .header-graphics {
            top: 68px;
            height: 28px;
            opacity: 0.85;
          }
          
          .header-graphics svg {
            min-width: 768px;
            height: 28px;
          }
        }

        @media (max-width: 480px) {
          .header-graphics {
            top: 62px;
            height: 24px;
            opacity: 0.8;
          }
          
          .header-graphics svg {
            min-width: 480px;
            height: 24px;
          }
        }
      `}</style>
    </div>
  );
};

export default SeasonalDecorations;