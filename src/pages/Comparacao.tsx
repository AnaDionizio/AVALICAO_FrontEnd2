import { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';

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
      const [res1, res2] = await Promise.all([
        fetchWeather(city1),
        fetchWeather(city2),
      ]);

      setData1(res1);
      setData2(res2);
    } catch {
      setError(
        'Falha ao comparar. Verifique se digitou os nomes corretamente.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Typography variant="h2"
        style={{ fontSize: '2rem'}}>
        Comparação de Clima
      </Typography>

      <Typography variant="body1"
      style={{
        textAlign: 'center',
        color: 'inherit',
        marginBottom: '32px',
      }}>
      Compare de forma simples e visual a temperatura e dados de duas regiões.
      </Typography>

      <form
        onSubmit={handleCompare}
        style={{ marginBottom: '32px' }}
      >
      <div
        style={{
          display: 'flex',
          gap: '16px',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '16px',
          flexWrap: 'wrap',
      }}>
      <TextField
        placeholder="Cidade 1"
        value={city1}
        onChange={(e) => setCity1(e.target.value)}
        disabled={loading}
      />

      <div
        style={{
          fontSize: '24px',
          color: 'var(--color-primary)',
          fontWeight: 'bold',
        }}
      >
      ⇄
      </div>

          <TextField
            placeholder="Cidade 2"
            value={city2}
            onChange={(e) => setCity2(e.target.value)}
            disabled={loading}
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
        >
          {loading ? 'Comparando...' : 'Comparar Cidades'}
        </Button>
      </form>

      {error && (
        <div className="error-box">
          {error}
        </div>
      )}

      <div
        style={{
          display: 'flex',
          gap: '24px',
          flexWrap: 'wrap',
        }}
      >
        {data1 && (
          <div style={{ flex: 1, minWidth: '280px' }}>
            <WeatherCard data={data1} />
          </div>
        )}

        {data2 && (
          <div style={{ flex: 1, minWidth: '280px' }}>
            <WeatherCard data={data2} />
          </div>
        )}
      </div>
    </div>
  );
}