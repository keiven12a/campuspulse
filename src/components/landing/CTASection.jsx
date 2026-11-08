
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

function CTASection() {
  return (
    <section className="bg-primary px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-4xl text-center">
        <span className="text-sm font-semibold uppercase tracking-widest text-blue-100">
          Get Involved
        </span>

        <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Be part of a better campus.
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-blue-100">
          Your voice matters. Join CampusPulse, report campus
          problems, follow their progress, and help make your
          campus a better place for everyone.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            to="/register"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-3 font-semibold text-primary transition hover:bg-blue-50"
          >
            Get Started
            <ArrowRight size={18} />
          </Link>

          <Link
            to="/login"
            className="inline-flex items-center justify-center rounded-xl border border-white/40 px-7 py-3 font-semibold text-white transition hover:bg-white/10"
          >
            Sign In
          </Link>
        </div>
      </div>
    </section>
  )
}

export default CTASection
