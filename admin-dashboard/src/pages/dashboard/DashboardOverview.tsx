import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Users,
  Calendar,
  Ticket,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Activity,
  CreditCard,
  UserCheck,
  AlertTriangle,
} from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { StatsCard } from '@/components/dashboard/StatsCard';
import { RevenueChart } from '@/components/dashboard/RevenueChart';
import { EventsChart } from '@/components/dashboard/EventsChart';
import { RecentTransactions } from '@/components/dashboard/RecentTransactions';
import { TopEvents } from '@/components/dashboard/TopEvents';
import { SystemAlerts } from '@/components/dashboard/SystemAlerts';

import { dashboardApi } from '@/services/api';

export function DashboardOverview() {
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: dashboardApi.getStats,
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  const { data: revenueData, isLoading: revenueLoading } = useQuery({
    queryKey: ['dashboard-revenue'],
    queryFn: dashboardApi.getRevenueData,
    refetchInterval: 60000, // Refresh every minute
  });

  const { data: recentActivity, isLoading: activityLoading } = useQuery({
    queryKey: ['dashboard-activity'],
    queryFn: dashboardApi.getRecentActivity,
    refetchInterval: 15000, // Refresh every 15 seconds
  });

  if (statsLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground">
          Welcome to SmartSports Rwanda Admin Dashboard. Here's what's happening today.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Users"
          value={stats?.totalUsers || 0}
          change={stats?.userGrowth || 0}
          icon={Users}
          description="Active registered users"
        />
        <StatsCard
          title="Active Events"
          value={stats?.activeEvents || 0}
          change={stats?.eventGrowth || 0}
          icon={Calendar}
          description="Currently live events"
        />
        <StatsCard
          title="Tickets Sold"
          value={stats?.ticketsSold || 0}
          change={stats?.ticketGrowth || 0}
          icon={Ticket}
          description="This month"
        />
        <StatsCard
          title="Revenue"
          value={`${stats?.totalRevenue || 0} RWF`}
          change={stats?.revenueGrowth || 0}
          icon={DollarSign}
          description="Total platform revenue"
        />
      </div>

      {/* Charts and Analytics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>
              Monthly revenue trends and payment method breakdown
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <RevenueChart data={revenueData} loading={revenueLoading} />
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Event Performance</CardTitle>
            <CardDescription>
              Top performing events by ticket sales
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TopEvents data={stats?.topEvents || []} />
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics Tabs */}
      <Tabs defaultValue="transactions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="transactions">Recent Transactions</TabsTrigger>
          <TabsTrigger value="activity">System Activity</TabsTrigger>
          <TabsTrigger value="alerts">System Alerts</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>
                Latest payment transactions across the platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RecentTransactions data={recentActivity?.transactions || []} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Sessions
                </CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.activeSessions || 0}</div>
                <p className="text-xs text-muted-foreground">
                  +{stats?.sessionGrowth || 0}% from last hour
                </p>
                <Progress value={75} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Payment Success Rate
                </CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.paymentSuccessRate || 0}%</div>
                <p className="text-xs text-muted-foreground">
                  {stats?.paymentTrend > 0 ? '+' : ''}{stats?.paymentTrend || 0}% from yesterday
                </p>
                <Progress value={stats?.paymentSuccessRate || 0} className="mt-2" />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>System Activity Log</CardTitle>
              <CardDescription>
                Recent system events and user activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity?.activities?.map((activity: any, index: number) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.description}</p>
                      <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                    </div>
                    <Badge variant={activity.type === 'error' ? 'destructive' : 'default'}>
                      {activity.type}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <SystemAlerts data={stats?.systemAlerts || []} />
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  API Response Time
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.apiResponseTime || 0}ms</div>
                <p className="text-xs text-muted-foreground">
                  Average response time
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Database Performance
                </CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.dbPerformance || 0}%</div>
                <p className="text-xs text-muted-foreground">
                  Query efficiency
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  System Uptime
                </CardTitle>
                <UserCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.systemUptime || 0}%</div>
                <p className="text-xs text-muted-foreground">
                  Last 30 days
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>
                Detailed system performance over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EventsChart data={stats?.performanceMetrics || []} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common administrative tasks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <button className="p-4 border rounded-lg hover:bg-gray-50 text-left">
              <Calendar className="h-6 w-6 mb-2 text-blue-600" />
              <h3 className="font-medium">Create Event</h3>
              <p className="text-sm text-muted-foreground">Add new sports event</p>
            </button>
            <button className="p-4 border rounded-lg hover:bg-gray-50 text-left">
              <Users className="h-6 w-6 mb-2 text-green-600" />
              <h3 className="font-medium">Manage Users</h3>
              <p className="text-sm text-muted-foreground">User administration</p>
            </button>
            <button className="p-4 border rounded-lg hover:bg-gray-50 text-left">
              <DollarSign className="h-6 w-6 mb-2 text-yellow-600" />
              <h3 className="font-medium">View Reports</h3>
              <p className="text-sm text-muted-foreground">Financial reports</p>
            </button>
            <button className="p-4 border rounded-lg hover:bg-gray-50 text-left">
              <AlertTriangle className="h-6 w-6 mb-2 text-red-600" />
              <h3 className="font-medium">System Health</h3>
              <p className="text-sm text-muted-foreground">Monitor system status</p>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
