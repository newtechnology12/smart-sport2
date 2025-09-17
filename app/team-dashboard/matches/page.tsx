"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { withAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Plus, Search, Filter, Edit, Eye, MapPin, Clock, Users, Trophy, Star } from "lucide-react"

function TeamMatches() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Mock matches data
  const upcomingMatches = [
    {
      id: 1,
      opponent: "Rayon Sports",
      date: "2024-03-20",
      time: "16:00",
      venue: "Amahoro Stadium",
      competition: "Rwanda Premier League",
      status: "upcoming",
      ticketsSold: 12000,
      totalCapacity: 30000,
      ticketPrice: 5000,
      expectedRevenue: 60000000
    },
    {
      id: 2,
      opponent: "AS Kigali",
      date: "2024-03-25",
      time: "19:00",
      venue: "Kigali Stadium",
      competition: "Rwanda Premier League",
      status: "upcoming",
      ticketsSold: 8500,
      totalCapacity: 25000,
      ticketPrice: 3000,
      expectedRevenue: 25500000
    }
  ]

  const recentMatches = [
    {
      id: 3,
      opponent: "Police FC",
      date: "2024-03-10",
      time: "15:00",
      venue: "Amahoro Stadium",
      competition: "Rwanda Premier League",
      status: "completed",
      ticketsSold: 18000,
      totalCapacity: 30000,
      ticketPrice: 4000,
      revenue: 72000000,
      result: "W 2-1"
    },
    {
      id: 4,
      opponent: "Mukura VS",
      date: "2024-03-05",
      time: "16:30",
      venue: "Huye Stadium",
      competition: "Rwanda Premier League",
      status: "completed",
      ticketsSold: 15000,
      totalCapacity: 20000,
      ticketPrice: 3500,
      revenue: 52500000,
      result: "D 1-1"
    }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'upcoming': return <Badge className="bg-blue-100 text-blue-800">Upcoming</Badge>
      case 'completed': return <Badge className="bg-green-100 text-green-800">Completed</Badge>
      case 'cancelled': return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>
      default: return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getResultBadge = (result: string) => {
    if (result.startsWith('W')) return <Badge className="bg-green-100 text-green-800">Win</Badge>
    if (result.startsWith('L')) return <Badge className="bg-red-100 text-red-800">Loss</Badge>
    if (result.startsWith('D')) return <Badge className="bg-yellow-100 text-yellow-800">Draw</Badge>
    return <Badge variant="secondary">{result}</Badge>
  }

  const totalUpcomingTickets = upcomingMatches.reduce((sum, match) => sum + match.ticketsSold, 0)
  const totalUpcomingRevenue = upcomingMatches.reduce((sum, match) => sum + match.expectedRevenue, 0)
  const totalRecentRevenue = recentMatches.reduce((sum, match) => sum + match.revenue, 0)

  return (
    <DashboardLayout>
      <div className="space-y-0">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Team Matches</h1>
            <p className="text-gray-600 mt-1">Manage your team's matches and ticket sales</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Match
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Upcoming Matches</p>
                  <p className="text-2xl font-bold text-gray-900">{upcomingMatches.length}</p>
                </div>
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Tickets Sold</p>
                  <p className="text-2xl font-bold text-gray-900">{totalUpcomingTickets.toLocaleString()}</p>
                </div>
                <Users className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Expected Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">{(totalUpcomingRevenue / 1000000).toFixed(1)}M RWF</p>
                </div>
                <Trophy className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Recent Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">{(totalRecentRevenue / 1000000).toFixed(1)}M RWF</p>
                </div>
                <Star className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upcoming">Upcoming Matches</TabsTrigger>
            <TabsTrigger value="recent">Recent Matches</TabsTrigger>
          </TabsList>

          {/* Upcoming Matches */}
          <TabsContent value="upcoming" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Matches</CardTitle>
                <CardDescription>Manage your upcoming matches and ticket sales</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Match</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Venue</TableHead>
                      <TableHead>Competition</TableHead>
                      <TableHead>Ticket Sales</TableHead>
                      <TableHead>Expected Revenue</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {upcomingMatches.map((match) => (
                      <TableRow key={match.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium text-gray-900">vs {match.opponent}</p>
                            <p className="text-sm text-gray-500">Home Match</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <div>
                              <p className="text-sm font-medium">{match.date}</p>
                              <p className="text-sm text-gray-500">{match.time}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            <span className="text-sm">{match.venue}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <p className="text-sm">{match.competition}</p>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="text-sm font-medium">{match.ticketsSold.toLocaleString()}</p>
                            <p className="text-xs text-gray-500">of {match.totalCapacity.toLocaleString()}</p>
                            <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                              <div 
                                className="bg-blue-600 h-2 rounded-full" 
                                style={{width: `${(match.ticketsSold / match.totalCapacity) * 100}%`}}
                              ></div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="text-sm font-medium">{match.expectedRevenue.toLocaleString()} RWF</p>
                            <p className="text-xs text-gray-500">{match.ticketPrice.toLocaleString()} RWF per ticket</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Recent Matches */}
          <TabsContent value="recent" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Matches</CardTitle>
                <CardDescription>View your completed matches and performance</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Match</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Venue</TableHead>
                      <TableHead>Result</TableHead>
                      <TableHead>Attendance</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentMatches.map((match) => (
                      <TableRow key={match.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium text-gray-900">vs {match.opponent}</p>
                            <p className="text-sm text-gray-500">{match.competition}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <div>
                              <p className="text-sm font-medium">{match.date}</p>
                              <p className="text-sm text-gray-500">{match.time}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            <span className="text-sm">{match.venue}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getResultBadge(match.result)}
                            <span className="text-sm font-medium">{match.result}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="text-sm font-medium">{match.ticketsSold.toLocaleString()}</p>
                            <p className="text-xs text-gray-500">of {match.totalCapacity.toLocaleString()}</p>
                            <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                              <div 
                                className="bg-green-600 h-2 rounded-full" 
                                style={{width: `${(match.ticketsSold / match.totalCapacity) * 100}%`}}
                              ></div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="text-sm font-medium">{match.revenue.toLocaleString()} RWF</p>
                            <p className="text-xs text-gray-500">{match.ticketPrice.toLocaleString()} RWF per ticket</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

export default withAuth(TeamMatches)
