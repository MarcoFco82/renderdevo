// components/SeasonalDecorations.js - MINIMAL TECH TRIANGLES ANIMATED
'use client';
import { useEffect, useState } from 'react';

const SeasonalDecorations = () => {
  const [isMounted, setIsMounted] = useState(false);

  // CONFIGURACIÓN MINIMAL TECH
  const glowConfig = {
    intensity: 0.6,
    blur: 4,
    cyan: 'rgba(0, 245, 255, 0.7)',
    magenta: 'rgba(255, 0, 255, 0.5)',
    purple: 'rgba(138, 43, 226, 0.4)'
  };

  // PATTERN MINIMAL - Triángulos animados
  const headerGraphics = `
    <svg width="100%" height="24" viewBox="0 0 1200 24" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMin meet">
      <defs>
        <!-- FILTROS DE GLOW MINIMAL -->
        <filter id="cyanGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="${glowConfig.blur}" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        
        <filter id="magentaGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="${glowConfig.blur}" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        <pattern id="techPattern" x="0" y="0" width="120" height="24" patternUnits="userSpaceOnUse">
          <!-- Línea horizontal sutil -->
          <line x1="0" y1="12" x2="120" y2="12" stroke="rgba(255, 255, 255, 0.1)" stroke-width="0.5"/>
          
          <!-- Triángulos tecnológicos animados -->
          <g transform="translate(30, 12)">
            <path d="M-2,-2 L2,-2 L0,2 Z" fill="${glowConfig.cyan.split(')')[0]})" 
                  filter="url(#cyanGlow)" opacity="0.8">
              <!-- Animación de rotación sutil -->
              <animateTransform 
                attributeName="transform"
                type="rotate"
                from="0 0 0"
                to="360 0 0"
                dur="8s"
                repeatCount="indefinite"/>
              <!-- Animación de pulso -->
              <animate 
                attributeName="opacity"
                values="0.6;0.9;0.6"
                dur="3s"
                repeatCount="indefinite"/>
            </path>
          </g>
          
          <g transform="translate(60, 12)">
            <path d="M-1.5,-1.5 L1.5,-1.5 L0,1.5 Z" fill="${glowConfig.magenta.split(')')[0]})" 
                  filter="url(#magentaGlow)" opacity="0.7">
              <!-- Animación de rotación inversa -->
              <animateTransform 
                attributeName="transform"
                type="rotate"
                from="0 0 0"
                to="-360 0 0"
                dur="6s"
                repeatCount="indefinite"/>
              <!-- Animación de pulso desfasada -->
              <animate 
                attributeName="opacity"
                values="0.5;0.8;0.5"
                dur="4s"
                begin="1s"
                repeatCount="indefinite"/>
            </path>
          </g>
          
          <g transform="translate(90, 12)">
            <path d="M-1.8,-1.8 L1.8,-1.8 L0,1.8 Z" fill="${glowConfig.purple.split(')')[0]})" 
                  filter="url(#cyanGlow)" opacity="0.6">
              <!-- Animación de escala sutil -->
              <animate 
                attributeName="transform"
                attributeType="XML"
                type="scale"
                values="1;1.2;1"
                dur="5s"
                repeatCount="indefinite"/>
              <!-- Animación de pulso -->
              <animate 
                attributeName="opacity"
                values="0.4;0.7;0.4"
                dur="3.5s"
                begin="0.5s"
                repeatCount="indefinite"/>
            </path>
          </g>
        </pattern>

        <!-- PATTERN PARA EFECTO PULSANTE MUY SUTIL -->
        <pattern id="pulsePattern" x="0" y="0" width="120" height="24" patternUnits="userSpaceOnUse">
          <g opacity="0.2">
            <path d="M-1.2,-1.2 L1.2,-1.2 L0,1.2 Z" transform="translate(30, 12)" 
                  fill="${glowConfig.cyan.split(')')[0]})">
              <animate 
                attributeName="opacity"
                values="0.1;0.3;0.1"
                dur="4s"
                repeatCount="indefinite"/>
            </path>
            <path d="M-0.9,-0.9 L0.9,-0.9 L0,0.9 Z" transform="translate(60, 12)" 
                  fill="${glowConfig.magenta.split(')')[0]})">
              <animate 
                attributeName="opacity"
                values="0.1;0.3;0.1"
                dur="4s"
                begin="1s"
                repeatCount="indefinite"/>
            </path>
            <path d="M-1,-1 L1,-1 L0,1 Z" transform="translate(90, 12)" 
                  fill="${glowConfig.purple.split(')')[0]})">
              <animate 
                attributeName="opacity"
                values="0.1;0.3;0.1"
                dur="4s"
                begin="2s"
                repeatCount="indefinite"/>
            </path>
          </g>
        </pattern>
      </defs>

      <!-- FONDO TRANSPARENTE -->
      <rect width="100%" height="24" fill="transparent"/>
      
      <!-- PATTERN PRINCIPAL -->
      <rect x="-600" width="2400" height="24" fill="url(#techPattern)" opacity="0.9"/>
      
      <!-- EFECTO DE LÍNEA PULSANTE -->
      <line x1="0" y1="12" x2="100%" y2="12" stroke="rgba(255, 255, 255, 0.05)" stroke-width="0.5">
        <animate 
          attributeName="stroke-opacity"
          values="0.03;0.08;0.03"
          dur="6s"
          repeatCount="indefinite"/>
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
          top: 80px;
          left: 0;
          width: 100%;
          height: 24px;
          opacity: 0.7;
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
            top: 70px;
            height: 20px;
            opacity: 0.6;
          }
          
          .header-graphics svg {
            min-width: 768px;
            height: 20px;
          }
        }

        @media (max-width: 480px) {
          .header-graphics {
            top: 65px;
            height: 18px;
            opacity: 0.5;
          }
          
          .header-graphics svg {
            min-width: 480px;
            height: 18px;
          }
        }
      `}</style>
    </div>
  );
};

export default SeasonalDecorations;