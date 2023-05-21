import React from 'react';
import BooksCard from './BooksCard';
import Missing from "../Missing";
import Header from "../Header";
import NavBar from "../NavBar";
import About from "../About";
// import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import NewBook from "./NewBook";

const api_base = 'http://127.0.0.1:3001';


function Books() {


  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [book, setBook] = useState([]);
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

  useEffect(() => {
    const filteredResults = book.filter((item) =>
      ((item.bookName).toLowerCase()).includes(search.toLowerCase())
      || ((item.author).toLowerCase()).includes(search.toLowerCase()));

    setSearchResults(filteredResults.reverse());
  }, [book, search])

  return (<div className="wrapper">
    <Header title="Book library" />
    <NavBar search={search} setSearch={setSearch} />
  <button onClick={()=>setOpen(!open)}>Add new book</button>
  {open ? <NewBook book={book} setBook={setBook} setOpen={setOpen} />: null}
  <div className='books-container'>
      {book ? book.map((item) =>
        <BooksCard {...item} id={item._id} deleteBook={deleteBook} />) : null}
    </div>
    
    {/* <Routes>
    
      <Route path="/about" element={<About/>} />
      <Route path="*" component={<Missing/>} />
    </Routes> */}
   
  </div>)

}

export default Books;