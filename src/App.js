import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AddBook from './components/api/AddBook/AddBook';
import EditBook from './components/api/EditBook/EditBook';
import FindBooks from './components/api/FindBook/FindBook';
import DeleteBook from './components/api/DeleteBook/DeleteBook';
import Home from './components/Home/Home';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddBook />} />
        <Route path="/edit" element={<EditBook />} />
        <Route path="/find" element={<FindBooks />} />
        <Route path="/delete" element={<DeleteBook />} />
      </Routes>
    </div>
  );
}

export default App;
