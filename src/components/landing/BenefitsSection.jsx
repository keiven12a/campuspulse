
import {
  Send,
  Eye,
  Users,
  ClipboardCheck,
} from 'lucide-react'

function BenefitsSection() {
  return (
    <section className="bg-surface px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            Why CampusPulse?
          </span>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            A better way to improve campus life
          </h2>

          <p className="mt-5 text-base leading-8 text-text-secondary">
            CampusPulse brings students and administrators together
            to make campus problem-solving easier, clearer, and
            more organized.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-border bg-background p-7">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Send size={25} />
            </div>

            <h3 className="mt-5 text-lg font-semibold text-text-primary">
              Easy Issue Reporting
            </h3>

            <p className="mt-3 text-sm leading-7 text-text-secondary">
              Report campus problems in one convenient place
              with useful details and location information.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-background p-7">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Eye size={25} />
            </div>

            <h3 className="mt-5 text-lg font-semibold text-text-primary">
              Transparent Updates
            </h3>

            <p className="mt-3 text-sm leading-7 text-text-secondary">
              Stay informed by following report progress and
              updates from campus administrators.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-background p-7">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Users size={25} />
            </div>

            <h3 className="mt-5 text-lg font-semibold text-text-primary">
              Student Participation
            </h3>

            <p className="mt-3 text-sm leading-7 text-text-secondary">
              Give students an opportunity to share concerns
              and contribute to a better campus environment.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-background p-7">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <ClipboardCheck size={25} />
            </div>

            <h3 className="mt-5 text-lg font-semibold text-text-primary">
              Organized Management
            </h3>

            <p className="mt-3 text-sm leading-7 text-text-secondary">
              Help administrators organize reports, prioritize
              issues, and manage resolutions efficiently.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BenefitsSection
