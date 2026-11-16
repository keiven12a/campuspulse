const express = require('express')
const cors = require('cors')
require('dotenv').config()
const connectDB = require('./config/db')

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Health-check API
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'CampusPulse backend is running!',
  })
})

// Start server
const PORT = process.env.PORT || 5000

const startServer = async () => {
  await connectDB()

  app.listen(PORT, () => {
    console.log(`CampusPulse server is running on port ${PORT}`)
  })
}

startServer()