import React, { useState, useContext } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { AuthContext } from '../../context/AuthContext';
import styles from './Login.module.css';

const Login = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setUser } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const q = query(collection(db, 'auth'), where('email', '==', email), where('password', '==', password));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const user = querySnapshot.docs[0].data();
        setUser(user);
        alert('Login successful');
        onClose();
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      console.error('Error logging in: ', err);
      setError('Failed to login');
    }
  };

  return (
    <div className={styles.modal}>
      <form onSubmit={handleLogin} className={styles.form}>
        <h2>Login</h2>
        {error && <p className={styles.error}>{error}</p>}
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Login</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default Login;
