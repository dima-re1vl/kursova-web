import React from 'react';
import styles from './BookCard.module.css';

const BookCard = ({ book }) => {
  return (
    <div className={styles.card}>
      <h3>{book.title}</h3>
      <p><strong>Authors:</strong> {book.authors.join(', ')}</p>
      <p><strong>Publisher:</strong> {book.publisher}</p>
      <p><strong>Pages:</strong> {book.pages}</p>
      <p><strong>Year:</strong> {book.year}</p>
      <div className={styles.actions}>
        <button>Edit</button>
        <button>Delete</button>
      </div>
    </div>
  );
};

export default BookCard;
