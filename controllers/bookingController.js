const matchmakingService = require('../services/matchmakingService');

exports.createBooking = async (req, res) => {
    try {
        const bookingDetails = req.body;

        // Step 1: Match the service provider
        const matchedProvider = await matchmakingService.matchServiceProvider(bookingDetails);

        if (matchedProvider) {
            // Step 2: Proceed with booking logic
            bookingDetails.serviceProvider = matchedProvider._id;
            const booking = new Booking(bookingDetails);
            await booking.save();

            // Notify farmer about the confirmed booking
            return res.status(200).json({ success: true, message: 'Booking confirmed!', booking });
        } else {
            return res.status(404).json({ success: false, message: 'No service provider available. Please try later.' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
    }
};
