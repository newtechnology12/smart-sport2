"use client"

import React, { useState, useEffect } from 'react'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { withAuth } from '@/lib/auth-context'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  QrCode,
  Download,
  Search,
  Calendar,
  MapPin,
  Clock,
  Ticket,
  Share,
  Eye,
  Filter,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import { userTickets } from '@/lib/dummy-data'

function QRCodesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [qrCodes, setQrCodes] = useState<any[]>([])

  useEffect(() => {
    // Generate QR codes for existing tickets
    const generatedQRCodes = userTickets.flatMap(ticket => 
      ticket.seat_numbers.map((seat, index) => ({
        id: `QR${ticket.id}${index}`,
        ticketId: ticket.id,
        ticketNumber: `${ticket.id}-${index + 1}`,
        seatNumber: seat,
        match: ticket.match,
        status: ticket.status,
        qrData: `TICKET:${ticket.id}:${seat}:${ticket.match.id}`,
        purchaseDate: ticket.purchase_date,
        isUsed: Math.random() > 0.7 // Randomly mark some as used for demo
      }))
    )
    setQrCodes(generatedQRCodes)
  }, [])

  const filteredQRCodes = qrCodes.filter(qr => {
    const matchesSearch = qr.match.home_team.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         qr.match.away_team.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         qr.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         qr.seatNumber.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = selectedStatus === 'all' || 
                         (selectedStatus === 'active' && !qr.isUsed) ||
                         (selectedStatus === 'used' && qr.isUsed)
    
    return matchesSearch && matchesStatus
  })

  const generateQRCodeImage = (qrCode: any) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    canvas.width = 400
    canvas.height = 500
    
    if (ctx) {
      // Background
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, 400, 500)
      
      // Header
      ctx.fillStyle = '#ff6b35'
      ctx.fillRect(0, 0, 400, 80)
      
      // Title
      ctx.fillStyle = '#ffffff'
      ctx.font = 'bold 20px Arial'
      ctx.textAlign = 'center'
      ctx.fillText('SmartSports RW', 200, 30)
      ctx.font = '14px Arial'
      ctx.fillText('Digital Ticket', 200, 55)
      
      // QR Code area (simplified pattern)
      ctx.fillStyle = '#000000'
      const qrSize = 200
      const qrX = (400 - qrSize) / 2
      const qrY = 100
      
      // Create QR pattern
      for (let i = 0; i < 20; i++) {
        for (let j = 0; j < 20; j++) {
          if (Math.random() > 0.5) {
            ctx.fillRect(qrX + i * 10, qrY + j * 10, 10, 10)
          }
        }
      }
      
      // Ticket details
      ctx.fillStyle = '#000000'
      ctx.font = 'bold 16px Arial'
      ctx.textAlign = 'left'
      ctx.fillText(`${qrCode.match.home_team} vs ${qrCode.match.away_team}`, 20, 340)
      
      ctx.font = '14px Arial'
      ctx.fillText(`Date: ${qrCode.match.date} ${qrCode.match.time}`, 20, 365)
      ctx.fillText(`Location: ${qrCode.match.location}`, 20, 385)
      ctx.fillText(`Seat: ${qrCode.seatNumber}`, 20, 405)
      ctx.fillText(`Ticket: ${qrCode.ticketNumber}`, 20, 425)
      
      // Footer
      ctx.font = '12px Arial'
      ctx.textAlign = 'center'
      ctx.fillStyle = '#666666'
      ctx.fillText('Present this QR code at the venue entrance', 200, 460)
      ctx.fillText('Valid for single use only', 200, 480)
    }
    
    return canvas
  }

  const downloadQRCode = (qrCode: any) => {
    const canvas = generateQRCodeImage(qrCode)
    const link = document.createElement('a')
    link.download = `ticket-${qrCode.ticketNumber}.png`
    link.href = canvas.toDataURL()
    link.click()
  }

  const shareQRCode = async (qrCode: any) => {
    if (navigator.share) {
      try {
        const canvas = generateQRCodeImage(qrCode)
        canvas.toBlob(async (blob) => {
          if (blob) {
            const file = new File([blob], `ticket-${qrCode.ticketNumber}.png`, { type: 'image/png' })
            await navigator.share({
              title: `Ticket: ${qrCode.match.home_team} vs ${qrCode.match.away_team}`,
              text: `My ticket for ${qrCode.match.home_team} vs ${qrCode.match.away_team}`,
              files: [file]
            })
          }
        })
      } catch (error) {
        console.error('Error sharing:', error)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(qrCode.qrData)
      alert('QR code data copied to clipboard!')
    }
  }

  const previewQRCode = (qrCode: any) => {
    const canvas = generateQRCodeImage(qrCode)
    const newWindow = window.open('', '_blank')
    if (newWindow) {
      newWindow.document.write(`
        <html>
          <head><title>Ticket Preview - ${qrCode.ticketNumber}</title></head>
          <body style="margin: 0; padding: 20px; display: flex; justify-content: center; align-items: center; min-height: 100vh; background: #f5f5f5;">
            <div style="text-align: center;">
              <h2>Ticket Preview</h2>
              ${canvas.outerHTML}
              <p style="margin-top: 20px; color: #666;">
                <button onclick="window.print()" style="padding: 10px 20px; background: #ff6b35; color: white; border: none; border-radius: 5px; cursor: pointer;">Print Ticket</button>
              </p>
            </div>
          </body>
        </html>
      `)
    }
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold apple-title mb-2">My QR Codes</h1>
          <p className="text-muted-foreground apple-body">
            Download, share, and manage your ticket QR codes
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="apple-card">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <QrCode className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{qrCodes.length}</div>
                  <div className="text-sm text-muted-foreground">Total QR Codes</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="apple-card">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{qrCodes.filter(qr => !qr.isUsed).length}</div>
                  <div className="text-sm text-muted-foreground">Active Codes</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="apple-card">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{qrCodes.filter(qr => qr.isUsed).length}</div>
                  <div className="text-sm text-muted-foreground">Used Codes</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="apple-card">
          <CardHeader>
            <CardTitle className="apple-subtitle flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Search & Filter
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by match, ticket number, or seat..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 apple-focus"
                />
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant={selectedStatus === 'all' ? 'default' : 'outline'}
                  onClick={() => setSelectedStatus('all')}
                  className="apple-button"
                >
                  All
                </Button>
                <Button
                  variant={selectedStatus === 'active' ? 'default' : 'outline'}
                  onClick={() => setSelectedStatus('active')}
                  className="apple-button"
                >
                  Active
                </Button>
                <Button
                  variant={selectedStatus === 'used' ? 'default' : 'outline'}
                  onClick={() => setSelectedStatus('used')}
                  className="apple-button"
                >
                  Used
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* QR Codes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQRCodes.map((qrCode) => (
            <Card key={qrCode.id} className="apple-card">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* QR Code Visual */}
                  <div className="relative">
                    <div className="w-full h-32 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center">
                      <QrCode className="h-16 w-16 text-primary" />
                    </div>
                    <div className="absolute top-2 right-2">
                      <Badge variant={qrCode.isUsed ? 'secondary' : 'default'}>
                        {qrCode.isUsed ? 'Used' : 'Active'}
                      </Badge>
                    </div>
                  </div>

                  {/* Match Info */}
                  <div>
                    <h3 className="font-bold apple-subtitle mb-1">
                      {qrCode.match.home_team} vs {qrCode.match.away_team}
                    </h3>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3 w-3" />
                        {qrCode.match.date} {qrCode.match.time}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3 w-3" />
                        {qrCode.match.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <Ticket className="h-3 w-3" />
                        Seat {qrCode.seatNumber} • {qrCode.ticketNumber}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => previewQRCode(qrCode)}
                      className="flex-1 apple-button"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => downloadQRCode(qrCode)}
                      className="flex-1 apple-button"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => shareQRCode(qrCode)}
                      className="flex-1 apple-button"
                    >
                      <Share className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredQRCodes.length === 0 && (
          <Card className="apple-card">
            <CardContent className="text-center py-12">
              <QrCode className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold apple-subtitle mb-2">No QR codes found</h3>
              <p className="text-muted-foreground apple-body mb-4">
                {searchTerm || selectedStatus !== 'all' 
                  ? 'Try adjusting your search or filters'
                  : 'Purchase some tickets to see your QR codes here'
                }
              </p>
              {searchTerm || selectedStatus !== 'all' ? (
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedStatus('all')
                  }}
                  className="apple-button"
                >
                  Clear Filters
                </Button>
              ) : null}
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}

export default withAuth(QRCodesPage, ['client'])
