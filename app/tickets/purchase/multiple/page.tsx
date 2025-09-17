"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

import { ArrowLeft, Calendar, Clock, MapPin, CreditCard, Smartphone, DollarSign, Trash2, ShoppingCart } from "lucide-react"
import { matches } from "@/lib/dummy-data"
import { getSportImage } from "@/lib/images"
import { validateRwandanPhoneNumber, formatPhoneNumber } from "@/lib/utils/phone-validation"

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
    
    // Create sample matches for demonstration (matching the teams page)
    const sampleMatches = [
      {
        id: "match-101",
        home_team: "Rayon Sports",
        away_team: "Kiyovu Sports",
        date: "2025-01-25",
        time: "15:00",
        location: "Amahoro Stadium",
        sport: "Football",
        league: "Rwanda Premier League",
        price: 3000,
        vip_price: 8000,
        status: "upcoming",
        image: "/football-stadium-crowd.png",
      },
      {
        id: "match-102",
        home_team: "Mukura Victory",
        away_team: "Rayon Sports",
        date: "2025-02-01",
        time: "16:30",
        location: "Huye Stadium",
        sport: "Football",
        league: "Rwanda Premier League",
        price: 2500,
        vip_price: 7000,
        status: "upcoming",
        image: "/football-stadium-crowd.png",
      },
      {
        id: "match-103",
        home_team: "Rayon Sports",
        away_team: "Police FC",
        date: "2025-02-08",
        time: "14:00",
        location: "Kigali Stadium",
        sport: "Football",
        league: "Rwanda Premier League",
        price: 3500,
        vip_price: 9000,
        status: "upcoming",
        image: "/football-stadium-crowd.png",
      },
    ]
    
    const foundMatches = matchIds.map(id => {
      // First check sample matches
      const sampleMatch = sampleMatches.find(m => m.id === id)
      if (sampleMatch) return sampleMatch
      
      // Then check regular matches
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

  const handlePurchase = async () => {
    if (!paymentMethod || !phoneNumber || !fullName) {
      alert("Please fill in all required fields (Name, Phone Number, and Payment Method)")
      return
    }

    // Validate phone number format using the new validation utility
    const validation = validateRwandanPhoneNumber(phoneNumber)
    if (!validation.isValid) {
      alert(validation.message)
      return
    }

    if (selectedMatches.length === 0) {
      alert("No matches selected")
      return
    }

    try {
      const totals = calculateGrandTotal()

      // In a real implementation, this would handle multiple event purchases
      // For now, simulate success and redirect to success page
      const paymentRef = `SSR${Date.now()}${Math.floor(Math.random() * 1000)}`
      const totalTickets = selectedMatches.reduce((sum, match) => {
        const matchId = match.id.toString()
        return sum + (quantities[matchId] || 1)
      }, 0)

      // Redirect to success page with payment reference
      window.location.href = `/tickets/success?ref=${paymentRef}&quantity=${totalTickets}&total=${totals.total}&multiple=true`

    } catch (error) {
      console.error('Purchase failed:', error)
      alert('Purchase failed. Please try again.')
    }
  }

  if (selectedMatches.length === 0) {
    return (
      <div className="min-h-screen bg-background">
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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header Section */}
        <div className="mb-6 sm:mb-8">
          <Link href="/sports">
            <Button variant="ghost" className="mb-4 sm:mb-6 group hover:bg-primary/5 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Back to Sports
            </Button>
          </Link>

          <div className="text-center sm:text-left">
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text mb-2">
              Purchase Multiple Tickets
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Review your selected matches and complete your purchase
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Selected Matches */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10">
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5 text-primary" />
                  Selected Matches ({selectedMatches.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-4">
                {selectedMatches.map((match, index) => {
                  const matchId = match.id.toString()
                  const ticketType = ticketTypes[matchId] || "regular"
                  const quantity = quantities[matchId] || 1
                  const matchTotal = calculateMatchTotal(match)

                  return (
                    <Card key={match.id} className="group hover:shadow-md transition-all duration-200 border border-border/50">
                      <div className="p-4 sm:p-5">
                        <div className="flex flex-col sm:flex-row gap-4">
                          {/* Match Image */}
                          <div className="w-full sm:w-24 h-32 sm:h-24 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex-shrink-0 relative overflow-hidden">
                            <Image
                              src={match.image || getSportImage(match.sport)}
                              alt={`${match.home_team} vs ${match.away_team}`}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                              sizes="(max-width: 640px) 100vw, 96px"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                            <Badge 
                              variant="outline" 
                              className="absolute top-2 right-2 bg-white/95 text-black border-white/95 text-xs"
                            >
                              {match.status}
                            </Badge>
                          </div>
                          
                          {/* Match Details */}
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                              <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-lg sm:text-xl text-foreground mb-2">
                                  {match.home_team} vs {match.away_team}
                                </h3>
                                <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground mb-2">
                                  <div className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                                    <span>
                                      {new Date(match.date).toLocaleDateString("en-US", {
                                        weekday: "short",
                                        month: "short",
                                        day: "numeric",
                                      })}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                                    <span>{match.time}</span>
                                  </div>
                                  <div className="flex items-center gap-1 min-w-0">
                                    <MapPin className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                                    <span className="truncate">{match.location}</span>
                                  </div>
                                </div>
                                <Badge variant="secondary" className="text-xs">
                                  {match.league}
                                </Badge>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeMatch(matchId)}
                                className="text-red-600 hover:text-red-700 hover:bg-red-50 self-start sm:self-center"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>

                            {/* Ticket Configuration */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                              {/* Ticket Type */}
                              <div>
                                <Label className="text-sm font-medium text-foreground">Ticket Type</Label>
                                <Select value={ticketType} onValueChange={(value) => updateTicketType(matchId, value)}>
                                  <SelectTrigger className="mt-2 bg-background border-border/50">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="regular">
                                      <div className="flex items-center justify-between w-full">
                                        <span>Regular</span>
                                        <span className="text-primary font-semibold ml-2">
                                          {match.price.toLocaleString()} RWF
                                        </span>
                                      </div>
                                    </SelectItem>
                                    <SelectItem value="vip">
                                      <div className="flex items-center justify-between w-full">
                                        <span>VIP</span>
                                        <span className="text-primary font-semibold ml-2">
                                          {match.vip_price.toLocaleString()} RWF
                                        </span>
                                      </div>
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>

                              {/* Quantity */}
                              <div>
                                <Label className="text-sm font-medium text-foreground">Quantity</Label>
                                <div className="flex items-center gap-2 mt-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => updateQuantity(matchId, quantity - 1)}
                                    disabled={quantity <= 1}
                                    className="h-9 w-9 p-0"
                                  >
                                    -
                                  </Button>
                                  <div className="flex-1 text-center">
                                    <span className="text-lg font-semibold">{quantity}</span>
                                  </div>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => updateQuantity(matchId, quantity + 1)}
                                    disabled={quantity >= 10}
                                    className="h-9 w-9 p-0"
                                  >
                                    +
                                  </Button>
                                </div>
                              </div>

                              {/* Total */}
                              <div>
                                <Label className="text-sm font-medium text-foreground">Total</Label>
                                <div className="mt-2 p-3 bg-primary/5 rounded-lg border border-primary/20">
                                  <div className="text-lg font-bold text-primary text-center">
                                    {matchTotal.toLocaleString()} RWF
                                  </div>
                                </div>
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

<<<<<<< HEAD
            {/* Customer Information */}
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-muted/5 to-muted/10">
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  Customer Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <Label htmlFor="fullName" className="text-sm font-medium text-foreground">Full Name *</Label>
=======
            {/* Customer Information - Compact */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Customer Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="fullName" className="text-sm">Full Name *</Label>
>>>>>>> 279ab84e42fc115201c908eb2c1eef70e88226d3
                    <Input
                      id="fullName"
                      placeholder="Enter your full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
<<<<<<< HEAD
                      className="mt-2 bg-background border-border/50 focus:border-primary"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium text-foreground">Email Address (Optional)</Label>
=======
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-sm">Email (Optional)</Label>
>>>>>>> 279ab84e42fc115201c908eb2c1eef70e88226d3
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
<<<<<<< HEAD
                      className="mt-2 bg-background border-border/50 focus:border-primary"
=======
                      className="mt-1"
>>>>>>> 279ab84e42fc115201c908eb2c1eef70e88226d3
                    />
                  </div>
                </div>

<<<<<<< HEAD
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <Label htmlFor="phone" className="text-sm font-medium text-foreground">Phone Number *</Label>
                    <Input
                      id="phone"
                      placeholder="07XXXXXXXX"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="mt-2 bg-background border-border/50 focus:border-primary"
                    />
                  </div>
                  <div>
                    <Label htmlFor="payment-method" className="text-sm font-medium text-foreground">Payment Method *</Label>
                    <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                      <SelectTrigger className="mt-2 bg-background border-border/50 focus:border-primary">
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mtn">
                          <div className="flex items-center gap-2">
                            <Smartphone className="h-4 w-4" />
                            MTN Rwanda
                          </div>
                        </SelectItem>
                        <SelectItem value="airtel">
                          <div className="flex items-center gap-2">
                            <Smartphone className="h-4 w-4" />
                            Airtel Rwanda
                          </div>
                        </SelectItem>
                        <SelectItem value="bank_transfer">
                          <div className="flex items-center gap-2">
                            <CreditCard className="h-4 w-4" />
                            Bank Transfer
                          </div>
                        </SelectItem>
                        <SelectItem value="wallet">
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4" />
                            System Wallet
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
=======
                <div>
                  <Label htmlFor="phone" className="text-sm">Phone Number *</Label>
                  <Input
                    id="phone"
                    placeholder="078 XXX XXX or 250 78X XXX XXX"
                    value={phoneNumber}
                    onChange={(e) => {
                      const formatted = formatPhoneNumber(e.target.value)
                      setPhoneNumber(formatted)
                    }}
                    className="mt-1"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    MTN: 078, 079 | Airtel: 072, 073
                  </p>
                </div>

                <div>
                  <Label htmlFor="payment-method" className="text-sm">Payment Method *</Label>
                  <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mtn">
                        <div className="flex items-center gap-2">
                          <Smartphone className="h-4 w-4" />
                          MTN Rwanda
                        </div>
                      </SelectItem>
                      <SelectItem value="airtel">
                        <div className="flex items-center gap-2">
                          <Smartphone className="h-4 w-4" />
                          Airtel Rwanda
                        </div>
                      </SelectItem>
                      <SelectItem value="bank_transfer">
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4" />
                          Bank Transfer
                        </div>
                      </SelectItem>
                      <SelectItem value="wallet">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4" />
                          System Wallet
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
>>>>>>> 279ab84e42fc115201c908eb2c1eef70e88226d3
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-6 shadow-xl border-0 bg-gradient-to-br from-background to-muted/5">
              <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5">
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-6">
                <div className="space-y-3">
                  {selectedMatches.map((match) => {
                    const matchId = match.id.toString()
                    const ticketType = ticketTypes[matchId] || "regular"
                    const quantity = quantities[matchId] || 1
                    const matchTotal = calculateMatchTotal(match)

                    return (
                      <div key={match.id} className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">
                            {match.home_team} vs {match.away_team}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {quantity}x {ticketType.charAt(0).toUpperCase() + ticketType.slice(1)}
                          </p>
                        </div>
                        <div className="text-sm font-semibold text-primary ml-2">
                          {matchTotal.toLocaleString()} RWF
                        </div>
                      </div>
                    )
                  })}

                  <div className="border-t border-border/50 pt-4 space-y-3">
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
                    <div className="border-t border-border/50 pt-3">
                      <div className="flex justify-between font-bold text-xl text-foreground">
                        <span>Total</span>
                        <span className="text-primary">{totals.total.toLocaleString()} RWF</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={handlePurchase} 
                  className="w-full h-12 text-lg bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <CreditCard className="mr-2 h-5 w-5" />
                  Pay Now
                </Button>

                <div className="text-xs text-muted-foreground space-y-2 p-4 bg-muted/20 rounded-lg">
                  <p className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Digital tickets will be sent to your {email ? 'email' : 'phone number'}</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>EBM VAT receipt included for tax purposes</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Tickets are non-refundable</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Present QR code at venue entrance</span>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
