
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

function Dashboard() {
  const summaryCards = [
    {
      title: 'Total Reports',
      count: 12,
      description: 'All submitted reports',
      icon: FileText,
    },
    {
      title: 'Pending',
      count: 4,
      description: 'Awaiting review',
      icon: Clock,
    },
    {
      title: 'In Progress',
      count: 5,
      description: 'Currently being addressed',
      icon: RefreshCw,
    },
    {
      title: 'Resolved',
      count: 3,
      description: 'Successfully resolved',
      icon: CheckCircle,
    },
  ]

  // Recent Reports Sample Data
  const recentReports = [
    {
      id: 1,
      title: 'Broken Streetlight',
      category: 'Electrical',
      location: 'Main Campus, Block A',
      date: 'November 8, 2026',
      status: 'pending',
    },
    {
      id: 2,
      title: 'Overflowing Waste Bin',
      category: 'Waste Management',
      location: 'Student Cafeteria',
      date: 'November 7, 2026',
      status: 'in-progress',
    },
    {
      id: 3,
      title: 'Damaged Walkway',
      category: 'Infrastructure',
      location: 'Library Entrance',
      date: 'November 5, 2026',
      status: 'resolved',
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
          Welcome back, Student!
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
                  {item.count}
                </p>

                <p className="mt-1 text-sm text-text-secondary">
                  {item.description}
                </p>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Recent Reports Section */}
      <section>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold text-text-primary">
              Recent Reports
            </h2>

            <p className="mt-1 text-sm text-text-secondary">
              Keep track of your latest campus reports.
            </p>
          </div>

          <button
            type="button"
            className="text-sm font-semibold text-primary hover:underline"
          >
            View All
          </button>
        </div>

        <div className="space-y-4">
          {recentReports.map((report) => (
            <Card key={report.id} padding="medium">
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
                      {report.date}
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
      </section>
    </div>
  )
}

export default Dashboard
