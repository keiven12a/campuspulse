
import { useEffect, useState } from 'react'
import api from '../../services/api.js'

function ApiTest() {
  const [message, setMessage] = useState('Connecting to backend...')
  const [error, setError] = useState('')

  useEffect(() => {
    async function checkBackend() {
      try {
        const response = await api.get('/health')
        setMessage(response.data.message)
      } catch (error) {
        setError('Could not connect to CampusPulse backend.')
        console.error('API connection error:', error)
      }
    }

    checkBackend()
  }, [])

  return (
    <div className="rounded-xl border border-border bg-surface p-6">
      <h2 className="text-lg font-semibold text-text-primary">
        Backend Connection Test
      </h2>

      <p className="mt-3 text-text-secondary">
        {error || message}
      </p>
    </div>
  )
}

export default ApiTest
