import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function BookDetails() {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    fetch(`https://openlibrary.org/works/${bookId}.json`)
      .then(res => res.json())
      .then(data => setBook(data));
  }, [bookId]);

  if (!book) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h2>{book.title}</h2>
      {book.description ? (
        <p>{book.description.value || book.description}</p>
      ) : (
        <p>No description available.</p>
      )}
      {book.covers && (
        <img
          src={`https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`}
          alt={book.title}
          className="img-fluid mt-3"
        />
      )}
    </div>
  );
}

export default BookDetails;
