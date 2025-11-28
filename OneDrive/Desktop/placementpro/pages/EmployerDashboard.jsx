
import React, { useState, useMemo } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { Card, Button, Modal, Input, StatusBadge } from '../components/ui';
import { ApplicationStatus } from '../types';

const EmployerDashboard = () => {
    const { currentUser, jobs, applications, users, addJob, deleteJob, updateApplicationStatus } = useAppContext();
    const [isJobModalOpen, setIsJobModalOpen] = useState(false);
    const [newJob, setNewJob] = useState({ title: '', location: '', description: '', requirements: '' });
    const [selectedJobId, setSelectedJobId] = useState(null);
    
    const employerJobs = useMemo(() => 
        jobs.filter(job => job.employerId === currentUser?.id),
        [jobs, currentUser]
    );

    const applicationsForSelectedJob = useMemo(() =>
        selectedJobId ? applications.filter(app => app.jobId === selectedJobId) : [],
        [applications, selectedJobId]
    );

    const getStudentById = (studentId) => users.find(u => u.id === studentId);

    const handlePostJob = (e) => {
        e.preventDefault();
        if (currentUser) {
            addJob({
                ...newJob,
                employerId: currentUser.id,
                companyName: currentUser.profile.companyName || 'Unknown Company',
                postedAt: new Date().toISOString()
            });
            setIsJobModalOpen(false);
            setNewJob({ title: '', location: '', description: '', requirements: '' });
        }
    };
    
    return (
        <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
            <header className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Employer Dashboard</h1>
                    <p className="text-gray-600">Manage your job postings and applicants.</p>
                </div>
                <Button onClick={() => setIsJobModalOpen(true)}>Post New Job</Button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Job Postings */}
                <div className="md:col-span-1">
                    <Card>
                        <h2 className="text-xl font-bold mb-4">My Job Postings</h2>
                        <div className="space-y-3">
                            {employerJobs.map(job => (
                                <div key={job.id} className={`p-3 rounded-lg cursor-pointer transition ${selectedJobId === job.id ? 'bg-corporate-blue-100 ring-2 ring-corporate-blue-500' : 'bg-gray-50 hover:bg-gray-100'}`} onClick={() => setSelectedJobId(job.id)}>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-semibold text-gray-800">{job.title}</h3>
                                            <p className="text-sm text-gray-500">{job.location}</p>
                                        </div>
                                        <Button variant="danger" size="sm" onClick={(e) => { e.stopPropagation(); deleteJob(job.id); setSelectedJobId(null); }}>X</Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Applicant Viewer */}
                <div className="md:col-span-2">
                    <Card>
                        <h2 className="text-xl font-bold mb-4">
                            {selectedJobId ? `Applicants for "${jobs.find(j=>j.id === selectedJobId)?.title}"` : "Select a job to view applicants"}
                        </h2>
                        {selectedJobId ? (
                            applicationsForSelectedJob.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Applicant</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {applicationsForSelectedJob.map(app => {
                                                const student = getStudentById(app.studentId);
                                                return (
                                                    <tr key={app.id}>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student?.name}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><StatusBadge status={app.status} /></td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                            <select value={app.status} onChange={(e) => updateApplicationStatus(app.id, e.target.value)} className="p-1 border rounded">
                                                                {Object.values(ApplicationStatus).map(s => <option key={s} value={s}>{s}</option>)}
                                                            </select>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            ) : <p className="text-center text-gray-500 py-8">No applicants for this job yet.</p>
                        ) : <p className="text-center text-gray-400 py-8">Please select a job posting from the left panel.</p>}
                    </Card>
                </div>
            </div>

            <Modal isOpen={isJobModalOpen} onClose={() => setIsJobModalOpen(false)} title="Post a New Job">
                <form onSubmit={handlePostJob} className="space-y-4">
                    <Input label="Job Title" value={newJob.title} onChange={e => setNewJob({ ...newJob, title: e.target.value })} required />
                    <Input label="Location" value={newJob.location} onChange={e => setNewJob({ ...newJob, location: e.target.value })} required />
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea value={newJob.description} onChange={e => setNewJob({ ...newJob, description: e.target.value })} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-corporate-blue-500 focus:border-corporate-blue-500 sm:text-sm h-24"></textarea>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700">Requirements</label>
                        <textarea value={newJob.requirements} onChange={e => setNewJob({ ...newJob, requirements: e.target.value })} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-corporate-blue-500 focus:border-corporate-blue-500 sm:text-sm h-24"></textarea>
                    </div>
                    <div className="flex justify-end space-x-2 pt-4">
                        <Button variant="secondary" type="button" onClick={() => setIsJobModalOpen(false)}>Cancel</Button>
                        <Button type="submit">Post Job</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default EmployerDashboard;
