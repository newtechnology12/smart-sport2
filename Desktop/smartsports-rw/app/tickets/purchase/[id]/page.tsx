"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { IntouchPaymentModal } from "@/components/payment/IntouchPaymentModal"
import { validateRwandanPhoneNumber, formatPhoneNumber } from "@/lib/utils/phone-validation"

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
  const [paymentMethod, setPaymentMethod] = useState("mobile_money")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [email, setEmail] = useState("")
  const [fullName, setFullName] = useState("")
  const [showPaymentModal, setShowPaymentModal] = useState(false)

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
    // Validate required fields
    if (!fullName.trim()) {
      alert("Please enter your full name")
      return
    }

    if (!phoneNumber.trim()) {
      alert("Please enter your phone number")
      return
    }

    if (!paymentMethod) {
      alert("Please select a payment method")
      return
    }

    // Validate phone number format using the new validation utility
    const validation = validateRwandanPhoneNumber(phoneNumber)
    if (!validation.isValid) {
      alert(validation.message)
      return
    }

    // Handle different payment methods
    if (paymentMethod === 'mobile_money') {
      // Show payment modal for mobile money payment
      setShowPaymentModal(true)
    } else if (paymentMethod === 'bank_transfer') {
      // For bank transfer, show instructions or redirect to bank payment page
      alert("Bank transfer payment will be implemented soon. Please use Mobile Money for now.")
    } else if (paymentMethod === 'credit_card') {
      // For credit card, show card payment form or redirect to card payment page
      alert("Credit card payment will be implemented soon. Please use Mobile Money for now.")
    } else {
      alert("Please select a valid payment method")
    }
  }

  const handlePaymentComplete = (paymentData: any) => {
    console.log('Payment completed:', paymentData)

    // Create payment reference
    const paymentRef = paymentData.transactionId || `SSR${Date.now()}${Math.floor(Math.random() * 1000)}`

    // Redirect to success page with payment reference
    window.location.href = `/tickets/success?ref=${paymentRef}&event=${encodeURIComponent(match.home_team + ' vs ' + match.away_team)}&quantity=${quantity}&total=${finalTotal}&txn=${paymentData.intouchpayTransactionId || ''}`
  }

  const handlePaymentError = (error: string) => {
    console.error('❌ Payment failed:', error)
    // Don't close the modal automatically - let user see the error and retry
    // The modal has a "Try Again" button for retrying the payment
    console.log('Payment failed, modal remains open for retry')
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
          {/* Left Side - Match Details and Ground Image */}
          <div className="lg:col-span-2">
            <Card className="mb-4 overflow-hidden">
              <div className="flex">
                {/* Left Side - Match Image */}
                <div className="w-1/3">
                  <img 
                    src={match.image || "/ground.jpg"} 
                    alt={`${match.home_team} vs ${match.away_team}`}
                    className="w-full h-48 object-cover"
                  />
                </div>
                
                {/* Right Side - Match Details */}
                <div className="w-2/3 p-6 bg-white">
                  <div className="mb-2">
                    <Badge variant="secondary" className="bg-gray-100 text-gray-600 text-xs mb-2">
                      {match.league}
                    </Badge>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      {match.home_team} vs {match.away_team} Tickets
                    </h2>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-gray-500" />
                      <span className="text-gray-700">
                        {new Date(match.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                          year: "numeric"
                        })} {match.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-gray-500" />
                      <span className="text-gray-700">{match.location}</span>
                    </div>
                  </div>
                  
                </div>
              </div>
            </Card>

            {/* Ground Image */}
            <Card className="mb-6 overflow-hidden">
              <img 
                src="/ground.png" 
                alt="Stadium Ground"
                className="w-full h-48 object-cover"
              />
            </Card>
          </div>

          {/* Right Side - Ticket Selection and Customer Info */}
          <div className="lg:col-span-1">
            {/* Ticket Selection */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Select Tickets</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Ticket Selection - Compact */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Ticket Type</Label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        className={`px-3 py-1 text-xs rounded-full border transition-all ${
                          ticketType === "regular"
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-background border-border hover:border-primary/50"
                        }`}
                        onClick={() => setTicketType("regular")}
                      >
                        Regular ({match.price.toLocaleString()} RWF)
                      </button>
                      <button
                        type="button"
                        className={`px-3 py-1 text-xs rounded-full border transition-all ${
                          ticketType === "vip"
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-background border-border hover:border-primary/50"
                        }`}
                        onClick={() => setTicketType("vip")}
                      >
                        VIP ({match.vip_price.toLocaleString()} RWF)
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Quantity</Label>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={quantity <= 1}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="text-sm font-medium w-8 text-center">{quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => setQuantity(Math.min(10, quantity + 1))}
                        disabled={quantity >= 10}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>

                <hr className="border-border" />

                {/* Customer Information - Compact */}
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="fullName" className="text-sm">Full Name *</Label>
                      <Input
                        id="fullName"
                        placeholder="Enter your full name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-sm">Email (Optional)</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>

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
                        <SelectItem value="mobile_money">
                          <div className="flex items-center gap-2">
                            <Smartphone className="h-4 w-4" />
                             (MTN/Airtel)
                          </div>
                        </SelectItem>
                        <SelectItem value="bank_transfer" disabled>
                          <div className="flex items-center gap-2">
                            <CreditCard className="h-4 w-4" />
                            Bank Transfer
                            <span className="text-xs text-muted-foreground">(Coming Soon)</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="credit_card" disabled>
                          <div className="flex items-center gap-2">
                            <CreditCard className="h-4 w-4" />
                            Credit/Debit Card
                            <span className="text-xs text-muted-foreground">(Coming Soon)</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card className="sticky top-6">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-sm">
                    <span>{quantity}x {ticketType.toUpperCase()}</span>
                    <span>{totalPrice.toLocaleString()} RWF</span>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Service Fee (5%)</span>
                    <span>{serviceFee.toLocaleString()} RWF</span>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>VAT (18%)</span>
                    <span>{vatAmount.toLocaleString()} RWF</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>{finalTotal.toLocaleString()} RWF</span>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handlePurchase}
                  className="w-full h-10"
                  disabled={!paymentMethod || !fullName.trim() || !phoneNumber.trim()}
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  {!paymentMethod ? 'Select Payment Method' :
                   !fullName.trim() ? 'Enter Full Name' :
                   !phoneNumber.trim() ? 'Enter Phone Number' :
                   'Pay Now'}
                </Button>

                <div className="text-xs text-muted-foreground space-y-0.5">
                  <p>• Tickets sent to {email ? 'email' : 'phone'}</p>
                  <p>• EBM receipt included</p>
                  <p>• Non-refundable</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* InTouch Payment Modal */}
      <IntouchPaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        amount={finalTotal}
        phoneNumber={phoneNumber}
        description={`${quantity}x ${ticketType.toUpperCase()} ticket${quantity > 1 ? 's' : ''} for ${match.home_team} vs ${match.away_team}`}
        onPaymentComplete={handlePaymentComplete}
        onPaymentError={handlePaymentError}
      />
    </div>
  )
}
