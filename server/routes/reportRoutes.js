
const express = require('express')
const mongoose = require('mongoose')
const Report = require('../models/Report')
const User = require('../models/User')
const Notification = require('../models/Notification')
const protect = require('../middleware/authMiddleware')

const router = express.Router()

// Normalize text before comparing report descriptions and titles
function normalizeText(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter((word) => word.length > 2)
}

// Calculate how similar two pieces of text are
function calculateSimilarity(firstText, secondText) {
  const firstWords = new Set(normalizeText(firstText))
  const secondWords = new Set(normalizeText(secondText))

  if (firstWords.size === 0 || secondWords.size === 0) {
    return 0
  }

  const commonWords = [...firstWords].filter((word) =>
    secondWords.has(word)
  )

  const totalWords = new Set([...firstWords, ...secondWords])

  return commonWords.length / totalWords.size
}

// Create a new report

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
      confirmDuplicate = false,
    } = req.body

    // Check for similar unresolved reports unless the student confirms submission
    if (!confirmDuplicate) {
      const existingReports = await Report.find({
        category,
        location,
        status: { $in: ['pending', 'in-progress'] },
      })
        .select('title description category location status createdAt')
        .sort({ createdAt: -1 })
        .limit(20)

      const possibleDuplicates = existingReports
        .map((existingReport) => {
          const titleSimilarity = calculateSimilarity(
            title || '',
            existingReport.title
          )

          const descriptionSimilarity = calculateSimilarity(
            description || '',
            existingReport.description
          )

          const similarity =
            titleSimilarity * 0.4 + descriptionSimilarity * 0.6

          return {
            report: existingReport,
            similarity,
          }
        })
        .filter((item) => item.similarity >= 0.3)
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, 3)

      if (possibleDuplicates.length > 0) {
        return res.status(409).json({
          success: false,
          possibleDuplicate: true,
          message:
            'Similar unresolved reports already exist at this location. Please review them before submitting.',
          duplicates: possibleDuplicates.map(({ report, similarity }) => ({
            _id: report._id,
            title: report.title,
            description: report.description,
            category: report.category,
            location: report.location,
            status: report.status,
            createdAt: report.createdAt,
            similarityScore: Math.round(similarity * 100),
          })),
        })
      }
    }

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

    // Find all administrators
    const admins = await User.find({ role: 'admin' }).select('_id')

    // Create a notification for each administrator
    if (admins.length > 0) {
      await Notification.insertMany(
        admins.map((admin) => ({
          recipient: admin._id,
          report: report._id,
          type: 'new-report',
          title: 'New Report Submitted',
          message: `A new report "${report.title}" has been submitted.`,
        }))
      )
    }

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
