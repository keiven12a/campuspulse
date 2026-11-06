import { Link, Route, Routes } from 'react-router-dom'

function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-lg rounded-2xl bg-white p-10 text-center shadow-lg">
        <h1 className="text-4xl font-bold text-blue-700">
          CampusPulse
        </h1>

        <p className="mt-4 text-slate-600">
          Making our campus a better place, one report at a time.
        </p>

        <div className="mt-6 flex justify-center gap-3">
          <Link
            to="/login"
            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="rounded-lg border border-blue-600 px-6 py-3 font-semibold text-blue-700 hover:bg-blue-50"
          >
            Register
          </Link>
        </div>
      </div>
    </main>
  )
}

function PlaceholderPage({ title }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-6">
      <h1 className="text-3xl font-bold text-blue-700">
        {title}
      </h1>

      <p className="mt-3 text-slate-600">
        This page will be developed in a future milestone.
      </p>

      <Link
        to="/"
        className="mt-6 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
      >
        Back to Home
      </Link>
    </main>
  )
}

function NotFoundPage() {
  return (
    <PlaceholderPage title="404 - Page Not Found" />
  )
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