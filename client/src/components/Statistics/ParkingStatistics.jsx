import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ParkingStatistics = () => {
    const [occupancyRate, setOccupancyRate] = useState({});
    const [usagePatterns, setUsagePatterns] = useState({});
    const [revenueStats, setRevenueStats] = useState({});

    // Hardcoded API URL
    const API_URL = 'http://localhost:5000/api';

    useEffect(() => {
        // Fetch occupancy rates
        axios.get(`${API_URL}/statistics/occupancy`)
            .then(res => setOccupancyRate(res.data))
            .catch(err => console.error(err));

        // Fetch usage patterns
        axios.get(`${API_URL}/statistics/usage`)
            .then(res => setUsagePatterns(res.data))
            .catch(err => console.error(err));

        // Fetch revenue statistics
        axios.get(`${API_URL}/revenue`)
            .then(res => setRevenueStats(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="p-4 space-y-4">
            {/* Occupancy Rates */}
            <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Occupancy Rates</h2>
                <p>Current Occupancy: {occupancyRate.currentOccupancy}</p>
                <p>Peak Occupancy: {occupancyRate.peakOccupancy}</p>
            </div>

            {/* Usage Patterns */}
            <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Usage Patterns</h2>
                <p>Average Parking Duration: {usagePatterns.averageDuration}</p>
                <p>Most Popular Slots: {usagePatterns.mostPopularSlots && usagePatterns.mostPopularSlots.join(', ')}</p>
            </div>

            {/* Revenue Statistics */}
            <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Revenue Statistics</h2>
                <p>Total Revenue: ${revenueStats.total}</p>
                <p>Daily Revenue: ${revenueStats.daily}</p>
                <p>Weekly Revenue: ${revenueStats.weekly}</p>
            </div>
        </div>
    );
};

export default ParkingStatistics;
