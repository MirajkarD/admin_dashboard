import React, { useEffect, useState } from 'react';
import axios from 'axios';


const ReservationsOverview = () => {
    const [activeReservations, setActiveReservations] = useState([]);
    const [upcomingReservations, setUpcomingReservations] = useState([]);
    const [cancelledReservations, setCancelledReservations] = useState([]);
    const [completedReservations, setCompletedReservations] = useState([]);
    const [loading, setLoading] = useState(true);

    // Hardcoded API URL
    const API_URL = 'http://localhost:5000/api';

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const [activeRes, upcomingRes, cancelledRes, completedRes] = await Promise.all([
                    axios.get(`${API_URL}/bookings/active`),
                    axios.get(`${API_URL}/bookings/upcoming`),
                    axios.get(`${API_URL}/bookings/cancellations`),
                    axios.get(`${API_URL}/bookings/completed`)
                ]);

                setActiveReservations(activeRes.data);
                setUpcomingReservations(upcomingRes.data);
                setCancelledReservations(cancelledRes.data);
                setCompletedReservations(completedRes.data);
            } catch (error) {
                console.error('Error fetching reservations:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchReservations();
    }, [API_URL]);

    if (loading) return <p>Loading...</p>;

    return (
        <div className="p-4 space-y-4">
            {/* Active Reservations */}
            <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Active Reservations</h2>
                {activeReservations.length > 0 ? (
                    activeReservations.map(reservation => (
                        <div key={reservation._id}>
                            Slot: {reservation.slotNumber}, Start Time: {new Date(reservation.startTime).toLocaleString()}
                        </div>
                    ))
                ) : (
                    <p>No active reservations found.</p>
                )}
            </div>

            {/* Upcoming Reservations */}
            <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Upcoming Reservations</h2>
                {upcomingReservations.length > 0 ? (
                    upcomingReservations.map(reservation => (
                        <div key={reservation._id}>
                            Slot: {reservation.slotNumber}, Start Time: {new Date(reservation.startTime).toLocaleString()}
                        </div>
                    ))
                ) : (
                    <p>No upcoming reservations found.</p>
                )}
            </div>

            {/* Cancelled Reservations */}
            <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Cancelled Reservations</h2>
                {cancelledReservations.length > 0 ? (
                    cancelledReservations.map(reservation => (
                        <div key={reservation._id}>
                            Slot: {reservation.slotNumber}, Date Cancelled: {new Date(reservation.cancelDate).toLocaleString()}
                        </div>
                    ))
                ) : (
                    <p>No cancellations found.</p>
                )}
            </div>

            {/* Completed Reservations */}
            <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Completed Reservations</h2>
                {completedReservations.length > 0 ? (
                    completedReservations.map(reservation => (
                        <div key={reservation._id}>
                            Slot: {reservation.slotNumber}, Completed Time: {new Date(reservation.endTime).toLocaleString()}
                        </div>
                    ))
                ) : (
                    <p>No completed reservations found.</p>
                )}
            </div>
        </div>
    );
};

export default ReservationsOverview;
