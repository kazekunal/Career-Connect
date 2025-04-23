import { useState, useEffect } from 'react';
import { Calendar, Clock, FileText, Mail, Phone, CheckCircle } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

export default function ApplicationDetails({ selectedJob }) {
  const [applicationData, setApplicationData] = useState(null);
  
  useEffect(() => {
    if (selectedJob) {
      // Get application details from localStorage
      const allApplicants = JSON.parse(localStorage.getItem('jobApplicants') || '{}');
      const jobApplicants = allApplicants[selectedJob.id] || [];
      
      // Assuming the last application is the current user's
      const latestApplication = jobApplicants[jobApplicants.length - 1] || {};
      
      setApplicationData({
        ...latestApplication,
        formattedDate: formatDate(latestApplication.appliedDate || new Date().toISOString())
      });
    }
  }, [selectedJob]);
  
  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (e) {
      return "Recently";
    }
  };
  
  if (!selectedJob) {
    return (
      <div className="h-full flex items-center justify-center border rounded-lg p-8 bg-gray-50">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Select an application to view details</h3>
          <p className="text-gray-500">Click on any application to view complete details</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{selectedJob.title}</h2>
            <p className="text-gray-600 flex items-center gap-1">
              {selectedJob.company} • {selectedJob.location}
            </p>
          </div>
          <div>
            <Badge className="bg-green-100 text-green-800 border-green-200">
              {applicationData?.status || "Submitted"}
            </Badge>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-sm text-gray-500">Applied On</p>
            <p className="text-gray-700 flex items-center gap-1">
              <Calendar className="h-4 w-4" /> {applicationData?.formattedDate}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Resume Submitted</p>
            <p className="text-gray-700 flex items-center gap-1">
              <FileText className="h-4 w-4" /> {applicationData?.resumeFilename || "resume.pdf"}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Experience Level</p>
            <p className="text-gray-700">{selectedJob.experienceLevel}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Job Type</p>
            <p className="text-gray-700">{selectedJob.workType}</p>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg border">
            <h3 className="font-semibold text-lg mb-3">Your Application Details</h3>
            
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500 mb-1">Applicant Name</p>
                <p className="text-gray-700">{applicationData?.name}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-1">Contact Information</p>
                <p className="text-gray-700 flex items-center gap-1">
                  <Mail className="h-4 w-4 text-gray-400" /> {applicationData?.email}
                </p>
                <p className="text-gray-700 flex items-center gap-1">
                  <Phone className="h-4 w-4 text-gray-400" /> {applicationData?.phone}
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-1">Application Status</p>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">{applicationData?.status || "Submitted"}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-2">Job Description</h3>
            <p className="text-gray-700">{selectedJob.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}