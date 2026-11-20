
const mongoose = require('mongoose')

const reportSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 100,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 20,
    },

    category: {
      type: String,
      required: true,
      enum: [
        'water',
        'electricity',
        'waste',
        'infrastructure',
        'safety',
        'other',
      ],
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },
    coordinates: {
  type: [Number],
  default: undefined,
  validate: {
    validator: function (value) {
      return (
        value === undefined ||
        (value.length === 2 &&
          value.every((coordinate) => Number.isFinite(coordinate)) &&
          value[0] >= -90 &&
          value[0] <= 90 &&
          value[1] >= -180 &&
          value[1] <= 180)
      )
    },
    message: 'Coordinates must contain a valid latitude and longitude.',
  },
},

    image: {
      type: String,
      default: '',
    },

    status: {
      type: String,
      enum: ['pending', 'in-progress', 'resolved', 'rejected'],
      default: 'pending',
    },

    reporter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Report = mongoose.model('Report', reportSchema)

module.exports = Report
