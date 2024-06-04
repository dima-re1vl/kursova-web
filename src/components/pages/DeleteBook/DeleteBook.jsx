import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import styles from './DeleteBook.module.css';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const DeleteBook = () => {
  const [books, setBooks] = useState([]);

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

  const handleDelete = async (bookId) => {
    try {
      await deleteDoc(doc(db, 'books', bookId));
      setBooks(books.filter(book => book.id !== bookId));
      alert('Book deleted successfully!');
    } catch (e) {
      console.error('Error deleting document: ', e);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Delete Books</h2>
      <div className={styles.booksList}>
        {books.map(book => (
          <div key={book.id} className={styles.bookItem}>
            <h3>{book.title}</h3>
            <p>Authors: {book.authors.join(', ')}</p>
            <p>Publisher: {book.publisher}</p>
            <p>Pages: {book.pages}</p>
            <p>Year: {book.year}</p>
            <button onClick={() => handleDelete(book.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeleteBook;
