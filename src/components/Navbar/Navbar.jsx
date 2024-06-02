import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <Link to="/add" className={styles.navlink}>Add Book</Link>
      <Link to="/edit" className={styles.navlink}>Edit Book</Link>
      <Link to="/" className={styles.navlink}>Find Books</Link>
      <Link to="/delete" className={styles.navlink}>Delete Book</Link>
    </nav>
  );
};

export default Navbar;
