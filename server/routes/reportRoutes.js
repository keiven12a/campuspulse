
const express = require('express')
const mongoose = require('mongoose')
const Report = require('../models/Report')
const protect = require('../middleware/authMiddleware')

const router = express.Router()

// Create a new report
router.post('/', protect, async (req, res) => {
  try {
    const {
  title,
  description,
  category,
  location,
  coordinates,
  image,
} = req.body

    // Create report using the authenticated user
   const report = await Report.create({
  title,
  description,
  category,
  location,
  coordinates,
  image,
  reporter: req.user._id,
  status: 'pending',
  statusHistory: [
    {
      status: 'pending',
      changedBy: req.user._id,
      note: 'Report submitted',
    },
  ],
})
    res.status(201).json({
      success: true,
      message: 'Report submitted successfully!',
      report,
    })
  } catch (error) {
    console.error('Report creation error:', error.message)

    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: error.message,
      })
    }

    res.status(500).json({
      success: false,
      message: 'Failed to submit report.',
    })
  }
})
// Get reports submitted by the authenticated user
router.get('/my', protect, async (req, res) => {
  try {
    const reports = await Report.find({
      reporter: req.user._id,
    }).sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      count: reports.length,
      reports,
    })
  } catch (error) {
    console.error('My reports retrieval error:', error.message)

    res.status(500).json({
      success: false,
      message: 'Failed to retrieve your reports.',
    })
  }
})
// Get all reports
router.get('/', protect, async (req, res) => {
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
    console.error('Report retrieval error:', error.message)

    res.status(500).json({
      success: false,
      message: 'Failed to retrieve reports.',
    })
  }
})

// Toggle support for a report
router.patch('/:id/support', protect, async (req, res) => {
  try {
    const { id } = req.params
    const userId = req.user._id

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid report ID.',
      })
    }

    const report = await Report.findById(id)

    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found.',
      })
    }

    const alreadySupported = report.supporters.some(
      (supporterId) => supporterId.toString() === userId.toString()
    )

    const updatedReport = await Report.findOneAndUpdate(
      {
        _id: id,
        supporters: alreadySupported ? userId : { $ne: userId },
      },
      alreadySupported
        ? { $pull: { supporters: userId } }
        : { $addToSet: { supporters: userId } },
      { new: true }
    )

    if (!updatedReport) {
      return res.status(409).json({
        success: false,
        message: 'Your support status changed. Please try again.',
      })
    }

    res.status(200).json({
      success: true,
      message: alreadySupported
        ? 'Support removed successfully.'
        : 'Report supported successfully.',
      supportCount: updatedReport.supporters.length,
      report: updatedReport,
    })
  } catch (error) {
    console.error('Report support error:', error.message)

    res.status(500).json({
      success: false,
      message: 'Failed to update report support.',
    })
  }
})
// Get a single report by ID
router.get('/:id', protect, async (req, res) => {
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

    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found.',
      })
    }
   // Allow students to view only their own reports
if (
  req.user.role !== 'admin' &&
  report.reporter._id.toString() !== req.user._id.toString()
) {
  return res.status(403).json({
    success: false,
    message: 'You are not authorized to view this report.',
  })
}   

    res.status(200).json({
      success: true,
      report,
    })
  } catch (error) {
    console.error('Single report retrieval error:', error.message)

    res.status(500).json({
      success: false,
      message: 'Failed to retrieve report.',
    })
  }
})

module.exports = router
