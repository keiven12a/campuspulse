
import {
  Send,
  Eye,
  Users,
  ClipboardCheck,
} from 'lucide-react'

function BenefitsSection() {
  return (
    <section className="bg-surface px-5 py-16 sm:px-6 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            Why CampusPulse?
          </span>

          <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-text-primary sm:text-4xl">
            A better way to improve campus life
          </h2>

          <p className="mt-5 text-base leading-7 text-text-secondary sm:text-lg sm:leading-8">
            CampusPulse brings students and administrators together
            to make campus problem-solving easier, clearer, and
            more organized.
          </p>
        </div>

        {/* Platform benefits */}
        <div className="mt-12 grid gap-5 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {/* Benefit 1 */}
          <div className="group h-full rounded-2xl border border-border bg-background p-6 transition-all duration-200 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg sm:p-7">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-200 group-hover:bg-primary group-hover:text-white">
              <Send size={25} aria-hidden="true" />
            </div>

            <h3 className="mt-5 text-lg font-semibold text-text-primary">
              Easy Issue Reporting
            </h3>

            <p className="mt-3 text-sm leading-7 text-text-secondary">
              Report campus problems in one convenient place
              with useful details and location information.
            </p>
          </div>

          {/* Benefit 2 */}
          <div className="group h-full rounded-2xl border border-border bg-background p-6 transition-all duration-200 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg sm:p-7">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-200 group-hover:bg-primary group-hover:text-white">
              <Eye size={25} aria-hidden="true" />
            </div>

            <h3 className="mt-5 text-lg font-semibold text-text-primary">
              Transparent Updates
            </h3>

            <p className="mt-3 text-sm leading-7 text-text-secondary">
              Stay informed by following report progress and
              updates from campus administrators.
            </p>
          </div>

          {/* Benefit 3 */}
          <div className="group h-full rounded-2xl border border-border bg-background p-6 transition-all duration-200 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg sm:p-7">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-200 group-hover:bg-primary group-hover:text-white">
              <Users size={25} aria-hidden="true" />
            </div>

            <h3 className="mt-5 text-lg font-semibold text-text-primary">
              Student Participation
            </h3>

            <p className="mt-3 text-sm leading-7 text-text-secondary">
              Give students an opportunity to share concerns
              and contribute to a better campus environment.
            </p>
          </div>

          {/* Benefit 4 */}
          <div className="group h-full rounded-2xl border border-border bg-background p-6 transition-all duration-200 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg sm:p-7">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-200 group-hover:bg-primary group-hover:text-white">
              <ClipboardCheck size={25} aria-hidden="true" />
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
