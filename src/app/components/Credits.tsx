import { Github, Linkedin } from 'lucide-react';
import { BackgroundGrid } from './BackgroundGrid';

const team = [
  {
    name: 'Fernando',
    role: 'Developer',
    github: 'https://github.com/FerSouzza',
    linkedin: 'https://www.linkedin.com/in/fersouzza/',
    avatar: 'F'
  },
  {
    name: 'Danilo',
    role: 'Developer',
    github: 'https://github.com/Dangocan',
    linkedin: 'https://linkedin.com/in/danilo',
    avatar: 'D'
  },
  {
    name: 'Bruna',
    role: 'Developer',
    github: 'https://github.com/tkaoribruna',
    linkedin: 'https://linkedin.com/in/bruna',
    avatar: 'B'
  },
  {
    name: 'Giovana R.',
    role: 'Developer',
    github: 'https://github.com/giovana0402',
    linkedin: 'https://linkedin.com/in/giovana-r',
    avatar: 'GR'
  },
  {
    name: 'Giovanna F.',
    role: 'Developer',
    github: 'https://github.com/GiovannaFutf',
    linkedin: 'https://linkedin.com/in/giovanna-f',
    avatar: 'GF'
  }
];

const colors = ['#00ff41', '#00d9ff', '#ff006e', '#ffd60a', '#bb86fc'];

export function Credits() {
  return (
    <section className="min-h-screen py-20 px-4 border-t-4 border-primary bg-card/30 relative">
      <BackgroundGrid />

      <div className="max-w-7xl mx-auto relative z-10">
        <h2
          style={{ fontFamily: 'var(--font-pixel)' }}
          className="text-3xl md:text-5xl text-center mb-4 text-primary"
        >
          &gt; EQUIPE
        </h2>

        <p
          style={{ fontFamily: 'var(--font-mono)' }}
          className="text-xl text-center mb-16 text-foreground/70"
        >
          Desenvolvido por
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {team.map((member, index) => (
            <div
              key={member.name}
              className="group relative p-6 border-4 bg-card hover:bg-card/80 transition-all duration-300 hover:scale-105 text-center"
              style={{ borderColor: colors[index] }}
            >
              {/* Avatar */}
              <div className="mb-6">
                <div
                  className="w-24 h-24 mx-auto border-4 flex items-center justify-center text-4xl transition-all duration-300 group-hover:scale-110"
                  style={{
                    borderColor: colors[index],
                    fontFamily: 'var(--font-pixel)',
                    color: colors[index]
                  }}
                >
                  {member.avatar}
                </div>
              </div>

              {/* Name */}
              <h3
                style={{ fontFamily: 'var(--font-pixel)', color: colors[index] }}
                className="text-lg mb-2"
              >
                {member.name}
              </h3>

              {/* Role */}
              <p
                style={{ fontFamily: 'var(--font-code)' }}
                className="text-sm text-foreground/60 mb-6"
              >
                {member.role}
              </p>

              {/* Social Links */}
              <div className="flex items-center justify-center gap-4">
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 border-2 hover:bg-foreground/10 transition-colors"
                  style={{ borderColor: colors[index] }}
                >
                  <Github className="w-5 h-5" style={{ color: colors[index] }} />
                </a>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 border-2 hover:bg-foreground/10 transition-colors"
                  style={{ borderColor: colors[index] }}
                >
                  <Linkedin className="w-5 h-5" style={{ color: colors[index] }} />
                </a>
              </div>

              {/* Hover effect */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity"
                style={{
                  background: `linear-gradient(45deg, transparent, ${colors[index]}10)`,
                }}
              />
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p
            style={{ fontFamily: 'var(--font-mono)' }}
            className="text-lg text-foreground/60"
          >
            &copy; 2026 C-Learning Quest. Todos os direitos reservados.
          </p>
          <p
            style={{ fontFamily: 'var(--font-code)' }}
            className="text-sm text-foreground/40 mt-2"
          >
            Feito com 💚 e muita programação em C
          </p>
        </div>
      </div>
    </section>
  );
}
