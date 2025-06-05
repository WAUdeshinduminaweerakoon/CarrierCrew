import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:5000');

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    socket.on('message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off('message');
    };
  }, []);

  const sendMessage = async () => {
    if (input.trim() === '') return;
    await axios.post('http://localhost:5000/api/message', { text: input });
    setInput('');
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Chatbot</h3>
      <div style={styles.chatBox}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ ...styles.message, textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
            <b>{msg.sender}:</b> {msg.text}
          </div>
        ))}
      </div>
      <div style={styles.inputRow}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          style={styles.input}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage} style={styles.button}>Send</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 400,
    width: '90%',
    margin: '40px auto',
    padding: 20,
    background: 'white',
    borderRadius: 10,
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    fontFamily: 'Segoe UI, sans-serif'
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 600,
    fontSize: 20,
  },
  chatBox: {
    height: 300,
    overflowY: 'auto',
    border: '1px solid #ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    background: '#f9f9f9',
  },
  message: {
    marginBottom: 8,
    fontSize: 14,
  },
  inputRow: {
    display: 'flex',
    gap: 10,
  },
  input: {
    flex: 1,
    padding: '10px 12px',
    borderRadius: 8,
    border: '1px solid #ccc',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#22c55e', // same green as login button
    color: 'white',
    padding: '10px 16px',
    border: 'none',
    borderRadius: 8,
    fontWeight: 'bold',
    cursor: 'pointer',
  }
};
