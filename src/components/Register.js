import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../routes/Indexr';

const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const [registerSuccess, setRegisterSuccess] = useContext(UserContext);

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('https://authentication-jwt-mern-stack-server.onrender.com/profile', {
            headers: {
                Authorization: token
            }
        })
            .then(res => {
                if (res.data.success) {
                    navigate('/profile');

                }

            })
            .catch(err => {
                navigate('/register');
            })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('https://authentication-jwt-mern-stack-server.onrender.com/register', { name, username, password })
            .then(res => {
                if (res.data.success === true) {
                    setRegisterSuccess(true);
                    navigate('/login');
                }
            })
            .catch(err => {
                // Handle different error structures based on the server response
                if (err.response && err.response.data && err.response.data.error) {
                    // If the error structure contains an "error" field
                    setError(err.response.data.error);
                } else if (err.response.data) {
                    // If there's an error message in the Axios error object
                    setError(err.response.data);
                } else {
                    // If the error structure is unknown, display a generic error message
                    setError('An error occurred while processing your request.');
                }
            });
    }

    return (
        <div className='container d-flex justify-content-center align-items-center vh-100'>
            <div className='row'>
                <div className='col-md-12 p-5 rounded' style={{ boxShadow: '0 4px 8px 0 lightblue', }}>
                    <form action="/register" className=' ' onSubmit={handleSubmit} method='post' style={{ width: '400px' }}>
                        <div class="mb-3">
                            <label for="exampleFormControlInput0" class="form-label">Name</label>
                            <input type="text" name='name' class="form-control" id="exampleFormControlInput0" value={name} placeholder="Your Name" onChange={(e) => setName(e.target.value)} required />
                        </div>
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label">Username</label>
                            <input type="text" name='username' class="form-control" id="exampleFormControlInput1" value={username} placeholder="Username" onChange={(e) => setUsername(e.target.value)} required />
                        </div>
                        <div class="mb-3">
                            <label for="inputPassword5" class="form-label">Password</label>
                            <input type="password" name='password' id="inputPassword5" class="form-control" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <button class="btn btn-primary" type='submit'> Register</button>
                        <div className='text-danger mt-3'>

                            {error && <p>{error}</p>}

                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;