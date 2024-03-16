import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProfileContext} from '../routes/Indexr';

const Profile = () => {
    const [user, setUser] = useContext(ProfileContext);
    // const navigate = useNavigate();
    // useEffect(() => {
    //     const token = localStorage.getItem('token');
    //     axios.get('http://localhost:5000/profile', {
    //         headers: {
    //             Authorization: token
    //         }
    //     })
    //         .then(res => {
    //             if (res.data.success) {
    //                 setUser(res.data.user)
    //             }

    //         })
    //         .catch(err => {
    //             navigate('/login');
    //         })
    // })
    return (
        <div className='text-center'>
            <h1>This is Profile Page</h1>
            <h3>{user.name}</h3>
            <h3>{user.username}</h3>
        </div>
    );
};

export default Profile;