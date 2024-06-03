import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import styles from './AddBook.module.css';

const AddBook = () => {
  const [authors, setAuthors] = useState('');
  const [title, setTitle] = useState('');
  const [publisher, setPublisher] = useState('');
  const [pages, setPages] = useState('');
  const [year, setYear] = useState('');
  const [srcPhoto, setSrcPhoto] = useState('');
  const [formIncomplete, setFormIncomplete] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!authors || !title || !publisher || !pages || !year || !srcPhoto) {
      setFormIncomplete(true);
      return;
    }

    try {
      const bookData = {
        authors: authors.split(',').map(author => author.trim()),
        title,
        publisher,
        pages: Number(pages),
        year: Number(year),
        srcPhoto
      };

      const docRef = await addDoc(collection(db, 'books'), bookData);
      console.log('Book added with ID: ', docRef.id);

      // Clear form fields after successful submission
      setAuthors('');
      setTitle('');
      setPublisher('');
      setPages('');
      setYear('');
      setSrcPhoto('');
      setFormIncomplete(false);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Add Book</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          Authors (comma separated):
          <input
            type="text"
            value={authors}
            onChange={(e) => setAuthors(e.target.value)}
            className={formIncomplete && !authors ? styles.incomplete : ''}
          />
        </label>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={formIncomplete && !title ? styles.incomplete : ''}
          />
        </label>
        <label>
          Publisher:
          <input
            type="text"
            value={publisher}
            onChange={(e) => setPublisher(e.target.value)}
            className={formIncomplete && !publisher ? styles.incomplete : ''}
          />
        </label>
        <label>
          Pages:
          <input
            type="number"
            value={pages}
            onChange={(e) => setPages(e.target.value)}
            className={formIncomplete && !pages ? styles.incomplete : ''}
          />
        </label>
        <label>
          Year:
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className={formIncomplete && !year ? styles.incomplete : ''}
          />
        </label>
        <label>
          Source Photo:
          <input
            type="text"
            value={srcPhoto}
            onChange={(e) => setSrcPhoto(e.target.value)}
            className={formIncomplete && !srcPhoto ? styles.incomplete : ''}
          />
        </label>
        {formIncomplete && <p className={styles.errorMessage}>Please fill out all fields.</p>}
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;
