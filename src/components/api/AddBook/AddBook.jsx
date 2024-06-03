import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import styles from './AddBook.module.css';

const AddBook = () => {
  const [book, setBook] = useState({
    authors: '',
    title: '',
    publisher: '',
    pages: '',
    year: '',
    srcPhoto: ''
  });

  const handleChange = (e) => {
    setBook({
      ...book,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bookData = {
      ...book,
      pages: Number(book.pages),
      year: Number(book.year),
      authors: book.authors.split(',').map(author => author.trim())
    };

    await addDoc(collection(db, 'books'), bookData);
    setBook({
      authors: '',
      title: '',
      publisher: '',
      pages: '',
      year: '',
      srcPhoto: ''
    });
  };

  return (
    <div className={styles.container}>
      <h2>Add Book</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          Authors (comma separated):
          <input type="text" name="authors" value={book.authors} onChange={handleChange} />
        </label>
        <label>
          Title:
          <input type="text" name="title" value={book.title} onChange={handleChange} />
        </label>
        <label>
          Publisher:
          <input type="text" name="publisher" value={book.publisher} onChange={handleChange} />
        </label>
        <label>
          Pages:
          <input type="number" name="pages" value={book.pages} onChange={handleChange} />
        </label>
        <label>
          Year:
          <input type="number" name="year" value={book.year} onChange={handleChange} />
        </label>
        <label>
          Photo URL:
          <input type="text" name="srcPhoto" value={book.srcPhoto} onChange={handleChange} />
        </label>
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;
