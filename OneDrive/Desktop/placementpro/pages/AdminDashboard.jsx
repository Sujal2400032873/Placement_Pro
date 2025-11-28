
import React, { useState } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { Card, Button, Modal, Input } from '../components/ui';
import { UserRole } from '../types';

const AdminDashboard = () => {
    const { users, jobs, deleteUser, deleteJob, addUser } = useAppContext();
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: UserRole.Student });

    const handleCreateUser = (e) => {
        e.preventDefault();
        addUser({ ...newUser, profile: {} });
        setIsUserModalOpen(false);
        setNewUser({ name: '', email: '', password: '', role: UserRole.Student });
    };

    return (
        <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            </header>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* User Management */}
                <Card>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">User Management</h2>
                        <Button onClick={() => setIsUserModalOpen(true)}>Create User</Button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {users.map(user => (
                                    <tr key={user.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{user.role.replace('_', ' ')}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <Button variant="danger" onClick={() => deleteUser(user.id)} size="sm">Delete</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>

                {/* Job Management */}
                <Card>
                    <h2 className="text-xl font-bold mb-4">Job Postings Management</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {jobs.map(job => (
                                    <tr key={job.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{job.title}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.companyName}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <Button variant="danger" onClick={() => deleteJob(job.id)} size="sm">Delete</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>

            <Modal isOpen={isUserModalOpen} onClose={() => setIsUserModalOpen(false)} title="Create New User">
                <form onSubmit={handleCreateUser} className="space-y-4">
                    <Input label="Full Name" value={newUser.name} onChange={e => setNewUser({...newUser, name: e.target.value})} required />
                    <Input label="Email" type="email" value={newUser.email} onChange={e => setNewUser({...newUser, email: e.target.value})} required />
                    <Input label="Password" type="password" value={newUser.password} onChange={e => setNewUser({...newUser, password: e.target.value})} required />
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Role</label>
                        <select
                            value={newUser.role}
                            onChange={e => setNewUser({...newUser, role: e.target.value})}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-corporate-blue-500 focus:border-corporate-blue-500 sm:text-sm"
                        >
                            {Object.values(UserRole).map(role => <option key={role} value={role}>{role.replace('_', ' ')}</option>)}
                        </select>
                    </div>
                    <div className="flex justify-end space-x-2 pt-4">
                        <Button variant="secondary" type="button" onClick={() => setIsUserModalOpen(false)}>Cancel</Button>
                        <Button type="submit">Create User</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default AdminDashboard;
