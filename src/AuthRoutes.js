// AuthRoutes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import NotFoundPage from './NotFoundPage';

function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AuthRoutes;
