import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebaseConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export default function Goals(){
  const { user } = useAuth();
  const [cal, setCal] = useState(2000);

  useEffect(()=>{
    async function load(){
      if(!user) return;
      const d = await getDoc(doc(db, 'profiles', user.uid));
      if(d.exists()) setCal(d.data().goalCal || 2000);
    }
    load();
  },[user]);

  const save = async ()=>{
    if(!user) return;
    await setDoc(doc(db,'profiles',user.uid), { goalCal: Number(cal) }, { merge: true });
    alert('Saved');
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Daily Goals</h1>
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <label className="block text-sm">Daily calorie target</label>
        <input type="number" value={cal} onChange={(e)=>setCal(e.target.value)} className="mt-2 p-2 border rounded w-40" />
        <div className="mt-3">
          <button onClick={save} className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
        </div>
      </div>
    </div>
  );
}
