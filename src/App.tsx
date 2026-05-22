// src/App.tsx
import { useState } from 'react';
import Home from './pages/Home';
import Comparacao from './pages/Comparacao';
import Sobre from './pages/Sobre';
import Chat from './pages/Chat';

export default function App() {
  // Controle de abas manual para evitar os conflitos de hooks do react-router-dom
 const [currentTab, setCurrentTab] = useState<'buscar' | 'comparar' | 'sobre' | 'chat'>('buscar');

  // Estilos inline básicos para garantir que o layout fique bonito e moderno
  const linkStyle = (tab: typeof currentTab) => ({
    textDecoration: 'none',
    color: '#1976d2',
    fontWeight: 600,
    padding: '8px 16px',
    borderRadius: '4px',
    backgroundColor: currentTab === tab ? 'rgba(25, 118, 210, 0.08)' : 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '0.95rem',
    fontFamily: 'inherit'
  });

  return (
    <div style={{ 
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', 
      backgroundColor: '#f8fafc', 
      minHeight: '100vh', 
      margin: 0,
      padding: 0
    }}>
      {/* Menu Superior */}
      <header style={{ 
        backgroundColor: '#ffffff', 
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          padding: '12px 24px' 
        }}>
          <h1 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, color: '#1976d2', display: 'flex', alignItems: 'center', gap: '8px' }}>
            🌤️ ClimaApp
          </h1>
          <nav style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => setCurrentTab('buscar')} style={linkStyle('buscar')}>Buscar</button>
            <button onClick={() => setCurrentTab('comparar')} style={linkStyle('comparar')}>Comparar</button>
            <button onClick={() => setCurrentTab('chat')} style={linkStyle('chat')}>Chat IA</button>
            <button onClick={() => setCurrentTab('sobre')} style={linkStyle('sobre')}>Sobre</button>
          </nav>
        </div>
      </header>

      {/* Renderização Condicional Limpa */}
      <main style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 24px' }}>
        {currentTab === 'buscar' && <Home />}
        {currentTab === 'comparar' && <Comparacao />}
        {currentTab === 'chat' && <Chat />}
        {currentTab === 'sobre' && <Sobre />}
      </main>
    </div>
  );
}