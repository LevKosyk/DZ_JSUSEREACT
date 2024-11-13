import { Link, useNavigate } from 'react-router-dom';
import { getToken, removeToken } from '../../utils/auth'; 
import axios from 'axios'
import { useEffect, useState } from 'react';

const Navbar =  () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchToken = async () => {
            const token = await getToken();
            setIsAuthenticated(!!token); 
        };

        fetchToken();
    }, []); 

    const handleLogout = () => {
        removeToken(); 
        axios.defaults.headers['Authorization'] = '';
        navigate("/login");
    };

    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
            <div className="container-fluid">
                <Link to="/login" className="navbar-brand">
                    <strong>Login</strong>
                </Link>
                <Link to="/register" className="navbar-brand">
                    <strong>Register</strong>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {isAuthenticated  && (
                            <li className="nav-item">
                                <Link to="/users" className="nav-link active">
                                    <i className="bi bi-box"></i> Users
                                </Link>
                            </li>
                        )}
                        {isAuthenticated  && (
                            <li className="nav-item">
                                <button onClick={handleLogout} className="btn btn-danger">
                                    Logout
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
