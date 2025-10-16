import React, {useState} from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { firebaseConfig } from '../utils/firebaseConfig';
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function Booking(){
  const [name,setName]=useState('Demo Client');
  const [email,setEmail]=useState('client@test.com');
  const [desc,setDesc]=useState('Fix a leaky faucet');
  const [date,setDate]=useState('');

  async function submit(){
    if(!name||!email||!desc||!date){ alert('Complete fields'); return }
    try{
      await addDoc(collection(db,'jobs'),{clientName:name,clientEmail:email,description:desc,date,createdAt:serverTimestamp(),status:'open'});
      alert('Job posted — providers will see it after subscribing.');
    }catch(e){ alert(e.message) }
  }

  return (<div className='max-w-md mx-auto'><h2 className='text-xl font-semibold mb-3'>Post a Job</h2><input className='border p-2 w-full mb-2' value={name} onChange={e=>setName(e.target.value)} /><input className='border p-2 w-full mb-2' value={email} onChange={e=>setEmail(e.target.value)} /><textarea className='border p-2 w-full mb-2' value={desc} onChange={e=>setDesc(e.target.value)} /><input type='date' className='border p-2 w-full mb-2' value={date} onChange={e=>setDate(e.target.value)} /><button onClick={submit} className='bg-black text-white px-4 py-2 rounded'>Submit Job</button></div>)
