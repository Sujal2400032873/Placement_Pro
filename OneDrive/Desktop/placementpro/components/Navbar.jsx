
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button } from './ui';
import { useAppContext } from '../hooks/useAppContext';
import { UserRole } from '../types';

export const Navbar = () => {
  const { currentUser, logout } = useAppContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinkClass = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive ? 'bg-corporate-blue-700 text-white' : 'text-gray-300 hover:bg-corporate-blue-500 hover:text-white'
    }`;

  const getDashboardLink = () => {
    switch (currentUser?.role) {
      case UserRole.Admin:
        return '/admin';
      case UserRole.Student:
        return '/student';
      case UserRole.Employer:
        return '/employer';
      case UserRole.PlacementOfficer:
        return '/officer';
      default:
        return '/';
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-corporate-blue-800 shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <NavLink to="/" className="text-white font-bold text-xl">
              PlacementPro
            </NavLink>
          </div>
          <div className="flex items-center">
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <NavLink to="/" className={navLinkClass} end>Home</NavLink>
                {currentUser && (
                  <NavLink to={getDashboardLink()} className={navLinkClass}>Dashboard</NavLink>
                )}
              </div>
            </div>
            <div className="ml-4">
              {currentUser ? (
                <div className="flex items-center">
                  <span className="text-gray-300 text-sm mr-4">Welcome, {currentUser.name}</span>
                  <Button onClick={handleLogout} variant="secondary" className="text-sm px-3 py-2">Logout</Button>
                </div>
              ) : (
                <NavLink to="/login">
                  <Button variant="primary" className="px-3 py-2 text-sm">Login</Button>
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
