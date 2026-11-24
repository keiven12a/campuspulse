
import api from './api'

// Retrieve notifications for the logged-in student
export const getNotifications = async () => {
  const response = await api.get('/notifications')
  return response.data
}

// Retrieve the unread notification count
export const getUnreadNotificationCount = async () => {
  const response = await api.get('/notifications/unread-count')
  return response.data
}

// Mark one notification as read
export const markNotificationAsRead = async (notificationId) => {
  const response = await api.patch(
    `/notifications/${notificationId}/read`
  )
  return response.data
}

// Mark all notifications as read
export const markAllNotificationsAsRead = async () => {
  const response = await api.patch('/notifications/read-all')
  return response.data
}
