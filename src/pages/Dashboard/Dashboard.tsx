
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBooks, updateBookStatus, deleteBook } from '../../services/bookService';
import { Book } from '../../types';
import { formatDate } from '../../utils/formatDate';
import { applyFilter } from '../../utils/filterBooks';


const Dashboard: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
    const [filter, setFilter] = useState<string>('Show Active');

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const fetchedBooks = await getBooks();
                setBooks(fetchedBooks);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };
        fetchBooks();
    }, []);

    useEffect(() => {
        const filtered = applyFilter(books, filter);
        setFilteredBooks(filtered);
    }, [filter, books]);

    const handleDeactivate = async (bookId: number) => {
        try {
            const updatedBook = await updateBookStatus(bookId, 'deactivated');
            setBooks(books.map((book) => (book.id === bookId ? updatedBook : book)));
        } catch (error) {
            console.error('Error updating book status:', error);
        }
    };

    const handleReactivate = async (bookId: number) => {
        try {
            const updatedBook = await updateBookStatus(bookId, 'active');
            setBooks(books.map((book) => (book.id === bookId ? updatedBook : book)));
        } catch (error) {
            console.error('Error updating book status:', error);
        }
    };

    const handleDelete = async (bookId: number) => {
        try {
            await deleteBook(bookId);
            setBooks(books.filter((book) => book.id !== bookId));
            alert('Delete that book?');
        } catch (error) {
            console.error('Error deleting book:', error);
            alert('Failed to delete book!');
        }
    };


    const totalNumberOfRecords = books.length;
    const numberOfRecords = filteredBooks.length;

    
    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-1 bg-gradient-to-br from-blue-100 to-gray-200 max-w-screen-xl mx-auto p-6 rounded-xl shadow-xl">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>
                    <div className="mb-4">
                        <select
                            onChange={(e) => setFilter(e.target.value)}
                            value={filter}
                            className="px-4 py-2 border-2 border-blue-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                        >
                            <option value="Show All">Show All</option>
                            <option value="Show Active">Show Active</option>
                            <option value="Show Deactivated">Show Deactivated</option>
                        </select>
                    </div>
                    <div className="text-gray-600 text-sm">
                        Showing {numberOfRecords} of {totalNumberOfRecords}
                    </div>
                    <div className="mb-8">
                        <Link
                            to="/add-book"
                            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 shadow-md inline-block"
                        >
                            Add a Book
                        </Link>
                    </div>
                </div>

                <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
                    <table className="min-w-full table-auto">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-left text-gray-700">Book Title</th>
                                <th className="px-6 py-4 text-left text-gray-700">Author Name</th>
                                <th className="px-6 py-4 text-left text-gray-700">Category</th>
                                <th className="px-6 py-4 text-left text-gray-700">ISBN</th>
                                <th className="px-6 py-4 text-left text-gray-700">Created At</th>
                                <th className="px-6 py-4 text-left text-gray-700">Modified At</th>
                                <th className="px-6 py-4 text-left text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredBooks.map((book) => (
                                <tr
                                    key={book.id}
                                    className={book.status === 'deactivated' ? 'bg-gray-200' : 'hover:bg-gray-50'}
                                >
                                    <td className="px-6 py-4 text-gray-800">{book.title}</td>
                                    <td className="px-6 py-4 text-gray-600">{book.author}</td>
                                    <td className="px-6 py-4 text-gray-600">{book.category}</td>
                                    <td className="px-6 py-4 text-gray-600">{book.isbn}</td>
                                    <td className="px-6 py-4 text-gray-600">{formatDate(book.createdAt)}</td>
                                    <td className="px-6 py-4 text-gray-600">
                                        {book.modifiedAt ? formatDate(book.modifiedAt) : '--'}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2">
                                            <Link
                                                to={`/edit-book/${book.id}`}
                                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                                            >
                                                Edit
                                            </Link>

                                            {book.status === 'active' ? (
                                                <button
                                                    onClick={() => handleDeactivate(book.id)}
                                                    className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition duration-300"
                                                >
                                                    Deactivate
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => handleReactivate(book.id)}
                                                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
                                                >
                                                    Reactivate
                                                </button>
                                            )}
                                            {book.status === 'deactivated' && (
                                                <button
                                                    onClick={() => handleDelete(book.id)}
                                                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
                                                >
                                                    Delete
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <footer className="bg-gray-800 text-white text-center p-4 mt-4 w-1/2 mx-auto">
                <a
                    href="https://github.com/yourgithubusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                >
                    Visit My GitHub
                </a>
            </footer>
        </div>
    );
};

export default Dashboard;
