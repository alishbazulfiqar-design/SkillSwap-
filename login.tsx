import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { z } from 'zod'

import { loginSchema } from '../validation/authSchema'
import { useMutation } from '@tanstack/react-query'
import { loginUser } from '../api/usersApi'
type View =
  | 'login'|
  'dashboard'
  | 'live-session'
  | 'host-workshop'
  | 'messages'
  | 'profile'
  | 'users'
type LoginFormData = z.infer<typeof loginSchema>
//login
 const Login = ({ onLogin }: { onLogin: () => void }) => {
  const {
    register,// connect input to react hook forms
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })
  //mutation code
const loginMutation = useMutation({
  mutationFn: loginUser,

  onSuccess: (data) => {
    console.log('Login successful:', data)
    //after login localstorage have the access token,
    // when we request the user list the token will be avialable. 
    localStorage.setItem('accessToken', data.access)
      onLogin()
  },

  onError: (error) => {
    console.error('Login failed:', error)
  },
})
// onsubmit code
const onSubmit = (data: LoginFormData) => {
  console.log('FORM DATA:', data)
    localStorage.setItem('tenantId', data.organization_id)
  loginMutation.mutate(data)
}

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        {/* Heading */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome Back
          </h1>

          <p className="mt-2 text-gray-500">
            Login to your account
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 space-y-5"
        > 

        {/* Organization ID */}
<div>
  <label
    htmlFor="organization_id"
    className="mb-2 block text-sm font-medium text-gray-700"
  >
    Organization ID
  </label>

  <input
    id="organization_id"
    type="text"
    placeholder="Enter your organization ID"
    {...register('organization_id')}
    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
  />

  {errors.organization_id && (
    <p className="mt-1 text-sm text-red-600">
      {errors.organization_id.message}
    </p>
  )}
</div>
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register('email')}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              {...register('password')}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />

            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Login button */}
          {/* <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Login
          </button> */}
        
          {loginMutation.isError && (
  <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
    {loginMutation.error.message}
  </div>
)}
          <button
  type="submit"
  disabled={loginMutation.isPending}
  className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
>
  {loginMutation.isPending ? 'Logging in...' : 'Login'}
</button>
        </form>
      </div>
    </div>
  )
}

export default Login