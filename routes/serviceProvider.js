const express = require('express');
const router = express.Router();
const ServiceProvider = require('../models/ServiceProvider');

// Add a new service provider
router.post('/add', async (req, res) => {
    const { name, phone_number, service_type, location } = req.body;

    try {
        const newServiceProvider = new ServiceProvider({
            name,
            phone_number,
            service_type,
            location
        });

        const savedServiceProvider = await newServiceProvider.save();
        res.status(201).json(savedServiceProvider);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update service provider details
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, phone_number, service_type, location, availability, ratings, total_jobs } = req.body;

    try {
        const updatedServiceProvider = await ServiceProvider.findByIdAndUpdate(
            id,
            { name, phone_number, service_type, location, availability, ratings, total_jobs },
            { new: true, runValidators: true }
        );

        if (!updatedServiceProvider) {
            return res.status(404).json({ message: 'Service Provider not found' });
        }

        res.status(200).json(updatedServiceProvider);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all service providers
router.get('/', async (req, res) => {
    try {
        const serviceProviders = await ServiceProvider.find();
        res.status(200).json(serviceProviders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
