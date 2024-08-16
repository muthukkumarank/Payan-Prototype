const mongoose = require('mongoose');

const LoanSchema = new mongoose.Schema({
    service_provider_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ServiceProvider',
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    interest_rate: {
        type: Number,
        required: true,
    },
    tenure: {
        type: Number, // in months
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending',
    },
    repayment_status: {
        type: String,
        enum: ['Not Started', 'Ongoing', 'Completed', 'Defaulted'],
        default: 'Not Started',
    }
}, { timestamps: true });

module.exports = mongoose.model('Loan', LoanSchema);
