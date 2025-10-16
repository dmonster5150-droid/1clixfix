import React, {useState} from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { firebaseConfig } from '../utils/firebaseConfig';
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function Subscribe(){
  const [name,setName]=useState('Demo Provider');
  const [email,setEmail]=useState('provider@test.com');

  async function start(){
    if(!name||!email){ alert('Enter name & email'); return }
    try{
      const ref = await addDoc(collection(db,'providers'),{name,email,subscribed:false,createdAt:serverTimestamp()});
      const res = await fetch('/.netlify/functions/createPaymentLink',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({providerId: ref.id,type:'subscription'})});
      const j = await res.json();
      if(j.url) window.location.href = j.url;
      else alert('Payment link error')
    }catch(e){ alert(e.message) }
  }

  return (<div className='max-w-md mx-auto'><h2 className='text-xl font-semibold mb-3'>Provider Subscribe</h2><input className='border p-2 w-full mb-2' value={name} onChange={e=>setName(e.target.value)} /><input className='border p-2 w-full mb-2' value={email} onChange={e=>setEmail(e.target.value)} /><button onClick={start} className='bg-orange-500 text-white px-4 py-2 rounded'>Subscribe $20.99</button></div>)
