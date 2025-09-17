"use client"

import React, { useState } from 'react'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { withAuth } from '@/lib/auth-context'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Wallet,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  CreditCard,
  Smartphone,
  Building,
  TrendingUp,
  TrendingDown,
  Eye,
  Download,
  RefreshCw,
  CheckCircle,
  Clock,
  AlertTriangle,
  DollarSign,
  Receipt,
  Target,
  PieChart
} from 'lucide-react'

function ClientWalletPage() {
  const [isTopUpOpen, setIsTopUpOpen] = useState(false)
  const [selectedAmount, setSelectedAmount] = useState("")
  const [selectedMethod, setSelectedMethod] = useState("")
  const [activeTab, setActiveTab] = useState("overview")

  // Mock wallet data
  const walletStats = {
    balance: 125000,
    totalDeposits: 450000,
    totalSpent: 325000,
    pendingTransactions: 2,
    monthlySpending: 85000,
    averageTransaction: 15000,
    lastTopUp: "2025-01-14 16:30",
    accountStatus: "active"
  }

  const quickAmounts = [10000, 25000, 50000, 100000, 200000, 500000]

  const paymentMethods = [
    { id: "mtn", name: "MTN Mobile Money", icon: Smartphone, fee: "1%", minAmount: 1000, available: true },
    { id: "airtel", name: "Airtel Money", icon: Smartphone, fee: "1%", minAmount: 1000, available: true },
    { id: "bank", name: "Bank Transfer", icon: Building, fee: "Free", minAmount: 5000, available: true },
    { id: "card", name: "Credit/Debit Card", icon: CreditCard, fee: "2.5%", minAmount: 1000, available: false }
  ]

  const recentTransactions = [
    { id: "TXN001", type: "deposit", description: "MTN Mobile Money Top-up", amount: 50000, date: "2025-01-15 14:30", status: "completed", method: "MTN Mobile Money", fee: 500 },
    { id: "TXN002", type: "purchase", description: "Ticket Purchase - APR FC vs Rayon Sports", amount: -25000, date: "2025-01-15 13:45", status: "completed", method: "Wallet", fee: 0 },
    { id: "TXN003", type: "deposit", description: "Bank Transfer Top-up", amount: 100000, date: "2025-01-14 16:20", status: "completed", method: "Bank Transfer", fee: 0 },
    { id: "TXN004", type: "purchase", description: "Store Purchase - Team Jersey", amount: -35000, date: "2025-01-14 15:10", status: "completed", method: "Wallet", fee: 0 },
    { id: "TXN005", type: "deposit", description: "Airtel Money Top-up", amount: 25000, date: "2025-01-13 11:30", status: "pending", method: "Airtel Money", fee: 250 },
    { id: "TXN006", type: "refund", description: "Ticket Refund - Cancelled Match", amount: 15000, date: "2025-01-12 09:15", status: "completed", method: "Wallet", fee: 0 }
  ]

  const monthlySpending = [
    { category: "Tickets", amount: 65000, percentage: 76.5, color: "blue" },
    { category: "Store", amount: 15000, percentage: 17.6, color: "green" },
    { category: "Donations", amount: 5000, percentage: 5.9, color: "purple" }
  ]

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'deposit': return <ArrowUpRight className="h-4 w-4 text-green-600" />
      case 'purchase': return <ArrowDownRight className="h-4 w-4 text-red-600" />
      case 'refund': return <RefreshCw className="h-4 w-4 text-blue-600" />
      default: return <Receipt className="h-4 w-4 text-gray-600" />
    }
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
                My Wallet
              </h1>
              <p className="text-white/90 apple-body text-lg">
                Manage your balance and transactions
              </p>
            </div>
            <div className="hidden md:block">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                <Wallet className="h-12 w-12 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Wallet Balance */}
        <Card className="apple-card bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground mb-2">Current Balance</div>
                <div className="text-4xl font-bold text-primary mb-2">
                  {walletStats.balance.toLocaleString()} RWF
                </div>
                <div className="text-sm text-muted-foreground">
                  Last updated: {walletStats.lastTopUp}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Dialog open={isTopUpOpen} onOpenChange={setIsTopUpOpen}>
                  <DialogTrigger asChild>
                    <Button className="apple-button">
                      <Plus className="mr-2 h-4 w-4" />
                      Top Up
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Top Up Wallet</DialogTitle>
                      <DialogDescription>
                        Add money to your wallet using your preferred payment method.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6 py-4">
                      <div>
                        <Label htmlFor="amount">Amount (RWF)</Label>
                        <Input
                          id="amount"
                          type="number"
                          placeholder="Enter amount"
                          value={selectedAmount}
                          onChange={(e) => setSelectedAmount(e.target.value)}
                          className="apple-focus"
                        />
                        <div className="grid grid-cols-3 gap-2 mt-2">
                          {quickAmounts.map((amount) => (
                            <Button
                              key={amount}
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedAmount(amount.toString())}
                              className="apple-button"
                            >
                              {(amount / 1000).toFixed(0)}K
                            </Button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <Label>Payment Method</Label>
                        <div className="grid gap-3 mt-2">
                          {paymentMethods.map((method) => {
                            const Icon = method.icon
                            return (
                              <div
                                key={method.id}
                                className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-all ${
                                  selectedMethod === method.id ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'
                                } ${!method.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                                onClick={() => method.available && setSelectedMethod(method.id)}
                              >
                                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                  <Icon className="h-5 w-5 text-primary" />
                                </div>
                                <div className="flex-1">
                                  <div className="font-medium">{method.name}</div>
                                  <div className="text-sm text-muted-foreground">
                                    Fee: {method.fee} • Min: {method.minAmount.toLocaleString()} RWF
                                  </div>
                                </div>
                                {!method.available && (
                                  <Badge variant="secondary">Coming Soon</Badge>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      </div>

                      {selectedAmount && selectedMethod && (
                        <div className="p-4 bg-muted/50 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <span>Amount:</span>
                            <span className="font-medium">{parseInt(selectedAmount).toLocaleString()} RWF</span>
                          </div>
                          <div className="flex justify-between items-center mb-2">
                            <span>Fee:</span>
                            <span className="font-medium">
                              {paymentMethods.find(m => m.id === selectedMethod)?.fee === 'Free' ? 'Free' : 
                               `${(parseInt(selectedAmount) * 0.01).toLocaleString()} RWF`}
                            </span>
                          </div>
                          <div className="flex justify-between items-center font-bold border-t pt-2">
                            <span>Total to Pay:</span>
                            <span>
                              {paymentMethods.find(m => m.id === selectedMethod)?.fee === 'Free' ? 
                               parseInt(selectedAmount).toLocaleString() : 
                               (parseInt(selectedAmount) + parseInt(selectedAmount) * 0.01).toLocaleString()} RWF
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setIsTopUpOpen(false)}>Cancel</Button>
                      <Button 
                        onClick={() => setIsTopUpOpen(false)}
                        disabled={!selectedAmount || !selectedMethod}
                      >
                        Proceed to Payment
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button variant="outline" className="apple-button">
                  <Download className="mr-2 h-4 w-4" />
                  Statement
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="apple-card">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{(walletStats.totalDeposits / 1000).toFixed(0)}K</div>
                  <div className="text-sm text-muted-foreground">Total Deposits (RWF)</div>
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
                  <div className="text-2xl font-bold">{(walletStats.totalSpent / 1000).toFixed(0)}K</div>
                  <div className="text-sm text-muted-foreground">Total Spent (RWF)</div>
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
                  <div className="text-2xl font-bold">{(walletStats.averageTransaction / 1000).toFixed(0)}K</div>
                  <div className="text-sm text-muted-foreground">Avg Transaction (RWF)</div>
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
                  <div className="text-2xl font-bold">{walletStats.pendingTransactions}</div>
                  <div className="text-sm text-muted-foreground">Pending Transactions</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-1 lg:grid-cols-3 h-auto">
            <TabsTrigger value="overview" className="apple-button">Transaction History</TabsTrigger>
            <TabsTrigger value="spending" className="apple-button">Spending Analysis</TabsTrigger>
            <TabsTrigger value="settings" className="apple-button">Wallet Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card className="apple-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="apple-subtitle">Recent Transactions</CardTitle>
                    <CardDescription>Your latest wallet activity</CardDescription>
                  </div>
                  <Button variant="outline" className="apple-button">
                    <Eye className="mr-2 h-4 w-4" />
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          transaction.type === 'deposit' ? 'bg-green-100' : 
                          transaction.type === 'purchase' ? 'bg-red-100' : 'bg-blue-100'
                        }`}>
                          {getTransactionIcon(transaction.type)}
                        </div>
                        <div>
                          <div className="font-medium">{transaction.description}</div>
                          <div className="text-sm text-muted-foreground">
                            {transaction.id} • {transaction.method}
                            {transaction.fee > 0 && ` • Fee: ${transaction.fee.toLocaleString()} RWF`}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`font-semibold ${
                          transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.amount > 0 ? '+' : ''}{transaction.amount.toLocaleString()} RWF
                        </div>
                        <div className="flex items-center gap-1 justify-end mt-1">
                          {getStatusIcon(transaction.status)}
                          <Badge className={getStatusColor(transaction.status)}>
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

          <TabsContent value="spending" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="apple-card">
                <CardHeader>
                  <CardTitle className="apple-subtitle flex items-center gap-2">
                    <PieChart className="h-5 w-5" />
                    Monthly Spending Breakdown
                  </CardTitle>
                  <CardDescription>Where your money goes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {monthlySpending.map((category, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-4 h-4 rounded-full ${getColorClass(category.color)}`} />
                            <span className="font-medium">{category.name}</span>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold">
                              {category.amount.toLocaleString()} RWF
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {category.percentage}%
                            </div>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${category.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="apple-card">
                <CardHeader>
                  <CardTitle className="apple-subtitle flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Spending Insights
                  </CardTitle>
                  <CardDescription>Your spending patterns</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>This Month</span>
                      <span className="font-semibold">{walletStats.monthlySpending.toLocaleString()} RWF</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Daily Average</span>
                      <span className="font-semibold">{(walletStats.monthlySpending / 30).toFixed(0)} RWF</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Largest Transaction</span>
                      <span className="font-semibold">35,000 RWF</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Most Frequent</span>
                      <span className="font-semibold">Ticket Purchases</span>
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex items-center justify-between font-bold">
                        <span>Savings vs Last Month</span>
                        <span className="text-green-600">+12.5%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="apple-card">
              <CardHeader>
                <CardTitle className="apple-subtitle">Wallet Settings</CardTitle>
                <CardDescription>Manage your wallet preferences and security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">Security Settings</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Transaction PIN</div>
                        <div className="text-sm text-muted-foreground">Secure your transactions with a PIN</div>
                      </div>
                      <Button variant="outline" size="sm" className="apple-button">
                        Change PIN
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Two-Factor Authentication</div>
                        <div className="text-sm text-muted-foreground">Add extra security to your account</div>
                      </div>
                      <Badge variant="default">Enabled</Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Notification Settings</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Transaction Alerts</div>
                        <div className="text-sm text-muted-foreground">Get notified of all transactions</div>
                      </div>
                      <Badge variant="default">Enabled</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Low Balance Alert</div>
                        <div className="text-sm text-muted-foreground">Alert when balance is below 10,000 RWF</div>
                      </div>
                      <Badge variant="default">Enabled</Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Account Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Account Status</div>
                        <div className="text-sm text-muted-foreground">Your wallet account status</div>
                      </div>
                      <Badge variant="default">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Account Created</div>
                        <div className="text-sm text-muted-foreground">When you first created your wallet</div>
                      </div>
                      <span className="text-sm text-muted-foreground">January 10, 2025</span>
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

export default withAuth(ClientWalletPage, ['client'])
