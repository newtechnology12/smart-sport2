"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

import { ArrowLeft, Calendar, Clock, MapPin, CreditCard, Smartphone, DollarSign, Minus, Plus } from "lucide-react"
import { matches } from "@/lib/dummy-data"

interface TicketPurchasePageProps {
  params: {
    id: string
  }
}

export default function TicketPurchasePage({ params }: TicketPurchasePageProps) {
  const [ticketType, setTicketType] = useState("regular")
  const [quantity, setQuantity] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [email, setEmail] = useState("")
  const [fullName, setFullName] = useState("")

  const match = matches.find((m) => m.id.toString() === params.id || m.id === parseInt(params.id))

  if (!match) {
    return (
      <div className="min-h-screen bg-background">

        <div className="container max-w-4xl mx-auto px-4 py-6">
          <Card>
            <CardContent className="text-center py-12">
              <h2 className="text-2xl font-bold mb-2">Match Not Found</h2>
              <p className="text-muted-foreground mb-4">The match you're looking for doesn't exist.</p>
              <Link href="/sports">
                <Button>Back to Sports</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const ticketPrice = ticketType === "vip" ? match.vip_price : match.price
  const totalPrice = ticketPrice * quantity
  const serviceFee = Math.round(totalPrice * 0.05) // 5% service fee
  const vatAmount = Math.round((totalPrice + serviceFee) * 0.18) // 18% VAT (EBM)
  const finalTotal = totalPrice + serviceFee + vatAmount

  const handlePurchase = async () => {
    if (!paymentMethod || !phoneNumber || !fullName) {
      alert("Please fill in all required fields (Name, Phone Number, and Payment Method)")
      return
    }

    try {
      const purchaseData = {
        event_id: match.id,
        ticket_type: ticketType,
        quantity: quantity,
        payment_method: paymentMethod,
        customer_name: fullName,
        customer_phone: phoneNumber,
        customer_email: email || undefined
      }

      // In a real implementation, this would be an API call
      // const response = await fetch('/api/v1/tickets/purchase', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(purchaseData)
      // })
      // const result = await response.json()

      // For now, simulate success and redirect to success page
      const paymentRef = `SSR${Date.now()}${Math.floor(Math.random() * 1000)}`

      // Redirect to success page with payment reference
      window.location.href = `/tickets/success?ref=${paymentRef}&event=${encodeURIComponent(match.home_team + ' vs ' + match.away_team)}&quantity=${quantity}&total=${finalTotal}`

    } catch (error) {
      console.error('Purchase failed:', error)
      alert('Purchase failed. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-background">

      <div className="container max-w-6xl mx-auto px-4 py-6">
        <div className="mb-8">
          <Link href="/sports">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Sports
            </Button>
          </Link>

          <h1 className="font-serif text-3xl font-bold mb-2">Purchase Tickets</h1>
          <p className="text-muted-foreground">Complete your ticket purchase for the match</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Match Details */}
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 relative">
                <img
                  src={match.image || "/football-stadium-crowd.png"}
                  alt={`${match.home_team} vs ${match.away_team}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <Badge variant="secondary" className="bg-white/90 text-black mb-2">
                    {match.league}
                  </Badge>
                  <h2 className="text-2xl font-bold">
                    {match.home_team} vs {match.away_team}
                  </h2>
                </div>
              </div>

              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="font-semibold">
                        {new Date(match.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                      <div className="text-muted-foreground">{match.date}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="font-semibold">{match.time}</div>
                      <div className="text-muted-foreground">Kick-off</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="font-semibold">{match.location}</div>
                      <div className="text-muted-foreground">Venue</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ticket Selection */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Select Tickets</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Ticket Type */}
                <div>
                  <Label className="text-base font-semibold mb-4 block">Ticket Type</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card
                      className={`cursor-pointer transition-all ${ticketType === "regular" ? "ring-2 ring-primary" : ""}`}
                      onClick={() => setTicketType("regular")}
                    >
                      <CardContent className="pt-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-semibold">Regular</h3>
                            <p className="text-sm text-muted-foreground">Standard seating</p>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-lg">{match.price.toLocaleString()}</div>
                            <div className="text-sm text-muted-foreground">RWF</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card
                      className={`cursor-pointer transition-all ${ticketType === "vip" ? "ring-2 ring-primary" : ""}`}
                      onClick={() => setTicketType("vip")}
                    >
                      <CardContent className="pt-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-semibold">VIP</h3>
                            <p className="text-sm text-muted-foreground">Premium seating</p>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-lg">{match.vip_price.toLocaleString()}</div>
                            <div className="text-sm text-muted-foreground">RWF</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <Label className="text-base font-semibold mb-4 block">Quantity</Label>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(Math.min(10, quantity + 1))}
                      disabled={quantity >= 10}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <span className="text-sm text-muted-foreground">Max 10 tickets</span>
                  </div>
                </div>
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
                    <Label htmlFor="email">Email Address (Optional)</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com (optional)"
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
                  <div className="flex justify-between">
                    <span>
                      {quantity}x {ticketType.toUpperCase()} Ticket{quantity > 1 ? "s" : ""}
                    </span>
                    <span>{totalPrice.toLocaleString()} RWF</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Service Fee (5%)</span>
                    <span>{serviceFee.toLocaleString()} RWF</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>VAT (18% - EBM)</span>
                    <span>{vatAmount.toLocaleString()} RWF</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>{finalTotal.toLocaleString()} RWF</span>
                    </div>
                  </div>
                </div>

                <Button onClick={handlePurchase} className="w-full h-12 text-lg">
                  <CreditCard className="mr-2 h-5 w-5" />
                  Complete Purchase
                </Button>

                <div className="text-xs text-muted-foreground space-y-1">
                  <p>• Digital tickets will be sent to your {email ? 'email' : 'phone number'}</p>
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
