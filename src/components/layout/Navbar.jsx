
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navLinkStyles = ({ isActive }) =>
    `font-medium transition-colors ${
      isActive
        ? 'text-primary'
        : 'text-text-secondary hover:text-primary'
    }`

  return (
    <nav className="border-b border-border bg-surface">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Brand */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-xl font-bold text-white">
            C
          </div>

          <span className="text-xl font-bold text-text-primary">
            CampusPulse
          </span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <NavLink to="/" className={navLinkStyles}>
            Home
          </NavLink>

          <NavLink to="/login" className={navLinkStyles}>
            Login
          </NavLink>

          <NavLink
            to="/register"
            className={({ isActive }) =>
              `rounded-lg px-5 py-2.5 font-semibold text-white transition-colors ${
                isActive
                  ? 'bg-primary-dark'
                  : 'bg-primary hover:bg-primary-dark'
              }`
            }
          >
            Register
          </NavLink>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="rounded-lg p-2 text-text-primary hover:bg-background md:hidden"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="flex flex-col gap-4 border-t border-border px-6 py-5 md:hidden">
          <NavLink
            to="/"
            className={navLinkStyles}
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </NavLink>

          <NavLink
            to="/login"
            className={navLinkStyles}
            onClick={() => setIsMenuOpen(false)}
          >
            Login
          </NavLink>

          <NavLink
            to="/register"
            className="rounded-lg bg-primary px-5 py-2.5 text-center font-semibold text-white hover:bg-primary-dark"
            onClick={() => setIsMenuOpen(false)}
          >
            Register
          </NavLink>
        </div>
      )}
    </nav>
  )
}

export default Navbar
