import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeader } from "../utilisateur/components/header"
import { Activity, Users, Box, BarChart } from 'lucide-react'

export default function UtilisateurPage() {
  return (
    <div className="min-h-screen bg-blue-50">
      <SiteHeader />
      <main className="container py-6 space-y-8 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-blue-900 mb-6">Dashboard</h1>
        {/* Small Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 w-full max-w-5xl">
          <Card className="bg-blue-500 border-blue-600 shadow-md hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Total Users</CardTitle>
              <Users className="h-4 w-4 text-white" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">2,850</div>
              <p className="text-xs text-blue-100">+180 from last month</p>
            </CardContent>
          </Card>
          <Card className="bg-blue-500 border-blue-600 shadow-md hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Active Projects</CardTitle>
              <Activity className="h-4 w-4 text-white" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">48</div>
              <p className="text-xs text-blue-100">+12 from last month</p>
            </CardContent>
          </Card>
          <Card className="bg-blue-500 border-blue-600 shadow-md hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Total Products</CardTitle>
              <Box className="h-4 w-4 text-white" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">1,250</div>
              <p className="text-xs text-blue-100">+25 from last month</p>
            </CardContent>
          </Card>
          <Card className="bg-blue-500 border-blue-600 shadow-md hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Revenue</CardTitle>
              <BarChart className="h-4 w-4 text-white" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">$45,231</div>
              <p className="text-xs text-blue-100">+20.1% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Large Cards */}
        <div className="grid gap-4 md:grid-cols-2 w-full max-w-5xl">
          <Card className="bg-white border-blue-100 shadow-md hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="text-blue-900">Monthly Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-blue-700">
                Detailed analysis of your monthly performance metrics and key indicators.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white border-blue-100 shadow-md hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="text-blue-900">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-blue-700">
                Track your latest actions and system updates in real-time.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white border-blue-100 shadow-md hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="text-blue-900">Team Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-blue-700">
                Monitor your team's productivity and collaboration metrics.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white border-blue-100 shadow-md hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="text-blue-900">Resource Allocation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-blue-700">
                Optimize your resource distribution and project assignments.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

