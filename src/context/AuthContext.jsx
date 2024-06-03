import React, { createContext, useState, useEffect } from 'react';
import { getDocs, collection, addDoc, query, where } from 'firebase/firestore';
import { db } from '../components/firebase/firebase';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem('user'));
    if (loggedUser) {
      setUser(loggedUser);
    }
  }, []);

  const login = async (email, password) => {
    const q = query(collection(db, 'auth'), where('email', '==', email), where('password', '==', password));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const userData = querySnapshot.docs[0].data();
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } else {
      throw new Error('Invalid email or password');
    }
  };

  const register = async (email, password) => {
    const newUser = { email, password, role: 'guest' };
    await addDoc(collection(db, 'auth'), newUser);
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const setCurrentUser = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
