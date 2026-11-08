
import {
  Users,
  MessageSquareText,
  Building2,
} from 'lucide-react'

function IntroductionSection() {
  return (
    <section className="bg-surface px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl">

        {/* Section heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            About CampusPulse
          </span>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            Your voice can make a difference on campus
          </h2>

          <p className="mt-5 text-base leading-8 text-text-secondary">
            CampusPulse is a campus community platform that connects
            students and campus administrators to identify, report,
            track, and resolve everyday campus problems.
          </p>
        </div>

        {/* Three key ideas */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">

          {/* Students */}
          <div className="rounded-2xl border border-border bg-background p-7">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Users size={25} />
            </div>

            <h3 className="mt-5 text-lg font-semibold text-text-primary">
              A Voice for Students
            </h3>

            <p className="mt-3 text-sm leading-7 text-text-secondary">
              Students can report problems around campus and
              share concerns that affect their daily experience.
            </p>
          </div>

          {/* Communication */}
          <div className="rounded-2xl border border-border bg-background p-7">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <MessageSquareText size={25} />
            </div>

            <h3 className="mt-5 text-lg font-semibold text-text-primary">
              Transparent Communication
            </h3>

            <p className="mt-3 text-sm leading-7 text-text-secondary">
              Students can follow the progress of their reports
              and stay informed about actions being taken.
            </p>
          </div>

          {/* Administration */}
          <div className="rounded-2xl border border-border bg-background p-7">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Building2 size={25} />
            </div>

            <h3 className="mt-5 text-lg font-semibold text-text-primary">
              Better Campus Management
            </h3>

            <p className="mt-3 text-sm leading-7 text-text-secondary">
              Administrators can organize reported issues,
              manage responses, and help improve campus facilities.
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}

export default IntroductionSection