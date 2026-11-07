
import { Link, Route, Routes } from 'react-router-dom'

function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-12">
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
        element={<PlaceholderPage title="Student Dashboard" />}
      />
      <Route
        path="/admin/dashboard"
        element={<PlaceholderPage title="Admin Dashboard" />}
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
