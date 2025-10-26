// components/SeasonalParticles.js - CON TU FLOR DE CEMPASÚCHIL
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

    // CONFIGURACIÓN OPTIMIZADA
    const particleConfig = {
      count: window.innerWidth < 768 ? 8 : 15, // Menos partículas para mejor rendimiento
      maxSize: window.innerWidth < 768 ? 12 : 20,
      minSize: window.innerWidth < 768 ? 6 : 10,
      baseSpeed: 0.15, // Movimiento más lento
      turbulence: 0.08,
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class CempasuchilParticle {
      constructor() {
        this.reset();
        // Colores de tu SVG - simplificados
        this.colors = {
          petal: '#F79225',    // Naranja principal
          center: '#FBD721',    // Amarillo centro
          accent: '#EE6C24',    // Naranja oscuro
          detail: '#B75026'     // Marrón detalles
        };
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = particleConfig.minSize + Math.random() * (particleConfig.maxSize - particleConfig.minSize);
        this.speedX = (Math.random() - 0.5) * particleConfig.baseSpeed;
        this.speedY = (Math.random() - 0.5) * particleConfig.baseSpeed;
        this.opacity = 0.2 + Math.random() * 0.3; // Más transparente
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.005; // Rotación más lenta
        this.pulsePhase = Math.random() * Math.PI * 2;
      }

      update(time) {
        const t = time * 0.001;

        // MOVIMIENTO FLOTANTE SUAVE
        this.x += this.speedX + Math.sin(t * 0.1 + this.y * 0.003) * particleConfig.turbulence;
        this.y += this.speedY + Math.cos(t * 0.1 + this.x * 0.003) * particleConfig.turbulence;

        this.rotation += this.rotationSpeed;
        this.pulsePhase += 0.015; // Pulso más lento
        this.currentOpacity = this.opacity * (0.7 + Math.sin(this.pulsePhase) * 0.3);

        // REINICIO SUAVE EN BORDES
        const margin = 100;
        if (this.x < -margin || this.x > canvas.width + margin || 
            this.y < -margin || this.y > canvas.height + margin) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this.currentOpacity;

        // =============================================
        // 🌼 FLOR DE CEMPASÚCHIL SIMPLIFICADA
        // Basada en tu SVG pero optimizada para rendimiento
        // =============================================
        this.drawSimplifiedCempasuchil();

        ctx.restore();
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
          
          // Detalle del pétalo (opcional - comentar si afecta rendimiento)
          ctx.strokeStyle = this.colors.accent;
          ctx.lineWidth = 0.8 * scale;
          ctx.beginPath();
          ctx.moveTo(centerRadius, 0);
          ctx.lineTo(petalLength * 0.9, 0);
          ctx.stroke();
          
          ctx.restore();
        }

        // DETALLES INTERIORES (opcional)
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
      
      // Limpiar canvas sin trail
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Fondo casi transparente
      ctx.fillStyle = 'rgba(10, 10, 18, 0.02)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update(currentTime);
        particle.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    // Inicializar
    resizeCanvas();
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