
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
