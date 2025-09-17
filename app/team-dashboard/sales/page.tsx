"use client"

import React, { useState } from 'react'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { withAuth } from '@/lib/auth-context'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Ticket,
  Users,
  Calendar,
  BarChart3,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Download,
  Filter,
  RefreshCw,
  Target,
  Trophy,
  MapPin,
  Clock
} from 'lucide-react'

function TeamSalesPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("last-30-days")
  const [activeTab, setActiveTab] = useState("overview")

  // Mock team sales data
  const salesStats = {
    totalRevenue: 3750000,
    monthlyRevenue: 850000,
    ticketsSold: 1250,
    monthlyTicketsSold: 285,
    averageTicketPrice: 3000,
    revenueGrowth: 18.5,
    ticketGrowth: 12.3,
    conversionRate: 68.2,
    totalFans: 25000,
    activeSeasonTickets: 450
  }

  const salesByMatch = [
    { id: 1, match: "APR FC vs Rayon Sports", date: "2025-01-20", venue: "Kigali Stadium", ticketsSold: 285, revenue: 855000, capacity: 30000, soldPercentage: 95.0, status: "upcoming" },
    { id: 2, match: "APR FC vs Police FC", date: "2025-01-15", venue: "Kigali Stadium", ticketsSold: 220, revenue: 660000, capacity: 30000, soldPercentage: 73.3, status: "completed" },
    { id: 3, match: "APR FC vs Mukura VS", date: "2025-01-10", venue: "Huye Stadium", ticketsSold: 180, revenue: 540000, capacity: 15000, soldPercentage: 60.0, status: "completed" },
    { id: 4, match: "APR FC vs Kiyovu SC", date: "2025-01-05", venue: "Kigali Stadium", ticketsSold: 195, revenue: 585000, capacity: 30000, soldPercentage: 65.0, status: "completed" },
    { id: 5, match: "APR FC vs AS Kigali", date: "2024-12-28", venue: "Kigali Stadium", ticketsSold: 240, revenue: 720000, capacity: 30000, soldPercentage: 80.0, status: "completed" }
  ]

  const ticketCategories = [
    { category: "VIP", sold: 125, revenue: 1250000, price: 10000, percentage: 33.3, color: "purple" },
    { category: "Premium", sold: 350, revenue: 1750000, price: 5000, percentage: 46.7, color: "blue" },
    { category: "Regular", sold: 775, revenue: 775000, price: 1000, percentage: 20.7, color: "green" }
  ]

  const monthlyTrends = [
    { month: "Oct 2024", revenue: 2100000, tickets: 700, matches: 3 },
    { month: "Nov 2024", revenue: 2850000, tickets: 950, matches: 4 },
    { month: "Dec 2024", revenue: 3200000, tickets: 1067, matches: 4 },
    { month: "Jan 2025", revenue: 3750000, tickets: 1250, matches: 5 }
  ]

  const topPerformingMatches = salesByMatch
    .sort((a, b) => b.soldPercentage - a.soldPercentage)
    .slice(0, 3)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800'
      case 'completed': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getColorClass = (color: string) => {
    const colors = {
      purple: 'bg-purple-100 text-purple-600',
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      orange: 'bg-orange-100 text-orange-600'
    }
    return colors[color as keyof typeof colors] || 'bg-gray-100 text-gray-600'
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold apple-title mb-2">
                Sales Dashboard
              </h1>
              <p className="text-white/90 apple-body text-lg">
                Track ticket sales and revenue performance
              </p>
            </div>
            <div className="hidden md:block">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                <DollarSign className="h-12 w-12 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="apple-card">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{(salesStats.totalRevenue / 1000000).toFixed(1)}M</div>
                  <div className="text-sm text-muted-foreground">Total Revenue (RWF)</div>
                  <div className="text-xs text-green-600 flex items-center gap-1">
                    <ArrowUpRight className="h-3 w-3" />
                    +{salesStats.revenueGrowth}%
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="apple-card">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Ticket className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{salesStats.ticketsSold.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Tickets Sold</div>
                  <div className="text-xs text-green-600 flex items-center gap-1">
                    <ArrowUpRight className="h-3 w-3" />
                    +{salesStats.ticketGrowth}%
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="apple-card">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Target className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{salesStats.averageTicketPrice.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Avg Ticket Price (RWF)</div>
                  <div className="text-xs text-blue-600">
                    {salesStats.conversionRate}% conversion
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="apple-card">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{(salesStats.totalFans / 1000).toFixed(0)}K</div>
                  <div className="text-sm text-muted-foreground">Total Fans</div>
                  <div className="text-xs text-muted-foreground">
                    {salesStats.activeSeasonTickets} season tickets
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto">
            <TabsTrigger value="overview" className="apple-button">Sales Overview</TabsTrigger>
            <TabsTrigger value="matches" className="apple-button">Match Sales</TabsTrigger>
            <TabsTrigger value="categories" className="apple-button">Ticket Categories</TabsTrigger>
            <TabsTrigger value="trends" className="apple-button">Trends</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Monthly Performance */}
              <Card className="apple-card">
                <CardHeader>
                  <CardTitle className="apple-subtitle flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Monthly Performance
                  </CardTitle>
                  <CardDescription>Current month sales summary</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Monthly Revenue</span>
                      <span className="font-semibold text-green-600">
                        {(salesStats.monthlyRevenue / 1000000).toFixed(1)}M RWF
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Monthly Tickets</span>
                      <span className="font-semibold text-blue-600">
                        {salesStats.monthlyTicketsSold} tickets
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Revenue Growth</span>
                      <span className="font-semibold text-green-600">
                        +{salesStats.revenueGrowth}%
                      </span>
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex items-center justify-between font-bold">
                        <span>Conversion Rate</span>
                        <span className="text-primary">
                          {salesStats.conversionRate}%
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Top Performing Matches */}
              <Card className="apple-card">
                <CardHeader>
                  <CardTitle className="apple-subtitle flex items-center gap-2">
                    <Trophy className="h-5 w-5" />
                    Top Performing Matches
                  </CardTitle>
                  <CardDescription>Best selling matches by percentage</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topPerformingMatches.map((match, index) => (
                      <div key={match.id} className="flex items-center gap-4">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold text-primary">#{index + 1}</span>
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-sm">{match.match}</div>
                          <div className="text-xs text-muted-foreground">{match.date} • {match.venue}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-green-600">{match.soldPercentage}%</div>
                          <div className="text-xs text-muted-foreground">{match.ticketsSold} sold</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="matches" className="space-y-6">
            <Card className="apple-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="apple-subtitle">Match Sales Performance</CardTitle>
                    <CardDescription>Detailed sales data for each match</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                      <SelectTrigger className="w-48 apple-focus">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="last-7-days">Last 7 Days</SelectItem>
                        <SelectItem value="last-30-days">Last 30 Days</SelectItem>
                        <SelectItem value="last-90-days">Last 90 Days</SelectItem>
                        <SelectItem value="season">Full Season</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" className="apple-button">
                      <Download className="mr-2 h-4 w-4" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Match</TableHead>
                        <TableHead>Date & Venue</TableHead>
                        <TableHead>Tickets Sold</TableHead>
                        <TableHead>Revenue</TableHead>
                        <TableHead>Sold %</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {salesByMatch.map((match) => (
                        <TableRow key={match.id}>
                          <TableCell>
                            <div className="font-medium">{match.match}</div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="flex items-center gap-1 text-sm">
                                <Calendar className="h-3 w-3" />
                                {match.date}
                              </div>
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <MapPin className="h-3 w-3" />
                                {match.venue}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="font-semibold">{match.ticketsSold}</div>
                            <div className="text-sm text-muted-foreground">of {match.capacity.toLocaleString()}</div>
                          </TableCell>
                          <TableCell>
                            <div className="font-semibold">{(match.revenue / 1000000).toFixed(1)}M RWF</div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="w-16 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-primary h-2 rounded-full transition-all duration-300" 
                                  style={{ width: `${Math.min(match.soldPercentage, 100)}%` }}
                                />
                              </div>
                              <span className="text-sm font-medium">{match.soldPercentage}%</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(match.status)}>
                              {match.status}
                            </Badge>
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

          <TabsContent value="categories" className="space-y-6">
            <Card className="apple-card">
              <CardHeader>
                <CardTitle className="apple-subtitle flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Ticket Category Performance
                </CardTitle>
                <CardDescription>Sales breakdown by ticket type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {ticketCategories.map((category, index) => (
                    <div key={index} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full ${getColorClass(category.color)}`} />
                          <span className="font-medium">{category.category}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">
                            {category.sold} tickets
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {category.price.toLocaleString()} RWF each
                          </div>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className="bg-primary h-3 rounded-full transition-all duration-300" 
                            style={{ width: `${category.percentage}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            {category.percentage}% of total sales
                          </span>
                          <span className="font-medium text-green-600">
                            {(category.revenue / 1000000).toFixed(1)}M RWF
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <Card className="apple-card">
              <CardHeader>
                <CardTitle className="apple-subtitle flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Sales Trends
                </CardTitle>
                <CardDescription>Monthly performance over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyTrends.map((trend, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <Calendar className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <div className="font-semibold">{trend.month}</div>
                          <div className="text-sm text-muted-foreground">{trend.matches} matches</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-green-600">
                          {(trend.revenue / 1000000).toFixed(1)}M RWF
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {trend.tickets} tickets
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

export default withAuth(TeamSalesPage, ['team'])
