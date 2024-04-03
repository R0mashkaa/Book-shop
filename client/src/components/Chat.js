import React, { useState } from 'react';
import "./Chat.css";

function Chat({ isOpen, onClose }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const response = await fetch('http://localhost:3001/openai/completion', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: newMessage }),
    });

    const data = await response.json();
    console.log('server response: ' + data);
    setMessages((prevMessages => [
      ...prevMessages,
      { text: newMessage, isUser: true },
      { text: data.answer || 'Completion error', isUser: false },
    ]));
    setNewMessage('');
  };

  if (!isOpen) return null;

  return (
    <div className='Chat'>
      <button className="close-chat-button" onClick={onClose}>×</button>
      {messages.map((message, index) => (
        <div key={index} style={{ textAlign: message.isUser ? 'right' : 'left', color: 'black' }}>
          { message.isUser ? message.text + ' User' : 'Server ' + message.text }
        </div>
      ))}
      <div className="input-container">
        <input value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
