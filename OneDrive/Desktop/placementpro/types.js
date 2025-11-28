
export const UserRole = {
  Admin: 'admin',
  Student: 'student',
  Employer: 'employer',
  PlacementOfficer: 'placement_officer'
};

export const ApplicationStatus = {
  Applied: 'Applied',
  Shortlisted: 'Shortlisted',
  Interview: 'Interview',
  Offered: 'Offered',
  Rejected: 'Rejected'
};

// No interfaces in plain JS, but keeping these as documentation
// UserProfile: { companyName?, resumeUrl?, skills? }
// User: { id, email, password, role, name, profile }
// Job: { id, employerId, title, companyName, location, description, requirements, postedAt }
// Application: { id, jobId, studentId, status, appliedAt }
// PlacementProData: { users[], jobs[], applications[] }
