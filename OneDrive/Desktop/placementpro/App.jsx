
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import { Navbar } from './components/Navbar';
import { ProtectedRoute } from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import StudentDashboard from './pages/StudentDashboard';
import EmployerDashboard from './pages/EmployerDashboard';
import PlacementOfficerDashboard from './pages/PlacementOfficerDashboard';
import { UserRole } from './types';

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            
            {/* Protected Routes */}
            <Route element={<ProtectedRoute allowedRoles={[UserRole.Admin]} />}>
              <Route path="/admin" element={<AdminDashboard />} />
            </Route>
            <Route element={<ProtectedRoute allowedRoles={[UserRole.Student]} />}>
              <Route path="/student" element={<StudentDashboard />} />
            </Route>
            <Route element={<ProtectedRoute allowedRoles={[UserRole.Employer]} />}>
              <Route path="/employer" element={<EmployerDashboard />} />
            </Route>
            <Route element={<ProtectedRoute allowedRoles={[UserRole.PlacementOfficer]} />}>
              <Route path="/officer" element={<PlacementOfficerDashboard />} />
            </Route>
          </Routes>
        </main>
      </div>
    </AppProvider>
  );
}

export default App;
