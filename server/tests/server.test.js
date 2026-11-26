
const request = require('supertest')
const { describe, it } = require('node:test')
const assert = require('node:assert/strict')
require('dotenv').config()

const jwt = require('jsonwebtoken')
const User = require('../models/User')

const Report = require('../models/Report')
const Notification = require('../models/Notification')
const app = require('../app')

describe('CampusPulse Backend API', () => {
  it('GET /api/health should return a successful health-check response', async () => {
    const response = await request(app).get('/api/health')

    assert.equal(response.status, 200)
    assert.equal(response.body.success, true)
    assert.equal(
      response.body.message,
      'CampusPulse backend is running!',
    )
  })

  it('POST /api/auth/register should reject missing required fields', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        name: '',
        email: '',
        password: '',
      })

    assert.equal(response.status, 400)
    assert.equal(response.body.success, false)
    assert.equal(
      response.body.message,
      'Please provide name, email, and password.',
    )
  })

  it('POST /api/auth/login should reject missing required fields', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: '',
        password: '',
      })

    assert.equal(response.status, 400)
    assert.equal(response.body.success, false)
    assert.equal(
      response.body.message,
      'Please provide email and password.',
    )
  })

  it('GET /api/reports should reject requests without authentication', async () => {
    const response = await request(app).get('/api/reports')

    assert.equal(response.status, 401)
    assert.equal(response.body.success, false)
  })

  it('GET /api/reports/my should reject requests without authentication', async () => {
    const response = await request(app).get('/api/reports/my')

    assert.equal(response.status, 401)
    assert.equal(response.body.success, false)
  })
  
  it('GET /api/reports should reject an invalid authentication token', async () => {
    const response = await request(app)
      .get('/api/reports')
      .set('Authorization', 'Bearer invalid-token')

    assert.equal(response.status, 401)
    assert.equal(response.body.success, false)
    assert.equal(
      response.body.message,
      'Not authorized. Invalid or expired token.',
    )
  })
  it('GET /api/reports/:id should reject an invalid report ID', async () => {
  const originalFindById = User.findById

  User.findById = () => ({
    select: async () => ({
      _id: '507f1f77bcf86cd799439011',
      name: 'Test Student',
      email: 'student@example.com',
      role: 'student',
    }),
  })

  try {
    const token = jwt.sign(
      { userId: '507f1f77bcf86cd799439011' },
      process.env.JWT_SECRET,
    )

    const response = await request(app)
      .get('/api/reports/invalid-id')
      .set('Authorization', `Bearer ${token}`)

    assert.equal(response.status, 400)
    assert.equal(response.body.success, false)
    assert.equal(response.body.message, 'Invalid report ID.')
  } finally {
    User.findById = originalFindById
  }
})

it('GET /api/reports/:id should prevent students from viewing another student’s report', async () => {
  const originalUserFindById = User.findById
  const originalReportFindById = Report.findById

  const studentId = '507f1f77bcf86cd799439011'
  const anotherStudentId = '507f1f77bcf86cd799439012'
  const reportId = '507f1f77bcf86cd799439013'

  User.findById = () => ({
    select: async () => ({
      _id: studentId,
      name: 'Test Student',
      email: 'student@example.com',
      role: 'student',
    }),
  })

  Report.findById = () => ({
    populate: async () => ({
      _id: reportId,
      title: 'Another student report',
      reporter: {
        _id: anotherStudentId,
      },
    }),
  })

  try {
    const token = jwt.sign(
      { userId: studentId },
      process.env.JWT_SECRET,
    )

    const response = await request(app)
      .get(`/api/reports/${reportId}`)
      .set('Authorization', `Bearer ${token}`)

    assert.equal(response.status, 403)
    assert.equal(response.body.success, false)
    assert.equal(
      response.body.message,
      'You are not authorized to view this report.',
    )
  } finally {
    User.findById = originalUserFindById
    Report.findById = originalReportFindById
  }
})

