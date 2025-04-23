"use client"

import { useState, useEffect } from "react"
import { ChevronDown, Search, Filter, Clock, Upload, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { JobDetails } from "./jobdet"

import { ApplyDialog } from "./apply"
import AppliedJobs from './applied';
import ApplicationDetails from './ApplicationDetails';

export function JobListings() {
  const [jobListings, setJobListings] = useState([])
  const [selectedJob, setSelectedJob] = useState(null)
  const [showJobDetails, setShowJobDetails] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterLocation, setFilterLocation] = useState("all")
  const [filterWorkType, setFilterWorkType] = useState("all")
  const [filterCategory, setFilterCategory] = useState("all")
  const [savedJobs, setSavedJobs] = useState([])
  const [appliedJobs, setAppliedJobs] = useState([])
  
  // Student profile data
  const [studentProfile, setStudentProfile] = useState(null)
  const [resumeName, setResumeName] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
 

    useEffect(() => {
      const base64 = localStorage.getItem("studentResumeBase64");
      const name = localStorage.getItem("studentResumeName");

      if (base64 && name) {
        const byteString = atob(base64.split(',')[1]);
        const mimeString = base64.split(',')[0].split(':')[1].split(';')[0];

        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }

        const blob = new Blob([ab], { type: mimeString });
        const file = new File([blob], name, { type: mimeString });

        setResumeFile(file);
        setResumeName(name);
      }
    }, []);

 
  // Application dialog state
  const [applyDialogOpen, setApplyDialogOpen] = useState(false)
  // Load jobs, saved/applied jobs, and student profile from localStorage on component mount
  useEffect(() => {
    // Load jobs
    const storedJobs = localStorage.getItem('jobPostings')
    if (storedJobs) {
      const parsedJobs = JSON.parse(storedJobs)
     
      // Transform job data from company format to job listing format
      const transformedJobs = parsedJobs.map(job => ({
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
      }))
     
      setJobListings(transformedJobs)
     
      // Set the first job as selected if available
      if (transformedJobs.length > 0) {
        setSelectedJob(transformedJobs[0])
        setShowJobDetails(true)
      }
    }

    // Load saved and applied jobs
    const storedSavedJobs = localStorage.getItem('savedJobs')
    if (storedSavedJobs) {
      setSavedJobs(JSON.parse(storedSavedJobs))
    }

    const storedAppliedJobs = localStorage.getItem('appliedJobs')
    if (storedAppliedJobs) {
      setAppliedJobs(JSON.parse(storedAppliedJobs))
    }
    
    // Load student profile
    const storedProfile = localStorage.getItem('studentProfile')
    if (storedProfile) {
      setStudentProfile(JSON.parse(storedProfile))
    }
    
    // Load resume name
    const storedResumeName = localStorage.getItem('studentResumeName')
    if (storedResumeName) {
      setResumeName(storedResumeName)
    }
  }, [])

  // Helper functions to extract/format job data
  const getDaysLeft = (deadline) => {
    const deadlineDate = new Date(deadline)
    const today = new Date()
    const diffTime = deadlineDate - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays > 0 ? diffDays : 1
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }
 
  const getExperienceLevel = (eligibility) => {
    const lowerEligibility = eligibility.toLowerCase()
    if (lowerEligibility.includes("senior") || lowerEligibility.includes("5+ years") || lowerEligibility.includes("lead")) {
      return "Senior Level"
    } else if (lowerEligibility.includes("3+ years") || lowerEligibility.includes("mid")) {
      return "Mid Level"
    } else if (lowerEligibility.includes("entry") || lowerEligibility.includes("junior") || lowerEligibility.includes("1-3 years") || lowerEligibility.includes("1 year")) {
      return "Entry Level"
    } else if (lowerEligibility.includes("intern")) {
      return "Internship"
    } else {
      return "Experienced Professionals"
    }
  }
 
  const getWorkType = (description) => {
    const lowerDesc = description.toLowerCase()
    if (lowerDesc.includes("part-time") || lowerDesc.includes("part time")) {
      return "Part-time"
    } else if (lowerDesc.includes("contract") || lowerDesc.includes("freelance")) {
      return "Contract"
    } else if (lowerDesc.includes("intern") || lowerDesc.includes("internship")) {
      return "Internship"
    } else {
      return "Full-time"
    }
  }
 
  const getJobCategory = (title) => {
    const lowerTitle = title.toLowerCase()
    if (lowerTitle.includes("engineer") || lowerTitle.includes("developer") || lowerTitle.includes("software")) {
      return "Engineering"
    } else if (lowerTitle.includes("design") || lowerTitle.includes("ui") || lowerTitle.includes("ux")) {
      return "Design"
    } else if (lowerTitle.includes("marketing") || lowerTitle.includes("content") || lowerTitle.includes("seo")) {
      return "Marketing"
    } else if (lowerTitle.includes("sales") || lowerTitle.includes("account")) {
      return "Sales"
    } else {
      return "Development"
    }
  }

  // Handle search input
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  // Filter jobs based on search and filters
  const filteredJobs = jobListings.filter(job => {
    // Search filter
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase())
   
    // Location filter
    const matchesLocation = filterLocation === "all" ||
      job.location.toLowerCase().includes(filterLocation.toLowerCase())
   
    // Work type filter
    const matchesWorkType = filterWorkType === "all" ||
      job.workType.toLowerCase() === filterWorkType.toLowerCase()
   
    // Category filter
    const matchesCategory = filterCategory === "all" ||
      job.category.toLowerCase() === filterCategory.toLowerCase()
   
    return matchesSearch && matchesLocation && matchesWorkType && matchesCategory
  })

  // Handlers for filter changes
  const handleLocationChange = (value) => {
    setFilterLocation(value)
  }

  const handleWorkTypeChange = (value) => {
    setFilterWorkType(value)
  }

  const handleCategoryChange = (value) => {
    setFilterCategory(value)
  }

  // Open the apply dialog and pre-populate with student profile data
  // Inside JobListings component
