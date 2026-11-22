
import { useEffect, useState } from 'react'
import {
  FileText,
  Clock,
  CheckCircle,
  Activity,
  CalendarDays,
  User,
} from 'lucide-react'
import Card from '../../components/common/Card.jsx'
import Badge from '../../components/common/Badge.jsx'
import api from '../../services/api'

function AdminDashboard() {
  const [statistics, setStatistics] = useState({
    totalReports: 0,
    pendingReports: 0,
    resolvedReports: 0,
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
      title: 'Resolved Reports',
      count: statistics.resolvedReports,
      description: 'Successfully resolved reports',
      icon: CheckCircle,
    },
    {
      title: 'Recent Reports',
      count: recentReports.length,
      description: 'Latest five submissions',
      icon: Activity,
    },
  ]

  return (
    <div className="space-y-8">
      {/* Dashboard heading */}
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

      {/* Dashboard statistics */}
      <section>
        <h2 className="mb-4 text-xl font-semibold text-text-primary">
          Reports Overview
        </h2>

        {error && (
          <p className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-700">
            {error}
          </p>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {summaryCards.map((item) => {
            const Icon = item.icon

            return (
              <Card key={item.title} padding="medium">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium text-text-secondary">
                    {item.title}
                  </p>

                  <div className="rounded-lg bg-primary/10 p-2 text-primary">
                    <Icon size={20} />
                  </div>
                </div>

                <p className="mt-4 text-3xl font-bold text-text-primary">
                  {isLoading ? '...' : item.count}
                </p>

                <p className="mt-1 text-sm text-text-secondary">
                  {item.description}
                </p>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Recent reports */}
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
            <p className="text-sm text-text-secondary">
              Loading recent reports...
            </p>
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

                      <span className="flex items-center gap-1">
                        <CalendarDays size={14} />
                        {new Date(report.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="shrink-0">
                    <Badge status={report.status} />
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
