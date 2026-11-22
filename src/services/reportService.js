
import api from './api'

// Submit a new campus issue report
export const createReport = async (reportData) => {
  const response = await api.post('/reports', reportData)

  return response.data
}

// Retrieve reports submitted by the logged-in student
export const getMyReports = async () => {
  const response = await api.get('/reports/my')

  return response.data
}

// Toggle support for a report
export const toggleReportSupport = async (reportId) => {
  const response = await api.patch(`/reports/${reportId}/support`)

  return response.data
}
// Retrieve all reports for administrator management
export const getAllReports = async () => {
  const response = await api.get('/admin/reports')

  return response.data
}

// Retrieve a single report for administrator inspection
export const getAdminReportById = async (reportId) => {
  const response = await api.get(`/admin/reports/${reportId}`)

  return response.data
}

// Update report status and add an administrator note
export const updateReportStatus = async (reportId, status, note = '') => {
  const response = await api.patch(`/admin/reports/${reportId}/status`, {
    status,
    note,
  })

  return response.data
}