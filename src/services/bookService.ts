import { Book } from '../types';

const API_URL = 'http://localhost:5000/books';

export const getBooks = async (): Promise<Book[]> => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error('Failed to fetch books');
    }
    return response.json();
};

export const createBook = async (book: Book): Promise<Book> => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(book),
    });
    if (!response.ok) {
        throw new Error('Failed to create book');
    }
    return response.json();
};

export const updateBookStatus = async (bookId: number, status: string): Promise<Book> => {
    const response = await fetch(`${API_URL}/${bookId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
    });
    if (!response.ok) {
        throw new Error('Failed to update book status');
    }
    return response.json();
};

export const deleteBook = async (bookId: number): Promise<void> => {
    const response = await fetch(`${API_URL}/${bookId}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete book');
    }
};
