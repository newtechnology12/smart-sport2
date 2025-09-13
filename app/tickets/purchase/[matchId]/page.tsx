"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Header } from "@/components/header"
import { ArrowLeft, MapPin, Clock, Calendar, Minus, Plus, CreditCard } from "lucide-react"
import { matches } from "@/lib/dummy-data"
import { notFound } from "next/navigation"

interface PurchasePageProps {
  params: {
    matchId: string
  }
}

export default function PurchasePage({ params }: PurchasePageProps) {
  const match = matches.find((m) => m.id === Number.parseInt(params.matchId))
  const [ticketType, setTicketType] = useState("regular")
  const [quantity, setQuantity] = useState(1)

  if (!match) {
    notFound()
  }

  const ticketPrice = ticketType === "vip" ? match.vip_price : match.price
  const total = ticketPrice * quantity

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container max-w-4xl mx-auto px-4 py-6">
        <Link href={`/sports/${match.sport.toLowerCase()}`}>
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to {match.sport}
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Match Details */}
          <Card>
            <CardHeader>
              <Badge variant="secondary" className="w-fit">
                {match.league}
              </Badge>
              <CardTitle className="text-2xl">Match Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="text-center">
                    <div className="font-bold text-lg">{match.home_team}</div>
                    <div className="text-sm text-muted-foreground">Home</div>
                  </div>
                  <div className="text-3xl font-bold text-primary">VS</div>
                  <div className="text-center">
                    <div className="font-bold text-lg">{match.away_team || "TBA"}</div>
                    <div className="text-sm text-muted-foreground">Away</div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span>{match.date}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <span>{match.time}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>{match.location}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Purchase Form */}
          <Card>
            <CardHeader>
              <CardTitle>Purchase Tickets</CardTitle>
              <CardDescription>Select your ticket type and quantity</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Ticket Type Selection */}
              <div>
                <Label className="text-base font-semibold">Ticket Type</Label>
                <RadioGroup value={ticketType} onValueChange={setTicketType} className="mt-2">
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="regular" id="regular" />
                    <Label htmlFor="regular" className="flex-1 cursor-pointer">
                      <div className="flex justify-between">
                        <span>Regular Ticket</span>
                        <span className="font-bold">{match.price.toLocaleString()} RWF</span>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="vip" id="vip" />
                    <Label htmlFor="vip" className="flex-1 cursor-pointer">
                      <div className="flex justify-between">
                        <span>VIP Ticket</span>
                        <span className="font-bold">{match.vip_price.toLocaleString()} RWF</span>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Quantity Selection */}
              <div>
                <Label className="text-base font-semibold">Quantity</Label>
                <div className="flex items-center gap-3 mt-2">
                  <Button variant="outline" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
                    className="w-20 text-center"
                    min="1"
                    max="10"
                  />
                  <Button variant="outline" size="icon" onClick={() => setQuantity(Math.min(10, quantity + 1))}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Total */}
              <div className="border-t pt-4">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total:</span>
                  <span>{total.toLocaleString()} RWF</span>
                </div>
              </div>

              {/* Purchase Button */}
              <Button className="w-full" size="lg">
                <CreditCard className="mr-2 h-5 w-5" />
                Purchase Tickets
              </Button>

              <p className="text-sm text-muted-foreground text-center">
                Secure payment via Mobile Money (MTN, Airtel) or Bank Card
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
