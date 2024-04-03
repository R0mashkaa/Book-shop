import React, { useState } from 'react';
import Chat from './Chat';

function NavBar({ search, setSearch }) {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <nav className="Nav">
      <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="chat-container">
          {isChatOpen ? (
            <Chat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
          ) : (
            <button className="open-close-chat-button" onClick={() => setIsChatOpen(true)}>
              Open Chat
            </button>
          )}
        </div>
      </form>
    </nav>
  );
}

export default NavBar;
