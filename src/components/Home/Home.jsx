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
              <img src="https://cdn0.iconfinder.com/data/icons/reading/154/add-books-read-literature-512.png" alt="Add Book" className={styles.image} />
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
              <img src="https://cdn-ackhb.nitrocdn.com/YTibXMIwXCUkXtfHFnkSuEHUqRRKKBBW/assets/images/optimized/rev-6ede3c6/kindlepreneur.com/wp-content/uploads/2019/10/edit-book-editor.jpg" alt="Edit Book" className={styles.image} />
              <div className={styles.description}>
                <h3>Edit Book</h3>
                <p>Edit an existing book in the library.</p>
              </div>
            </Link>
          </div>
        )}
        <div className={styles.card}>
          <Link to="/find" className={styles.link}>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7JjAQiI480KWMXr6Bt5MoaUM3_aUWw1rpl4zMoToJ3kCO6-zq_ZMSLTWo7IZc9Mcs-eQ&usqp=CAU" alt="Find Book" className={styles.image} />
            <div className={styles.description}>
              <h3>Find Books</h3>
              <p>Search for books in the library.</p>
            </div>
          </Link>
        </div>
        {user && user.role === 'admin' && (
          <div className={styles.card}>
            <Link to="/delete" className={styles.link}>
              <img src="https://cdn0.iconfinder.com/data/icons/reading/154/delete-books-read-literature-512.png" alt="Delete Book" className={styles.image} />
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
