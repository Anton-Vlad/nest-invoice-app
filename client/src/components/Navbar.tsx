import { useAppDispatch } from '../app/hooks';
import { logout } from '../auth/authSlice';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    return (
        <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
            <h1 className="text-lg font-bold">Dashboard</h1>
            <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">
                Logout
            </button>
        </div>
    );
}