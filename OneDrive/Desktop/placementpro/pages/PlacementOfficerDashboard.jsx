
import React, { useMemo } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { Card } from '../components/ui';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ApplicationStatus } from '../types';

const PlacementOfficerDashboard = () => {
    const { applications, jobs, users } = useAppContext();

    const stats = useMemo(() => ({
        totalStudents: users.filter(u => u.role === 'student').length,
        totalEmployers: users.filter(u => u.role === 'employer').length,
        totalJobs: jobs.length,
        totalApplications: applications.length,
    }), [users, jobs, applications]);

    const applicationStatusData = useMemo(() => {
        const statusCounts = applications.reduce((acc, app) => {
            acc[app.status] = (acc[app.status] || 0) + 1;
            return acc;
        }, {});

        return Object.values(ApplicationStatus).map(status => ({
            name: status,
            count: statusCounts[status] || 0,
        }));
    }, [applications]);
    
    const applicationsPerJobData = useMemo(() => {
        return jobs.map(job => {
            const appCount = applications.filter(app => app.jobId === job.id).length;
            return {
                name: `${job.title.substring(0, 15)}...`,
                applications: appCount
            };
        }).sort((a, b) => b.applications - a.applications).slice(0, 10); // Top 10 jobs
    }, [jobs, applications]);


    return (
        <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Placement Officer Dashboard</h1>
                <p className="text-gray-600">Analytics and system-wide reports.</p>
            </header>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card><h3 className="text-lg font-medium text-gray-500">Total Students</h3><p className="mt-1 text-4xl font-semibold text-corporate-blue-700">{stats.totalStudents}</p></Card>
                <Card><h3 className="text-lg font-medium text-gray-500">Total Employers</h3><p className="mt-1 text-4xl font-semibold text-corporate-blue-700">{stats.totalEmployers}</p></Card>
                <Card><h3 className="text-lg font-medium text-gray-500">Total Jobs Posted</h3><p className="mt-1 text-4xl font-semibold text-corporate-blue-700">{stats.totalJobs}</p></Card>
                <Card><h3 className="text-lg font-medium text-gray-500">Total Applications</h3><p className="mt-1 text-4xl font-semibold text-corporate-blue-700">{stats.totalApplications}</p></Card>
            </div>
            
            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="h-96">
                    <h2 className="text-xl font-bold mb-4">Application Status Distribution</h2>
                     <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={applicationStatusData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="count" fill="#3b8ef1" name="Applications"/>
                        </BarChart>
                    </ResponsiveContainer>
                </Card>
                 <Card className="h-96">
                    <h2 className="text-xl font-bold mb-4">Top Jobs by Application Count</h2>
                     <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={applicationsPerJobData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="applications" fill="#2e74e4" />
                        </BarChart>
                    </ResponsiveContainer>
                </Card>
            </div>
        </div>
    );
};

export default PlacementOfficerDashboard;
