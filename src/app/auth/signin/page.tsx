import { signIn } from "@/auth"
import { Github } from "lucide-react"

export default function SignIn() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mb-4">
            <span className="text-white font-bold text-xl">M</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome to MementoAI
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Your personal AI coding memory layer
          </p>
        </div>

        <div className="mt-8">
          <form
            action={async () => {
              "use server"
              await signIn("github", { redirectTo: "/dashboard" })
            }}
          >
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
            >
              <Github className="w-5 h-5 mr-2" />
              Sign in with GitHub
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              By signing in, you agree to access your GitHub repositories to create
              intelligent code summaries and reusable integration patterns.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 