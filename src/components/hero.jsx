import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GraduationCap, Briefcase, Search, Building, Users, BookOpen, Award } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-blue-600" />
          <span className="text-xl font-bold text-slate-800">CareerConnect</span>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="text-slate-600 hover:text-slate-900">About</Button>
          <Button variant="ghost" className="text-slate-600 hover:text-slate-900">Features</Button>
          <Button variant="ghost" className="text-slate-600 hover:text-slate-900">Contact</Button>
          <Button variant="outline" className="ml-2">Log In</Button>
          <Button>Sign Up</Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-6 max-w-6xl mx-auto text-center">
        <h1 className="text-5xl font-bold text-slate-900 mb-6">Connecting Students with Opportunities</h1>
        <p className="text-xl text-slate-600 mb-12 max-w-3xl mx-auto">
          The ultimate platform for students to discover and apply for placements and for companies to find top talent.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            <GraduationCap className="mr-2 h-5 w-5" />
            For Students
          </Button>
          <Button size="lg" variant="outline">
            <Building className="mr-2 h-5 w-5" />
            For Companies
          </Button>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">How It Works</h2>
        
        <Tabs defaultValue="students" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto mb-8 grid-cols-2">
            <TabsTrigger value="students">For Students</TabsTrigger>
            <TabsTrigger value="companies">For Companies</TabsTrigger>
          </TabsList>
          
          <TabsContent value="students" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <div className="mb-4 bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center">
                    <Search className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle>Find Opportunities</CardTitle>
                  <CardDescription>Browse through numerous job postings from top companies.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">Filter jobs by role, location, industry, and more to find the perfect match for your skills and career goals.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="mb-4 bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle>Easy Applications</CardTitle>
                  <CardDescription>Apply with just a few clicks using your profile.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">Create a comprehensive profile once and use it to apply to multiple companies without repetitive data entry.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="mb-4 bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center">
                    <Award className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle>Track Progress</CardTitle>
                  <CardDescription>Monitor your application status in real-time.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">Get updates on your applications, schedule interviews, and receive offers all in one place.</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="companies">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <div className="mb-4 bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center">
                    <Briefcase className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle>Post Opportunities</CardTitle>
                  <CardDescription>Create detailed job listings with all requirements.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">Easily post new positions, specify qualifications, and set application deadlines through our intuitive interface.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="mb-4 bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center">
                    <GraduationCap className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle>Find Top Talent</CardTitle>
                  <CardDescription>Connect with qualified candidates from top institutions.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">Browse student profiles, filter by skills, education, and experience to find the perfect match for your team.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="mb-4 bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle>Streamline Recruitment</CardTitle>
                  <CardDescription>Manage applications and interviews in one place.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">Schedule interviews, provide feedback, and make offers all through our integrated platform.</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Statistics */}
      <section className="py-16 px-6 bg-blue-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">Trusted By Many</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-blue-600 mb-2">500+</p>
              <p className="text-slate-600">Partner Companies</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-blue-600 mb-2">10,000+</p>
              <p className="text-slate-600">Student Placements</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-blue-600 mb-2">150+</p>
              <p className="text-slate-600">Educational Institutions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-slate-800 mb-6">Ready to Get Started?</h2>
        <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
          Join CareerConnect today and take the next step in your career journey or find your next star employee.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">Create Student Account</Button>
          <Button size="lg" variant="outline">Register Company</Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-slate-200 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="h-6 w-6 text-blue-400" />
                <span className="text-xl font-bold text-white">CareerConnect</span>
              </div>
              <p className="text-slate-400">Connecting students with their dream careers and companies with exceptional talent.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-400 hover:text-white">Home</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white">For Students</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white">For Companies</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-400 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white">Career Tips</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white">FAQ</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white">Support</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="text-slate-400">Email: support@careerconnect.com</li>
                <li className="text-slate-400">Phone: +1 (555) 123-4567</li>
                <li className="text-slate-400">Address: 123 Career Street, Tech City</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-400">
            <p>© 2025 CareerConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}