it('GET /api/reports/:id should allow admins to view another student’s report', async () => {
  const originalUserFindById = User.findById
  const originalReportFindById = Report.findById

  const adminId = '507f1f77bcf86cd799439014'
  const anotherStudentId = '507f1f77bcf86cd799439012'
  const reportId = '507f1f77bcf86cd799439013'

  User.findById = () => ({
    select: async () => ({
      _id: adminId,
      name: 'Test Admin',
      email: 'admin@example.com',
      role: 'admin',
    }),
  })

  Report.findById = () => ({
    populate: async () => ({
      _id: reportId,
      title: 'Another student report',
      reporter: {
        _id: anotherStudentId,
      },
    }),
  })

  try {
    const token = jwt.sign(
      { userId: adminId },
      process.env.JWT_SECRET,
    )

    const response = await request(app)
      .get(`/api/reports/${reportId}`)
      .set('Authorization', `Bearer ${token}`)

    assert.equal(response.status, 200)
    assert.equal(response.body.success, true)
    assert.equal(response.body.report.title, 'Another student report')
  } finally {
    User.findById = originalUserFindById
    Report.findById = originalReportFindById
  }
})

it('PATCH /api/reports/:id/support should reject an invalid report ID', async () => {
  const originalUserFindById = User.findById

  const studentId = '507f1f77bcf86cd799439011'

  User.findById = () => ({
    select: async () => ({
      _id: studentId,
      name: 'Test Student',
      email: 'student@example.com',
      role: 'student',
    }),
  })

  try {
    const token = jwt.sign(
      { userId: studentId },
      process.env.JWT_SECRET,
    )

    const response = await request(app)
      .patch('/api/reports/invalid-id/support')
      .set('Authorization', `Bearer ${token}`)

    assert.equal(response.status, 400)
    assert.equal(response.body.success, false)
    assert.equal(response.body.message, 'Invalid report ID.')
  } finally {
    User.findById = originalUserFindById
  }
})

it('PATCH /api/reports/:id/support should remove existing support instead of adding it twice', async () => {
  const originalUserFindById = User.findById
  const originalReportFindById = Report.findById
  const originalFindOneAndUpdate = Report.findOneAndUpdate

  const studentId = '507f1f77bcf86cd799439011'
  const reportId = '507f1f77bcf86cd799439013'

  const existingReport = {
    _id: reportId,
    supporters: [studentId],
  }

  const updatedReport = {
    _id: reportId,
    supporters: [],
  }

  User.findById = () => ({
    select: async () => ({
      _id: studentId,
      name: 'Test Student',
      email: 'student@example.com',
      role: 'student',
    }),
  })

  Report.findById = async () => existingReport

  Report.findOneAndUpdate = async (filter, update, options) => {
    assert.deepEqual(update, { $pull: { supporters: studentId } })
    assert.equal(options.new, true)
    return updatedReport
  }

  try {
    const token = jwt.sign(
      { userId: studentId },
      process.env.JWT_SECRET,
    )

    const response = await request(app)
      .patch(`/api/reports/${reportId}/support`)
      .set('Authorization', `Bearer ${token}`)

    assert.equal(response.status, 200)
    assert.equal(response.body.success, true)
    assert.equal(response.body.message, 'Support removed successfully.')
    assert.equal(response.body.supportCount, 0)
  } finally {
    User.findById = originalUserFindById
    Report.findById = originalReportFindById
    Report.findOneAndUpdate = originalFindOneAndUpdate
  }
})

