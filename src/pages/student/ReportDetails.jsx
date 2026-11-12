
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, MapPin, CalendarDays } from 'lucide-react'

import Card from '../../components/common/Card.jsx'
import Badge from '../../components/common/Badge.jsx'
import { reports } from '../../data/reports.js'

function ReportDetails() {
  const { id } = useParams()

  const report = reports.find((item) => item.id === id)

  if (!report) {
    return (
      <Card className="py-10 text-center">
        <h1 className="text-xl font-bold text-text-primary">
          Report not found
        </h1>

        <p className="mt-2 text-sm text-text-secondary">
          The report you are looking for does not exist.
        </p>

        <Link
          to="/student/reports"
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
        >
          <ArrowLeft size={16} />
          Back to My Reports
        </Link>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Link
        to="/student/reports"
        className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
      >
        <ArrowLeft size={16} />
        Back to My Reports
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-text-primary">
          Report Details
        </h1>

        <p className="mt-2 text-sm text-text-secondary">
          View the complete information about your submitted issue.
        </p>
      </div>

      <Card className="space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-text-primary">
              {report.title}
            </h2>

            <span className="mt-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              {report.category}
            </span>
          </div>

          <Badge status={report.status} />
        </div>

        <div>
          <h3 className="mb-2 text-sm font-semibold text-text-primary">
            Description
          </h3>

          <p className="text-sm leading-7 text-text-secondary">
            {report.description}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 border-t border-border pt-5 sm:grid-cols-2">
          <div className="flex items-start gap-3">
            <MapPin size={18} className="mt-1 text-primary" />

            <div>
              <p className="text-xs text-text-secondary">Location</p>
              <p className="mt-1 text-sm font-medium text-text-primary">
                {report.location}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CalendarDays size={18} className="mt-1 text-primary" />

            <div>
              <p className="text-xs text-text-secondary">Date submitted</p>
              <p className="mt-1 text-sm font-medium text-text-primary">
                {report.date}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default ReportDetails
