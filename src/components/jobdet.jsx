"use client"

import { useState } from "react"
import { MapPin, Calendar, Heart, BookmarkPlus, Share2, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function JobDetails({ job }) {
  const [isSaved, setIsSaved] = useState(false)
  const [isApplying, setIsApplying] = useState(false)

  const handleSave = () => {
    setIsSaved(!isSaved)
  }

  const handleApply = () => {
    setIsApplying(true)

    // Simulate API call
    setTimeout(() => {
      setIsApplying(false)
    }, 1000)
  }

  return (
    <Card className="border-gray-200 shadow-sm h-full">
      <CardHeader className="p-6 flex flex-row items-start gap-4 border-b border-gray-100">
        <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
          <img src={job.logo || "/placeholder.svg"} alt={job.company} className="w-full h-full object-contain" />
        </div>

        <div className="flex-1">
          <h2 className="text-2xl font-bold text-blue-600">{job.title}</h2>
          <p className="text-lg text-gray-700">{job.company}</p>

          <div className="flex flex-wrap gap-4 mt-3">
            <div className="flex items-center text-gray-600">
              <MapPin className="h-4 w-4 mr-1" />
              {job.location}
            </div>

            <div className="flex items-center text-gray-600">
              <Calendar className="h-4 w-4 mr-1" />
              Updated On: {job.updatedOn}
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="icon" className={isSaved ? "text-red-500" : ""} onClick={handleSave}>
            {isSaved ? <Heart className="h-4 w-4 fill-current" /> : <BookmarkPlus className="h-4 w-4" />}
          </Button>

          <Button variant="outline" size="icon">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Clock className="h-4 w-4 text-amber-500 mr-2" />
            <span className="text-amber-600 font-medium">{job.daysLeft} days left to apply</span>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleApply} disabled={isApplying}>
                {isApplying ? "Applying..." : "Apply"}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Apply for {job.title}</DialogTitle>
                <DialogDescription>
                  You're about to apply for {job.title} at {job.company}. Your profile will be shared with the employer.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <p className="text-sm text-gray-500 mb-4">Make sure your profile is up to date before applying.</p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Confirm Application</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold border-l-4 border-blue-600 pl-3 mb-3">Eligibility</h3>
            <p>{job.experienceLevel}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold border-l-4 border-blue-600 pl-3 mb-3">Job Description</h3>
            <p className="mb-4">{job.description}</p>

            <h4 className="font-medium mb-2">Responsibilities of the Candidates:</h4>
            <ul className="list-disc pl-5 space-y-2">
              {job.responsibilities.map((responsibility, index) => (
                <li key={index}>{responsibility}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold border-l-4 border-blue-600 pl-3 mb-3">Qualifications</h3>
            <ul className="list-disc pl-5 space-y-2">
              {job.qualifications.map((qualification, index) => (
                <li key={index}>{qualification}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold border-l-4 border-blue-600 pl-3 mb-3">Additional Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-600">Salary Range</h4>
                <p>{job.salary}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-600">Work Type</h4>
                <p>{job.workType}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-600">Category</h4>
                <p>{job.category}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-600">Location</h4>
                <p>{job.location}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
