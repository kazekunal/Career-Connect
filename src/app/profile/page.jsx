'use client'
import { StudentHeader } from "@/components/student-header"
import dynamic from 'next/dynamic'

// Use dynamic import for the component that might be using localStorage
const StudentProfile = dynamic(
  () => import('@/components/student-profile').then(mod => mod.StudentProfile),
  { ssr: false } // Disable server-side rendering for this component
)

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