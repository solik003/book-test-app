
import { BOOK_FILTERS } from '../constants/filterConstants';
import { Book } from '../types';

export const applyFilter = (books: Book[], filter: string): Book[] => {
    switch (filter) {
        case BOOK_FILTERS.ACTIVE:
            return books.filter((book) => book.status === 'active');
        case BOOK_FILTERS.DEACTIVATED:
            return books.filter((book) => book.status === 'deactivated');
        case BOOK_FILTERS.ALL:
        default:
            return books;
    }
};