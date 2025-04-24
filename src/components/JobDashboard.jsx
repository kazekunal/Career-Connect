"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Video, Building, User, CalendarClock } from "lucide-react";
import AppliedJobs from "@/components/applied";
import ApplicationDetails from "@/components/ApplicationDetails";

function JobDashboard() {
  const [selectedJob, setSelectedJob] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const storedJobs = localStorage.getItem("jobPostings");
    const jobs = storedJobs ? JSON.parse(storedJobs) : [];
    setAppliedJobs(jobs);

    const userApplications = localStorage.getItem("userApplications");
    const applications = userApplications ? JSON.parse(userApplications) : [];

    const jobApplicantsData = localStorage.getItem("jobApplicants");
    const jobApplicants = jobApplicantsData ? JSON.parse(jobApplicantsData) : {};

    const upcomingInterviews = [];

    // For each job that the user has applied to
    applications.forEach((application) => {
      const jobId = application.jobId;
      const job = jobs.find((j) => j.id === jobId);
      
      if (job) {
        // Check if any interview has been scheduled for this job application
        const jobApplicantsList = jobApplicants[jobId] || [];
        
        // Find if there's any applicant entry with meetingSent = true for this job
        const hasInterview = jobApplicantsList.some(applicant => {
          // If applicant has a meeting sent status, add it to interviews
          return applicant.meetingSent === true;
        });
        
        if (hasInterview) {
          upcomingInterviews.push({
            id: application.applicationId,
            jobId: application.jobId,
            jobTitle: job.title || "Unknown Position",
            company: job.company || "Unknown Company",
            meetLink: "https://meet.google.com/smj-ubzi-dsi", // Default meet link
            interviewDate: new Date(Date.now() + 86400000), // Tomorrow
            interviewTime: "10:00 AM", // Default time
          });
        }
      }
    });

    setInterviews(upcomingInterviews);

    const intervalId = setInterval(() => {
      setRefreshKey((prevKey) => prevKey + 1);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [refreshKey]);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Job Applications Dashboard</h1>

      <Tabs defaultValue="applied" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="applied">Applied Jobs</TabsTrigger>
          <TabsTrigger value="interviews">Interviews</TabsTrigger>
        </TabsList>

        <TabsContent value="applied" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <AppliedJobs onJobSelect={(job) => setSelectedJob(job)} />
            </div>
            <div className="lg:col-span-2">
              {selectedJob ? (
                <ApplicationDetails selectedJob={selectedJob} />
              ) : (
                <div className="h-full flex items-center justify-center border rounded-lg p-8 bg-gray-50">
                  <div className="text-center">
                    <h3 className="text-lg font-medium text-gray-700 mb-2">
                      Select a job to view application details
                    </h3>
                    <p className="text-gray-500">
                      Click on any job listing to view your application status and details
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="interviews">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Upcoming Interviews</h2>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {interviews.length} {interviews.length === 1 ? "Interview" : "Interviews"} Scheduled
              </span>
            </div>

            {interviews.length === 0 ? (
              <div className="p-8 text-center bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="text-lg font-medium text-gray-700 mb-2">No interviews scheduled yet</h3>
                <p className="text-gray-500">When employers schedule interviews, they will appear here</p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                {interviews.map((interview, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardHeader className="bg-blue-50 pb-3">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg font-semibold">{interview.jobTitle}</CardTitle>
                      </div>
                      <p className="text-sm text-gray-600">{interview.company}</p>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4 text-gray-500" />
                          <p className="text-sm text-gray-700">
                            <span className="font-medium">Company:</span> {interview.company}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-gray-500" />
                          <p className="text-sm text-gray-700">
                            <span className="font-medium">Role:</span> {interview.jobTitle}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <p className="text-sm text-gray-700">
                            <span className="font-medium">Date:</span> {interview.interviewDate.toLocaleDateString()}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <p className="text-sm text-gray-700">
                            <span className="font-medium">Time:</span> {interview.interviewTime}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <CalendarClock className="h-4 w-4 text-gray-500" />
                          <p className="text-sm text-gray-700">
                            <span className="font-medium">Status:</span>{" "}
                            <span className="text-green-600 font-medium">Confirmed</span>
                          </p>
                        </div>

                        <div className="pt-3 border-t border-gray-100">
                          <Button
                            className="w-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center gap-2"
                            onClick={() => window.open(interview.meetLink, "_blank")}
                          >
                            <Video className="h-4 w-4" />
                            Join Google Meet Interview
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
              <h3 className="font-medium text-yellow-800 mb-2 flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
                    clipRule="evenodd"
                  />
                </svg>
                Interview Tips
              </h3>
              <ul className="text-sm text-yellow-800 list-disc list-inside space-y-1">
                <li>Join the meeting 5 minutes early to test your audio and video</li>
                <li>Prepare your workspace - ensure good lighting and minimal background distractions</li>
                <li>Have a copy of your resume and the job description nearby</li>
                <li>Prepare questions to ask your interviewer about the role and company</li>
                <li>Follow up with a thank you email after the interview</li>
              </ul>
            </div>
          </div>
        </TabsContent>
        kunal passan hello world this is done
      </Tabs>
    </div>
  );
}

export default JobDashboard;