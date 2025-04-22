import { StudentHeader } from "@/components/student-header"
import { Card, CardContent } from "@/components/ui/card"
import { Bell, BriefcaseBusiness, Calendar, CheckCircle2 } from "lucide-react"

export default function StudentNotifications() {
  // Sample notifications
  const notifications = [
    {
      id: 1,
      title: "Profile Completion Reminder",
      description: "Complete your profile to increase your chances of getting hired.",
      date: "2 hours ago",
      icon: <CheckCircle2 className="h-5 w-5 text-amber-500" />,
      read: false,
    },
    {
      id: 2,
      title: "New Job Matches",
      description: "5 new jobs match your profile. Check them out!",
      date: "Yesterday",
      icon: <BriefcaseBusiness className="h-5 w-5 text-blue-500" />,
      read: true,
    },
    {
      id: 3,
      title: "Upcoming Placement Drive",
      description: "Microsoft is conducting a placement drive next week. Register now!",
      date: "3 days ago",
      icon: <Calendar className="h-5 w-5 text-green-500" />,
      read: true,
    },
  ]

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col">
      <StudentHeader />

      <main className="flex-1 container mx-auto p-4 md:p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Notifications</h1>
          <button className="text-sm text-blue-600 hover:underline">Mark all as read</button>
        </div>

        {notifications.length > 0 ? (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <Card
                key={notification.id}
                className={`border-l-4 ${notification.read ? "border-l-gray-300" : "border-l-blue-500"}`}
              >
                <CardContent className="p-4 flex items-start gap-4">
                  <div className="flex-shrink-0 bg-gray-100 p-2 rounded-full">{notification.icon}</div>
                  <div className="flex-1">
                    <h3 className={`font-medium ${notification.read ? "text-gray-700" : "text-black"}`}>
                      {notification.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{notification.description}</p>
                    <p className="text-gray-400 text-xs mt-1">{notification.date}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-medium text-gray-700 mb-2">No Notifications</h2>
            <p className="text-gray-500">You don't have any notifications yet.</p>
          </div>
        )}
      </main>
    </div>
  )
}
