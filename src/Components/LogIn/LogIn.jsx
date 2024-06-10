
import React, {  useContext, useEffect } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';
import Social from '../../Components/Social/Social';
import { authContext } from '../../Provider/Provider';

const Login = () => {
    const navigate=useNavigate()
    const {loginUser,user}=useContext(authContext)
      const { register, handleSubmit, formState: { errors } } = useForm();
      const onSubmit = data => {
        loginUser(data.email, data.password)
        .then((userCredential)=>{
           const user = userCredential.user;
           console.log(user)
           navigate('/')
           toast.success('login success')
        })
        .catch(error=>{console.log(error)
           toast.error(error.message)
       })
     };
    
    
     
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
                <h1 className="text-2xl font-semibold">Login</h1>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="relative">
                    <input {...register("email", {required: true,})} id="email" name="email" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Email address" />
                    <label for="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email Address</label>
                  </div>
                  <div className="relative">
                    <input {...register("password", {required: true,})} id="password" name="password" type="password" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password" />
                    <label for="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
                  </div>
                  <div className="relative">
                    <button className="bg-cyan-500 text-white rounded-md px-2 py-1">Login</button>
                  </div>
                </div>
              </form>
            </div>
         <Social></Social>

            <p className='py-3'>You Have Do Not Account <Link className='text-blue-500' to='/register'>Register</Link></p>
          </div>
        </div>
      </div>
            
        </div>
    );
};

export default Login;