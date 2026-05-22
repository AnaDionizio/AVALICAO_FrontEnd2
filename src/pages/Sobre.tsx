// src/pages/Sobre.tsx
import { useState } from 'react';

interface MembroProps {
  nome: string;
  iniciais: string;
}

function CardMembro({ nome, iniciais }: MembroProps) {
  // Estado para controlar o efeito de hover individualmente
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        backgroundColor: '#fff', 
        borderRadius: '24px', // Bordas um pouco mais arredondadas e modernas
        padding: '48px 32px', // Aumentamos consideravelmente o preenchimento interno
        boxShadow: isHovered 
          ? '0px 12px 24px rgba(25, 118, 210, 0.15)' // Sombra mais forte no hover
          : '0px 4px 16px rgba(0,0,0,0.06)', 
        textAlign: 'center',
        flex: 1,
        minWidth: '320px', // Aumentamos a largura mínima do card
        minHeight: '380px', // Força o card a ficar consideravelmente maior para matar o espaço vazio embaixo
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center', // Centraliza o conteúdo verticalmente dentro do cardzão
        alignItems: 'center',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease', // Transição suave
        transform: isHovered ? 'translateY(-10px)' : 'translateY(0)', // Faz o card subir 10px no hover
        cursor: 'pointer'
      }}
    >
      {/* Círculo com as Iniciais */}
      <div style={{ 
        backgroundColor: '#1976d2', 
        color: '#fff', 
        width: '88px', // Aumentamos o tamanho do círculo para combinar com o card maior
        height: '88px', 
        borderRadius: '50%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        marginBottom: '24px',
        fontSize: '2rem',
        fontWeight: 'bold',
        transition: 'transform 0.3s ease',
        transform: isHovered ? 'scale(1.05)' : 'scale(1)' // Pulsa levemente o círculo no hover
      }}>
        {iniciais}
      </div>

      {/* Nome do Integrante */}
      <h3 style={{ 
        margin: 0, 
        fontSize: '1.5rem', // Nome um pouco maior e imponente
        color: '#1e293b',
        fontWeight: 700 
      }}>
        {nome}
      </h3>
    </div>
  );
}

export default function Sobre() {
  return (
    <div style={{ 
      fontFamily: 'sans-serif',
      minHeight: '70vh', // Garante que a área da página ocupe bastante espaço na tela
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }}>
      <h2 style={{ textAlign: 'center', color: '#1976d2', fontSize: '2.25rem', marginBottom: '12px', fontWeight: 700 }}>
        Equipe de Desenvolvimento
      </h2>
      <p style={{ textAlign: 'center', color: '#64748b', fontSize: '1rem', marginBottom: '56px' }}>
        Projeto acadêmico desenvolvido para a disciplina de Desenvolvimento Frontend.
      </p>
      
      {/* Container dos Cards */}
      <div style={{ 
        display: 'flex', 
        gap: '40px', // Mais espaçamento entre um card e outro
        justifyContent: 'center', 
        flexWrap: 'wrap',
        maxWidth: '900px',
        margin: '0 auto',
        width: '100%'
      }}>
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