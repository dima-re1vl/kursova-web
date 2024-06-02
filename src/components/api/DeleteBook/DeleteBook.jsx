import React, { useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import BookCard from '../../BookCard/BookCard';
import styles from './DeleteBook.module.css';

const DeleteBook = () => {
  const [books, setBooks] = useState([]);
  //const [filter, setFilter] = useState({ title: '', author: '', publisher: '', year: '' });

  const fetchBooks = async () => {
    const querySnapshot = await getDocs(collection(db, 'books'));
    const booksList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setBooks(booksList);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'books', id));
      setBooks(books.filter(book => book.id !== id));
      alert('Book deleted successfully!');
    } catch (e) {
      console.error('Error deleting document: ', e);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Delete Books</h2>
      <button onClick={fetchBooks}>Load Books</button>
      <div className={styles.books}>
        {books.map(book => (
          <BookCard key={book.id} book={book} onDelete={() => handleDelete(book.id)} />
        ))}
      </div>
    </div>
  );
};

export default DeleteBook;
