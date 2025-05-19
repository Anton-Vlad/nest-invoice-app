import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { loginUser } from '../app/slices/auth/authSlice';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const authStatus = useAppSelector((state) => state.auth.status);
    const authError = useAppSelector((state) => state.auth.error);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await dispatch(loginUser({ email, password }));
        if (loginUser.fulfilled.match(result)) {
            navigate('/dashboard');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div>
                <h1 className="text-4xl text-center mb-4 font-bold">Invoice App</h1>

                {authError ? (<p className="p-3 border border-red-500 text-red-500 rounded bg-red-200 mb-4">
                    {authError}
                </p>) : ""}

                <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-80">
                    <h2 className="text-xl mb-4 text-center">Login</h2>
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-2 mb-3 border rounded border-gray-200"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-2 mb-3 border rounded border-gray-200"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        type="submit"
                        disabled={authStatus === 'loading'}
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                    >
                        {authStatus === 'loading' ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
}