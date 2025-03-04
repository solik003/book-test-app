export interface Book {
    id: number;
    title: string;
    author: string;
    category: string;
    isbn: string;
    createdAt: string;
    modifiedAt: string | null;
    status: 'active' | 'deactivated';
}

export interface BookFormProps {
    mode: "add" | "edit";
    onSuccess: () => void;
}