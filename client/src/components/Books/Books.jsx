import React from 'react';
import Button from 'react-bootstrap/Button';
import BooksCard from './BooksCard';
import Header from "../Header";
import NavBar from "../NavBar";
import About from "../About";
import "./style.css"
import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import NewBook from "./NewBook";

const api_base = 'http://127.0.0.1:3001';


function Books({book,setBook,search, setSearch, searchResults}) {

  const [newBook, setNewBook] = useState([]);
  const [open, setOpen] = useState(false);

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

  const deleteBook = async (id) => {
    if (window.confirm("Are you sure wish to delete this card ?")) {
      setBook(book => book.filter(item => item._id !== id));
      await fetch(api_base + '/api/books/' + id, { method: "DELETE" }).then(res => res.json());
    }
  }

  const handleLogout = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem('userData'));
      if (userData && userData.token) {
        const response = await fetch(`${api_base}/api/auth/logout`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            Authorization: `${userData.token}`
          }
        });
        if (response.ok) {
          console.log('Logout successful');
          localStorage.removeItem('userData');
          window.location.href = 'http://localhost:3000';
        } else {
          const errorMessage = await response.text();
          throw new Error(errorMessage || 'Logout failed');
        }
      } else {
        console.error('No token found in userData');
      }
    } catch (error) {
      if (extractErrorMessage(error.message) === 'jwt expired') {
        localStorage.removeItem('userData');
        window.location.href = 'http://localhost:3000';
      }
      console.error('Error during logout:', error.message);
    }
  };
  
  const extractErrorMessage = (htmlResponse) => {
    const errorMatch = /Error: (.+?)<br>/i.exec(htmlResponse);
    if (errorMatch && errorMatch[1]) {
      return errorMatch[1];
    } else {
      return 'Failed to extract error message';
    }
  };

  const renderBooks = () => {
    if (!open) {
      return (
        <div className='books-container'>
          {book ? book.map((item) =>
            <BooksCard {...item} searchResults={item} id={item._id} deleteBook={deleteBook} />) : null}
        </div>
      );
    }
  };

  const renderAddBookButton = () => {
    if (!open) {
      return (
        <Button onClick={() => setOpen(!open)} variant="primary">Add new book</Button>
      );
    }
  };

  const renderSearchBar = () => {
    if (!open) {
      return (
        <NavBar setSearch={setSearch} search={search} />
      );
    }
  };

  return (
    <div className="wrapper">
      <Header title="Book library" />
      {renderSearchBar()}
      {renderAddBookButton()}
      <Button onClick={handleLogout} variant="danger" className="logout-button">Logout</Button>
      {open ? <NewBook book={book} setBook={setBook} setOpen={setOpen} /> : renderBooks()}
    </div>
  );
}

export default Books;
