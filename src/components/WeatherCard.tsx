// src/components/WeatherCard.tsx
import { WeatherData } from '../services/weatherApi';

interface WeatherCardProps {
  data: WeatherData;
}

export default function WeatherCard({ data }: WeatherCardProps) {
  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #e3f2fd 30%, #bbdefb 90%)', 
      borderRadius: '16px', 
      padding: '24px', 
      boxShadow: '0px 4px 12px rgba(0,0,0,0.05)',
      fontFamily: 'sans-serif'
    }}>
      <h3 style={{ margin: '0 0 16px 0', color: '#1976d2', fontSize: '1.5rem' }}>{data.name}</h3>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
        <span style={{ fontSize: '3rem' }}>{data.icon}</span>
        <div>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1e293b', lineHeight: 1 }}>
            {data.temp}°C
          </div>
          <div style={{ color: '#64748b', textTransform: 'capitalize', marginTop: '4px' }}>
            {data.condition}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '16px', borderTop: '1px solid rgba(0,0,0,0.08)' }}>
        <div>
          <span style={{ display: 'block', fontSize: '0.8rem', color: '#64748b' }}>💧 Umidade</span>
          <span style={{ fontWeight: 'bold', color: '#1e293b' }}>{data.humidity}%</span>
        </div>
        <div>
          <span style={{ display: 'block', fontSize: '0.8rem', color: '#64748b' }}>💨 Vento</span>
          <span style={{ fontWeight: 'bold', color: '#1e293b' }}>{data.windSpeed} km/h</span>
        </div>
      </div>
    </div>
  );
}