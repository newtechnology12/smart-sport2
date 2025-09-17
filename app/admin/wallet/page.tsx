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
import { Wallet, Plus, Minus, ArrowUpRight, ArrowDownLeft, History, Settings, DollarSign, TrendingUp } from "lucide-react"

function AdminWallet() {
  const [amount, setAmount] = useState("")
  const [transactionType, setTransactionType] = useState("deposit")

  // Mock wallet data
  const walletStats = {
    balance: 2500000,
    totalDeposits: 5000000,
    totalWithdrawals: 2500000,
    pendingWithdrawals: 150000
  }

  const recentTransactions = [
    {
      id: "TXN-001",
      type: "deposit",
      amount: 500000,
      description: "Event ticket sales revenue",
      date: "2024-03-15",
      time: "14:30",
      status: "completed"
    },
    {
      id: "TXN-002",
      type: "withdrawal",
      amount: 200000,
      description: "Team payment",
      date: "2024-03-14",
      time: "10:15",
      status: "completed"
    },
    {
      id: "TXN-003",
      type: "deposit",
      amount: 750000,
      description: "Sponsorship payment",
      date: "2024-03-13",
      time: "16:45",
      status: "completed"
    },
    {
      id: "TXN-004",
      type: "withdrawal",
      amount: 100000,
      description: "Platform maintenance",
      date: "2024-03-12",
      time: "09:20",
      status: "pending"
    }
  ]

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'deposit': return <ArrowDownLeft className="h-4 w-4 text-green-600" />
      case 'withdrawal': return <ArrowUpRight className="h-4 w-4 text-red-600" />
      default: return <DollarSign className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed': return <Badge className="bg-green-100 text-green-800">Completed</Badge>
      case 'pending': return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case 'failed': return <Badge className="bg-red-100 text-red-800">Failed</Badge>
      default: return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Wallet</h1>
            <p className="text-gray-600 mt-1">Manage platform finances and transactions</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <History className="h-4 w-4 mr-2" />
              Transaction History
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Settings className="h-4 w-4 mr-2" />
              Wallet Settings
            </Button>
          </div>
        </div>

        {/* Wallet Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Current Balance</p>
                  <p className="text-3xl font-bold text-blue-900">{walletStats.balance.toLocaleString()} RWF</p>
                </div>
                <Wallet className="h-12 w-12 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Deposits</p>
                  <p className="text-2xl font-bold text-gray-900">{walletStats.totalDeposits.toLocaleString()} RWF</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Withdrawals</p>
                  <p className="text-2xl font-bold text-gray-900">{walletStats.totalWithdrawals.toLocaleString()} RWF</p>
                </div>
                <TrendingUp className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Withdrawals</p>
                  <p className="text-2xl font-bold text-gray-900">{walletStats.pendingWithdrawals.toLocaleString()} RWF</p>
                </div>
                <DollarSign className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Deposit</CardTitle>
              <CardDescription>Add funds to the platform wallet</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Amount (RWF)</label>
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Payment Method</label>
                <Select defaultValue="bank_transfer">
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                    <SelectItem value="mobile_money">Mobile Money</SelectItem>
                    <SelectItem value="credit_card">Credit Card</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-2" />
                Deposit Funds
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Withdrawal</CardTitle>
              <CardDescription>Withdraw funds from the platform wallet</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Amount (RWF)</label>
                <Input
                  type="number"
                  placeholder="Enter amount"
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Withdrawal Method</label>
                <Select defaultValue="bank_transfer">
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                    <SelectItem value="mobile_money">Mobile Money</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline" className="w-full">
                <Minus className="h-4 w-4 mr-2" />
                Request Withdrawal
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Latest wallet transactions and activities</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      <p className="font-medium text-gray-900">{transaction.id}</p>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getTransactionIcon(transaction.type)}
                        <span className="text-sm font-medium capitalize">{transaction.type}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className={`text-sm font-medium ${
                        transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.type === 'deposit' ? '+' : '-'}{transaction.amount.toLocaleString()} RWF
                      </p>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm">{transaction.description}</p>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm font-medium">{transaction.date}</p>
                        <p className="text-sm text-gray-500">{transaction.time}</p>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(transaction.status)}</TableCell>
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

export default withAuth(AdminWallet)
