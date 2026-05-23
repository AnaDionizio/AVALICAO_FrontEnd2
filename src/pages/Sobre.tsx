import { useState } from 'react';
import { Typography } from '@mui/material';

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
        background: 'rgba(255,255,255,0.2)',
        backdropFilter: 'blur(4px)',
        border: '1px solid rgba(255,255,255,0.35)',

        borderRadius: '24px',
        padding: '48px 32px',

        boxShadow: isHovered
          ? '0px 12px 24px rgba(255,255,255,0.12)'
          : '0px 4px 16px rgba(0,0,0,0.12)',

        textAlign: 'center',
        minWidth: '270px',
        minHeight: '300px',

        maxWidth: '270px',
        margin: '0 auto',

        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

        transition:
          'transform 0.3s ease, box-shadow 0.3s ease',

        transform: isHovered
          ? 'translateY(-10px)'
          : 'translateY(0)',

        cursor: 'pointer',
      }}
    >
      <div
        style={{
          background: 'rgba(255,255,255,0.25)',
          border: '1px solid rgba(255,255,255,0.35)',

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

          transform: isHovered
            ? 'scale(1.05)'
            : 'scale(1)',
        }}
      >
        {iniciais}
      </div>

      <h3
        style={{
          color: '#fff',
          fontWeight: 700,
        }}
      >
        {nome}
      </h3>
    </div>
  );
}

export default function Sobre() {
  return (
    <div
      style={{
        maxWidth: '900px',
        margin: '32px auto',
        padding: '0 16px',
        fontFamily: 'sans-serif',
      }}
    >
      <Typography variant="h2"
        style={{ fontSize: '2rem'}}>
        Equipe de Desenvolvimento
      </Typography>

      <Typography variant="body1"
        style={{
          textAlign: 'center',
          color: 'inherit',
          marginBottom: '32px',
        }}>
        Projeto acadêmico desenvolvido para a disciplina de Desenvolvimento Front-end.
      </Typography>

      <div
        style={{
          display: 'flex',
          gap: '30px',
          flex: 1,
          maxWidth: '600px',
          maxHeight: '300px', 
          flexDirection: 'column',
          justifyContent: 'center', // Centraliza o conteúdo verticalmente dentro do cardzão
          alignItems: 'center',
          flexWrap: 'wrap',
          margin: '0 auto',
          width: '100%',
        }}
      >
        <CardMembro
          nome="Ana Julya Rodrigues Dionizio"
          iniciais="AR"
        />

        <CardMembro
          nome="Alex Júlio de Brito"
          iniciais="AB"
        />
      </div>
    </div>
  );
}