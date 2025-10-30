import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import FoodLibrary from './pages/FoodLibrary';
import Logs from './pages/Logs';
import Goals from './pages/Goals';
import Profile from './pages/Profile';
import Reports from './pages/Reports';
import { useAuth } from './context/AuthContext';

function Private({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="p-8">Loading...</div>;
  return user ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/app" element={<Private><Layout /></Private>}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="food" element={<FoodLibrary />} />
        <Route path="logs" element={<Logs />} />
        <Route path="goals" element={<Goals />} />
        <Route path="reports" element={<Reports />} />
        <Route path="profile" element={<Profile />} />
        <Route index element={<Navigate to="dashboard" />} />
      </Route>
      <Route path="/" element={<Navigate to="/app/dashboard" />} />
    </Routes>
  );
}
