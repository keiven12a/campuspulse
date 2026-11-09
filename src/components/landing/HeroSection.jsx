
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  MapPin,
  Clock3,
  CheckCircle2,
} from 'lucide-react'

function HeroSection() {
  return (
    <section className="overflow-hidden bg-background px-5 py-16 sm:px-6 sm:py-20 lg:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-14">

        {/* Left: Hero content */}
        <div>
          <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
            Your campus, your voice
          </span>

          <h1 className="mt-6 max-w-2xl text-4xl font-bold leading-tight tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
            Make your campus
            <span className="block text-primary">
              better, together.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-text-secondary sm:text-lg sm:leading-8">
            Notice a problem on campus? Report it, track its progress,
            and help create a cleaner, safer, and better environment
            for everyone.
          </p>

          {/* Action buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Link
              to="/register"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-primary px-7 py-3.5 font-semibold text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              Get Started
              <ArrowRight size={19} aria-hidden="true" />
            </Link>

            <Link
              to="/login"
              className="inline-flex min-h-12 items-center justify-center rounded-lg border border-border bg-surface px-7 py-3.5 font-semibold text-text-primary transition-colors hover:bg-background focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              Login
            </Link>
          </div>

          <p className="mt-6 text-sm leading-6 text-text-secondary">
            Together, we can make a difference on campus.
          </p>
        </div>

        {/* Right: Dashboard preview */}
        <div className="relative mx-auto w-full max-w-lg">
          <div
            aria-hidden="true"
            className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-primary/10 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-accent/10 blur-3xl"
          />

          <div className="relative rounded-2xl border border-border bg-surface p-4 shadow-xl sm:p-7">

            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm text-text-secondary">
                  CampusPulse Overview
                </p>
                <h2 className="mt-1 text-xl font-bold text-text-primary">
                  Campus Activity
                </h2>
              </div>

              <div className="shrink-0 rounded-xl bg-primary/10 p-3 text-primary">
                <MapPin size={25} aria-hidden="true" />
              </div>
            </div>

            {/* Illustrative overview cards */}
            <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-7 sm:gap-4">
              <div className="rounded-xl bg-background p-3 sm:p-4">
                <p className="text-xs leading-5 text-text-secondary sm:text-sm">
                  Reports submitted
                </p>
                <p className="mt-2 text-2xl font-bold text-text-primary sm:text-3xl">
                  24
                </p>
              </div>

              <div className="rounded-xl bg-background p-3 sm:p-4">
                <p className="text-xs leading-5 text-text-secondary sm:text-sm">
                  Issues resolved
                </p>
                <p className="mt-2 text-2xl font-bold text-text-primary sm:text-3xl">
                  18
                </p>
              </div>
            </div>

            <p className="mt-2 text-xs text-text-secondary">
              Illustrative sample statistics
            </p>

            {/* Example report */}
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-text-primary">
                Recent campus reports
              </h3>

              <div className="mt-3 rounded-xl border border-border p-3 sm:mt-4 sm:p-4">
                <div className="flex items-start gap-3">
                  <div className="shrink-0 rounded-lg bg-amber-50 p-2 text-amber-600">
                    <MapPin size={20} aria-hidden="true" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-text-primary">
                      Overflowing waste bin
                    </p>
                    <p className="mt-1 text-sm leading-5 text-text-secondary">
                      Near the student cafeteria
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                        In Progress
                      </span>

                      <span className="flex items-center gap-1 text-xs text-text-secondary">
                        <Clock3 size={13} aria-hidden="true" />
                        Recently reported
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-start gap-2 text-sm font-medium leading-5 text-accent">
                <CheckCircle2
                  size={18}
                  className="mt-0.5 shrink-0"
                  aria-hidden="true"
                />
                <span>Working together for a better campus</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default HeroSection
