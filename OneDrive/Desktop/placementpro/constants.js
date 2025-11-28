
import { UserRole, ApplicationStatus } from './types';

// Using a simple unique ID generator for client-side data.
// In a real DB, this would be handled by the database.
const generateId = (prefix) => `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

export const seedData = {
  users: [
    { id: generateId('user'), email: 'admin@placementpro.com', password: 'password', role: UserRole.Admin, name: 'Admin User', profile: {} },
    { id: generateId('user'), email: 'student@placementpro.com', password: 'password', role: UserRole.Student, name: 'Alice Student', profile: { resumeUrl: 'https://example.com/resume.pdf', skills: ['React', 'JavaScript', 'Node.js'] } },
    { id: generateId('user'), email: 'employer@placementpro.com', password: 'password', role: UserRole.Employer, name: 'Bob Employer', profile: { companyName: 'Tech Solutions Inc.' } },
    { id: generateId('user'), email: 'officer@placementpro.com', password: 'password', role: UserRole.PlacementOfficer, name: 'Charlie Officer', profile: {} },
  ],
  jobs: [
    {
      id: generateId('job'),
      employerId: '', // Will be set dynamically based on employer user
      title: 'Frontend Developer',
      companyName: 'Tech Solutions Inc.',
      location: 'Remote',
      description: 'Developing and maintaining user-facing features using React.js.',
      requirements: '2+ years of experience with React and JavaScript.',
      postedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: generateId('job'),
      employerId: '', // Will be set dynamically
      title: 'Backend Engineer',
      companyName: 'Data Systems LLC',
      location: 'New York, NY',
      description: 'Design and implement scalable backend services.',
      requirements: 'Experience with Node.js, Express, and databases.',
      postedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
    },
  ],
  applications: [],
};

// Dynamically assign employerId to jobs based on the seed employer user
const employerUser = seedData.users.find(u => u.role === UserRole.Employer);
if (employerUser) {
  seedData.jobs.forEach(job => {
    job.employerId = employerUser.id;
    job.companyName = employerUser.profile.companyName || job.companyName;
  });
}

// Create a seed application
const studentUser = seedData.users.find(u => u.role === UserRole.Student);
const firstJob = seedData.jobs[0];
if (studentUser && firstJob) {
    seedData.applications.push({
        id: generateId('app'),
        jobId: firstJob.id,
        studentId: studentUser.id,
        status: ApplicationStatus.Applied,
        appliedAt: new Date().toISOString()
    });
}
