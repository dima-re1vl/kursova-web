import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DeleteBook from './components/api/DeleteBook/DeleteBook';
import Navbar from './components/Navbar/Navbar';
import AddBook from './components/api/AddBook/AddBook';
import EditBook from './components/api/EditBook/EditBook';
import FindBooks from './components/api/FindBook/FindBook';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<FindBooks />} />
          <Route path="/add" element={<AddBook />} />
          <Route path="/edit" element={<EditBook />} />
          <Route path="/delete" element={<DeleteBook />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
