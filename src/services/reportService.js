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