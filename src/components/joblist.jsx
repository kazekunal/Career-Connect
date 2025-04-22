"use client"

import { useState } from "react"
import { ChevronDown, Search, Filter, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { JobDetails } from "./jobdet"

// Sample job data
const jobListings = [
  {
    id: 1,
    title: "Software Engineer II-Infrastructure Core",
    company: "Google",
    logo: "/placeholder.svg?height=40&width=40",
    location: "Bengaluru",
    daysLeft: 12,
    experienceLevel: "Experienced Professionals",
    updatedOn: "Apr 22, 2025",
    description: "Google is hiring for the Role of Software Engineer II, Infrastructure, Core!",
    responsibilities: [
      "Write product or system development code.",
      "Participate in, or lead design reviews with peers and stakeholders to decide amongst available technologies.",
      "Review code developed by other developers and provide feedback to ensure best practices (e.g., style guidelines, checking code in, accuracy, testability, and efficiency).",
    ],
    qualifications: [
      "Bachelor's degree in Computer Science, related technical field or equivalent practical experience.",
      "5 years of experience in software development.",
      "Experience in Java, C++, Python or Go.",
      "Experience with algorithms, data structures, complexity analysis and software design.",
    ],
    salary: "₹25,00,000 - ₹45,00,000 per year",
    workType: "Full-time",
    category: "Engineering",
  },
  {
    id: 2,
    title: "Site Reliability Engineer-Core Enterprise",
    company: "Google",
    logo: "/placeholder.svg?height=40&width=40",
    location: "Hyderabad",
    daysLeft: 12,
    experienceLevel: "Experienced Professionals",
    updatedOn: "Apr 20, 2025",
    description: "Google is hiring for the Role of Site Reliability Engineer, Core Enterprise!",
    responsibilities: [
      "Design, build and maintain the infrastructure that supports Google's enterprise products.",
      "Troubleshoot and resolve complex system issues.",
      "Implement automation to eliminate toil and improve reliability.",
    ],
    qualifications: [
      "Bachelor's degree in Computer Science or related technical field.",
      "4+ years of experience in systems administration or software development.",
      "Experience with Unix/Linux operating systems internals and administration.",
      "Coding experience in one or more of: Python, Go, C++, Java.",
    ],
    salary: "₹22,00,000 - ₹40,00,000 per year",
    workType: "Full-time",
    category: "Engineering",
  },
  {
    id: 3,
    title: "Full Stack Developer I",
    company: "FedEx",
    logo: "/placeholder.svg?height=40&width=40",
    location: "Pune",
    daysLeft: 12,
    experienceLevel: "Experienced Professionals",
    updatedOn: "Apr 18, 2025",
    description: "FedEx is looking for a Full Stack Developer to join our team!",
    responsibilities: [
      "Develop and maintain web applications using modern JavaScript frameworks.",
      "Work with backend APIs and databases.",
      "Collaborate with UX designers to implement responsive designs.",
    ],
    qualifications: [
      "Bachelor's degree in Computer Science or related field.",
      "3+ years of experience in full stack development.",
      "Proficiency in React, Node.js, and SQL databases.",
      "Experience with RESTful APIs and microservices architecture.",
    ],
    salary: "₹18,00,000 - ₹28,00,000 per year",
    workType: "Full-time",
    category: "Development",
  },
  {
    id: 4,
    title: "System Software Developer",
    company: "Google",
    logo: "/placeholder.svg?height=40&width=40",
    location: "Bengaluru",
    daysLeft: 15,
    experienceLevel: "Experienced Professionals",
    updatedOn: "Apr 15, 2025",
    description: "Join Google's System Software team to build next-generation infrastructure!",
    responsibilities: [
      "Design and implement system-level software components.",
      "Optimize performance of critical systems.",
      "Collaborate with hardware teams on integration.",
    ],
    qualifications: [
      "Master's degree in Computer Science or related field.",
      "5+ years of experience in systems programming.",
      "Expertise in C/C++ and low-level optimization.",
      "Experience with operating systems internals and kernel development.",
    ],
    salary: "₹28,00,000 - ₹48,00,000 per year",
    workType: "Full-time",
    category: "Engineering",
  },
  {
    id: 5,
    title: "Frontend Developer",
    company: "Microsoft",
    logo: "/placeholder.svg?height=40&width=40",
    location: "Hyderabad",
    daysLeft: 10,
    experienceLevel: "Entry Level",
    updatedOn: "Apr 10, 2025",
    description: "Microsoft is seeking a talented Frontend Developer to join our team!",
    responsibilities: [
      "Build responsive user interfaces using React.",
      "Implement UI/UX designs with attention to detail.",
      "Optimize applications for maximum performance.",
    ],
    qualifications: [
      "Bachelor's degree in Computer Science or related field.",
      "1-3 years of experience in frontend development.",
      "Proficiency in HTML, CSS, JavaScript, and React.",
      "Experience with responsive design and cross-browser compatibility.",
    ],
    salary: "₹12,00,000 - ₹18,00,000 per year",
    workType: "Full-time",
    category: "Development",
  },
]

export function JobListings() {
  const [selectedJob, setSelectedJob] = useState(jobListings[0])
  const [showJobDetails, setShowJobDetails] = useState(false)

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input placeholder="Search jobs by title, company, or keywords" className="pl-10" />
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
            <Filter className="h-4 w-4" /> Filters <Badge className="ml-1 bg-blue-600">6</Badge>
          </Button>

          <Select>
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
            </SelectContent>
          </Select>

          <Select>
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

          <Select>
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
              <TabsTrigger value="applied">Applied</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {jobListings.map((job) => (
                <Card
                  key={job.id}
                  className={`border cursor-pointer hover:border-blue-300 transition-colors ${selectedJob.id === job.id ? "border-blue-500 bg-blue-50" : ""}`}
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
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="saved" className="p-4 text-center text-gray-500">
              You haven't saved any jobs yet.
            </TabsContent>

            <TabsContent value="applied" className="p-4 text-center text-gray-500">
              You haven't applied to any jobs yet.
            </TabsContent>
          </Tabs>
        </div>

        <div className="lg:col-span-2">
          {showJobDetails ? (
            <JobDetails job={selectedJob} />
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
    </div>
  )
}
