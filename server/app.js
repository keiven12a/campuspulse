
const express = require('express')
const cors = require('cors')

const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const adminRoutes = require('./routes/adminRoutes')
const reportRoutes = require('./routes/reportRoutes')
const notificationRoutes = require('./routes/notificationRoutes')

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// API routes
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/reports', reportRoutes)
app.use('/api/notifications', notificationRoutes)

// Health-check API
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'CampusPulse backend is running!',
  })
})

module.exports = app
