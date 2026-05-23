import { useState } from 'react';
import { fetchWeather, WeatherData } from '../services/weatherApi';
import WeatherCard from '../components/WeatherCard';

export default function Comparacao() {
  const [city1, setCity1] = useState('');
  const [city2, setCity2] = useState('');
  const [data1, setData1] = useState<WeatherData | null>(null);
  const [data2, setData2] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCompare = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!city1.trim() || !city2.trim()) {
      setError('Por favor, insira o nome de duas cidades para comparar.');
      return;
    }

    setLoading(true);
    setError(null);
    setData1(null);
    setData2(null);

    try {
      const [res1, res2] = await Promise.all([fetchWeather(city1), fetchWeather(city2)]);
      setData1(res1);
      setData2(res2);
    } catch {
      setError('Falha ao comparar. Verifique se digitou os nomes corretamente.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    flex: 1,
    minWidth: '200px',
    padding: '12px 16px',
    borderRadius: '8px',
    border: '1px solid var(--color-border)',
    fontSize: '1rem',
  };

  return (
    <div>
      <h2>Comparação de Clima</h2>
      <p className="text-muted">
        Compare de forma simples e visual a temperatura e dados de duas regiões.
      </p>

      <form onSubmit={handleCompare} style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Cidade 1"
            value={city1}
            onChange={(e) => setCity1(e.target.value)}
            disabled={loading}
            style={inputStyle}
          />
          <div style={{ fontSize: '24px', color: 'var(--color-primary)', fontWeight: 'bold' }}>⇄</div>
          <input
            type="text"
            placeholder="Cidade 2"
            value={city2}
            onChange={(e) => setCity2(e.target.value)}
            disabled={loading}
            style={inputStyle}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '14px',
            borderRadius: '8px',
            backgroundColor: 'var(--color-primary)',
            color: '#fff',
            border: 'none',
            fontSize: '1rem',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          {loading ? 'Comparando...' : 'Comparar Cidades'}
        </button>
      </form>

      {error && <div className="error-box">{error}</div>}

      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
        {data1 && <div style={{ flex: 1, minWidth: '280px' }}><WeatherCard data={data1} /></div>}
        {data2 && <div style={{ flex: 1, minWidth: '280px' }}><WeatherCard data={data2} /></div>}
      </div>
    </div>
  );
}
