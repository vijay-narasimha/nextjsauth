'use client';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';


export default function SignupPage() {
  const router=useRouter()
  const [user, setUser] = React.useState({
    email: '',
    password: '',
    username: '',
  });
  const [buttonDisabled,setButtonDisabled]=React.useState(false)
  
  const onSignup = async () => {
    try {
      const response=await axios.post('/api/users/signup',user)
      console.log('signup success',response)
      router.push('/login')
    } catch (error:any) {
      console.log("signup failed",error.response.data.error)
    }
  };

React.useEffect(()=>{
  if(user.email.length>0 && user.username.length>0 && user.password.length>0){
    setButtonDisabled(false)
  }else{
    setButtonDisabled(true)
  }
},[user])

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
          {buttonDisabled ? 'NoSignup' :'Signup'}
        </button>
        <Link href='/login'>Login</Link>
      </div>
    </>
  );
}
