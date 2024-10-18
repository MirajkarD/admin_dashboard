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

    useEffect(() => {
        // Fetch user details from the backend
        axios.get('/api/user/details')
            .then(res => setUser(res.data))
            .catch(err => console.error(err));

        // Fetch user booking history
        axios.get('/api/user/bookings')
            .then(res => setBookingHistory(res.data))
            .catch(err => console.error(err));

        // Fetch upcoming reservations
        axios.get('/api/user/upcoming-reservations')
            .then(res => setUpcomingReservations(res.data))
            .catch(err => console.error(err));

        // Fetch payment information
        axios.get('/api/user/payment-info')
            .then(res => setPaymentInfo(res.data))
            .catch(err => console.error(err));
    }, []);

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
                <h2 className="text-xl font-bold mb-4">Booking History</h2>
                <ul>
                    {bookingHistory.map(history => (
                        <li key={history.id} className="mb-2">
                            Slot: {history.slot}, Start: {history.startTime}, End: {history.endTime}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Upcoming Reservations */}
            <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Upcoming Reservations</h2>
                <ul>
                    {upcomingReservations.map(reservation => (
                        <li key={reservation.id} className="mb-2">
                            Slot: {reservation.slot}, Date: {reservation.date}, Time: {reservation.time}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Payment Information */}
            <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Payment Information</h2>
                <ul>
                    {paymentInfo.map(payment => (
                        <li key={payment.id} className="mb-2">
                            Amount: {payment.amount}, Date: {payment.date}, Status: {payment.status}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default UserDetailsPanel;
