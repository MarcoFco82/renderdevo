// components/DiaDeMuertosDecorations.js
'use client';
import { useEffect, useState } from 'react';
import { CURRENT_SEASON } from '@/lib/seasonal-config';

const DiaDeMuertosDecorations = () => {
  const [showDecorations, setShowDecorations] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setShowDecorations(CURRENT_SEASON === 'halloween');
  }, []);

  if (!showDecorations || !isMounted) return null;

  return (
    <div className="dia-de-muertos-decorations">
      {/* ESQUINAS SUPERIORES */}
      <div className="corner-element top-left">
        <img 
          src="/seasonal/dia-de-muertos/elements/corners/top-left.svg" 
          alt="Decoración cempasúchil"
          onError={(e) => {
            console.log('Error loading top-left.svg');
            e.target.style.display = 'none';
          }}
        />
      </div>
      
      <div className="corner-element top-right">
        <img 
          src="/seasonal/dia-de-muertos/elements/corners/top-right.svg" 
          alt="Decoración calavera"
          onError={(e) => {
            console.log('Error loading top-right.svg');
            e.target.style.display = 'none';
          }}
        />
      </div>

      {/* BORDE HEADER */}
      <div className="header-border">
        <img 
          src="/seasonal/dia-de-muertos/elements/borders/header-border.svg" 
          alt="Patrón papel picado"
          onError={(e) => {
            console.log('Error loading header-border.svg');
            e.target.style.display = 'none';
          }}
        />
      </div>

      {/* ACENTOS FLOTANTES */}
      <div className="floating-accent butterfly-1">
        <img 
          src="/seasonal/dia-de-muertos/elements/accents/monarch-butterfly.svg" 
          alt="Mariposa monarca"
          onError={(e) => {
            console.log('Error loading monarch-butterfly.svg');
            e.target.style.display = 'none';
          }}
        />
      </div>
      
      <div className="floating-accent butterfly-2">
        <img 
          src="/seasonal/dia-de-muertos/elements/accents/monarch-butterfly.svg" 
          alt="Mariposa monarca"
          onError={(e) => {
            console.log('Error loading monarch-butterfly.svg');
            e.target.style.display = 'none';
          }}
        />
      </div>

      <style jsx>{`
        .dia-de-muertos-decorations {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 5;
        }

        .corner-element {
          position: absolute;
          width: 80px;
          height: 80px;
          opacity: 1;
          background: red;
        }

        .top-left {
          top: 0;
          left: 0;
        }

        .top-right {
          top: 0;
          right: 0;
        }

        .corner-element img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .header-border {
          position: absolute;
          top: 70px;
          left: 0;
          width: 100%;
          height: 30px;
          opacity: 0.6;
        }

        .header-border img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .floating-accent {
          position: absolute;
          width: 40px;
          height: 40px;
          opacity: 0.7;
          animation: floatButterfly 15s infinite ease-in-out;
        }

        .floating-accent img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .butterfly-1 {
          top: 20%;
          left: 10%;
          animation-delay: 0s;
        }

        .butterfly-2 {
          top: 30%;
          right: 15%;
          animation-delay: 7s;
        }

        @keyframes floatButterfly {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-20px) rotate(5deg);
          }
          50% {
            transform: translateY(-10px) rotate(-3deg);
          }
          75% {
            transform: translateY(-15px) rotate(2deg);
          }
        }

        @media (max-width: 768px) {
          .corner-element {
            width: 60px;
            height: 60px;
          }

          .floating-accent {
            width: 30px;
            height: 30px;
          }

          .header-border {
            top: 60px;
            height: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default DiaDeMuertosDecorations;