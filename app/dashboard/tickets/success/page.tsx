"use client"

import React, { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { withAuth } from '@/lib/auth-context'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  CheckCircle,
  Download,
  Share,
  Calendar,
  MapPin,
  Clock,
  QrCode,
  Ticket,
  ArrowRight,
  Mail,
  Smartphone
} from 'lucide-react'
import Link from 'next/link'

function TicketSuccessPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const purchaseId = searchParams.get('purchase')
  const [purchaseData, setPurchaseData] = useState<any>(null)

  useEffect(() => {
    if (purchaseId) {
      // In a real app, fetch purchase data from API
      // For demo, we'll simulate the data
      const mockPurchaseData = {
        id: purchaseId,
        match: {
          home_team: "APR FC",
          away_team: "Rayon Sports",
          date: "2025-01-20",
          time: "15:00",
          location: "Kigali Stadium",
          sport: "Football"
        },
        ticketType: "regular",
        quantity: 2,
        totalPrice: 6000,
        paymentMethod: "mtn",
        qrCodes: [
          {
            id: "QR123456789",
            ticketNumber: "TKT001",
            seatNumber: "A12"
          },
          {
            id: "QR987654321",
            ticketNumber: "TKT002",
            seatNumber: "A13"
          }
        ],
        purchaseDate: new Date().toISOString(),
        status: "confirmed"
      }
      setPurchaseData(mockPurchaseData)
    }
  }, [purchaseId])

  const downloadQRCode = (qrCode: any) => {
    // In a real app, this would generate and download the actual QR code PNG
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    canvas.width = 300
    canvas.height = 300
    
    if (ctx) {
      // Simple QR code simulation
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, 300, 300)
      ctx.fillStyle = '#000000'
      
      // Create a simple pattern to simulate QR code
      for (let i = 0; i < 30; i++) {
        for (let j = 0; j < 30; j++) {
          if (Math.random() > 0.5) {
            ctx.fillRect(i * 10, j * 10, 10, 10)
          }
        }
      }
      
      // Add text
      ctx.fillStyle = '#000000'
      ctx.font = '12px Arial'
      ctx.fillText(qrCode.ticketNumber, 10, 290)
      ctx.fillText(qrCode.seatNumber, 200, 290)
    }
    
    // Download the canvas as PNG
    const link = document.createElement('a')
    link.download = `ticket-${qrCode.ticketNumber}.png`
    link.href = canvas.toDataURL()
    link.click()
  }

  const downloadAllQRCodes = () => {
    if (purchaseData?.qrCodes) {
      purchaseData.qrCodes.forEach((qrCode: any, index: number) => {
        setTimeout(() => downloadQRCode(qrCode), index * 500)
      })
    }
  }

  if (!purchaseData) {
    return (
      <DashboardLayout>
        <div className="p-6">
          <Card>
            <CardContent className="text-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
              <p>Loading your purchase details...</p>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-8">
        {/* Success Header */}
        <Card className="apple-card bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardContent className="text-center py-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold apple-title text-green-800 mb-2">
              Payment Successful! 🎉
            </h1>
            <p className="text-green-700 apple-body text-lg mb-6">
              Your tickets have been purchased and QR codes are ready for download
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button onClick={downloadAllQRCodes} className="apple-button">
                <Download className="mr-2 h-4 w-4" />
                Download All QR Codes
              </Button>
              <Link href="/dashboard/tickets">
                <Button variant="outline" className="apple-button">
                  <Ticket className="mr-2 h-4 w-4" />
                  View My Tickets
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Purchase Details */}
          <Card className="apple-card">
            <CardHeader>
              <CardTitle className="apple-subtitle">Purchase Details</CardTitle>
              <CardDescription>Your order confirmation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-lg apple-subtitle mb-2">
                    {purchaseData.match.home_team} vs {purchaseData.match.away_team}
                  </h3>
                  <Badge className="mb-3">
                    {purchaseData.match.sport}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{purchaseData.match.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{purchaseData.match.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{purchaseData.match.location}</span>
                  </div>
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Ticket Type</span>
                    <span className="text-sm font-medium capitalize">{purchaseData.ticketType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Quantity</span>
                    <span className="text-sm font-medium">{purchaseData.quantity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Payment Method</span>
                    <span className="text-sm font-medium capitalize">{purchaseData.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>Total Paid</span>
                    <span className="text-primary">{purchaseData.totalPrice.toLocaleString()} RWF</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* QR Codes */}
          <Card className="apple-card">
            <CardHeader>
              <CardTitle className="apple-subtitle">Your QR Codes</CardTitle>
              <CardDescription>Download and save these for entry</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {purchaseData.qrCodes.map((qrCode: any, index: number) => (
                <div key={qrCode.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <QrCode className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold">{qrCode.ticketNumber}</div>
                        <div className="text-sm text-muted-foreground">
                          Seat: {qrCode.seatNumber}
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => downloadQRCode(qrCode)}
                      className="apple-button"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Next Steps */}
        <Card className="apple-card">
          <CardHeader>
            <CardTitle className="apple-subtitle">What's Next?</CardTitle>
            <CardDescription>Important information about your tickets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Download className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Download QR Codes</h3>
                <p className="text-sm text-muted-foreground">
                  Save the QR codes to your phone for easy access at the venue
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Smartphone className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">Arrive Early</h3>
                <p className="text-sm text-muted-foreground">
                  Come 30 minutes before the match starts for smooth entry
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Mail className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Check Email</h3>
                <p className="text-sm text-muted-foreground">
                  Confirmation email with tickets has been sent to your inbox
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/dashboard/matches">
            <Button variant="outline" className="apple-button">
              Browse More Matches
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button className="apple-button">
              Back to Dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default withAuth(TicketSuccessPage, ['client'])
