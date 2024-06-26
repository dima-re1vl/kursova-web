import React, { useState, useEffect } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { useAuth } from '../../../context/AuthContext'; 
import { useNavigate } from 'react-router-dom';
import styles from './AddBook.module.css';

const AddBook = () => {
  const [authors, setAuthors] = useState('');
  const [title, setTitle] = useState('');
  const [publisher, setPublisher] = useState('');
  const [pages, setPages] = useState('');
  const [year, setYear] = useState('');
  const [srcPhoto, setSrcPhoto] = useState('');
  const [srcDownload, setSrcDownload] = useState('');
  const [formIncomplete, setFormIncomplete] = useState(false);
  
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!authors || !title || !publisher || !pages || !year || !srcPhoto || !srcDownload) {
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
        srcPhoto,
        srcDownload // Додавання srcDownload до об'єкта bookData
      };

      const docRef = await addDoc(collection(db, 'books'), bookData);
      console.log('Book added with ID: ', docRef.id);

      setAuthors('');
      setTitle('');
      setPublisher('');
      setPages('');
      setYear('');
      setSrcPhoto('');
      setSrcDownload('');
      setFormIncomplete(false);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Add Book</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          Authors (comma separated):
          <input
            type="text"
            value={authors}
            onChange={(e) => setAuthors(e.target.value)}
            className={`${styles.input} ${formIncomplete && !authors ? styles.incomplete : ''}`}
          />
        </label>
        <label className={styles.label}>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`${styles.input} ${formIncomplete && !title ? styles.incomplete : ''}`}
          />
        </label>
        <label className={styles.label}>
          Publisher:
          <input
            type="text"
            value={publisher}
            onChange={(e) => setPublisher(e.target.value)}
            className={`${styles.input} ${formIncomplete && !publisher ? styles.incomplete : ''}`}
          />
        </label>
        <label className={styles.label}>
          Pages:
          <input
            type="number"
            value={pages}
            onChange={(e) => setPages(e.target.value)}
            className={`${styles.input} ${formIncomplete && !pages ? styles.incomplete : ''}`}
          />
        </label>
        <label className={styles.label}>
          Year:
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className={`${styles.input} ${formIncomplete && !year ? styles.incomplete : ''}`}
          />
        </label>
        <label className={styles.label}>
          Source Photo:
          <input
            type="text"
            value={srcPhoto}
            onChange={(e) => setSrcPhoto(e.target.value)}
            className={`${styles.input} ${formIncomplete && !srcPhoto ? styles.incomplete : ''}`}
          />
        </label>
        <label className={styles.label}>
          Source Download:
          <input
            type="text"
            value={srcDownload}
            onChange={(e) => setSrcDownload(e.target.value)}
            className={`${styles.input} ${formIncomplete && !srcDownload ? styles.incomplete : ''}`}
          />
        </label>
        {formIncomplete && <p className={styles.errorMessage}>Please fill out all fields.</p>}
        <button type="submit" className={styles.btn}>Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;
