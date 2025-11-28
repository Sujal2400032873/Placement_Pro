
import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/ui';

const HomePage = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <div className="relative bg-corporate-blue-800 text-white">
        <img src="https://picsum.photos/1600/600?grayscale&blur=2" alt="Campus Career Fair" className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            Welcome to PlacementPro
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-corporate-blue-200">
            Your all-in-one platform for campus placements. Connecting students, employers, and placement officers seamlessly.
          </p>
          <div className="mt-8">
            <Link to="/login">
              <button className="bg-white text-corporate-blue-700 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition-transform transform hover:scale-105">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Why Choose PlacementPro?</h2>
            <p className="mt-4 text-lg text-gray-600">
              Streamline your recruitment process with our powerful features.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card className="text-center">
                <div className="text-4xl text-corporate-blue-600 mb-4">➔</div>
              <h3 className="text-xl font-bold text-gray-900">For Students</h3>
              <p className="mt-2 text-gray-600">Discover job opportunities, apply with ease, and track your application status in real-time.</p>
            </Card>
            <Card className="text-center">
                <div className="text-4xl text-corporate-blue-600 mb-4">🏢</div>
              <h3 className="text-xl font-bold text-gray-900">For Employers</h3>
              <p className="mt-2 text-gray-600">Post job openings, manage applicants efficiently, and find the best talent from campus.</p>
            </Card>
            <Card className="text-center">
                <div className="text-4xl text-corporate-blue-600 mb-4">📊</div>
              <h3 className="text-xl font-bold text-gray-900">For Placement Officers</h3>
              <p className="mt-2 text-gray-600">Gain insights with comprehensive analytics and manage the entire placement drive.</p>
            </Card>
            <Card className="text-center">
                <div className="text-4xl text-corporate-blue-600 mb-4">✅</div>
              <h3 className="text-xl font-bold text-gray-900">Seamless Experience</h3>
              <p className="mt-2 text-gray-600">A unified platform with a user-friendly interface for all stakeholders.</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
