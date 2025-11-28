
import React, { useState, useMemo } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { Card, Button, Modal, Input, StatusBadge } from '../components/ui';
import { ApplicationStatus } from '../types';

const StudentDashboard = () => {
    const { currentUser, jobs, applications, addApplication, users } = useAppContext();
    const [selectedJob, setSelectedJob] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [locationFilter, setLocationFilter] = useState('');

    const studentApplications = useMemo(() => 
        applications.filter(app => app.studentId === currentUser?.id),
        [applications, currentUser]
    );

    const filteredJobs = useMemo(() => 
        jobs.filter(job => 
            job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
            job.location.toLowerCase().includes(locationFilter.toLowerCase())
        ), [jobs, searchTerm, locationFilter]
    );

    const handleApply = (jobId) => {
        if (currentUser) {
            addApplication({
                jobId: jobId,
                studentId: currentUser.id,
                status: ApplicationStatus.Applied,
                appliedAt: new Date().toISOString()
            });
        }
    };

    const getJobForApplication = (appJobId) => jobs.find(j => j.id === appJobId);

    return (
        <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Student Dashboard</h1>
                <p className="text-gray-600">Welcome, {currentUser?.name}! Find your next opportunity.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <Card>
                        <h2 className="text-xl font-bold mb-4">Available Jobs</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <Input label="Search by title" placeholder="e.g., Frontend Developer" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                            <Input label="Filter by location" placeholder="e.g., Remote" value={locationFilter} onChange={e => setLocationFilter(e.target.value)} />
                        </div>
                        <div className="space-y-4">
                            {filteredJobs.length > 0 ? filteredJobs.map(job => {
                                const hasApplied = studentApplications.some(app => app.jobId === job.id);
                                return (
                                    <div key={job.id} className="p-4 border rounded-lg hover:shadow-md transition">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-bold text-lg text-corporate-blue-700">{job.title}</h3>
                                                <p className="text-sm text-gray-600">{job.companyName} - {job.location}</p>
                                            </div>
                                            <div className="flex space-x-2">
                                                <Button variant="secondary" onClick={() => setSelectedJob(job)}>Details</Button>
                                                <Button onClick={() => handleApply(job.id)} disabled={hasApplied}>
                                                    {hasApplied ? 'Applied' : 'Apply'}
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }) : <p className="text-center text-gray-500">No jobs match your criteria.</p>}
                        </div>
                    </Card>
                </div>

                <div className="lg:col-span-1">
                    <Card>
                        <h2 className="text-xl font-bold mb-4">My Applications</h2>
                        <div className="space-y-4">
                            {studentApplications.length > 0 ? studentApplications.sort((a,b) => new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime()).map(app => {
                                const job = getJobForApplication(app.jobId);
                                return (
                                    <div key={app.id} className="p-4 border rounded-lg">
                                        <h3 className="font-semibold">{job?.title || 'Job not found'}</h3>
                                        <p className="text-sm text-gray-500 mb-2">{job?.companyName}</p>
                                        <StatusBadge status={app.status} />
                                    </div>
                                );
                            }) : <p className="text-center text-gray-500">You haven't applied to any jobs yet.</p>}
                        </div>
                    </Card>
                </div>
            </div>

            <Modal isOpen={!!selectedJob} onClose={() => setSelectedJob(null)} title={selectedJob?.title || ''}>
                {selectedJob && (
                    <div className="space-y-4">
                        <p><strong>Company:</strong> {selectedJob.companyName}</p>
                        <p><strong>Location:</strong> {selectedJob.location}</p>
                        <div>
                            <h4 className="font-semibold">Description:</h4>
                            <p className="text-gray-700">{selectedJob.description}</p>
                        </div>
                         <div>
                            <h4 className="font-semibold">Requirements:</h4>
                            <p className="text-gray-700">{selectedJob.requirements}</p>
                        </div>
                        <div className="text-right pt-4">
                            <Button onClick={() => setSelectedJob(null)}>Close</Button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default StudentDashboard;
