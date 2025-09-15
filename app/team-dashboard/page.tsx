"use client"

import React, { useState } from 'react'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { withAuth } from '@/lib/auth-context'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Trophy,
  Users,
  Ticket,
  DollarSign,
  Calendar,
  MapPin,
  Clock,
  TrendingUp,
  BarChart3,
  Edit,
  Save,
  Upload,
  Download,
  Eye,
  Star,
  Target,
  Activity,
  Settings
} from 'lucide-react'
import { matches, userTickets } from '@/lib/dummy-data'

function TeamDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isEditing, setIsEditing] = useState(false)
  const [teamInfo, setTeamInfo] = useState({
    name: "APR FC",
    sport: "Football",
    founded: "1993",
    stadium: "Kigali Stadium",
    capacity: "30,000",
    description: "APR FC is one of Rwanda's most successful football clubs, with a rich history of achievements in both domestic and international competitions.",
    website: "https://aprfc.rw",
    email: "info@aprfc.rw",
    phone: "+250 788 123 456"
  })

  // Mock team stats
  const teamStats = {
    totalFans: 25000,
    ticketsSold: 1250,
    revenue: 3750000,
    upcomingMatches: 5,
    totalMatches: 15,
    wins: 10,
    draws: 3,
    losses: 2,
    goalsFor: 28,
    goalsAgainst: 12
  }

  // Team's upcoming matches
  const teamMatches = matches.filter(match => 
    match.home_team === teamInfo.name || match.away_team === teamInfo.name
  ).slice(0, 5)

  // Team's ticket sales
  const teamTicketSales = userTickets.filter(ticket => 
    ticket.match.home_team === teamInfo.name || ticket.match.away_team === teamInfo.name
  )

  const handleSaveTeamInfo = () => {
    setIsEditing(false)
    // In a real app, this would save to the backend
    console.log('Saving team info:', teamInfo)
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold apple-title mb-2">
                {teamInfo.name} Dashboard
              </h1>
              <p className="text-white/90 apple-body text-lg">
                Manage your team profile and track performance
              </p>
            </div>
            <div className="hidden md:block">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                <Trophy className="h-12 w-12 text-white" />
              </div>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 h-auto">
            <TabsTrigger value="overview" className="apple-button">Overview</TabsTrigger>
            <TabsTrigger value="profile" className="apple-button">Team Profile</TabsTrigger>
            <TabsTrigger value="matches" className="apple-button">Matches</TabsTrigger>
            <TabsTrigger value="tickets" className="apple-button">Ticket Sales</TabsTrigger>
            <TabsTrigger value="analytics" className="apple-button">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="apple-card">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{teamStats.totalFans.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">Total Fans</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="apple-card">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Ticket className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{teamStats.ticketsSold.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">Tickets Sold</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="apple-card">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <DollarSign className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{(teamStats.revenue / 1000000).toFixed(1)}M</div>
                      <div className="text-sm text-muted-foreground">Revenue (RWF)</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="apple-card">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                      <Trophy className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{teamStats.wins}</div>
                      <div className="text-sm text-muted-foreground">Wins This Season</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Performance Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="apple-card">
                <CardHeader>
                  <CardTitle className="apple-subtitle flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Season Performance
                  </CardTitle>
                  <CardDescription>Current season statistics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Matches Played</span>
                      <span className="font-semibold">{teamStats.totalMatches}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Wins</span>
                      <span className="font-semibold text-green-600">{teamStats.wins}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Draws</span>
                      <span className="font-semibold text-yellow-600">{teamStats.draws}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Losses</span>
                      <span className="font-semibold text-red-600">{teamStats.losses}</span>
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex items-center justify-between">
                        <span>Win Rate</span>
                        <span className="font-semibold text-primary">
                          {((teamStats.wins / teamStats.totalMatches) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="apple-card">
                <CardHeader>
                  <CardTitle className="apple-subtitle flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Goal Statistics
                  </CardTitle>
                  <CardDescription>Offensive and defensive performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Goals Scored</span>
                      <span className="font-semibold text-green-600">{teamStats.goalsFor}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Goals Conceded</span>
                      <span className="font-semibold text-red-600">{teamStats.goalsAgainst}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Goal Difference</span>
                      <span className="font-semibold text-primary">
                        +{teamStats.goalsFor - teamStats.goalsAgainst}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Goals per Match</span>
                      <span className="font-semibold">
                        {(teamStats.goalsFor / teamStats.totalMatches).toFixed(1)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Upcoming Matches */}
            <Card className="apple-card">
              <CardHeader>
                <CardTitle className="apple-subtitle">Upcoming Matches</CardTitle>
                <CardDescription>Your next scheduled games</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teamMatches.slice(0, 3).map((match) => (
                    <div key={match.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <Trophy className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <div className="font-semibold">
                            {match.home_team} vs {match.away_team}
                          </div>
                          <div className="text-sm text-muted-foreground flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {match.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {match.time}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {match.location}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Badge variant="outline">{match.sport}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card className="apple-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="apple-subtitle">Team Profile</CardTitle>
                    <CardDescription>Manage your team information and settings</CardDescription>
                  </div>
                  <Button
                    onClick={() => isEditing ? handleSaveTeamInfo() : setIsEditing(true)}
                    className="apple-button"
                  >
                    {isEditing ? (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </>
                    ) : (
                      <>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Profile
                      </>
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Team Name</label>
                      {isEditing ? (
                        <Input
                          value={teamInfo.name}
                          onChange={(e) => setTeamInfo({...teamInfo, name: e.target.value})}
                          className="apple-focus"
                        />
                      ) : (
                        <div className="p-2 border rounded-lg bg-muted/50">{teamInfo.name}</div>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-medium">Sport</label>
                      {isEditing ? (
                        <Input
                          value={teamInfo.sport}
                          onChange={(e) => setTeamInfo({...teamInfo, sport: e.target.value})}
                          className="apple-focus"
                        />
                      ) : (
                        <div className="p-2 border rounded-lg bg-muted/50">{teamInfo.sport}</div>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-medium">Founded</label>
                      {isEditing ? (
                        <Input
                          value={teamInfo.founded}
                          onChange={(e) => setTeamInfo({...teamInfo, founded: e.target.value})}
                          className="apple-focus"
                        />
                      ) : (
                        <div className="p-2 border rounded-lg bg-muted/50">{teamInfo.founded}</div>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-medium">Stadium</label>
                      {isEditing ? (
                        <Input
                          value={teamInfo.stadium}
                          onChange={(e) => setTeamInfo({...teamInfo, stadium: e.target.value})}
                          className="apple-focus"
                        />
                      ) : (
                        <div className="p-2 border rounded-lg bg-muted/50">{teamInfo.stadium}</div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Stadium Capacity</label>
                      {isEditing ? (
                        <Input
                          value={teamInfo.capacity}
                          onChange={(e) => setTeamInfo({...teamInfo, capacity: e.target.value})}
                          className="apple-focus"
                        />
                      ) : (
                        <div className="p-2 border rounded-lg bg-muted/50">{teamInfo.capacity}</div>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-medium">Website</label>
                      {isEditing ? (
                        <Input
                          value={teamInfo.website}
                          onChange={(e) => setTeamInfo({...teamInfo, website: e.target.value})}
                          className="apple-focus"
                        />
                      ) : (
                        <div className="p-2 border rounded-lg bg-muted/50">{teamInfo.website}</div>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-medium">Email</label>
                      {isEditing ? (
                        <Input
                          value={teamInfo.email}
                          onChange={(e) => setTeamInfo({...teamInfo, email: e.target.value})}
                          className="apple-focus"
                        />
                      ) : (
                        <div className="p-2 border rounded-lg bg-muted/50">{teamInfo.email}</div>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-medium">Phone</label>
                      {isEditing ? (
                        <Input
                          value={teamInfo.phone}
                          onChange={(e) => setTeamInfo({...teamInfo, phone: e.target.value})}
                          className="apple-focus"
                        />
                      ) : (
                        <div className="p-2 border rounded-lg bg-muted/50">{teamInfo.phone}</div>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Team Description</label>
                  {isEditing ? (
                    <Textarea
                      value={teamInfo.description}
                      onChange={(e) => setTeamInfo({...teamInfo, description: e.target.value})}
                      className="apple-focus"
                      rows={4}
                    />
                  ) : (
                    <div className="p-3 border rounded-lg bg-muted/50">{teamInfo.description}</div>
                  )}
                </div>

                {isEditing && (
                  <div className="flex gap-4">
                    <Button variant="outline" onClick={() => setIsEditing(false)} className="apple-button">
                      Cancel
                    </Button>
                    <Button onClick={handleSaveTeamInfo} className="apple-button">
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="matches" className="space-y-6">
            <Card className="apple-card">
              <CardHeader>
                <CardTitle className="apple-subtitle">Match Schedule</CardTitle>
                <CardDescription>View and manage your team's matches</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Match</TableHead>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {teamMatches.map((match) => (
                        <TableRow key={match.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                                <Trophy className="h-4 w-4 text-primary" />
                              </div>
                              <div>
                                <div className="font-medium">
                                  {match.home_team} vs {match.away_team}
                                </div>
                                <div className="text-sm text-muted-foreground">{match.sport}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div>{match.date}</div>
                              <div className="text-muted-foreground">{match.time}</div>
                            </div>
                          </TableCell>
                          <TableCell>{match.location}</TableCell>
                          <TableCell>
                            <Badge variant="default">{match.status}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button variant="ghost" size="sm" className="apple-button">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="apple-button">
                                <BarChart3 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tickets" className="space-y-6">
            <Card className="apple-card">
              <CardHeader>
                <CardTitle className="apple-subtitle">Ticket Sales</CardTitle>
                <CardDescription>Track ticket sales for your matches</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Match</TableHead>
                        <TableHead>Tickets Sold</TableHead>
                        <TableHead>Revenue</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {teamTicketSales.map((ticket) => (
                        <TableRow key={ticket.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">
                                {ticket.match.home_team} vs {ticket.match.away_team}
                              </div>
                              <div className="text-sm text-muted-foreground">{ticket.match.date}</div>
                            </div>
                          </TableCell>
                          <TableCell className="font-semibold">{ticket.quantity}</TableCell>
                          <TableCell className="font-semibold">{ticket.total.toLocaleString()} RWF</TableCell>
                          <TableCell>
                            <Badge variant="default">{ticket.status}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button variant="ghost" size="sm" className="apple-button">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="apple-button">
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="apple-card">
                <CardHeader>
                  <CardTitle className="apple-subtitle flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Revenue Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Ticket Sales</span>
                      <span className="font-semibold">{(teamStats.revenue * 0.8 / 1000000).toFixed(1)}M RWF</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Merchandise</span>
                      <span className="font-semibold">{(teamStats.revenue * 0.15 / 1000000).toFixed(1)}M RWF</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Sponsorship</span>
                      <span className="font-semibold">{(teamStats.revenue * 0.05 / 1000000).toFixed(1)}M RWF</span>
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex items-center justify-between font-bold">
                        <span>Total Revenue</span>
                        <span className="text-primary">{(teamStats.revenue / 1000000).toFixed(1)}M RWF</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="apple-card">
                <CardHeader>
                  <CardTitle className="apple-subtitle flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Fan Engagement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Total Fans</span>
                      <span className="font-semibold">{teamStats.totalFans.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Average Attendance</span>
                      <span className="font-semibold">{Math.floor(teamStats.ticketsSold / teamStats.totalMatches * 10).toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Fan Growth</span>
                      <span className="font-semibold text-green-600">+12.5%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Engagement Rate</span>
                      <span className="font-semibold text-green-600">85.2%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="apple-card">
              <CardHeader>
                <CardTitle className="apple-subtitle">Export Reports</CardTitle>
                <CardDescription>Download detailed analytics and reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="apple-button">
                    <Download className="mr-2 h-4 w-4" />
                    Match Report
                  </Button>
                  <Button variant="outline" className="apple-button">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Sales Report
                  </Button>
                  <Button variant="outline" className="apple-button">
                    <Users className="mr-2 h-4 w-4" />
                    Fan Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

export default withAuth(TeamDashboard, ['team'])
