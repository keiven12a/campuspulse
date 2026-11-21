
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  MapPin,
  CalendarDays,
  ThumbsUp,
} from 'lucide-react'

import Card from '../../components/common/Card.jsx'
import Badge from '../../components/common/Badge.jsx'
import api from '../../services/api'
import { toggleReportSupport } from '../../services/reportService'
import { useAuth } from '../../context/useAuth'

function ReportDetails() {
  const { id } = useParams()
  const { user } = useAuth()

  const [report, setReport] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [isSupporting, setIsSupporting] = useState(false)
  const [supportError, setSupportError] = useState('')

  // Fetch the selected report from MongoDB
  useEffect(() => {
    async function fetchReport() {
      try {
        setIsLoading(true)
        setError('')

        const response = await api.get(`/reports/${id}`)
        setReport(response.data.report)
      } catch (error) {
        setError(
          error.response?.data?.message ||
          'Failed to load report details.'
        )
      } finally {
        setIsLoading(false)
      }
    }

    fetchReport()
  }, [id])

  // Check whether the logged-in student supports this report
  const hasSupported = report?.supporters?.some(
    (supporter) =>
      (typeof supporter === 'string' ? supporter : supporter._id) === user?._id
  ) || false

  const supportCount = report?.supporters?.length || 0

  async function handleSupport() {
    try {
      setIsSupporting(true)
      setSupportError('')

      const response = await toggleReportSupport(id)
      setReport(response.report)
    } catch (error) {
      setSupportError(
        error.response?.data?.message ||
        'Failed to update report support.'
      )
    } finally {
      setIsSupporting(false)
    }
  }

  function formatDate(date) {
    return new Date(date).toLocaleDateString()
  }

  if (isLoading) {
    return (
      <Card className="py-10 text-center">
        <p className="text-sm text-text-secondary">
          Loading report details...
        </p>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="py-10 text-center">
        <h1 className="text-xl font-bold text-text-primary">
          Unable to load report
        </h1>

        <p className="mt-2 text-sm text-red-600" role="alert">
          {error}
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

  if (!report) {
    return null
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

        {report.image && (
          <div>
            <h3 className="mb-2 text-sm font-semibold text-text-primary">
              Attached Image
            </h3>

            <img
              src={report.image}
              alt="Campus issue"
              className="max-h-96 w-full rounded-lg border border-border object-cover"
            />
          </div>
        )}

        <div className="flex flex-col gap-3 border-t border-border pt-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-text-primary">
                Support this report
              </p>

              <p className="mt-1 text-xs text-text-secondary">
                {supportCount} {supportCount === 1 ? 'person' : 'people'} supporting
              </p>
            </div>

            <button
              type="button"
              onClick={handleSupport}
              disabled={isSupporting}
              aria-pressed={hasSupported}
              className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
                hasSupported
                  ? 'bg-primary text-white'
                  : 'border border-border text-text-primary hover:bg-primary/10'
              }`}
            >
              <ThumbsUp size={16} />
              {isSupporting
                ? 'Updating...'
                : hasSupported
                  ? 'Supported'
                  : 'Support'}
            </button>
          </div>

          {supportError && (
            <p className="text-sm text-red-600" role="alert">
              {supportError}
            </p>
          )}
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
                {formatDate(report.createdAt)}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default ReportDetails
