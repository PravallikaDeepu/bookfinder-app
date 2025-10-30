import React, { useEffect, useState } from 'react';
import '../components/style.css'
import { Link } from "react-router-dom";

function HomePage() {
  const [books, setBooks] = useState([]);
  const [bookTitle, setBookTitle] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (bookTitle.trim() === '') {
        setBooks([]); // clear previous search results
        return;
      }

      const response = await fetch(
        `https://openlibrary.org/search.json?title=${bookTitle}`
      );
      const data = await response.json();
      setBooks(data.docs.splice(0, 50));
      console.log(books,"consoling")
    };

    fetchData();
  }, [bookTitle]);

  function searchBook(e) {
    setBookTitle(e.target.value);
  }

  return (
    <div className="container text-center mt-4 hero">
      <h1>📚 Book Finder</h1>
      <p>
        Find your next favourite book — explore by category or search directly!
      </p>

      <form className="d-flex justify-content-center mb-3" role="search" onSubmit={(e) => e.preventDefault()}>
        <input
          className="form-control me-2 w-50"
          type="search"
          placeholder="Search for a book..."
          value={bookTitle}
          aria-label="Search"
          onChange={searchBook}
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>

      {bookTitle.trim() === '' ? (
      <h6 className="text-muted">
          Please enter a book title above to find books.
        </h6>
      ) : books.length === 0 ? (
        <p style={{fontSize: "10px"}}>No results found for "{bookTitle}". Try a different title.</p>
      ) : (
        <div className="d-flex flex-wrap justify-content-center">
          {books.map((i, index) => (
            <div
              key={index}
              className="card m-3"
              style={{ width: '18rem' }}
            >
              {i.cover_i ? (
                <img
                  src={`https://covers.openlibrary.org/b/id/${i.cover_i}-L.jpg`}
                  className="card-img-top"
                  alt={i.title}
                />
              ) : (
                <img
                  src="https://via.placeholder.com/150x200?text=No+Cover"
                  className="card-img-top"
                  alt="No cover"
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{i.title}</h5>
                <p className="card-text">Author: {i.author_name?.join(', ')}</p>
                <p className="card-text">
                  Published: {i.first_publish_year || 'N/A'}
                </p>
                import { Link } from "react-router-dom";

<Link
  to={`/book/${i.key.replace('/works/', '')}`}
  state={{ book: i }} 
  className="read-more"
>
  Read More
</Link>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;
