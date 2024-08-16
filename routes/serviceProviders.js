const express = require('express');
const router = express.Router();
const ServiceProvider = require('../models/ServiceProvider');

// Register a new JCB service provider
router.post('/register', async (req, res) => {
    try {
        const { name, phone, pincodes, jobQuota, pricingPerHour } = req.body;

        // Create a new service provider instance
        const newServiceProvider = new ServiceProvider({
            name,
            mobile_number,
            pincodes,
            jobQuota,
            pricingPerHour,
            rating: 5, // Initial default rating
            serviceType: 'JCB',
            availabilityStatus: true // Assuming they're available upon registration
        });

        // Save to the database
        await newServiceProvider.save();

        res.status(201).json({ message: 'Service provider registered successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to register service provider.', error });
    }
});

module.exports = router;
