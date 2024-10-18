import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardContent from './components/Dashboard/DashboardContent';
import ReservationsOverview from './components/Booking_Reservation_Overview/ReservationsOverview';
import ParkingStatistics from './components/Statistics/ParkingStatistics';
import UserDetailsPanel from './components/UserDetailPanel/UserDetailsPanel';
// import Sidebar from './components/';

const App = () => {
  return (
    <Router>
      <div className="flex">
        {/* <Sidebar /> */}
        <div className="flex-grow p-4">
          <Routes>
            <Route path="/" element={<h2>Welcome to the Admin Dashboard!</h2>} />
            <Route path="/dashboard" element={<DashboardContent />} />
            <Route path="/reservations" element={<ReservationsOverview />} />
            <Route path="/statistics" element={<ParkingStatistics />} />
            <Route path="/user_details" element={<UserDetailsPanel />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
