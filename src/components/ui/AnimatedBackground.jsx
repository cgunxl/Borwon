import React, { useEffect, useRef } from 'react';

const AnimatedBackground = ({ 
  showWaves = true, 
  showScanLines = true, 
  showParticles = true,
  className = "",
  children 
}) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);

  // Initialize particles
  useEffect(() => {
    if (!showParticles || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create particles
    const createParticles = () => {
      particlesRef.current = [];
      const particleCount = Math.min(80, Math.floor((canvas.width * canvas.height) / 10000));
      
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.3,
          life: Math.random() * 100 + 100
        });
      }
    };

    createParticles();

    // Animation loop
    let animationId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesRef.current.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life--;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Remove dead particles
        if (particle.life <= 0) {
          particlesRef.current.splice(index, 1);
          return;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(223, 252, 246, ${particle.opacity})`;
        ctx.fill();

        // Draw glow
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 198, ${particle.opacity * 0.3})`;
        ctx.fill();
      });

      // Replenish particles
      if (particlesRef.current.length < 80) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.3,
          life: Math.random() * 100 + 100
        });
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [showParticles]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Wave Background Layers */}
      {showWaves && (
        <>
          <div className="absolute inset-0 bg-gradient-waves" />
          <div className="absolute inset-0 bg-gradient-conic-waves animate-wave-shift opacity-60" 
               style={{ filter: 'blur(18px)' }} />
          <div className="absolute inset-0 bg-gradient-conic-waves animate-wave-shift opacity-40" 
               style={{ filter: 'blur(24px)', animationDuration: '22s' }} />
        </>
      )}

      {/* Scan Lines */}
      {showScanLines && (
        <div className="scan-lines" />
      )}

      {/* Particles Canvas */}
      {showParticles && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none z-10"
          style={{ mixBlendMode: 'screen' }}
        />
      )}

      {/* Content */}
      <div className="relative z-20">
        {children}
      </div>
    </div>
  );
};

export default AnimatedBackground;