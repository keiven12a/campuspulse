
const express = require('express')
const mongoose = require('mongoose')
const Notification = require('../models/Notification')
const protect = require('../middleware/authMiddleware')

const router = express.Router()

// Get notifications belonging to the logged-in student
router.get('/', protect, async (req, res) => {
  try {
    const notifications = await Notification.find({
      recipient: req.user._id,
    })
      .populate('report', 'title status')
      .sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      count: notifications.length,
      notifications,
    })
  } catch (error) {
    console.error('Notification retrieval error:', error.message)

    res.status(500).json({
      success: false,
      message: 'Failed to retrieve notifications.',
    })
  }
})

// Get unread notification count
router.get('/unread-count', protect, async (req, res) => {
  try {
    const unreadCount = await Notification.countDocuments({
      recipient: req.user._id,
      isRead: false,
    })

    res.status(200).json({
      success: true,
      unreadCount,
    })
  } catch (error) {
    console.error('Unread notification count error:', error.message)

    res.status(500).json({
      success: false,
      message: 'Failed to retrieve unread notification count.',
    })
  }
})

// Mark one notification as read
router.patch('/:id/read', protect, async (req, res) => {
  try {
    const { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid notification ID.',
      })
    }

    const notification = await Notification.findOne({
      _id: id,
      recipient: req.user._id,
    })

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found.',
      })
    }

    notification.isRead = true
    await notification.save()

    res.status(200).json({
      success: true,
      message: 'Notification marked as read.',
      notification,
    })
  } catch (error) {
    console.error('Mark notification as read error:', error.message)

    res.status(500).json({
      success: false,
      message: 'Failed to update notification.',
    })
  }
})

// Mark all notifications as read for the logged-in student
router.patch('/read-all', protect, async (req, res) => {
  try {
    const result = await Notification.updateMany(
      {
        recipient: req.user._id,
        isRead: false,
      },
      {
        $set: { isRead: true },
      }
    )

    res.status(200).json({
      success: true,
      message: 'All notifications marked as read.',
      modifiedCount: result.modifiedCount,
    })
  } catch (error) {
    console.error('Mark all notifications as read error:', error.message)

    res.status(500).json({
      success: false,
      message: 'Failed to update notifications.',
    })
  }
})

module.exports = router
