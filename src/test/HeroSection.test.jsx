
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import HeroSection from '../components/landing/HeroSection.jsx'

describe('HeroSection', () => {
  it('displays the main heading and introduction', () => {
    render(
      <MemoryRouter>
        <HeroSection />
      </MemoryRouter>,
    )

    expect(
     screen.getByRole('heading', { name: /make your campusbetter, together/i }),
    ).toBeInTheDocument()

    expect(
      screen.getByText(/notice a problem on campus\?/i),
    ).toBeInTheDocument()
  })

  it('provides the correct registration and login links', () => {
    render(
      <MemoryRouter>
        <HeroSection />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('link', { name: /get started/i }),
    ).toHaveAttribute('href', '/register')

    expect(
      screen.getByRole('link', { name: 'Login' }),
    ).toHaveAttribute('href', '/login')
  })
})
