import { useEffect, useState } from 'react';
import { WeatherData } from '../services/weatherApi';

interface WeatherCardProps {
  data: WeatherData;
}

function useCityTime(timezoneOffset: number) {
  const [time, setTime] = useState('');

  useEffect(() => {
    function tick() {
      // UTC ms + city offset ms
      const utcMs = Date.now() + new Date().getTimezoneOffset() * 60_000;
      const cityMs = utcMs + timezoneOffset * 1_000;
      const d = new Date(cityMs);
      setTime(d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [timezoneOffset]);

  return time;
}

function getUtcLabel(offsetSeconds: number) {
  const totalMinutes = offsetSeconds / 60;
  const h = Math.floor(Math.abs(totalMinutes) / 60);
  const m = Math.abs(totalMinutes) % 60;
  const sign = totalMinutes >= 0 ? '+' : '-';
  return m > 0
    ? `UTC${sign}${h}:${String(m).padStart(2, '0')}`
    : `UTC${sign}${h}`;
}

export default function WeatherCard({ data }: WeatherCardProps) {
  const time = useCityTime(data.timezoneOffset);
  const utcLabel = getUtcLabel(data.timezoneOffset);

  return (
    <div style={{
      background: 'rgba(255,255,255,0.15)',
      backdropFilter: 'blur(8px)',
      borderRadius: '16px',
      padding: '24px',
      border: '1px solid rgba(255,255,255,0.2)',
      color: 'inherit',
    }}>
      {/* City + time header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
        <h3 style={{ margin: 0, color: 'inherit', fontSize: '1.5rem' }}>{data.name}</h3>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '1.25rem', fontWeight: 700, fontVariantNumeric: 'tabular-nums', letterSpacing: '0.02em' }}>
            {time}
          </div>
          <div style={{ fontSize: '0.75rem', opacity: 0.65, marginTop: '2px' }}>
            {utcLabel}
          </div>
        </div>
      </div>

      {/* Temperature + condition */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
        <span style={{ fontSize: '3rem' }}>{data.icon}</span>
        <div>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'inherit', lineHeight: 1 }}>
            {data.temp}°C
          </div>
          <div style={{ color: 'inherit', opacity: 0.75, textTransform: 'capitalize', marginTop: '4px' }}>
            {data.condition}
          </div>
        </div>
      </div>

      {/* Humidity + wind */}
      <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.15)' }}>
        <div>
          <span style={{ display: 'block', fontSize: '0.8rem', opacity: 0.65 }}>💧 Umidade</span>
          <span style={{ fontWeight: 'bold', color: 'inherit' }}>{data.humidity}%</span>
        </div>
        <div>
          <span style={{ display: 'block', fontSize: '0.8rem', opacity: 0.65 }}>💨 Vento</span>
          <span style={{ fontWeight: 'bold', color: 'inherit' }}>{data.windSpeed} km/h</span>
        </div>
      </div>
    </div>
  );
}
