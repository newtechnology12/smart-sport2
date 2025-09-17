"use client"

import React, { useState } from 'react'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { withAuth } from '@/lib/auth-context'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Wallet,
  CreditCard,
  Receipt,
  Target,
  PieChart,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Download,
  Eye,
  Plus,
  Minus,
  Building,
  Users,
  Ticket,
  ShoppingBag,
  Zap,
  AlertTriangle,
  CheckCircle
} from 'lucide-react'

function TeamFinancePage() {
  const [selectedPeriod, setSelectedPeriod] = useState("current-month")
  const [activeTab, setActiveTab] = useState("overview")

  // Mock team finance data
  const financeOverview = {
    totalRevenue: 5750000,
    totalExpenses: 3200000,
    netProfit: 2550000,
    monthlyRevenue: 1200000,
    monthlyExpenses: 680000,
    monthlyProfit: 520000,
    profitMargin: 44.3,
    revenueGrowth: 22.5,
    expenseGrowth: 8.7,
    cashFlow: 2100000,
    budgetUtilization: 78.5
  }

  const revenueStreams = [
    { source: "Ticket Sales", amount: 3750000, percentage: 65.2, growth: 18.5, budget: 4000000, color: "blue" },
    { source: "Sponsorships", amount: 1200000, percentage: 20.9, growth: 35.2, budget: 1000000, color: "green" },
    { source: "Merchandise", amount: 500000, percentage: 8.7, growth: 25.8, budget: 450000, color: "purple" },
    { source: "Concessions", amount: 300000, percentage: 5.2, growth: 12.3, budget: 280000, color: "orange" }
  ]

  const expenseCategories = [
    { category: "Player Salaries", amount: 1800000, percentage: 56.3, budget: 2000000, variance: -10.0, color: "red" },
    { category: "Stadium Operations", amount: 600000, percentage: 18.8, budget: 650000, variance: -7.7, color: "blue" },
    { category: "Marketing & PR", amount: 350000, percentage: 10.9, budget: 400000, variance: -12.5, color: "green" },
    { category: "Equipment & Supplies", amount: 250000, percentage: 7.8, budget: 300000, variance: -16.7, color: "purple" },
    { category: "Travel & Logistics", amount: 200000, percentage: 6.3, budget: 220000, variance: -9.1, color: "orange" }
  ]

  const monthlyFinancials = [
    { month: "Oct 2024", revenue: 950000, expenses: 580000, profit: 370000, margin: 38.9 },
    { month: "Nov 2024", revenue: 1100000, expenses: 620000, profit: 480000, margin: 43.6 },
    { month: "Dec 2024", revenue: 1350000, expenses: 750000, profit: 600000, margin: 44.4 },
    { month: "Jan 2025", revenue: 1200000, expenses: 680000, profit: 520000, margin: 43.3 }
  ]

  const upcomingPayments = [
    { description: "Player Salaries - January", amount: 450000, dueDate: "2025-01-31", status: "pending", priority: "high" },
    { description: "Stadium Rent - February", amount: 150000, dueDate: "2025-02-01", status: "scheduled", priority: "medium" },
    { description: "Equipment Purchase", amount: 85000, dueDate: "2025-02-05", status: "pending", priority: "low" },
    { description: "Marketing Campaign", amount: 120000, dueDate: "2025-02-10", status: "approved", priority: "medium" },
    { description: "Travel Expenses", amount: 65000, dueDate: "2025-02-15", status: "pending", priority: "low" }
  ]

  const getColorClass = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
      orange: 'bg-orange-100 text-orange-600',
      red: 'bg-red-100 text-red-600'
    }
    return colors[color as keyof typeof colors] || 'bg-gray-100 text-gray-600'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'scheduled': return 'bg-blue-100 text-blue-800'
      case 'approved': return 'bg-green-100 text-green-800'
      case 'overdue': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
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
                Team Finance
              </h1>
              <p className="text-white/90 apple-body text-lg">
                Comprehensive financial management and reporting
              </p>
            </div>
            <div className="hidden md:block">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                <DollarSign className="h-12 w-12 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Financial Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="apple-card">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{(financeOverview.totalRevenue / 1000000).toFixed(1)}M</div>
                  <div className="text-sm text-muted-foreground">Total Revenue (RWF)</div>
                  <div className="text-xs text-green-600 flex items-center gap-1">
                    <ArrowUpRight className="h-3 w-3" />
                    +{financeOverview.revenueGrowth}%
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="apple-card">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <TrendingDown className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{(financeOverview.totalExpenses / 1000000).toFixed(1)}M</div>
                  <div className="text-sm text-muted-foreground">Total Expenses (RWF)</div>
                  <div className="text-xs text-red-600 flex items-center gap-1">
                    <ArrowUpRight className="h-3 w-3" />
                    +{financeOverview.expenseGrowth}%
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="apple-card">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Target className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{(financeOverview.netProfit / 1000000).toFixed(1)}M</div>
                  <div className="text-sm text-muted-foreground">Net Profit (RWF)</div>
                  <div className="text-xs text-blue-600">
                    {financeOverview.profitMargin}% margin
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="apple-card">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Wallet className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{(financeOverview.cashFlow / 1000000).toFixed(1)}M</div>
                  <div className="text-sm text-muted-foreground">Cash Flow (RWF)</div>
                  <div className="text-xs text-purple-600">
                    {financeOverview.budgetUtilization}% budget used
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto">
            <TabsTrigger value="overview" className="apple-button">Financial Overview</TabsTrigger>
            <TabsTrigger value="revenue" className="apple-button">Revenue Streams</TabsTrigger>
            <TabsTrigger value="expenses" className="apple-button">Expense Management</TabsTrigger>
            <TabsTrigger value="payments" className="apple-button">Upcoming Payments</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Monthly Performance */}
              <Card className="apple-card">
                <CardHeader>
                  <CardTitle className="apple-subtitle flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Monthly Financial Performance
                  </CardTitle>
                  <CardDescription>Revenue, expenses, and profit trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {monthlyFinancials.map((month, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">{month.month}</h4>
                          <Badge variant="outline">{month.margin}% margin</Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <div className="text-muted-foreground">Revenue</div>
                            <div className="font-semibold text-green-600">
                              {(month.revenue / 1000000).toFixed(1)}M
                            </div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Expenses</div>
                            <div className="font-semibold text-red-600">
                              {(month.expenses / 1000000).toFixed(1)}M
                            </div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Profit</div>
                            <div className="font-semibold text-blue-600">
                              {(month.profit / 1000000).toFixed(1)}M
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Budget vs Actual */}
              <Card className="apple-card">
                <CardHeader>
                  <CardTitle className="apple-subtitle flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Budget vs Actual
                  </CardTitle>
                  <CardDescription>Performance against budget targets</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Revenue Target</span>
                      <div className="text-right">
                        <div className="font-semibold text-green-600">
                          {(financeOverview.totalRevenue / 1000000).toFixed(1)}M / 6.0M
                        </div>
                        <div className="text-xs text-muted-foreground">95.8% achieved</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Expense Budget</span>
                      <div className="text-right">
                        <div className="font-semibold text-red-600">
                          {(financeOverview.totalExpenses / 1000000).toFixed(1)}M / 3.5M
                        </div>
                        <div className="text-xs text-muted-foreground">91.4% utilized</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Profit Target</span>
                      <div className="text-right">
                        <div className="font-semibold text-blue-600">
                          {(financeOverview.netProfit / 1000000).toFixed(1)}M / 2.5M
                        </div>
                        <div className="text-xs text-muted-foreground">102% achieved</div>
                      </div>
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex items-center justify-between font-bold">
                        <span>Overall Performance</span>
                        <span className="text-green-600">Exceeding Targets</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="revenue" className="space-y-6">
            <Card className="apple-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="apple-subtitle flex items-center gap-2">
                      <PieChart className="h-5 w-5" />
                      Revenue Stream Analysis
                    </CardTitle>
                    <CardDescription>Breakdown of revenue sources and performance</CardDescription>
                  </div>
                  <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                    <SelectTrigger className="w-48 apple-focus">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="current-month">Current Month</SelectItem>
                      <SelectItem value="last-3-months">Last 3 Months</SelectItem>
                      <SelectItem value="season">Full Season</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
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
                            <ArrowUpRight className="h-3 w-3" />
                            +{stream.growth}%
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            {stream.percentage}% of total revenue
                          </span>
                          <span className="text-muted-foreground">
                            Budget: {(stream.budget / 1000000).toFixed(1)}M
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className="bg-primary h-3 rounded-full transition-all duration-300" 
                            style={{ width: `${(stream.amount / stream.budget) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="expenses" className="space-y-6">
            <Card className="apple-card">
              <CardHeader>
                <CardTitle className="apple-subtitle flex items-center gap-2">
                  <Receipt className="h-5 w-5" />
                  Expense Category Breakdown
                </CardTitle>
                <CardDescription>Detailed expense analysis and budget variance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {expenseCategories.map((expense, index) => (
                    <div key={index} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full ${getColorClass(expense.color)}`} />
                          <span className="font-medium">{expense.category}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">
                            {(expense.amount / 1000000).toFixed(1)}M RWF
                          </div>
                          <div className={`text-xs flex items-center gap-1 ${
                            expense.variance < 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {expense.variance < 0 ? (
                              <ArrowDownRight className="h-3 w-3" />
                            ) : (
                              <ArrowUpRight className="h-3 w-3" />
                            )}
                            {Math.abs(expense.variance)}% vs budget
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            {expense.percentage}% of total expenses
                          </span>
                          <span className="text-muted-foreground">
                            Budget: {(expense.budget / 1000000).toFixed(1)}M
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className={`h-3 rounded-full transition-all duration-300 ${
                              expense.amount > expense.budget ? 'bg-red-500' : 'bg-primary'
                            }`}
                            style={{ width: `${Math.min((expense.amount / expense.budget) * 100, 100)}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments" className="space-y-6">
            <Card className="apple-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="apple-subtitle flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      Upcoming Payments
                    </CardTitle>
                    <CardDescription>Scheduled payments and financial obligations</CardDescription>
                  </div>
                  <Button className="apple-button">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Payment
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Description</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {upcomingPayments.map((payment, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <div className="font-medium">{payment.description}</div>
                          </TableCell>
                          <TableCell>
                            <div className="font-semibold">
                              {payment.amount.toLocaleString()} RWF
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              {payment.dueDate}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getPriorityColor(payment.priority)}>
                              {payment.priority}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(payment.status)}>
                              {payment.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button variant="ghost" size="sm" className="apple-button">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="apple-button">
                                <CheckCircle className="h-4 w-4" />
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
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

export default withAuth(TeamFinancePage, ['team'])
