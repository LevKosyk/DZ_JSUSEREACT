import { Link, useNavigate } from 'react-router-dom';
import { getToken, removeToken } from '../../utils/auth'; 

const Navbar = () => {
    const token = getToken();  
    const navigate = useNavigate();

    const handleLogout = () => {
        removeToken(); 
        navigate("/login");
    };

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
                        {token && (
                            <li className="nav-item">
                                <Link to="/users" className="nav-link active">
                                    <i className="bi bi-box"></i> Users
                                </Link>
                            </li>
                        )}
                        {token && (
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
