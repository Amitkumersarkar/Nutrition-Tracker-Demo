import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useAuth } from '../context/AuthContext';
import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip } from 'recharts';

export default function Dashboard() {
  const { user } = useAuth();
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, 'logs'), where('uid', '==', user.uid));
    const unsub = onSnapshot(q, (snap) => {
      const arr = [];
      snap.forEach(doc => arr.push({ id: doc.id, ...doc.data() }));
      setLogs(arr.sort((a,b)=>b.createdAt?.seconds - a.createdAt?.seconds));
    });
    return unsub;
  }, [user]);

  // dummy aggregated values for UI
  const calories = logs.reduce((s,l)=>s+(l.calories||0),0) || 1650;
  const target = 2000;

  // dummy weekly data
  const weekly = [
    { day: 'Mon', cal: 1800 },
    { day: 'Tue', cal: 1700 },
    { day: 'Wed', cal: 2000 },
    { day: 'Thu', cal: 1600 },
    { day: 'Fri', cal: 1900 },
    { day: 'Sat', cal: 1500 },
    { day: 'Sun', cal: 1650 },
  ];

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Today's Summary</h1>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow">
          <h3 className="text-sm">Calories</h3>
          <div className="mt-2 flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">{calories} kcal</div>
              <div className="text-sm text-gray-500">of {target} kcal</div>
            </div>
            <div className="w-24 h-24 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-700">
              <div className="text-sm">{Math.round((calories/target)*100)}%</div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow">
          <h3 className="text-sm">Macros</h3>
          <div className="mt-2 text-sm">
            <div>Protein: 80g</div>
            <div>Carbs: 200g</div>
            <div>Fat: 45g</div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow">
          <h3 className="text-sm">Water</h3>
          <div className="mt-2 text-2xl font-bold">1.8 L</div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow">
        <h3 className="font-medium mb-2">Weekly Trend</h3>
        <div style={{ width: '100%', height: 200 }}>
          <ResponsiveContainer>
            <AreaChart data={weekly}>
              <XAxis dataKey="day" />
              <Tooltip />
              <Area dataKey="cal" strokeWidth={2} fillOpacity={0.2} dataKey2="cal" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow">
        <h3 className="font-medium mb-2">Recent Logs</h3>
        <ul className="divide-y">
          {logs.slice(0,6).map(l=> (
            <li key={l.id} className="py-2 flex justify-between">
              <div>
                <div className="font-medium">{l.name || 'Food'}</div>
                <div className="text-sm text-gray-500">{new Date((l.createdAt?.seconds||Date.now()/1000)*1000).toLocaleString()}</div>
              </div>
              <div className="text-sm">{l.calories || 0} kcal</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
