import { StudentHeader } from "@/components/student-header"

export default function StudentApplications() {
  return (
    <div className="min-h-screen bg-blue-50 flex flex-col">
      <StudentHeader />

      <main className="flex-1 container mx-auto p-4 md:p-6">
        <h1 className="text-2xl font-bold mb-6">My Applications</h1>

        <div className="bg-white rounded-lg shadow p-8 text-center">
          <h2 className="text-xl font-medium text-gray-700 mb-2">No Applications Yet</h2>
          <p className="text-gray-500 mb-6">
            You haven't applied to any jobs yet. Browse available opportunities and start applying!
          </p>
          <a href="/dashboard" className="text-blue-600 hover:underline">
            Browse Jobs
          </a>
        </div>
      </main>
    </div>
  )
}
