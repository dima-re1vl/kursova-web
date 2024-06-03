import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Modal from '../Modal/Modal';
import AuthForm from '../AuthForm/AuthForm';
import styles from './Header.module.css';

const Header = () => {
  const { currentUser, logout } = useAuth();
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
      <h1>Book Management System</h1>
      <div className={styles.auth}>
        {currentUser ? (
          <>
            <span>Welcome, {currentUser.email}</span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <button onClick={() => handleOpenModal('login')}>Login</button>
            <button onClick={() => handleOpenModal('register')}>Register</button>
          </>
        )}
      </div>
      <Modal show={showModal} onClose={handleCloseModal}>
        <AuthForm type={authType} onClose={handleCloseModal} />
      </Modal>
    </header>
  );
};

export default Header;
