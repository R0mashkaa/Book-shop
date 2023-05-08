import React from 'react';
import BooksCard from './BooksCard';




function Books({book,addNewBook,deleteBook}) {


  return (
    <div className='books-container'>
      {book ? book.map((item) =>
        <BooksCard {...item} id={item._id} deleteBook={deleteBook} />) : null}
    </div>
  );
}

export default Books;