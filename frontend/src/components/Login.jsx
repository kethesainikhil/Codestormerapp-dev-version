import { useSelect } from '@material-tailwind/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../store/auth';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
const Login = () => {
  const [userData, setUserData] = useState({});
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = async (data) => {
    toast.loading('Logging in...')
    setUserData(data);
    handleLoginDispatch(data);
    try{
      const response = await axios.post('http://localhost:3001/login', data);
      if (response.data) {
        localStorage.setItem('token', response.data.token);
        
        console.log(response.data.token)
        setTimeout(() => {
          navigate('/home');
        },[1000])
      }
    }
    catch(error){
      toast.error(error.response.data.message)
    }
  }
  

  const handleLoginDispatch = (userData) => {
    dispatch(login(userData));
  };

  return (
    <>
    <Toaster />
    <form onSubmit={handleSubmit((data) => submitHandler(data))}>
      <section className="h-screen bg-gray-50 dark:bg-gray-900 flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
        <div className=" max-w-sm">
          <h1 className="text-3xl text-center text-white decoration-transparent border-none ">
            login to your account
          </h1>
          <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300"></div>
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
            type="text"
            placeholder="Email Address"
            {...register('email')}
          />
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
            type="password"
            placeholder="Password"
            {...register('password')}
          />
          <div className="mt-4 flex justify-between font-semibold text-sm">
            <Link
              className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4"
              to="#"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="text-center md:text-left">
            <button
              className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
              type="submit"
            >
              Login
            </button>
          </div>
          <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
            Don&apos;t have an account?{' '}
            <Link
              className="text-red-600 hover:underline hover:underline-offset-4"
              to="/signup"
            >
              Register
            </Link>
          </div>
        </div>
      </section>
    </form>
    </>
    
  );
};

export default Login;
