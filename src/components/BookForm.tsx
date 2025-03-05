import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BookFormProps } from "../types";
import { BASE_URL } from "../config";

const API_URL = `${BASE_URL}/books`;

const BookForm: React.FC<BookFormProps> = ({ mode, onSuccess }) => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [book, setBook] = useState({
        title: "",
        author: "",
        category: "",
        isbn: "",
    });

    useEffect(() => {
        if (mode === "edit" && id) {
            const fetchBook = async () => {
                try {
                    const response = await fetch(`${API_URL}/${id}`);
                    if (!response.ok) throw new Error("Failed to fetch book");
                    const data = await response.json();
                    setBook(data);
                } catch (error) {
                    console.error("Error fetching book:", error);
                }
            };
            fetchBook();
        }
    }, [mode, id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setBook({ ...book, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const method = mode === "edit" ? "PUT" : "POST";
            const endpoint = mode === "edit" ? `${API_URL}/${id}` : API_URL;

            const response = await fetch(endpoint, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(book),
            });

            if (!response.ok) throw new Error("Failed to submit book");

            alert(`${mode === "edit" ? "Updated" : "Added"} book successfully!`);
            onSuccess();
            navigate("/");
        } catch (error) {
            console.error("Error submitting book:", error);
            alert(`Failed to ${mode === "edit" ? "update" : "add"} book.`);
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-xl m-2 sm:m-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">{mode === "edit" ? "Edit Book" : "Add a Book"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
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

export default BookForm;
