
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-10">

        {/* Footer branding */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-xl font-bold text-white">
              C
            </div>

            <span className="text-xl font-bold text-text-primary">
              CampusPulse
            </span>
          </Link>

          <p className="mt-3 max-w-md text-sm leading-6 text-text-secondary">
            Making our campus a better place, one report at a time.
            Together, we can build a cleaner, safer, and better campus
            community.
          </p>
        </div>
        {/* Quick links */}
        <nav aria-label="Footer navigation" className="mb-8">
          <h3 className="mb-4 text-sm font-semibold text-text-primary">
            Quick Links
          </h3>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            <Link
              to="/"
              className="text-sm text-text-secondary transition-colors hover:text-primary"
            >
              Home
            </Link>

            <Link
              to="/login"
              className="text-sm text-text-secondary transition-colors hover:text-primary"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="text-sm text-text-secondary transition-colors hover:text-primary"
            >
              Register
            </Link>
          </div>
        </nav>

        {/* Copyright */}
        <div className="border-t border-border pt-6">
          <p className="text-center text-sm text-text-secondary">
            © {new Date().getFullYear()} CampusPulse.
            Built for a better campus community.
          </p>
        </div>

      </div>
    </footer>
  )
}

export default Footer
