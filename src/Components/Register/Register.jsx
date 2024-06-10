

import React, { useContext, useEffect } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { authContext } from '../../Provider/Provider';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Social from '../../Components/Social/Social';
import UseAxiosSecure from '../../Hooks/UseAxiosSecure';
const Register = () => {
  const [axiosSecure]=UseAxiosSecure()
    const {createAccount,updateUserProfile,user}=useContext(authContext)
    const navigate=useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
      createAccount(data.email, data.password)
      .then((userCredential)=>{
         const user = userCredential.user;
         console.log(user)
         navigate('/')
         toast.success('register success')
         updateUserProfile(data.name,data.photo)
         .then((userCredential)=>{
             const user = userCredential.user;
             console.log(user)
            
         })
         const userData={
          name:data.name,
          image:data.photo,
          email:data.email,
          role:'user',
         }
         axiosSecure.post('/user',userData)
         .then((data)=>{
            console.log(data)
         })
      })
      .catch(error=>{console.log(error)
         toast.error(error.message)
     })
   };
   console.log(errors);
  
   
    return (
        <div>

            
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
<div className="relative py-3 sm:max-w-xl sm:mx-auto">
<div
  className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
</div>
<div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">

  <div className="max-w-md mx-auto">
    <div>
      <h1 className="text-2xl font-semibold">Register</h1>
    </div>
    <form onSubmit={handleSubmit(onSubmit)} className="divide-y divide-gray-200">
      <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
        <div className="relative">
          <input  {...register("name", {required: true,})} id="name" name="name" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Name" />
          <label for="name" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Name</label>
        </div>
        <div className="relative">
          <input {...register("photo", {required: true,})} id="photo" name="photo" type="url" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Email address" />
          <label for="photo" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Photo Url</label>
        </div>
        <div className="relative">
          <input {...register("email", {required: true,})} id="email" name="email" type="email" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Email address" />
          <label for="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email Address</label>
        </div>
        <div className="relative">
          <input {...register("password", {
      required: "Password is required",
      minLength: {value: 6,message: "Password must be at least 6 characters long" },
      pattern: {
        value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\W).+$/,
        message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
      }
    })}
    
     id="password" name="password" type="password" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password" />
          <label for="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
            {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
        </div>
        <div className="relative">
          <button className="bg-cyan-500 text-white rounded-md px-2 py-1">Register</button>
        </div>
      </div>
    </form>
  </div>

<Social></Social>
<p className='py-3'>You Have Do Not Account <Link className='text-blue-500' to='/login'>Login</Link></p>
</div>
</div>
</div>
    </div>
    );
};

export default Register;