// components/SeasonalDecorations.js - CON GLOW PERrón
'use client';
import { useEffect, useState } from 'react';

const SeasonalDecorations = () => {
  const [isMounted, setIsMounted] = useState(false);

  // CONFIGURACIÓN DE GLOW - AJUSTA ESTOS VALORES
  const glowConfig = {
    intensity: 0.8,           // ← Intensidad del glow (0.1 a 2.0)
    blur: 3,                  // ← Desenfoque del glow (1 a 10)
    color: 'rgba(255, 140, 0, 0.8)',  // ← Color del glow (naranja cempasúchil)
    innerGlow: 0.4            // ← Glow interior (0.1 a 1.0)
  };

  // PATTERN CENTRADO - Flor de Cempasúchil + Velita CON GLOW
  const headerGraphics = `
    <svg width="100%" height="40" viewBox="0 0 1200 40" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMin meet">
      <defs>
        <!-- FILTROS DE GLOW -->
        <filter id="flowerGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="${glowConfig.blur}" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        
        <filter id="candleGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="${glowConfig.blur * 1.5}" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        
        <filter id="flameGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="${glowConfig.blur * 2}" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        <pattern id="flowerCandlePattern" x="0" y="0" width="80" height="40" patternUnits="userSpaceOnUse">
          <!-- Flor de Cempasúchil CON GLOW -->
          <g transform="translate(20, 20)">
            <!-- Glow exterior de la flor -->
            <g opacity="${glowConfig.intensity * 0.6}">
              <circle cx="0" cy="0" r="8" fill="${glowConfig.color}" filter="url(#flowerGlow)"/>
            </g>
            
            <!-- Centro de la flor CON GLOW -->
            <circle cx="0" cy="0" r="4" fill="#D35400" stroke="#B03A2E" stroke-width="0.5" 
                    opacity="${0.8 + glowConfig.innerGlow * 0.2}"/>
            
            <!-- 12 PÉTALOS CON GLOW -->
            <g fill="#FF8C00" stroke="#E67E22" stroke-width="0.3" 
               opacity="${0.9 + glowConfig.intensity * 0.1}" 
               filter="url(#flowerGlow)">
              <!-- Pétalos horizontales y verticales -->
              <ellipse cx="-9" cy="0" rx="2.8" ry="4.4"/>
              <ellipse cx="9" cy="0" rx="2.8" ry="4.4"/>
              <ellipse cx="0" cy="-9" rx="2.8" ry="4.4"/>
              <ellipse cx="0" cy="9" rx="2.8" ry="4.4"/>
              
              <!-- Pétalos diagonales -->
              <ellipse cx="-6.4" cy="-6.4" rx="2.8" ry="4.4" transform="rotate(45)"/>
              <ellipse cx="6.4" cy="-6.4" rx="2.8" ry="4.4" transform="rotate(-45)"/>
              <ellipse cx="6.4" cy="6.4" rx="2.8" ry="4.4" transform="rotate(45)"/>
              <ellipse cx="-6.4" cy="6.4" rx="2.8" ry="4.4" transform="rotate(-45)"/>
              
              <!-- Pétalos intermedios -->
              <ellipse cx="-8.2" cy="-3.5" rx="2.8" ry="4.4" transform="rotate(22.5)"/>
              <ellipse cx="-8.2" cy="3.5" rx="2.8" ry="4.4" transform="rotate(-22.5)"/>
              <ellipse cx="8.2" cy="-3.5" rx="2.8" ry="4.4" transform="rotate(-22.5)"/>
              <ellipse cx="8.2" cy="3.5" rx="2.8" ry="4.4" transform="rotate(22.5)"/>
            </g>
            
            <!-- Detalles del centro CON GLOW INTENSO -->
            <circle cx="0" cy="0" r="1.5" fill="#F39C12" 
                    opacity="${0.9 + glowConfig.innerGlow * 0.3}" 
                    filter="url(#flowerGlow)"/>
          </g>

          <!-- VELITA CON GLOW ANIMADO -->
          <g transform="translate(60, 20)">
            <!-- Glow de la llama -->
            <g opacity="${glowConfig.intensity}">
              <circle cx="0" cy="-11" r="6" fill="#FFD700" filter="url(#flameGlow)"/>
            </g>
            
            <!-- Llama principal -->
            <circle cx="0" cy="-11" r="3" fill="#FFD700" 
                    opacity="${0.9 + glowConfig.innerGlow * 0.3}"/>
            <path d="M-2,-11 L2,-11 L0,-14 Z" fill="#FF6B00" 
                  opacity="${0.8 + glowConfig.intensity * 0.2}"/>
            
            <!-- Glow de la vela -->
            <g opacity="${glowConfig.intensity * 0.4}">
              <rect x="-4.5" y="-8" width="9" height="16" fill="#FFFFFF" filter="url(#candleGlow)"/>
            </g>
            
            <!-- Vela (más alta y ancha) -->
            <rect x="-3.5" y="-8" width="7" height="16" fill="#FFFFFF" stroke="#FF8C00" stroke-width="0.5"
                  opacity="${0.8 + glowConfig.innerGlow * 0.2}"/>
            
            <!-- Base con glow -->
            <g opacity="${0.7 + glowConfig.intensity * 0.3}">
              <rect x="-4.5" y="8" width="9" height="2" fill="#8A2BE2" filter="url(#candleGlow)"/>
            </g>
          </g>
        </pattern>

        <!-- PATTERN ANIMADO PARA EFECTO PULSANTE -->
        <pattern id="animatedGlow" x="0" y="0" width="80" height="40" patternUnits="userSpaceOnUse">
          <!-- Copia del pattern principal con animación -->
          <g opacity="0.3">
            <circle cx="20" cy="20" r="6" fill="${glowConfig.color}"/>
            <circle cx="60" cy="20" r="5" fill="#FFD700"/>
          </g>
        </pattern>
      </defs>

      <!-- FONDO INVISIBLE QUE OCUPA TODO EL ANCHO -->
      <rect width="100%" height="40" fill="rgba(26,26,46,0.1)"/>
      
      <!-- LAYER DE GLOW PULSANTE (OPCIONAL) -->
      <rect width="100%" height="40" fill="url(#animatedGlow)" opacity="0.1">
        <animate attributeName="opacity" values="0.05;0.15;0.05" dur="3s" repeatCount="indefinite"/>
      </rect>
      
      <!-- CONTENEDOR CENTRADO CON MÁRGENES -->
      <g transform="translate(0, 0)">
        <!-- PATTERN QUE COMIENZA DESDE -600 (IZQUIERDA) HASTA +600 (DERECHA) -->
        <rect x="-600" width="2400" height="40" fill="url(#flowerCandlePattern)" opacity="0.9"/>
      </g>

      <!-- EFECTO DE DESTELLO OCASIONAL -->
      <rect width="100%" height="40" fill="url(#animatedGlow)" opacity="0">
        <animate attributeName="opacity" values="0;0.3;0" dur="4s" begin="2s" repeatCount="indefinite"/>
      </rect>
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
          top: 70px;
          left: 0;
          width: 100%;
          height: 40px;
          opacity: 0.8;
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
            top: 60px;
            height: 30px;
          }
          
          .header-graphics svg {
            min-width: 768px;
            height: 30px;
          }
        }

        @media (max-width: 480px) {
          .header-graphics {
            top: 55px;
            height: 25px;
          }
          
          .header-graphics svg {
            min-width: 480px;
            height: 25px;
          }
        }
      `}</style>
    </div>
  );
};

export default SeasonalDecorations;