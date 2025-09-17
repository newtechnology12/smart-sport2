"use client"

import React, { useState } from 'react'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { withAuth } from '@/lib/auth-context'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Target,
  Calendar,
  MapPin,
  Clock,
  Star,
  Trophy,
  Activity,
  PieChart,
  LineChart,
  Eye,
  Download,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Heart,
  Share2
} from 'lucide-react'

function TeamAnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("last-30-days")
  const [activeTab, setActiveTab] = useState("performance")

  // Mock analytics data
  const performanceMetrics = {
    fanEngagement: 87.5,
    attendanceRate: 78.2,
    socialMediaReach: 125000,
    ticketConversion: 68.5,
    revenueGrowth: 18.3,
    fanSatisfaction: 4.6,
    matchesPlayed: 15,
    averageAttendance: 18500
  }

  const matchPerformance = [
    { match: "APR FC vs Rayon Sports", date: "2025-01-20", attendance: 28500, capacity: 30000, rating: 4.8, revenue: 855000, engagement: 92 },
    { match: "APR FC vs Police FC", date: "2025-01-15", attendance: 22000, capacity: 30000, rating: 4.2, revenue: 660000, engagement: 78 },
    { match: "APR FC vs Mukura VS", date: "2025-01-10", attendance: 9000, capacity: 15000, rating: 4.5, revenue: 540000, engagement: 85 },
    { match: "APR FC vs Kiyovu SC", date: "2025-01-05", attendance: 19500, capacity: 30000, rating: 4.1, revenue: 585000, engagement: 72 },
    { match: "APR FC vs AS Kigali", date: "2024-12-28", attendance: 24000, capacity: 30000, rating: 4.7, revenue: 720000, engagement: 88 }
  ]

  const fanDemographics = [
    { segment: "Young Adults (18-25)", percentage: 35, count: 8750, growth: 12.5, color: "blue" },
    { segment: "Adults (26-40)", percentage: 40, count: 10000, growth: 8.2, color: "green" },
    { segment: "Middle Age (41-55)", percentage: 20, count: 5000, growth: 5.1, color: "purple" },
    { segment: "Seniors (55+)", percentage: 5, count: 1250, growth: 15.8, color: "orange" }
  ]

  const socialMediaMetrics = [
    { platform: "Instagram", followers: 45000, engagement: 8.5, growth: 15.2, posts: 120 },
    { platform: "Facebook", followers: 38000, engagement: 6.2, growth: 8.7, posts: 85 },
    { platform: "Twitter", followers: 22000, engagement: 12.1, growth: 22.3, posts: 180 },
    { platform: "TikTok", followers: 20000, engagement: 15.8, growth: 45.6, posts: 65 }
  ]

  const revenueStreams = [
    { source: "Ticket Sales", amount: 3750000, percentage: 65, growth: 18.5, color: "blue" },
    { source: "Merchandise", amount: 850000, percentage: 15, growth: 25.2, color: "green" },
    { source: "Sponsorships", amount: 750000, percentage: 13, growth: 12.8, color: "purple" },
    { source: "Concessions", amount: 400000, percentage: 7, growth: 8.9, color: "orange" }
  ]

  const getColorClass = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
      orange: 'bg-orange-100 text-orange-600'
    }
    return colors[color as keyof typeof colors] || 'bg-gray-100 text-gray-600'
  }

  const getGrowthIcon = (growth: number) => {
    return growth > 0 ? (
      <ArrowUpRight className="h-3 w-3 text-green-600" />
    ) : (
      <ArrowDownRight className="h-3 w-3 text-red-600" />
    )
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold apple-title mb-2">
                Team Analytics
              </h1>
              <p className="text-white/90 apple-body text-lg">
                Comprehensive performance and fan engagement insights
              </p>
            </div>
            <div className="hidden md:block">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                <BarChart3 className="h-12 w-12 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Key Performance Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="apple-card">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Heart className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{performanceMetrics.fanEngagement}%</div>
                  <div className="text-sm text-muted-foreground">Fan Engagement</div>
                  <div className="text-xs text-green-600 flex items-center gap-1">
                    <ArrowUpRight className="h-3 w-3" />
                    +5.2% vs last month
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="apple-card">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{performanceMetrics.attendanceRate}%</div>
                  <div className="text-sm text-muted-foreground">Attendance Rate</div>
                  <div className="text-xs text-green-600 flex items-center gap-1">
                    <ArrowUpRight className="h-3 w-3" />
                    +3.1% vs last month
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="apple-card">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Share2 className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{(performanceMetrics.socialMediaReach / 1000).toFixed(0)}K</div>
                  <div className="text-sm text-muted-foreground">Social Reach</div>
                  <div className="text-xs text-green-600 flex items-center gap-1">
                    <ArrowUpRight className="h-3 w-3" />
                    +12.8% vs last month
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="apple-card">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <Star className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{performanceMetrics.fanSatisfaction}</div>
                  <div className="text-sm text-muted-foreground">Fan Satisfaction</div>
                  <div className="text-xs text-green-600 flex items-center gap-1">
                    <ArrowUpRight className="h-3 w-3" />
                    +0.3 vs last month
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto">
            <TabsTrigger value="performance" className="apple-button">Match Performance</TabsTrigger>
            <TabsTrigger value="fans" className="apple-button">Fan Analytics</TabsTrigger>
            <TabsTrigger value="social" className="apple-button">Social Media</TabsTrigger>
            <TabsTrigger value="revenue" className="apple-button">Revenue Streams</TabsTrigger>
          </TabsList>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Match Performance Overview */}
              <Card className="apple-card">
                <CardHeader>
                  <CardTitle className="apple-subtitle flex items-center gap-2">
                    <Trophy className="h-5 w-5" />
                    Season Performance
                  </CardTitle>
                  <CardDescription>Overall team performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Matches Played</span>
                      <span className="font-semibold">{performanceMetrics.matchesPlayed}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Average Attendance</span>
                      <span className="font-semibold">{performanceMetrics.averageAttendance.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Ticket Conversion</span>
                      <span className="font-semibold text-green-600">{performanceMetrics.ticketConversion}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Revenue Growth</span>
                      <span className="font-semibold text-green-600">+{performanceMetrics.revenueGrowth}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Top Performing Matches */}
              <Card className="apple-card">
                <CardHeader>
                  <CardTitle className="apple-subtitle flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Top Performing Matches
                  </CardTitle>
                  <CardDescription>Best matches by engagement and attendance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {matchPerformance.slice(0, 3).map((match, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold text-primary">#{index + 1}</span>
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-sm">{match.match}</div>
                          <div className="text-xs text-muted-foreground">{match.date}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-green-600">{match.engagement}%</div>
                          <div className="text-xs text-muted-foreground">{match.attendance.toLocaleString()} fans</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Match Performance */}
            <Card className="apple-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="apple-subtitle">Detailed Match Analytics</CardTitle>
                    <CardDescription>Performance breakdown for each match</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                      <SelectTrigger className="w-48 apple-focus">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="last-7-days">Last 7 Days</SelectItem>
                        <SelectItem value="last-30-days">Last 30 Days</SelectItem>
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
                <div className="space-y-4">
                  {matchPerformance.map((match, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-semibold">{match.match}</h4>
                          <div className="text-sm text-muted-foreground flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {match.date}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="font-semibold">{match.rating}</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <div className="text-sm text-muted-foreground">Attendance</div>
                          <div className="font-semibold">{match.attendance.toLocaleString()}</div>
                          <div className="text-xs text-muted-foreground">
                            {((match.attendance / match.capacity) * 100).toFixed(1)}% capacity
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Revenue</div>
                          <div className="font-semibold text-green-600">
                            {(match.revenue / 1000000).toFixed(1)}M RWF
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Engagement</div>
                          <div className="font-semibold text-blue-600">{match.engagement}%</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Capacity</div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div 
                              className="bg-primary h-2 rounded-full transition-all duration-300" 
                              style={{ width: `${(match.attendance / match.capacity) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="fans" className="space-y-6">
            <Card className="apple-card">
              <CardHeader>
                <CardTitle className="apple-subtitle flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Fan Demographics
                </CardTitle>
                <CardDescription>Breakdown of your fan base by age groups</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {fanDemographics.map((segment, index) => (
                    <div key={index} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full ${getColorClass(segment.color)}`} />
                          <span className="font-medium">{segment.segment}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">
                            {segment.count.toLocaleString()} fans
                          </div>
                          <div className="text-xs text-green-600 flex items-center gap-1">
                            {getGrowthIcon(segment.growth)}
                            +{segment.growth}%
                          </div>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className="bg-primary h-3 rounded-full transition-all duration-300" 
                            style={{ width: `${segment.percentage}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            {segment.percentage}% of total fan base
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="social" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {socialMediaMetrics.map((platform, index) => (
                <Card key={index} className="apple-card">
                  <CardHeader>
                    <CardTitle className="apple-subtitle flex items-center gap-2">
                      <Share2 className="h-5 w-5" />
                      {platform.platform}
                    </CardTitle>
                    <CardDescription>Platform performance metrics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>Followers</span>
                        <span className="font-semibold">{platform.followers.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Engagement Rate</span>
                        <span className="font-semibold text-blue-600">{platform.engagement}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Growth Rate</span>
                        <span className="font-semibold text-green-600">+{platform.growth}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Posts This Month</span>
                        <span className="font-semibold">{platform.posts}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="revenue" className="space-y-6">
            <Card className="apple-card">
              <CardHeader>
                <CardTitle className="apple-subtitle flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Revenue Stream Analysis
                </CardTitle>
                <CardDescription>Breakdown of revenue sources</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {revenueStreams.map((stream, index) => (
                    <div key={index} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full ${getColorClass(stream.color)}`} />
                          <span className="font-medium">{stream.source}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">
                            {(stream.amount / 1000000).toFixed(1)}M RWF
                          </div>
                          <div className="text-xs text-green-600 flex items-center gap-1">
                            {getGrowthIcon(stream.growth)}
                            +{stream.growth}%
                          </div>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className="bg-primary h-3 rounded-full transition-all duration-300" 
                            style={{ width: `${stream.percentage}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            {stream.percentage}% of total revenue
                          </span>
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

export default withAuth(TeamAnalyticsPage, ['team'])
