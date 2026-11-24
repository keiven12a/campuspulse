
import { useEffect, useState } from 'react'
import { Bell, CheckCheck, Clock, FileText } from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from '../../services/notificationService'
import { useAuth } from '../../context/useAuth'

function Notifications() {
  const [notifications, setNotifications] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [isMarkingAll, setIsMarkingAll] = useState(false)
const { user } = useAuth()
const isAdmin = user?.role === 'admin'

const reportPath = (reportId) =>
  isAdmin
    ? `/admin/reports/${reportId}`
    : `/student/reports/${reportId}`
  useEffect(() => {
    const loadNotifications = async () => {
      try {
        setIsLoading(true)
        setError('')

        const data = await getNotifications()
        setNotifications(data.notifications || [])
      } catch (err) {
        setError(
          err.response?.data?.message ||
            'Failed to load notifications. Please try again.'
        )
      } finally {
        setIsLoading(false)
      }
    }

    loadNotifications()
  }, [])

  const unreadCount = notifications.filter(
    (notification) => !notification.isRead
  ).length

  const handleMarkAsRead = async (notificationId) => {
    try {
      await markNotificationAsRead(notificationId)

      setNotifications((currentNotifications) =>
        currentNotifications.map((notification) =>
          notification._id === notificationId
            ? { ...notification, isRead: true }
            : notification
        )
      )
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Could not mark notification as read.'
      )
    }
  }

  const handleMarkAllAsRead = async () => {
    try {
      setIsMarkingAll(true)
      await markAllNotificationsAsRead()

      setNotifications((currentNotifications) =>
        currentNotifications.map((notification) => ({
          ...notification,
          isRead: true,
        }))
      )
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Could not mark all notifications as read.'
      )
    } finally {
      setIsMarkingAll(false)
    }
  }

  const formatDate = (date) =>
    new Date(date).toLocaleString()

  return (
    <section>
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
  <p className="text-sm font-medium text-primary">
    {isAdmin ? 'Administration' : 'Student Portal'}
  </p>

  <h1 className="mt-2 text-3xl font-bold text-text-primary">
    Notifications
  </h1>

          <p className="mt-2 text-text-secondary">
            Stay updated on changes to your campus reports.
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            type="button"
            onClick={handleMarkAllAsRead}
            disabled={isMarkingAll}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-semibold text-text-primary transition-colors hover:bg-background disabled:cursor-not-allowed disabled:opacity-60"
          >
            <CheckCheck size={17} />
            {isMarkingAll ? 'Updating...' : 'Mark all as read'}
          </button>
        )}
      </div>

      {error && (
        <div
          role="alert"
          className="mb-5 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="rounded-xl border border-border bg-surface p-10 text-center text-text-secondary">
          Loading notifications...
        </div>
      ) : notifications.length === 0 ? (
        <div className="rounded-xl border border-border bg-surface px-6 py-14 text-center">
          <Bell className="mx-auto text-text-secondary" size={36} />

          <h2 className="mt-4 text-lg font-semibold text-text-primary">
            No notifications yet
          </h2>

          <p className="mt-2 text-sm text-text-secondary">
            Updates about your reports will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-text-secondary">
            {unreadCount} unread notification{unreadCount === 1 ? '' : 's'}
          </p>

          {notifications.map((notification) => (
            <article
              key={notification._id}
              className={`rounded-xl border bg-surface p-5 shadow-sm ${
                notification.isRead
                  ? 'border-border'
                  : 'border-primary/40 bg-primary/5'
              }`}
            >
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <FileText size={20} />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h2 className="font-semibold text-text-primary">
                      {notification.title}
                    </h2>

                    {!notification.isRead && (
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                        New
                      </span>
                    )}
                  </div>

                  <p className="mt-2 text-sm leading-6 text-text-secondary">
                    {notification.message}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-text-secondary">
                    <span className="inline-flex items-center gap-1">
                      <Clock size={14} />
                      {formatDate(notification.createdAt)}
                    </span>

                    {notification.report && (
                      <Link
                       to={reportPath(notification.report._id)}
                        onClick={() => {
                          if (!notification.isRead) {
                            handleMarkAsRead(notification._id)
                          }
                        }}
                        className="font-semibold text-primary hover:underline"
                      >
                        View report
                      </Link>
                    )}

                    {!notification.isRead && (
                      <button
                        type="button"
                        onClick={() => handleMarkAsRead(notification._id)}
                        className="font-semibold text-primary hover:underline"
                      >
                        Mark as read
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Notifications
