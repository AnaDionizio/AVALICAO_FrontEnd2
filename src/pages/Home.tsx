import { useState, useEffect } from 'react';
import {
  fetchWeather,
  fetchWeatherByCoords,
  fetchForecast,
  fetchForecastByCoords,
  getWeatherTheme,
  WeatherData,
  ForecastDay,
  WeatherTheme,
} from '../services/weatherApi';
import WeatherCard from '../components/WeatherCard';
import ForecastCard from '../components/ForecastCard';

interface Props {
  onThemeChange: (theme: WeatherTheme | null) => void;
}

export default function Home({ onThemeChange }: Props) {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [loading, setLoading] = useState(false);
  const [locating, setLocating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auto-load current location on mount
  useEffect(() => {
    if (!navigator.geolocation) return;

    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        setLocating(false);
        setLoading(true);
        try {
          const [data, forecastDays] = await Promise.all([
            fetchWeatherByCoords(coords.latitude, coords.longitude),
            fetchForecastByCoords(coords.latitude, coords.longitude),
          ]);
          setWeatherData(data);
          setForecast(forecastDays);
          setCity(data.name);
          onThemeChange(getWeatherTheme(data.rawIcon));
        } catch {
          // Silently ignore — user can still search manually
        } finally {
          setLoading(false);
        }
      },
      () => {
        // Permission denied or unavailable — just hide the locating state
        setLocating(false);
      },
      { timeout: 8000 }
    );
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!city.trim()) return;

    setLoading(true);
    setError(null);
    setWeatherData(null);
    setForecast([]);
    onThemeChange(null);

    try {
      const [data, forecastDays] = await Promise.all([
        fetchWeather(city),
        fetchForecast(city),
      ]);
      setWeatherData(data);
      setForecast(forecastDays);
      onThemeChange(getWeatherTheme(data.rawIcon));
    } catch (err: any) {
      setError(err.message || 'Erro ao buscar dados.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '32px auto', padding: '0 16px', fontFamily: 'sans-serif' }}>
      <h2 style={{ textAlign: 'center', color: 'inherit', fontSize: '2rem', marginBottom: '8px' }}>
        Consultar Clima
      </h2>
      <p style={{ textAlign: 'center', color: 'inherit', opacity: 0.75, fontSize: '0.95rem', marginBottom: '32px' }}>
        Descubra as condições climáticas atuais de qualquer cidade.
      </p>

      <form onSubmit={handleSearch} style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
        <input
          type="text"
          placeholder="Digite o nome da cidade"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          disabled={loading || locating}
          style={{
            flex: 1,
            padding: '12px 16px',
            borderRadius: '8px',
            border: '1px solid rgba(255,255,255,0.35)',
            fontSize: '1rem',
            outline: 'none',
            background: 'rgba(255,255,255,0.2)',
            backdropFilter: 'blur(4px)',
            color: 'inherit',
          }}
        />
        <button
          type="submit"
          disabled={loading || locating}
          style={{
            padding: '12px 24px',
            borderRadius: '8px',
            backgroundColor: 'rgba(255,255,255,0.25)',
            color: 'inherit',
            border: '1px solid rgba(255,255,255,0.35)',
            fontSize: '1rem',
            fontWeight: 600,
            cursor: 'pointer',
            opacity: loading || locating ? 0.7 : 1,
          }}
        >
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
      </form>

      {locating && (
        <div style={{ textAlign: 'center', opacity: 0.7, marginBottom: '24px', fontSize: '0.9rem' }}>
          📍 Detectando sua localização...
        </div>
      )}

      {error && (
        <div style={{
          padding: '16px',
          backgroundColor: 'rgba(239,68,68,0.2)',
          border: '1px solid rgba(239,68,68,0.5)',
          color: '#fff',
          borderRadius: '8px',
          marginBottom: '24px',
        }}>
          {error}
        </div>
      )}

      {weatherData && <WeatherCard data={weatherData} />}
      {forecast.length > 0 && <ForecastCard days={forecast} />}
    </div>
  );
}
