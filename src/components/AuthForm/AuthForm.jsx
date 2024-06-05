import React, { useState } from 'react';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useAuth } from '../../context/AuthContext';

import styles from './AuthForm.module.css';

const AuthForm = ({ type, onClose }) => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { setCurrentUser } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (form.email === '' || form.password === '') {
      setError('Please fill in all fields');
      return;
    }

    if (type === 'register') {
      try {
        await addDoc(collection(db, 'auth'), {
          email: form.email,
          password: form.password,
          role: 'guest',
        });
        alert('User registered successfully!');
      } catch (error) {
        console.error('Error adding document: ', error);
        setError('Registration failed');
      }
    } else if (type === 'login') {
      try {
        const q = query(collection(db, 'auth'), where('email', '==', form.email), where('password', '==', form.password));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          setCurrentUser({ id: userDoc.id, ...userDoc.data() });
          onClose();
          console.log('Login successful!'); // Додаємо повідомлення про успішний вхід у консоль
        } else {
          setError('Invalid email or password');
        }
      } catch (error) {
        console.error('Error fetching document: ', error);
        setError('Login failed');
      }
    }
  };

  return (
    <div className={styles.container}>
      <h2>{type === 'login' ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </label>
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit">{type === 'login' ? 'Login' : 'Register'}</button>
      </form>
    </div>
  );
};

export default AuthForm;
