
import { useNavigate } from "react-router-dom";
import BookForm from "../../components/BookForm";


const AddBook = () => {
    const navigate = useNavigate();


    const handleSuccess = () => {
        navigate("/");
    };

    return (
        <div>
            <BookForm mode="add" onSuccess={handleSuccess} />
        </div>
    );
};

export default AddBook;