
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { UserRole, ApplicationStatus } from '../types';
import { seedData } from '../constants';

const LOCAL_STORAGE_KEY = 'placementProData';

// AppContextType definition moved to comments for reference
// - currentUser: User | null
// - login(email, password): boolean
// - logout(): void
// - data: PlacementProData
// - users, jobs, applications arrays
// - CRUD operations
// - showToast(message, type): void

export const AppContext = createContext(undefined);

export const AppProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [data, setData] = useState(() => {
        try {
            const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
            return storedData ? JSON.parse(storedData) : seedData;
        } catch (error) {
            console.error("Failed to parse localStorage data:", error);
            return seedData;
        }
    });
    const [toasts, setToasts] = useState([]);

    // Persist data to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
    }, [data]);

    // Check for a logged-in user on initial load
    useEffect(() => {
        try {
            const loggedInUser = sessionStorage.getItem('currentUser');
            if (loggedInUser) {
                setCurrentUser(JSON.parse(loggedInUser));
            }
        } catch (error) {
            console.error("Failed to parse sessionStorage user:", error);
            sessionStorage.removeItem('currentUser');
        }
    }, []);

    const generateId = (prefix) => `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    // Auth functions
    const login = (email, password) => {
        const user = data.users.find(u => u.email === email && u.password === password);
        if (user) {
            setCurrentUser(user);
            sessionStorage.setItem('currentUser', JSON.stringify(user));
            showToast('Login successful!', 'success');
            return true;
        }
        showToast('Invalid email or password.', 'error');
        return false;
    };

    const logout = () => {
        setCurrentUser(null);
        sessionStorage.removeItem('currentUser');
        showToast('Logged out successfully.', 'success');
    };

    // UI functions
    const showToast = useCallback((message, type = 'success') => {
        const id = Date.now();
        setToasts(prev => [...prev, { message, type, id }]);
        setTimeout(() => {
            setToasts(currentToasts => currentToasts.filter(toast => toast.id !== id));
        }, 3000);
    }, []);

    // CRUD functions
    const addUser = (user) => {
        const newUser = { ...user, id: generateId('user') };
        setData(prev => ({ ...prev, users: [...prev.users, newUser] }));
        showToast('User created successfully!', 'success');
    };
    
    const updateUser = (updatedUser) => {
        setData(prev => ({
            ...prev,
            users: prev.users.map(u => u.id === updatedUser.id ? updatedUser : u)
        }));
        showToast('User updated successfully!', 'success');
    };

    const deleteUser = (userId) => {
        setData(prev => ({
            ...prev,
            users: prev.users.filter(u => u.id !== userId)
        }));
        showToast('User deleted.', 'success');
    };

    const addJob = (job) => {
        const newJob = { ...job, id: generateId('job') };
        setData(prev => ({ ...prev, jobs: [...prev.jobs, newJob] }));
        showToast('Job posted successfully!', 'success');
    };

    const updateJob = (updatedJob) => {
        setData(prev => ({
            ...prev,
            jobs: prev.jobs.map(j => j.id === updatedJob.id ? updatedJob : j)
        }));
        showToast('Job updated successfully!', 'success');
    };

    const deleteJob = (jobId) => {
        setData(prev => ({
            ...prev,
            jobs: prev.jobs.filter(j => j.id !== jobId),
            applications: prev.applications.filter(a => a.jobId !== jobId)
        }));
        showToast('Job deleted.', 'success');
    };
    
    const addApplication = (app) => {
        if (!currentUser || currentUser.role !== UserRole.Student) {
            showToast('Only students can apply.', 'error');
            return;
        }
        const existingApplication = data.applications.find(a => a.studentId === currentUser.id && a.jobId === app.jobId);
        if (existingApplication) {
            showToast('You have already applied for this job.', 'error');
            return;
        }
        const newApp = { ...app, id: generateId('app') };
        setData(prev => ({ ...prev, applications: [...prev.applications, newApp] }));
        showToast('Application submitted successfully!', 'success');
    };

    const updateApplicationStatus = (applicationId, status) => {
        setData(prev => ({
            ...prev,
            applications: prev.applications.map(a => a.id === applicationId ? { ...a, status } : a)
        }));
        showToast(`Application status updated to ${status}.`, 'success');
    };

    const contextValue = {
        currentUser,
        login,
        logout,
        data,
        users: data.users,
        jobs: data.jobs,
        applications: data.applications,
        addUser,
        updateUser,
        deleteUser,
        addJob,
        updateJob,
        deleteJob,
        addApplication,
        updateApplicationStatus,
        showToast,
    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
            <div className="fixed bottom-4 right-4 z-50 space-y-2">
                {toasts.map(toast => (
                    <div key={toast.id} className={`animate-slide-in-up px-4 py-2 rounded-lg shadow-lg text-white ${toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
                        {toast.message}
                    </div>
                ))}
            </div>
        </AppContext.Provider>
    );
};
