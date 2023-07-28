'use client';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Axios } from 'axios';


export default function SignupPage() {
  const [user, setUser] = React.useState({
    email: '',
    password: '',
    username: '',
  });
  const onSignup = async () => {
    console.log(user);
  };
  return (
    <>
      <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <h1>Signup</h1>
        <label htmlFor='username'>Username</label>
        <input
          className='p-2 border rounded-lg mb-4 text-black'
          id='username'
          type='text'
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder='username'
        />
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
        <button onClick={onSignup} className='p-2 border rounded-lg mb-4 '>
          Signup
        </button>
        <Link href='/login'>Login</Link>
      </div>
    </>
  );
}
