import { useState } from 'react';
import { fetchWeather, WeatherData } from '../services/weatherApi';
import WeatherCard from '../components/WeatherCard';

export default function Home() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!city.trim()) return;

    setLoading(true);
    setError(null);
    setWeatherData(null);

    try {
      const data = await fetchWeather(city);
      setWeatherData(data);
    } catch (err: any) {
      setError(err.message || 'Erro ao buscar dados.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '32px auto', padding: '0 16px', fontFamily: 'sans-serif' }}>
      <h2 style={{ textAlign: 'center', color: '#1976d2', fontSize: '2rem', marginBottom: '8px' }}>
        Consultar Clima
      </h2>
      <p style={{ textAlign: 'center', color: '#64748b', fontSize: '0.95rem', marginBottom: '32px' }}>
        Descubra as condições climáticas atuais de qualquer cidade.
      </p>

      <form onSubmit={handleSearch} style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
        <input
          type="text"
          placeholder="Digite o nome da cidade"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          disabled={loading}
          style={{
            flex: 1,
            padding: '12px 16px',
            borderRadius: '8px',
            border: '1px solid #cbd5e1',
            fontSize: '1rem',
            outline: 'none'
          }}
        />
        <button 
          type="submit" 
          disabled={loading}
          style={{
            padding: '12px 24px',
            borderRadius: '8px',
            backgroundColor: '#1976d2',
            color: '#fff',
            border: 'none',
            fontSize: '1rem',
            fontWeight: 600,
            cursor: 'pointer',
            opacity: loading ? 0.7 : 1
          }}
        >
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
      </form>

      {error && (
        <div style={{ padding: '16px', backgroundColor: '#fef2f2', border: '1px solid #fca5a5', color: '#991b1b', borderRadius: '8px', marginBottom: '24px' }}>
          {error}
        </div>
      )}

      {weatherData && <WeatherCard data={weatherData} />}
    </div>
  );
}