
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  MapPin,
  Clock3,
  CheckCircle2,
} from 'lucide-react'

function HeroSection() {
  return (
    <section className="overflow-hidden bg-background px-6 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">

        {/* Left: Hero content */}
        <div>
          <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
            Your campus, your voice
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
            Make your campus
            <span className="block text-primary">
              better, together.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-text-secondary sm:text-lg">
            Notice a problem on campus? Report it, track its progress,
            and help create a cleaner, safer, and better environment
            for everyone.
          </p>

          {/* Action buttons */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              to="/register"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-7 py-3.5 font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              Get Started
              <ArrowRight size={19} />
            </Link>

            <Link
              to="/login"
              className="inline-flex items-center justify-center rounded-lg border border-border bg-surface px-7 py-3.5 font-semibold text-text-primary transition-colors hover:bg-background"
            >
              Login
            </Link>
          </div>

          <p className="mt-6 text-sm text-text-secondary">
            Together, we can make a difference on campus.
          </p>
        </div>

        {/* Right: Dashboard preview */}
        <div className="relative mx-auto w-full max-w-lg">
          <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-accent/10 blur-3xl" />

          <div className="relative rounded-2xl border border-border bg-surface p-5 shadow-xl sm:p-7">

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-secondary">
                  CampusPulse Overview
                </p>
                <h2 className="mt-1 text-xl font-bold text-text-primary">
                  Campus Activity
                </h2>
              </div>

              <div className="rounded-xl bg-primary/10 p-3 text-primary">
                <MapPin size={25} />
              </div>
            </div>

            {/* Overview cards */}
            <div className="mt-7 grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-background p-4">
                <p className="text-sm text-text-secondary">
                  Reports submitted
                </p>
                <p className="mt-2 text-3xl font-bold text-text-primary">
                  24
                </p>
              </div>

              <div className="rounded-xl bg-background p-4">
                <p className="text-sm text-text-secondary">
                  Issues resolved
                </p>
                <p className="mt-2 text-3xl font-bold text-text-primary">
                  18
                </p>
              </div>
            </div>

            {/* Example report */}
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-text-primary">
                Recent campus reports
              </h3>

              <div className="mt-4 rounded-xl border border-border p-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-amber-50 p-2 text-amber-600">
                    <MapPin size={20} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-text-primary">
                      Overflowing waste bin
                    </p>
                    <p className="mt-1 text-sm text-text-secondary">
                      Near the student cafeteria
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                        In Progress
                      </span>

                      <span className="flex items-center gap-1 text-xs text-text-secondary">
                        <Clock3 size={13} />
                        Recently reported
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-sm font-medium text-accent">
                <CheckCircle2 size={18} />
                Working together for a better campus
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default HeroSection
