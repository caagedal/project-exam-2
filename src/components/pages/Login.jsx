import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import useLogin from '../../js/api/useLogin';
import useAuthStore from '../../js/store/useAuthStore';
import { loginSchema } from '../../js/validate/loginSchema';
import sanitizeMail from '../../js/utils/sanitize';

/**
 * Props for Login component.
 *
 * @typedef {Object} LoginProps
 */

/**
 * Login component renders a sign-in form and handles authentication.
 * Validates form input, sanitizes data, and updates global auth state on success.
 *
 * @component
 * @returns {JSX.Element} The login form.
 */
export default function Login() {
  const navigate = useNavigate();
  const { login: apiLogin, loading } = useLogin();
  const { login: storeLogin } = useAuthStore();
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  /**
   * Handles form submission: sanitizes input, calls API, and updates auth store.
   * @param {{ email: string, password: string }} data - Form values.
   */
  async function onSubmit(data) {
    const email = sanitizeMail(data.email);
    const password = data.password.trim();

    try {
      const response = await apiLogin(email, password);
      const { name, email: userEmail, avatar, banner, token, venueManager } = response;

      storeLogin(name, userEmail, avatar, banner, token, venueManager);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-gray-50 py-12 px-4'>
      <div className='w-full max-w-md space-y-8'>
        <div className='flex flex-col items-center'>
          <img src='/logo-icon.svg' alt='Holidaze logo icon' className='h-12 w-auto' />
          <img src='/logo-text.svg' alt='Holidaze logo' className='mt-4 h-8 w-auto' />
          <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
            Sign in to your account
          </h2>
        </div>

        {error && (
          <div className='mt-4 rounded-md bg-red-50 p-4 border border-red-400'>
            <p className='text-sm text-red-700'>{error}</p>
          </div>
        )}

        <form className='mt-8 space-y-6' onSubmit={handleSubmit(onSubmit)}>
          <div className='space-y-4 rounded-md'>
            <div>
              <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
                Email address
              </label>
              <div className='mt-1'>
                <input
                  id='email'
                  type='email'
                  autoComplete='email'
                  {...register('email')}
                  className={`block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.email ? 'border-warning' : 'border-gray-300'
                  }`}
                />
                {errors.email && (
                  <p className='mt-1 text-sm text-warning'>{errors.email.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
                Password
              </label>
              <div className='mt-1'>
                <input
                  id='password'
                  type='password'
                  autoComplete='current-password'
                  {...register('password')}
                  className={`block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.password ? 'border-warning' : 'border-gray-300'
                  }`}
                />
                {errors.password && (
                  <p className='mt-1 text-sm text-warning'>{errors.password.message}</p>
                )}
              </div>
            </div>
          </div>

          <button
            type='submit'
            disabled={loading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-main ${
              loading
                ? 'bg-blue-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
            }`}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}
