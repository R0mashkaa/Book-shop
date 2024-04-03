import React, { useState } from 'react';

const api_base = 'http://127.0.0.1:3001';

function ChatInput({ messages, setMessages }) {
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = async (e) => {
    e.preventDefault();

    if (!newMessage || newMessage.trim() === "") {
      // Don't send empty messages
      return;
    }

    try {
      const data = await fetch(api_base + '/api/chat/messages', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: newMessage
        })
      }).then(res => res.json());

      setMessages([...messages, data]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Oops, something went wrong.");
    }
  };

  return (
    <div>
      <p className="item">
        <label htmlFor="message">Type your message:</label>
        <input
          type="text"
          name="message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
      </p>
      <p className="item">
        <button onClick={sendMessage}>Send</button>
      </p>
    </div>
  );
}

export default ChatInput;
