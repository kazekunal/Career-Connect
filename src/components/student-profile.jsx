"use client"

import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Save, Upload, FileText } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const MAX_FILE_SIZE = 5 * 1024 * 1024
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
const ACCEPTED_RESUME_TYPES = ["application/pdf"]

const profileFormSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }),
  studentId: z.string().min(1, { message: "Student ID is required." }),
  program: z.string().min(1, { message: "Program is required." }),
  graduationYear: z.string().min(1, { message: "Graduation year is required." }),
  cgpa: z.string().refine((val) => !isNaN(Number.parseFloat(val)) && Number.parseFloat(val) <= 10.0, {
    message: "CGPA must be a valid number up to 10.0."
  }),
  skills: z.string().min(1, { message: "Please enter at least one skill." }),
  bio: z.string().max(500, { message: "Bio must not exceed 500 characters." }).optional(),
  linkedIn: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal("")),
  github: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal(""))
})

export function StudentProfile({ onProfileUpdate }) {
  const [isLoading, setIsLoading] = useState(false)
  const [photoPreview, setPhotoPreview] = useState(null)
  const [resumeFile, setResumeFile] = useState(null)
  const [resumeName, setResumeName] = useState(null)

  useEffect(() => {
    const savedPhoto = localStorage.getItem("studentPhoto")
    if (savedPhoto) {
      setPhotoPreview(savedPhoto)
      window.dispatchEvent(new CustomEvent("profilePhotoUpdated", { detail: { photo: savedPhoto } }))
    }

    const savedResumeName = localStorage.getItem("studentResumeName")
    if (savedResumeName) {
      setResumeName(savedResumeName)
    }
  }, [])

  const loadSavedValues = () => {
    const savedProfile = localStorage.getItem("studentProfile")
    if (savedProfile) {
      return JSON.parse(savedProfile)
    }
    return {
      fullName: "John Doe",
      email: "john.doe@university.edu",
      phone: "9876543210",
      studentId: "S12345678",
      program: "cs",
      graduationYear: "2025",
      cgpa: "8.5",
      skills: "JavaScript, React, Node.js",
      bio: "Computer Science student passionate about web development and AI.",
      linkedIn: "https://linkedin.com/in/johndoe",
      github: "https://github.com/johndoe"
    }
  }

  const form = useForm({
    resolver: zodResolver(profileFormSchema),
    defaultValues: loadSavedValues()
  })

  const onSubmit = (data) => {
    setIsLoading(true)
    localStorage.setItem("studentProfile", JSON.stringify(data))
    if (photoPreview) {
      localStorage.setItem("studentPhoto", photoPreview)
      window.dispatchEvent(new CustomEvent("profilePhotoUpdated", { detail: { photo: photoPreview } }))
    }
    if (resumeName) {
      localStorage.setItem("studentResumeName", resumeName)
    }
    setTimeout(() => {
      setIsLoading(false)
      if (onProfileUpdate) {
        onProfileUpdate()
      }
      alert("Profile has been successfully saved.")
    }, 1000)
  }

  const handlePhotoUpload = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      alert("Please upload a valid image file.")
      return
    }
    if (file.size > MAX_FILE_SIZE) {
      alert("Please upload an image smaller than 5MB.")
      return
    }
    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target?.result) {
        setPhotoPreview(e.target.result)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleResumeUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
  
    if (!ACCEPTED_RESUME_TYPES.includes(file.type)) {
      alert("Please upload a valid resume (PDF, DOC, DOCX).");
      return;
    }
  
    if (file.size > MAX_FILE_SIZE) {
      alert("Please upload a resume smaller than 5MB.");
      return;
    }
  
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result; // This will include the mime header
      localStorage.setItem("studentResumeBase64", base64);
      localStorage.setItem("studentResumeName", file.name);
      
      setResumeFile(file);
      setResumeName(file.name);
      alert(`${file.name} has been uploaded successfully.`);
    };
    reader.readAsDataURL(file); // Converts file to base64
  };
  

  const currentYear = new Date().getFullYear()
  const graduationYears = Array.from({ length: 7 }, (_, i) => (currentYear + i).toString())
  return (
    <Card className="border-blue-200 shadow-md">
      <CardHeader className="bg-blue-50 border-b border-blue-100">
        <CardTitle>Student Profile</CardTitle>
        <CardDescription>Complete your profile to increase your chances of getting hired.</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <div className="flex flex-col items-center gap-4">
            <Avatar className="h-32 w-32">
              {photoPreview ? (
                <AvatarImage src={photoPreview} alt="Profile picture" />
              ) : (
                <AvatarImage src="/placeholder.svg?height=128&width=128" alt="Profile picture" />
              )}
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="relative">
              <input
                type="file"
                id="photo-upload"
                accept={ACCEPTED_IMAGE_TYPES.join(",")}
                onChange={handlePhotoUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Button variant="outline" size="sm" className="gap-2">
                <Upload className="h-4 w-4" />
                Upload Photo
              </Button>
            </div>
            
            <div className="relative mt-2">
              <input
                type="file"
                id="resume-upload"
                accept={ACCEPTED_RESUME_TYPES.join(",")}
                onChange={handleResumeUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Button variant="outline" size="sm" className="gap-2">
                <FileText className="h-4 w-4" />
                {resumeName ? "Change Resume" : "Upload Resume"}
              </Button>
            </div>
            {resumeName && (
              <div className="text-sm text-gray-600 text-center">
                <FileText className="h-3 w-3 inline mr-1" />
                {resumeName}
              </div>
            )}
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Phone */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Student ID */}
                <FormField
                  control={form.control}
                  name="studentId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Student ID</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your student ID" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Program */}
                <FormField
                  control={form.control}
                  name="program"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Program/Course</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your program" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="cs">Computer Science</SelectItem>
                          <SelectItem value="it">Information Technology</SelectItem>
                          <SelectItem value="ee">Electrical Engineering</SelectItem>
                          <SelectItem value="me">Mechanical Engineering</SelectItem>
                          <SelectItem value="ce">Civil Engineering</SelectItem>
                          <SelectItem value="business">Business Administration</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Graduation Year */}
                <FormField
                  control={form.control}
                  name="graduationYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Graduation Year</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select graduation year" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {graduationYears.map((year) => (
                            <SelectItem key={year} value={year}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* CGPA */}
                <FormField
                  control={form.control}
                  name="cgpa"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CGPA</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your CGPA" {...field} />
                      </FormControl>
                      <FormDescription>Enter your current CGPA (out of 10)</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Skills */}
                <FormField
                  control={form.control}
                  name="skills"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Skills</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., JavaScript, Python, React" {...field} />
                      </FormControl>
                      <FormDescription>Separate skills with commas</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* LinkedIn */}
                <FormField
                  control={form.control}
                  name="linkedIn"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>LinkedIn Profile</FormLabel>
                      <FormControl>
                        <Input placeholder="https://linkedin.com/in/username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* GitHub */}
                <FormField
                  control={form.control}
                  name="github"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>GitHub Profile</FormLabel>
                      <FormControl>
                        <Input placeholder="https://github.com/username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Bio */}
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Write a short bio about yourself" className="min-h-[120px]" {...field} />
                    </FormControl>
                    <FormDescription>Briefly describe yourself, your interests, and career goals.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full md:w-auto bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                {isLoading ? (
                  <>Saving Profile...</>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Profile
                  </>
                )}
              </Button>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  )
}