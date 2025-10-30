import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, addDoc, query, where, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

export default function Logs() {
  const { user } = useAuth();
  const [logs, setLogs] = useState([]);
  const [name, setName] = useState('');
  const [cal, setCal] = useState('');

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, 'logs'), where('uid', '==', user.uid));
    const unsub = onSnapshot(q, snap => {
      const arr = [];
      snap.forEach(d => arr.push({ id: d.id, ...d.data() }));
      setLogs(arr.sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds));
    });
    return unsub;
  }, [user]);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!user) return alert('login');
    await addDoc(collection(db, 'logs'), { uid: user.uid, name, calories: Number(cal) || 0, createdAt: serverTimestamp() });
    setName(''); setCal('');
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Logs</h1>
      <form onSubmit={handleAdd} className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <div className="flex gap-2">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Food name" className="flex-1 p-2 border rounded" />
          <input value={cal} onChange={(e) => setCal(e.target.value)} placeholder="Calories" className="w-28 p-2 border rounded" />
          <button className="bg-green-500 text-white px-4 rounded">Add</button>
        </div>
      </form>

      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <ul className="divide-y">
          {logs.map(l => (
            <li key={l.id} className="py-2 flex justify-between">
              <div>
                <div className="font-medium">{l.name}</div>
                <div className="text-xs text-gray-500">{new Date((l.createdAt?.seconds || Date.now() / 1000) * 1000).toLocaleString()}</div>
              </div>
              <div>{l.calories} kcal</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
