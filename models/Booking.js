const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    farmer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Farmer', // Assuming you have a Farmer model
        required: true,
    },
    service_provider_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ServiceProvider',
        required: true,
    },
    service_type: {
        type: String,
        required: true,
    },
    booking_date: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
        default: 'Pending',
    },
    payment_status: {
        type: String,
        enum: ['Pending', 'Paid', 'Failed'],
        default: 'Pending',
    }
}, { timestamps: true });

module.exports = mongoose.model('Booking', BookingSchema);
