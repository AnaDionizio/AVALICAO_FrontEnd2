import { useState } from 'react';

interface MembroProps {
  nome: string;
  iniciais: string;
}

function CardMembro({ nome, iniciais }: MembroProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundColor: 'var(--color-surface)',
        borderRadius: '24px',
        padding: '48px 32px',
        boxShadow: isHovered
          ? '0px 12px 24px rgba(25, 118, 210, 0.15)'
          : '0px 4px 16px rgba(0,0,0,0.06)',
        textAlign: 'center',
        flex: 1,
        minWidth: '320px',
        minHeight: '380px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        transform: isHovered ? 'translateY(-10px)' : 'translateY(0)',
        cursor: 'pointer',
      }}
    >
      <div style={{
        backgroundColor: 'var(--color-primary)',
        color: '#fff',
        width: '88px',
        height: '88px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '24px',
        fontSize: '2rem',
        fontWeight: 'bold',
        transition: 'transform 0.3s ease',
        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
      }}>
        {iniciais}
      </div>

      <h3 style={{ color: 'var(--color-text)', fontWeight: 700 }}>
        {nome}
      </h3>
    </div>
  );
}

export default function Sobre() {
  return (
    <div style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <h2 style={{ fontSize: '2.25rem' }}>Equipe de Desenvolvimento</h2>
      <p className="text-muted">
        Projeto acadêmico desenvolvido para a disciplina de Desenvolvimento Frontend.
      </p>

      <div style={{
        display: 'flex',
        gap: '40px',
        justifyContent: 'center',
        flexWrap: 'wrap',
        maxWidth: '900px',
        margin: '0 auto',
        width: '100%',
      }}>
        <CardMembro nome="Ana Julya Rodrigues Dionizio" iniciais="AR" />
        <CardMembro nome="Alex Júlio de Brito" iniciais="AB" />
      </div>
    </div>
  );
}
