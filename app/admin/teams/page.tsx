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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trophy, Plus, Search, Filter, Edit, Trash2, Eye, Users, Star, MapPin, Calendar } from "lucide-react"

function AdminTeams() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Mock teams data
  const teams = [
    {
      id: 1,
      name: "APR FC",
      sport: "Football",
      league: "Rwanda Premier League",
      status: "active",
      members: 25,
      founded: "1993",
      location: "Kigali",
      revenue: 15000000,
      ticketsSold: 45000,
      rating: 4.8
    },
    {
      id: 2,
      name: "Rayon Sports",
      sport: "Football",
      league: "Rwanda Premier League",
      status: "active",
      members: 28,
      founded: "1968",
      location: "Kigali",
      revenue: 12000000,
      ticketsSold: 38000,
      rating: 4.6
    },
    {
      id: 3,
      name: "Patriots Basketball",
      sport: "Basketball",
      league: "Rwanda Basketball League",
      status: "pending",
      members: 15,
      founded: "2010",
      location: "Kigali",
      revenue: 8000000,
      ticketsSold: 12000,
      rating: 4.4
    },
    {
      id: 4,
      name: "Rwanda Volleyball",
      sport: "Volleyball",
      league: "Rwanda Volleyball League",
      status: "inactive",
      members: 20,
      founded: "2005",
      location: "Huye",
      revenue: 5000000,
      ticketsSold: 8000,
      rating: 4.2
    }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case 'pending': return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case 'inactive': return <Badge className="bg-red-100 text-red-800">Inactive</Badge>
      default: return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getSportIcon = (sport: string) => {
    switch (sport) {
      case 'Football': return '⚽'
      case 'Basketball': return '🏀'
      case 'Volleyball': return '🏐'
      default: return '🏆'
    }
  }

  const filteredTeams = teams.filter(team => {
    const matchesSearch = 
      team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.sport.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.league.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || team.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalRevenue = teams.reduce((sum, team) => sum + team.revenue, 0)
  const totalTicketsSold = teams.reduce((sum, team) => sum + team.ticketsSold, 0)
  const activeTeams = teams.filter(team => team.status === 'active').length

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Team Management</h1>
            <p className="text-gray-600 mt-1">Manage all registered teams and organizations</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Team
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Teams</p>
                  <p className="text-2xl font-bold text-gray-900">{teams.length}</p>
                </div>
                <Trophy className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Teams</p>
                  <p className="text-2xl font-bold text-gray-900">{activeTeams}</p>
                </div>
                <Users className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">{(totalRevenue / 1000000).toFixed(1)}M RWF</p>
                </div>
                <Trophy className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Tickets Sold</p>
                  <p className="text-2xl font-bold text-gray-900">{totalTicketsSold.toLocaleString()}</p>
                </div>
                <Trophy className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search teams..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Teams</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Teams Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Teams</CardTitle>
            <CardDescription>Manage and monitor all registered teams</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Team</TableHead>
                  <TableHead>Sport & League</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Members</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>Tickets Sold</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTeams.map((team) => (
                  <TableRow key={team.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-blue-100 text-blue-600 font-bold">
                            {team.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-gray-900">{team.name}</p>
                          <p className="text-sm text-gray-500">Founded {team.founded}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{getSportIcon(team.sport)}</span>
                        <div>
                          <p className="text-sm font-medium">{team.sport}</p>
                          <p className="text-xs text-gray-500">{team.league}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(team.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{team.members}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm font-medium">{(team.revenue / 1000000).toFixed(1)}M RWF</p>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm font-medium">{team.ticketsSold.toLocaleString()}</p>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{team.rating}</span>
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
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
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
      </div>
    </DashboardLayout>
  )
}

export default withAuth(AdminTeams)
