
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'

import Input from '../../components/common/Input'
import Button from '../../components/common/Button'

function Login() {
  // Store email and password values
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  // Store loading, validation, visibility, and login error states
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [loginError, setLoginError] = useState('')

  // Validate email and password
  const validateForm = () => {
    const newErrors = {}
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.'
    } else if (!emailPattern.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required.'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters.'
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  // Handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }))
  }

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault()

    const isValid = validateForm()

    if (!isValid) {
      return
    }

    setLoginError('')
    setIsLoading(true)

    // Simulate a login request
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Simulate an unsuccessful login
    setLoginError('Invalid email or password. Please try again.')
    setIsLoading(false)
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md">
        {/* Back to Home */}
        <div className="mb-6 flex justify-start">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-blue-600"
          >
            ← Back to Home
          </Link>
        </div>

        {/* Login Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-text-primary">
            CampusPulse
          </h1>

          <h2 className="mt-6 text-2xl font-semibold text-text-primary">
            Welcome back
          </h2>

          <p className="mt-2 text-text-secondary">
            Sign in to your campus community
          </p>
        </div>

        {/* Login Form */}
        <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
          <form
            onSubmit={handleSubmit}
            noValidate
            className="space-y-5"
          >
            {/* Email Field */}
            <Input
              label="Email address"
              name="email"
              type="email"
              placeholder="campuspulse123@gmail.com"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              autoComplete="email"
              required
            />

            {/* Password Field */}
            <div className="relative">
              <Input
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                autoComplete="current-password"
                className="pr-12"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword((previous) => !previous)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute right-3 top-10 text-text-secondary hover:text-primary"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <button
                type="button"
                className="text-sm font-medium text-primary hover:underline"
              >
                Forgot password?
              </button>
            </div>

            {/* Login Error */}
            {loginError && (
              <div
                className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                role="alert"
              >
                {loginError}
              </div>
            )}

            {/* Sign In Button */}
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>

          {/* Register Link */}
          <p className="mt-6 text-center text-sm text-text-secondary">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="font-semibold text-primary hover:underline"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}

export default Login