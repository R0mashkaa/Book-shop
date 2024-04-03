import React from 'react';
import { useState } from 'react';

const api_base = 'http://127.0.0.1:3001';

function NewBook({ book, setBook, setOpen }) {

  const [newBook, setNewBook] = useState({
    bookName: '',
    description: '',
    author: '',
    releaseDate: ''
  });

  const addNewBook = async (e) => {
    e.preventDefault();
    const data = await fetch(api_base + '/api/books/', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newBook)
    }).then(res => res.json()).catch((e) => alert(e))

    setBook([...book, data]);
    setNewBook({
      bookName: '',
      description: '',
      author: '',
      releaseDate: ''
    });
    setOpen(false)
  }

  return (
    <div className="new-book-container">
      <div className="close-icon" onClick={() => setOpen(false)}>×</div>
      <h2>Create new book</h2>
      <form onSubmit={addNewBook}>
        <div className="form-group">
          <label htmlFor="bookName">Book name</label>
          <input
            type="text"
            name="bookName"
            value={newBook.bookName}
            onChange={e => setNewBook({ ...newBook, bookName: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            value={newBook.description}
            onChange={e => setNewBook({ ...newBook, description: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            name="author"
            value={newBook.author}
            onChange={e => setNewBook({ ...newBook, author: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="releaseDate">Year</label>
          <input
            type="text"
            name="releaseDate"
            value={newBook.releaseDate}
            onChange={e => setNewBook({ ...newBook, releaseDate: e.target.value })}
          />
        </div>
        <div className="form-group">
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
}

export default NewBook;
