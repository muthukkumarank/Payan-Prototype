const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const farmerRoutes = require('./routes/farmer');
const serviceProviderRoutes = require('./routes/serviceProvider');
const bookingRoutes = require('./routes/booking');
const loanRoutes = require('./routes/loan');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Payan Backend is Running');
});
app.use('/farmer', farmerRoutes);
app.use('/service-provider', serviceProviderRoutes);
app.use('/booking', bookingRoutes);
app.use('/loan', loanRoutes);

mongoose.connect(process.env.MONGO_URI)
   .then(() => console.log('MongoDB connected'))
   .catch(err => console.error(err));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
