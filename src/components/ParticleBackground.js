// src/components/ParticleBackground.js
'use client';

import { useEffect, useRef } from 'react';
import './ParticleBackground.css';

const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    // DETECTAR SI ES MÓVIL
    const isMobile = window.innerWidth < 768;

    // CONFIGURACIÓN - GEOMETRÍAS FUTURISTAS (RESPONSIVE)
    const particleConfig = {
      count: isMobile ? 4 : 8, // ← SOLO ESTE CAMBIO: menos partículas en móvil
      maxSize: isMobile ? 600 : 1135, // ← SOLO ESTE CAMBIO: más pequeñas en móvil
      minSize: isMobile ? 300 : 2015, // ← SOLO ESTE CAMBIO: más pequeñas en móvil
      
      // COLORES DE LA PALETA (MISMO QUE ORIGINAL)
      primaryColor: '#3d6eff',    // Cian eléctrico
      secondaryColor: '#2e2d5f',  // Magenta neón
      tertiaryColor: '#ff5c8d',   // Púrpura holográfico
      
      // MOVIMIENTO EN PLANOS 3D (MISMO QUE ORIGINAL)
      baseSpeed: 0.2,
      turbulence: 0.2,
      floatAmplitude: 0.4,
      
      // ROTACIÓN Y ESCALA (MISMO QUE ORIGINAL)
      rotationSpeed: 0.001,
      pulseSpeed: 0.001,
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class GeometricParticle {
      constructor() {
        this.reset();
        this.timeOffset = Math.random() * 1000;
        this.shapeType = Math.floor(Math.random() * 3); // 0: triángulo, 1: rombo, 2: hexágono
        this.color = this.getRandomColor();
      }

      getRandomColor() {
        const colors = [
          particleConfig.primaryColor,
          particleConfig.secondaryColor, 
          particleConfig.tertiaryColor
        ];
        return colors[Math.floor(Math.random() * colors.length)];
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = particleConfig.minSize + Math.random() * (particleConfig.maxSize - particleConfig.minSize);
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * particleConfig.rotationSpeed;
        this.opacity = 0.1 + Math.random() * 0.15;
        this.pulsePhase = Math.random() * Math.PI * 2;
        this.speedX = (Math.random() - 0.5) * particleConfig.baseSpeed;
        this.speedY = (Math.random() - 0.5) * particleConfig.baseSpeed;
        
        // INICIAR CON FADE IN
        this.fadeInProgress = true;
        this.fadeValue = 0;
      }

      update(time) {
        const t = time * 0.001 + this.timeOffset;
        
        // MOVIMIENTO BASE + TURBULENCIA
        this.x += this.speedX + Math.sin(t * 0.9) * particleConfig.turbulence;
        this.y += this.speedY + Math.cos(t * 0.9) * particleConfig.turbulence * 0.5;
        
        // FLOTACIÓN ORGÁNICA
        this.y += Math.sin(t * 0.4 + this.x * 0.003) * particleConfig.floatAmplitude;
        
        // ROTACIÓN
        this.rotation += this.rotationSpeed;
        
        // PULSO DE OPACIDAD Y ESCALA
        this.pulsePhase += particleConfig.pulseSpeed;
        this.currentOpacity = this.opacity * (0.7 + Math.sin(this.pulsePhase) * 0.3);
        this.currentScale = 0.8 + Math.sin(this.pulsePhase * 1.5) * 0.2;
      
        // FADE IN/FADE OUT CUANDO ESTÁ CERCA DE LOS BORDES
        const fadeMargin = 200; // Márgenes más grandes para fade suave
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        
        // CALCULAR FADE EN BORDES
        let edgeFade = 1.0;
        
        // FADE EN BORDES IZQUIERDO Y DERECHO
        if (this.x < fadeMargin) {
          edgeFade = this.x / fadeMargin;
        } else if (this.x > canvasWidth - fadeMargin) {
          edgeFade = (canvasWidth - this.x) / fadeMargin;
        }
        
        // FADE EN BORDES SUPERIOR E INFERIOR
        if (this.y < fadeMargin) {
          edgeFade = Math.min(edgeFade, this.y / fadeMargin);
        } else if (this.y > canvasHeight - fadeMargin) {
          edgeFade = Math.min(edgeFade, (canvasHeight - this.y) / fadeMargin);
        }
        
        // APLICAR FADE A LA OPACIDAD FINAL
        this.currentOpacity *= edgeFade;
      
        // REINICIAR SI SALE COMPLETAMENTE DE PANTALLA (CON FADE COMPLETO)
        const resetMargin = 50;
        if (this.x < -resetMargin || this.x > canvasWidth + resetMargin || 
            this.y < -resetMargin || this.y > canvasHeight + resetMargin) {
          this.reset();
          // INICIAR CON FADE IN
          this.fadeInProgress = true;
          this.fadeValue = 0;
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.scale(this.currentScale, this.currentScale);
        
        ctx.globalAlpha = this.currentOpacity;
        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 1.5;

        // DIBUJAR FORMA GEOMÉTRICA SEGÚN TIPO
        switch(this.shapeType) {
          case 0: // TRIÁNGULO
            this.drawTriangle();
            break;
          case 1: // ROMBO
            this.drawDiamond();
            break;
          case 2: // HEXÁGONO
            this.drawHexagon();
            break;
        }
        
        ctx.restore();
      }

      drawTriangle() {
        const size = this.size;
        ctx.beginPath();
        ctx.moveTo(0, -size / 2);
        ctx.lineTo(size / 2, size / 2);
        ctx.lineTo(-size / 2, size / 2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }

      drawDiamond() {
        const size = this.size;
        ctx.beginPath();
        ctx.moveTo(0, -size / 2);
        ctx.lineTo(size / 2, 0);
        ctx.lineTo(0, size / 2);
        ctx.lineTo(-size / 2, 0);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }

      drawHexagon() {
        const size = this.size;
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const angle = (i * Math.PI) / 3;
          const x = Math.cos(angle) * size / 2;
          const y = Math.sin(angle) * size / 2;
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }
    }

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleConfig.count; i++) {
        particles.push(new GeometricParticle());
      }
    };

    let startTime = Date.now();
    
    const animate = () => {
      const currentTime = Date.now() - startTime;
      
      // FONDO CON DEGRADADO SUTIL
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2
      );
      gradient.addColorStop(0, 'rgba(10, 10, 18, 0.1)');
      gradient.addColorStop(1, 'rgba(26, 26, 46, 0.3)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update(currentTime);
        particle.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    initParticles();
    animate();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none'
      }}
    />
  );
};

export default ParticleBackground;