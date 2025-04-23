"use client"
import { useState, useEffect } from 'react';
import { Clock, Calendar, CheckCircle } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function AppliedJobs({ onJobSelect }) {
  const [appliedJobDetails, setAppliedJobDetails] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get applied job IDs from localStorage
    const appliedJobIds = JSON.parse(localStorage.getItem('appliedJobs') || '[]');
    
    // Get all jobs data from localStorage (from jobPostings as shown in your code)
    const storedJobs = localStorage.getItem('jobPostings');
    
    if (storedJobs && appliedJobIds.length > 0) {
      const allJobs = JSON.parse(storedJobs);
      
      // Transform job data from company format to job listing format (matching your existing transformation)
      const transformedJobs = allJobs.map(job => ({
        id: job.id,
        title: job.title,
        company: job.company,
        logo: "/placeholder.svg?height=40&width=40",
        location: job.location || "Remote",
        daysLeft: job.deadline ? getDaysLeft(job.deadline) : 30,
        experienceLevel: getExperienceLevel(job.eligibility),
        updatedOn: job.postedDate ? formatDate(job.postedDate) : "Recent",
        description: job.description,
        responsibilities: job.description.split('\n').filter(line => line.trim()),
        qualifications: job.eligibility.split('\n').filter(line => line.trim()),
        salary: job.salary || "Competitive",
        workType: getWorkType(job.description),
        category: getJobCategory(job.title)
      }));
      
      // Filter to only include applied jobs
      const matchedAppliedJobs = transformedJobs.filter(job => appliedJobIds.includes(job.id));
      
      // Get application details
      const allApplicants = JSON.parse(localStorage.getItem('jobApplicants') || '{}');
      
      // Add application data to each job
      const jobsWithApplicationData = matchedAppliedJobs.map(job => {
        const jobApplicants = allApplicants[job.id] || [];
        const latestApplication = jobApplicants[jobApplicants.length - 1] || {};
        
        return {
          ...job,
          applicationDate: latestApplication.appliedDate || new Date().toISOString(),
          applicationStatus: latestApplication.status || "Submitted",
          applicantData: latestApplication
        };
      });
      
      setAppliedJobDetails(jobsWithApplicationData);
      
      // Set the first job as selected if available
      if (jobsWithApplicationData.length > 0) {
        setSelectedApplication(jobsWithApplicationData[0]);
        if (onJobSelect) onJobSelect(jobsWithApplicationData[0]);
      }
    }
    
    setIsLoading(false);
  }, []);

  // Helper functions copied from your JobListings component
  const getDaysLeft = (deadline) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getExperienceLevel = (eligibility) => {
    const lowerEligibility = eligibility.toLowerCase();
    if (lowerEligibility.includes("senior") || lowerEligibility.includes("5+ years") || lowerEligibility.includes("lead")) {
      return "Senior Level";
    } else if (lowerEligibility.includes("3+ years") || lowerEligibility.includes("mid")) {
      return "Mid Level";
    } else if (lowerEligibility.includes("entry") || lowerEligibility.includes("junior") || lowerEligibility.includes("1-3 years") || lowerEligibility.includes("1 year")) {
      return "Entry Level";
    } else if (lowerEligibility.includes("intern")) {
      return "Internship";
    } else {
      return "Experienced Professionals";
    }
  };

  const getWorkType = (description) => {
    const lowerDesc = description.toLowerCase();
    if (lowerDesc.includes("part-time") || lowerDesc.includes("part time")) {
      return "Part-time";
    } else if (lowerDesc.includes("contract") || lowerDesc.includes("freelance")) {
      return "Contract";
    } else if (lowerDesc.includes("intern") || lowerDesc.includes("internship")) {
      return "Internship";
    } else {
      return "Full-time";
    }
  };

  const getJobCategory = (title) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes("engineer") || lowerTitle.includes("developer") || lowerTitle.includes("software")) {
      return "Engineering";
    } else if (lowerTitle.includes("design") || lowerTitle.includes("ui") || lowerTitle.includes("ux")) {
      return "Design";
    } else if (lowerTitle.includes("marketing") || lowerTitle.includes("content") || lowerTitle.includes("seo")) {
      return "Marketing";
    } else if (lowerTitle.includes("sales") || lowerTitle.includes("account")) {
      return "Sales";
    } else {
      return "Development";
    }
  };

  // Format application date for display
  const formatApplicationDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (e) {
      return "Recently";
    }
  };

  const handleSelectApplication = (job) => {
    setSelectedApplication(job);
    if (onJobSelect) onJobSelect(job);
  };

  if (isLoading) {
    return <div className="text-center py-6">Loading your applications...</div>;
  }

  if (appliedJobDetails.length === 0) {
    return (
      <div className="text-center p-8 text-gray-500">
        You haven't applied to any jobs yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {appliedJobDetails.map(job => (
        <Card
          key={job.id}
          className={`border cursor-pointer hover:border-blue-300 transition-colors ${
            selectedApplication?.id === job.id ? "border-blue-500 bg-blue-50" : ""
          }`}
          onClick={() => handleSelectApplication(job)}
        >
          <CardContent className="p-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-md overflow-hidden">
                <img
                  src={job.logo || "/placeholder.svg"}
                  alt={job.company}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1">
                <div className="text-xs text-gray-500 mb-1">Applied Job</div>
                <h3 className="font-medium text-blue-600">{job.title}</h3>
                <p className="text-sm text-gray-600">{job.company}</p>

                <div className="flex items-center mt-2">
                  <Clock className="h-4 w-4 text-gray-400 mr-1" />
                  <span className="text-sm text-gray-500">Applied on {formatApplicationDate(job.applicationDate)}</span>
                </div>

                <div className="mt-2">
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                    {job.applicationStatus}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}