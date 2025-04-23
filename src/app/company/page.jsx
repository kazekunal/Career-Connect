"use client"

import React, { useState, useEffect } from "react"
import { Building2, Users, Briefcase, Mail, Plus, Eye, Edit, Trash2, MessageCircle, Video } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea" // Import Textarea component
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import JobPostingForm from "@/components/postJobs"

// Define possible application statuses - ensure this matches the status options in the job application component
const APPLICATION_STATUSES = ["New", "Reviewed", "Shortlisted", "Interviewed", "Hired", "Rejected"];
const LOCAL_STORAGE_JOBS_KEY = 'jobPostings';
const LOCAL_STORAGE_APPLICANTS_KEY = 'jobApplicants';
const LOCAL_STORAGE_APPLICANT_COUNT_KEY = 'applicantCount';
const GOOGLE_MEET_LINK = "https://meet.google.com/smj-ubzi-dsi";

export default function CompanyDashboardPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isApplicantsDialogOpen, setIsApplicantsDialogOpen] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [applicantCount, setApplicantCount] = useState(0);
  const [jobToEdit, setJobToEdit] = useState(null);
  const [selectedJobApplicants, setSelectedJobApplicants] = useState([]);
  const [selectedJobTitle, setSelectedJobTitle] = useState("");
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [feedbackValues, setFeedbackValues] = useState({}); // Track feedback values in a state object
  const [meetingSent, setMeetingSent] = useState({}); // Track which applicants have been sent a meeting link

  // --- LocalStorage Helper Functions ---
  const getFromLocalStorage = (key, defaultValue) => {
    if (typeof window === 'undefined') return defaultValue; // Avoid SSR errors
    const storedValue = localStorage.getItem(key);
    try {
      return storedValue ? JSON.parse(storedValue) : defaultValue;
    } catch (error) {
      console.error(`Error parsing localStorage key "${key}":`, error);
      return defaultValue;
    }
  };

  const saveToLocalStorage = (key, value) => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error saving to localStorage key "${key}":`, error);
    }
  };

  // Load jobs and applicant count from localStorage on component mount
  useEffect(() => {
    const storedJobs = getFromLocalStorage(LOCAL_STORAGE_JOBS_KEY, []);
    setJobs(storedJobs);
    
    // Calculate applicant count from actual data
    const allApplicants = getFromLocalStorage(LOCAL_STORAGE_APPLICANTS_KEY, {});
    recalculateTotalApplicants(allApplicants);
  }, []);

  // This function will be passed to the JobPostingForm component to update our jobs state
  const updateJobs = (updatedJobs) => {
    setJobs(updatedJobs);
    // No need to save here, JobPostingForm handles saving its own updates
  };

  const handleEditJob = (job) => {
    setJobToEdit(job);
    setIsDialogOpen(true);
  };

  const handleDeleteJob = (jobId) => {
    if (window.confirm('Are you sure you want to delete this job posting and all associated applicants?')) {
      const updatedJobs = jobs.filter(job => job.id !== jobId);
      setJobs(updatedJobs);
      saveToLocalStorage(LOCAL_STORAGE_JOBS_KEY, updatedJobs);

      // Also remove applicants for this job
      const allApplicants = getFromLocalStorage(LOCAL_STORAGE_APPLICANTS_KEY, {});
      delete allApplicants[jobId];
      saveToLocalStorage(LOCAL_STORAGE_APPLICANTS_KEY, allApplicants);
      // Recalculate total applicant count after deletion
      recalculateTotalApplicants(allApplicants);
    }
  };

  const handleViewApplicants = (job) => {
    const allApplicants = getFromLocalStorage(LOCAL_STORAGE_APPLICANTS_KEY, {});
    const jobApplicants = allApplicants[job.id] || [];

    setSelectedJobApplicants(jobApplicants);
    setSelectedJobTitle(job.title);
    setSelectedJobId(job.id); // Store the job ID
    
    // Initialize feedback values state from applicants data
    const initialFeedbackValues = {};
    jobApplicants.forEach(applicant => {
      initialFeedbackValues[applicant.id] = applicant.feedback || '';
    });
    setFeedbackValues(initialFeedbackValues);
    
    // Initialize meeting sent state from applicants data
    const initialMeetingSent = {};
    jobApplicants.forEach(applicant => {
      initialMeetingSent[applicant.id] = applicant.meetingSent || false;
    });
    setMeetingSent(initialMeetingSent);
    
    setIsApplicantsDialogOpen(true);
  };

  // Recalculate and save total applicant count
  const recalculateTotalApplicants = (applicantsData) => {
    const totalApplicants = Object.values(applicantsData).reduce((sum, jobApplicants) =>
      sum + jobApplicants.length, 0);
    setApplicantCount(totalApplicants);
    saveToLocalStorage(LOCAL_STORAGE_APPLICANT_COUNT_KEY, totalApplicants);
  };

  // Update applicant counts when jobs change
  useEffect(() => {
    if (jobs.length >= 0) {
      const currentApplicants = getFromLocalStorage(LOCAL_STORAGE_APPLICANTS_KEY, {});
      recalculateTotalApplicants(currentApplicants);
    }
  }, [jobs]); // Rerun when jobs array changes

  const getApplicantCountForJob = (jobId) => {
    const allApplicants = getFromLocalStorage(LOCAL_STORAGE_APPLICANTS_KEY, {});
    return allApplicants[jobId] ? allApplicants[jobId].length : 0;
  };

  // --- Function to handle status change ---
  const handleApplicantStatusChange = (applicantId, newStatus) => {
    if (!selectedJobId) return; // Should not happen if dialog is open

    const allApplicants = getFromLocalStorage(LOCAL_STORAGE_APPLICANTS_KEY, {});
    const jobApplicants = allApplicants[selectedJobId] || [];

    // Find and update the specific applicant
    const updatedJobApplicants = jobApplicants.map(applicant => {
      if (applicant.id === applicantId) {
        return { ...applicant, status: newStatus };
      }
      return applicant;
    });

    // Update the state for immediate UI feedback
    setSelectedJobApplicants(updatedJobApplicants);

    // Update the full applicants object and save to localStorage
    const updatedAllApplicants = {
      ...allApplicants,
      [selectedJobId]: updatedJobApplicants,
    };
    saveToLocalStorage(LOCAL_STORAGE_APPLICANTS_KEY, updatedAllApplicants);
    
    // Update the user's applications status as well to keep them in sync
    const userApplications = getFromLocalStorage('userApplications', []);
    const updatedUserApplications = userApplications.map(application => {
      if (application.applicationId === applicantId) {
        return { ...application, status: newStatus };
      }
      return application;
    });
    saveToLocalStorage('userApplications', updatedUserApplications);
  };

  // --- New function to handle feedback changes ---
  const handleFeedbackChange = (applicantId, feedback) => {
    // Update local state for immediate feedback
    setFeedbackValues(prev => ({
      ...prev,
      [applicantId]: feedback
    }));
  };

  // --- Function to save feedback to localStorage ---
  const saveFeedback = (applicantId) => {
    if (!selectedJobId) return;

    const feedback = feedbackValues[applicantId] || '';
    const allApplicants = getFromLocalStorage(LOCAL_STORAGE_APPLICANTS_KEY, {});
    const jobApplicants = allApplicants[selectedJobId] || [];

    // Find and update the specific applicant with feedback
    const updatedJobApplicants = jobApplicants.map(applicant => {
      if (applicant.id === applicantId) {
        return { ...applicant, feedback };
      }
      return applicant;
    });

    // Update the selected job applicants state for immediate UI feedback
    setSelectedJobApplicants(updatedJobApplicants);

    // Update the full applicants object and save to localStorage
    const updatedAllApplicants = {
      ...allApplicants,
      [selectedJobId]: updatedJobApplicants,
    };
    saveToLocalStorage(LOCAL_STORAGE_APPLICANTS_KEY, updatedAllApplicants);
  };

  // --- New function to handle sending Google Meet link ---
  const sendMeetingLink = (applicantId) => {
    if (!selectedJobId) return;

    const allApplicants = getFromLocalStorage(LOCAL_STORAGE_APPLICANTS_KEY, {});
    const jobApplicants = allApplicants[selectedJobId] || [];

    // Find and update the specific applicant with meeting sent status
    const updatedJobApplicants = jobApplicants.map(applicant => {
      if (applicant.id === applicantId) {
        return { ...applicant, meetingSent: true };
      }
      return applicant;
    });

    // Update the meeting sent state for immediate UI feedback
    setMeetingSent(prev => ({
      ...prev,
      [applicantId]: true
    }));

    // Update the selected job applicants state
    setSelectedJobApplicants(updatedJobApplicants);

    // Update the full applicants object and save to localStorage
    const updatedAllApplicants = {
      ...allApplicants,
      [selectedJobId]: updatedJobApplicants,
    };
    saveToLocalStorage(LOCAL_STORAGE_APPLICANTS_KEY, updatedAllApplicants);

    // In a real application, this would send an email to the applicant
    console.log(`Meeting link ${GOOGLE_MEET_LINK} sent to applicant ${applicantId}`);
  };

  // --- Get status color utility ---
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

  // Get recent activities based on actual applicant data
  const getRecentActivities = () => {
    const allApplicants = getFromLocalStorage(LOCAL_STORAGE_APPLICANTS_KEY, {});
    let activities = [];
    
    // Convert all applicants to activities with jobId reference
    Object.entries(allApplicants).forEach(([jobId, applicants]) => {
      applicants.forEach(applicant => {
        const job = jobs.find(j => j.id === jobId);
        if (job) {
          activities.push({
            type: 'application',
            jobTitle: job.title,
            applicantName: applicant.name,
            date: new Date(applicant.appliedDate),
            status: applicant.status,
            id: applicant.id
          });
        }
      });
    });
    
    // Sort by date (newest first) and take top 5
    return activities
      .sort((a, b) => b.date - a.date)
      .slice(0, 5);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="mb-10 flex flex-wrap justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome to Your Company Dashboard</h1>
          <p className="text-gray-600">Manage your job postings and applicants.</p>
        </div>

        {/* Post/Edit Job Dialog Trigger */}
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) setJobToEdit(null); // Reset edit state when closing
        }}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
              <Plus size={18} />
              Post Job
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>{jobToEdit ? "Edit Job Posting" : "Post New Job Opening"}</DialogTitle>
              <DialogDescription>
                {jobToEdit
                  ? "Update the details of your job posting below."
                  : "Fill out the form below to create a new job posting."}
              </DialogDescription>
            </DialogHeader>
            <JobPostingForm
              updateParentJobs={updateJobs} // Pass the state updater
              initialJobData={jobToEdit}
              allJobs={jobs} // Pass all current jobs for validation/saving
              storageKey={LOCAL_STORAGE_JOBS_KEY} // Pass storage key
              onSubmitSuccess={() => {
                setIsDialogOpen(false);
                setJobToEdit(null);
                // Jobs state is updated via updateParentJobs callback inside JobPostingForm
              }}
            />
          </DialogContent>
        </Dialog>

        {/* Applicants Dialog - No Trigger here, opened via button on job card */}
        <Dialog open={isApplicantsDialogOpen} onOpenChange={setIsApplicantsDialogOpen}>
          <DialogContent className="sm:max-w-3xl"> {/* Increased max width slightly */}
            <DialogHeader>
              <DialogTitle>Applicants for: {selectedJobTitle}</DialogTitle>
              <DialogDescription>
                {selectedJobApplicants.length} applicant(s) found. You can update their status and add feedback below.
              </DialogDescription>
            </DialogHeader>

            <div className="max-h-[60vh] overflow-y-auto p-1"> {/* Adjusted max height */}
              {selectedJobApplicants.length === 0 ? (
                <p className="text-center py-8 text-gray-500">No applicants yet for this position.</p>
              ) : (
                <div className="space-y-6 py-4">
                  {selectedJobApplicants.map((applicant) => (
                    <Card key={applicant.id} className="bg-white shadow-sm border border-gray-200">
                      <CardContent className="p-4">
                        {/* Applicant Details */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                          <div className="flex-grow">
                            <h3 className="font-semibold text-base text-gray-900">{applicant.name}</h3>
                            <p className="text-sm text-blue-600 hover:underline">
                              <a href={`mailto:${applicant.email}`}>{applicant.email}</a>
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              Applied: {new Date(applicant.appliedDate).toLocaleDateString()}
                            </p>
                          </div>

                          {/* Status Badge and Selector */}
                          <div className="flex items-center gap-3 w-full sm:w-auto mt-2 sm:mt-0">
                            <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getStatusColor(applicant.status)}`}>
                              {applicant.status}
                            </span>
                            <Select
                              value={applicant.status}
                              onValueChange={(newStatus) => handleApplicantStatusChange(applicant.id, newStatus)}
                            >
                              <SelectTrigger className="w-full sm:w-[150px] h-9 text-xs">
                                <SelectValue placeholder="Change Status" />
                              </SelectTrigger>
                              <SelectContent>
                                {APPLICATION_STATUSES.map(statusOption => (
                                  <SelectItem key={statusOption} value={statusOption} className="text-xs">
                                    {statusOption}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        {/* Google Meet Button */}
                        <div className="mt-3 mb-3 flex justify-end">
                          <Button
                            size="sm"
                            className={meetingSent[applicant.id] ? 
                              "bg-green-600 hover:bg-green-700 text-xs flex items-center gap-1" : 
                              "bg-blue-600 hover:bg-blue-700 text-xs flex items-center gap-1"}
                            onClick={() => sendMeetingLink(applicant.id)}
                            disabled={meetingSent[applicant.id]}
                          >
                            <Video size={14} />
                            {meetingSent[applicant.id] ? "Meeting Link Sent" : "Send Google Meet Link"}
                          </Button>
                        </div>
                        
                        {/* Feedback Section */}
                        <div className="mt-3 border-t pt-3 border-gray-100">
                          <div className="flex items-center gap-2 mb-2">
                            <MessageCircle size={16} className="text-gray-500" />
                            <h4 className="text-sm font-medium text-gray-700">Recruiter Feedback</h4>
                          </div>
                          <Textarea
                            placeholder="Add notes about this candidate..."
                            className="w-full text-sm resize-y min-h-[80px]"
                            value={feedbackValues[applicant.id] || ''}
                            onChange={(e) => handleFeedbackChange(applicant.id, e.target.value)}
                          />
                          <div className="flex justify-end mt-2">
                            <Button 
                              size="sm" 
                              onClick={() => saveFeedback(applicant.id)}
                              className="bg-green-600 hover:bg-green-700 text-xs"
                            >
                              Save Feedback
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-end pt-4 mt-4 border-t border-gray-200">
              <Button variant="outline" onClick={() => setIsApplicantsDialogOpen(false)}>
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </header>

      {/* Dashboard Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <DashboardCard
          icon={<Users className="h-6 w-6 text-blue-600" />}
          title="Total Applicants"
          value={applicantCount.toString()}
        />
        <DashboardCard
          icon={<Briefcase className="h-6 w-6 text-green-600" />}
          title="Open Roles"
          value={jobs.length.toString()}
        />
        {/* Hardcoded values - replace with real data if available */}
        <DashboardCard
          icon={<Building2 className="h-6 w-6 text-purple-600" />}
          title="Departments"
          value="5"
        />
        <DashboardCard
          icon={<Mail className="h-6 w-6 text-yellow-600" />}
          title="Messages"
          value="89"
        />
      </section>

       {/* Recent Activity - Now dynamic based on actual application data */}
      <section className="mb-10">
        <Card className="shadow">
           <CardHeader>
             <CardTitle className="text-xl">Recent Activity</CardTitle>
           </CardHeader>
           <CardContent>
             <ul className="space-y-4 text-gray-700">
               {getRecentActivities().length > 0 ? (
                 getRecentActivities().map((activity, index) => (
                   <li key={index}>
                     {activity.status === "New" ? "✅" : 
                      activity.status === "Hired" ? "🎉" : 
                      activity.status === "Rejected" ? "❌" : "🔄"} 
                     {activity.applicantName} {activity.status === "New" ? "applied for" : 
                                               `status updated to '${activity.status}' for`} the {activity.jobTitle} role.
                   </li>
                 ))
               ) : (
                 <li>No recent activities to display.</li>
               )}
             </ul>
           </CardContent>
         </Card>
      </section>

      {/* Job Listings Section */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Posted Jobs ({jobs.length})</h2>
        {jobs.length === 0 ? (
          <Card className="shadow-sm border border-gray-200">
            <CardContent className="p-6 text-center text-gray-500">
                No job postings yet. Click the "Post Job" button above to create your first listing.
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {jobs.map((job) => (
              <Card key={job.id} className="shadow-md overflow-hidden border border-gray-200 flex flex-col">
                <CardHeader className="bg-gray-50 p-4 border-b border-gray-200">
                  <div className="flex justify-between items-start gap-2">
                    <CardTitle className="text-lg font-semibold text-gray-800">{job.title}</CardTitle>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full whitespace-nowrap">
                       {job.location || "Remote"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{job.company}</p>
                </CardHeader>
                <CardContent className="p-4 flex-grow flex flex-col justify-between">
                  <div>
                      <div className="mb-3">
                        <h4 className="font-semibold text-sm text-gray-600 mb-1">Description:</h4>
                        <p className="text-sm text-gray-700 line-clamp-3">{job.description}</p>
                      </div>

                      <div className="mb-3">
                        <h4 className="font-semibold text-sm text-gray-600 mb-1">Requirements:</h4>
                        <p className="text-sm text-gray-700 line-clamp-2">{job.eligibility}</p>
                      </div>

                      <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-gray-500 mt-4 mb-4">
                        {job.salary && <span>💰 {job.salary}</span>}
                        {job.deadline && <span>⏰ Apply by: {new Date(job.deadline).toLocaleDateString()}</span>}
                        <span>📅 Posted: {new Date(job.postedDate).toLocaleDateString()}</span>
                        <span>👥 Applicants: {getApplicantCountForJob(job.id)}</span>
                      </div>
                  </div>

                  <div className="mt-4 flex justify-end gap-2 border-t border-gray-100 pt-4">
                    <Button
                      variant="outline"
                      size="sm" // Smaller buttons
                      className="flex items-center gap-1 text-blue-600 border-blue-500 hover:bg-blue-50"
                      onClick={() => handleViewApplicants(job)}
                      disabled={getApplicantCountForJob(job.id) === 0} // Disable if no applicants
                    >
                      <Eye size={14} />
                      View Applicants
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1 text-yellow-700 border-yellow-500 hover:bg-yellow-50"
                      onClick={() => handleEditJob(job)}
                    >
                      <Edit size={14}/> {/* Optional: Add Edit icon */}
                      Edit
                    </Button>
                    <Button
                      variant="destructive" // Use destructive variant for delete
                      size="sm"
                      className="flex items-center gap-1" // bg/text handled by variant
                      onClick={() => handleDeleteJob(job.id)}
                    >
                       <Trash2 size={14}/> {/* Optional: Add Trash icon */}
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

// Reusable DashboardCard component (no changes needed here)
function DashboardCard({ icon, title, value }) {
  return (
    <Card className="shadow-sm border border-gray-200">
      <CardContent className="p-5 flex items-center gap-4">
        <div className="bg-gray-100 p-3 rounded-full flex items-center justify-center">
          {icon}
        </div>
        <div>
          <p className="text-sm text-gray-600 font-medium">{title}</p>
          <h2 className="text-2xl font-bold text-gray-800">{value}</h2>
        </div>
      </CardContent>
    </Card>
  )
}