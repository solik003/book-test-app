
import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { TableHeader } from '../../components/TableHeader';
import { useBooksContext } from '../../context/BookContext';
import { TableRow } from '../../components/TableRow';
import { useFilteredBooksContext } from '../../context/FilteredBooksContext';
import { filterOptions } from '../../config/filterOptions';

const Dashboard: React.FC = () => {

    const { filteredBooks, filter, setFilter, totalFilteredBooks } = useFilteredBooksContext();
    const { handleToggleStatus, handleDelete, totalBooks } = useBooksContext();

    const handleFilterChange = useCallback(
        (e: React.ChangeEvent<HTMLSelectElement>) => {
            setFilter(e.target.value);
        },
        [setFilter]
    );

    return (
        <div className="flex flex-col px-4 sm:px-6 md:px-8 py-6 border-blue-400">
            <div className="flex-1 bg-gradient-to-br from-blue-100 to-gray-200 max-w-full sm:max-w-3xl md:max-w-5xl mx-auto p-6 rounded-xl shadow-xl">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>
                    <div className="mb-4">
                        <select
                            onChange={handleFilterChange}
                            value={filter}
                            className="px-4 py-2 border-2 border-blue-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 w-full sm:w-64"
                        >
                            {filterOptions.map(({ value, label }) => (
                                <option key={value} value={value}>
                                    {label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="text-gray-600 text-sm">
                        Showing {totalFilteredBooks} of {totalBooks}
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

                <div className="bg-white rounded-lg shadow-lg bg-gray-600">
                    <div className="overflow-y-auto max-h-96">
                        <table className="w-full">
                            <TableHeader />
                            <tbody>
                                {filteredBooks.map((book) => (
                                    <TableRow
                                        key={book.id}
                                        book={book}
                                        handleToggleStatus={handleToggleStatus}
                                        handleDelete={handleDelete}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <footer className="bg-gray-800 text-white text-center p-4 mt-4 w-full sm:w-1/2 mx-auto">
                <a
                    href="https://github.com/solik003"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                >
                    Visit My GitHub
                </a>
            </footer>
        </div>
    );
}

export default Dashboard;