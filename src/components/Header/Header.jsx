import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Modal from '../Modal/Modal';
import AuthForm from '../AuthForm/AuthForm';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';

const Header = () => {
  const { user, logout } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [authType, setAuthType] = useState('login');

  const handleOpenModal = (type) => {
    setAuthType(type);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        <img src="https://cdn-icons-png.flaticon.com/512/1157/1157109.png" alt="Logo" />
      </Link>
      <h1 className={styles.title}>Shkolenko's Library</h1>
      <div className={styles.auth}>
        {user ? (
          <div className={styles.userSection}>
            <img src='https://cdn.pixabay.com/photo/2019/08/11/18/59/icon-4399701_1280.png' alt="User Avatar" className={styles.avatar} />
            <div className={styles.dropdown}>
              <span className={styles.userEmail}>{user.email}</span>
              <button onClick={logout} className={styles.logoutButton}>Logout</button>
            </div>
          </div>
        ) : (
          <div className={styles.buttons}>
            <button onClick={() => handleOpenModal('login')} className={styles.authButton}>Login</button>
            <button onClick={() => handleOpenModal('register')} className={styles.authButton}>Register</button>
          </div>
        )}
      </div>
      <Modal show={showModal} onClose={handleCloseModal}>
        <AuthForm type={authType} onClose={handleCloseModal} />
      </Modal>
    </header>
  );
};

export default Header;
