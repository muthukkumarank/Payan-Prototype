const ServiceProvider = require('../models/ServiceProvider');

async function matchServiceProvider(bookingDetails) {
    const { pincode, requestedHours } = bookingDetails;

    // Step 1: Filter service providers by pincode
    let providers = await ServiceProvider.find({ servicePincodes: pincode });

    // Step 2: Filter by daily job quota
    providers = providers.filter(provider => provider.dailyJobQuota > provider.jobsToday);

    // Step 3: Sort by rating
    providers.sort((a, b) => b.rating - a.rating);

    // Step 4: Sort by pricing (if ratings are equal)
    providers.sort((a, b) => {
        if (a.rating === b.rating) {
            return a.pricePerHour - b.pricePerHour;
        }
        return 0;
    });

    // Step 5: Return the top provider or notify others if none are found
    if (providers.length > 0) {
        return providers[0]; // Return the top provider
    } else {
        // Notify all providers in the area
        return await notifyAllProviders(pincode, bookingDetails);
    }
}

async function notifyAllProviders(pincode, bookingDetails) {
    const providers = await ServiceProvider.find({ servicePincodes: pincode });
    // Notify logic here (e.g., send SMS/Call)
    return null; // No provider found, manual intervention needed
}

module.exports = {
    matchServiceProvider
};
