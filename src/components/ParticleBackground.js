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

    // Configuración - HOJAS EN EL VIENTO
    const particleConfig = {
      count: 18,
      size: 45,
      color: 'var(--color-primary)',
      opacity: 0.12,
      
      // VIENTO PRINCIPAL - dirección y fuerza base
      windBaseSpeed: 0.8,
      windDirection: Math.PI * 0.1, // Angulo en radianes (aprox 18°)
      
      // TURBULENCIA - variaciones del viento
      turbulenceSpeed: 0.3,
      turbulenceScale: 0.02,
      
      // FLOTACIÓN - movimiento orgánico adicional
      floatSpeed: 0.15,
      floatScale: 0.005,
      
      // ROTACIÓN NATURAL
      rotationSpeed: 0.008,
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class WindParticle {
      constructor() {
        this.reset();
        this.timeOffset = Math.random() * 1000; // Para desfasar animaciones
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * particleConfig.rotationSpeed;
        this.opacity = Math.random() * particleConfig.opacity + 0.05;
        this.scale = 0.8 + Math.random() * 0.4; // Variación de tamaño
      }

      update(time) {
        const t = time * 0.001 + this.timeOffset;
        
        // VIENTO PRINCIPAL - dirección constante con fuerza variable
        const windStrength = particleConfig.windBaseSpeed * (0.8 + Math.sin(t * 0.3) * 0.2);
        
        // TURBULENCIA - movimiento lateral orgánico
        const turbulenceX = Math.sin(t * 1.7) * particleConfig.turbulenceSpeed;
        const turbulenceY = Math.cos(t * 1.3) * particleConfig.turbulenceSpeed * 0.5;
        
        // FLOTACIÓN - movimiento suave vertical
        const floatY = Math.sin(t * 0.5 + this.x * particleConfig.floatScale) * particleConfig.floatSpeed;
        
        // MOVIMIENTO COMBINADO
        this.x += Math.cos(particleConfig.windDirection) * windStrength + turbulenceX;
        this.y += Math.sin(particleConfig.windDirection) * windStrength * 0.3 + turbulenceY + floatY;
        
        // ROTACIÓN influenciada por el movimiento
        this.rotation += this.rotationSpeed + (turbulenceX * 0.01);
        
        // REINICIAR si sale completamente de pantalla
        const margin = 100;
        if (this.x < -margin) this.x = canvas.width + margin;
        if (this.x > canvas.width + margin) this.x = -margin;
        if (this.y < -margin) this.y = canvas.height + margin;
        if (this.y > canvas.height + margin) this.y = -margin;
        
        // OPACIDAD variable sutil
        this.currentOpacity = this.opacity * (0.7 + Math.sin(t * 0.4) * 0.3);
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.scale(this.scale, this.scale);
        
        ctx.globalAlpha = this.currentOpacity;
        ctx.fillStyle = particleConfig.color;
        
        // FORMA DE HOJA/DIAMANTE elegante (más interesante que cuadrado simple)
        ctx.beginPath();
        ctx.moveTo(0, -particleConfig.size / 2);
        ctx.lineTo(particleConfig.size / 2, 0);
        ctx.lineTo(0, particleConfig.size / 2);
        ctx.lineTo(-particleConfig.size / 2, 0);
        ctx.closePath();
        ctx.fill();
        
        ctx.restore();
      }
    }

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleConfig.count; i++) {
        particles.push(new WindParticle());
      }
    };

    let startTime = Date.now();
    
    const animate = () => {
      const currentTime = Date.now() - startTime;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
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
    zIndex: 0,  // ← FONDO
    pointerEvents: 'none'
  }}
/>
  );
};

export default ParticleBackground;