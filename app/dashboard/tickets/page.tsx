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
import { Ticket, Search, Filter, Download, Eye, Calendar, MapPin, Clock, QrCode, Users } from "lucide-react"

function ClientTickets() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Mock tickets data
  const tickets = [
    {
      id: "TKT-001",
      event: "Rwanda vs Ghana - World Cup Qualifier",
      date: "2024-03-15",
      time: "19:00",
      venue: "Amahoro Stadium",
      section: "VIP A",
      seat: "A12",
      price: 15000,
      status: "active",
      qrCode: "QR123456789",
      purchaseDate: "2024-03-10"
    },
    {
      id: "TKT-002",
      event: "APR vs Rayon Sports - League Match",
      date: "2024-03-20",
      time: "16:00",
      venue: "Kigali Stadium",
      section: "General",
      seat: "G45",
      price: 5000,
      status: "used",
      qrCode: "QR987654321",
      purchaseDate: "2024-03-12"
    },
    {
      id: "TKT-003",
      event: "Basketball Championship Final",
      date: "2024-03-25",
      time: "18:30",
      venue: "BK Arena",
      section: "Premium",
      seat: "P08",
      price: 8000,
      status: "cancelled",
      qrCode: "QR456789123",
      purchaseDate: "2024-03-08"
    }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case 'used': return <Badge className="bg-blue-100 text-blue-800">Used</Badge>
      case 'cancelled': return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>
      case 'expired': return <Badge className="bg-gray-100 text-gray-800">Expired</Badge>
      default: return <Badge variant="secondary">{status}</Badge>
    }
  }

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = 
      ticket.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.venue.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalTickets = tickets.length
  const activeTickets = tickets.filter(t => t.status === 'active').length
  const usedTickets = tickets.filter(t => t.status === 'used').length
  const totalSpent = tickets.reduce((sum, ticket) => sum + ticket.price, 0)

  return (
    <DashboardLayout>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Tickets</h1>
            <p className="text-gray-600 mt-1">View and manage your event tickets</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Download className="h-4 w-4 mr-2" />
            Download All
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Tickets</p>
                  <p className="text-2xl font-bold text-gray-900">{totalTickets}</p>
                </div>
                <Ticket className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Tickets</p>
                  <p className="text-2xl font-bold text-gray-900">{activeTickets}</p>
                </div>
                <Users className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Used Tickets</p>
                  <p className="text-2xl font-bold text-gray-900">{usedTickets}</p>
                </div>
                <Calendar className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Spent</p>
                  <p className="text-2xl font-bold text-gray-900">{totalSpent.toLocaleString()} RWF</p>
                </div>
                <Ticket className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Tickets</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="used">Used</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>

          {/* All Tickets */}
          <TabsContent value="all" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search tickets..."
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
                      <SelectItem value="all">All Tickets</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="used">Used</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Tickets Table */}
            <Card>
              <CardHeader>
                <CardTitle>My Tickets</CardTitle>
                <CardDescription>View and manage all your event tickets</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ticket ID</TableHead>
                      <TableHead>Event</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Venue</TableHead>
                      <TableHead>Seat</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTickets.map((ticket) => (
                      <TableRow key={ticket.id}>
                        <TableCell>
                          <p className="font-medium text-gray-900">{ticket.id}</p>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium text-gray-900">{ticket.event}</p>
                            <p className="text-sm text-gray-500">{ticket.section}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <div>
                              <p className="text-sm font-medium">{ticket.date}</p>
                              <p className="text-sm text-gray-500">{ticket.time}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            <span className="text-sm">{ticket.venue}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <p className="text-sm font-medium">{ticket.seat}</p>
                        </TableCell>
                        <TableCell>
                          <p className="text-sm font-medium">{ticket.price.toLocaleString()} RWF</p>
                        </TableCell>
                        <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <QrCode className="h-4 w-4" />
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

          {/* Active Tickets */}
          <TabsContent value="active" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Active Tickets</CardTitle>
                <CardDescription>Your upcoming event tickets</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredTickets.filter(t => t.status === 'active').map((ticket) => (
                    <div key={ticket.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{ticket.event}</h3>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {ticket.date} at {ticket.time}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {ticket.venue}
                            </div>
                            <div className="flex items-center gap-1">
                              <Ticket className="h-4 w-4" />
                              {ticket.section} - {ticket.seat}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <p className="font-medium text-gray-900">{ticket.price.toLocaleString()} RWF</p>
                            <p className="text-sm text-gray-500">{ticket.id}</p>
                          </div>
                          <Button variant="outline" size="sm">
                            <QrCode className="h-4 w-4 mr-2" />
                            View QR
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Used Tickets */}
          <TabsContent value="used" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Used Tickets</CardTitle>
                <CardDescription>Your completed event tickets</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredTickets.filter(t => t.status === 'used').map((ticket) => (
                    <div key={ticket.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{ticket.event}</h3>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {ticket.date} at {ticket.time}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {ticket.venue}
                            </div>
                            <div className="flex items-center gap-1">
                              <Ticket className="h-4 w-4" />
                              {ticket.section} - {ticket.seat}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">{ticket.price.toLocaleString()} RWF</p>
                          <p className="text-sm text-gray-500">{ticket.id}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Cancelled Tickets */}
          <TabsContent value="cancelled" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Cancelled Tickets</CardTitle>
                <CardDescription>Your cancelled or refunded tickets</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredTickets.filter(t => t.status === 'cancelled').map((ticket) => (
                    <div key={ticket.id} className="border border-gray-200 rounded-lg p-4 bg-red-50">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{ticket.event}</h3>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {ticket.date} at {ticket.time}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {ticket.venue}
                            </div>
                            <div className="flex items-center gap-1">
                              <Ticket className="h-4 w-4" />
                              {ticket.section} - {ticket.seat}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">{ticket.price.toLocaleString()} RWF</p>
                          <p className="text-sm text-gray-500">{ticket.id}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

export default withAuth(ClientTickets)
