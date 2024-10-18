import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReservationsOverview = () => {
    const [activeReservations, setActiveReservations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchActiveReservations = async () => {
            try {
                const response = await axios.get('/api/reservations/active');
                console.log(response.data);
                setActiveReservations(response.data);
            } catch (error) {
                console.error('Error fetching active reservations:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchActiveReservations();
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            {Array.isArray(activeReservations) && activeReservations.length > 0 ? (
                activeReservations.map((reservation) => (
                    <div key={reservation.id}>{reservation.details}</div>
                ))
            ) : (
                <p>No active reservations found.</p>
            )}
        </div>
    );
};

export default ReservationsOverview;
