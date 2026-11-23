
const express = require('express')
const Report = require('../models/Report')
const protect = require('../middleware/authMiddleware')
const authorize = require('../middleware/roleMiddleware')
const Notification = require('../models/Notification')
const router = express.Router()
const mongoose = require('mongoose')

// Admin-only dashboard statistics and recent reports
router.get('/dashboard', protect, authorize('admin'), async (req, res) => {
  try {
    const [
      totalReports,
      pendingReports,
      inProgressReports,
      resolvedReports,
      rejectedReports,
      recentReports,
    ] = await Promise.all([
      Report.countDocuments(),
      Report.countDocuments({ status: 'pending' }),
      Report.countDocuments({ status: 'in-progress' }),
      Report.countDocuments({ status: 'resolved' }),
      Report.countDocuments({ status: 'rejected' }),
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
        inProgressReports,
        resolvedReports,
        rejectedReports,
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
// Get all reports for administrator management
router.get('/reports', protect, authorize('admin'), async (req, res) => {
  try {
    const reports = await Report.find()
      .populate('reporter', 'name email')
      .sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      count: reports.length,
      reports,
    })
  } catch (error) {
    console.error('Admin reports retrieval error:', error.message)

    res.status(500).json({
      success: false,
      message: 'Failed to retrieve reports.',
    })
  }
})
// Get a single report for administrator inspection
router.get('/reports/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid report ID.',
      })
    }

    const report = await Report.findById(id)
      .populate('reporter', 'name email')
      .populate('supporters', 'name')

    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found.',
      })
    }

    res.status(200).json({
      success: true,
      report,
    })
  } catch (error) {
    console.error('Admin report details error:', error.message)

    res.status(500).json({
      success: false,
      message: 'Failed to retrieve report details.',
    })
  }
})

 // Update report status and record administrator notes

router.patch(
  '/reports/:id/status',
  protect,
  authorize('admin'),
  async (req, res) => {
    try {
      const { id } = req.params
      const { status, note } = req.body

      if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid report ID.',
        })
      }

      const allowedTransitions = {
        pending: ['in-progress', 'rejected'],
        'in-progress': ['resolved', 'rejected'],
        resolved: ['in-progress'],
        rejected: ['pending'],
      }

      if (!Object.keys(allowedTransitions).includes(status)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid report status.',
        })
      }

      const report = await Report.findById(id)

      if (!report) {
        return res.status(404).json({
          success: false,
          message: 'Report not found.',
        })
      }

      const currentStatus = report.status

      if (!allowedTransitions[currentStatus]?.includes(status)) {
        return res.status(400).json({
          success: false,
          message: `Cannot change report status from ${currentStatus} to ${status}.`,
        })
      }

      report.status = status

report.statusHistory.push({
  status,
  changedBy: req.user._id,
  note: typeof note === 'string' ? note.trim() : '',
  changedAt: new Date(),
})

await report.save()

await Notification.create({
  recipient: report.reporter,
  report: report._id,
  type: 'status-update',
  title: 'Report Status Updated',
  message: `Your report "${report.title}" has been updated to ${status}.`,
})

      res.status(200).json({
        success: true,
        message: 'Report status updated successfully.',
        report,
      })
    } catch (error) {
      console.error('Admin report status update error:', error.message)

      res.status(500).json({
        success: false,
        message: 'Failed to update report status.',
      })
    }
  }
)

module.exports = router
