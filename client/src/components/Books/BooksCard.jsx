import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

function BooksCard({ id, bookName, description, imageLink, author, releaseDate, deleteBook }) {
  const msg = new SpeechSynthesisUtterance();

  const speechHandler = (msg) => {
    msg.lang = "en-US";
    msg.text = description;
    window.speechSynthesis.speak(msg);
  };

  const downloadFile = () => {
    window.location.href = "https://drive.google.com/uc?export=download&id=1xNW2-phSK3sWx_ox-ha2wglo42cekn1p";
  };

  return (
    <Card className='custom-card'>
      {imageLink ? <Card.Img variant="top" src="holder.js/100px180?text=Image cap" /> : <div className='default-img'>Image is not available</div>}
      <Card.Body>
        <Card.Title>{bookName}</Card.Title>
        <Card.Text className="card-description">
          {description}
        </Card.Text>
        <div className="button-container">
          <button onClick={() => speechHandler(msg)}>Speak</button>
          <button onClick={downloadFile}>Download PDF</button>
        </div>
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
