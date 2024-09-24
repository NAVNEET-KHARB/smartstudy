import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { login as authLogin } from '../store/authSlice';
import authService from '../appwrite/auth';
import Button from './Button';
import Input from './Input';
import Logo from './Logo';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const login = async (data) => {
    setError('');
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin({ userData }));
        navigate('/');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="flex items-center justify-center w-full h-screen bg-gray-50">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8 border border-gray-200">
        <div className="mb-6 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-3xl font-bold text-gray-800">Sign in to your account</h2>
        <p className="mt-4 text-center text-gray-600">
          Don’t have an account?&nbsp;
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-6 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-6">
            <Input
              label="Email :"
              placeholder="Email Address"
              type="email"
              {...register('email', { required: true })}
            />
            <div className="relative">
              <Input
                label="Password :"
                type={passwordVisible ? 'text' : 'password'}
                placeholder="Password"
                {...register('password', { required: true })}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-3 top-5 flex items-center px-2 text-gray-600 hover:text-blue-500 focus:outline-none"
              >
                {passwordVisible ? 'Hide' : 'Show'}
              </button>
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white transition duration-300">
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
