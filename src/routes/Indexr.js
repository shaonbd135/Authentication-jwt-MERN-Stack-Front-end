import React, { createContext, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../components/Home';
import Register from '../components/Register';
import Login from '../components/Login';
import Profile from '../components/Profile';
import Error from '../components/Error';
import Header from '../layout/Header';
import PrivateRoute from '../components/PrivateRoute';

export const UserContext = createContext('')
export const ProfileContext = createContext('')

const Indexr = () => {
    const [registerSuccess, setRegisterSuccess] = useState({})
    const [user, setUser] = useState({})
    return (
        <UserContext.Provider value={[registerSuccess, setRegisterSuccess]}>
            <ProfileContext.Provider value={[user, setUser]}>
                <BrowserRouter>
                    <Header></Header>
                    <Routes>
                        <Route path='/' element={<Home></Home>} ></Route>
                        <Route path='/register' element={<Register></Register>} ></Route>
                        <Route path='/login' element={<Login></Login>} ></Route>
                        <Route path='/profile' element={<PrivateRoute><Profile/></PrivateRoute>} ></Route>
                        <Route path='*' element={<Error></Error>} ></Route>
                    </Routes>
                </BrowserRouter>
            </ProfileContext.Provider>
        </UserContext.Provider>
    );
};

export default Indexr;