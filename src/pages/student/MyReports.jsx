
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  MapPin,
  CalendarDays,
  ArrowRight,
  ThumbsUp,
} from 'lucide-react'

import Card from '../../components/common/Card.jsx'
import Badge from '../../components/common/Badge.jsx'
import {
  getMyReports,
  toggleReportSupport,
} from '../../services/reportService'
import { useAuth } from '../../context/useAuth'

function MyReports() {
  const { user } = useAuth()

  const [reports, setReports] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [supportingReportId, setSupportingReportId] = useState(null)
  const [supportError, setSupportError] = useState('')

  // Fetch the logged-in student's reports from MongoDB
  useEffect(() => {
    async function fetchReports() {
      try {
        setIsLoading(true)
        setError('')

        const response = await getMyReports()
        setReports(response.reports)
      } catch (error) {
        setError(
          error.response?.data?.message ||
          'Failed to load your reports. Please try again.'
        )
      } finally {
        setIsLoading(false)
      }
    }

    fetchReports()
  }, [])

  // Toggle support for a report
  async function handleSupport(reportId) {
    try {
      setSupportingReportId(reportId)
      setSupportError('')

      const response = await toggleReportSupport(reportId)

      setReports((previousReports) =>
        previousReports.map((report) =>
          report._id === reportId ? response.report : report
        )
      )
    } catch (error) {
      setSupportError(
        error.response?.data?.message ||
        'Failed to update report support.'
      )
    } finally {
      setSupportingReportId(null)
    }
  }

  // Search and filter reports
  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus =
      selectedStatus === 'all' || report.status === selectedStatus

    const matchesCategory =
      selectedCategory === 'all' ||
      report.category === selectedCategory

    return matchesSearch && matchesStatus && matchesCategory
  })

  // Format the MongoDB creation date
  function formatDate(date) {
    return new Date(date).toLocaleDateString()
  }

  return (
    <div className="space-y-6">
      {/* Page heading */}
      <div>
        <h1 className="text-2xl font-bold text-text-primary">
          My Reports
        </h1>

        <p className="mt-2 text-sm text-text-secondary">
          View and track the issues you have reported on campus.
        </p>
      </div>

      {/* Search and filters */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <input
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search reports..."
          className="rounded-lg border border-border bg-surface px-4 py-3 text-sm text-text-primary outline-none focus:border-primary"
        />

        <select
          value={selectedStatus}
          onChange={(event) => setSelectedStatus(event.target.value)}
          className="rounded-lg border border-border bg-surface px-4 py-3 text-sm text-text-primary outline-none focus:border-primary"
        >
          <option value="all">All statuses</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="resolved">Resolved</option>
          <option value="rejected">Rejected</option>
        </select>

        <select
          value={selectedCategory}
          onChange={(event) => setSelectedCategory(event.target.value)}
          className="rounded-lg border border-border bg-surface px-4 py-3 text-sm text-text-primary outline-none focus:border-primary"
        >
          <option value="all">All categories</option>
          <option value="electricity">Electricity</option>
          <option value="waste">Waste Management</option>
          <option value="infrastructure">Infrastructure</option>
          <option value="water">Water Supply</option>
          <option value="safety">Safety and Security</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Loading state */}
      {isLoading && (
        <Card className="py-10 text-center">
          <p className="text-sm text-text-secondary">
            Loading your reports...
          </p>
        </Card>
      )}

      {/* Error state */}
      {!isLoading && error && (
        <Card className="py-10 text-center">
          <p className="text-sm text-red-600" role="alert">
            {error}
          </p>
        </Card>
      )}

      {/* Reports list */}
      {!isLoading && !error && (
        filteredReports.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {filteredReports.map((report) => {
              const hasSupported = report.supporters?.some(
                (supporter) =>
                  (typeof supporter === 'string'
                    ? supporter
                    : supporter._id) === user?._id
              ) || false

              const supportCount = report.supporters?.length || 0

              return (
                <Card key={report._id} className="flex flex-col gap-4">
                  {/* Report title and status */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="text-lg font-semibold text-text-primary">
                        {report.title}
                      </h2>

                      <span className="mt-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                        {report.category}
                      </span>
                    </div>

                    <Badge status={report.status} />
                  </div>

                  {/* Report description */}
                  <p className="text-sm leading-6 text-text-secondary">
                    {report.description}
                  </p>

                  {/* Location and date */}
                  <div className="flex flex-wrap gap-4 text-xs text-text-secondary">
                    <span className="flex items-center gap-2">
                      <MapPin size={15} />
                      {report.location}
                    </span>

                    <span className="flex items-center gap-2">
                      <CalendarDays size={15} />
                      {formatDate(report.createdAt)}
                    </span>
                  </div>

                  {/* Support and details */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-3">
                    <button
                      type="button"
                      onClick={() => handleSupport(report._id)}
                      disabled={supportingReportId === report._id}
                      aria-pressed={hasSupported}
                      className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
                        hasSupported
                          ? 'bg-primary text-white'
                          : 'border border-border text-text-primary hover:bg-primary/10'
                      }`}
                    >
                      <ThumbsUp size={16} />

                      {supportingReportId === report._id
                        ? 'Updating...'
                        : hasSupported
                          ? 'Supported'
                          : 'Support'}

                      <span>({supportCount})</span>
                    </button>

                    <Link
                      to={`/student/reports/${report._id}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                    >
                      View Details
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </Card>
              )
            })}
          </div>
        ) : (
          <Card className="py-10 text-center">
            <h2 className="text-lg font-semibold text-text-primary">
              No reports found
            </h2>

            <p className="mt-2 text-sm text-text-secondary">
              Try changing your search or filter selections.
            </p>
          </Card>
        )
      )}

      {supportError && (
        <p className="text-sm text-red-600" role="alert">
          {supportError}
        </p>
      )}
    </div>
  )
}

export default MyReports
