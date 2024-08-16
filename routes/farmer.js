const express = require('express');
const router = express.Router();
const Farmer = require('../models/Farmer');

router.post('/add', async (req, res) => {
    const { name, phone_number, location, current_stage } = req.body;
    try {
        const newFarmer = new Farmer({ name, phone_number, location, current_stage });
        await newFarmer.save();
        res.status(201).json(newFarmer);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Get all farmers
router.get('/', async (req, res) => {
    try {
        const farmers = await Farmer.find();
        res.status(200).json(farmers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a single farmer by ID
router.get('/:id', async (req, res) => {
    try {
        const farmer = await Farmer.findById(req.params.id);
        if (!farmer) {
            return res.status(404).json({ error: 'Farmer not found' });
        }
        res.status(200).json(farmer);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a farmer's information
router.put('/:id', async (req, res) => {
    try {
        const { name, phone_number, location, current_stage } = req.body;
        const farmer = await Farmer.findByIdAndUpdate(
            req.params.id,
            { name, phone_number, location, current_stage },
            { new: true, runValidators: true }
        );
        if (!farmer) {
            return res.status(404).json({ error: 'Farmer not found' });
        }
        res.status(200).json(farmer);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a farmer
router.delete('/:id', async (req, res) => {
    try {
        const farmer = await Farmer.findByIdAndDelete(req.params.id);
        if (!farmer) {
            return res.status(404).json({ error: 'Farmer not found' });
        }
        res.status(200).json({ message: 'Farmer deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
module.exports = router;
