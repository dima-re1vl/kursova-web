import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header/Header';
import FindBook from './components/pages/FindBook/FindBook';
import EditBook from './components/pages/EditBook/EditBook';
import AddBook from './components/pages/AddBook/AddBook';
import DeleteBook from './components/pages/DeleteBook/DeleteBook'
import Home from './components/Home/Home'

const App = () => {
  return (
    <AuthProvider>
      <Router basename="/kursova-web">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/find" element={<FindBook />} />
          <Route path="/edit" element={<EditBook />} />
          <Route path="/delete" element={<DeleteBook />} />
          <Route path="/add" element={<AddBook />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
