import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

function BooksCard({id,bookName,description, imageLink, author ,releaseDate, deleteBook}) {
  const msg = new SpeechSynthesisUtterance()

  const speechHandler = (msg) => {
    msg.lang ="en-US" 
    msg.text = description
    window.speechSynthesis.speak(msg)
  }


  
  return (
    <Card className= 'card-container'>
      {imageLink? <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />: <div className='default-img'>Here is no avaliable image</div>}
    
    <Card.Body>
      <Card.Title>{bookName}</Card.Title>
      <Card.Text>
        {description}
      </Card.Text>
      <button onClick={() => speechHandler(msg)}>SPEAK</button>
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