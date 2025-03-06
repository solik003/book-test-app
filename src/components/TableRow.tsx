import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../../src/utils/formatDate';
import { TableRowProps } from '../types';

export const TableRow: React.FC<TableRowProps> = ({ book, handleToggleStatus, handleDelete }) => {
    const bookData = [
        book.title,
        book.author,
        book.category,
        book.isbn,
        formatDate(book.createdAt),
        book.modifiedAt ? formatDate(book.modifiedAt) : '--',
    ];

    return (
        <tr className={book.status === 'deactivated' ? 'bg-gray-200' : 'hover:bg-gray-50'}>
            {bookData.map((value, index) => (
                <td key={index} className="px-6 py-4 text-gray-600 text-xs sm:text-sm md:text-base">
                    {value}
                </td>
            ))}
            <td className="px-6 py-4">
                <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                    <Link
                        to={`/edit-book/${book.id}`}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                    >
                        Edit
                    </Link>

                    <button
                        onClick={() => handleToggleStatus(book.id, book.status)}
                        className={`px-4 py-2 ${book.status === 'active' ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600'} text-white rounded-md transition duration-300`}
                    >
                        {book.status === 'active' ? 'Deactivate' : 'Reactivate'}
                    </button>
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
    );
};
