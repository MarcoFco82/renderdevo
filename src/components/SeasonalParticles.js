// components/SeasonalParticles.js - FLOATING TECH PARTICLES
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

    // CONFIGURACIÓN FLOTANTE SUAVE
    const particleConfig = {
      count: window.innerWidth < 768 ? 15 : 25,
      maxSize: window.innerWidth < 768 ? 10 : 12,
      minSize: window.innerWidth < 768 ? 4 : 6,
      baseSpeed: 0.6,
      windStrength: 1.0,
      turbulence: 0.05,
      glow: {
        intensity: 0.8,
        blur: 15,
        cyan: 'rgba(0, 245, 255, 0.6)',
        magenta: 'rgba(255, 0, 255, 0.5)',
        purple: 'rgba(138, 43, 226, 0.4)',
        white: 'rgba(255, 255, 255, 0.3)'
      },
      blackLayer: {
        opacity: 0.0,
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

    // Definir colores primero
    const PARTICLE_COLORS = {
      cyan: '#00f5ff',
      magenta: '##ffffff', 
      purple: '##6efcff',
      white: '#ffffff'
    };

    class FloatingParticle {
      constructor() {
        // Inicializar propiedades primero
        this.colors = PARTICLE_COLORS;
        this.type = Math.floor(Math.random() * 4); // 0: Triangle, 1: Circle, 2: Square, 3: Hexagon
        
        // Variables de viento
        this.windX = (Math.random() - 0.5) * particleConfig.windStrength;
        this.windY = (Math.random() - 0.5) * particleConfig.windStrength;
        this.windChangeTimer = 0;
        this.windChangeInterval = 60 + Math.random() * 120;
        
        // Llamar reset después de inicializar todo
        this.reset();
      }

      reset() {
        const rect = canvas.getBoundingClientRect();
        this.x = Math.random() * rect.width;
        this.y = Math.random() * rect.height;
        this.size = particleConfig.minSize + Math.random() * (particleConfig.maxSize - particleConfig.minSize);
        this.speedX = (Math.random() - 0.5) * particleConfig.baseSpeed;
        this.speedY = (Math.random() - 0.5) * particleConfig.baseSpeed;
        this.opacity = 0.2 + Math.random() * 0.4;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.01;
        this.pulsePhase = Math.random() * Math.PI * 2;
        this.glowPulse = Math.random() * Math.PI * 2;
        
        // Asignar color basado en tipo - ahora this.colors está definido
        if (this.type === 0) this.color = this.colors.cyan;
        else if (this.type === 1) this.color = this.colors.magenta;
        else if (this.type === 2) this.color = this.colors.purple;
        else this.color = this.colors.white;
        
        this.glowColor = this.getGlowColor();
      }

      getGlowColor() {
        if (this.color === this.colors.cyan) return particleConfig.glow.cyan;
        if (this.color === this.colors.magenta) return particleConfig.glow.magenta;
        if (this.color === this.colors.purple) return particleConfig.glow.purple;
        return particleConfig.glow.white;
      }

      updateWind(time) {
        this.windChangeTimer++;
        
        if (this.windChangeTimer >= this.windChangeInterval) {
          // Cambiar dirección del viento suavemente
          this.windX += (Math.random() - 0.5) * particleConfig.windStrength * 0.5;
          this.windY += (Math.random() - 0.5) * particleConfig.windStrength * 0.5;
          
          // Limitar fuerza del viento
          const windForce = Math.sqrt(this.windX * this.windX + this.windY * this.windY);
          if (windForce > particleConfig.windStrength * 2) {
            this.windX *= 0.8;
            this.windY *= 0.8;
          }
          
          this.windChangeTimer = 0;
          this.windChangeInterval = 60 + Math.random() * 120;
        }
      }

      update(time) {
        const t = time * 0.001;
        const rect = canvas.getBoundingClientRect();

        // Actualizar viento
        this.updateWind(time);

        // Movimiento con viento y turbulencia
        this.x += this.speedX + this.windX + Math.sin(t * 0.2 + this.y * 0.001) * particleConfig.turbulence;
        this.y += this.speedY + this.windY + Math.cos(t * 0.2 + this.x * 0.001) * particleConfig.turbulence;

        // Rotación suave
        this.rotation += this.rotationSpeed;
        this.pulsePhase += 0.01;
        this.glowPulse += 0.015;
        
        this.currentOpacity = this.opacity * (0.6 + Math.sin(this.pulsePhase) * 0.4);
        this.currentGlowIntensity = particleConfig.glow.intensity * (0.7 + Math.sin(this.glowPulse) * 0.3);

        // REINICIO SUAVE EN BORDES
        const margin = 150;
        if (this.x < -margin || this.x > rect.width + margin || 
            this.y < -margin || this.y > rect.height + margin) {
          this.reset();
          // Aparecer desde el lado opuesto
          if (this.x < -margin) this.x = rect.width + margin;
          else if (this.x > rect.width + margin) this.x = -margin;
          if (this.y < -margin) this.y = rect.height + margin;
          else if (this.y > rect.height + margin) this.y = -margin;
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        // ✨ APLICAR EFECTO GLOW
        this.applyGlowEffect();
        
        // Dibujar la geometría simple
        ctx.globalAlpha = this.currentOpacity;
        this.drawSimpleShape();

        ctx.restore();
      }

      applyGlowEffect() {
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size * 1.8);
        gradient.addColorStop(0, this.glowColor.replace(/[\d\.]+\)$/, this.currentGlowIntensity + ')'));
        gradient.addColorStop(0.7, this.glowColor.replace(/[\d\.]+\)$/, (this.currentGlowIntensity * 0.2) + ')'));
        gradient.addColorStop(1, 'transparent');

        ctx.filter = `blur(${particleConfig.glow.blur}px)`;
        ctx.globalAlpha = this.currentGlowIntensity * 0.5;
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(0, 0, this.size * 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.filter = 'none';
      }

      drawSimpleShape() {
        ctx.fillStyle = this.color;
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1;

        switch(this.type) {
          case 0: // TRIANGLE
            ctx.beginPath();
            ctx.moveTo(0, -this.size);
            ctx.lineTo(this.size * 0.9, this.size * 0.6);
            ctx.lineTo(-this.size * 0.9, this.size * 0.6);
            ctx.closePath();
            ctx.fill();
            break;

          case 1: // CIRCLE
            ctx.beginPath();
            ctx.arc(0, 0, this.size * 0.8, 0, Math.PI * 2);
            ctx.fill();
            break;

          case 2: // SQUARE
            ctx.beginPath();
            ctx.rect(-this.size * 0.7, -this.size * 0.7, this.size * 1.4, this.size * 1.4);
            ctx.fill();
            break;

          case 3: // HEXAGON
            ctx.beginPath();
            for (let i = 0; i < 6; i++) {
              const angle = (i * Math.PI) / 3;
              const x = Math.cos(angle) * this.size * 0.8;
              const y = Math.sin(angle) * this.size * 0.8;
              if (i === 0) ctx.moveTo(x, y);
              else ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.fill();
            break;
        }
      }
    }

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleConfig.count; i++) {
        particles.push(new FloatingParticle());
      }
    };

    let startTime = Date.now();
    
    const animate = () => {
      const currentTime = Date.now() - startTime;
      const rect = canvas.getBoundingClientRect();
      
      // 🚀 LIMPIAR COMPLETAMENTE EL CANVAS
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // ⚫ LAYER NEGRO
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
    optimizeCanvas();
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