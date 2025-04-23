'use client'
import { useState, useEffect } from 'react';
import { Filter, User, Briefcase, MessageSquare, ThumbsUp, ThumbsDown } from 'lucide-react';

// Constants to match your application
const LOCAL_STORAGE_JOBS_KEY = 'jobPostings';
const LOCAL_STORAGE_APPLICANTS_KEY = 'jobApplicants';
const APPLICATION_STATUSES = ["New", "Reviewed", "Shortlisted", "Interviewed", "Hired", "Rejected"];

export default function AdminPanel() {
  const [feedbackList, setFeedbackList] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [applicantData, setApplicantData] = useState({});
  const [activeTab, setActiveTab] = useState('placements');
  const [filterStatus, setFilterStatus] = useState('all');
  const [jobFilter, setJobFilter] = useState('all');

  useEffect(() => {
    // Load feedback data
    const storedFeedback = localStorage.getItem("studentFeedback");
    if (storedFeedback) {
      setFeedbackList(JSON.parse(storedFeedback));
    }

    // Load jobs data
    const storedJobs = localStorage.getItem(LOCAL_STORAGE_JOBS_KEY);
    if (storedJobs) {
      setJobs(JSON.parse(storedJobs));
    }

    // Load applicants data
    const storedApplicants = localStorage.getItem(LOCAL_STORAGE_APPLICANTS_KEY);
    if (storedApplicants) {
      setApplicantData(JSON.parse(storedApplicants));
    }
  }, []);

  // Get unique job IDs for filtering
  const jobIds = Object.keys(applicantData);

  // Get all applicants across all jobs
  const getAllApplicants = () => {
    let allApplicants = [];

    // If we're filtering by a specific job
    if (jobFilter !== 'all') {
      return applicantData[jobFilter] || [];
    }

    // Otherwise, combine all applicants from all jobs
    Object.entries(applicantData).forEach(([jobId, applicants]) => {
      // Add jobId to each applicant for reference
      const applicantsWithJobId = applicants.map(applicant => ({
        ...applicant,
        jobId
      }));
      allApplicants = [...allApplicants, ...applicantsWithJobId];
    });

    return allApplicants;
  };

  // Filter applicants by status
  const getFilteredApplicants = () => {
    const applicants = getAllApplicants();
    
    if (filterStatus === 'all') {
      return applicants;
    }
    
    return applicants.filter(applicant => applicant.status === filterStatus);
  };

  // Get job title by id
  const getJobTitle = (jobId) => {
    const job = jobs.find(j => j.id === jobId);
    return job ? job.title : `Job ${jobId}`;
  };

  // Count stats for dashboard
  const totalApplicants = getAllApplicants().length;
  
  // Use the actual statuses from your application
  const getStatusCounts = () => {
    const applicants = getAllApplicants();
    const counts = {};
    
    APPLICATION_STATUSES.forEach(status => {
      counts[status] = applicants.filter(app => app.status === status).length;
    });
    
    return counts;
  };

  const statusCounts = getStatusCounts();

  // Helper function to get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'Hired': return 'bg-emerald-100 text-emerald-800';
      case 'Shortlisted': return 'bg-green-100 text-green-800';
      case 'Interviewed': return 'bg-cyan-100 text-cyan-800';
      case 'Reviewed': return 'bg-yellow-100 text-yellow-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      case 'New':
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">Admin Panel - Placement Management System</h1>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto flex flex-col md:flex-row flex-1 p-4">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-white p-4 rounded-lg shadow mb-4 md:mb-0 md:mr-4">
          <nav>
            <ul>
              <li>
                <button 
                  onClick={() => setActiveTab('dashboard')}
                  className={`flex items-center p-3 w-full text-left rounded-md ${activeTab === 'dashboard' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
                >
                  <User className="mr-2" size={18} />
                  Dashboard
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('placements')}
                  className={`flex items-center p-3 w-full text-left rounded-md ${activeTab === 'placements' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
                >
                  <Briefcase className="mr-2" size={18} />
                  Placement Reports
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('feedback')}
                  className={`flex items-center p-3 w-full text-left rounded-md ${activeTab === 'feedback' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
                >
                  <MessageSquare className="mr-2" size={18} />
                  Student Feedback
                </button>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Panel */}
        <main className="flex-1 bg-white p-6 rounded-lg shadow">
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Placement Dashboard Overview</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <p className="text-gray-600">Total Applicants</p>
                  <p className="text-3xl font-bold">{totalApplicants}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                  <p className="text-gray-600">Hired</p>
                  <p className="text-3xl font-bold text-green-600">{statusCounts.Hired || 0}</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                  <p className="text-gray-600">Rejected</p>
                  <p className="text-3xl font-bold text-red-600">{statusCounts.Rejected || 0}</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Status Breakdown</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {APPLICATION_STATUSES.map(status => (
                    <div key={status} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <div className="flex justify-between">
                        <p className="font-medium">{status}</p>
                        <span className={`px-2 py-1 rounded text-sm ${getStatusColor(status)}`}>
                          {statusCounts[status] || 0}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Job Listings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {jobIds.map(jobId => {
                    const applicants = applicantData[jobId] || [];
                    const hiredCount = applicants.filter(a => a.status === 'Hired').length;
                    return (
                      <div key={jobId} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <h4 className="font-medium">{getJobTitle(jobId)}</h4>
                        <p>Total Applicants: {applicants.length}</p>
                        <p>Hired: {hiredCount}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Recent Feedbacks</h3>
                {feedbackList.length > 0 ? (
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <p className="italic">{feedbackList[feedbackList.length - 1]?.message}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Received: {new Date(feedbackList[feedbackList.length - 1]?.timestamp).toLocaleString()}
                    </p>
                  </div>
                ) : (
                  <p className="text-gray-500">No feedback available</p>
                )}
              </div>
            </div>
          )}

          {/* Placement Reports Tab */}
          {activeTab === 'placements' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Placement Reports</h2>
                
                <div className="flex space-x-2">
                  {/* Job Filter */}
                  <div className="relative">
                    <select 
                      className="appearance-none bg-white border rounded-md py-2 pl-3 pr-8 text-gray-700"
                      value={jobFilter}
                      onChange={(e) => setJobFilter(e.target.value)}
                    >
                      <option value="all">All Jobs</option>
                      {jobIds.map(jobId => (
                        <option key={jobId} value={jobId}>{getJobTitle(jobId)}</option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <Filter size={14} />
                    </div>
                  </div>
                  
                  {/* Status Filter */}
                  <div className="relative">
                    <select 
                      className="appearance-none bg-white border rounded-md py-2 pl-3 pr-8 text-gray-700"
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                    >
                      <option value="all">All Status</option>
                      {APPLICATION_STATUSES.map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <Filter size={14} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Table of Applicants */}
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="py-2 px-4 border text-left">Applicant ID</th>
                      <th className="py-2 px-4 border text-left">Job Title</th>
                      <th className="py-2 px-4 border text-left">Name</th>
                      <th className="py-2 px-4 border text-left">Applied Date</th>
                      <th className="py-2 px-4 border text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getFilteredApplicants().length > 0 ? (
                      getFilteredApplicants().map((applicant, index) => (
                        <tr key={applicant.id || index} className="hover:bg-gray-50">
                          <td className="py-2 px-4 border">{applicant.jobId}</td>
                          <td className="py-2 px-4 border">{getJobTitle(applicant.jobId)}</td>
                          <td className="py-2 px-4 border">{applicant.name || 'N/A'}</td>
                          <td className="py-2 px-4 border">
                            {applicant.appliedDate ? new Date(applicant.appliedDate).toLocaleDateString() : 'N/A'}
                          </td>
                          <td className="py-2 px-4 border">
                            <span className={`px-2 py-1 rounded text-sm ${getStatusColor(applicant.status)}`}>
                              {applicant.status || 'New'}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="py-4 text-center text-gray-500">
                          No applicants match the current filters
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Student Feedback Tab */}
          {activeTab === 'feedback' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Student Feedback</h2>
              
              {feedbackList.length > 0 ? (
                <div className="space-y-4">
                  {feedbackList.map((item, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <p className="text-gray-800">{item.message}</p>
                      <div className="flex justify-between items-center mt-2">
                        <p className="text-sm text-gray-500">
                          {new Date(item.timestamp).toLocaleString()}
                        </p>
                        <div className="flex space-x-2">
                          <button className="text-gray-500 hover:text-blue-500">
                            <ThumbsUp size={16} />
                          </button>
                          <button className="text-gray-500 hover:text-red-500">
                            <ThumbsDown size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-gray-50 p-8 rounded-lg border border-gray-200 text-center">
                  <p className="text-gray-500">No feedback has been submitted yet.</p>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}