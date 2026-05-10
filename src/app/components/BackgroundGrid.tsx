export function BackgroundGrid() {
  const syntaxElements = [
    { char: '{', x: '10%', y: '15%', delay: '0s', color: '#00ff41', size: '2rem' },
    { char: '}', x: '85%', y: '25%', delay: '2s', color: '#00ff41', size: '2rem' },
    { char: '(', x: '20%', y: '60%', delay: '1s', color: '#00d9ff', size: '2rem' },
    { char: ')', x: '75%', y: '70%', delay: '3s', color: '#00d9ff', size: '2rem' },
    { char: '/', x: '50%', y: '30%', delay: '1.5s', color: '#ff006e', size: '2rem' },
    { char: ';', x: '30%', y: '80%', delay: '2.5s', color: '#ffd60a', size: '2rem' },
    { char: '<', x: '90%', y: '50%', delay: '0.5s', color: '#bb86fc', size: '2rem' },
    { char: '>', x: '15%', y: '40%', delay: '3.5s', color: '#bb86fc', size: '2rem' },
    { char: '[', x: '60%', y: '20%', delay: '1s', color: '#00ff41', size: '2rem' },
    { char: ']', x: '40%', y: '90%', delay: '2s', color: '#00d9ff', size: '2rem' },
    { char: '*', x: '70%', y: '10%', delay: '0.8s', color: '#ff006e', size: '2rem' },
    { char: '&', x: '25%', y: '50%', delay: '2.2s', color: '#ffd60a', size: '2rem' },
    { char: 'if', x: '5%', y: '25%', delay: '1.2s', color: '#00ff41', size: '1.5rem' },
    { char: 'else', x: '92%', y: '35%', delay: '2.8s', color: '#00d9ff', size: '1.5rem' },
    { char: 'for', x: '45%', y: '10%', delay: '0.3s', color: '#ff006e', size: '1.5rem' },
    { char: 'while', x: '80%', y: '85%', delay: '3.2s', color: '#ffd60a', size: '1.5rem' },
    { char: 'int', x: '12%', y: '75%', delay: '1.8s', color: '#bb86fc', size: '1.5rem' },
    { char: 'void', x: '65%', y: '45%', delay: '2.4s', color: '#00ff41', size: '1.5rem' },
    { char: 'return', x: '35%', y: '5%', delay: '0.9s', color: '#00d9ff', size: '1.5rem' },
    { char: 'char', x: '88%', y: '65%', delay: '3.6s', color: '#ff006e', size: '1.5rem' },
    { char: 'float', x: '55%', y: '88%', delay: '1.4s', color: '#ffd60a', size: '1.5rem' },
    { char: 'switch', x: '22%', y: '35%', delay: '2.6s', color: '#bb86fc', size: '1.5rem' },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(0deg, transparent 24%, rgba(0, 255, 65, 0.05) 25%, rgba(0, 255, 65, 0.05) 26%, transparent 27%, transparent 74%, rgba(0, 255, 65, 0.05) 75%, rgba(0, 255, 65, 0.05) 76%, transparent 77%, transparent),
            linear-gradient(90deg, transparent 24%, rgba(0, 255, 65, 0.05) 25%, rgba(0, 255, 65, 0.05) 26%, transparent 27%, transparent 74%, rgba(0, 255, 65, 0.05) 75%, rgba(0, 255, 65, 0.05) 76%, transparent 77%, transparent)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Floating Syntax Elements */}
      {syntaxElements.map((element, index) => (
        <div
          key={index}
          className="absolute animate-float"
          style={{
            left: element.x,
            top: element.y,
            animationDelay: element.delay,
            fontFamily: 'var(--font-pixel)',
            fontSize: element.size,
            color: element.color,
            opacity: 0.3,
          }}
        >
          {element.char}
        </div>
      ))}

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
            opacity: 0.5;
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
