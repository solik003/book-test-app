import { useState } from 'react';
import { getBooks, updateBookStatus, deleteBook } from '../services/bookService';
import { Book } from '../types';
import { BOOK_FILTERS } from '../constants/filterConstants';

export const useBookActions = () => {
    const [books, setBooks] = useState<Book[]>([]);

    const fetchBooks = async () => {
        try {
            const fetchedBooks = await getBooks();
            setBooks(fetchedBooks);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    const handleToggleStatus = async (bookId: string, currentStatus: string) => {
        const newStatus = currentStatus === BOOK_FILTERS.ACTIVE ? BOOK_FILTERS.DEACTIVATED : BOOK_FILTERS.ACTIVE;
    
        try {
            const updatedBook = await updateBookStatus(bookId, newStatus);
            setBooks((prevBooks) =>
                prevBooks.map((book) => (book.id === bookId ? updatedBook : book))
            );
        } catch (error) {
            console.error(`Error updating book status to ${newStatus}:`, error);
        }
    };
    

    const handleDelete = async (bookId: string) => {
        try {
            await deleteBook(bookId);
            setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
            alert('Delete that book?');
        } catch (error) {
            console.error('Error deleting book:', error);
            alert('Failed to delete book!');
        }
    };

    return {
        books,
        fetchBooks,
        handleToggleStatus,
        handleDelete,
    };
};
