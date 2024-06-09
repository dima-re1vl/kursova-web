import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './Home.module.css';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className={styles.container}>
      <div className={styles.cards}>
        {user && user.role === 'admin' && (
          <div className={styles.card}>
            <Link to="/add" className={styles.link}>
              <img src="https://cdn-icons-png.flaticon.com/512/992/992651.png" alt="Add Book" className={styles.image} />
              <div className={styles.description}>
                <h3>Add Book</h3>
                <p>Add a new book to the library.</p>
              </div>
            </Link>
          </div>
        )}
        {user && user.role === 'admin' && (
          <div className={styles.card}>
            <Link to="/edit" className={styles.link}>
              <img src="https://static-00.iconduck.com/assets.00/edit-icon-2048x2048-6svwfwto.png" alt="Edit Book" className={styles.image} />
              <div className={styles.description}>
                <h3>Edit Book</h3>
                <p>Edit an existing book in the library.</p>
              </div>
            </Link>
          </div>
        )}
        <div className={styles.card}>
          <Link to="/find" className={styles.link}>
            <img src="https://static.thenounproject.com/png/209393-200.png" alt="Find Book" className={styles.image} />
            <div className={styles.description}>
              <h3>Find Books</h3>
              <p>Search for books in the library.</p>
            </div>
          </Link>
        </div>
        {user && user.role === 'admin' && (
          <div className={styles.card}>
            <Link to="/delete" className={styles.link}>
              <img src="https://static-00.iconduck.com/assets.00/delete-icon-1864x2048-bp2i0gor.png" alt="Delete Book" className={styles.image} />
              <div className={styles.description}>
                <h3>Delete Book</h3>
                <p>Delete a book from the library.</p>
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
