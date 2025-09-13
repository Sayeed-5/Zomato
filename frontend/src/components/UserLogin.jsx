import React from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const FormInput = ({ id, type, placeholder, label }) => (
    <div>
      <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-white transition-colors"
        placeholder={placeholder}
      />
    </div>
);
  
  // A reusable button component
const FormButton = ({ children }) => (
    <button
      type="submit"
      className="w-full py-3 px-4 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800 transition-colors"
    >
      {children}
    </button>
);
  
  
const UserLogin = ({ setView }) => {
  const navigate = useNavigate();
    const handleSubmit = async (e) => {
      e.preventDefault();

      const email = e.target.email.value
      const password = e.target.password.value

      const response = await axios.post("http://localhost:3000/api/auth/user/login", {
            email,
            password
      },{ withCredentials: true})

      console.log(response.data)

      navigate('/');
    }
    return (
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg transition-colors">
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white">User Login</h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <FormInput id="email" type="email" label="Your Email" placeholder="name@company.com" />
          <FormInput id="password" type="password" label="Password" placeholder="••••••••" />
          <FormButton>Sign in</FormButton>
          <p className="text-sm text-center font-light text-gray-500 dark:text-gray-400">
            Don’t have an account yet?{' '}
            <a href="#" onClick={() => setView('userRegister')} className="font-medium text-blue-600 hover:underline dark:text-blue-500">
              Sign up
            </a>
          </p>
        </form>
      </div>
    );
};

export default UserLogin