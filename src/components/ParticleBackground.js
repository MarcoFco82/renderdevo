// src/components/ParticleBackground.js
'use client';

import { useEffect, useRef } from 'react';
import './ParticleBackground.css';

const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    // Obtener colores de CSS una sola vez
    const root = document.documentElement;
    const style = getComputedStyle(root);
    const colorPalette = [
      style.getPropertyValue('--color-electric-cyan').trim() || '#00f5ff',
      style.getPropertyValue('--color-neon-magenta').trim() || '#ff00ff',
      style.getPropertyValue('--color-holographic').trim() || '#8a2be2'
    ];

    const isMobile = window.innerWidth < 768;

    // Configuración
    const config = {
      count: isMobile ? 6 : 10,
      minSize: isMobile ? 300 : 800,
      maxSize: isMobile ? 600 : 1200,
      baseSpeed: 0.15,
      turbulence: 0.15,
      floatAmplitude: 0.3,
      rotationSpeed: 0.0008,
      pulseSpeed: 0.0008,
      fadeMargin: 250,
      fadeInSpeed: 0.008,
      fadeOutSpeed: 0.015
    };

    // Pre-calcular vértices de hexágono (evita Math.cos/sin en cada frame)
    const hexVertices = [];
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3;
      hexVertices.push({ x: Math.cos(angle) * 0.5, y: Math.sin(angle) * 0.5 });
    }

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Partícula como objeto simple (más eficiente que clase)
    const createParticle = (initialFade = false) => {
      const shapeType = Math.floor(Math.random() * 3);
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: config.minSize + Math.random() * (config.maxSize - config.minSize),
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * config.rotationSpeed,
        baseOpacity: 0.08 + Math.random() * 0.12,
        pulsePhase: Math.random() * Math.PI * 2,
        speedX: (Math.random() - 0.5) * config.baseSpeed,
        speedY: (Math.random() - 0.5) * config.baseSpeed,
        timeOffset: Math.random() * 1000,
        shapeType,
        color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
        // Sistema de fade mejorado
        fadeIn: initialFade ? 0 : 1,
        fadeOut: 1,
        isExiting: false
      };
    };

    const resetParticle = (p) => {
      // Elegir un borde aleatorio para entrar
      const edge = Math.floor(Math.random() * 4);
      const margin = config.fadeMargin + 50;
      
      switch (edge) {
        case 0: // arriba
          p.x = Math.random() * canvas.width;
          p.y = -margin;
          p.speedY = Math.abs(p.speedY) || config.baseSpeed * 0.5;
          break;
        case 1: // derecha
          p.x = canvas.width + margin;
          p.y = Math.random() * canvas.height;
          p.speedX = -Math.abs(p.speedX) || -config.baseSpeed * 0.5;
          break;
        case 2: // abajo
          p.x = Math.random() * canvas.width;
          p.y = canvas.height + margin;
          p.speedY = -Math.abs(p.speedY) || -config.baseSpeed * 0.5;
          break;
        case 3: // izquierda
          p.x = -margin;
          p.y = Math.random() * canvas.height;
          p.speedX = Math.abs(p.speedX) || config.baseSpeed * 0.5;
          break;
      }
      
      p.size = config.minSize + Math.random() * (config.maxSize - config.minSize);
      p.rotation = Math.random() * Math.PI * 2;
      p.color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      p.shapeType = Math.floor(Math.random() * 3);
      p.fadeIn = 0;
      p.fadeOut = 1;
      p.isExiting = false;
    };

    const updateParticle = (p, time) => {
      const t = time * 0.001 + p.timeOffset;
      
      // Movimiento suave
      p.x += p.speedX + Math.sin(t * 0.7) * config.turbulence;
      p.y += p.speedY + Math.cos(t * 0.7) * config.turbulence * 0.5;
      p.y += Math.sin(t * 0.3 + p.x * 0.002) * config.floatAmplitude;
      
      // Rotación y pulso
      p.rotation += p.rotationSpeed;
      p.pulsePhase += config.pulseSpeed;
      
      const pulseFactor = 0.8 + Math.sin(p.pulsePhase) * 0.2;
      const scaleFactor = 0.9 + Math.sin(p.pulsePhase * 1.3) * 0.1;
      
      // Fade in gradual
      if (p.fadeIn < 1) {
        p.fadeIn = Math.min(1, p.fadeIn + config.fadeInSpeed);
      }
      
      // Calcular distancia a bordes
      const distToLeft = p.x + config.fadeMargin;
      const distToRight = canvas.width - p.x + config.fadeMargin;
      const distToTop = p.y + config.fadeMargin;
      const distToBottom = canvas.height - p.y + config.fadeMargin;
      
      // Detectar si está saliendo (más allá del margen visible)
      const exitThreshold = config.fadeMargin * 0.3;
      if (distToLeft < exitThreshold || distToRight < exitThreshold || 
          distToTop < exitThreshold || distToBottom < exitThreshold) {
        p.isExiting = true;
      }
      
      // Fade out cuando está saliendo
      if (p.isExiting) {
        p.fadeOut = Math.max(0, p.fadeOut - config.fadeOutSpeed);
      } else {
        // Fade suave cerca de bordes (pero no tan agresivo)
        const edgeFade = Math.min(
          Math.min(distToLeft, distToRight) / config.fadeMargin,
          Math.min(distToTop, distToBottom) / config.fadeMargin
        );
        p.fadeOut = Math.min(1, Math.max(0.3, edgeFade));
      }
      
      // Opacidad final combinada
      p.currentOpacity = p.baseOpacity * pulseFactor * p.fadeIn * p.fadeOut;
      p.currentScale = scaleFactor;
      
      // Reset cuando fade out completo y fuera de pantalla
      const resetMargin = config.fadeMargin + 100;
      if (p.fadeOut <= 0 || 
          p.x < -resetMargin || p.x > canvas.width + resetMargin ||
          p.y < -resetMargin || p.y > canvas.height + resetMargin) {
        resetParticle(p);
      }
    };

    const drawParticle = (p) => {
      if (p.currentOpacity < 0.01) return;
      
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.scale(p.currentScale, p.currentScale);
      ctx.globalAlpha = p.currentOpacity;
      ctx.fillStyle = p.color;
      ctx.strokeStyle = p.color;
      ctx.lineWidth = 1.5;
      
      const halfSize = p.size * 0.5;
      
      ctx.beginPath();
      
      switch (p.shapeType) {
        case 0: // Triángulo
          ctx.moveTo(0, -halfSize);
          ctx.lineTo(halfSize, halfSize);
          ctx.lineTo(-halfSize, halfSize);
          break;
        case 1: // Rombo
          ctx.moveTo(0, -halfSize);
          ctx.lineTo(halfSize, 0);
          ctx.lineTo(0, halfSize);
          ctx.lineTo(-halfSize, 0);
          break;
        case 2: // Hexágono (vértices pre-calculados)
          ctx.moveTo(hexVertices[0].x * p.size, hexVertices[0].y * p.size);
          for (let i = 1; i < 6; i++) {
            ctx.lineTo(hexVertices[i].x * p.size, hexVertices[i].y * p.size);
          }
          break;
      }
      
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    };

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < config.count; i++) {
        // Primeras partículas aparecen con fade in
        particles.push(createParticle(true));
      }
    };

    const startTime = performance.now();
    
    const animate = (timestamp) => {
      const elapsed = timestamp - startTime;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        updateParticle(particles[i], elapsed);
        drawParticle(particles[i]);
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    initParticles();
    animationFrameId = requestAnimationFrame(animate);
    
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