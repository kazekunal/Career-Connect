"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StudentProfile } from "@/components/student-profile"
import { JobListings } from "@/components/joblist"
import { StudentHeader } from "@/components/student-header"
import { ProfileCompletionAlert } from "@/components/profile-completion-alert"

export default function StudentDashboard() {
  const [profileComplete, setProfileComplete] = useState(false)

  // Check if profile is complete by checking localStorage
  useEffect(() => {
    const checkProfileStatus = () => {
      const savedProfile = localStorage.getItem("studentProfile")
      const savedResume = localStorage.getItem("studentResumeName")

      // Consider profile complete if both profile data and resume exist
      if (savedProfile && savedResume) {
        setProfileComplete(true)
      } else {
        setProfileComplete(false)
      }
    }

    checkProfileStatus()

    // Listen for storage changes
    window.addEventListener("storage", checkProfileStatus)

    return () => {
      window.removeEventListener("storage", checkProfileStatus)
    }
  }, [])

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col">
      <StudentHeader />

      <main className="flex-1 container mx-auto p-4 md:p-6">
        {!profileComplete && <ProfileCompletionAlert />}

        <Tabs defaultValue="jobs" className="mt-6">
          <TabsList className="grid w-full md:w-[400px] grid-cols-2">
            <TabsTrigger value="jobs">Job Listings</TabsTrigger>
            <TabsTrigger value="profile">My Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="jobs" className="mt-6">
            <JobListings />
          </TabsContent>

          <TabsContent value="profile" className="mt-6">
            <StudentProfile onProfileUpdate={() => setProfileComplete(true)} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
