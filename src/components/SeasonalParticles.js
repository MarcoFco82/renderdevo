// components/SeasonalParticles.js - SIN TRAIL Y SIN PIXELACIÓN
'use client';
import { useEffect, useRef } from 'react';

const SeasonalParticles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    // CONFIGURACIÓN CON GLOW Y LAYER NEGRO AJUSTABLE
    const particleConfig = {
      count: window.innerWidth < 768 ? 8 : 15,
      maxSize: window.innerWidth < 768 ? 24 : 40,
      minSize: window.innerWidth < 768 ? 12 : 20,
      baseSpeed: 0.15,
      turbulence: 0.08,
      glow: {
        intensity: 0.8,
        blur: 15,
        color: 'rgba(247, 146, 37, 0.6)',
        innerGlow: 0.3
      },
      blackLayer: {
        opacity: 0.7,
        color: 'rgba(10, 10, 18, 1)'
      }
    };

    // 🚀 OPTIMIZAR CANVAS PARA RETINA
    const optimizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      
      ctx.scale(dpr, dpr);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
    };

    const resizeCanvas = () => {
      optimizeCanvas();
    };

    class CempasuchilParticle {
      constructor() {
        this.reset();
        this.colors = {
          petal: '#F79225',
          center: '#FBD721',
          accent: '#EE6C24',
          detail: '#B75026'
        };
      }

      reset() {
        const rect = canvas.getBoundingClientRect();
        this.x = Math.random() * rect.width;
        this.y = Math.random() * rect.height;
        this.size = particleConfig.minSize + Math.random() * (particleConfig.maxSize - particleConfig.minSize);
        this.speedX = (Math.random() - 0.5) * particleConfig.baseSpeed;
        this.speedY = (Math.random() - 0.5) * particleConfig.baseSpeed;
        this.opacity = 0.2 + Math.random() * 0.3;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.005;
        this.pulsePhase = Math.random() * Math.PI * 2;
        this.glowPulse = Math.random() * Math.PI * 2;
      }

      update(time) {
        const t = time * 0.001;
        const rect = canvas.getBoundingClientRect();

        this.x += this.speedX + Math.sin(t * 0.1 + this.y * 0.003) * particleConfig.turbulence;
        this.y += this.speedY + Math.cos(t * 0.1 + this.x * 0.003) * particleConfig.turbulence;

        this.rotation += this.rotationSpeed;
        this.pulsePhase += 0.015;
        this.glowPulse += 0.02;
        
        this.currentOpacity = this.opacity * (0.7 + Math.sin(this.pulsePhase) * 0.3);
        this.currentGlowIntensity = particleConfig.glow.intensity * (0.8 + Math.sin(this.glowPulse) * 0.2);

        // REINICIO SUAVE EN BORDES (usando dimensiones CSS)
        const margin = 100;
        if (this.x < -margin || this.x > rect.width + margin || 
            this.y < -margin || this.y > rect.height + margin) {
          this.reset();
          this.x = Math.random() * rect.width;
          this.y = Math.random() * rect.height;
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        // ✨ APLICAR EFECTO GLOW
        this.applyGlowEffect();
        
        // Dibujar la flor con opacidad normal
        ctx.globalAlpha = this.currentOpacity;
        this.drawSimplifiedCempasuchil();

        ctx.restore();
      }

      applyGlowEffect() {
        // Crear un gradiente radial para el glow
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size * 1.5);
        gradient.addColorStop(0, particleConfig.glow.color.replace('0.6', this.currentGlowIntensity.toString()));
        gradient.addColorStop(0.5, particleConfig.glow.color.replace('0.6', (this.currentGlowIntensity * 0.5).toString()));
        gradient.addColorStop(1, 'transparent');

        // Aplicar filtro de desenfoque
        ctx.filter = `blur(${particleConfig.glow.blur}px)`;
        
        // Dibujar el glow
        ctx.globalAlpha = this.currentGlowIntensity * 0.8;
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(0, 0, this.size * 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Resetear el filtro para el dibujo principal
        ctx.filter = 'none';
        
        // Glow interior sutil
        if (particleConfig.glow.innerGlow > 0) {
          const innerGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size * 0.8);
          innerGradient.addColorStop(0, 'rgba(255, 255, 255, ' + (particleConfig.glow.innerGlow * 0.3) + ')');
          innerGradient.addColorStop(1, 'transparent');
          
          ctx.globalAlpha = particleConfig.glow.innerGlow * 0.5;
          ctx.fillStyle = innerGradient;
          ctx.beginPath();
          ctx.arc(0, 0, this.size * 0.8, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      drawSimplifiedCempasuchil() {
        const scale = this.size / 30;
        const centerRadius = 4 * scale;
        const petalCount = 12;
        const petalLength = 10 * scale;
        const petalWidth = 4 * scale;

        // CENTRO AMARILLO
        ctx.fillStyle = this.colors.center;
        ctx.beginPath();
        ctx.arc(0, 0, centerRadius, 0, Math.PI * 2);
        ctx.fill();

        // PÉTALOS NARANJAS
        ctx.fillStyle = this.colors.petal;
        for (let i = 0; i < petalCount; i++) {
          ctx.save();
          const angle = (i * Math.PI * 2) / petalCount;
          ctx.rotate(angle);
          
          // Forma de pétalo ovalado
          ctx.beginPath();
          ctx.ellipse(petalLength * 0.7, 0, petalLength * 0.5, petalWidth, 0, 0, Math.PI * 2);
          ctx.fill();
          
          // Detalle del pétalo
          ctx.strokeStyle = this.colors.accent;
          ctx.lineWidth = 0.8 * scale;
          ctx.beginPath();
          ctx.moveTo(centerRadius, 0);
          ctx.lineTo(petalLength * 0.9, 0);
          ctx.stroke();
          
          ctx.restore();
        }

        // DETALLES INTERIORES
        ctx.fillStyle = this.colors.detail;
        ctx.beginPath();
        ctx.arc(0, 0, centerRadius * 0.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleConfig.count; i++) {
        particles.push(new CempasuchilParticle());
      }
    };

    let startTime = Date.now();
    
    const animate = () => {
      const currentTime = Date.now() - startTime;
      const rect = canvas.getBoundingClientRect();
      
      // 🚀 LIMPIAR COMPLETAMENTE EL CANVAS - SIN TRAIL
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // ⚫ LAYER NEGRO CON OPACIDAD AJUSTABLE
      ctx.fillStyle = particleConfig.blackLayer.color;
      ctx.globalAlpha = particleConfig.blackLayer.opacity;
      ctx.fillRect(0, 0, rect.width, rect.height);
      
      // Resetear alpha para las partículas
      ctx.globalAlpha = 1.0;
      
      particles.forEach(particle => {
        particle.update(currentTime);
        particle.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    // Inicializar
    optimizeCanvas(); // Usar optimizeCanvas en lugar de resizeCanvas para la primera carga
    initParticles();
    animate();

    // Cleanup
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
        zIndex: 2,
        pointerEvents: 'none'
      }}
    />
  );
};

export default SeasonalParticles;