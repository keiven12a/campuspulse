
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect, vi } from 'vitest'
import Login from '../pages/auth/Login.jsx'

vi.mock('../services/authService', () => ({
  loginUser: vi.fn(),
}))

vi.mock('../context/useAuth', () => ({
  useAuth: () => ({
    login: vi.fn(),
  }),
}))

describe('Login', () => {
  it('displays the login form and navigation links', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('heading', { name: 'Welcome back' }),
    ).toBeInTheDocument()

    expect(screen.getByLabelText('Email address')).toBeInTheDocument()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()

    expect(
      screen.getByRole('link', { name: 'Create an account' }),
    ).toHaveAttribute('href', '/register')
  })

  it('shows validation errors when submitted empty', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    )

    fireEvent.click(screen.getByRole('button', { name: 'Sign in' }))

    expect(screen.getByText('Email address is required.')).toBeInTheDocument()
    expect(screen.getByText('Password is required.')).toBeInTheDocument()
  })

  it('shows validation errors for invalid email and short password', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    )

    fireEvent.change(screen.getByLabelText('Email address'), {
      target: { value: 'invalid-email' },
    })

    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: '123' },
    })

    fireEvent.click(screen.getByRole('button', { name: 'Sign in' }))

    expect(
      screen.getByText('Please enter a valid email address.'),
    ).toBeInTheDocument()

    expect(
      screen.getByText('Password must be at least 8 characters.'),
    ).toBeInTheDocument()
  })
})
