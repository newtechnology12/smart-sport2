"use client"

import React from 'react'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { withAuth } from '@/lib/auth-context'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Calendar,
  Ticket,
  Wallet,
  TrendingUp,
  Clock,
  MapPin,
  Star,
  ArrowRight,
  QrCode,
  CreditCard,
  Trophy,
  Users
} from 'lucide-react'
import { matches, userTickets, walletTransactions } from '@/lib/dummy-data'
import Link from 'next/link'

function ClientDashboard() {
  // Mock user data
  const userStats = {
    totalTickets: 12,
    upcomingEvents: 3,
    walletBalance: 45000,
    totalSpent: 125000,
    favoriteTeam: "APR FC",
    memberSince: "2024"
  }

  const upcomingMatches = matches.slice(0, 3)
  const recentTickets = userTickets.slice(0, 2)
  const recentTransactions = walletTransactions.slice(0, 3)

  return (
    <DashboardLayout>
      <div className="p-6 space-y-8">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold apple-title mb-2">
                Welcome back! 👋
              </h1>
              <p className="text-white/90 apple-body text-lg">
                Ready to catch the next big game?
              </p>
            </div>
            <div className="hidden md:block">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                <Trophy className="h-12 w-12 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="apple-card">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Ticket className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{userStats.totalTickets}</div>
                  <div className="text-sm text-muted-foreground">Total Tickets</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="apple-card">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{userStats.upcomingEvents}</div>
                  <div className="text-sm text-muted-foreground">Upcoming Events</div>
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
                  <div className="text-2xl font-bold">{(userStats.walletBalance / 1000).toFixed(0)}K</div>
                  <div className="text-sm text-muted-foreground">Wallet Balance (RWF)</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="apple-card">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{(userStats.totalSpent / 1000).toFixed(0)}K</div>
                  <div className="text-sm text-muted-foreground">Total Spent (RWF)</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="apple-card">
          <CardHeader>
            <CardTitle className="apple-subtitle">Quick Actions</CardTitle>
            <CardDescription>Get things done faster</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/dashboard/matches">
                <Button className="w-full h-16 apple-button flex-col gap-2" variant="outline">
                  <Calendar className="h-5 w-5" />
                  <span className="text-sm">Browse Matches</span>
                </Button>
              </Link>
              <Link href="/dashboard/tickets">
                <Button className="w-full h-16 apple-button flex-col gap-2" variant="outline">
                  <Ticket className="h-5 w-5" />
                  <span className="text-sm">My Tickets</span>
                </Button>
              </Link>
              <Link href="/dashboard/qr-codes">
                <Button className="w-full h-16 apple-button flex-col gap-2" variant="outline">
                  <QrCode className="h-5 w-5" />
                  <span className="text-sm">QR Codes</span>
                </Button>
              </Link>
              <Link href="/dashboard/wallet">
                <Button className="w-full h-16 apple-button flex-col gap-2" variant="outline">
                  <Wallet className="h-5 w-5" />
                  <span className="text-sm">Top Up Wallet</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upcoming Matches */}
          <Card className="apple-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="apple-subtitle">Upcoming Matches</CardTitle>
                  <CardDescription>Don't miss these exciting games</CardDescription>
                </div>
                <Link href="/dashboard/matches">
                  <Button variant="ghost" size="sm" className="apple-button">
                    View All <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingMatches.map((match) => (
                <div key={match.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Trophy className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold apple-subtitle text-sm">
                      {match.home_team} vs {match.away_team}
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center gap-2">
                      <Clock className="h-3 w-3" />
                      {match.date} at {match.time}
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center gap-2">
                      <MapPin className="h-3 w-3" />
                      {match.location}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-primary">
                      {match.price.toLocaleString()} RWF
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {match.sport}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Tickets */}
          <Card className="apple-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="apple-subtitle">My Recent Tickets</CardTitle>
                  <CardDescription>Your latest purchases</CardDescription>
                </div>
                <Link href="/dashboard/tickets">
                  <Button variant="ghost" size="sm" className="apple-button">
                    View All <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentTickets.map((ticket) => (
                <div key={ticket.id} className="flex items-center gap-4 p-4 border rounded-lg">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Ticket className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold apple-subtitle text-sm">
                      {ticket.match.home_team} vs {ticket.match.away_team}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Ticket ID: {ticket.id}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Quantity: {ticket.quantity} • Seats: {ticket.seat_numbers.join(', ')}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">
                      {ticket.total.toLocaleString()} RWF
                    </div>
                    <Badge variant="default" className="text-xs">
                      {ticket.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Recent Transactions */}
        <Card className="apple-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="apple-subtitle">Recent Transactions</CardTitle>
                <CardDescription>Your wallet activity</CardDescription>
              </div>
              <Link href="/dashboard/wallet">
                <Button variant="ghost" size="sm" className="apple-button">
                  View All <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.type === 'deposit' ? 'bg-green-100' : 
                      transaction.type === 'purchase' ? 'bg-blue-100' : 'bg-purple-100'
                    }`}>
                      {transaction.type === 'deposit' ? (
                        <TrendingUp className="h-5 w-5 text-green-600" />
                      ) : transaction.type === 'purchase' ? (
                        <Ticket className="h-5 w-5 text-blue-600" />
                      ) : (
                        <Users className="h-5 w-5 text-purple-600" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{transaction.description}</div>
                      <div className="text-xs text-muted-foreground">{transaction.date}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-semibold ${
                      transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.amount > 0 ? '+' : ''}{transaction.amount.toLocaleString()} RWF
                    </div>
                    <Badge variant={transaction.status === 'completed' ? 'default' : 'secondary'} className="text-xs">
                      {transaction.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

export default withAuth(ClientDashboard, ['client'])
