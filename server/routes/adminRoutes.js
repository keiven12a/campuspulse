const express = require('express')
const protect = require('../middleware/authMiddleware')
const authorize = require('../middleware/roleMiddleware')

const router = express.Router()

// Admin-only dashboard
router.get('/dashboard', protect, authorize('admin'), (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to the CampusPulse admin dashboard!',
  })
})

module.exports = router