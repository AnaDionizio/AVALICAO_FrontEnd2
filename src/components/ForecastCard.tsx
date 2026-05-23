import { ForecastDay } from '../services/weatherApi';

interface Props {
  days: ForecastDay[];
}

export default function ForecastCard({ days }: Props) {
  return (
    <div style={{
      marginTop: '24px',
      background: 'rgba(255,255,255,0.15)',
      backdropFilter: 'blur(8px)',
      borderRadius: '16px',
      padding: '16px',
      border: '1px solid rgba(255,255,255,0.2)',
    }}>
      <h4 style={{
        margin: '0 0 12px',
        color: 'inherit',
        fontSize: '0.85rem',
        fontWeight: 600,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        opacity: 0.8,
      }}>
        Próximos 5 dias
      </h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {days.map((day) => (
          <div key={day.date} style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '8px 0',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
          }}>
            <span style={{ width: '72px', fontWeight: 600, fontSize: '0.9rem' }}>{day.date}</span>
            <span style={{ fontSize: '1.4rem' }}>{day.icon}</span>
            <span style={{ flex: 1, paddingLeft: '12px', fontSize: '0.8rem', opacity: 0.75, textTransform: 'capitalize' }}>
              {day.condition}
            </span>
            <div style={{ display: 'flex', gap: '8px', fontSize: '0.9rem', fontWeight: 600 }}>
              <span style={{ opacity: 0.6 }}>{day.tempMin}°</span>
              <span>{day.tempMax}°</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
