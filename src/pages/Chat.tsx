// src/pages/Chat.tsx
import { useState } from 'react';

// Aqui definimos como vai ser a estrutura de cada mensagem na nossa lista
interface Message {
  sender: 'user' | 'gemini';
  text: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'gemini', text: 'Olá! Sou o assistente do ClimaApp alimentado pelo Gemini. Como posso te ajudar hoje?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  // INSIRA A CHAVE QUE VOCÊ COPIOU DO GOOGLE AI STUDIO AQUI:
  const GEMINI_API_KEY = 'AIzaSyAr4SjuMywTEIRpJy4FnXOIinFxYPcEpx8';

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput(''); // Limpa o campo de digitação instantaneamente
    
    // Adiciona a mensagem que o usuário digitou na tela
    setMessages((prev) => [...prev, { sender: 'user', text: userMessage }]);
    setLoading(true);

    try {
      // Fazemos uma requisição direta para a API oficial do Gemini (modelo gemini-2.5-flash)
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: userMessage }],
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Erro ao falar com o Gemini.');
      }

      const data = await response.json();
      
      // Extrai o texto da resposta que o Gemini nos mandou de volta
      const geminiResponse = data.candidates[0].content.parts[0].text;

      // Adiciona a resposta da IA na tela
      setMessages((prev) => [...prev, { sender: 'gemini', text: geminiResponse }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: 'gemini', text: 'Desculpe, tive um problema para processar sua mensagem. Verifique sua conexão ou chave de API.' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h2 style={{ textAlign: 'center', color: '#1976d2', fontSize: '2rem', marginBottom: '8px' }}>
        Conversar com a IA
      </h2>
      <p style={{ textAlign: 'center', color: '#64748b', fontSize: '0.95rem', marginBottom: '24px' }}>
        Tire suas dúvidas sobre o clima, previsões ou qualquer outro assunto.
      </p>

      {/* Caixa do Histórico do Chat */}
      <div style={{
        backgroundColor: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        padding: '16px',
        height: '400px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        marginBottom: '16px',
        boxShadow: '0px 4px 12px rgba(0,0,0,0.03)'
      }}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              backgroundColor: msg.sender === 'user' ? '#1976d2' : '#f1f5f9',
              color: msg.sender === 'user' ? '#ffffff' : '#1e293b',
              padding: '10px 14px',
              borderRadius: '12px',
              maxWidth: '80%',
              fontSize: '0.95rem',
              lineHeight: '1.4',
              whiteSpace: 'pre-wrap'
            }}
          >
            {msg.text}
          </div>
        ))}
        {loading && (
          <div style={{ alignSelf: 'flex-start', color: '#64748b', fontSize: '0.85rem', fontStyle: 'italic' }}>
            Gemini está pensando...
          </div>
        )}
      </div>

      {/* Formulário de Envio de Mensagem */}
      <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '12px' }}>
        <input
          type="text"
          placeholder="Digite sua mensagem..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
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
          Enviar
        </button>
      </form>
    </div>
  );
}