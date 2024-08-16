const mongoose = require('mongoose');

const ServiceProviderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  mobile_number: {
    type: String,
    required: true
  },
  serviceType: {
    type: String,
    required: true,
  },
  coveragePincodes: {
    type: [String],
    required: true
  },
  dailyJobQuota: {
    type: Number,
    required: true
  },
  completedJobsToday: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    required: true,
    default: 0
  },
  bookingCharges: {
    type: Number,
    required: true
  },
  complimentaryHours: {
    type: Number,
    required: true
  },
  chargesPerAdditionalHour: {
    type: Number,
    required: true
  },
  available: {
    type: Boolean,
    default: true
  }
});

const ServiceProvider = mongoose.model('ServiceProvider', ServiceProviderSchema);

module.exports = ServiceProvider;
