// components/SeasonalDecorations.js - PATTERN FLOR Y VELA AJUSTADO
'use client';
import { useEffect, useState } from 'react';

const SeasonalDecorations = () => {
  const [isMounted, setIsMounted] = useState(false);

  // PATTERN CENTRADO - Flor de Cempasúchil + Velita (TAMAÑOS AJUSTADOS)
  const headerGraphics = `
    <svg width="100%" height="40" viewBox="0 0 1200 40" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMin meet">
      <defs>
        <pattern id="flowerCandlePattern" x="0" y="0" width="80" height="40" patternUnits="userSpaceOnUse">
          <!-- Flor de Cempasúchil CON PÉTALOS 20% MÁS PEQUEÑOS -->
          <g transform="translate(20, 20)">
            <!-- Centro de la flor -->
            <circle cx="0" cy="0" r="4" fill="#D35400" stroke="#B03A2E" stroke-width="0.5"/>
            
            <!-- 12 PÉTALOS 20% MÁS PEQUEÑOS -->
            <g fill="#FF8C00" stroke="#E67E22" stroke-width="0.3">
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
            
            <!-- Detalles del centro -->
            <circle cx="0" cy="0" r="1.5" fill="#F39C12"/>
          </g>

          <!-- VELITA MÁS ALTA Y MÁS GORDA -->
          <g transform="translate(60, 20)">
            <!-- Llama -->
            <circle cx="0" cy="-11" r="3" fill="#FFD700"/>
            <path d="M-2,-11 L2,-11 L0,-14 Z" fill="#FF6B00"/>
            <!-- Vela (más alta y ancha) -->
            <rect x="-3.5" y="-8" width="7" height="16" fill="#FFFFFF" stroke="#FF8C00" stroke-width="0.5"/>
            <!-- Base (más ancha) -->
            <rect x="-4.5" y="8" width="9" height="2" fill="#8A2BE2"/>
          </g>
        </pattern>
      </defs>

      <!-- FONDO INVISIBLE QUE OCUPA TODO EL ANCHO -->
      <rect width="100%" height="40" fill="rgba(26,26,46,0.1)"/>
      
      <!-- CONTENEDOR CENTRADO CON MÁRGENES -->
      <g transform="translate(0, 0)">
        <!-- PATTERN QUE COMIENZA DESDE -600 (IZQUIERDA) HASTA +600 (DERECHA) -->
        <rect x="-600" width="2400" height="40" fill="url(#flowerCandlePattern)" opacity="0.8"/>
      </g>
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