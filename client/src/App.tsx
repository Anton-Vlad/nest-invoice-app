
import './App.css'

import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import { useAppSelector } from './app/hooks';

function App() {
  const token = useAppSelector((state) => state.auth.token);

  return (
    <Routes>
      <Route path="/" element={!token ? <LoginPage /> : <Navigate to="/dashboard" />} />
      <Route
        path="/dashboard"
        element={token ? <Dashboard /> : <Navigate to="/" />}
      />
    </Routes>
  )
}

export default App
