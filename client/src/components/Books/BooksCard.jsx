import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

function BooksCard({id,bookName,imageLink, author ,releaseDate, deleteBook}) {

  console.log(id)
  
  return (
    <Card className= 'card-container'>
      {imageLink? <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />: <div className='default-img'>Here is no avaliable image</div>}
    
    <Card.Body>
      <Card.Title>{bookName}</Card.Title>
      <Card.Text>
        Some quick example text to build on the card title and make up the
        bulk of the card's content.
      </Card.Text>
    </Card.Body>
    <ListGroup className="list-group-flush">
      <ListGroup.Item>Author: {author}</ListGroup.Item>
      <ListGroup.Item>Year: {releaseDate}</ListGroup.Item>
    </ListGroup>
    <Card.Body>
    <Button onClick={() => deleteBook(id)} variant="outline-danger">Delete</Button>
    </Card.Body>
  </Card>
  );
}

export default BooksCard;