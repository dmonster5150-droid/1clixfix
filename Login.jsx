import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { firebaseConfig } from '../utils/firebaseConfig';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function Login(){
  const [email,setEmail]=useState('demo@1clikfix.com');
  const [password,setPassword]=useState('Test1234!');
  const [msg,setMsg]=useState('');

  async function signup(){
    try{
      const userCred = await createUserWithEmailAndPassword(auth,email,password);
      await sendEmailVerification(userCred.user);
      setMsg('Verification email sent — check your inbox.');
    }catch(e){ setMsg(e.message) }
  }

  async function login(){
    try{
      await signInWithEmailAndPassword(auth,email,password);
      setMsg('Logged in — if unverified you will be prompted to verify.');
    }catch(e){ setMsg(e.message) }
  }

  return (<div className='max-w-md mx-auto'>
    <h2 className='text-xl font-semibold mb-3'>Login / Sign up</h2>
    <input className='border p-2 w-full mb-2' value={email} onChange={e=>setEmail(e.target.value)} />
    <input type='password' className='border p-2 w-full mb-2' value={password} onChange={e=>setPassword(e.target.value)} />
    <div className='flex gap-2'><button onClick={login} className='bg-blue-600 text-white px-4 py-2 rounded'>Login</button><button onClick={signup} className='bg-green-600 text-white px-4 py-2 rounded'>Sign up</button></div>
    <p className='mt-3 text-sm text-gray-700'>{msg}</p>
  </div>)
}
