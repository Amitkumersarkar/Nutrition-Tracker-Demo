import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Layout() {
  const { logout, user, dark, setDark } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className={"bg-white dark:bg-gray-800 shadow p-4 w-64 hidden md:flex flex-col"}>
        <div className="text-2xl font-bold mb-6">NutriTrack</div>
        <nav className="flex-1 space-y-2">
          <Link to="/app/dashboard" className="block p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">Dashboard</Link>
          <Link to="/app/food" className="block p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">Food Library</Link>
          <Link to="/app/logs" className="block p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">Logs</Link>
          <Link to="/app/goals" className="block p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">Goals</Link>
          <Link to="/app/reports" className="block p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">Reports</Link>
          <Link to="/app/profile" className="block p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">Profile</Link>
        </nav>

        <div className="mt-4">
          <button onClick={() => setDark(!dark)} className="w-full mb-2 bg-gray-200 dark:bg-gray-700 p-2 rounded">Toggle Dark</button>
          <button onClick={handleLogout} className="w-full bg-red-500 text-white p-2 rounded">Logout</button>
          <div className="mt-3 text-xs text-gray-500">{user?.email}</div>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="md:hidden flex items-center justify-between p-3 bg-white dark:bg-gray-800 w-full">
        <div className="text-lg font-bold">NutriTrack</div>
        <div className="flex items-center gap-2">
          <button onClick={() => setOpen(true)} className="p-2">☰</button>
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 p-4 bg-gray-100 dark:bg-gray-900">
        <Outlet />
      </main>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 bg-black/30 md:hidden" onClick={() => setOpen(false)}>
          <div className="w-64 bg-white dark:bg-gray-800 h-full p-4" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setOpen(false)} className="mb-4">Close</button>
            <nav className="flex flex-col gap-2">
              <Link to="/app/dashboard" onClick={() => setOpen(false)}>Dashboard</Link>
              <Link to="/app/food" onClick={() => setOpen(false)}>Food</Link>
              <Link to="/app/logs" onClick={() => setOpen(false)}>Logs</Link>
              <Link to="/app/goals" onClick={() => setOpen(false)}>Goals</Link>
              <Link to="/app/reports" onClick={() => setOpen(false)}>Reports</Link>
              <Link to="/app/profile" onClick={() => setOpen(false)}>Profile</Link>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
