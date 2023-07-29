'use client';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function LoginPage() {
  const router=useRouter()
  const [user, setUser] = React.useState({
    email: '',
    password: '',
    
  });
  const onLogin= async () => {
    try {
      const response=await axios.post('/api/users/login',user)
      console.log('login success',response.data)
      toast.success('login success')
      router.push('/profile')
    } catch (error:any) {
      console.log("login failed",error.response.data.error)
      
    }
  };
  return (
    <>
      <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <h1>Login</h1>
      
        <label htmlFor='email'>Email</label>
        <input
          className='p-2 border rounded-lg mb-4 text-black'
          id='email'
          type='text'
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder='email'
          autoComplete='off'
        />{' '}
        <label htmlFor='password'>Password</label>
        <input
          className='p-2 border rounded-lg mb-4 text-black'
          id='password'
          type='password'
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder='password'
        />
        <button onClick={onLogin} className='p-2 border rounded-lg mb-4 '>
          Login
        </button>
        <Link href='/signup'>Signup</Link>
      </div>
    </>
  );
}
