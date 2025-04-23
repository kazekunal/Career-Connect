"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StudentProfile } from "@/components/student-profile"
import { JobListings } from "@/components/joblist"
import { StudentHeader } from "@/components/student-header"
import { ProfileCompletionAlert } from "@/components/profile-completion-alert"
import JobDashboard from "@/components/JobDashboard"
import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

export default function StudentDashboard() {
  const [profileComplete, setProfileComplete] = useState(false)
  const [feedback, setFeedback] = useState("")

  useEffect(() => {
    const checkProfileStatus = () => {
      const savedProfile = localStorage.getItem("studentProfile")
      const savedResume = localStorage.getItem("studentResumeName")

      if (savedProfile && savedResume) {
        setProfileComplete(true)
      } else {
        setProfileComplete(false)
      }
    }

    checkProfileStatus()
    window.addEventListener("storage", checkProfileStatus)

    return () => {
      window.removeEventListener("storage", checkProfileStatus)
    }
  }, [])

  const handleFeedbackSubmit = () => {
    const storedFeedback = localStorage.getItem("studentFeedback")
    const feedbackList = storedFeedback ? JSON.parse(storedFeedback) : []
  
    const newFeedback = {
      message: feedback,
      timestamp: new Date().toISOString(),
    }
  
    feedbackList.push(newFeedback)
    localStorage.setItem("studentFeedback", JSON.stringify(feedbackList))
  
    setFeedback("")
    alert("Thanks for your feedback!")
  }
  

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col">
      <StudentHeader />

      <main className="flex-1 container mx-auto p-4 md:p-6 relative">
        {!profileComplete && <ProfileCompletionAlert />}

       

        <Tabs defaultValue="jobs" className="mt-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <TabsList className="grid w-full md:w-[400px] grid-cols-3">
            <TabsTrigger value="jobs">Job Listings</TabsTrigger>
            <TabsTrigger value="profile">My Profile</TabsTrigger>
            <TabsTrigger value="applied">My Applications</TabsTrigger>
          </TabsList>
          <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Give Feedback</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>We’d love your feedback!</DialogTitle>
                </DialogHeader>
                <Textarea
                  placeholder="Let us know what you think..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="mt-2"
                />
                <DialogFooter className="mt-4">
                  <Button onClick={handleFeedbackSubmit}>Submit</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <TabsContent value="jobs" className="mt-6">
            <JobListings />
          </TabsContent>

          <TabsContent value="profile" className="mt-6">
            <StudentProfile onProfileUpdate={() => setProfileComplete(true)} />
          </TabsContent>

          <TabsContent value="applied" className="mt-6">
            <JobDashboard />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
