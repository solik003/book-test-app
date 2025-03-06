
import React, { createContext, useContext, useEffect } from 'react';
import { BookContextType, BookProviderProps } from '../types';
import { useBookActions } from '../hooks/useBookActions';

const BookContext = createContext<BookContextType | undefined>(undefined);

export const BookProvider: React.FC<BookProviderProps> = ({ children }) => {

    const {
        books, 
        fetchBooks, 
        handleToggleStatus, 
        handleDelete
    } = useBookActions();

    useEffect(() => {
        fetchBooks();
    }, []);

    return (
        <BookContext.Provider
            value={{
                books,
                totalBooks: books.length,
                handleToggleStatus,
                handleDelete
            }}
        >
            {children}
        </BookContext.Provider>
    );
};

export const useBooksContext = (): BookContextType => {
    const context = useContext(BookContext);
    if (!context) {
        throw new Error('useBooks must be used within a BookProvider');
    }
    return context;
};
