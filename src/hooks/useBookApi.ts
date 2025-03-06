import { useState, useEffect } from "react";

import { SUCCESS_MESSAGES, ERROR_MESSAGES } from "../constants/messages";
import { Book } from "../types";
import { MODE } from "../constants/mods";
import { createBook, getBooksById, updateBook } from "../services/bookService";

export const useBookApi = (mode: typeof MODE.CREATE | typeof MODE.EDIT, id: string) => {
    const [book, setBook] = useState<Book>({
        id: "",
        title: "",
        author: "",
        category: "",
        isbn: "",
        createdAt: "",
        modifiedAt: null,
        status: "active",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    useEffect(() => {
        if (mode === MODE.EDIT && id) {
            const fetchBook = async () => {
                setLoading(true);
                try {
                    // const response = await fetch(`${API_URL}/${id}`);
                    // if (!response.ok) throw new Error("Failed to fetch book");
                    // const data = await response.json();
                    const data = await getBooksById(id);
                    console.log(data);
                    setBook(data);
                } catch (error) {
                    setError("Error fetching book");
                    console.error("Error fetching book:", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchBook();
        }
    }, [mode, id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setBook({ ...book, [e.target.name]: e.target.value });
    };

    const createEditBook = async (): Promise<string | null> => {
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            if (mode === MODE.CREATE) {
                const createdBook = await createBook(book);
                setBook(createdBook);
                return SUCCESS_MESSAGES.CREATE;
            } else {
                const updatedBook = await updateBook(id, book);
                setBook(updatedBook);
                return SUCCESS_MESSAGES.EDIT;
            }
        } catch (error) {
            setError(mode === MODE.EDIT ? ERROR_MESSAGES.EDIT : ERROR_MESSAGES.CREATE);
            console.error("Error submitting book:", error);
        } finally {
            setLoading(false);
        }
        return null;
    };

    return {
        book,
        loading,
        error,
        success,
        handleChange,
        createEditBook,
    };
};
