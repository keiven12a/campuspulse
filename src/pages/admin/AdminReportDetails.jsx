
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  MapPin,
  CalendarDays,
  User,
  History,
} from 'lucide-react'

import Card from '../../components/common/Card.jsx'
import Badge from '../../components/common/Badge.jsx'
import {
  getAdminReportById,
  updateReportStatus,
} from '../../services/reportService'

function AdminReportDetails() {
  const { id } = useParams()

 const [report, setReport] = useState(null)
const [isLoading, setIsLoading] = useState(true)
const [error, setError] = useState('')

// Status update form state
const [newStatus, setNewStatus] = useState('pending')
const [adminNote, setAdminNote] = useState('')
const [isUpdating, setIsUpdating] = useState(false)
const [updateError, setUpdateError] = useState('')
const [updateSuccess, setUpdateSuccess] = useState('')

  useEffect(() => {
    async function fetchReport() {
      try {
        setIsLoading(true)
        setError('')

        const response = await getAdminReportById(id)
        setReport(response.report)
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
    // Update report status and save administrator note
  const handleStatusUpdate = async (event) => {
    event.preventDefault()

    try {
      setIsUpdating(true)
      setUpdateError('')
      setUpdateSuccess('')

      const response = await updateReportStatus(
        id,
        newStatus,
        adminNote
      )

      setReport(response.report)
      setAdminNote('')
      setUpdateSuccess('Report status updated successfully.')
    } catch (error) {
      setUpdateError(
        error.response?.data?.message ||
        'Failed to update report status.'
      )
    } finally {
      setIsUpdating(false)
    }
  }

  if (isLoading) {
    return (
      <Card padding="medium">
        <p className="text-sm text-text-secondary">
          Loading report details...
        </p>
      </Card>
    )
  }

  if (error) {
    return (
      <Card padding="medium">
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>

        <Link
          to="/admin/reports"
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
        >
          <ArrowLeft size={16} />
          Back to Manage Reports
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
        to="/admin/reports"
        className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
      >
        <ArrowLeft size={16} />
        Back to Manage Reports
      </Link>

      <section>
        <p className="text-sm font-medium text-primary">
          Administration
        </p>

        <h1 className="mt-2 text-3xl font-bold text-text-primary">
          Report Details
        </h1>

        <p className="mt-2 text-text-secondary">
          Inspect the submitted campus issue and its progress.
        </p>
      </section>

      <Card className="space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-text-primary">
              {report.title}
            </h2>

            <span className="mt-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium capitalize text-primary">
              {report.category}
            </span>
          </div>

          <Badge status={report.status} />
        </div>
<div className="rounded-xl border border-border bg-surface p-5">
  <h3 className="text-lg font-semibold text-text-primary">
    Update Report Status
  </h3>

  <form onSubmit={handleStatusUpdate} className="mt-4 space-y-4">
    <div>
      <label
        htmlFor="report-status"
        className="mb-2 block text-sm font-medium text-text-primary"
      >
        New status
      </label>

      <select
        id="report-status"
        value={newStatus}
        onChange={(event) => setNewStatus(event.target.value)}
        className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm text-text-primary outline-none focus:border-primary"
      >
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="resolved">Resolved</option>
        <option value="rejected">Rejected</option>
      </select>
    </div>

    <div>
      <label
        htmlFor="admin-note"
        className="mb-2 block text-sm font-medium text-text-primary"
      >
        Administrator note
      </label>

      <textarea
        id="admin-note"
        value={adminNote}
        onChange={(event) => setAdminNote(event.target.value)}
        placeholder="Explain the status update..."
        rows={3}
        className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm text-text-primary outline-none focus:border-primary"
      />
    </div>

    {updateError && (
      <p className="text-sm text-red-600" role="alert">
        {updateError}
      </p>
    )}

    {updateSuccess && (
      <p className="text-sm text-green-600" role="status">
        {updateSuccess}
      </p>
    )}

    <button
      type="submit"
      disabled={isUpdating}
      className="rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isUpdating ? 'Saving...' : 'Save Status Update'}
    </button>
  </form>
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
              alt="Submitted campus issue"
              className="max-h-96 w-full rounded-lg border border-border object-cover"
            />
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 border-t border-border pt-5 sm:grid-cols-2">
          <div className="flex items-start gap-3">
            <User size={18} className="mt-1 text-primary" />

            <div>
              <p className="text-xs text-text-secondary">Reported by</p>
              <p className="mt-1 text-sm font-medium text-text-primary">
                {report.reporter?.name || 'Unknown reporter'}
              </p>
              <p className="text-xs text-text-secondary">
                {report.reporter?.email || ''}
              </p>
            </div>
          </div>

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
                {new Date(report.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-5">
          <div className="mb-4 flex items-center gap-2">
            <History size={18} className="text-primary" />

            <h3 className="text-sm font-semibold text-text-primary">
              Status Timeline
            </h3>
          </div>

          {report.statusHistory?.length > 0 ? (
            <div className="space-y-4">
              {report.statusHistory.map((entry, index) => (
                <div
                  key={entry._id || index}
                  className="flex gap-3"
                >
                  <div className="flex flex-col items-center">
                    <div className="h-3 w-3 rounded-full bg-primary" />

                    {index !== report.statusHistory.length - 1 && (
                      <div className="mt-1 min-h-8 w-px bg-border" />
                    )}
                  </div>

                  <div className="flex-1 pb-2">
                    <p className="text-sm font-semibold capitalize text-text-primary">
                      {entry.status.replace('-', ' ')}
                    </p>

                    {entry.note && (
                      <p className="mt-1 text-sm text-text-secondary">
                        {entry.note}
                      </p>
                    )}

                    <p className="mt-1 text-xs text-text-secondary">
                      {new Date(entry.changedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-text-secondary">
              No status history recorded yet.
            </p>
          )}
        </div>
      </Card>
    </div>
  )
}

export default AdminReportDetails
