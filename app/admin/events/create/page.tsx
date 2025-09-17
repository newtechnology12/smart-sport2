"use client"

import React, { useState } from 'react'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { withAuth } from '@/lib/auth-context'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  DollarSign,
  Image as ImageIcon,
  Upload,
  Save,
  ArrowLeft,
  Plus,
  X,
  Settings,
  BarChart3,
  Ticket,
  Eye
} from 'lucide-react'
import Link from 'next/link'

function AdminCreateEvent() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    venue: "",
    sport: "",
    capacity: "",
    price: "",
    category: "",
    status: "draft",
    thumbnail: null as File | null,
    images: [] as File[],
    ticketTypes: [
      { name: "General", price: "", quantity: "" },
      { name: "VIP", price: "", quantity: "" }
    ],
    settings: {
      allowRefunds: true,
      requireApproval: false,
      maxTicketsPerUser: 4,
      earlyBirdDiscount: false,
      groupDiscount: false
    }
  })
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [currentStep, setCurrentStep] = useState(1)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData(prev => ({
        ...prev,
        thumbnail: file
      }))
      
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  const handleTicketTypeChange = (index: number, field: string, value: string) => {
    const newTicketTypes = [...formData.ticketTypes]
    newTicketTypes[index] = {
      ...newTicketTypes[index],
      [field]: value
    }
    setFormData(prev => ({
      ...prev,
      ticketTypes: newTicketTypes
    }))
  }

  const addTicketType = () => {
    setFormData(prev => ({
      ...prev,
      ticketTypes: [...prev.ticketTypes, { name: "", price: "", quantity: "" }]
    }))
  }

  const removeTicketType = (index: number) => {
    const newTicketTypes = formData.ticketTypes.filter((_, i) => i !== index)
    setFormData(prev => ({
      ...prev,
      ticketTypes: newTicketTypes
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Event created:", formData)
    // Handle form submission
  }

  const sports = ["Football", "Basketball", "Volleyball", "Tennis", "Rugby", "Athletics", "Other"]
  const venues = ["Amahoro Stadium", "Kigali Stadium", "BK Arena", "Petit Stade", "Nyamirambo Stadium", "Other"]
  const categories = ["Professional", "Amateur", "Youth", "Women", "Championship", "Friendly", "Tournament"]

  return (
    <DashboardLayout>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/events">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Events
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold apple-title mb-2">Create New Event</h1>
              <p className="text-muted-foreground apple-body">
                Set up a new sporting event with all necessary details
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="apple-button">
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button className="apple-button">
              <Save className="h-4 w-4 mr-2" />
              Save Draft
            </Button>
          </div>
        </div>

        {/* Progress Steps */}
        <Card className="apple-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= step 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step}
                  </div>
                  {step < 4 && (
                    <div className={`w-16 h-1 mx-2 ${
                      currentStep > step ? 'bg-primary' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
              <div className="text-sm text-muted-foreground">
                Step {currentStep} of 4
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs value={currentStep.toString()} onValueChange={(value) => setCurrentStep(parseInt(value))} className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="1">Basic Info</TabsTrigger>
            <TabsTrigger value="2">Tickets & Pricing</TabsTrigger>
            <TabsTrigger value="3">Media & Details</TabsTrigger>
            <TabsTrigger value="4">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="1" className="space-y-4">
            <Card className="apple-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Basic Event Information
                </CardTitle>
                <CardDescription>
                  Enter the essential details for your event
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Event Title *</Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="e.g., Rwanda vs Ghana - World Cup Qualifier"
                      className="apple-focus"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sport">Sport *</Label>
                    <Select value={formData.sport} onValueChange={(value) => handleSelectChange('sport', value)}>
                      <SelectTrigger className="apple-focus">
                        <SelectValue placeholder="Select sport" />
                      </SelectTrigger>
                      <SelectContent>
                        {sports.map(sport => (
                          <SelectItem key={sport} value={sport}>{sport}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">Event Date *</Label>
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="apple-focus"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Event Time *</Label>
                    <Input
                      id="time"
                      name="time"
                      type="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      className="apple-focus"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="venue">Venue *</Label>
                    <Select value={formData.venue} onValueChange={(value) => handleSelectChange('venue', value)}>
                      <SelectTrigger className="apple-focus">
                        <SelectValue placeholder="Select venue" />
                      </SelectTrigger>
                      <SelectContent>
                        {venues.map(venue => (
                          <SelectItem key={venue} value={venue}>{venue}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={formData.category} onValueChange={(value) => handleSelectChange('category', value)}>
                      <SelectTrigger className="apple-focus">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Event Description *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe your event in detail..."
                    className="apple-focus"
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="capacity">Expected Capacity</Label>
                    <Input
                      id="capacity"
                      name="capacity"
                      type="number"
                      value={formData.capacity}
                      onChange={handleInputChange}
                      placeholder="e.g., 10000"
                      className="apple-focus"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={formData.status} onValueChange={(value) => handleSelectChange('status', value)}>
                      <SelectTrigger className="apple-focus">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="2" className="space-y-4">
            <Card className="apple-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Ticket className="h-5 w-5" />
                  Ticket Types & Pricing
                </CardTitle>
                <CardDescription>
                  Set up different ticket types and their pricing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {formData.ticketTypes.map((ticketType, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Ticket Type {index + 1}</h4>
                      {formData.ticketTypes.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeTicketType(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Ticket Name</Label>
                        <Input
                          value={ticketType.name}
                          onChange={(e) => handleTicketTypeChange(index, 'name', e.target.value)}
                          placeholder="e.g., General Admission"
                          className="apple-focus"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Price (RWF)</Label>
                        <Input
                          type="number"
                          value={ticketType.price}
                          onChange={(e) => handleTicketTypeChange(index, 'price', e.target.value)}
                          placeholder="e.g., 5000"
                          className="apple-focus"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Quantity Available</Label>
                        <Input
                          type="number"
                          value={ticketType.quantity}
                          onChange={(e) => handleTicketTypeChange(index, 'quantity', e.target.value)}
                          placeholder="e.g., 100"
                          className="apple-focus"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  onClick={addTicketType}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Another Ticket Type
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="3" className="space-y-4">
            <Card className="apple-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="h-5 w-5" />
                  Media & Additional Details
                </CardTitle>
                <CardDescription>
                  Add images and additional information for your event
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Label>Event Thumbnail</Label>
                  <div className="space-y-4">
                    <div className="flex items-center justify-center w-full">
                      <label htmlFor="thumbnail" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-4 text-gray-500" />
                          <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-gray-500">PNG, JPG or JPEG (MAX. 10MB)</p>
                        </div>
                        <input 
                          id="thumbnail" 
                          type="file" 
                          className="hidden" 
                          accept="image/*"
                          onChange={handleFileChange}
                        />
                      </label>
                    </div>
                    
                    {previewUrl && (
                      <div className="relative">
                        <img
                          src={previewUrl}
                          alt="Thumbnail preview"
                          className="w-full h-48 object-cover rounded-lg border border-gray-200"
                        />
                        <Button
                          type="button"
                          size="sm"
                          variant="destructive"
                          className="absolute top-2 right-2"
                          onClick={() => {
                            setFormData(prev => ({ ...prev, thumbnail: null }))
                            setPreviewUrl(null)
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="4" className="space-y-4">
            <Card className="apple-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Event Settings
                </CardTitle>
                <CardDescription>
                  Configure additional settings for your event
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Allow Refunds</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow customers to request refunds for this event
                      </p>
                    </div>
                    <Switch
                      checked={formData.settings.allowRefunds}
                      onCheckedChange={(checked) => 
                        setFormData(prev => ({
                          ...prev,
                          settings: { ...prev.settings, allowRefunds: checked }
                        }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Require Approval</Label>
                      <p className="text-sm text-muted-foreground">
                        Require admin approval for ticket purchases
                      </p>
                    </div>
                    <Switch
                      checked={formData.settings.requireApproval}
                      onCheckedChange={(checked) => 
                        setFormData(prev => ({
                          ...prev,
                          settings: { ...prev.settings, requireApproval: checked }
                        }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Max Tickets Per User</Label>
                    <Input
                      type="number"
                      value={formData.settings.maxTicketsPerUser}
                      onChange={(e) => 
                        setFormData(prev => ({
                          ...prev,
                          settings: { ...prev.settings, maxTicketsPerUser: parseInt(e.target.value) }
                        }))
                      }
                      className="apple-focus"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Early Bird Discount</Label>
                      <p className="text-sm text-muted-foreground">
                        Offer early bird pricing for this event
                      </p>
                    </div>
                    <Switch
                      checked={formData.settings.earlyBirdDiscount}
                      onCheckedChange={(checked) => 
                        setFormData(prev => ({
                          ...prev,
                          settings: { ...prev.settings, earlyBirdDiscount: checked }
                        }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Group Discount</Label>
                      <p className="text-sm text-muted-foreground">
                        Offer group discounts for bulk purchases
                      </p>
                    </div>
                    <Switch
                      checked={formData.settings.groupDiscount}
                      onCheckedChange={(checked) => 
                        setFormData(prev => ({
                          ...prev,
                          settings: { ...prev.settings, groupDiscount: checked }
                        }))
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <Card className="apple-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
              >
                Previous
              </Button>
              <div className="flex gap-3">
                <Button variant="outline" className="apple-button">
                  Save as Draft
                </Button>
                <Button 
                  className="apple-button"
                  onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
                >
                  {currentStep === 4 ? 'Create Event' : 'Next'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

export default withAuth(AdminCreateEvent, ['admin'])
