import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import styles from './Register.module.css';

const Register = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (form.email === '' || form.password === '') {
        setError('Please fill in all fields');
        return;
      }
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
  };

  return (
    <div className={styles.container}>
      <h2>Register</h2>
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
