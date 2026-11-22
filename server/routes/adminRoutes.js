const express = require('express')
const Report = require('../models/Report')
const protect = require('../middleware/authMiddleware')
const authorize = require('../middleware/roleMiddleware')

const router = express.Router()

// Admin-only dashboard statistics and recent reports
router.get('/dashboard', protect, authorize('admin'), async (req, res) => {
  try {
    const [
      totalReports,
      pendingReports,
      resolvedReports,
      recentReports,
    ] = await Promise.all([
      Report.countDocuments(),
      Report.countDocuments({ status: 'pending' }),
      Report.countDocuments({ status: 'resolved' }),
      Report.find()
        .populate('reporter', 'name email')
        .sort({ createdAt: -1 })
        .limit(5),
    ])

    res.status(200).json({
      success: true,
      statistics: {
        totalReports,
        pendingReports,
        resolvedReports,
      },
      recentReports,
    })
  } catch (error) {
    console.error('Admin dashboard error:', error.message)

    res.status(500).json({
      success: false,
      message: 'Failed to retrieve admin dashboard data.',
    })
  }
})

module.exports = router