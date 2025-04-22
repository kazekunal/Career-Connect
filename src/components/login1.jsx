"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { BookOpen, GraduationCap, School, User, Mail, Lock, Calendar, BookType, ArrowLeft, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function StudentLoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("login")

  // Form data states
  const [loginData, setLoginData] = useState({ email: "", password: "" })
  const [signupData, setSignupData] = useState({
    fullName: "",
    studentId: "",
    email: "",
    program: "",
    graduationYear: "",
    password: ""
  })

  const handleLoginChange = (e) => {
    const { id, value } = e.target
    setLoginData({
      ...loginData,
      [id === "email" ? "email" : "password"]: value
    })
  }

  const handleSignupChange = (e) => {
    const { id, value } = e.target
    const fieldMap = {
      "fullname": "fullName",
      "student-id": "studentId",
      "signup-email": "email",
      "signup-password": "password"
    }
    
    const field = fieldMap[id] || id
    setSignupData({
      ...signupData,
      [field]: value
    })
  }

  const handleSelectChange = (field, value) => {
    setSignupData({
      ...signupData,
      [field]: value
    })
  }

  const handleLogin = (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Get students from local storage
    const students = JSON.parse(localStorage.getItem("students") || "[]")
    
    // Check if email and password match
    const student = students.find(
      (stud) => stud.email === loginData.email && stud.password === loginData.password
    )

    if (student) {
      // Set currently logged in student
      localStorage.setItem("currentUser", JSON.stringify({
        type: "student",
        ...student
      }))
      
      setTimeout(() => {
        setIsLoading(false)
        router.push("/dashboard")
      }, 1500)
    } else {
      setTimeout(() => {
        setIsLoading(false)
        alert("Invalid email or password. Please try again or register.")
      }, 1000)
    }
  }

  const handleSignup = (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Get existing students or initialize empty array
    const students = JSON.parse(localStorage.getItem("students") || "[]")
    
    // Check if email already exists
    if (students.some(student => student.email === signupData.email)) {
      setIsLoading(false)
      alert("An account with this email already exists. Please login instead.")
      return
    }

    // Add new student
    const updatedStudents = [
      ...students,
      {
        id: Date.now().toString(),
        ...signupData,
        createdAt: new Date().toISOString()
      }
    ]

    // Save to local storage
    localStorage.setItem("students", JSON.stringify(updatedStudents))

    setTimeout(() => {
      setIsLoading(false)
      // Switch to login tab
      setActiveTab("login")
      
      // Prefill login form with registration email
      setLoginData({
        ...loginData,
        email: signupData.email
      })
      
      // Clear registration form
      setSignupData({
        fullName: "",
        studentId: "",
        email: "",
        program: "",
        graduationYear: "",
        password: ""
      })
      
      alert("Registration successful! Please login with your credentials.")
    }, 1500)
  }

  const currentYear = new Date().getFullYear()
  const graduationYears = Array.from({ length: 7 }, (_, i) => currentYear + i)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container max-w-lg px-4 py-8">
        <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors mb-8 group">
          <div className="bg-white p-2 rounded-full shadow-sm group-hover:shadow-md transition-all">
            <ArrowLeft className="h-4 w-4" />
          </div>
          <span className="font-medium">Back to Home</span>
        </Link>

        <Card className="border-none shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 pt-6 pb-10 px-6 text-white relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 rounded-full opacity-20 transform translate-x-16 -translate-y-8"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500 rounded-full opacity-20 transform -translate-x-12 translate-y-10"></div>
            
            <div className="flex justify-center mb-4 relative">
              <div className="bg-white text-blue-600 p-4 rounded-full shadow-lg">
                <GraduationCap className="h-10 w-10" />
              </div>
            </div>
            <CardTitle className="text-center text-2xl font-bold mb-1">Student Portal</CardTitle>
            <CardDescription className="text-center text-blue-100 text-base">Access your academic opportunities</CardDescription>
          </div>

          <CardContent className="pt-6 px-8">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-2 mb-8 bg-blue-50">
                <TabsTrigger value="login" className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow">Login</TabsTrigger>
                <TabsTrigger value="signup" className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-700 font-medium">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-blue-500" />
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="student@university.edu" 
                        className="pl-10 py-6 rounded-lg border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200" 
                        required 
                        value={loginData.email}
                        onChange={handleLoginChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
                      <Link href="/student/forgot-password" className="text-sm text-blue-600 hover:text-blue-800 hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-blue-500" />
                      <Input 
                        id="password" 
                        type="password" 
                        className="pl-10 py-6 rounded-lg border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200" 
                        required 
                        value={loginData.password}
                        onChange={handleLoginChange}
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 my-4">
                    <input 
                      type="checkbox" 
                      id="remember" 
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <Label htmlFor="remember" className="text-gray-600">Remember me</Label>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full py-6 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 transition-all shadow-md hover:shadow-lg" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                        Logging in...
                      </span>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullname" className="text-gray-700 font-medium">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-5 w-5 text-blue-500" />
                        <Input 
                          id="fullname" 
                          placeholder="John Doe" 
                          className="pl-10 py-6 rounded-lg border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200" 
                          required 
                          value={signupData.fullName}
                          onChange={handleSignupChange}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="student-id" className="text-gray-700 font-medium">Student ID</Label>
                      <div className="relative">
                        <BookOpen className="absolute left-3 top-3 h-5 w-5 text-blue-500" />
                        <Input 
                          id="student-id" 
                          placeholder="e.g., S12345678" 
                          className="pl-10 py-6 rounded-lg border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200" 
                          required 
                          value={signupData.studentId}
                          onChange={handleSignupChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="text-gray-700 font-medium">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-blue-500" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="student@university.edu"
                        className="pl-10 py-6 rounded-lg border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200"
                        required
                        value={signupData.email}
                        onChange={handleSignupChange}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="program" className="text-gray-700 font-medium">Program/Course</Label>
                      <div className="relative">
                        <BookType className="absolute left-3 top-3 h-5 w-5 text-blue-500" />
                        <Select 
                          required
                          onValueChange={(value) => handleSelectChange("program", value)}
                          value={signupData.program}
                        >
                          <SelectTrigger id="program" className="pl-10 py-6 rounded-lg border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200">
                            <SelectValue placeholder="Select program" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cs">Computer Science</SelectItem>
                            <SelectItem value="it">Information Technology</SelectItem>
                            <SelectItem value="ee">Electrical Engineering</SelectItem>
                            <SelectItem value="me">Mechanical Engineering</SelectItem>
                            <SelectItem value="ce">Civil Engineering</SelectItem>
                            <SelectItem value="business">Business Administration</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="graduation-year" className="text-gray-700 font-medium">Graduation Year</Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3 h-5 w-5 text-blue-500" />
                        <Select 
                          required
                          onValueChange={(value) => handleSelectChange("graduationYear", value)}
                          value={signupData.graduationYear}
                        >
                          <SelectTrigger id="graduation-year" className="pl-10 py-6 rounded-lg border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200">
                            <SelectValue placeholder="Select year" />
                          </SelectTrigger>
                          <SelectContent>
                            {graduationYears.map((year) => (
                              <SelectItem key={year} value={year.toString()}>
                                {year}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="text-gray-700 font-medium">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-blue-500" />
                      <Input 
                        id="signup-password" 
                        type="password" 
                        className="pl-10 py-6 rounded-lg border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200" 
                        required 
                        value={signupData.password}
                        onChange={handleSignupChange}
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 mt-4">
                    <input 
                      type="checkbox" 
                      id="terms" 
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      required
                    />
                    <Label htmlFor="terms" className="text-gray-600 text-sm">
                      I agree to the <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
                    </Label>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full py-6 mt-4 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 transition-all shadow-md hover:shadow-lg" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                        Creating Account...
                      </span>
                    ) : (
                      "Create Student Account"
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="px-8 py-6 flex justify-center border-t text-sm text-gray-500">
            <p className="flex items-center gap-1">
              <CheckCircle className="h-4 w-4 text-blue-500" />
              <span>Secure login - © {new Date().getFullYear()} PlaceConnect</span>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}