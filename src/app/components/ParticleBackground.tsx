import React from 'react';

interface ParticleBackgroundProps {
  className?: string;
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ className = '' }) => {
  // Generate random particles
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 5,
    duration: Math.random() * 3 + 2,
  }));

  return (
    <div className={`fixed inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-white/40 animate-sparkle"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
            boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
          }}
        />
      ))}
      
      {/* Floating orbs */}
      <div 
        className="absolute w-96 h-96 rounded-full bg-purple-300/20 blur-3xl animate-float"
        style={{ top: '10%', left: '-5%', animationDelay: '0s' }}
      />
      <div 
        className="absolute w-80 h-80 rounded-full bg-blue-300/20 blur-3xl animate-float"
        style={{ bottom: '20%', right: '-10%', animationDelay: '2s' }}
      />
      <div 
        className="absolute w-64 h-64 rounded-full bg-pink-300/20 blur-3xl animate-float"
        style={{ top: '50%', left: '30%', animationDelay: '4s' }}
      />
    </div>
  );
};

export default ParticleBackground;
