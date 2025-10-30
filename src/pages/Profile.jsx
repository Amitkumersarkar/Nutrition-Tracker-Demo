import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function Profile(){
  const { user } = useAuth();
  const [profile, setProfile] = useState({ name:'', height:'', weight:'' });

  useEffect(()=>{
    async function load(){
      if(!user) return;
      const d = await getDoc(doc(db,'profiles',user.uid));
      if(d.exists()) setProfile(d.data());
    }
    load();
  },[user]);

  const save = async ()=>{
    if(!user) return;
    await setDoc(doc(db,'profiles',user.uid), profile, { merge: true });
    alert('Saved');
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Profile</h1>
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <label className="block text-sm">Name</label>
        <input className="w-full p-2 border rounded mb-2" value={profile.name} onChange={e=>setProfile({...profile, name:e.target.value})} />
        <label className="block text-sm">Height (cm)</label>
        <input className="w-full p-2 border rounded mb-2" value={profile.height} onChange={e=>setProfile({...profile, height:e.target.value})} />
        <label className="block text-sm">Weight (kg)</label>
        <input className="w-full p-2 border rounded mb-2" value={profile.weight} onChange={e=>setProfile({...profile, weight:e.target.value})} />
        <button onClick={save} className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
      </div>
    </div>
  );
}
