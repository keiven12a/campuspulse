const dns = require('node:dns')

dns.setServers(['1.1.1.1'])
const express = require('express')
const cors = require('cors')
require('dotenv').config()

const connectDB = require('./config/db')
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const adminRoutes = require('./routes/adminRoutes')
const reportRoutes = require('./routes/reportRoutes')
const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Authentication routes
app.use('/api/auth', authRoutes)

// User routes
app.use('/api/users', userRoutes)

// Admin routes
app.use('/api/admin', adminRoutes)
// Report routes
app.use('/api/reports', reportRoutes)
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