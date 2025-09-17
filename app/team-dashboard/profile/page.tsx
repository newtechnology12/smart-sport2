"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { withAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trophy, Bell, Shield, Save, Upload, Mail, Phone, MapPin, Calendar, Users, Star, Award } from "lucide-react"

function TeamProfile() {
  const [teamData, setTeamData] = useState({
    name: "APR FC",
    sport: "Football",
    league: "Rwanda Premier League",
    founded: "1993",
    location: "Kigali, Rwanda",
    stadium: "Amahoro Stadium",
    capacity: "30000",
    description: "Rwanda's most successful football club with multiple league titles and continental appearances.",
    website: "https://aprfc.rw",
    socialMedia: {
      twitter: "@APRFC",
      facebook: "APR Football Club",
      instagram: "@aprfc_official"
    }
  })

  const [contactData, setContactData] = useState({
    manager: "John Smith",
    managerEmail: "manager@aprfc.rw",
    managerPhone: "+250 788 123 456",
    ticketOffice: "+250 788 654 321",
    email: "info@aprfc.rw"
  })

  const [notificationSettings, setNotificationSettings] = useState({
    ticketSales: true,
    matchUpdates: true,
    fanEngagement: true,
    financialReports: true,
    systemAlerts: true
  })

  const handleSave = () => {
    // Handle save logic
    console.log("Team profile saved")
  }

  return (
    <DashboardLayout>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Team Profile</h1>
            <p className="text-gray-600 mt-1">Manage your team information and settings</p>
          </div>
          <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">Team Info</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          {/* Team Profile */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Team Information
                </CardTitle>
                <CardDescription>Update your team details and information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src="/team-logo.jpg" />
                      <AvatarFallback className="bg-blue-100 text-blue-600 text-2xl font-bold">
                        {teamData.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <Button size="sm" className="absolute -bottom-2 -right-2 rounded-full">
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Team Logo</h3>
                    <p className="text-sm text-gray-500">Upload your team logo (PNG, JPG, SVG)</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="team-name">Team Name</Label>
                    <Input
                      id="team-name"
                      value={teamData.name}
                      onChange={(e) => setTeamData({...teamData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sport">Sport</Label>
                    <Input
                      id="sport"
                      value={teamData.sport}
                      onChange={(e) => setTeamData({...teamData, sport: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="league">League</Label>
                    <Input
                      id="league"
                      value={teamData.league}
                      onChange={(e) => setTeamData({...teamData, league: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="founded">Founded</Label>
                    <Input
                      id="founded"
                      value={teamData.founded}
                      onChange={(e) => setTeamData({...teamData, founded: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={teamData.location}
                      onChange={(e) => setTeamData({...teamData, location: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stadium">Home Stadium</Label>
                    <Input
                      id="stadium"
                      value={teamData.stadium}
                      onChange={(e) => setTeamData({...teamData, stadium: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="capacity">Stadium Capacity</Label>
                    <Input
                      id="capacity"
                      value={teamData.capacity}
                      onChange={(e) => setTeamData({...teamData, capacity: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={teamData.website}
                      onChange={(e) => setTeamData({...teamData, website: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Team Description</Label>
                  <Textarea
                    id="description"
                    value={teamData.description}
                    onChange={(e) => setTeamData({...teamData, description: e.target.value})}
                    rows={4}
                    placeholder="Tell us about your team..."
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Social Media</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="twitter">Twitter</Label>
                      <Input
                        id="twitter"
                        value={teamData.socialMedia.twitter}
                        onChange={(e) => setTeamData({...teamData, socialMedia: {...teamData.socialMedia, twitter: e.target.value}})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="facebook">Facebook</Label>
                      <Input
                        id="facebook"
                        value={teamData.socialMedia.facebook}
                        onChange={(e) => setTeamData({...teamData, socialMedia: {...teamData.socialMedia, facebook: e.target.value}})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="instagram">Instagram</Label>
                      <Input
                        id="instagram"
                        value={teamData.socialMedia.instagram}
                        onChange={(e) => setTeamData({...teamData, socialMedia: {...teamData.socialMedia, instagram: e.target.value}})}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Team Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Matches</p>
                      <p className="text-2xl font-bold text-gray-900">156</p>
                    </div>
                    <Calendar className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Tickets Sold</p>
                      <p className="text-2xl font-bold text-gray-900">45,230</p>
                    </div>
                    <Trophy className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Revenue</p>
                      <p className="text-2xl font-bold text-gray-900">12.5M RWF</p>
                    </div>
                    <Award className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Fan Base</p>
                      <p className="text-2xl font-bold text-gray-900">8,500</p>
                    </div>
                    <Users className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Contact Information */}
          <TabsContent value="contact" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Contact Information
                </CardTitle>
                <CardDescription>Manage team contact details and communication</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="manager">Team Manager</Label>
                    <Input
                      id="manager"
                      value={contactData.manager}
                      onChange={(e) => setContactData({...contactData, manager: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="manager-email">Manager Email</Label>
                    <Input
                      id="manager-email"
                      type="email"
                      value={contactData.managerEmail}
                      onChange={(e) => setContactData({...contactData, managerEmail: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="manager-phone">Manager Phone</Label>
                    <Input
                      id="manager-phone"
                      value={contactData.managerPhone}
                      onChange={(e) => setContactData({...contactData, managerPhone: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ticket-office">Ticket Office</Label>
                    <Input
                      id="ticket-office"
                      value={contactData.ticketOffice}
                      onChange={(e) => setContactData({...contactData, ticketOffice: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="email">General Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={contactData.email}
                      onChange={(e) => setContactData({...contactData, email: e.target.value})}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>Choose how you want to be notified about team activities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Team Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-medium">Ticket Sales Updates</span>
                        <p className="text-xs text-gray-500">Get notified about ticket sales performance</p>
                      </div>
                      <Switch
                        checked={notificationSettings.ticketSales}
                        onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, ticketSales: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-medium">Match Updates</span>
                        <p className="text-xs text-gray-500">Updates about upcoming matches and results</p>
                      </div>
                      <Switch
                        checked={notificationSettings.matchUpdates}
                        onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, matchUpdates: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-medium">Fan Engagement</span>
                        <p className="text-xs text-gray-500">Notifications about fan interactions and feedback</p>
                      </div>
                      <Switch
                        checked={notificationSettings.fanEngagement}
                        onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, fanEngagement: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-medium">Financial Reports</span>
                        <p className="text-xs text-gray-500">Weekly and monthly financial summaries</p>
                      </div>
                      <Switch
                        checked={notificationSettings.financialReports}
                        onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, financialReports: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-medium">System Alerts</span>
                        <p className="text-xs text-gray-500">Important system updates and maintenance alerts</p>
                      </div>
                      <Switch
                        checked={notificationSettings.systemAlerts}
                        onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, systemAlerts: checked})}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

export default withAuth(TeamProfile)
