"use client"

import React, { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { withAuth } from '@/lib/auth-context'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import {
  Calendar,
  MapPin,
  Clock,
  Trophy,
  Users,
  Ticket,
  CreditCard,
  Smartphone,
  Building,
  Wallet,
  ArrowLeft,
  Plus,
  Minus,
  Shield,
  CheckCircle
} from 'lucide-react'
import { matches } from '@/lib/dummy-data'
import Link from 'next/link'
import Image from 'next/image'

function TicketPurchasePage() {
  const params = useParams()
  const router = useRouter()
  const matchId = parseInt(params.id as string)
  const match = matches.find(m => m.id === matchId)

  const [ticketType, setTicketType] = useState('regular')
  const [quantity, setQuantity] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  if (!match) {
    return (
      <DashboardLayout>
        <div className="p-6">
          <Card>
            <CardContent className="text-center py-12">
              <Trophy className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Match not found</h3>
              <p className="text-muted-foreground mb-4">
                The match you're looking for doesn't exist.
              </p>
              <Link href="/dashboard/matches">
                <Button>Back to Matches</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    )
  }

  const ticketPrices = {
    regular: match.price,
    vip: match.vip_price
  }

  const totalPrice = ticketPrices[ticketType as keyof typeof ticketPrices] * quantity

  const handlePurchase = async () => {
    if (!paymentMethod) {
      alert('Please select a payment method')
      return
    }

    setIsProcessing(true)
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Generate QR codes for each ticket
      const qrCodes = Array.from({ length: quantity }, (_, i) => ({
        id: `QR${Date.now()}${i}`,
        ticketNumber: `TKT${Date.now()}${i}`,
        seatNumber: `${String.fromCharCode(65 + Math.floor(Math.random() * 5))}${Math.floor(Math.random() * 50) + 1}`
      }))
      
      // Store purchase data (in real app, this would be sent to backend)
      const purchaseData = {
        matchId: match.id,
        ticketType,
        quantity,
        totalPrice,
        paymentMethod,
        qrCodes,
        purchaseDate: new Date().toISOString(),
        status: 'confirmed'
      }
      
      // Store in localStorage for demo
      const existingPurchases = JSON.parse(localStorage.getItem('userPurchases') || '[]')
      existingPurchases.push(purchaseData)
      localStorage.setItem('userPurchases', JSON.stringify(existingPurchases))
      
      // Redirect to success page
      router.push(`/dashboard/tickets/success?purchase=${Date.now()}`)
      
    } catch (error) {
      alert('Payment failed. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  const getSportIcon = (sport: string) => {
    switch (sport.toLowerCase()) {
      case 'football': return '⚽'
      case 'basketball': return '🏀'
      case 'volleyball': return '🏐'
      case 'events': return '🎪'
      default: return '🏆'
    }
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-8">
        {/* Back Button */}
        <Link href="/dashboard/matches">
          <Button variant="ghost" className="apple-button">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Matches
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Match Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="apple-card overflow-hidden">
              <div className="relative h-64">
                <Image
                  src={match.image}
                  alt={`${match.home_team} vs ${match.away_team}`}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-black/50 text-white border-0">
                    {getSportIcon(match.sport)} {match.sport}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h1 className="text-2xl font-bold apple-title mb-2">
                      {match.home_team} vs {match.away_team}
                    </h1>
                    <p className="text-muted-foreground apple-body">
                      {match.league}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{match.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{match.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{match.location}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ticket Selection */}
            <Card className="apple-card">
              <CardHeader>
                <CardTitle className="apple-subtitle">Select Tickets</CardTitle>
                <CardDescription>Choose your ticket type and quantity</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Ticket Type */}
                <div className="space-y-3">
                  <Label className="apple-caption font-medium">Ticket Type</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div 
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                        ticketType === 'regular' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => setTicketType('regular')}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold">Regular</div>
                          <div className="text-sm text-muted-foreground">Standard seating</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-primary">
                            {match.price.toLocaleString()} RWF
                          </div>
                        </div>
                      </div>
                    </div>

                    <div 
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                        ticketType === 'vip' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => setTicketType('vip')}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold flex items-center gap-2">
                            VIP <Trophy className="h-4 w-4 text-yellow-500" />
                          </div>
                          <div className="text-sm text-muted-foreground">Premium seating</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-primary">
                            {match.vip_price.toLocaleString()} RWF
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quantity */}
                <div className="space-y-3">
                  <Label className="apple-caption font-medium">Quantity</Label>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      className="apple-button"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-lg font-semibold w-8 text-center">{quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(Math.min(10, quantity + 1))}
                      disabled={quantity >= 10}
                      className="apple-button"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <span className="text-sm text-muted-foreground">
                      (Maximum 10 tickets per purchase)
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card className="apple-card">
              <CardHeader>
                <CardTitle className="apple-subtitle">Payment Method</CardTitle>
                <CardDescription>Choose how you'd like to pay</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div 
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      paymentMethod === 'mtn' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setPaymentMethod('mtn')}
                  >
                    <div className="flex items-center gap-3">
                      <Smartphone className="h-6 w-6 text-yellow-600" />
                      <div>
                        <div className="font-semibold">MTN Rwanda</div>
                        <div className="text-sm text-muted-foreground">Mobile Money</div>
                      </div>
                    </div>
                  </div>

                  <div 
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      paymentMethod === 'airtel' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setPaymentMethod('airtel')}
                  >
                    <div className="flex items-center gap-3">
                      <Smartphone className="h-6 w-6 text-red-600" />
                      <div>
                        <div className="font-semibold">Airtel Rwanda</div>
                        <div className="text-sm text-muted-foreground">Mobile Money</div>
                      </div>
                    </div>
                  </div>

                  <div 
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      paymentMethod === 'bank' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setPaymentMethod('bank')}
                  >
                    <div className="flex items-center gap-3">
                      <Building className="h-6 w-6 text-blue-600" />
                      <div>
                        <div className="font-semibold">Bank Transfer</div>
                        <div className="text-sm text-muted-foreground">Direct transfer</div>
                      </div>
                    </div>
                  </div>

                  <div 
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      paymentMethod === 'wallet' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setPaymentMethod('wallet')}
                  >
                    <div className="flex items-center gap-3">
                      <Wallet className="h-6 w-6 text-purple-600" />
                      <div>
                        <div className="font-semibold">SmartSports Wallet</div>
                        <div className="text-sm text-muted-foreground">Balance: 45,000 RWF</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card className="apple-card sticky top-6">
              <CardHeader>
                <CardTitle className="apple-subtitle">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Ticket Type</span>
                    <span className="text-sm font-medium capitalize">{ticketType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Quantity</span>
                    <span className="text-sm font-medium">{quantity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Price per ticket</span>
                    <span className="text-sm font-medium">
                      {ticketPrices[ticketType as keyof typeof ticketPrices].toLocaleString()} RWF
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold text-primary text-lg">
                      {totalPrice.toLocaleString()} RWF
                    </span>
                  </div>
                </div>

                <div className="space-y-3 pt-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Shield className="h-4 w-4" />
                    <span>Secure payment processing</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4" />
                    <span>Instant QR code delivery</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Ticket className="h-4 w-4" />
                    <span>Mobile ticket access</span>
                  </div>
                </div>

                <Button 
                  className="w-full apple-button" 
                  size="lg"
                  onClick={handlePurchase}
                  disabled={!paymentMethod || isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="mr-2 h-4 w-4" />
                      Complete Purchase
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default withAuth(TicketPurchasePage, ['client'])
