import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import useAuthStore from '../../js/store/useAuthStore';
import useRegister from '../../js/api/useRegister';
import { registerSchema } from '../../js/validate/registerSchema';

/**
 * Props for Register component.
 *
 * @typedef {Object} RegisterProps
 */

/**
 * Registration form component. Validates input, registers new user, and updates auth store.
 *
 * @component
 * @returns {JSX.Element} The registration form.
 */
export default function Register() {
  const navigate = useNavigate();
  const { register: registerUser, loading, error: apiError } = useRegister();
  const { login: storeLogin } = useAuthStore();
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      avatar: '',
      venueManager: false,
    },
  });

  /**
   * Handles form submission: registers user and logs in.
   * @param {{ name: string, email: string, password: string, avatar: string, venueManager: boolean }} data - Form values.
   */
  async function onSubmit(data) {
    setError(null);
    try {
      const { name, email, avatar, banner, token, venueManager } = await registerUser(data);
      storeLogin(name, email, avatar, banner, token, venueManager);
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
            Create an account
          </h2>
        </div>

        {(error || apiError) && (
          <div className='mt-4 rounded-md bg-red-50 p-4 border border-red-400'>
            <p className='text-sm text-red-700'>{error || apiError}</p>
          </div>
        )}

        <form className='mt-8 space-y-6' onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className='space-y-4 rounded-md'>
            <div>
              <label htmlFor='name' className='block text-sm font-medium text-gray-700'>Name</label>
              <div className='mt-1'>
                <input
                  id='name'
                  type='text'
                  {...register('name')}
                  className={`block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.name ? 'border-warning' : 'border-gray-300'}`}
                />
                {errors.name && <p className='mt-1 text-sm text-warning'>{errors.name.message}</p>}
              </div>
            </div>

            <div>
              <label htmlFor='email' className='block text-sm font-medium text-gray-700'>Email address</label>
              <div className='mt-1'>
                <input
                  id='email'
                  type='email'
                  autoComplete='email'
                  {...register('email')}
                  className={`block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.email ? 'border-warning' : 'border-gray-300'}`}
                />
                {errors.email && <p className='mt-1 text-sm text-warning'>{errors.email.message}</p>}
              </div>
            </div>

            <div>
              <label htmlFor='password' className='block text-sm font-medium text-gray-700'>Password</label>
              <div className='mt-1'>
                <input
                  id='password'
                  type='password'
                  autoComplete='new-password'
                  {...register('password')}
                  className={`block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.password ? 'border-warning' : 'border-gray-300'}`}
                />
                {errors.password && <p className='mt-1 text-sm text-warning'>{errors.password.message}</p>}
              </div>
            </div>

            <div>
              <label htmlFor='avatar' className='block text-sm font-medium text-gray-700'>Avatar URL (optional)</label>
              <div className='mt-1'>
                <input
                  id='avatar'
                  type='url'
                  {...register('avatar')}
                  className={`block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.avatar ? 'border-warning' : 'border-gray-300'}`}
                />
                {errors.avatar && <p className='mt-1 text-sm text-warning'>{errors.avatar.message}</p>}
              </div>
            </div>

            <div className='flex items-center'>
              <input
                id='venueManager'
                type='checkbox'
                {...register('venueManager')}
                className='h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500'
              />
              <label htmlFor='venueManager' className='ml-2 block text-sm text-gray-900'>Register as a Venue Manager (optional)</label>
            </div>
          </div>

          <button
            type='submit'
            disabled={loading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-main ${loading ? 'bg-blue-400 cursor-not-allowed' : 'hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'}`}
          >
            {loading ? 'Creating account...' : 'Sign up'}
          </button>
        </form>
      </div>
    </div>
  );
}
