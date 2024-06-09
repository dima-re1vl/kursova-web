import React, { useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import styles from './FindBook.module.css';

const FindBooks = () => {
  const [books, setBooks] = useState([]);
  const [searchParams, setSearchParams] = useState({
    authors: '',
    title: '',
    publisher: '',
    pages: '',
    year: ''
  });

  const handleChange = (e) => {
    setSearchParams({
      ...searchParams,
      [e.target.name]: e.target.value
    });
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    const booksRef = collection(db, 'books');
    let q = query(booksRef);

    if (searchParams.authors !== '') {
      const authorsArray = searchParams.authors.split(',').map(author => author.trim());
      q = query(q, where('authors', 'array-contains-any', authorsArray));
    }

    if (searchParams.title !== '') {
      q = query(q, where('title', '==', searchParams.title));
    }

    if (searchParams.publisher !== '') {
      q = query(q, where('publisher', '==', searchParams.publisher));
    }

    if (searchParams.pages !== '') {
      q = query(q, where('pages', '==', Number(searchParams.pages)));
    }

    if (searchParams.year !== '') {
      q = query(q, where('year', '==', Number(searchParams.year)));
    }

    const querySnapshot = await getDocs(q);
    const booksList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setBooks(booksList);
  };

  return (
    <div className={styles.container}>
      <h2>Find Books</h2>
      <form onSubmit={handleSearch} className={styles.form}>
        <label className={styles.label}>
          Authors (comma separated):
          <input type="text" name="authors" value={searchParams.authors} onChange={handleChange} className={styles.input} />
        </label>
        <label className={styles.label}>
          Title:
          <input type="text" name="title" value={searchParams.title} onChange={handleChange} className={styles.input} />
        </label>
        <label className={styles.label}>
          Publisher:
          <input type="text" name="publisher" value={searchParams.publisher} onChange={handleChange} className={styles.input} />
        </label>
        <label className={styles.label}>
          Pages:
          <input type="number" name="pages" value={searchParams.pages} onChange={handleChange} className={styles.input} />
        </label>
        <label className={styles.label}>
          Year:
          <input type="number" name="year" value={searchParams.year} onChange={handleChange} className={styles.input} />
        </label>
        <button type="submit" className={styles.btn}>Search</button>
      </form>
      <div className={styles.booksList}>
        {books.map(book => (
          <div key={book.id} className={styles.bookItem}>
            {book.srcPhoto && <img src={book.srcPhoto} alt={book.title} className={styles.bookImage} />}
            <h3>{book.title}</h3>
            <p>Authors: {book.authors.join(', ')}</p>
            <p>Publisher: {book.publisher}</p>
            <p>Pages: {book.pages}</p>
            <p>Year: {book.year}</p>
            <a href={book.srcDownload} className={styles.downloadBtn} target="_blank" rel="noopener noreferrer">Download</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FindBooks;
