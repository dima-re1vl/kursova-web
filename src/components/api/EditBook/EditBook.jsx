import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import styles from './EditBook.module.css';

const EditBook = () => {
  const [books, setBooks] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState('');
  const [bookDetails, setBookDetails] = useState({
    authors: '',
    title: '',
    publisher: '',
    pages: '',
    year: ''
  });

  useEffect(() => {
    const fetchBooks = async () => {
      const querySnapshot = await getDocs(collection(db, 'books'));
      const booksList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBooks(booksList);
    };

    fetchBooks();
  }, []);

  const handleSelectBook = (bookId) => {
    const book = books.find(b => b.id === bookId);
    setSelectedBookId(bookId);
    setBookDetails({
      authors: book.authors.join(', '),
      title: book.title,
      publisher: book.publisher,
      pages: book.pages,
      year: book.year
    });
  };

  const handleChange = (e) => {
    setBookDetails({
      ...bookDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    const updatedBook = {
      authors: bookDetails.authors.split(',').map(author => author.trim()),
      title: bookDetails.title,
      publisher: bookDetails.publisher,
      pages: Number(bookDetails.pages),
      year: Number(bookDetails.year)
    };

    try {
      const bookRef = doc(db, 'books', selectedBookId);
      await updateDoc(bookRef, updatedBook);
      alert('Book updated successfully!');
    } catch (e) {
      console.error('Error updating document: ', e);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Edit Book</h2>
      <div className={styles.booksList}>
        {books.map(book => (
          <div
            key={book.id}
            className={`${styles.bookItem} ${selectedBookId === book.id ? styles.selected : ''}`}
            onClick={() => handleSelectBook(book.id)}
          >
            {book.title}
          </div>
        ))}
      </div>
      {selectedBookId && (
        <form onSubmit={handleSaveChanges} className={styles.form}>
          <label>
            Authors (comma separated):
            <input
              type="text"
              name="authors"
              value={bookDetails.authors}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={bookDetails.title}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Publisher:
            <input
              type="text"
              name="publisher"
              value={bookDetails.publisher}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Pages:
            <input
              type="number"
              name="pages"
              value={bookDetails.pages}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Year:
            <input
              type="number"
              name="year"
              value={bookDetails.year}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit">Save Changes</button>
        </form>
      )}
    </div>
  );
};

export default EditBook;
