import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from '../page/Login'; // Assuming LoginPage is the correct import
import RegisterPage from '../page/Register';
import NotFound from '../page/NotFound';
import JoinOptions from '../page/JoinOptions';
import ClientProfile from '../page/Client/Profile';

export const PublicRoutes = () => {
    return (
        <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/' element={<JoinOptions />} />
            <Route path='/register/:role' element={<RegisterPage />} />
          
            <Route path='*'  element={<NotFound />} />
            
        </Routes>
    );
};
