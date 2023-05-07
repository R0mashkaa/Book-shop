import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';

import BooksCard from './BooksCard';

const api_base = 'http://127.0.0.1:3001';

function Books() {

  const [book, setBook] = useState([]);
  const [newBook, setNewBook] = useState("");


  useEffect(() => {
    GetBooks();
  }, []);

  const GetBooks = () => {
    axios
      .get(api_base + '/api/books/')
      .then(res => {
        setBook(res.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }



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
  }

  const deleteBook = async ( id) => {
    if (window.confirm("Are you sure wanted to delete this card ?")) {
      setBook(book => book.filter(item => item._id !== id));
			await fetch(api_base + '/api/books/' + id, { method: "DELETE" }).then(res => res.json());
		}
	}

  return (
    <div className='books-container'>
      {book ? book.map((item) =>
        <BooksCard {...item} id={item._id} deleteBook={deleteBook} />) : "There is no any books"}

<div>
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
    </div>
  );
}

export default Books;