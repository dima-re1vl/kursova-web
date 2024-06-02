import React, { useRef } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import styles from './AddBook.module.css';

const AddBook = () => {
  const authorsRef = useRef(null);
  const titleRef = useRef(null);
  const publisherRef = useRef(null);
  const pagesRef = useRef(null);
  const yearRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newBook = {
      authors: authorsRef.current.value.split(',').map(author => author.trim()),
      title: titleRef.current.value,
      publisher: publisherRef.current.value,
      pages: Number(pagesRef.current.value),
      year: Number(yearRef.current.value)
    };

    try {
      await addDoc(collection(db, 'books'), newBook);
      alert('Book added successfully!');
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label>
        Authors (comma separated):
        <input ref={authorsRef} type="text" name="authors" required />
      </label>
      <label>
        Title:
        <input ref={titleRef} type="text" name="title" required />
      </label>
      <label>
        Publisher:
        <input ref={publisherRef} type="text" name="publisher" required />
      </label>
      <label>
        Pages:
        <input ref={pagesRef} type="number" name="pages" required />
      </label>
      <label>
        Year:
        <input ref={yearRef} type="number" name="year" required />
      </label>
      <button type="submit">Add Book</button>
    </form>
  );
};

export default AddBook;
