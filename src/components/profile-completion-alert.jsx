import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

export function ProfileCompletionAlert() {
  return (
    <Alert className="bg-amber-50 border-amber-200">
      <AlertCircle className="h-4 w-4 text-amber-600" />
      <AlertTitle className="text-amber-800">Complete Your Profile</AlertTitle>
      <AlertDescription className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="text-amber-700">
          Your profile is incomplete. Companies can only see your profile and consider you for opportunities when your
          profile is complete.
        </div>
        <Button
          variant="outline"
          className="border-amber-500 text-amber-700 hover:bg-amber-100 hover:text-amber-800 md:ml-auto"
        >
          Complete Now
        </Button>
      </AlertDescription>
    </Alert>
  )
}
