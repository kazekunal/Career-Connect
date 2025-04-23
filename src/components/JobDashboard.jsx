// components/JobDashboard.jsx
"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AppliedJobs from "@/components/applied";
import ApplicationDetails from "@/components/ApplicationDetails";

function JobDashboard() {
  const [selectedJob, setSelectedJob] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    const storedSavedJobs = localStorage.getItem('savedJobs');
    if (storedSavedJobs) {
      setSavedJobs(JSON.parse(storedSavedJobs));
    }

    const storedAppliedJobs = localStorage.getItem('appliedJobs');
    if (storedAppliedJobs) {
      setAppliedJobs(JSON.parse(storedAppliedJobs));
    }
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Job Applications Dashboard</h1>

      <Tabs defaultValue="applied" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="applied">Applied Jobs</TabsTrigger>
          <TabsTrigger value="saved">Saved Jobs</TabsTrigger>
          <TabsTrigger value="interviews">Interviews</TabsTrigger>
        </TabsList>

        <TabsContent value="applied" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <AppliedJobs
                onJobSelect={(job) => {
                  setSelectedJob(job);
                }}
              />
            </div>
            <div className="lg:col-span-2">
              {selectedJob ? (
                <ApplicationDetails selectedJob={selectedJob} />
              ) : (
                <div className="h-full flex items-center justify-center border rounded-lg p-8 bg-gray-50">
                  <div className="text-center">
                    <h3 className="text-lg font-medium text-gray-700 mb-2">Select a job to view application details</h3>
                    <p className="text-gray-500">Click on any job listing to view your application status and details</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="saved">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p>Saved jobs content will go here</p>
          </div>
        </TabsContent>

        <TabsContent value="interviews">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p>Interviews content will go here</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default JobDashboard;