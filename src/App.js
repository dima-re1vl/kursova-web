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
      <Router>
        <Header />
        <Routes>
          <Route path="https://dima-re1vl.github.io/kursova-web/" element={<Home />} />
          <Route path="https://dima-re1vl.github.io/kursova-web/find" element={<FindBook />} />
          <Route path="https://dima-re1vl.github.io/kursova-web/edit" element={<EditBook />} />
          <Route path="https://dima-re1vl.github.io/kursova-web/delete" element={<DeleteBook />} />
          <Route path="https://dima-re1vl.github.io/kursova-web/add" element={<AddBook />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
