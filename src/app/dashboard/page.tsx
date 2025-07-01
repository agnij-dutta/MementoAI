import { auth } from "@/auth"
import { redirect } from "next/navigation"
import DashboardClient from "../../components/dashboard/DashboardClient"

export default async function Dashboard() {
  const session = await auth()
  
  if (!session?.user) {
    redirect("/auth/signin")
  }

  return <DashboardClient session={session} />
} 