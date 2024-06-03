import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AddBook from './components/pages/AddBook/AddBook';
import EditBook from './components/pages/EditBook/EditBook';
import FindBooks from './components/pages/FindBook/FindBook';
import DeleteBook from './components/pages/DeleteBook/DeleteBook';
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
