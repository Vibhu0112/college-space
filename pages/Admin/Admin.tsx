import React, { useRef, useState } from 'react';
import { signup, useAuth, logout } from '../../firebase';

export default function Admin() {
 
    const [loading, setLoading] = useState(false);
    const currentUser = useAuth();
    const emailRef = useRef();
    const passwordRef = useRef();

    async function handleSignup(){
        setLoading(true);
     try{
        await signup(emailRef.current.value, passwordRef.current.value); 
     } catch{
         alert("Id already in use")
     }
     setLoading(false);
    }

    async function handleLogout() {
      setLoading(true);
      try{
        await logout();
      }catch{
        alert ("error!");
      }
      setLoading(false);
    }

  return (
    <div className=" flex flex-col items-center justify-center min-h-screen py-2 -mt-5 px-14 text-center">
     <div className="mb-32 text-red-700">
      <h1 className=" font-bold italic font-xl mt-2 ">"COLLEGE-SOCIAL-SPACE"</h1>
      <h3 className=" font-semibold">This is a user Sign Up page</h3>
      <h5 className=" font-semibold">Admin is going to use this page to assign user id and password</h5>
     </div>
    <div id="main">
        <div className="mb-3 ml-10 text-blue-900">Currently logged in as : {currentUser?.email}</div>
    <div id="fields" className="flex flex-col">
      <input className="ml-5  border-x-2 rounded-xl" ref={emailRef} type="text" placeholder="Email"/>
      <input className="ml-5 mt-2 border-x-2 rounded-xl" ref={passwordRef} type="password" placeholder="Password"  />
    </div>
    <button className="rounded-full bg-blue-500 text-white mt-2 -mt-5 px-14 justify-between"  disabled={loading || currentUser} onClick={handleSignup}>SignUp</button>
    <button className="rounded-full bg-blue-500 text-white ml-2 mt-4 px-14 justify-between"  disabled={loading || !currentUser} onClick={handleLogout}>LogOut</button>
  </div>
  </div>
  );
}


