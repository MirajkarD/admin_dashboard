import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DashboardContent = () => {
    const [totalSlots, setTotalSlots] = useState(0);
    const [occupiedSlots, setOccupiedSlots] = useState(0);
    const [availableSlots, setAvailableSlots] = useState(0);
    const [activeReservations, setActiveReservations] = useState([]);
    const [upcomingReservations, setUpcomingReservations] = useState([]);
    const [bookingCancellations, setBookingCancellations] = useState([]);
    const [revenueStatistics, setRevenueStatistics] = useState({
        daily: 0,
        weekly: 0,
        monthly: 0
    });
    const [paymentIssues, setPaymentIssues] = useState([]);

    // Base URL for axios
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

    useEffect(() => {
        // Fetch slot information
        axios.get(`${API_URL}/slots/available`)
            .then(res => {
                const total = res.data.length;
                const occupied = res.data.filter(slot => !slot.isAvailable).length;
                setTotalSlots(total);
                setOccupiedSlots(occupied);
                setAvailableSlots(total - occupied);
            })
            .catch(err => console.error(err));

        // Fetch active reservations
        axios.get(`${API_URL}/bookings/active`)
            .then(res => setActiveReservations(res.data))
            .catch(err => console.error(err));

        // Fetch upcoming reservations
        axios.get(`${API_URL}/bookings/upcoming`)
            .then(res => setUpcomingReservations(res.data))
            .catch(err => console.error(err));

        // Fetch booking cancellations
        axios.get(`${API_URL}/bookings/cancellations`)
            .then(res => setBookingCancellations(res.data))
            .catch(err => console.error(err));

        // Fetch revenue statistics
        axios.get(`${API_URL}/revenue`)
            .then(res => setRevenueStatistics(res.data))
            .catch(err => console.error(err));

        // Fetch payment issues
        axios.get(`${API_URL}/payments/issues`)
            .then(res => setPaymentIssues(res.data))
            .catch(err => console.error(err));
    }, [API_URL]);

    return (
        <div className="p-4 space-y-4">
            <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Parking Slots Overview</h2>
                <p><strong>Total Slots:</strong> {totalSlots}</p>
                <p><strong>Occupied Slots:</strong> {occupiedSlots}</p>
                <p><strong>Available Slots:</strong> {availableSlots}</p>
            </div>

            {/* Active Reservations */}
            <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Active Reservations</h2>
                {activeReservations.length > 0 ? (
                    <ul>
                        {activeReservations.map(reservation => (
                            <li key={reservation._id} className="mb-2">
                                Slot: {reservation.slotNumber}, Start Time: {new Date(reservation.startTime).toLocaleString()}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No active reservations found.</p>
                )}
            </div>

            {/* Upcoming Reservations */}
            <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Upcoming Reservations</h2>
                {upcomingReservations.length > 0 ? (
                    <ul>
                        {upcomingReservations.map(reservation => (
                            <li key={reservation._id} className="mb-2">
                                Slot: {reservation.slotNumber}, Date: {new Date(reservation.startTime).toLocaleString()}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No upcoming reservations found.</p>
                )}
            </div>

            {/* Booking Cancellations */}
            <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Booking Cancellations</h2>
                {bookingCancellations.length > 0 ? (
                    <ul>
                        {bookingCancellations.map(cancellation => (
                            <li key={cancellation._id} className="mb-2">
                                Slot: {cancellation.slotNumber}, Date: {new Date(cancellation.cancelDate).toLocaleString()}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No booking cancellations found.</p>
                )}
            </div>

            {/* Revenue Statistics */}
            <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Revenue Statistics</h2>
                <p><strong>Daily Revenue:</strong> ${revenueStatistics.daily}</p>
                <p><strong>Weekly Revenue:</strong> ${revenueStatistics.weekly}</p>
                <p><strong>Monthly Revenue:</strong> ${revenueStatistics.monthly}</p>
            </div>

            {/* Payment Issues */}
            <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Payment Issues</h2>
                {paymentIssues.length > 0 ? (
                    <ul>
                        {paymentIssues.map(issue => (
                            <li key={issue._id} className="mb-2">
                                Issue: {issue.description}, Amount: ${issue.amount}, Status: {issue.status}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No payment issues found.</p>
                )}
            </div>
        </div>
    );
};

export default DashboardContent;
