import React, {useEffect, useState} from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, getDocs } from 'firebase/firestore';
import { firebaseConfig } from '../utils/firebaseConfig';
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function Calendar(){
  const [jobs,setJobs]=useState([]);
  useEffect(()=>{ (async ()=>{ const q = query(collection(db,'jobs')); const snap = await getDocs(q); setJobs(snap.docs.map(d=>({id:d.id, ...d.data()}))); })() },[]);

  return (<div className='max-w-3xl mx-auto'><h2 className='text-xl font-semibold mb-3'>Provider Calendar (demo)</h2><ul>{jobs.map(j=><li key={j.id} className='border p-2 my-2'><strong>{j.clientName}</strong> - {j.description} - {j.date}</li>)}</ul></div>)
