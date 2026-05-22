export interface WeatherData {
  name: string;
  temp: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  icon: string;
}


const API_KEY = '58528f231ceb5f9785597d221729ddc4'; // Substitua pela sua chave de API do OpenWeatherMap

// Função auxiliar para traduzir o ícone da API para um Emoji correspondente
function getEmojiIcon(iconCode: string): string {
  if (iconCode.startsWith('01')) return '☀️'; // céu limpo
  if (iconCode.startsWith('02')) return '⛅'; // poucas nuvens
  if (iconCode.startsWith('03') || iconCode.startsWith('04')) return '☁️'; // nublado
  if (iconCode.startsWith('09') || iconCode.startsWith('10')) return '🌧️'; // chuva
  if (iconCode.startsWith('11')) return '⛈️'; // tempestade
  if (iconCode.startsWith('13')) return '❄️'; // neve
  if (iconCode.startsWith('50')) return '🌫️'; // névoa / nevoeiro
  return '🌡️';
}

export async function fetchWeather(city: string): Promise<WeatherData> {
  // Substitui espaços por caracteres válidos na URL de requisição
  const sanitizedCity = encodeURIComponent(city.trim());
  
  // URL da API configurada para trazer dados em Português (&lang=pt_br) e em Celsius (&units=metric)
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${sanitizedCity}&appid=${API_KEY}&units=metric&lang=pt_br`;

  try {
    const response = await fetch(url);

    // Se o status for 404, significa que a cidade não existe no mundo real
    if (response.status === 404) {
      throw new Error('Cidade não encontrada. Verifique a grafia e tente novamente.');
    }

    if (!response.ok) {
      throw new Error('Erro ao conectar com o serviço de clima.');
    }

    const data = await response.json();

    // Mapeia o retorno da API real exatamente para a estrutura que seus componentes já usam
    return {
      name: data.name,
      temp: Math.round(data.main.temp), // Arredonda a temperatura (ex: 23.4°C vira 23°C)
      condition: data.weather[0].description,
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind.speed * 3.6), // Converte metros/segundo para km/h
      icon: getEmojiIcon(data.weather[0].icon)
    };

  } catch (error: any) {
    // Repassa o erro para ser exibido na tela no componente Alert que já criamos
    throw new Error(error.message || 'Falha ao buscar dados climáticos.');
  }
}