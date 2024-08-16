const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// Create a new booking
router.post('/create', async (req, res) => {
    const { farmer_id, service_provider_id, service_type, booking_date } = req.body;

    try {
        const newBooking = new Booking({
            farmer_id,
            service_provider_id,
            service_type,
            booking_date
        });

        const savedBooking = await newBooking.save();
        res.status(201).json(savedBooking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update booking status
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { status, payment_status } = req.body;

    try {
        const updatedBooking = await Booking.findByIdAndUpdate(
            id,
            { status, payment_status },
            { new: true, runValidators: true }
        );

        if (!updatedBooking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        res.status(200).json(updatedBooking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all bookings for a specific farmer
router.get('/farmer/:farmer_id', async (req, res) => {
    const { farmer_id } = req.params;

    try {
        const bookings = await Booking.find({ farmer_id }).populate('service_provider_id');
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
