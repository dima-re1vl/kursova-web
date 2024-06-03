import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.container}>
      <h1>Library Management System</h1>
      <div className={styles.cards}>
        <div className={styles.card}>
          <Link to="/add">
            <img src="https://cdn0.iconfinder.com/data/icons/reading/154/add-books-read-literature-512.png" alt="Add Book" className={styles.image} />
            <div className={styles.description}>
              <h3>Add Book</h3>
              <p>Add a new book to the library.</p>
            </div>
          </Link>
        </div>
        <div className={styles.card}>
          <Link to="/edit">
            <img src="https://cdn-ackhb.nitrocdn.com/YTibXMIwXCUkXtfHFnkSuEHUqRRKKBBW/assets/images/optimized/rev-6ede3c6/kindlepreneur.com/wp-content/uploads/2019/10/edit-book-editor.jpg" alt="Edit Book" className={styles.image} />
            <div className={styles.description}>
              <h3>Edit Book</h3>
              <p>Edit an existing book in the library.</p>
            </div>
          </Link>
        </div>
        <div className={styles.card}>
          <Link to="/find">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7JjAQiI480KWMXr6Bt5MoaUM3_aUWw1rpl4zMoToJ3kCO6-zq_ZMSLTWo7IZc9Mcs-eQ&usqp=CAU" alt="Find Book" className={styles.image} />
            <div className={styles.description}>
              <h3>Find Books</h3>
              <p>Search for books in the library.</p>
            </div>
          </Link>
        </div>
        <div className={styles.card}>
          <Link to="/delete">
            <img src="data:image/png;base64,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" alt="Delete Book" className={styles.image} />
            <div className={styles.description}>
              <h3>Delete Book</h3>
              <p>Delete a book from the library.</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
