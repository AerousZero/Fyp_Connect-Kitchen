import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from '../page/Login'; // Assuming LoginPage is the correct import
import RegisterPage from '../page/Register';
import NotFound from '../page/NotFound';

export const PublicRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='*'  element={<NotFound />} />
            
        </Routes>
    );
};
