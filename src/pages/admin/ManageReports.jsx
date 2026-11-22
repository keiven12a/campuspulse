
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
  Search,
  FileText,
  CalendarDays,
  User,
} from 'lucide-react'
import Card from '../../components/common/Card.jsx'
import Badge from '../../components/common/Badge.jsx'
import { getAllReports } from '../../services/reportService'

function ManageReports() {
  const [reports, setReports] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchReports() {
      try {
        const response = await getAllReports()
        setReports(response.reports || [])
      } catch (error) {
        setError(
          error.response?.data?.message ||
          'Unable to load reports.'
        )
      } finally {
        setIsLoading(false)
      }
    }

    fetchReports()
  }, [])

  const filteredReports = reports.filter((report) => {
    const search = searchTerm.toLowerCase()

    const matchesSearch =
      report.title.toLowerCase().includes(search) ||
      report.description.toLowerCase().includes(search) ||
      report.location.toLowerCase().includes(search) ||
      report.reporter?.name?.toLowerCase().includes(search)

    const matchesStatus =
      statusFilter === 'all' || report.status === statusFilter

    const matchesCategory =
      categoryFilter === 'all' || report.category === categoryFilter

    return matchesSearch && matchesStatus && matchesCategory
  })

  return (
    <div className="space-y-8">
      <section>
        <p className="text-sm font-medium text-primary">
          Administration
        </p>

        <h1 className="mt-2 text-3xl font-bold text-text-primary">
          Manage Reports
        </h1>

        <p className="mt-2 text-text-secondary">
          Review, search, filter, and manage submitted campus reports.
        </p>
      </section>

      <section>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="relative md:col-span-1">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary"
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search reports..."
              className="w-full rounded-lg border border-border bg-surface py-3 pl-10 pr-4 text-sm text-text-primary outline-none focus:border-primary"
            />
          </div>

          <div>
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm text-text-primary outline-none focus:border-primary"
            >
              <option value="all">All statuses</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <div>
            <select
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value)}
              className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm text-text-primary outline-none focus:border-primary"
            >
              <option value="all">All categories</option>
              <option value="water">Water</option>
              <option value="electricity">Electricity</option>
              <option value="waste">Waste</option>
              <option value="infrastructure">Infrastructure</option>
              <option value="safety">Safety</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-text-primary">
            Submitted Reports
          </h2>

          <p className="text-sm text-text-secondary">
            {filteredReports.length} of {reports.length} reports
          </p>
        </div>

        {error && (
          <Card padding="medium">
            <p className="text-sm text-red-600">{error}</p>
          </Card>
        )}

        {isLoading && (
          <Card padding="medium">
            <p className="text-sm text-text-secondary">
              Loading reports...
            </p>
          </Card>
        )}

        {!isLoading && !error && filteredReports.length === 0 && (
          <Card padding="medium">
            <p className="text-sm text-text-secondary">
              No reports match your search or filters.
            </p>
          </Card>
        )}

        {!isLoading && !error && filteredReports.length > 0 && (
          <div className="space-y-4">
            {filteredReports.map((report) => (
              <Card key={report._id} padding="medium">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div className="min-w-0">
                    <h3 className="font-semibold text-text-primary">
                      {report.title}
                    </h3>

                    <p className="mt-1 text-sm capitalize text-text-secondary">
                      {report.category}
                    </p>

                    <p className="mt-2 line-clamp-2 text-sm text-text-secondary">
                      {report.description}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-text-secondary">
                      <span className="flex items-center gap-1">
                        <User size={14} />
                        {report.reporter?.name || 'Unknown reporter'}
                      </span>

                      <span className="flex items-center gap-1">
                        <CalendarDays size={14} />
                        {new Date(report.createdAt).toLocaleDateString()}
                      </span>

                      <span className="flex items-center gap-1">
                        <FileText size={14} />
                        {report.location}
                      </span>
                    </div>
                  </div>

                  <div className="flex shrink-0 flex-col items-start gap-3 sm:items-end">
  <Badge status={report.status} />

  <Link
    to={`/admin/reports/${report._id}`}
    className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
  >
    View Details
  </Link>
</div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default ManageReports
