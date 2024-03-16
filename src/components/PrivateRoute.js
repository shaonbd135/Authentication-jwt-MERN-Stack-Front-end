import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProfileContext } from '../routes/Indexr';

const PrivateRoute = ({ children }) => {
    const [user, setUser] = useContext(ProfileContext);


    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('https://authentication-jwt-mern-stack-server.onrender.com/profile', {
            headers: {
                Authorization: token
            }
        })
            .then(res => {
                if (res.data.success) {
                    setUser(res.data.user);

                }
                else {
                    navigate('/login');
                }
            })
            .catch(err => {
                navigate('/login');
            })
    })

    return children

};

export default PrivateRoute;