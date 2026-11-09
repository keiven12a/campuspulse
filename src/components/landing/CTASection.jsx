
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

function CTASection() {
  return (
    <section className="bg-primary px-5 py-16 sm:px-6 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-4xl text-center">
        <span className="text-sm font-semibold uppercase tracking-widest text-blue-100">
          Get Involved
        </span>

        <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
          Be part of a better campus.
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-blue-100 sm:text-lg sm:leading-8">
          Your voice matters. Join CampusPulse, report campus
          problems, follow their progress, and help make your
          campus a better place for everyone.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            to="/register"
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-white px-7 py-3 font-semibold text-primary shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-50 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:w-auto"
          >
            Get Started
            <ArrowRight size={18} aria-hidden="true" />
          </Link>

          <Link
            to="/login"
            className="inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-white/40 px-7 py-3 font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:w-auto"
          >
            Sign In
          </Link>
        </div>
      </div>
    </section>
  )
}

export default CTASection
