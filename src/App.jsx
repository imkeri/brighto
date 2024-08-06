import React from 'react';
import { AuthProvider } from './context/AuthContext';
import AdminLayout from "@layout/admin";
import AuthLayout from "@layout/auth";
import NotFound from "@views/error/Index"
import { Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import "./i18n/i18n";

function App() {

  return (
    <AuthProvider>
      <ToastContainer/>
      <Routes>
        <Route path="auth/*" element={<AuthLayout />} />
        <Route path="admin/*" element={<AdminLayout />} />
        <Route path="/" element={<Navigate to="/admin" replace />} />
        <Route path='/*' element={<NotFound/>}/>
      </Routes>
    </AuthProvider>
  );
}

export default App;
