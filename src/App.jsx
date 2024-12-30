import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './HomePage';
import MovieDetailsPage from './MovieDetailsPage';
import FavoritesPage from './FavoritesPage';
import Nav from './Nav';

function App() {
  return (
    <Router>
      <Nav/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie/:id" element={<MovieDetailsPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
