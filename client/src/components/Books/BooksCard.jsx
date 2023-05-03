import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

function BooksCard({bookName,imageLink, author ,releaseDate}) {
  
  return (
    <Card style={{ width: '18rem' }}>
      {imageLink? <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />: null}
    
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
      <Card.Link href="#">Card Link</Card.Link>
      <Card.Link href="#">Another Link</Card.Link>
    </Card.Body>
  </Card>
  );
}

export default BooksCard;