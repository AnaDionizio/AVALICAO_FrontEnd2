import { useState } from 'react';

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

  const GEMINI_API_KEY = 'AIzaSyAr4SjuMywTEIRpJy4FnXOIinFxYPcEpx8';

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { sender: 'user', text: userMessage }]);
    setLoading(true);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: [{ parts: [{ text: userMessage }] }] }),
        }
      );

      if (!response.ok) throw new Error('Erro ao falar com o Gemini.');

      const data = await response.json();
      const geminiResponse = data.candidates[0].content.parts[0].text;
      setMessages((prev) => [...prev, { sender: 'gemini', text: geminiResponse }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { sender: 'gemini', text: 'Desculpe, tive um problema para processar sua mensagem. Verifique sua conexão ou chave de API.' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2>Conversar com a IA</h2>
      <p className="text-muted">
        Tire suas dúvidas sobre o clima, previsões ou qualquer outro assunto.
      </p>

      <div style={{
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: '12px',
        padding: '16px',
        height: '400px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        marginBottom: '16px',
      }}>
        {messages.map((msg, index) => (
          <div key={index} style={{
            alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
            backgroundColor: msg.sender === 'user' ? 'var(--color-primary)' : '#f1f5f9',
            color: msg.sender === 'user' ? '#ffffff' : 'var(--color-text)',
            padding: '10px 14px',
            borderRadius: '12px',
            maxWidth: '80%',
            fontSize: '0.95rem',
            lineHeight: '1.4',
            whiteSpace: 'pre-wrap',
          }}>
            {msg.text}
          </div>
        ))}
        {loading && (
          <div style={{ alignSelf: 'flex-start', color: 'var(--color-muted)', fontSize: '0.85rem', fontStyle: 'italic' }}>
            Gemini está pensando...
          </div>
        )}
      </div>

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
            border: `1px solid var(--color-border)`,
            fontSize: '1rem',
            outline: 'none',
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '12px 24px',
            borderRadius: '8px',
            backgroundColor: 'var(--color-primary)',
            color: '#fff',
            border: 'none',
            fontSize: '1rem',
            fontWeight: 600,
            cursor: 'pointer',
            opacity: loading ? 0.7 : 1,
          }}
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
