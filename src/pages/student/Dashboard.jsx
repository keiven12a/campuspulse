
import { useEffect, useState } from 'react'
import {
  FileText,
  Clock,
  RefreshCw,
  CheckCircle,
  MapPin,
  CalendarDays,
} from 'lucide-react'
import Card from '../../components/common/Card.jsx'
import Badge from '../../components/common/Badge.jsx'
import CampusMap from '../../components/maps/CampusMap.jsx'
import { getMyReports } from '../../services/reportService'
import { useAuth } from '../../context/useAuth'

function Dashboard() {
 const { user } = useAuth() 
  const [reports, setReports] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchReports() {
      try {
        const response = await getMyReports()
        setReports(response.reports || [])
      } catch (error) {
        setError(
          error.response?.data?.message ||
          'Unable to load your reports.'
        )
      } finally {
        setIsLoading(false)
      }
    }

    fetchReports()
  }, [])

  const summaryCards = [
    {
      title: 'Total Reports',
      count: reports.length,
      description: 'All submitted reports',
      icon: FileText,
    },
    {
      title: 'Pending',
      count: reports.filter((report) => report.status === 'pending').length,
      description: 'Awaiting review',
      icon: Clock,
    },
    {
      title: 'In Progress',
      count: reports.filter((report) => report.status === 'in-progress').length,
      description: 'Currently being addressed',
      icon: RefreshCw,
    },
    {
      title: 'Resolved',
      count: reports.filter((report) => report.status === 'resolved').length,
      description: 'Successfully resolved',
      icon: CheckCircle,
    },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <section>
        <p className="text-sm font-medium text-primary">
          Student Portal
        </p>

        <h1 className="mt-2 text-3xl font-bold text-text-primary">
          Welcome back, {user?.name?.trim().split(/\s+/)[0] || 'Student'}!
        </h1>

        <p className="mt-2 text-text-secondary">
          Here's an overview of what's happening with your campus reports.
        </p>
      </section>

      {/* Summary Cards */}
      <section>
        <h2 className="mb-4 text-xl font-semibold text-text-primary">
          Reports Overview
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {summaryCards.map((item) => {
            const Icon = item.icon

            return (
              <Card key={item.title} padding="medium">
                <div className="flex items-center justify-between">
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

      {/* Campus Map Section */}
      <section>
        <h2 className="mb-2 text-xl font-semibold text-text-primary">
          Campus Map
        </h2>

        <p className="mb-4 text-sm text-text-secondary">
          View the geographical locations of your submitted campus reports.
        </p>

        <Card padding="medium">
          <CampusMap reports={reports} />
        </Card>
      </section>

      {/* Recent Reports Section */}
      <section>
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-text-primary">
            Recent Reports
          </h2>

          <p className="mt-1 text-sm text-text-secondary">
            Keep track of your latest campus reports.
          </p>
        </div>

        {isLoading && (
          <p className="text-sm text-text-secondary">
            Loading your reports...
          </p>
        )}

        {error && (
          <p className="rounded-lg bg-red-50 p-4 text-sm text-red-700">
            {error}
          </p>
        )}

        {!isLoading && !error && reports.length === 0 && (
          <Card padding="medium">
            <p className="text-sm text-text-secondary">
              You haven't submitted any reports yet.
            </p>
          </Card>
        )}

        {!isLoading && !error && (
          <div className="space-y-4">
            {reports.slice(0, 3).map((report) => (
              <Card key={report._id} padding="medium">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div className="min-w-0">
                    <h3 className="font-semibold text-text-primary">
                      {report.title}
                    </h3>

                    <p className="mt-1 text-sm text-text-secondary">
                      {report.category}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-text-secondary">
                      <span className="flex items-center gap-1">
                        <MapPin size={14} />
                        {report.location}
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

export default Dashboard
