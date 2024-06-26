import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import styles from './EditBook.module.css';

const EditBook = () => {
  const [books, setBooks] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState('');
  const [bookDetails, setBookDetails] = useState({
    authors: '',
    title: '',
    publisher: '',
    pages: '',
    year: '',
    srcPhoto: '',
    srcDownload: '' // Додавання srcDownload до деталей книги
  });

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
    }
  }, [user, navigate]);

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
      year: book.year,
      srcPhoto: book.srcPhoto || '',
      srcDownload: book.srcDownload || '' // Додавання srcDownload до деталей книги
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
      year: Number(bookDetails.year),
      srcPhoto: bookDetails.srcPhoto,
      srcDownload: bookDetails.srcDownload // Додавання srcDownload до об'єкта updatedBook
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
            <div className={styles.card}>
              <img src={book.srcPhoto} alt={book.title} className={styles.cardImage} />
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{book.title}</h3>
                <p className={styles.cardText}>Author(s): {book.authors.join(', ')}</p>
                <p className={styles.cardText}>Publisher: {book.publisher}</p>
                <p className={styles.cardText}>Pages: {book.pages}</p>
                <p className={styles.cardText}>Year: {book.year}</p>
                <a href={book.srcDownload} className={styles.downloadBtn} target="_blank" rel="noopener noreferrer">Download</a>
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedBookId && (
        <form onSubmit={handleSaveChanges} className={styles.form}>
          <label className={styles.label}>
            Authors (comma separated):
            <input
              type="text"
              name="authors"
              value={bookDetails.authors}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </label>
          <label className={styles.label}>
            Title:
            <input
              type="text"
              name="title"
              value={bookDetails.title}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </label>
          <label className={styles.label}>
            Publisher:
            <input
              type="text"
              name="publisher"
              value={bookDetails.publisher}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </label>
          <label className={styles.label}>
            Pages:
            <input
              type="number"
              name="pages"
              value={bookDetails.pages}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </label>
          <label className={styles.label}>
            Year:
            <input
              type="number"
              name="year"
              value={bookDetails.year}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </label>
          <label className={styles.label}>
            Source Photo:
            <input
              type="text"
              name="srcPhoto"
              value={bookDetails.srcPhoto}
              onChange={handleChange}
              className={styles.input}
            />
          </label>
          <label className={styles.label}>
            Source Download:
            <input
              type="text"
              name="srcDownload"
              value={bookDetails.srcDownload}
              onChange={handleChange}
              className={styles.input}
            />
          </label>
          <button type="submit" className={styles.btn}>Save Changes</button>
        </form>
      )}
    </div>
  );
};

export default EditBook;
