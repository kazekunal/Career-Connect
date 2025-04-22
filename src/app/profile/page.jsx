'use client'
import { StudentHeader } from "@/components/student-header"
import { StudentProfile } from "@/components/student-profile"

export default function StudentProfilePage() {
  return (
    <div className="min-h-screen bg-blue-50 flex flex-col">
      <StudentHeader />

      <main className="flex-1 container mx-auto p-4 md:p-6">
        <h1 className="text-2xl font-bold mb-6">My Profile</h1>
        <StudentProfile onProfileUpdate={() => {}} />
      </main>
    </div>
  )
}
