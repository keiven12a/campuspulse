
import api from './api'

// Register a new student
export const registerUser = async (userData) => {
  const response = await api.post('/auth/register', userData)

  return response.data
}

// Log in an existing student
export const loginUser = async (credentials) => {
  const response = await api.post('/auth/login', credentials)

  return response.data
}
