import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserDetailsPanel = () => {
    const [user, setUser] = useState({
        name: '',
        contact: '',
        email: '',
        vehicle: {
            type: '',
            licensePlate: ''
        },
    });

    const [bookingHistory, setBookingHistory] = useState([]);
    const [upcomingReservations, setUpcomingReservations] = useState([]);
    const [paymentInfo, setPaymentInfo] = useState([]);

    // Hardcoded user ID (replace with dynamic ID as needed)
    const userId = "YOUR_USER_ID"; // Update this to the specific user's ID

    // Hardcoded API URL
    const API_URL = 'http://localhost:5000/api';

    useEffect(() => {
        // Fetch user details from the backend
        axios.get(`${API_URL}/users/${userId}`)
            .then(res => setUser(res.data))
            .catch(err => console.error(err));

        // Fetch active booking history for the user
        axios.get(`${API_URL}/bookings/active/${userId}`)
            .then(res => setBookingHistory(res.data))
            .catch(err => console.error(err));

        // Fetch upcoming reservations for the user
        axios.get(`${API_URL}/bookings/upcoming/${userId}`)
            .then(res => setUpcomingReservations(res.data))
            .catch(err => console.error(err));

        // Fetch payment information for the user
        axios.get(`${API_URL}/payments/${userId}`)
            .then(res => setPaymentInfo(res.data))
            .catch(err => console.error(err));
    }, [userId]);

    return (
        <div className="p-4 space-y-4">
            {/* Basic User Information */}
            <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">User Information</h2>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Contact:</strong> {user.contact}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Vehicle Type:</strong> {user.vehicle.type}</p>
                <p><strong>License Plate:</strong> {user.vehicle.licensePlate}</p>
            </div>

            {/* Booking History */}
            <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Active Booking History</h2>
                <ul>
                    {bookingHistory.length > 0 ? (
                        bookingHistory.map(history => (
                            <li key={history._id} className="mb-2">
                                Slot: {history.slotNumber}, Start: {new Date(history.startTime).toLocaleString()}, End: {new Date(history.endTime).toLocaleString()}
                            </li>
                        ))
                    ) : (
                        <p>No active bookings found.</p>
                    )}
                </ul>
            </div>

            {/* Upcoming Reservations */}
            <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Upcoming Reservations</h2>
                <ul>
                    {upcomingReservations.length > 0 ? (
                        upcomingReservations.map(reservation => (
                            <li key={reservation._id} className="mb-2">
                                Slot: {reservation.slotNumber}, Date: {new Date(reservation.startTime).toLocaleString()}
                            </li>
                        ))
                    ) : (
                        <p>No upcoming reservations found.</p>
                    )}
                </ul>
            </div>

            {/* Payment Information */}
            <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Payment Information</h2>
                <ul>
                    {paymentInfo.length > 0 ? (
                        paymentInfo.map(payment => (
                            <li key={payment._id} className="mb-2">
                                Amount: ${payment.amount}, Date: {new Date(payment.date).toLocaleString()}, Status: {payment.status}
                            </li>
                        ))
                    ) : (
                        <p>No payment information found.</p>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default UserDetailsPanel;
