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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  CreditCard,
  Wallet,
  PieChart,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Filter,
  Download,
  Plus,
  Eye,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Clock,
  Banknote,
  Receipt,
  Target
} from 'lucide-react'

function AdminFinancePage() {
  const [selectedPeriod, setSelectedPeriod] = useState("last-30-days")
  const [activeTab, setActiveTab] = useState("overview")

  // Mock financial data
  const financeStats = {
    totalRevenue: 12450000,
    monthlyRevenue: 2850000,
    totalExpenses: 3200000,
    monthlyExpenses: 750000,
    netProfit: 9250000,
    monthlyProfit: 2100000,
    revenueGrowth: 15.2,
    expenseGrowth: -8.5,
    profitMargin: 74.3,
    pendingPayments: 450000,
    completedTransactions: 1247,
    failedTransactions: 23
  }

  const revenueStreams = [
    { name: "Ticket Sales", amount: 8500000, percentage: 68.3, growth: 12.5, color: "blue" },
    { name: "Store Sales", amount: 2200000, percentage: 17.7, growth: 18.2, color: "green" },
    { name: "Sponsorships", amount: 1200000, percentage: 9.6, growth: 25.8, color: "purple" },
    { name: "Donations", amount: 350000, percentage: 2.8, growth: -5.2, color: "orange" },
    { name: "Other", amount: 200000, percentage: 1.6, growth: 8.1, color: "gray" }
  ]

  const expenseCategories = [
    { name: "Platform Maintenance", amount: 1200000, percentage: 37.5, budget: 1500000, color: "red" },
    { name: "Payment Processing", amount: 850000, percentage: 26.6, budget: 900000, color: "yellow" },
    { name: "Marketing", amount: 600000, percentage: 18.8, budget: 800000, color: "blue" },
    { name: "Staff Salaries", amount: 400000, percentage: 12.5, budget: 450000, color: "green" },
    { name: "Other Expenses", amount: 150000, percentage: 4.7, budget: 200000, color: "gray" }
  ]

  const recentTransactions = [
    { id: "TXN001", type: "revenue", description: "Ticket Sales - APR FC vs Rayon Sports", amount: 125000, date: "2025-01-15 14:30", status: "completed", method: "MTN Mobile Money" },
    { id: "TXN002", type: "expense", description: "Payment Gateway Fees", amount: -8500, date: "2025-01-15 14:25", status: "completed", method: "Bank Transfer" },
    { id: "TXN003", type: "revenue", description: "Store Purchase - Team Jersey", amount: 25000, date: "2025-01-15 13:45", status: "completed", method: "Airtel Money" },
    { id: "TXN004", type: "revenue", description: "Sponsorship Payment - Bank of Kigali", amount: 500000, date: "2025-01-15 10:20", status: "pending", method: "Bank Transfer" },
    { id: "TXN005", type: "expense", description: "Server Hosting Costs", amount: -45000, date: "2025-01-15 09:15", status: "completed", method: "Credit Card" },
    { id: "TXN006", type: "revenue", description: "Donation - Community Support", amount: 15000, date: "2025-01-14 16:30", status: "completed", method: "MTN Mobile Money" }
  ]

  const paymentMethods = [
    { name: "MTN Mobile Money", transactions: 456, amount: 5200000, percentage: 41.8, status: "active" },
    { name: "Airtel Money", transactions: 234, amount: 2800000, percentage: 22.5, status: "active" },
    { name: "Bank Transfer", transactions: 189, amount: 3100000, percentage: 24.9, status: "active" },
    { name: "Credit Card", transactions: 98, amount: 850000, percentage: 6.8, status: "active" },
    { name: "Cash", transactions: 45, amount: 500000, percentage: 4.0, status: "limited" }
  ]

  const getTransactionIcon = (type: string) => {
    return type === 'revenue' ? 
      <ArrowUpRight className="h-4 w-4 text-green-600" /> : 
      <ArrowDownRight className="h-4 w-4 text-red-600" />
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'failed': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'pending': return <Clock className="h-4 w-4 text-yellow-600" />
      case 'failed': return <AlertTriangle className="h-4 w-4 text-red-600" />
      default: return <RefreshCw className="h-4 w-4 text-gray-600" />
    }
  }

  const getColorClass = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
      orange: 'bg-orange-100 text-orange-600',
      red: 'bg-red-100 text-red-600',
      yellow: 'bg-yellow-100 text-yellow-600',
      gray: 'bg-gray-100 text-gray-600'
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
                Finance Management
              </h1>
              <p className="text-white/90 apple-body text-lg">
                Monitor revenue, expenses, and financial performance
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
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{(financeStats.totalRevenue / 1000000).toFixed(1)}M</div>
                  <div className="text-sm text-muted-foreground">Total Revenue (RWF)</div>
                  <div className="text-xs text-green-600 flex items-center gap-1">
                    <ArrowUpRight className="h-3 w-3" />
                    +{financeStats.revenueGrowth}%
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
                  <div className="text-2xl font-bold">{(financeStats.totalExpenses / 1000000).toFixed(1)}M</div>
                  <div className="text-sm text-muted-foreground">Total Expenses (RWF)</div>
                  <div className="text-xs text-green-600 flex items-center gap-1">
                    <ArrowDownRight className="h-3 w-3" />
                    {financeStats.expenseGrowth}%
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
                  <div className="text-2xl font-bold">{(financeStats.netProfit / 1000000).toFixed(1)}M</div>
                  <div className="text-sm text-muted-foreground">Net Profit (RWF)</div>
                  <div className="text-xs text-blue-600">
                    {financeStats.profitMargin}% margin
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="apple-card">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{(financeStats.pendingPayments / 1000).toFixed(0)}K</div>
                  <div className="text-sm text-muted-foreground">Pending Payments (RWF)</div>
                  <div className="text-xs text-muted-foreground">
                    {financeStats.failedTransactions} failed
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 h-auto">
            <TabsTrigger value="overview" className="apple-button">Overview</TabsTrigger>
            <TabsTrigger value="revenue" className="apple-button">Revenue</TabsTrigger>
            <TabsTrigger value="expenses" className="apple-button">Expenses</TabsTrigger>
            <TabsTrigger value="transactions" className="apple-button">Transactions</TabsTrigger>
            <TabsTrigger value="payments" className="apple-button">Payment Methods</TabsTrigger>
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
                  <CardDescription>Current month financial summary</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Monthly Revenue</span>
                      <span className="font-semibold text-green-600">
                        {(financeStats.monthlyRevenue / 1000000).toFixed(1)}M RWF
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Monthly Expenses</span>
                      <span className="font-semibold text-red-600">
                        {(financeStats.monthlyExpenses / 1000000).toFixed(1)}M RWF
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Monthly Profit</span>
                      <span className="font-semibold text-blue-600">
                        {(financeStats.monthlyProfit / 1000000).toFixed(1)}M RWF
                      </span>
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex items-center justify-between font-bold">
                        <span>Profit Margin</span>
                        <span className="text-primary">
                          {((financeStats.monthlyProfit / financeStats.monthlyRevenue) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Transaction Summary */}
              <Card className="apple-card">
                <CardHeader>
                  <CardTitle className="apple-subtitle flex items-center gap-2">
                    <Receipt className="h-5 w-5" />
                    Transaction Summary
                  </CardTitle>
                  <CardDescription>Recent transaction activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Completed Transactions</span>
                      <span className="font-semibold text-green-600">
                        {financeStats.completedTransactions}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Failed Transactions</span>
                      <span className="font-semibold text-red-600">
                        {financeStats.failedTransactions}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Success Rate</span>
                      <span className="font-semibold text-blue-600">
                        {((financeStats.completedTransactions / (financeStats.completedTransactions + financeStats.failedTransactions)) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex items-center justify-between font-bold">
                        <span>Pending Amount</span>
                        <span className="text-primary">
                          {(financeStats.pendingPayments / 1000).toFixed(0)}K RWF
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Transactions */}
            <Card className="apple-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="apple-subtitle">Recent Transactions</CardTitle>
                    <CardDescription>Latest financial activity</CardDescription>
                  </div>
                  <Button variant="outline" className="apple-button">
                    <Eye className="mr-2 h-4 w-4" />
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentTransactions.slice(0, 5).map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          transaction.type === 'revenue' ? 'bg-green-100' : 'bg-red-100'
                        }`}>
                          {getTransactionIcon(transaction.type)}
                        </div>
                        <div>
                          <div className="font-medium text-sm">{transaction.description}</div>
                          <div className="text-xs text-muted-foreground">
                            {transaction.id} • {transaction.method}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`font-semibold ${
                          transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.amount > 0 ? '+' : ''}{transaction.amount.toLocaleString()} RWF
                        </div>
                        <div className="flex items-center gap-1 justify-end">
                          {getStatusIcon(transaction.status)}
                          <Badge className={getStatusColor(transaction.status)} variant="secondary">
                            {transaction.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="revenue" className="space-y-6">
            <Card className="apple-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="apple-subtitle">Revenue Streams</CardTitle>
                    <CardDescription>Breakdown of income sources</CardDescription>
                  </div>
                  <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                    <SelectTrigger className="w-48 apple-focus">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="last-7-days">Last 7 Days</SelectItem>
                      <SelectItem value="last-30-days">Last 30 Days</SelectItem>
                      <SelectItem value="last-90-days">Last 90 Days</SelectItem>
                      <SelectItem value="last-year">Last Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {revenueStreams.map((stream, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full ${getColorClass(stream.color)}`} />
                          <span className="font-medium">{stream.name}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">
                            {(stream.amount / 1000000).toFixed(1)}M RWF
                          </div>
                          <div className={`text-xs flex items-center gap-1 ${
                            stream.growth > 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {stream.growth > 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                            {Math.abs(stream.growth)}%
                          </div>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${stream.percentage}%` }}
                        />
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {stream.percentage}% of total revenue
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
                <CardTitle className="apple-subtitle">Expense Categories</CardTitle>
                <CardDescription>Budget vs actual spending analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {expenseCategories.map((category, index) => (
                    <div key={index} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full ${getColorClass(category.color)}`} />
                          <span className="font-medium">{category.name}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">
                            {(category.amount / 1000000).toFixed(1)}M RWF
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Budget: {(category.budget / 1000000).toFixed(1)}M RWF
                          </div>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-300 ${
                              category.amount > category.budget ? 'bg-red-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${Math.min((category.amount / category.budget) * 100, 100)}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            {category.percentage}% of total expenses
                          </span>
                          <span className={`font-medium ${
                            category.amount > category.budget ? 'text-red-600' : 'text-green-600'
                          }`}>
                            {((category.amount / category.budget) * 100).toFixed(1)}% of budget
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <Card className="apple-card">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="apple-subtitle">All Transactions</CardTitle>
                    <CardDescription>Complete transaction history</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="apple-button">
                      <Filter className="mr-2 h-4 w-4" />
                      Filter
                    </Button>
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
                        <TableHead>Transaction</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentTransactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{transaction.id}</div>
                              <div className="text-sm text-muted-foreground">
                                {transaction.description}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getTransactionIcon(transaction.type)}
                              <Badge variant={transaction.type === 'revenue' ? 'default' : 'secondary'}>
                                {transaction.type}
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className={`font-semibold ${
                              transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {transaction.amount > 0 ? '+' : ''}{transaction.amount.toLocaleString()} RWF
                            </div>
                          </TableCell>
                          <TableCell>{transaction.method}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              {getStatusIcon(transaction.status)}
                              <Badge className={getStatusColor(transaction.status)}>
                                {transaction.status}
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {transaction.date}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments" className="space-y-6">
            <Card className="apple-card">
              <CardHeader>
                <CardTitle className="apple-subtitle">Payment Methods</CardTitle>
                <CardDescription>Payment gateway performance and statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paymentMethods.map((method, index) => (
                    <Card key={index} className="apple-card">
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                <CreditCard className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <h3 className="font-bold apple-subtitle text-sm">{method.name}</h3>
                                <Badge variant={method.status === 'active' ? 'default' : 'secondary'} className="text-xs">
                                  {method.status}
                                </Badge>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Transactions:</span>
                              <span className="font-medium">{method.transactions}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Amount:</span>
                              <span className="font-medium">{(method.amount / 1000000).toFixed(1)}M RWF</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Share:</span>
                              <span className="font-medium">{method.percentage}%</span>
                            </div>
                          </div>

                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full transition-all duration-300" 
                              style={{ width: `${method.percentage}%` }}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
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

export default withAuth(AdminFinancePage, ['admin'])
