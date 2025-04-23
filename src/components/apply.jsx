"use client"

import { useState, useEffect } from "react";
import { Upload, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

// Helper function to format program name (optional, could be passed as prop or defined here)
const formatProgramName = (programCode) => {
  switch (programCode) {
    case 'cs': return 'Computer Science';
    case 'it': return 'Information Technology';
    case 'ee': return 'Electrical Engineering';
    case 'me': return 'Mechanical Engineering';
    case 'ce': return 'Civil Engineering';
    case 'business': return 'Business Administration';
    default: return 'my field';
  }
};

export function ApplyDialog({ 
  open, 
  onOpenChange, 
  selectedJob, 
  studentProfile, 
  initialResumeFile, // Pass the File object if available
  initialResumeName, // Pass the name from localStorage
  onApplicationSubmit // Callback function to handle submission in parent
}) {
  const [applicationData, setApplicationData] = useState({
    name: "",
    email: "",
    phone: "",
    coverLetter: "",
    resumeFile: null, // This will hold the File object for submission
  });
  const [resumeName, setResumeName] = useState(""); // Display name for the UI
  const [applicationErrors, setApplicationErrors] = useState({});

  // Effect to pre-populate form when dialog opens or profile changes
  useEffect(() => {
    if (open && selectedJob) {
      let initialCoverLetter = `Dear Hiring Manager,\n\nI am excited to apply for the ${selectedJob.title} position at ${selectedJob.company}.`;
      let initialResume = initialResumeFile;
      let initialNameDisplay = initialResumeName;

      if (studentProfile) {
        initialCoverLetter += ` With my background in ${formatProgramName(studentProfile.program)} and skills in ${studentProfile.skills || 'relevant areas'}, I believe I would be a great fit for this role.\n\n${studentProfile.bio || ''}\n\nI look forward to discussing how my qualifications align with your needs.\n\nBest regards,\n${studentProfile.fullName}`;
        
        setApplicationData({
          name: studentProfile.fullName || "",
          email: studentProfile.email || "",
          phone: studentProfile.phone || "",
          coverLetter: initialCoverLetter,
          resumeFile: initialResume, // Use the initial file from props
        });
        setResumeName(initialNameDisplay || ""); // Use initial name from props
      } else {
        // Reset if no profile or job changes significantly
        setApplicationData({
          name: "",
          email: "",
          phone: "",
          coverLetter: initialCoverLetter + "\n\nI look forward to discussing how my qualifications align with your needs.\n\nBest regards,\n[Your Name]",
          resumeFile: initialResume,
        });
         setResumeName(initialNameDisplay || "");
      }
       // Reset errors when dialog opens
      setApplicationErrors({});
    }
  }, [open, selectedJob, studentProfile, initialResumeFile, initialResumeName]); // Rerun effect if these change


  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setApplicationData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error for this field if it exists
    if (applicationErrors[name]) {
      setApplicationErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Update the actual file object in state
      setApplicationData(prev => ({
        ...prev,
        resumeFile: file 
      }));
      // Update the display name
      setResumeName(file.name);

      // Clear error for resumeFile if it exists
      if (applicationErrors.resumeFile) {
        setApplicationErrors(prev => ({
          ...prev,
          resumeFile: null
        }));
      }
    }
  };

  // Validate application form
  const validateForm = () => {
    const errors = {};
    if (!applicationData.name.trim()) errors.name = "Name is required";
    if (!applicationData.email.trim()) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(applicationData.email)) errors.email = "Email is invalid";
    if (!applicationData.phone.trim()) errors.phone = "Phone number is required";
    if (!applicationData.coverLetter.trim()) errors.coverLetter = "Cover letter is required";
    // Check if resumeFile exists in applicationData (File object)
    if (!applicationData.resumeFile) errors.resumeFile = "Resume is required"; 

    setApplicationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle submission attempt
  const handleSubmit = () => {
    if (!validateForm()) return;

    // Call the callback function passed from JobListings
    // Pass the validated application data (including the File object)
    if (onApplicationSubmit) {
      onApplicationSubmit(applicationData);
    }
  };

  if (!selectedJob) return null; // Don't render if no job is selected

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Apply for {selectedJob.title}</DialogTitle>
          <DialogDescription>
            {studentProfile ?
              "We've pre-filled your application with information from your profile. You can review and edit before submitting." :
              "Complete the application form below to apply for this position."}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Name and Email */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="text-sm font-medium">
                Full Name *
              </Label>
              <Input
                id="name"
                name="name"
                value={applicationData.name}
                onChange={handleInputChange}
                className={applicationErrors.name ? "border-red-500" : ""}
              />
              {applicationErrors.name && (
                <p className="text-red-500 text-xs mt-1">{applicationErrors.name}</p>
              )}
            </div>
            <div>
              <Label htmlFor="email" className="text-sm font-medium">
                Email Address *
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={applicationData.email}
                onChange={handleInputChange}
                className={applicationErrors.email ? "border-red-500" : ""}
              />
              {applicationErrors.email && (
                <p className="text-red-500 text-xs mt-1">{applicationErrors.email}</p>
              )}
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <Label htmlFor="phone" className="text-sm font-medium">
              Phone Number *
            </Label>
            <Input
              id="phone"
              name="phone"
              value={applicationData.phone}
              onChange={handleInputChange}
              className={applicationErrors.phone ? "border-red-500" : ""}
            />
            {applicationErrors.phone && (
              <p className="text-red-500 text-xs mt-1">{applicationErrors.phone}</p>
            )}
          </div>

          {/* Cover Letter */}
          <div>
            <Label htmlFor="coverLetter" className="text-sm font-medium">
              Cover Letter *
            </Label>
            <Textarea
              id="coverLetter"
              name="coverLetter"
              value={applicationData.coverLetter}
              onChange={handleInputChange}
              rows={6}
              placeholder="Why are you interested in this position and why do you think you'd be a good fit?"
              className={applicationErrors.coverLetter ? "border-red-500" : ""}
            />
            {applicationErrors.coverLetter && (
              <p className="text-red-500 text-xs mt-1">{applicationErrors.coverLetter}</p>
            )}
          </div>

          {/* Resume Upload */}
          <div>
            <Label htmlFor="resume-upload-input" className="text-sm font-medium">
              {resumeName ? "Your Resume" : "Upload Resume *"}
            </Label>
            <div className="mt-1">
              {resumeName ? (
                // Display existing/uploaded resume name
                <div className="flex items-center space-x-2 p-2 border rounded-md bg-gray-50">
                  <FileText className="w-5 h-5 text-blue-500" />
                  <span className="flex-1 text-sm truncate">{resumeName}</span>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => document.getElementById('resume-upload-input').click()}
                  >
                    Change
                  </Button>
                </div>
              ) : (
                // Show upload area if no resume is selected/loaded
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="resume-upload-input"
                    className={`flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 ${
                      applicationErrors.resumeFile ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-2 text-gray-400" />
                      <p className="mb-1 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">PDF, DOC, or DOCX (MAX. 2MB)</p>
                    </div>
                  </label>
                </div>
              )}
              {/* Hidden file input */}
              <input
                id="resume-upload-input" // Changed ID to avoid conflict if label `for` was also 'resume'
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={handleFileUpload}
              />
              {/* Error message */}
              {applicationErrors.resumeFile && !resumeName && ( // Show error only if no file is displayed
                <p className="text-red-500 text-xs mt-1">{applicationErrors.resumeFile}</p>
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button type="button" onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700">
            Submit Application
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}