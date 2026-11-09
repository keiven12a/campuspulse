
import {
  ClipboardList,
  Activity,
  CheckCircle2,
} from 'lucide-react'

function HowItWorks() {
  return (
    <section className="bg-background px-5 py-16 sm:px-6 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            How It Works
          </span>

          <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-text-primary sm:text-4xl">
            Making campus improvements simple
          </h2>

          <p className="mt-5 text-base leading-7 text-text-secondary sm:text-lg sm:leading-8">
            CampusPulse makes it easier for students to report
            campus problems and follow them until they are resolved.
          </p>
        </div>

        {/* Three steps */}
        <div className="mt-12 grid gap-5 sm:mt-14 md:grid-cols-3 md:gap-6">
          {/* Step 1 */}
          <div className="group rounded-2xl border border-border bg-surface p-6 transition-all duration-200 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg sm:p-7">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-200 group-hover:bg-primary group-hover:text-white">
              <ClipboardList size={25} aria-hidden="true" />
            </div>

            <span className="mt-6 block text-sm font-semibold text-primary">
              STEP 01
            </span>

            <h3 className="mt-2 text-lg font-semibold text-text-primary">
              Report an Issue
            </h3>

            <p className="mt-3 text-sm leading-7 text-text-secondary">
              Notice a problem on campus? Submit a report with
              its details, category, and location.
            </p>
          </div>

          {/* Step 2 */}
          <div className="group rounded-2xl border border-border bg-surface p-6 transition-all duration-200 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg sm:p-7">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-200 group-hover:bg-primary group-hover:text-white">
              <Activity size={25} aria-hidden="true" />
            </div>

            <span className="mt-6 block text-sm font-semibold text-primary">
              STEP 02
            </span>

            <h3 className="mt-2 text-lg font-semibold text-text-primary">
              Track Progress
            </h3>

            <p className="mt-3 text-sm leading-7 text-text-secondary">
              Follow your submitted report and see updates as
              campus administrators work on the issue.
            </p>
          </div>

          {/* Step 3 */}
          <div className="group rounded-2xl border border-border bg-surface p-6 transition-all duration-200 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg sm:p-7">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-200 group-hover:bg-primary group-hover:text-white">
              <CheckCircle2 size={25} aria-hidden="true" />
            </div>

            <span className="mt-6 block text-sm font-semibold text-primary">
              STEP 03
            </span>

            <h3 className="mt-2 text-lg font-semibold text-text-primary">
              See It Resolved
            </h3>

            <p className="mt-3 text-sm leading-7 text-text-secondary">
              Administrators take action, resolve reported
              problems, and update their status.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
