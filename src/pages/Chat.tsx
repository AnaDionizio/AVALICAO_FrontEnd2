import { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';

interface Message {
  sender: 'user' | 'gemini';
  text: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
    sender: 'gemini',
    text:
      'Olá! Sou o assistente do ClimaApp alimentado pelo Gemini. Como posso te ajudar hoje?',
    },
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const GEMINI_API_KEY = 'SUA_API_KEY';

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim() || loading) return;

    const userMessage = input.trim();

    setInput('');
    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: userMessage },
    ]);

    setLoading(true);

    try {
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

      const geminiResponse =
        data.candidates[0].content.parts[0].text;

      setMessages((prev) => [
        ...prev,
        {
          sender: 'gemini',
          text: geminiResponse,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'gemini',
          text:
            'Desculpe, tive um problema para processar sua mensagem.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <Typography variant="h2"
        style={{ fontSize: '2rem'}}>
        Conversar com a IA
      </Typography>

      <Typography variant="body1"
        style={{
          textAlign: 'center',
          color: 'inherit',
          marginBottom: '32px',
        }}>
        Tire suas dúvidas sobre o clima, previsões ou qualquer outro assunto.
      </Typography>

      <div
        style={{
          background: 'rgba(255,255,255,0.2)',
          backdropFilter: 'blur(4px)',
          border: '1px solid rgba(255,255,255,0.35)',
          borderRadius: '12px',
          padding: '16px',
          height: '400px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          marginBottom: '16px',
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              alignSelf:
                msg.sender === 'user'
                  ? 'flex-end'
                  : 'flex-start',

              background:
                msg.sender === 'user'
                  ? 'rgba(255,255,255,0.25)'
                  : 'rgba(255,255,255,0.15)',

              border: '1px solid rgba(255,255,255,0.25)',

              color: '#fff',

              padding: '10px 14px',
              borderRadius: '12px',
              maxWidth: '80%',
              fontSize: '0.95rem',
              lineHeight: '1.4',
              whiteSpace: 'pre-wrap',
            }}
          >
            {msg.text}
          </div>
        ))}

        {loading && (
          <div
            style={{
              alignSelf: 'flex-start',
              color: 'rgba(255,255,255,0.7)',
              fontSize: '0.85rem',
              fontStyle: 'italic',
            }}
          >
            Gemini está pensando...
          </div>
        )}
      </div>

      <form
        onSubmit={handleSendMessage}
        style={{
          display: 'flex',
          gap: '12px',
        }}
      >
        <TextField
          fullWidth
          placeholder="Digite sua mensagem..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
        />

        <Button
          type="submit"
          disabled={loading}
        >
          Enviar
        </Button>
      </form>
    </div>
  );
}