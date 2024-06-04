import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // імпорт контексту автентифікації
import styles from './Home.module.css';

const Home = () => {
  const { user } = useAuth(); // отримання поточного користувача з контексту автентифікації

  return (
    <div className={styles.container}>
      <h1>Library Management System</h1>
      <div className={styles.cards}>
        {/* Перевірка ролі користувача перед відображенням кнопок */}
        {user && user.role === 'admin' && (
          <div className={styles.card}>
            <Link to="/add">
              <img src="https://cdn0.iconfinder.com/data/icons/reading/154/add-books-read-literature-512.png" alt="Add Book" className={styles.image} />
              <div className={styles.description}>
                <h3>Add Book</h3>
                <p>Add a new book to the library.</p>
              </div>
            </Link>
          </div>
        )}
        {/* Перевірка ролі користувача перед відображенням кнопок */}
        {user && user.role === 'admin' && (
          <div className={styles.card}>
            <Link to="/edit">
              <img src="_" alt="Edit Book" className={styles.image} />
              <div className={styles.description}>
                <h3>Edit Book</h3>
                <p>Edit an existing book in the library.</p>
              </div>
            </Link>
          </div>
        )}
        {/* Звичайне відображення кнопки, якщо користувач не є адміном */}
        <div className={styles.card}>
          <Link to="/find">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7JjAQiI480KWMXr6Bt5MoaUM3_aUWw1rpl4zMoToJ3kCO6-zq_ZMSLTWo7IZc9Mcs-eQ&usqp=CAU" alt="Find Book" className={styles.image} />
            <div className={styles.description}>
              <h3>Find Books</h3>
              <p>Search for books in the library.</p>
            </div>
          </Link>
        </div>
        {/* Перевірка ролі користувача перед відображенням кнопок */}
        {user && user.role === 'admin' && (
          <div className={styles.card}>
            <Link to="/delete">
              <img src="_" alt="Delete Book" className={styles.image} />
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
