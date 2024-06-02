import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import BookCard from '../../BookCard/BookCard';
import styles from './FindBook.module.css';

const FindBooks = () => {
  const [books, setBooks] = useState([]);
  const [filter, setFilter] = useState({ title: '', author: '', publisher: '', year: '' });

  useEffect(() => {
    const fetchBooks = async () => {
      const q = query(collection(db, 'books'), where('title', '==', filter.title));
      const querySnapshot = await getDocs(q);
      const booksList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBooks(booksList);
    };

    if (filter.title !== '') {
      fetchBooks();
    }
  }, [filter]);

  return (
    <div className={styles.container}>
      <h2>Find Books</h2>
      <div className={styles.filters}>
        <input
          type="text"
          placeholder="Title"
          value={filter.title}
          onChange={(e) => setFilter({ ...filter, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Author"
          value={filter.author}
          onChange={(e) => setFilter({ ...filter, author: e.target.value })}
        />
        <input
          type="text"
          placeholder="Publisher"
          value={filter.publisher}
          onChange={(e) => setFilter({ ...filter, publisher: e.target.value })}
        />
        <input
          type="number"
          placeholder="Year"
          value={filter.year}
          onChange={(e) => setFilter({ ...filter, year: e.target.value })}
        />
      </div>
      <div className={styles.books}>
        {books.map(book => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default FindBooks;
