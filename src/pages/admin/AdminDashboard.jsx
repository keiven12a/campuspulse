
import { useEffect, useState } from 'react'
import {
  FileText,
  Clock,
  CheckCircle,
  Activity,
  XCircle,
  User,
  Eye,
  LoaderCircle,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import Card from '../../components/common/Card.jsx'
import Badge from '../../components/common/Badge.jsx'
import api from '../../services/api'

function AdminDashboard() {
  const [statistics, setStatistics] = useState({
    totalReports: 0,
    pendingReports: 0,
    inProgressReports: 0,
    resolvedReports: 0,
    rejectedReports: 0,
  })

  const [recentReports, setRecentReports] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const response = await api.get('/admin/dashboard')

        setStatistics(response.data.statistics)
        setRecentReports(response.data.recentReports || [])
      } catch (error) {
        setError(
          error.response?.data?.message ||
            'Unable to load administrator dashboard data.'
        )
      } finally {
        setIsLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  const summaryCards = [
    {
      title: 'Total Reports',
      count: statistics.totalReports,
      description: 'All submitted campus reports',
      icon: FileText,
    },
    {
      title: 'Pending Reports',
      count: statistics.pendingReports,
      description: 'Awaiting administrator review',
      icon: Clock,
    },
    {
      title: 'In Progress',
      count: statistics.inProgressReports,
      description: 'Currently being investigated',
      icon: Activity,
    },
    {
      title: 'Resolved Reports',
      count: statistics.resolvedReports,
      description: 'Successfully resolved reports',
      icon: CheckCircle,
    },
    {
      title: 'Rejected Reports',
      count: statistics.rejectedReports,
      description: 'Reports rejected after review',
      icon: XCircle,
    },
  ]

  return (
    <div className="space-y-8">
      <section>
        <p className="text-sm font-medium text-primary">
          Administration
        </p>

        <h1 className="mt-2 text-3xl font-bold text-text-primary">
          Admin Dashboard
        </h1>

        <p className="mt-2 text-text-secondary">
          Monitor campus issues and review recently submitted reports.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold text-text-primary">
          Reports Overview
        </h2>

        {error && (
          <p className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-700">
            {error}
          </p>
        )}

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">
          {summaryCards.map((item) => {
            const Icon = item.icon

            return (
              <Card key={item.title} padding="medium">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-medium text-text-secondary">
                    {item.title}
                  </p>

                  <div className="rounded-lg bg-primary/10 p-2 text-primary">
                    <Icon size={20} />
                  </div>
                </div>

               <p className="mt-3 text-2xl font-bold text-text-primary">
                  {isLoading ? '...' : item.count}
                </p>

               <p className="mt-1 text-xs text-text-secondary">
                  {item.description}
                </p>
              </Card>
            )
          })}
        </div>
      </section>

      <section>
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-text-primary">
            Recent Reports
          </h2>

          <p className="mt-1 text-sm text-text-secondary">
            The latest campus issues submitted by students.
          </p>
        </div>

        {isLoading && (
          <Card padding="medium">
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <LoaderCircle size={16} className="animate-spin" />
              Loading recent reports...
            </div>
          </Card>
        )}

        {!isLoading && !error && recentReports.length === 0 && (
          <Card padding="medium">
            <p className="text-sm text-text-secondary">
              No reports have been submitted yet.
            </p>
          </Card>
        )}

        {!isLoading && !error && recentReports.length > 0 && (
          <div className="space-y-4">
            {recentReports.map((report) => (
              <Card key={report._id} padding="medium">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div className="min-w-0">
                    <h3 className="font-semibold text-text-primary">
                      {report.title}
                    </h3>

                    <p className="mt-1 text-sm capitalize text-text-secondary">
                      {report.category}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-text-secondary">
                      <span className="flex items-center gap-1">
                        <User size={14} />
                        {report.reporter?.name || 'Unknown reporter'}
                      </span>

                      <span>
                        {new Date(report.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-3">
                    <Badge status={report.status} />

                    <Link
                      to={`/admin/reports/${report._id}`}
                      className="inline-flex items-center gap-2 rounded-lg border border-primary px-3 py-2 text-sm font-medium text-primary transition hover:bg-primary hover:text-white"
                    >
                      <Eye size={16} />
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

export default AdminDashboard
