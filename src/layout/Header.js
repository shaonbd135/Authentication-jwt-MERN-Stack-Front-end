import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../routes/Indexr';


const Header = () => {
    const [registerSuccess, setRegisterSuccess] = useContext(UserContext);

    const navigate = useNavigate();
    const handleLogOut = () => {
        localStorage.clear();
        setRegisterSuccess({});
        navigate('/login');
    }

    return (
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <Link class="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" to="/register">Register</Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" to="/login">Login</Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" to="/profile">Profile</Link>
                        </li>
                        {
                            localStorage.getItem('token') ? <li class="nav-item"><button type="button" class="btn btn-danger" onClick={handleLogOut}>Logout</button></li> : ''
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;