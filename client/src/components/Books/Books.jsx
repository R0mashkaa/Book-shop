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
    if (window.confirm("Are you sure wanted to delete this card ?")) {
      setBook(book => book.filter(item => item._id !== id));
      await fetch(api_base + '/api/books/' + id, { method: "DELETE" }).then(res => res.json());
    }
  }


  return (<div className="wrapper">
    <Header title="Book library" />
    <NavBar setSearch={setSearch} search={search}/>
    
    <Button onClick={() => setOpen(!open)} variant="primary" >Add new book</Button>
    {open ? <NewBook book={book} setBook={setBook} setOpen={setOpen} /> : null}
    <div className='books-container'>
      {book ? book.map((item) =>
        <BooksCard {...item} searchResults={item} id={item._id} deleteBook={deleteBook} />) : null}
    </div>
  </div>)

}

export default Books;