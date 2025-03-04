
import { Book } from '../types';

export const applyFilter = (books: Book[], filter: string): Book[] => {
    switch (filter) {
        case 'Show Active':
            return books.filter((book) => book.status === 'active');
        case 'Show Deactivated':
            return books.filter((book) => book.status === 'deactivated');
        case 'Show All':
        default:
            return books;
    }
};