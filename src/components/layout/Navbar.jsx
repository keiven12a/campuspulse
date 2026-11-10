
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navLinkStyles = ({ isActive }) =>
    `font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary ${
      isActive
        ? 'text-primary'
        : 'text-text-secondary hover:text-primary'
    }`

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <nav
      aria-label="Main navigation"
      className="border-b border-border bg-surface"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6">
        {/* Brand */}
        <Link
          to="/"
          onClick={closeMenu}
          className="flex items-center gap-2 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
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
              `rounded-lg px-5 py-2.5 font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary ${
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
          className="rounded-lg p-2 text-text-primary transition-colors hover:bg-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:hidden"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
        >
          {isMenuOpen ? (
            <X size={24} aria-hidden="true" />
          ) : (
            <Menu size={24} aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <div
          id="mobile-navigation"
          className="flex flex-col gap-5 border-t border-border bg-surface px-5 py-5 sm:px-6 md:hidden"
        >
          <NavLink
            to="/"
            className={navLinkStyles}
            onClick={closeMenu}
          >
            Home
          </NavLink>

          <NavLink
            to="/login"
            className={navLinkStyles}
            onClick={closeMenu}
          >
            Login
          </NavLink>

          <NavLink
            to="/register"
            className="rounded-lg bg-primary px-5 py-3 text-center font-semibold text-white transition-colors duration-200 hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            onClick={closeMenu}
          >
            Register
          </NavLink>
        </div>
      )}
    </nav>
  )
}

export default Navbar
