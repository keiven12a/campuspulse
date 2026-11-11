
import { useState } from 'react'
import { Link } from 'react-router-dom'

import Input from '../../components/common/Input'
import Button from '../../components/common/Button'

function Register() {
  // Store registration form values
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  // Store validation errors
  const [errors, setErrors] = useState({})
  // Track registration submission state
const [isLoading, setIsLoading] = useState(false)

// Store registration success message
const [successMessage, setSuccessMessage] = useState('')

  // Handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }))
  }

  // Validate registration form
  const validateForm = () => {
    const newErrors = {}

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    // Validate full name
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required.'
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.'
    } else if (!emailPattern.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.'
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = 'Password is required.'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters.'
    }

    // Validate password confirmation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password.'
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match.'
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  // Handle registration form submission
const handleSubmit = async (event) => {
  event.preventDefault()

  setSuccessMessage('')

  const isValid = validateForm()

  if (!isValid) {
    return
  }

  setIsLoading(true)

  // Simulate a registration request
  await new Promise((resolve) => setTimeout(resolve, 1500))

  console.log('Registration form is valid:', formData)

  setSuccessMessage(
    'Registration successful! Your account is ready.'
  )

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

        {/* Registration Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-text-primary">
            CampusPulse
          </h1>

          <h2 className="mt-6 text-2xl font-semibold text-text-primary">
            Create your account
          </h2>

          <p className="mt-2 text-text-secondary">
            Join your campus community
          </p>
        </div>

        {/* Registration Form */}
        <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
          <form
            onSubmit={handleSubmit}
            noValidate
            className="space-y-5"
          >
            <Input
              label="Full name"
              name="fullName"
              type="text"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              error={errors.fullName}
              autoComplete="name"
              required
            />

            <Input
              label="Email address"
              name="email"
              type="email"
              placeholder="you@gmail.com"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              autoComplete="email"
              required
            />

            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              autoComplete="new-password"
              required
            />

            <Input
              label="Confirm password"
              name="confirmPassword"
              type="password"
              placeholder="Re-enter your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              autoComplete="new-password"
              required
            />
            {/* Success Message */}
{successMessage && (
  <p
    className="text-sm font-medium text-green-600"
    role="status"
  >
    {successMessage}
  </p>
)}

            <Button
  type="submit"
  className="w-full"
  disabled={isLoading}
>
  {isLoading ? 'Creating account...' : 'Create account'}
</Button>
          </form>

          {/* Login Link */}
          <p className="mt-6 text-center text-sm text-text-secondary">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-semibold text-primary hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}

export default Register
