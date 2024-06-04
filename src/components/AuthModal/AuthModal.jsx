// AuthModal.jsx
import React, { createContext, useState } from 'react';
import { getDocs, collection, addDoc, query, where } from 'firebase/firestore';
import { db } from '../firebase/firebase';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const login = async (email, password) => {
    try {
      const q = query(collection(db, 'auth'), where('email', '==', email), where('password', '==', password));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        setCurrentUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      throw new Error('Error logging in: ' + error.message);
    }
  };

  const register = async (email, password) => {
    try {
      const newUser = { email, password, role: 'guest' };
      await addDoc(collection(db, 'auth'), newUser);
      setCurrentUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
    } catch (error) {
      throw new Error('Error registering: ' + error.message);
    }
  };

  const logout = async () => {
    try {
      setCurrentUser(null);
      localStorage.removeItem('user');
    } catch (error) {
      throw new Error('Error logging out: ' + error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
