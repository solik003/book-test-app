
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import { BookProvider } from './context/BookContext';
import { FilterProvider } from './context/FilterContext';
import { FilteredBookProvider } from './context/FilteredBooksContext';
import { BookFormPage } from './pages/BookFormPage/BookFormPage';

const App: React.FC = () => {
  return (
    <Router>
      <BookProvider>
        <FilterProvider>
          <FilteredBookProvider>
            <div className="app-container">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/edit-book/:id" element={<BookFormPage />} />
                <Route path="/add-book" element={<BookFormPage />} />
              </Routes>
            </div>
          </FilteredBookProvider>
        </FilterProvider>
      </BookProvider>
    </Router>
  );
};

export default App;