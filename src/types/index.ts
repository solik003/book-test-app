export interface Book {
    id: string;
    title: string;
    author: string;
    category: string;
    isbn: string;
    createdAt: string;
    modifiedAt: string | null;
    status: 'active' | 'deactivated';
}

export interface BookFormProps {
    mode: "create" | "edit";
    onSuccess: () => void;
}

export interface BookContextType {
    books: Book[];
    filteredBooks: Book[];
    filter: string;
    totalBooks: number;
    setFilter: React.Dispatch<React.SetStateAction<string>>;
    handleToggleStatus: (id: string, currentStatus: 'active' | 'deactivated') => void;
    handleDelete: (bookId: string) => Promise<void>;
}

export interface BookProviderProps {
    children: React.ReactNode;
}

export interface BooksProviderProps {
    children: React.ReactNode;
}

export interface FilteredBooksProviderProps {
    children: React.ReactNode;
}

export interface FilteredBooksContextType {
    filteredBooks: Book[];
    filter: string;
    totalFilteredBooks: number;
    setFilter: React.Dispatch<React.SetStateAction<string>>;
    bookId: string | null;
}

export interface FilterContextType {
    bookId: string | null;
    selectBook: (id: string) => void;
    filter: string;
    updateFilter: (newFilter: string) => void;
    setFilter: React.Dispatch<React.SetStateAction<string>>;
}

export interface FilterProviderProps {
    children: React.ReactNode;
}

export interface TableRowProps {
    book: {
        id: string;
        title: string;
        author: string;
        category: string;
        isbn: string;
        createdAt: string;
        modifiedAt: string | null;
        status: 'active' | 'deactivated';
    };
    handleToggleStatus: (id: string, currentStatus: 'active' | 'deactivated') => void;
    handleDelete: (id: string) => void;
}
