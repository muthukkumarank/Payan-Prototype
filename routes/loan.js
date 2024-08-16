const express = require('express');
const router = express.Router();
const Loan = require('../models/Loan');

// Create a loan application
router.post('/apply', async (req, res) => {
    const { service_provider_id, amount, interest_rate, tenure } = req.body;

    try {
        const newLoan = new Loan({
            service_provider_id,
            amount,
            interest_rate,
            tenure
        });

        const savedLoan = await newLoan.save();
        res.status(201).json(savedLoan);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update loan status
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { status, repayment_status } = req.body;

    try {
        const updatedLoan = await Loan.findByIdAndUpdate(
            id,
            { status, repayment_status },
            { new: true, runValidators: true }
        );

        if (!updatedLoan) {
            return res.status(404).json({ message: 'Loan not found' });
        }

        res.status(200).json(updatedLoan);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all loans for a specific service provider
router.get('/service-provider/:service_provider_id', async (req, res) => {
    const { service_provider_id } = req.params;

    try {
        const loans = await Loan.find({ service_provider_id });
        res.status(200).json(loans);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
