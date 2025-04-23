"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Building2, User, Mail, Lock, Briefcase, Users, Phone, ArrowLeft, CheckCircle, Globe } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CompanyLoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      router.push("/company")
    }, 1500)
  }

  const handleSignup = (e) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      router.push("/company")
    }, 1500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200">
      <div className="container max-w-lg px-4 py-8">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors mb-8 group">
          <div className="bg-white p-2 rounded-full shadow-sm group-hover:shadow-md transition-all">
            <ArrowLeft className="h-4 w-4" />
          </div>
          <span className="font-medium">Back to Home</span>
        </Link>

        <Card className="border-none shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 pt-6 pb-10 px-6 text-white relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gray-700 rounded-full opacity-20 transform translate-x-16 -translate-y-8"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gray-600 rounded-full opacity-20 transform -translate-x-12 translate-y-10"></div>
            
            <div className="flex justify-center mb-4 relative">
              <div className="bg-white text-gray-800 p-4 rounded-full shadow-lg">
                <Building2 className="h-10 w-10" />
              </div>
            </div>
            <CardTitle className="text-center text-2xl font-bold mb-1">Business Portal</CardTitle>
            <CardDescription className="text-center text-gray-300 text-base">Connect with top talents for your organization</CardDescription>
          </div>

          <CardContent className="pt-6 px-8">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid grid-cols-2 mb-8 bg-gray-100">
                <TabsTrigger value="login" className="data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow">Login</TabsTrigger>
                <TabsTrigger value="signup" className="data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow">Register</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-700 font-medium">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="hr@company.com" 
                        className="pl-10 py-6 rounded-lg border-gray-200 focus:border-gray-500 focus:ring focus:ring-gray-200" 
                        required 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
                      <Link href="/company/forgot-password" className="text-sm text-gray-600 hover:text-gray-800 hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                      <Input 
                        id="password" 
                        type="password" 
                        className="pl-10 py-6 rounded-lg border-gray-200 focus:border-gray-500 focus:ring focus:ring-gray-200" 
                        required 
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 my-4">
                    <input 
                      type="checkbox" 
                      id="remember" 
                      className="rounded border-gray-300 text-gray-600 focus:ring-gray-500"
                    />
                    <Label htmlFor="remember" className="text-gray-600">Remember me</Label>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full py-6 rounded-lg bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black transition-all shadow-md hover:shadow-lg" 
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
                  <div className="space-y-2">
                    <Label htmlFor="company-name" className="text-gray-700 font-medium">Company Name</Label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                      <Input 
                        id="company-name" 
                        placeholder="Acme Corporation" 
                        className="pl-10 py-6 rounded-lg border-gray-200 focus:border-gray-500 focus:ring focus:ring-gray-200" 
                        required 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="industry" className="text-gray-700 font-medium">Industry</Label>
                      <div className="relative">
                        <Briefcase className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                        <Select required>
                          <SelectTrigger id="industry" className="pl-10 py-6 rounded-lg border-gray-200 focus:border-gray-500 focus:ring focus:ring-gray-200">
                            <SelectValue placeholder="Select industry" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="tech">Technology</SelectItem>
                            <SelectItem value="finance">Finance</SelectItem>
                            <SelectItem value="healthcare">Healthcare</SelectItem>
                            <SelectItem value="education">Education</SelectItem>
                            <SelectItem value="manufacturing">Manufacturing</SelectItem>
                            <SelectItem value="retail">Retail</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company-size" className="text-gray-700 font-medium">Company Size</Label>
                      <div className="relative">
                        <Users className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                        <Select required>
                          <SelectTrigger id="company-size" className="pl-10 py-6 rounded-lg border-gray-200 focus:border-gray-500 focus:ring focus:ring-gray-200">
                            <SelectValue placeholder="Select size" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1-10">1-10 employees</SelectItem>
                            <SelectItem value="11-50">11-50 employees</SelectItem>
                            <SelectItem value="51-200">51-200 employees</SelectItem>
                            <SelectItem value="201-500">201-500 employees</SelectItem>
                            <SelectItem value="501-1000">501-1000 employees</SelectItem>
                            <SelectItem value="1000+">1000+ employees</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company-website" className="text-gray-700 font-medium">Company Website</Label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                      <Input 
                        id="company-website" 
                        type="url" 
                        placeholder="https://www.example.com" 
                        className="pl-10 py-6 rounded-lg border-gray-200 focus:border-gray-500 focus:ring focus:ring-gray-200" 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="contact-person" className="text-gray-700 font-medium">Contact Person</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                        <Input 
                          id="contact-person" 
                          placeholder="Jane Smith" 
                          className="pl-10 py-6 rounded-lg border-gray-200 focus:border-gray-500 focus:ring focus:ring-gray-200" 
                          required 
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contact-phone" className="text-gray-700 font-medium">Contact Phone</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                        <Input 
                          id="contact-phone" 
                          type="tel" 
                          placeholder="+1 (555) 123-4567" 
                          className="pl-10 py-6 rounded-lg border-gray-200 focus:border-gray-500 focus:ring focus:ring-gray-200" 
                          required 
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="text-gray-700 font-medium">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                      <Input 
                        id="signup-email" 
                        type="email" 
                        placeholder="hr@company.com" 
                        className="pl-10 py-6 rounded-lg border-gray-200 focus:border-gray-500 focus:ring focus:ring-gray-200" 
                        required 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="text-gray-700 font-medium">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                      <Input 
                        id="signup-password" 
                        type="password" 
                        className="pl-10 py-6 rounded-lg border-gray-200 focus:border-gray-500 focus:ring focus:ring-gray-200" 
                        required 
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 mt-4">
                    <input 
                      type="checkbox" 
                      id="terms" 
                      className="rounded border-gray-300 text-gray-600 focus:ring-gray-500"
                      required
                    />
                    <Label htmlFor="terms" className="text-gray-600 text-sm">
                      I agree to the <a href="#" className="text-gray-800 hover:underline">Terms of Service</a> and <a href="#" className="text-gray-800 hover:underline">Privacy Policy</a>
                    </Label>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full py-6 mt-4 rounded-lg bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black transition-all shadow-md hover:shadow-lg" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                        Creating Account...
                      </span>
                    ) : (
                      "Register Company"
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="px-8 py-6 flex justify-center border-t text-sm text-gray-500">
            <p className="flex items-center gap-1">
              <CheckCircle className="h-4 w-4 text-gray-500" />
              <span>Secure login - © {new Date().getFullYear()} PlaceConnect</span>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}