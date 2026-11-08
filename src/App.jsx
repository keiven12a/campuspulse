
import { Link, Route, Routes } from 'react-router-dom'
import Navbar from './components/layout/Navbar.jsx'
import Footer from './components/layout/Footer.jsx'
import Sidebar from './components/layout/Sidebar.jsx'

function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-xl rounded-2xl border border-border bg-surface p-8 text-center shadow-lg sm:p-12">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-2xl font-bold text-white">
            C
          </div>

          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">
            Your campus, your voice
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
            CampusPulse
          </h1>

          <p className="mx-auto mt-5 max-w-md text-base leading-7 text-text-secondary">
            Making our campus a better place, one report at a time.
            Share campus issues, follow their progress, and help create
            a better environment for everyone.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/login"
              className="rounded-lg bg-primary px-7 py-3 font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="rounded-lg border border-primary px-7 py-3 font-semibold text-primary transition-colors hover:bg-primary/5"
            >
              Create an Account
            </Link>
          </div>

          <p className="mt-8 text-sm text-text-secondary">
            Built for a better campus community.
          </p>
        </div>
      </div>

      <Footer />
    </main>
  )
}

function PlaceholderPage({ title }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6 py-12">
      <div className="w-full max-w-lg rounded-2xl border border-border bg-surface p-8 text-center shadow-md sm:p-10">
        <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-xl font-bold text-primary">
          C
        </div>

        <h1 className="text-3xl font-bold text-text-primary">
          {title}
        </h1>

        <p className="mt-4 leading-7 text-text-secondary">
          This page will be developed in a future milestone.
          Thank you for being part of CampusPulse.
        </p>

        <Link
          to="/"
          className="mt-7 inline-block rounded-lg bg-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-dark"
        >
          Back to Home
        </Link>
      </div>
    </main>
  )
}

// Reusable dashboard layout
function DashboardPage({ role }) {
  const isAdmin = role === 'admin'

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col md:flex-row">
        <Sidebar role={role} />

        <main className="min-w-0 flex-1 p-6 sm:p-8">
          <div className="mb-8">
            <p className="text-sm font-medium text-primary">
              {isAdmin ? 'Administration' : 'Student Portal'}
            </p>

            <h1 className="mt-2 text-3xl font-bold text-text-primary">
              {isAdmin ? 'Admin Dashboard' : 'Student Dashboard'}
            </h1>

            <p className="mt-2 text-text-secondary">
              {isAdmin
                ? 'Manage campus reports and help improve the campus community.'
                : 'Welcome! Report campus issues and follow their progress.'}
            </p>
          </div>

          <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-text-primary">
              {isAdmin ? 'Manage Campus Issues' : 'Your Campus at a Glance'}
            </h2>

            <p className="mt-2 text-sm leading-6 text-text-secondary">
              {isAdmin
                ? 'Your report management tools will appear here as we build the admin dashboard.'
                : 'Your reports, campus updates, and activity will appear here as we build the student dashboard.'}
            </p>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  )
}

function NotFoundPage() {
  return <PlaceholderPage title="404 - Page Not Found" />
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route
        path="/login"
        element={<PlaceholderPage title="Login" />}
      />

      <Route
        path="/register"
        element={<PlaceholderPage title="Register" />}
      />

      <Route
        path="/student/dashboard"
        element={<DashboardPage role="student" />}
      />

      <Route
        path="/admin/dashboard"
        element={<DashboardPage role="admin" />}
      />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
