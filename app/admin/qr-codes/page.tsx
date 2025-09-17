"use client"

import React, { useState, useEffect } from 'react'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { withAuth } from '@/lib/auth-context'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
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
  AlertCircle,
  Plus,
  Edit,
  Trash2,
  Scan,
  Users,
  BarChart3
} from 'lucide-react'
import { userTickets } from '@/lib/dummy-data'

function AdminQRCodesPage() {
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
        isUsed: Math.random() > 0.7, // Randomly mark some as used for demo
        customer: `Customer ${Math.floor(Math.random() * 1000)}`,
        email: `customer${Math.floor(Math.random() * 1000)}@example.com`
      }))
    )
    setQrCodes(generatedQRCodes)
  }, [])

  const filteredQRCodes = qrCodes.filter(qr => {
    const matchesSearch = qr.match.home_team.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         qr.match.away_team.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         qr.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         qr.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = selectedStatus === 'all' || 
                         (selectedStatus === 'used' && qr.isUsed) ||
                         (selectedStatus === 'unused' && !qr.isUsed)
    
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (isUsed: boolean) => {
    if (isUsed) {
      return <Badge className="bg-green-100 text-green-800">Used</Badge>
    } else {
      return <Badge className="bg-blue-100 text-blue-800">Active</Badge>
    }
  }

  const usedQRCodes = qrCodes.filter(qr => qr.isUsed)
  const activeQRCodes = qrCodes.filter(qr => !qr.isUsed)

  return (
    <DashboardLayout>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold apple-title mb-2">Admin QR Code Management</h1>
            <p className="text-muted-foreground apple-body">
              Manage and monitor all QR codes for ticket validation and entry
            </p>
          </div>
          <div className="flex gap-3">
            <Button className="apple-button">
              <Plus className="h-4 w-4 mr-2" />
              Generate QR Codes
            </Button>
            <Button variant="outline" className="apple-button">
              <Download className="h-4 w-4 mr-2" />
              Export All
            </Button>
            <Button variant="outline" className="apple-button">
              <Scan className="h-4 w-4 mr-2" />
              Scanner Mode
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="apple-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total QR Codes</p>
                  <p className="text-2xl font-bold">{qrCodes.length}</p>
                </div>
                <QrCode className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card className="apple-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active QR Codes</p>
                  <p className="text-2xl font-bold">{activeQRCodes.length}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="apple-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Used QR Codes</p>
                  <p className="text-2xl font-bold">{usedQRCodes.length}</p>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="apple-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Usage Rate</p>
                  <p className="text-2xl font-bold">
                    {Math.round((usedQRCodes.length / qrCodes.length) * 100)}%
                  </p>
                </div>
                <BarChart3 className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="apple-card">
          <CardHeader>
            <CardTitle className="apple-subtitle flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters & Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search QR codes, events, or customers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 apple-focus"
                />
              </div>
              
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="apple-focus">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="unused">Active</SelectItem>
                  <SelectItem value="used">Used</SelectItem>
                </SelectContent>
              </Select>

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
            </div>
          </CardContent>
        </Card>

        {/* QR Codes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQRCodes.map((qr) => (
            <Card key={qr.id} className="apple-card overflow-hidden group">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{qr.ticketNumber}</CardTitle>
                    <CardDescription>{qr.customer}</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(qr.isUsed)}
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="destructive" className="h-8 w-8 p-0">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* QR Code Display */}
                <div className="flex justify-center">
                  <div className="w-32 h-32 bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center">
                    <QrCode className="h-16 w-16 text-gray-400" />
                  </div>
                </div>

                {/* Match Info */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm">
                    {qr.match.home_team} vs {qr.match.away_team}
                  </h3>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3 w-3" />
                      {qr.match.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3" />
                      {qr.match.time}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3 w-3" />
                      {qr.match.venue}
                    </div>
                    <div className="flex items-center gap-2">
                      <Ticket className="h-3 w-3" />
                      Seat: {qr.seatNumber}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Share className="h-4 w-4 mr-2" />
                    Share
                  </Button>
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
                Try adjusting your filters or search terms
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('')
                  setSelectedStatus('all')
                }}
                className="apple-button"
              >
                Clear All Filters
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Bulk Actions */}
        {filteredQRCodes.length > 0 && (
          <Card className="apple-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <p className="text-sm text-muted-foreground">
                    {filteredQRCodes.length} QR codes selected
                  </p>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Bulk Download
                  </Button>
                  <Button size="sm" variant="outline">
                    <Share className="h-4 w-4 mr-2" />
                    Bulk Share
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Analytics
                  </Button>
                  <Button size="sm" className="apple-button">
                    <Plus className="h-4 w-4 mr-2" />
                    Generate More
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}

export default withAuth(AdminQRCodesPage, ['admin'])
