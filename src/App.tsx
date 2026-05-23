import { useState } from 'react';
import Home from './pages/Home';
import Comparacao from './pages/Comparacao';
import Sobre from './pages/Sobre';
import Chat from './pages/Chat';
import { WeatherTheme, getWeatherTheme } from './services/weatherApi';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'buscar' | 'comparar' | 'sobre' | 'chat'>('buscar');
  const [theme, setTheme] = useState<WeatherTheme | null>(getWeatherTheme('01d'));

  const linkStyle = (tab: typeof currentTab): React.CSSProperties => ({
    textDecoration: 'none',
    color: theme ? theme.textColor : '#1976d2',
    fontWeight: 600,
    padding: '8px 16px',
    borderRadius: '4px',
    backgroundColor: currentTab === tab ? 'rgba(255,255,255,0.18)' : 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '0.95rem',
    fontFamily: 'inherit',
    transition: 'background 0.2s',
  });

  return (
    <div style={{
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      minHeight: '100vh',
      margin: 0,
      padding: 0,
      color: theme ? theme.textColor : '#1e293b',
      transition: 'color 0.6s ease',
      position: 'relative',
      ...(theme
        ? {
            backgroundImage: `url("${theme.imageUrl}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
          }
        : { backgroundColor: '#f8fafc' }
      ),
    }}>
      {/* Dark overlay for readability over photos */}
      {theme && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.38)',
          zIndex: 0,
          pointerEvents: 'none',
        }} />
      )}

      {/* Header */}
      <header style={{
        backgroundColor: theme ? 'rgba(0,0,0,0.28)' : '#ffffff',
        backdropFilter: 'blur(10px)',
        borderBottom: theme ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(0,0,0,0.08)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        transition: 'background 0.6s ease',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 24px',
        }}>
          <h1 style={{
            margin: 0,
            fontSize: '1.25rem',
            fontWeight: 700,
            color: theme ? theme.textColor : '#1976d2',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'color 0.6s ease',
          }}>
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

      {/* Main content */}
      <main style={{
        maxWidth: '1200px',
        margin: '40px auto',
        padding: '0 24px',
        position: 'relative',
        zIndex: 1,
      }}>
        {currentTab === 'buscar' && <Home onThemeChange={setTheme} />}
        {currentTab === 'comparar' && <Comparacao />}
        {currentTab === 'chat' && <Chat />}
        {currentTab === 'sobre' && <Sobre />}
      </main>
    </div>
  );
}
