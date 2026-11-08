
import {
  ClipboardList,
  Activity,
  CheckCircle2,
} from 'lucide-react'

function HowItWorks() {
  return (
    <section className="bg-background px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            How It Works
          </span>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            Making campus improvements simple
          </h2>

          <p className="mt-5 text-base leading-8 text-text-secondary">
            CampusPulse makes it easier for students to report
            campus problems and follow them until they are resolved.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-border bg-surface p-7">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <ClipboardList size={25} />
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

          <div className="rounded-2xl border border-border bg-surface p-7">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Activity size={25} />
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

          <div className="rounded-2xl border border-border bg-surface p-7">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <CheckCircle2 size={25} />
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