const handleOpenApplyDialog = () => {
  setApplyDialogOpen(true); 

};
 // This function will be passed as a prop to ApplyDialog
const handleActualApplicationSubmit = (submittedData) => {
  // submittedData contains { name, email, phone, coverLetter, resumeFile }

  if (!selectedJob) return; 

  console.log("Submitting application:", submittedData); // For debugging

  // --- Core Logic (remains in JobListings) ---

  // 1. Update applied jobs state and localStorage
  const updatedAppliedJobs = [...appliedJobs, selectedJob.id];
  setAppliedJobs(updatedAppliedJobs);
  localStorage.setItem('appliedJobs', JSON.stringify(updatedAppliedJobs));

  // 2. Update jobApplicants in localStorage
  const allApplicants = JSON.parse(localStorage.getItem('jobApplicants') || '{}');
  if (!allApplicants[selectedJob.id]) {
    allApplicants[selectedJob.id] = [];
  }

  allApplicants[selectedJob.id].push({
    id: `applicant-<span class="math-inline">\{selectedJob\.id\}\-</span>{Date.now()}`,
    name: submittedData.name,
    email: submittedData.email,
    phone: submittedData.phone,
    // Note: You might want to store the cover letter too if needed later
    appliedDate: new Date().toISOString(),
    status: "New",
    // Use the name from the submitted File object
    resumeFilename: submittedData.resumeFile?.name || "resume.pdf" 
  });

  localStorage.setItem('jobApplicants', JSON.stringify(allApplicants));

  // 3. Update applicant count (optional, but good practice)
  const totalApplicants = Object.values(allApplicants).reduce((sum, jobApplicants) =>
    sum + jobApplicants.length, 0);
  localStorage.setItem('applicantCount', JSON.stringify(totalApplicants));

  // --- End Core Logic ---

  // 4. Close the dialog
  setApplyDialogOpen(false);

  // 5. Show success message
  alert(`Your application for ${selectedJob.title} at ${selectedJob.company} has been submitted successfully!`);

  
};

  // Save/bookmark a job
  const handleSaveJob = (jobId) => {
    const updatedSavedJobs = [...savedJobs, jobId]
    setSavedJobs(updatedSavedJobs)
    localStorage.setItem('savedJobs', JSON.stringify(updatedSavedJobs))
    alert("Job saved to your bookmarks!")
  }

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search jobs by title, company, or keywords"
              className="pl-10"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button variant="outline" className="gap-2">
            Jobs <ChevronDown className="h-4 w-4" />
          </Button>

          <Button variant="outline" className="gap-2">
            Salary (High to Low)
          </Button>

          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" /> Filters <Badge className="ml-1 bg-blue-600">{
              (filterLocation !== "all" ? 1 : 0) +
              (filterWorkType !== "all" ? 1 : 0) +
              (filterCategory !== "all" ? 1 : 0)
            }</Badge>
          </Button>

          <Select onValueChange={handleLocationChange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="bengaluru">Bengaluru</SelectItem>
              <SelectItem value="hyderabad">Hyderabad</SelectItem>
              <SelectItem value="pune">Pune</SelectItem>
              <SelectItem value="mumbai">Mumbai</SelectItem>
              <SelectItem value="delhi">Delhi</SelectItem>
              <SelectItem value="remote">Remote</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={handleWorkTypeChange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Work Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="full-time">Full-time</SelectItem>
              <SelectItem value="part-time">Part-time</SelectItem>
              <SelectItem value="contract">Contract</SelectItem>
              <SelectItem value="internship">Internship</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="engineering">Engineering</SelectItem>
              <SelectItem value="development">Development</SelectItem>
              <SelectItem value="design">Design</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="sales">Sales</SelectItem>
            </SelectContent>
          </Select>

          <Button className="bg-blue-600 hover:bg-blue-700">Quick Apply</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <Tabs defaultValue="all">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="all">All Jobs</TabsTrigger>
              <TabsTrigger value="saved">Saved</TabsTrigger>
              
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {filteredJobs.length === 0 ? (
                <div className="text-center p-8 text-gray-500">
                  No job listings found matching your criteria.
                </div>
              ) : (
                filteredJobs.map((job) => (
                  <Card
                    key={job.id}
                    className={`border cursor-pointer hover:border-blue-300 transition-colors ${selectedJob?.id === job.id ? "border-blue-500 bg-blue-50" : ""}`}
                    onClick={() => {
                      setSelectedJob(job)
                      setShowJobDetails(true)
                    }}
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
                          <div className="text-xs text-gray-500 mb-1">Job</div>
                          <h3 className="font-medium text-blue-600">{job.title}</h3>
                          <p className="text-sm text-gray-600">{job.company}</p>

                          <div className="flex items-center mt-2">
                            <Clock className="h-4 w-4 text-gray-400 mr-1" />
                            <span className="text-sm text-gray-500">{job.daysLeft} days left</span>
                          </div>

                          <div className="mt-2">
                            <Badge variant="outline" className="text-xs bg-gray-50">
                              {job.experienceLevel}
                            </Badge>
                            <Badge variant="outline" className="text-xs bg-gray-50 ml-1">
                              {job.location}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>

            <TabsContent value="saved" className="p-4 text-center text-gray-500">
              {savedJobs.length === 0 ? (
                "You haven't saved any jobs yet."
              ) : (
                <div className="space-y-4">
                  {jobListings
                    .filter(job => savedJobs.includes(job.id))
                    .map(job => (
                      <Card
                        key={job.id}
                        className="border cursor-pointer hover:border-blue-300 transition-colors"
                        onClick={() => {
                          setSelectedJob(job)
                          setShowJobDetails(true)
                        }}
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
                              <h3 className="font-medium text-blue-600">{job.title}</h3>
                              <p className="text-sm text-gray-600">{job.company}</p>
                              <div className="flex items-center mt-2">
                                <Clock className="h-4 w-4 text-gray-400 mr-1" />
                                <span className="text-sm text-gray-500">{job.daysLeft} days left</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        <div className="lg:col-span-2">
          {showJobDetails && selectedJob ? (
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
                    <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                      {selectedJob.workType}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-gray-500">Experience Level</p>
                    <p className="text-gray-700">{selectedJob.experienceLevel}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Salary Range</p>
                    <p className="text-gray-700">{selectedJob.salary}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Updated On</p>
                    <p className="text-gray-700">{selectedJob.updatedOn}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Application Deadline</p>
                    <p className="text-gray-700">{selectedJob.daysLeft} days left</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Job Description</h3>
                    <p className="text-gray-700">{selectedJob.description}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-2">Key Responsibilities</h3>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700">
                      {selectedJob.responsibilities.map((resp, idx) => (
                        <li key={idx}>{resp}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-2">Qualifications</h3>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700">
                      {selectedJob.qualifications.map((qual, idx) => (
                        <li key={idx}>{qual}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <Button
                    className="bg-blue-600 hover:bg-blue-700 flex-1"
                    onClick={handleOpenApplyDialog}
                    disabled={appliedJobs.includes(selectedJob.id)}
                  >
                    {appliedJobs.includes(selectedJob.id) ? 'Applied' : 'Apply Now'}
                  </Button>
                  <Button
                    variant="outline"
                    className="border-blue-600 text-blue-600 hover:bg-blue-50"
                    onClick={() => handleSaveJob(selectedJob.id)}
                    disabled={savedJobs.includes(selectedJob.id)}
                  >
                    {savedJobs.includes(selectedJob.id) ? 'Saved' : 'Save Job'}
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center border rounded-lg p-8 bg-gray-50">
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-700 mb-2">Select a job to view details</h3>
                <p className="text-gray-500">Click on any job listing to view complete details</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <ApplyDialog
          open={applyDialogOpen}
          onOpenChange={setApplyDialogOpen} // Function to open/close dialog
          selectedJob={selectedJob}         // Currently selected job details
          studentProfile={studentProfile}   // Student profile data
          initialResumeFile={resumeFile}    // Pass the File object loaded from localStorage
          initialResumeName={resumeName}    // Pass the resume name loaded from localStorage
          onApplicationSubmit={handleActualApplicationSubmit} // Callback for submission
        />
    </div>
  )
}