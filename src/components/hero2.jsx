'use client'
import Image from "next/image";
import { useState, useEffect } from "react";
// Remove this problematic import
// import { useRouter } from "next/router";
// Use next/navigation instead for App Router
import { useRouter } from "next/navigation";
import { ArrowRight, Building2, GraduationCap, Briefcase, Award, BookOpen, Users, Calendar } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import Link from "next/link";

export default function EnhancedLandingPage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);
  
  // Check authentication status on page load
  useEffect(() => {
    // This would typically use your auth service/context
    // For demo purposes, we're checking localStorage
    if (typeof window !== 'undefined') {  // Check if running in browser environment
      const authStatus = localStorage.getItem("authStatus");
      const userTypeStored = localStorage.getItem("userType");
      
      setIsLoggedIn(authStatus === "authenticated");
      setUserType(userTypeStored);
    }
  }, []);
  
  // Handle portal access with auth check
  const handlePortalAccess = (portalType) => {
    if (!isLoggedIn) {
      toast("Authentication Required", {
        description: `Please log in to access the ${portalType} portal.`,
      });
      router.push(`${portalType}`);
      return;
    }
  
    if (portalType === "student" && userType === "student") {
      router.push("/student-dashboard");
    } else if (portalType === "company" && userType === "company") {
      router.push("/company-dashboard");
    } else {
      toast.error("Access restricted: Your account doesn't have access to this portal.");
    }
  };

  const stats = [
    { label: "Companies", value: "100+", icon: Building2, color: "bg-blue-50 text-blue-700 border-blue-200" },
    { label: "Placements", value: "500+", icon: Briefcase, color: "bg-green-50 text-green-700 border-green-200" },
    { label: "Workshops", value: "50+", icon: Calendar, color: "bg-purple-50 text-purple-700 border-purple-200" },
    { label: "Success Rate", value: "94%", icon: Award, color: "bg-amber-50 text-amber-700 border-amber-200" }
  ];

  return (
    <main className="overflow-hidden">
      {/* Hero Section with Animated Gradient Background */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 z-0"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute top-40 -left-24 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold text-indigo-900 mb-6">
                  Launch Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500">Career</span> Journey
                </h1>
                <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
                  Connect with top companies, showcase your skills, and unlock opportunities that align with your aspirations. Your path to professional success starts here.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-indigo-900 hover:bg-indigo-800 text-white transition-all duration-300 transform hover:scale-105"
                  onClick={() => handlePortalAccess("studentLogin")}
                >
                  <GraduationCap className="mr-2 h-5 w-5" /> Student Portal
                </Button>
                <Button
                  size="lg"
                  className="bg-amber-500 hover:bg-amber-600 text-white transition-all duration-300 transform hover:scale-105"
                  onClick={() => handlePortalAccess("companyLogin")}
                >
                  <Building2 className="mr-2 h-5 w-5" /> Company Portal
                </Button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <div key={index} className="flex flex-col items-center p-4 rounded-lg bg-white/70 shadow-sm backdrop-blur-sm">
                    <div className={`rounded-full p-2 ${stat.color.split(' ')[0]} mb-2`}>
                      <stat.icon className={`h-5 w-5 ${stat.color.split(' ')[1]}`} />
                    </div>
                    <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                    <span className="text-sm text-gray-600">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-indigo-900 rounded-3xl rotate-3 transform-gpu -z-10 opacity-10"></div>
              <Image
                src="/placement.jpg"
                alt="Students getting placed"
                width={1000}
                height={800}
                className="rounded-2xl shadow-xl transition-transform duration-500 hover:scale-105"
              />
              
            </div>
          </div>
        </div>
      </section>

      {/* Opportunities Section with Tabs */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 bg-indigo-50 text-indigo-700 border-indigo-200 px-4 py-1">
              Opportunities
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-indigo-900">Explore What We Offer</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Comprehensive resources designed to accelerate your career growth and connect you with industry leaders.
            </p>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid grid-cols-3 md:grid-cols-6 max-w-3xl mx-auto mb-8">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="internships">Internships</TabsTrigger>
              <TabsTrigger value="jobs">Jobs</TabsTrigger>
              <TabsTrigger value="mentorships">Mentorships</TabsTrigger>
              <TabsTrigger value="practice">Practice</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Internships Card */}
                <Card className="group overflow-hidden border-none hover:shadow-lg transition-all duration-300">
                  <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
                    <div className="w-24 h-24 bg-blue-500/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Briefcase className="text-blue-600 h-12 w-12" />
                    </div>
                  </div>
                  <CardHeader className="pb-2 bg-gradient-to-r from-blue-600 to-indigo-600">
                    <CardTitle className="text-white">Internships</CardTitle>
                    <CardDescription className="text-blue-100">Gain Practical Experience</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          100+ opportunities
                        </Badge>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          Updated daily
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        Apply for internships with leading companies and startups. Build your portfolio with real-world projects.
                      </p>
                      <Button variant="outline" className="w-full text-blue-600 border-blue-200 hover:bg-blue-50">
                        Explore Internships <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Jobs Card */}
                <Card className="group overflow-hidden border-none hover:shadow-lg transition-all duration-300">
                  <div className="h-48 bg-gradient-to-br from-amber-100 to-amber-50 flex items-center justify-center">
                    <div className="w-24 h-24 bg-amber-500/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Building2 className="text-amber-600 h-12 w-12" />
                    </div>
                  </div>
                  <CardHeader className="pb-2 bg-gradient-to-r from-amber-500 to-amber-600">
                    <CardTitle className="text-white">Jobs</CardTitle>
                    <CardDescription className="text-amber-100">Start Your Professional Journey</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                          50+ companies hiring
                        </Badge>
                        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                          All sectors
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        Discover full-time positions across various industries tailored for fresh graduates and professionals.
                      </p>
                      <Button variant="outline" className="w-full text-amber-600 border-amber-200 hover:bg-amber-50">
                        Explore Jobs <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Mentorship Card */}
                <Card className="group overflow-hidden border-none hover:shadow-lg transition-all duration-300">
                  <div className="h-48 bg-gradient-to-br from-cyan-100 to-cyan-50 flex items-center justify-center">
                    <div className="w-24 h-24 bg-cyan-500/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Users className="text-cyan-600 h-12 w-12" />
                    </div>
                  </div>
                  <CardHeader className="pb-2 bg-gradient-to-r from-cyan-500 to-cyan-600">
                    <CardTitle className="text-white">Mentorships</CardTitle>
                    <CardDescription className="text-cyan-100">Learn From The Best</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <Badge variant="outline" className="bg-cyan-50 text-cyan-700 border-cyan-200">
                          30+ industry experts
                        </Badge>
                        <Badge variant="outline" className="bg-cyan-50 text-cyan-700 border-cyan-200">
                          1:1 sessions
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        Connect with industry professionals for career guidance, skill development, and personalized advice.
                      </p>
                      <Button variant="outline" className="w-full text-cyan-600 border-cyan-200 hover:bg-cyan-50">
                        Find a Mentor <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Additional tab contents would be added here - similar structure to "all" */}
            <TabsContent value="internships">
              {/* Internships specific content */}
            </TabsContent>
            
            {/* Other tab contents */}
          </Tabs>
          
          <div className="text-center mt-12">
            <Button 
              className="bg-indigo-900 hover:bg-indigo-800"
              onClick={() => handlePortalAccess("student")}
            >
              View All Opportunities <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Who's Using Section with Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 bg-indigo-50 text-indigo-700 border-indigo-200 px-4 py-1">
              Community
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-indigo-900">Who's Using SNU PlaceConnect?</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Join the growing community of students, employers, and academic institutions transforming career development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Students & Professionals",
                description: "Unlock Your Potential: Compete, Build Resume, Grow and get Hired!",
                icon: GraduationCap,
                testimonial: "The mentorship program helped me land my dream job at Google. The interview prep was invaluable!",
                author: "Priya S., Computer Science '24"
              },
              {
                title: "Companies & Recruiters",
                description: "Discover Right Talent: Hire, Engage, and Brand Like Never Before!",
                icon: Building2,
                testimonial: "We've hired 15 exceptional candidates through SNU PlaceConnect. The talent quality is outstanding.",
                author: "Rahul Mehta, HR Director at TechCorp"
              },
              {
                title: "Colleges & Universities",
                description: "Bridge Academia and Industry: Empower Students with Real-World Opportunities!",
                icon: BookOpen,
                testimonial: "Our placement rates increased by 30% since partnering with SNU PlaceConnect. A game-changer!",
                author: "Dr. Kumar, Placement Officer, Delhi University"
              }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="bg-gradient-to-r from-indigo-900 to-blue-800 p-6 flex items-center">
                  <div className="bg-white/10 p-3 rounded-lg">
                    <item.icon className="text-white h-8 w-8" />
                  </div>
                  <div className="ml-4 text-white">
                    <h3 className="text-xl font-bold">{item.title}</h3>
                    <p className="text-indigo-100 text-sm">{item.description}</p>
                  </div>
                </div>
                
                <div className="p-6">
                  <blockquote className="italic text-gray-600 border-l-4 border-indigo-300 pl-4 mb-4">
                    "{item.testimonial}"
                  </blockquote>
                  <p className="text-sm font-semibold text-gray-900">{item.author}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with Floating Elements */}
      <section className="relative py-24 bg-gradient-to-br from-indigo-900 via-blue-900 to-indigo-800 text-white overflow-hidden">
        {/* Floating elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/5 rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/5 rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-40 h-40 bg-white/5 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Launch Your Career?</h2>
          <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto text-blue-100">
            Join thousands of students and companies on SNU PlaceConnect and take the next step in your career journey.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 hover:bg-white/15 transition-colors">
              <GraduationCap className="h-12 w-12 text-blue-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">For Students</h3>
              <ul className="text-left space-y-2 mb-6">
                {["Access to premium job listings", "Skill assessment tools", "Mock interviews", "Career guidance"].map((item, i) => (
                  <li key={i} className="flex items-center text-blue-100">
                    <span className="mr-2 text-blue-300">✓</span> {item}
                  </li>
                ))}
              </ul>
              <Button 
                className="w-full bg-white text-indigo-900 hover:bg-blue-50"
                onClick={() => handlePortalAccess("studentLogin")}
              >
                <GraduationCap className="mr-2 h-5 w-5" /> Student Sign Up
              </Button>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 hover:bg-white/15 transition-colors">
              <Building2 className="h-12 w-12 text-amber-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">For Companies</h3>
              <ul className="text-left space-y-2 mb-6">
                {["Access to verified talent pool", "Branded company profile", "Automated screening", "Campus connect"].map((item, i) => (
                  <li key={i} className="flex items-center text-blue-100">
                    <span className="mr-2 text-amber-300">✓</span> {item}
                  </li>
                ))}
              </ul>
              <Button 
                className="w-full bg-amber-500 text-white hover:bg-amber-600"
                onClick={() => handlePortalAccess("companyLogin")}
              >
                <Building2 className="mr-2 h-5 w-5" /> Company Sign Up
              </Button>
            </div>
          </div>
          
          <p className="mt-8 text-blue-200 text-sm">
            Already have an account? <Link href="/studentLogin" className="text-white underline">Log in here</Link>
          </p>
        </div>
      </section>
    </main>
  );
}