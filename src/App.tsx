

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import EditBook from './pages/EditBook/EditBook';
import AddBook from './pages/AddBook/AddBook';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/edit-book/:id" element={<EditBook />} />
          <Route path="/add-book" element={<AddBook />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
