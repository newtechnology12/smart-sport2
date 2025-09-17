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
import { 
  Calendar, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Eye, 
  MapPin, 
  Clock, 
  Users, 
  Trophy, 
  Star,
  BarChart3,
  DollarSign,
  TrendingUp,
  Settings,
  Trash2,
  MoreHorizontal,
  Activity
} from "lucide-react"

function AdminMatches() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [teamFilter, setTeamFilter] = useState("all")

  // Mock matches data - Admin view with all teams
  const upcomingMatches = [
    {
      id: 1,
      homeTeam: "APR FC",
      awayTeam: "Rayon Sports",
      date: "2024-03-20",
      time: "16:00",
      venue: "Amahoro Stadium",
      competition: "Rwanda Premier League",
      status: "upcoming",
      ticketsSold: 12000,
      totalCapacity: 30000,
      ticketPrice: 5000,
      expectedRevenue: 60000000,
      organizer: "Rwanda Football Federation"
    },
    {
      id: 2,
      homeTeam: "AS Kigali",
      awayTeam: "Police FC",
      date: "2024-03-25",
      time: "19:00",
      venue: "Kigali Stadium",
      competition: "Rwanda Premier League",
      status: "upcoming",
      ticketsSold: 8500,
      totalCapacity: 25000,
      ticketPrice: 3000,
      expectedRevenue: 25500000,
      organizer: "Rwanda Football Federation"
    },
    {
      id: 3,
      homeTeam: "Mukura VS",
      awayTeam: "Gasogi United",
      date: "2024-03-28",
      time: "15:00",
      venue: "Huye Stadium",
      competition: "Rwanda Premier League",
      status: "upcoming",
      ticketsSold: 6000,
      totalCapacity: 20000,
      ticketPrice: 2000,
      expectedRevenue: 12000000,
      organizer: "Rwanda Football Federation"
    }
  ]

  const recentMatches = [
    {
      id: 4,
      homeTeam: "APR FC",
      awayTeam: "Police FC",
      date: "2024-03-10",
      time: "15:00",
      venue: "Amahoro Stadium",
      competition: "Rwanda Premier League",
      status: "completed",
      ticketsSold: 18000,
      totalCapacity: 30000,
      ticketPrice: 4000,
      revenue: 72000000,
      result: "W 2-1",
      organizer: "Rwanda Football Federation"
    },
    {
      id: 5,
      homeTeam: "Rayon Sports",
      awayTeam: "Mukura VS",
      date: "2024-03-05",
      time: "16:30",
      venue: "Huye Stadium",
      competition: "Rwanda Premier League",
      status: "completed",
      ticketsSold: 15000,
      totalCapacity: 20000,
      ticketPrice: 3500,
      revenue: 52500000,
      result: "D 1-1",
      organizer: "Rwanda Football Federation"
    },
    {
      id: 6,
      homeTeam: "AS Kigali",
      awayTeam: "Gasogi United",
      date: "2024-02-28",
      time: "18:00",
      venue: "Kigali Stadium",
      competition: "Rwanda Premier League",
      status: "completed",
      ticketsSold: 12000,
      totalCapacity: 25000,
      ticketPrice: 3000,
      revenue: 36000000,
      result: "L 0-1",
      organizer: "Rwanda Football Federation"
    }
  ]

  const cancelledMatches = [
    {
      id: 7,
      homeTeam: "Police FC",
      awayTeam: "Mukura VS",
      date: "2024-02-20",
      time: "16:00",
      venue: "Amahoro Stadium",
      competition: "Rwanda Premier League",
      status: "cancelled",
      ticketsSold: 8000,
      totalCapacity: 30000,
      ticketPrice: 4000,
      refundAmount: 32000000,
      organizer: "Rwanda Football Federation",
      reason: "Weather conditions"
    }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'upcoming': return <Badge className="bg-blue-100 text-blue-800">Upcoming</Badge>
      case 'completed': return <Badge className="bg-green-100 text-green-800">Completed</Badge>
      case 'cancelled': return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>
      case 'live': return <Badge className="bg-orange-100 text-orange-800">Live</Badge>
      default: return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getResultBadge = (result: string) => {
    if (result.startsWith('W')) return <Badge className="bg-green-100 text-green-800">Win</Badge>
    if (result.startsWith('L')) return <Badge className="bg-red-100 text-red-800">Loss</Badge>
    if (result.startsWith('D')) return <Badge className="bg-yellow-100 text-yellow-800">Draw</Badge>
    return <Badge variant="secondary">{result}</Badge>
  }

  const allMatches = [...upcomingMatches, ...recentMatches, ...cancelledMatches]
  const totalUpcomingTickets = upcomingMatches.reduce((sum, match) => sum + match.ticketsSold, 0)
  const totalUpcomingRevenue = upcomingMatches.reduce((sum, match) => sum + match.expectedRevenue, 0)
  const totalRecentRevenue = recentMatches.reduce((sum, match) => sum + match.revenue, 0)
  const totalRefunds = cancelledMatches.reduce((sum, match) => sum + (match.refundAmount || 0), 0)

  const filteredMatches = allMatches.filter(match => {
    const matchesSearch = match.homeTeam.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         match.awayTeam.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         match.venue.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         match.competition.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || match.status === statusFilter
    const matchesTeam = teamFilter === 'all' || 
                       match.homeTeam.toLowerCase().includes(teamFilter.toLowerCase()) ||
                       match.awayTeam.toLowerCase().includes(teamFilter.toLowerCase())
    
    return matchesSearch && matchesStatus && matchesTeam
  })

  const teams = [...new Set(allMatches.flatMap(match => [match.homeTeam, match.awayTeam]))]

  return (
    <DashboardLayout>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold apple-title mb-2">Admin Matches</h1>
            <p className="text-muted-foreground apple-body">
              Manage and monitor all matches across the platform
            </p>
          </div>
          <div className="flex gap-3">
            <Button className="apple-button">
              <Plus className="h-4 w-4 mr-2" />
              Create Match
            </Button>
            <Button variant="outline" className="apple-button">
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics
            </Button>
            <Button variant="outline" className="apple-button">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="apple-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Matches</p>
                  <p className="text-2xl font-bold">{allMatches.length}</p>
                </div>
                <Calendar className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="apple-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Upcoming Matches</p>
                  <p className="text-2xl font-bold">{upcomingMatches.length}</p>
                </div>
                <Clock className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="apple-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold">{(totalRecentRevenue / 1000000).toFixed(1)}M RWF</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="apple-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Expected Revenue</p>
                  <p className="text-2xl font-bold">{(totalUpcomingRevenue / 1000000).toFixed(1)}M RWF</p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="apple-card">
          <CardHeader>
            <CardTitle className="apple-subtitle flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters & Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search matches, teams, venues..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 apple-focus"
                />
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="apple-focus">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="live">Live</SelectItem>
                </SelectContent>
              </Select>

              <Select value={teamFilter} onValueChange={setTeamFilter}>
                <SelectTrigger className="apple-focus">
                  <SelectValue placeholder="All Teams" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Teams</SelectItem>
                  {teams.map(team => (
                    <SelectItem key={team} value={team}>{team}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('')
                  setStatusFilter('all')
                  setTeamFilter('all')
                }}
                className="apple-button"
              >
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Matches ({filteredMatches.length})</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming ({upcomingMatches.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({recentMatches.length})</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled ({cancelledMatches.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <Card className="apple-card">
              <CardHeader>
                <CardTitle>All Matches</CardTitle>
                <CardDescription>
                  Complete overview of all matches across the platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Match</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Venue</TableHead>
                      <TableHead>Competition</TableHead>
                      <TableHead>Tickets Sold</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMatches.map((match) => (
                      <TableRow key={match.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{match.homeTeam} vs {match.awayTeam}</div>
                            <div className="text-sm text-muted-foreground">{match.organizer}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <div className="text-sm">{match.date}</div>
                              <div className="text-xs text-muted-foreground">{match.time}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            {match.venue}
                          </div>
                        </TableCell>
                        <TableCell>{match.competition}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <div className="text-sm font-medium">{match.ticketsSold.toLocaleString()}</div>
                              <div className="text-xs text-muted-foreground">of {match.totalCapacity.toLocaleString()}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm font-medium">
                            {match.status === 'completed' 
                              ? `${(match.revenue / 1000000).toFixed(1)}M RWF`
                              : match.status === 'cancelled'
                              ? `Refund: ${((match.refundAmount || 0) / 1000000).toFixed(1)}M RWF`
                              : `Expected: ${(match.expectedRevenue / 1000000).toFixed(1)}M RWF`
                            }
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(match.status)}
                            {match.result && getResultBadge(match.result)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="destructive">
                              <Trash2 className="h-4 w-4" />
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

          <TabsContent value="upcoming" className="space-y-4">
            <Card className="apple-card">
              <CardHeader>
                <CardTitle>Upcoming Matches</CardTitle>
                <CardDescription>
                  Matches scheduled for the future
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {upcomingMatches.map((match) => (
                    <Card key={match.id} className="apple-card">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{match.homeTeam} vs {match.awayTeam}</CardTitle>
                          {getStatusBadge(match.status)}
                        </div>
                        <CardDescription>{match.competition}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            {match.date} at {match.time}
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            {match.venue}
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Tickets Sold:</span>
                            <span className="font-medium">{match.ticketsSold.toLocaleString()}/{match.totalCapacity.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Price:</span>
                            <span className="font-medium">{match.ticketPrice.toLocaleString()} RWF</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Expected Revenue:</span>
                            <span className="font-medium">{(match.expectedRevenue / 1000000).toFixed(1)}M RWF</span>
                          </div>
                        </div>

                        <div className="flex gap-2 pt-4 border-t">
                          <Button size="sm" variant="outline" className="flex-1">
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Button>
                          <Button size="sm" className="apple-button flex-1">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            <Card className="apple-card">
              <CardHeader>
                <CardTitle>Completed Matches</CardTitle>
                <CardDescription>
                  Recently completed matches with results and revenue
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Match</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Result</TableHead>
                      <TableHead>Tickets Sold</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentMatches.map((match) => (
                      <TableRow key={match.id}>
                        <TableCell>
                          <div className="font-medium">{match.homeTeam} vs {match.awayTeam}</div>
                          <div className="text-sm text-muted-foreground">{match.competition}</div>
                        </TableCell>
                        <TableCell>{match.date}</TableCell>
                        <TableCell>{getResultBadge(match.result)}</TableCell>
                        <TableCell>{match.ticketsSold.toLocaleString()}</TableCell>
                        <TableCell className="font-medium">{(match.revenue / 1000000).toFixed(1)}M RWF</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <BarChart3 className="h-4 w-4" />
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

          <TabsContent value="cancelled" className="space-y-4">
            <Card className="apple-card">
              <CardHeader>
                <CardTitle>Cancelled Matches</CardTitle>
                <CardDescription>
                  Matches that were cancelled with refund information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Match</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Tickets Sold</TableHead>
                      <TableHead>Refund Amount</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cancelledMatches.map((match) => (
                      <TableRow key={match.id}>
                        <TableCell>
                          <div className="font-medium">{match.homeTeam} vs {match.awayTeam}</div>
                          <div className="text-sm text-muted-foreground">{match.competition}</div>
                        </TableCell>
                        <TableCell>{match.date}</TableCell>
                        <TableCell>{match.reason}</TableCell>
                        <TableCell>{match.ticketsSold.toLocaleString()}</TableCell>
                        <TableCell className="font-medium text-red-600">
                          -{((match.refundAmount || 0) / 1000000).toFixed(1)}M RWF
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Activity className="h-4 w-4" />
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

export default withAuth(AdminMatches, ['admin'])
