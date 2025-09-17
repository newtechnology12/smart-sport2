"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { withAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import {
  BarChart3,
  Users,
  Ticket,
  DollarSign,
  TrendingUp,
  Calendar,
  Settings,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  Download,
  Shield,
  Trophy,
  AlertTriangle,
  CheckCircle,
  Clock,
  UserCheck,
  UserX,
  FileText,
  Activity
} from "lucide-react"
import { matches, userTickets, storeProducts } from "@/lib/dummy-data"
import Link from "next/link"

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")

  // Mock admin stats
  const stats = {
    totalUsers: 1247,
    totalTicketsSold: 3456,
    totalRevenue: 12450000,
    activeEvents: 15,
    storeOrders: 89,
    pendingPayments: 23,
    newUsersToday: 12,
    ticketsSoldToday: 45,
    revenueToday: 125000,
    systemAlerts: 3
  }

  const recentUsers = [
    { id: 1, name: "Jean Baptiste", email: "jean@email.com", joined: "2025-01-15", status: "active", role: "client", lastLogin: "2025-01-15 14:30" },
    { id: 2, name: "Marie Claire", email: "marie@email.com", joined: "2025-01-14", status: "active", role: "client", lastLogin: "2025-01-15 09:15" },
    { id: 3, name: "Paul Kagame", email: "paul@email.com", joined: "2025-01-13", status: "pending", role: "team", lastLogin: "Never" },
    { id: 4, name: "Alice Uwimana", email: "alice@email.com", joined: "2025-01-12", status: "active", role: "client", lastLogin: "2025-01-14 16:45" },
    { id: 5, name: "David Nkurunziza", email: "david@email.com", joined: "2025-01-11", status: "suspended", role: "client", lastLogin: "2025-01-13 11:20" },
  ]

  const recentOrders = [
    { id: "ORD001", user: "Jean Baptiste", amount: 25000, status: "completed", date: "2025-01-15", type: "ticket", items: 2 },
    { id: "ORD002", user: "Marie Claire", amount: 8000, status: "pending", date: "2025-01-15", type: "store", items: 1 },
    { id: "ORD003", user: "Paul Kagame", amount: 15000, status: "completed", date: "2025-01-14", type: "ticket", items: 3 },
    { id: "ORD004", user: "Alice Uwimana", amount: 12000, status: "failed", date: "2025-01-14", type: "ticket", items: 2 },
    { id: "ORD005", user: "David Nkurunziza", amount: 5000, status: "completed", date: "2025-01-13", type: "store", items: 1 },
  ]

  const systemAlerts = [
    { id: 1, type: "warning", message: "High server load detected", time: "2 minutes ago", severity: "medium" },
    { id: 2, type: "info", message: "Scheduled maintenance in 2 hours", time: "1 hour ago", severity: "low" },
    { id: 3, type: "error", message: "Payment gateway timeout", time: "5 minutes ago", severity: "high" },
  ]

  const teams = [
    { id: 1, name: "APR FC", sport: "Football", members: 25000, ticketsSold: 1250, revenue: 3750000, status: "active" },
    { id: 2, name: "Rayon Sports", sport: "Football", members: 18000, ticketsSold: 890, revenue: 2670000, status: "active" },
    { id: 3, name: "REG BBC", sport: "Basketball", members: 8000, ticketsSold: 450, revenue: 900000, status: "active" },
    { id: 4, name: "Patriots BBC", sport: "Basketball", members: 6500, ticketsSold: 320, revenue: 640000, status: "active" },
    { id: 5, name: "Police FC", sport: "Football", members: 12000, ticketsSold: 600, revenue: 1800000, status: "active" },
  ]

  const filteredUsers = recentUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = selectedFilter === 'all' || user.status === selectedFilter
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'suspended': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'error': return <AlertTriangle className="h-4 w-4 text-red-500" />
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case 'info': return <CheckCircle className="h-4 w-4 text-blue-500" />
      default: return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold apple-title mb-2">
                Admin Dashboard
              </h1>
              <p className="text-white/90 apple-body text-lg">
                Manage your SmartSports RW platform
              </p>
            </div>
            <div className="hidden md:block">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                <Shield className="h-12 w-12 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Navigation */}
        <Card className="apple-card">
          <CardHeader>
            <CardTitle className="apple-subtitle">Admin Panel</CardTitle>
            <CardDescription>Access all administrative functions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/admin/users">
                <Button className="w-full h-20 apple-button flex-col gap-2" variant="outline">
                  <Users className="h-6 w-6" />
                  <span>User Management</span>
                </Button>
              </Link>
              <Link href="/admin/reports">
                <Button className="w-full h-20 apple-button flex-col gap-2" variant="outline">
                  <FileText className="h-6 w-6" />
                  <span>Reports</span>
                </Button>
              </Link>
              <Link href="/admin/finance">
                <Button className="w-full h-20 apple-button flex-col gap-2" variant="outline">
                  <DollarSign className="h-6 w-6" />
                  <span>Finance</span>
                </Button>
              </Link>
              <Button className="w-full h-20 apple-button flex-col gap-2" variant="outline">
                <Settings className="h-6 w-6" />
                <span>Settings</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6 h-auto">
            <TabsTrigger value="overview" className="apple-button">Overview</TabsTrigger>
            <TabsTrigger value="teams" className="apple-button">Teams</TabsTrigger>
            <TabsTrigger value="events" className="apple-button">Events</TabsTrigger>
            <TabsTrigger value="tickets" className="apple-button">Tickets</TabsTrigger>
            <TabsTrigger value="analytics" className="apple-button">Analytics</TabsTrigger>
            <TabsTrigger value="settings" className="apple-button">Settings</TabsTrigger>
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
                      <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">Total Users</div>
                      <div className="text-xs text-green-600">+{stats.newUsersToday} today</div>
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
                      <div className="text-2xl font-bold">{stats.totalTicketsSold.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">Tickets Sold</div>
                      <div className="text-xs text-green-600">+{stats.ticketsSoldToday} today</div>
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
                      <div className="text-2xl font-bold">{(stats.totalRevenue / 1000000).toFixed(1)}M</div>
                      <div className="text-sm text-muted-foreground">Revenue (RWF)</div>
                      <div className="text-xs text-green-600">+{(stats.revenueToday / 1000).toFixed(0)}K today</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="apple-card">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{stats.activeEvents}</div>
                      <div className="text-sm text-muted-foreground">Active Events</div>
                      <div className="text-xs text-blue-600">{stats.pendingPayments} pending payments</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* System Alerts */}
            <Card className="apple-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="apple-subtitle flex items-center gap-2">
                      <Activity className="h-5 w-5" />
                      System Alerts
                    </CardTitle>
                    <CardDescription>Recent system notifications and alerts</CardDescription>
                  </div>
                  <Badge variant="secondary">{stats.systemAlerts} active</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {systemAlerts.map((alert) => (
                    <div key={alert.id} className="flex items-center gap-3 p-3 border rounded-lg">
                      {getAlertIcon(alert.type)}
                      <div className="flex-1">
                        <div className="font-medium text-sm">{alert.message}</div>
                        <div className="text-xs text-muted-foreground">{alert.time}</div>
                      </div>
                      <Badge variant={alert.severity === 'high' ? 'destructive' : alert.severity === 'medium' ? 'default' : 'secondary'}>
                        {alert.severity}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="apple-card">
                <CardHeader>
                  <CardTitle className="apple-subtitle">Recent Users</CardTitle>
                  <CardDescription>Latest user registrations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentUsers.slice(0, 3).map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <Users className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="font-semibold">{user.name}</div>
                            <div className="text-sm text-muted-foreground">{user.email}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                          <div className="text-xs text-muted-foreground mt-1">{user.joined}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="apple-card">
                <CardHeader>
                  <CardTitle className="apple-subtitle">Recent Orders</CardTitle>
                  <CardDescription>Latest transactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentOrders.slice(0, 3).map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            order.type === 'ticket' ? 'bg-blue-100' : 'bg-green-100'
                          }`}>
                            {order.type === 'ticket' ? (
                              <Ticket className="h-5 w-5 text-blue-600" />
                            ) : (
                              <Trophy className="h-5 w-5 text-green-600" />
                            )}
                          </div>
                          <div>
                            <div className="font-semibold">{order.id}</div>
                            <div className="text-sm text-muted-foreground">{order.user} • {order.items} items</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">{order.amount.toLocaleString()} RWF</div>
                          <Badge variant={order.status === "completed" ? "default" : order.status === "pending" ? "secondary" : "destructive"}>
                            {order.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>



          <TabsContent value="teams" className="space-y-6">
            <Card className="apple-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="apple-subtitle">Team Management</CardTitle>
                    <CardDescription>Manage sports teams and their performance</CardDescription>
                  </div>
                  <Button className="apple-button">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Team
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {teams.map((team) => (
                    <Card key={team.id} className="apple-card">
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                <Trophy className="h-6 w-6 text-primary" />
                              </div>
                              <div>
                                <h3 className="font-bold apple-subtitle">{team.name}</h3>
                                <p className="text-sm text-muted-foreground">{team.sport}</p>
                              </div>
                            </div>
                            <Badge className={getStatusColor(team.status)}>
                              {team.status}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <div className="text-muted-foreground">Members</div>
                              <div className="font-semibold">{team.members.toLocaleString()}</div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">Tickets Sold</div>
                              <div className="font-semibold">{team.ticketsSold.toLocaleString()}</div>
                            </div>
                            <div className="col-span-2">
                              <div className="text-muted-foreground">Revenue</div>
                              <div className="font-semibold text-primary">
                                {(team.revenue / 1000000).toFixed(1)}M RWF
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="flex-1 apple-button">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="flex-1 apple-button">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="flex-1 apple-button">
                              <BarChart3 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <Card className="apple-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="apple-subtitle">Event Management</CardTitle>
                    <CardDescription>Manage sports events and matches</CardDescription>
                  </div>
                  <Button className="apple-button">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Event
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Event</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {matches.slice(0, 5).map((match) => (
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
                            <div className="font-semibold">{match.price.toLocaleString()} RWF</div>
                            <div className="text-xs text-muted-foreground">VIP: {match.vip_price.toLocaleString()}</div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="default">{match.status}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button variant="ghost" size="sm" className="apple-button">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="apple-button">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-red-600 apple-button">
                                <Trash2 className="h-4 w-4" />
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
                <CardDescription>Monitor ticket sales and manage bookings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Ticket ID</TableHead>
                        <TableHead>Event</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {userTickets.map((ticket) => (
                        <TableRow key={ticket.id}>
                          <TableCell className="font-mono">{ticket.id}</TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">
                                {ticket.match.home_team} vs {ticket.match.away_team}
                              </div>
                              <div className="text-sm text-muted-foreground">{ticket.match.date}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">Customer #{Math.floor(Math.random() * 1000)}</div>
                          </TableCell>
                          <TableCell>{ticket.quantity}</TableCell>
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
                      <span className="font-semibold">8.5M RWF</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Store Sales</span>
                      <span className="font-semibold">3.2M RWF</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Donations</span>
                      <span className="font-semibold">750K RWF</span>
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex items-center justify-between font-bold">
                        <span>Total Revenue</span>
                        <span className="text-primary">12.45M RWF</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="apple-card">
                <CardHeader>
                  <CardTitle className="apple-subtitle flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Growth Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>User Growth</span>
                      <span className="font-semibold text-green-600">+15.2%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Ticket Sales</span>
                      <span className="font-semibold text-green-600">+23.1%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Store Revenue</span>
                      <span className="font-semibold text-green-600">+18.7%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Active Users</span>
                      <span className="font-semibold text-green-600">+12.4%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="apple-card">
              <CardHeader>
                <CardTitle className="apple-subtitle">Export Reports</CardTitle>
                <CardDescription>Generate and download detailed reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="apple-button">
                    <FileText className="mr-2 h-4 w-4" />
                    User Report
                  </Button>
                  <Button variant="outline" className="apple-button">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Sales Report
                  </Button>
                  <Button variant="outline" className="apple-button">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Analytics Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="apple-card">
              <CardHeader>
                <CardTitle className="apple-subtitle">System Settings</CardTitle>
                <CardDescription>Configure platform settings and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-3">Payment Settings</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <span>MTN Rwanda Integration</span>
                        <Badge variant="default">Active</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <span>Airtel Rwanda Integration</span>
                        <Badge variant="default">Active</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <span>Bank Transfer</span>
                        <Badge variant="secondary">Pending</Badge>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Security Settings</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <span>Two-Factor Authentication</span>
                        <Badge variant="default">Enabled</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <span>Session Timeout</span>
                        <span className="text-sm text-muted-foreground">30 minutes</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Notification Settings</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <span>Email Notifications</span>
                        <Badge variant="default">Enabled</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <span>SMS Notifications</span>
                        <Badge variant="default">Enabled</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

export default withAuth(AdminDashboard, ['admin'])
