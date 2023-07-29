'use client';
import axios from 'axios';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import React from 'react';

export default function ProfilePage() {
  const router = useRouter();
  const [data,setData]=React.useState('nothing')
  const Logout = async () => {
    try {
      await axios.get('/api/users/logout');
      router.push('/login');
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const getUser=async ()=>{
    const res=await axios.get('/api/users/me')
    console.log(res.data)
    setData(res.data.data._id)
  }
  return (
    <>
      <div className='flex flex-col items-center justify-center py-2 min-h-screen'>
        <h1>Profile</h1>
        <p>Profile Page</p>
        <h2>{data==='nothing' ? "nothing":<Link href={`/profile/${data}`}>{data}</Link>}</h2>
        <button onClick={Logout} className='text-white'>
          Logout
        </button>
        <button onClick={getUser} className='text-white'>
          User Profile
        </button>
        
      </div>
    </>
  );
}
