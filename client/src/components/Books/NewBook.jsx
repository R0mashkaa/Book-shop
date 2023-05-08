import React from 'react';
import { useState} from 'react';

const api_base = 'http://127.0.0.1:3001';

function NewBook({book, setBook,setOpen}) {
 
  const [newBook, setNewBook] = useState([]);

  const addNewBook = async (e) => {
    e.preventDefault();
    const data = await fetch(api_base + '/api/books/',
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(
          {
            bookName: newBook.bookName,
            author: newBook.author,
            releaseDate: newBook.releaseDate
          }
        )
      }).then(res => res.json()).catch((e) => console.log(e))

    setBook([...book, data]);
    setNewBook("");
    setOpen(false)
  }
  return (
    <div>
      <h2>Create new book</h2>
      
    <p className="item">
      <label for="email"> Book name </label>
      <input
        type="text"
        name="bookName"
        value={newBook.bookName}
        onChange={e => setNewBook((old) => ({ ...old, bookName: e.target.value }))}
      />
    </p>
    <p className="item">
      <label for="password"> Author</label>
      <input
        type="text"
        name="author"
        value={newBook.author}
        onChange={e => setNewBook((old) => ({ ...old, author: e.target.value }))}
      />
    </p>
    <p className="item">
      <label for="password"> date</label>
      <input
        type="text"
        name="releaseData"
        value={newBook.releaseDate}
        onChange={e => setNewBook((old) => ({ ...old, releaseDate: e.target.value }))}

      />
    </p>
    <p className="item">
      <input type="submit" onClick={addNewBook} value="Submit" />
    </p>
  </div>
  );
}

export default NewBook;