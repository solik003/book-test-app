
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useBooksContext } from './BookContext';
import { useFilterContext } from './FilterContext';
import { Book, FilteredBooksContextType, FilteredBooksProviderProps } from '../types';
import { applyFilter } from '../utils/filterBooks';

const FilteredBookContext = createContext<FilteredBooksContextType | undefined>(undefined);

export const FilteredBookProvider: React.FC<FilteredBooksProviderProps> = ({ children }) => {
    const { books } = useBooksContext();
    const { filter, setFilter } = useFilterContext();
    const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);

    useEffect(() => {
        const filtered = applyFilter(books, filter);
        setFilteredBooks(filtered);
    }, [filter, books]);

    const totalFilteredBooks = filteredBooks.length;

    return (
        <FilteredBookContext.Provider value={{ filteredBooks, filter, setFilter, totalFilteredBooks }}>
            {children}
        </FilteredBookContext.Provider>
    );
};

export const useFilteredBooksContext = (): FilteredBooksContextType => {
    const context = useContext(FilteredBookContext);
    if (!context) {
        throw new Error('useFilteredBooks must be used within a FilteredBookProvider');
    }
    return context;
};
