
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import App from '../App.jsx'

describe('CampusPulse App', () => {
  it('shows the 404 page for an unknown route', () => {
    render(
      <MemoryRouter initialEntries={['/unknown-page']}>
        <App />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('heading', { name: '404 - Page Not Found' }),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('link', { name: 'Back to Home' }),
    ).toHaveAttribute('href', '/')
  })
})
