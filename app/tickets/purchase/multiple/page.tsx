"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { ArrowLeft, Calendar, Clock, MapPin, CreditCard, Smartphone, DollarSign, Trash2, ShoppingCart } from "lucide-react"
import { matches } from "@/lib/dummy-data"

export default function MultipleTicketPurchasePage() {
  const searchParams = useSearchParams()
  const [selectedMatches, setSelectedMatches] = useState<any[]>([])
  const [ticketTypes, setTicketTypes] = useState<{[key: string]: string}>({})
  const [quantities, setQuantities] = useState<{[key: string]: number}>({})
  const [paymentMethod, setPaymentMethod] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [email, setEmail] = useState("")
  const [fullName, setFullName] = useState("")

  useEffect(() => {
    const matchIds = searchParams.get("matches")?.split(",") || []
    const foundMatches = matchIds.map(id => {
      // Handle both string and numeric IDs
      const match = matches.find(m => m.id.toString() === id || m.id === parseInt(id))
      return match
    }).filter(Boolean)
    
    setSelectedMatches(foundMatches)
    
    // Initialize ticket types and quantities
    const initialTicketTypes: {[key: string]: string} = {}
    const initialQuantities: {[key: string]: number} = {}
    
    foundMatches.forEach(match => {
      if (match) {
        initialTicketTypes[match.id.toString()] = "regular"
        initialQuantities[match.id.toString()] = 1
      }
    })
    
    setTicketTypes(initialTicketTypes)
    setQuantities(initialQuantities)
  }, [searchParams])

  const removeMatch = (matchId: string) => {
    setSelectedMatches(prev => prev.filter(match => match.id.toString() !== matchId))
    const newTicketTypes = { ...ticketTypes }
    const newQuantities = { ...quantities }
    delete newTicketTypes[matchId]
    delete newQuantities[matchId]
    setTicketTypes(newTicketTypes)
    setQuantities(newQuantities)
  }

  const updateTicketType = (matchId: string, type: string) => {
    setTicketTypes(prev => ({ ...prev, [matchId]: type }))
  }

  const updateQuantity = (matchId: string, quantity: number) => {
    setQuantities(prev => ({ ...prev, [matchId]: Math.max(1, Math.min(10, quantity)) }))
  }

  const calculateMatchTotal = (match: any) => {
    const matchId = match.id.toString()
    const ticketType = ticketTypes[matchId] || "regular"
    const quantity = quantities[matchId] || 1
    const price = ticketType === "vip" ? match.vip_price : match.price
    return price * quantity
  }

  const calculateGrandTotal = () => {
    const subtotal = selectedMatches.reduce((total, match) => total + calculateMatchTotal(match), 0)
    const serviceFee = Math.round(subtotal * 0.05) // 5% service fee
    const vatAmount = Math.round((subtotal + serviceFee) * 0.18) // 18% VAT
    return {
      subtotal,
      serviceFee,
      vatAmount,
      total: subtotal + serviceFee + vatAmount
    }
  }

  const handlePurchase = () => {
    if (!paymentMethod || !phoneNumber || !email || !fullName) {
      alert("Please fill in all required fields")
      return
    }

    if (selectedMatches.length === 0) {
      alert("No matches selected")
      return
    }

    const totals = calculateGrandTotal()
    const matchDetails = selectedMatches.map(match => {
      const matchId = match.id.toString()
      const ticketType = ticketTypes[matchId] || "regular"
      const quantity = quantities[matchId] || 1
      return `${match.home_team} vs ${match.away_team} - ${quantity}x ${ticketType.toUpperCase()}`
    }).join("\n")

    alert(`Multiple tickets purchase successful! 

Matches:
${matchDetails}

Subtotal: ${totals.subtotal.toLocaleString()} RWF
Service Fee: ${totals.serviceFee.toLocaleString()} RWF  
VAT (18%): ${totals.vatAmount.toLocaleString()} RWF
Total: ${totals.total.toLocaleString()} RWF

EBM Receipt will be sent to ${email}`)
  }

  if (selectedMatches.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container max-w-4xl mx-auto px-4 py-6">
          <Card>
            <CardContent className="text-center py-12">
              <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">No Matches Selected</h2>
              <p className="text-muted-foreground mb-4">Please select matches to purchase tickets.</p>
              <Link href="/sports">
                <Button>Browse Matches</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const totals = calculateGrandTotal()

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container max-w-6xl mx-auto px-4 py-6">
        <div className="mb-8">
          <Link href="/sports">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Sports
            </Button>
          </Link>

          <h1 className="font-serif text-3xl font-bold mb-2">Purchase Multiple Tickets</h1>
          <p className="text-muted-foreground">Review your selected matches and complete your purchase</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Selected Matches */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Selected Matches ({selectedMatches.length})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedMatches.map((match) => {
                  const matchId = match.id.toString()
                  const ticketType = ticketTypes[matchId] || "regular"
                  const quantity = quantities[matchId] || 1
                  const matchTotal = calculateMatchTotal(match)

                  return (
                    <Card key={match.id} className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex-shrink-0 relative overflow-hidden">
                          <img
                            src={match.image || "/football-stadium-crowd.png"}
                            alt={`${match.home_team} vs ${match.away_team}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold text-lg">
                                {match.home_team} vs {match.away_team}
                              </h3>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  {match.date}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  {match.time}
                                </div>
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-4 w-4" />
                                  {match.location}
                                </div>
                              </div>
                              <Badge variant="outline" className="mt-2">{match.league}</Badge>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeMatch(matchId)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                            {/* Ticket Type */}
                            <div>
                              <Label className="text-sm font-medium">Ticket Type</Label>
                              <Select value={ticketType} onValueChange={(value) => updateTicketType(matchId, value)}>
                                <SelectTrigger className="mt-1">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="regular">
                                    Regular - {match.price.toLocaleString()} RWF
                                  </SelectItem>
                                  <SelectItem value="vip">
                                    VIP - {match.vip_price.toLocaleString()} RWF
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            {/* Quantity */}
                            <div>
                              <Label className="text-sm font-medium">Quantity</Label>
                              <div className="flex items-center gap-2 mt-1">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => updateQuantity(matchId, quantity - 1)}
                                  disabled={quantity <= 1}
                                >
                                  -
                                </Button>
                                <span className="w-8 text-center">{quantity}</span>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => updateQuantity(matchId, quantity + 1)}
                                  disabled={quantity >= 10}
                                >
                                  +
                                </Button>
                              </div>
                            </div>

                            {/* Total */}
                            <div>
                              <Label className="text-sm font-medium">Total</Label>
                              <div className="mt-1 text-lg font-bold">
                                {matchTotal.toLocaleString()} RWF
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  )
                })}
              </CardContent>
            </Card>

            {/* Customer Information */}
            <Card>
              <CardHeader>
                <CardTitle>Customer Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      placeholder="Enter your full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      placeholder="07XXXXXXXX"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="payment-method">Payment Method *</Label>
                    <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mtn">
                          <div className="flex items-center gap-2">
                            <Smartphone className="h-4 w-4" />
                            MTN Mobile Money
                          </div>
                        </SelectItem>
                        <SelectItem value="airtel">
                          <div className="flex items-center gap-2">
                            <Smartphone className="h-4 w-4" />
                            Airtel Money
                          </div>
                        </SelectItem>
                        <SelectItem value="wallet">
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4" />
                            SmartSports Wallet
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {selectedMatches.map((match) => {
                    const matchId = match.id.toString()
                    const ticketType = ticketTypes[matchId] || "regular"
                    const quantity = quantities[matchId] || 1
                    const matchTotal = calculateMatchTotal(match)

                    return (
                      <div key={match.id} className="flex justify-between text-sm">
                        <span className="truncate mr-2">
                          {match.home_team} vs {match.away_team} ({quantity}x {ticketType})
                        </span>
                        <span>{matchTotal.toLocaleString()} RWF</span>
                      </div>
                    )
                  })}

                  <div className="border-t pt-2 space-y-1">
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Subtotal</span>
                      <span>{totals.subtotal.toLocaleString()} RWF</span>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Service Fee (5%)</span>
                      <span>{totals.serviceFee.toLocaleString()} RWF</span>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>VAT (18% - EBM)</span>
                      <span>{totals.vatAmount.toLocaleString()} RWF</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>{totals.total.toLocaleString()} RWF</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Button onClick={handlePurchase} className="w-full h-12 text-lg">
                  <CreditCard className="mr-2 h-5 w-5" />
                  Complete Purchase
                </Button>

                <div className="text-xs text-muted-foreground space-y-1">
                  <p>• Digital tickets will be sent to your email</p>
                  <p>• EBM VAT receipt included for tax purposes</p>
                  <p>• Tickets are non-refundable</p>
                  <p>• Present QR code at venue entrance</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