it('PATCH /api/reports/:id/support should add support for a student who has not supported the report', async () => {
  const originalUserFindById = User.findById
  const originalReportFindById = Report.findById
  const originalFindOneAndUpdate = Report.findOneAndUpdate

  const studentId = '507f1f77bcf86cd799439011'
  const reportId = '507f1f77bcf86cd799439013'

  const existingReport = {
    _id: reportId,
    supporters: [],
  }

  const updatedReport = {
    _id: reportId,
    supporters: [studentId],
  }

  User.findById = () => ({
    select: async () => ({
      _id: studentId,
      name: 'Test Student',
      email: 'student@example.com',
      role: 'student',
    }),
  })

  Report.findById = async () => existingReport

  Report.findOneAndUpdate = async (filter, update, options) => {
    assert.deepEqual(update, { $addToSet: { supporters: studentId } })
    assert.equal(options.new, true)
    return updatedReport
  }

  try {
    const token = jwt.sign(
      { userId: studentId },
      process.env.JWT_SECRET,
    )

    const response = await request(app)
      .patch(`/api/reports/${reportId}/support`)
      .set('Authorization', `Bearer ${token}`)

    assert.equal(response.status, 200)
    assert.equal(response.body.success, true)
    assert.equal(response.body.message, 'Report supported successfully.')
    assert.equal(response.body.supportCount, 1)
  } finally {
    User.findById = originalUserFindById
    Report.findById = originalReportFindById
    Report.findOneAndUpdate = originalFindOneAndUpdate
  }
})

it('PATCH /api/admin/reports/:id/status should reject student access', async () => {
  const originalUserFindById = User.findById

  const studentId = '507f1f77bcf86cd799439011'
  const reportId = '507f1f77bcf86cd799439013'

  User.findById = () => ({
    select: async () => ({
      _id: studentId,
      name: 'Test Student',
      email: 'student@example.com',
      role: 'student',
    }),
  })

  try {
    const token = jwt.sign(
      { userId: studentId },
      process.env.JWT_SECRET,
    )

    const response = await request(app)
      .patch(`/api/admin/reports/${reportId}/status`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        status: 'in-progress',
        note: 'Starting work',
      })

    assert.equal(response.status, 403)
    assert.equal(response.body.success, false)
    assert.equal(
      response.body.message,
      'Forbidden. You do not have permission to access this resource.',
    )
  } finally {
    User.findById = originalUserFindById
  }
})
it('PATCH /api/admin/reports/:id/status should reject requests without authentication', async () => {
  const response = await request(app)
    .patch('/api/admin/reports/507f1f77bcf86cd799439013/status')
    .send({
      status: 'in-progress',
      note: 'Starting work',
    })

  assert.equal(response.status, 401)
  assert.equal(response.body.success, false)
})
it('PATCH /api/admin/reports/:id/status should allow an admin to update a report status', async () => {
  const originalUserFindById = User.findById
  const originalReportFindById = Report.findById
  const originalNotificationCreate = Notification.create

  const adminId = '507f1f77bcf86cd799439010'
  const reportId = '507f1f77bcf86cd799439013'
  const reporterId = '507f1f77bcf86cd799439014'

  const mockReport = {
    _id: reportId,
    title: 'Broken campus light',
    reporter: reporterId,
    status: 'pending',
    statusHistory: [],
    save: async function () {
      return this
    },
  }

  let notificationCreated = false

  User.findById = () => ({
    select: async () => ({
      _id: adminId,
      name: 'Test Admin',
      email: 'admin@example.com',
      role: 'admin',
    }),
  })

  Report.findById = async () => mockReport

  Notification.create = async (notification) => {
    notificationCreated = true
    assert.equal(notification.recipient, reporterId)
    assert.equal(notification.type, 'status-update')
    return notification
  }

  try {
    const token = jwt.sign(
      { userId: adminId },
      process.env.JWT_SECRET,
    )

    const response = await request(app)
      .patch(`/api/admin/reports/${reportId}/status`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        status: 'in-progress',
        note: 'Work has started',
      })

    assert.equal(response.status, 200)
    assert.equal(response.body.success, true)
    assert.equal(response.body.report.status, 'in-progress')
    assert.equal(response.body.report.statusHistory.length, 1)
    assert.equal(response.body.report.statusHistory[0].status, 'in-progress')
    assert.equal(response.body.report.statusHistory[0].changedBy, adminId)
    assert.equal(response.body.report.statusHistory[0].note, 'Work has started')
    assert.equal(notificationCreated, true)
  } finally {
    User.findById = originalUserFindById
    Report.findById = originalReportFindById
    Notification.create = originalNotificationCreate
  }
})
})
