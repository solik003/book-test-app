import { useNavigate, useParams, Link } from "react-router-dom";
import {BookForm} from "../../components/BookForm";
import { MODE } from "../../constants/mods";

export const BookFormPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const handleSuccess = () => {
        navigate("/");
    };

    const mode = id ? MODE.EDIT : MODE.CREATE;

    if (id && !mode) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-xl p-6 bg-white rounded-lg shadow-xl">
                <BookForm mode={mode} onSuccess={handleSuccess} />

                <div className="mt-4 text-center">
                    <Link to="/" className="text-blue-500 hover:underline">
                        Back to Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
};