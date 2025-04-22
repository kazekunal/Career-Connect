"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { GraduationCap, Bell, User, LogOut, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function StudentHeader() {
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [profilePhoto, setProfilePhoto] = useState(null)
  const [studentName, setStudentName] = useState("JD")

  useEffect(() => {
    const savedPhoto = localStorage.getItem("studentPhoto")
    if (savedPhoto) {
      setProfilePhoto(savedPhoto)
    }

    const savedProfile = localStorage.getItem("studentProfile")
    if (savedProfile) {
      try {
        const profile = JSON.parse(savedProfile)
        if (profile.fullName) {
          setStudentName(
            profile.fullName
              .split(" ")
              .map((n) => n[0])
              .join("")
          )
        }
      } catch (error) {
        console.error("Error parsing saved profile:", error)
      }
    }

    const handleProfilePhotoUpdate = (event) => {
      if (event.detail && event.detail.photo) {
        setProfilePhoto(event.detail.photo)
      }
    }

    window.addEventListener("profilePhotoUpdated", handleProfilePhotoUpdate)

    return () => {
      window.removeEventListener("profilePhotoUpdated", handleProfilePhotoUpdate)
    }
  }, [])

  const handleLogout = () => {
    router.push("/studentLogin")
  }

  return (
    <header className="bg-blue-600 text-white sticky top-0 z-10 shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6" />
            <h1 className="text-xl font-bold hidden md:block">Student Placement Portal</h1>
            <h1 className="text-xl font-bold md:hidden">Student Portal</h1>
          </div>

          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-blue-600 text-white border-none">
                <div className="flex flex-col gap-4 mt-8">
                  <div className="flex items-center gap-3 p-2">
                    <Avatar className="h-10 w-10 border-2 border-white">
                      {profilePhoto ? (
                        <AvatarImage src={profilePhoto || "/placeholder.svg"} alt="Profile" />
                      ) : (
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Profile" />
                      )}
                      <AvatarFallback>{studentName}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">Student</div>
                      <div className="text-xs text-blue-100">View Profile</div>
                    </div>
                  </div>
                  <Link href="/dashboard" className="flex items-center gap-2 p-2 hover:bg-blue-700 rounded-md">
                    <GraduationCap className="h-5 w-5" />
                    <span>Dashboard</span>
                  </Link>
                  <Link href="/notifications" className="flex items-center gap-2 p-2 hover:bg-blue-700 rounded-md">
                    <Bell className="h-5 w-5" />
                    <span>Notifications</span>
                  </Link>
                  <Link href="/profile" className="flex items-center gap-2 p-2 hover:bg-blue-700 rounded-md">
                    <User className="h-5 w-5" />
                    <span>Profile</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 p-2 hover:bg-blue-700 rounded-md mt-auto"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/student/notifications" className="hover:text-blue-200">
              <Bell className="h-5 w-5" />
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <span className="sr-only">Open user menu</span>
                  <Avatar className="h-8 w-8 border-2 border-white">
                    {profilePhoto ? (
                      <AvatarImage src={profilePhoto || "/placeholder.svg"} alt="Profile" />
                    ) : (
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Profile" />
                    )}
                    <AvatarFallback>{studentName}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/profile">My Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/applications">My Applications</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}