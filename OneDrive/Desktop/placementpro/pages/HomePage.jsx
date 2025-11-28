
import React from 'react';
import { Card } from '../components/ui';

const HomePage = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-corporate-blue-800 via-corporate-blue-700 to-corporate-blue-900 text-white overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -left-32 -top-32 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -right-32 -bottom-32 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 sm:py-40">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left column - Text content */}
            <div className="space-y-6">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight">
                Future-Ready <span className="text-corporate-blue-300">Placements</span>
              </h1>
              <p className="text-xl sm:text-2xl text-corporate-blue-100 font-light">
                Connect talented students with leading employers. Manage your entire recruitment cycle with ease.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-corporate-blue-300 rounded-full" />
                  <span className="text-lg">Real-time Application Tracking</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-corporate-blue-300 rounded-full" />
                  <span className="text-lg">Advanced Analytics Dashboard</span>
                </div>
              </div>
              <p className="text-corporate-blue-200 text-sm pt-4">
                Join thousands of students and employers already using PlacementPro. Sign in to get started.
              </p>
            </div>

            {/* Right column - Stats/Highlights */}
            <div className="space-y-6">
              <div className="glass rounded-2xl p-6 border border-white/20 backdrop-blur-lg">
                <div className="text-5xl font-extrabold text-corporate-blue-300 mb-2">10K+</div>
                <p className="text-lg text-corporate-blue-100">Active Students</p>
              </div>
              <div className="glass rounded-2xl p-6 border border-white/20 backdrop-blur-lg">
                <div className="text-5xl font-extrabold text-corporate-blue-300 mb-2">500+</div>
                <p className="text-lg text-corporate-blue-100">Top Employers</p>
              </div>
              <div className="glass rounded-2xl p-6 border border-white/20 backdrop-blur-lg">
                <div className="text-5xl font-extrabold text-corporate-blue-300 mb-2">95%</div>
                <p className="text-lg text-corporate-blue-100">Placement Success Rate</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Core Features Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Powerful Features for Every Role</h2>
            <p className="text-xl text-gray-600">
              Designed to streamline recruitment and connect talent with opportunity.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Students Card */}
            <Card className="hover:shadow-2xl transition-shadow">
              <div className="flex flex-col items-start h-full">
                <div className="text-5xl mb-4">🎓</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">For Students</h3>
                <p className="text-gray-600 flex-grow">
                  Explore job opportunities from top companies, submit applications effortlessly, and monitor your progress in real-time.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-gray-700">
                  <li>✓ Browse verified job openings</li>
                  <li>✓ One-click application process</li>
                  <li>✓ Track application status</li>
                </ul>
              </div>
            </Card>

            {/* Employers Card */}
            <Card className="hover:shadow-2xl transition-shadow">
              <div className="flex flex-col items-start h-full">
                <div className="text-5xl mb-4">🏢</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">For Employers</h3>
                <p className="text-gray-600 flex-grow">
                  Post job openings, review qualified candidates, manage applicant pipelines, and make data-driven hiring decisions.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-gray-700">
                  <li>✓ Post unlimited job listings</li>
                  <li>✓ Manage applicant workflows</li>
                  <li>✓ Access candidate profiles</li>
                </ul>
              </div>
            </Card>

            {/* Placement Officers Card */}
            <Card className="hover:shadow-2xl transition-shadow">
              <div className="flex flex-col items-start h-full">
                <div className="text-5xl mb-4">📊</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">For Placement Officers</h3>
                <p className="text-gray-600 flex-grow">
                  Oversee the entire placement cycle with comprehensive dashboards, analytics, and institutional insights.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-gray-700">
                  <li>✓ Real-time placement analytics</li>
                  <li>✓ Manage placement drives</li>
                  <li>✓ Export detailed reports</li>
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-corporate-blue-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-6">Ready to Transform Your Placement Process?</h2>
          <p className="text-lg text-corporate-blue-100 mb-8">
            Log in to access your dashboard and start connecting talent with opportunity.
          </p>
          <p className="text-sm text-corporate-blue-200">
            Use the <span className="font-semibold">Login</span> button in the top-right corner to get started.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
