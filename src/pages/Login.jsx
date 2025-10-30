import React, { useState } from 'react';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmail = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/app/dashboard');
    } catch (err) {
      alert(err.message);
    }
  };

  const handleGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate('/app/dashboard');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleEmail} className="bg-white dark:bg-gray-800 p-6 rounded shadow w-80">
        <h2 className="text-xl font-semibold mb-4">Login</h2>
        <input className="w-full p-2 mb-2 rounded border" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" className="w-full p-2 mb-2 rounded border" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="w-full bg-green-500 text-white p-2 rounded mb-2">Login</button>
        <button type="button" onClick={handleGoogle} className="w-full bg-red-500 text-white p-2 rounded">Login with Google</button>
        <p className="mt-3 text-sm">No account? <Link to="/register" className="text-blue-500">Register</Link></p>
      </form>
    </div>
  );
}
