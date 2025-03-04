
import { useNavigate, useParams } from "react-router-dom";
import BookForm from "../../components/BookForm";


const EditBook = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const handleSuccess = () => {
        navigate("/");
    };

    if (!id) {

        return <div>Loading...</div>;
    }

    return (
        <div>
            <BookForm mode="edit" onSuccess={handleSuccess} />
        </div>
    );
};

export default EditBook;
