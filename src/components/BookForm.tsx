import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BookFormProps } from "../types";
import { useBookApi } from "../hooks/useBookApi";


export const BookForm: React.FC<BookFormProps> = ({ mode }) => {
    const {id} = useParams();

    const { book, handleChange, createEditBook } = useBookApi(mode, id);
    const navigate = useNavigate();

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        createEditBook();
        navigate("/");
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-xl m-2 sm:m-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">{mode === "edit" ? "Edit Book" : "Add a Book"}</h2>
            <form onSubmit={onSubmit} className="space-y-4 sm:space-y-6">
                <label className="block text-sm font-semibold text-gray-700">Book Title:</label>
                <input
                    type="text"
                    name="title"
                    value={book.title}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 sm:p-3 border border-gray-400 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                />

                <label className="block text-sm font-semibold text-gray-700">Author Name:</label>
                <input
                    type="text"
                    name="author"
                    value={book.author}
                    onChange={handleChange}
                    required
                    className="mt-2 p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500"
                />

                <label className="block text-sm font-semibold text-gray-700">Category:</label>
                <select
                    name="category"
                    value={book.category}
                    onChange={handleChange}
                    required
                    className="mt-2 p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Select a category</option>
                    <option value="Fiction">Fiction</option>
                    <option value="Non-fiction">Non-fiction</option>
                    <option value="Sci-Fi">Sci-Fi</option>
                </select>

                <label className="block text-sm font-medium text-gray-700">ISBN:</label>
                <input
                    type="text"
                    name="isbn"
                    value={book.isbn}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 sm:p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500"
                />

                <button type="submit" className="w-full py-2 sm:py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300">{mode === "edit" ? "Update Book" : "Add a Book"}</button>
            </form>
        </div>
    );
};
