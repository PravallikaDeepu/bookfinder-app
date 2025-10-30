import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";

function BookDetails() {
  const { state } = useLocation();
  const book = state?.book;
  const [description, setDescription] = useState("Loading description...");

  useEffect(() => {
    if (book?.key) {
      fetch(`https://openlibrary.org${book.key}.json`)
        .then((res) => res.json())
        .then((data) => {
          let desc = "No description available.";

          if (typeof data.description === "string") {
            desc = data.description;
          } else if (data.description?.value) {
            desc = data.description.value;
          }

          if (typeof desc !== "string") {
            desc = "No description available.";
          }

          setDescription(desc);
        })
        .catch(() => setDescription("Failed to load description."));
    }
  }, [book]);

  if (!book) {
    return <p className="text-center mt-4">No book data found!</p>;
  }

  return (
    <div className="container mt-5">
      <div className="row bg-light p-4 rounded shadow">
        <div className="col-md-4 text-center mb-4 mb-md-0">
          <img
            src={
              book.cover_i
                ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
                : "https://via.placeholder.com/200x300?text=No+Cover"
            }
            alt={book.title}
            className="img-fluid rounded shadow-sm"
          />
        </div>

        <div className="col-md-8">
          <h2 className="fw-bold text-primary mb-3">{book.title}</h2>
          <p><strong>Author:</strong> {book.author_name?.join(", ") || "Unknown"}</p>
          <p><strong>First Published:</strong> {book.first_publish_year || "N/A"}</p>
          <p><strong>Edition Count:</strong> {book.edition_count || "N/A"}</p>
          <p className="text-secondary mt-3">{String(description)}</p>

          <Link to="/" className="btn btn-outline-primary mt-3 px-4">
            Back to Search
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
