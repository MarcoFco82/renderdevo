// components/SeasonalParticles.js - ❄️ COPOS ULTRA OPTIMIZADOS
'use client';
import { useEffect, useRef } from 'react';

const SeasonalParticles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: true });
    let animationFrameId;
    let particles = [];
    let lastTime = 0;
    const targetFPS = 30; // Limitar a 30 FPS
    const frameInterval = 1000 / targetFPS;

    // ❄️ CONFIG ULTRA LIGHT
    const isMobile = window.innerWidth < 768;
    const COUNT = isMobile ? 25 : 45;
    const MAX_SIZE = isMobile ? 10 : 14;
    const MIN_SIZE = 3;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Colores pre-calculados
    const COLORS = ['#ffffff', '#ffffff', '#ffffff', '#a8dadc', '#ffffff'];

    class Flake {
      constructor() {
        this.reset(true);
      }

      reset(initial = false) {
        this.x = Math.random() * canvas.width;
        this.y = initial ? Math.random() * canvas.height : -10;
        this.size = MIN_SIZE + Math.random() * (MAX_SIZE - MIN_SIZE);
        this.speed = 0.3 + (this.size / MAX_SIZE) * 0.4;
        this.wind = (Math.random() - 0.5) * 0.3;
        this.opacity = 0.4 + Math.random() * 0.4;
        this.rotation = Math.random() * Math.PI;
        this.rotSpeed = (Math.random() - 0.5) * 0.02;
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
      }

      update() {
        this.y += this.speed;
        this.x += this.wind;
        this.rotation += this.rotSpeed;

        if (this.y > canvas.height + 10 || this.x < -10 || this.x > canvas.width + 10) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this.opacity;
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 1;

        // Copo ultra simple: solo 3 líneas cruzadas
        const s = this.size;
        ctx.beginPath();
        ctx.moveTo(0, -s);
        ctx.lineTo(0, s);
        ctx.moveTo(-s * 0.866, -s * 0.5);
        ctx.lineTo(s * 0.866, s * 0.5);
        ctx.moveTo(-s * 0.866, s * 0.5);
        ctx.lineTo(s * 0.866, -s * 0.5);
        ctx.stroke();

        ctx.restore();
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < COUNT; i++) {
        particles.push(new Flake());
      }
    };

    const animate = (currentTime) => {
      animationFrameId = requestAnimationFrame(animate);

      // Throttle a 30 FPS
      const delta = currentTime - lastTime;
      if (delta < frameInterval) return;
      lastTime = currentTime - (delta % frameInterval);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
    };

    resizeCanvas();
    init();
    requestAnimationFrame(animate);

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