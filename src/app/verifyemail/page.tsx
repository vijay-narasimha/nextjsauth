'use client';
import axios from 'axios';
import Link from 'next/link';

import React, { useState, useEffect } from 'react';

export default function verifyEmailPage() {
  const [token, setToken] = useState('');
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const verifyEmail = async () => {
    try {
      await axios.post('/api/users/verifyemail', { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };
  useEffect(() => {
    const urlToken = window.location.search.split('=')[1];
    console.log(urlToken);
    setToken(urlToken||'');
  }, []);
  useEffect(() => {
    if (token.length > 0) {
      verifyEmail();
    }
  }, [token]);
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1 className='text-4xl'>verify Email</h1>
      <h2 className='p-2'>{token ? `${token}` : 'no token'}</h2>
      {verified && (
        <p>
          Email Verified <Link href='/login'>Login</Link>
        </p>
      )}
      {error && <p className='bg-red-500'>Error</p>}
    </div>
  );
}
