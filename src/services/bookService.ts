
import { BASE_URL } from '../config/apiConfig';
import { Book } from '../types';

const API_URL = `${BASE_URL}/books`;

export const getBooks = async (): Promise<Book[]> => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error('Failed to fetch books');
    }
    return response.json();
};

export const getBooksById = async (id: string): Promise<Book> => {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch book with id: ${id}`);
    }
    return response.json();
};

export const createBook = async (book: Book): Promise<Book> => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ...book,
            createdAt: new Date().toISOString(),
            modifiedAt: new Date().toISOString(),
            status: 'active',
        }),
    });
    if (!response.ok) {
        throw new Error('Failed to create book');
    }
    return response.json();
};

export const updateBook = async (bookId: string, book: Partial<Book>): Promise<Book> => {
    const response = await fetch(`${API_URL}/${bookId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ...book,
            modifiedAt: new Date().toISOString()
        }),
    });
    if (!response.ok) {
        throw new Error('Failed to update book');
    }
    return response.json();
};

export const updateBookStatus = async (bookId: string, status: string): Promise<Book> => {
    const response = await fetch(`${API_URL}/${bookId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            status, modifiedAt: new Date().toISOString()
        }),
    });
    if (!response.ok) {
        throw new Error('Failed to update book status');
    }
    return response.json();
};

export const deleteBook = async (bookId: string): Promise<void> => {
    const response = await fetch(`${API_URL}/${bookId}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete book');
    }
};


