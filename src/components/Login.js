import React, { useContext, useEffect, useState } from 'react';
import { ProfileContext, UserContext } from '../routes/Indexr';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();
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
                navigate('/login');
            })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('https://authentication-jwt-mern-stack-server.onrender.com/login', { username, password })
            .then(res => {
                
                if (res.data.success === true) {
                    localStorage.setItem('token', res.data.token);
                    console.log('User Successfully Login');
                    navigate('/profile');
                }
            })
            .catch(err => {
                setError(err.response.data.message);
            });
    }
    return (
        <div className='container d-flex justify-content-center align-items-center vh-100'>

            <div className='row'>
                <div className='col-md-12 p-5 rounded' style={{ boxShadow: '0 4px 8px 0 lightblue', }}>
                    <form action="/login" onSubmit={handleSubmit} className=' ' method='post' style={{ width: '400px' }}>
                        {registerSuccess === true ? <div className='alert alert-success'>Registration Successful, Please Login</div> : null}
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label">Username</label>
                            <input type="text" name='username' class="form-control" id="exampleFormControlInput1" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div class="mb-3">
                            <label for="inputPassword5" class="form-label">Password</label>
                            <input type="password" name='password' id="inputPassword5" class="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button class="btn btn-primary" type='submit'> Login</button>
                        <div className='text-danger mt-3'>

                            {error && <p>{error}</p>}

                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;