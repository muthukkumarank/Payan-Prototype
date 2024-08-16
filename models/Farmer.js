const mongoose = require('mongoose');

const FarmerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone_number: { type: String, required: true, unique: true },
    location: { type: String, required: true },
    current_stage: { type: String, required: true }
});

module.exports = mongoose.model('Farmer', FarmerSchema);
