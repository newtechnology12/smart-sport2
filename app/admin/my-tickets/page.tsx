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
import { Ticket, Search, Filter, Download, Eye, Calendar, MapPin, Clock, QrCode, Users, Plus, Edit, Trash2, MoreHorizontal } from "lucide-react"

function AdminMyTickets() {
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
      purchaseDate: "2024-03-10",
      customer: "John Doe",
      email: "john@example.com"
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
      purchaseDate: "2024-03-12",
      customer: "Jane Smith",
      email: "jane@example.com"
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
      purchaseDate: "2024-03-14",
      customer: "Mike Johnson",
      email: "mike@example.com"
    },
    {
      id: "TKT-004",
      event: "Volleyball League Final",
      date: "2024-03-30",
      time: "17:00",
      venue: "Petit Stade",
      section: "Standard",
      seat: "S23",
      price: 3000,
      status: "active",
      qrCode: "QR789123456",
      purchaseDate: "2024-03-16",
      customer: "Sarah Wilson",
      email: "sarah@example.com"
    }
  ]

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.id.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case "used":
        return <Badge className="bg-blue-100 text-blue-800">Used</Badge>
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>
      case "expired":
        return <Badge className="bg-gray-100 text-gray-800">Expired</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const activeTickets = filteredTickets.filter(t => t.status === "active")
  const usedTickets = filteredTickets.filter(t => t.status === "used")
  const cancelledTickets = filteredTickets.filter(t => t.status === "cancelled")

  return (
    <DashboardLayout>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold apple-title mb-2">Admin Ticket Management</h1>
            <p className="text-muted-foreground apple-body">
              Manage and monitor all ticket sales and customer bookings
            </p>
          </div>
          <div className="flex gap-3">
            <Button className="apple-button">
              <Plus className="h-4 w-4 mr-2" />
              Create Ticket
            </Button>
            <Button variant="outline" className="apple-button">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="apple-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Tickets</p>
                  <p className="text-2xl font-bold">{tickets.length}</p>
                </div>
                <Ticket className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card className="apple-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Tickets</p>
                  <p className="text-2xl font-bold">{activeTickets.length}</p>
                </div>
                <QrCode className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="apple-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold">
                    {tickets.reduce((sum, ticket) => sum + ticket.price, 0).toLocaleString()} RWF
                  </p>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="apple-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Used Tickets</p>
                  <p className="text-2xl font-bold">{usedTickets.length}</p>
                </div>
                <Calendar className="h-8 w-8 text-yellow-500" />
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search tickets, events, or customers..."
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
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="used">Used</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                </SelectContent>
              </Select>

              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm("")
                  setStatusFilter("all")
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
            <TabsTrigger value="all">All Tickets ({filteredTickets.length})</TabsTrigger>
            <TabsTrigger value="active">Active ({activeTickets.length})</TabsTrigger>
            <TabsTrigger value="used">Used ({usedTickets.length})</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled ({cancelledTickets.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <Card className="apple-card">
              <CardHeader>
                <CardTitle>All Tickets</CardTitle>
                <CardDescription>
                  Complete overview of all ticket sales and bookings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ticket ID</TableHead>
                      <TableHead>Event</TableHead>
                      <TableHead>Customer</TableHead>
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
                        <TableCell className="font-medium">{ticket.id}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{ticket.event}</div>
                            <div className="text-sm text-muted-foreground">{ticket.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>{ticket.customer}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <div className="text-sm">{ticket.date}</div>
                              <div className="text-xs text-muted-foreground">{ticket.time}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            {ticket.venue}
                          </div>
                        </TableCell>
                        <TableCell>{ticket.section} - {ticket.seat}</TableCell>
                        <TableCell className="font-medium">
                          {ticket.price.toLocaleString()} RWF
                        </TableCell>
                        <TableCell>{getStatusBadge(ticket.status)}</TableCell>
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

          <TabsContent value="active" className="space-y-4">
            <Card className="apple-card">
              <CardHeader>
                <CardTitle>Active Tickets</CardTitle>
                <CardDescription>
                  Tickets that are valid and can be used for entry
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ticket ID</TableHead>
                      <TableHead>Event</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Venue</TableHead>
                      <TableHead>Seat</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activeTickets.map((ticket) => (
                      <TableRow key={ticket.id}>
                        <TableCell className="font-medium">{ticket.id}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{ticket.event}</div>
                            <div className="text-sm text-muted-foreground">{ticket.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>{ticket.customer}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <div className="text-sm">{ticket.date}</div>
                              <div className="text-xs text-muted-foreground">{ticket.time}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            {ticket.venue}
                          </div>
                        </TableCell>
                        <TableCell>{ticket.section} - {ticket.seat}</TableCell>
                        <TableCell className="font-medium">
                          {ticket.price.toLocaleString()} RWF
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline">
                              <QrCode className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
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

          <TabsContent value="used" className="space-y-4">
            <Card className="apple-card">
              <CardHeader>
                <CardTitle>Used Tickets</CardTitle>
                <CardDescription>
                  Tickets that have been scanned and used for entry
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ticket ID</TableHead>
                      <TableHead>Event</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Venue</TableHead>
                      <TableHead>Seat</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {usedTickets.map((ticket) => (
                      <TableRow key={ticket.id}>
                        <TableCell className="font-medium">{ticket.id}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{ticket.event}</div>
                            <div className="text-sm text-muted-foreground">{ticket.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>{ticket.customer}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <div className="text-sm">{ticket.date}</div>
                              <div className="text-xs text-muted-foreground">{ticket.time}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            {ticket.venue}
                          </div>
                        </TableCell>
                        <TableCell>{ticket.section} - {ticket.seat}</TableCell>
                        <TableCell className="font-medium">
                          {ticket.price.toLocaleString()} RWF
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
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
                <CardTitle>Cancelled Tickets</CardTitle>
                <CardDescription>
                  Tickets that have been cancelled or refunded
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ticket ID</TableHead>
                      <TableHead>Event</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Venue</TableHead>
                      <TableHead>Seat</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cancelledTickets.map((ticket) => (
                      <TableRow key={ticket.id}>
                        <TableCell className="font-medium">{ticket.id}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{ticket.event}</div>
                            <div className="text-sm text-muted-foreground">{ticket.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>{ticket.customer}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <div className="text-sm">{ticket.date}</div>
                              <div className="text-xs text-muted-foreground">{ticket.time}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            {ticket.venue}
                          </div>
                        </TableCell>
                        <TableCell>{ticket.section} - {ticket.seat}</TableCell>
                        <TableCell className="font-medium">
                          {ticket.price.toLocaleString()} RWF
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
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

export default withAuth(AdminMyTickets, ['admin'])
