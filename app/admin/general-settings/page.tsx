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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, Globe, Shield, CreditCard, Mail, Save, Upload, Database, Server } from "lucide-react"

function AdminGeneralSettings() {
  const [systemSettings, setSystemSettings] = useState({
    siteName: "SmartSports RW",
    siteDescription: "Rwanda's premier sports ticketing platform",
    siteUrl: "https://smartsports.rw",
    adminEmail: "admin@smartsports.rw",
    supportEmail: "support@smartsports.rw"
  })

  const [paymentSettings, setPaymentSettings] = useState({
    stripeEnabled: true,
    paypalEnabled: false,
    mobileMoneyEnabled: true,
    bankTransferEnabled: true,
    currency: "RWF",
    taxRate: 18
  })

  const [emailSettings, setEmailSettings] = useState({
    smtpHost: "smtp.gmail.com",
    smtpPort: 587,
    smtpUsername: "noreply@smartsports.rw",
    smtpPassword: "********",
    fromName: "SmartSports RW",
    fromEmail: "noreply@smartsports.rw"
  })

  const handleSave = () => {
    // Handle save logic
    console.log("General settings saved")
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">General Settings</h1>
            <p className="text-gray-600 mt-1">Configure platform-wide settings and preferences</p>
          </div>
          <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>

        <Tabs defaultValue="system" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="system">System</TabsTrigger>
            <TabsTrigger value="payment">Payment</TabsTrigger>
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          </TabsList>

          {/* System Settings */}
          <TabsContent value="system" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  System Configuration
                </CardTitle>
                <CardDescription>Basic platform information and configuration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="site-name">Site Name</Label>
                    <Input
                      id="site-name"
                      value={systemSettings.siteName}
                      onChange={(e) => setSystemSettings({...systemSettings, siteName: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="site-url">Site URL</Label>
                    <Input
                      id="site-url"
                      value={systemSettings.siteUrl}
                      onChange={(e) => setSystemSettings({...systemSettings, siteUrl: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admin-email">Admin Email</Label>
                    <Input
                      id="admin-email"
                      type="email"
                      value={systemSettings.adminEmail}
                      onChange={(e) => setSystemSettings({...systemSettings, adminEmail: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="support-email">Support Email</Label>
                    <Input
                      id="support-email"
                      type="email"
                      value={systemSettings.supportEmail}
                      onChange={(e) => setSystemSettings({...systemSettings, supportEmail: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="site-description">Site Description</Label>
                  <Textarea
                    id="site-description"
                    value={systemSettings.siteDescription}
                    onChange={(e) => setSystemSettings({...systemSettings, siteDescription: e.target.value})}
                    rows={3}
                  />
                </div>

                <div className="flex items-center gap-6">
                  <div className="relative">
                    <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Globe className="h-12 w-12 text-gray-400" />
                    </div>
                    <Button size="sm" className="absolute -bottom-2 -right-2 rounded-full">
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Site Logo</h3>
                    <p className="text-sm text-gray-500">Upload your platform logo (PNG, JPG, SVG)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payment Settings */}
          <TabsContent value="payment" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Configuration
                </CardTitle>
                <CardDescription>Configure payment methods and processing settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Payment Methods</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-medium">Stripe</span>
                        <p className="text-xs text-gray-500">Credit card payments</p>
                      </div>
                      <Switch
                        checked={paymentSettings.stripeEnabled}
                        onCheckedChange={(checked) => setPaymentSettings({...paymentSettings, stripeEnabled: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-medium">Mobile Money</span>
                        <p className="text-xs text-gray-500">MTN, Airtel, Orange Money</p>
                      </div>
                      <Switch
                        checked={paymentSettings.mobileMoneyEnabled}
                        onCheckedChange={(checked) => setPaymentSettings({...paymentSettings, mobileMoneyEnabled: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-medium">Bank Transfer</span>
                        <p className="text-xs text-gray-500">Direct bank transfers</p>
                      </div>
                      <Switch
                        checked={paymentSettings.bankTransferEnabled}
                        onCheckedChange={(checked) => setPaymentSettings({...paymentSettings, bankTransferEnabled: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-medium">PayPal</span>
                        <p className="text-xs text-gray-500">PayPal payments</p>
                      </div>
                      <Switch
                        checked={paymentSettings.paypalEnabled}
                        onCheckedChange={(checked) => setPaymentSettings({...paymentSettings, paypalEnabled: checked})}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="currency">Default Currency</Label>
                    <Select value={paymentSettings.currency}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="RWF">RWF - Rwandan Franc</SelectItem>
                        <SelectItem value="USD">USD - US Dollar</SelectItem>
                        <SelectItem value="EUR">EUR - Euro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tax-rate">Tax Rate (%)</Label>
                    <Input
                      id="tax-rate"
                      type="number"
                      value={paymentSettings.taxRate}
                      onChange={(e) => setPaymentSettings({...paymentSettings, taxRate: Number(e.target.value)})}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Email Settings */}
          <TabsContent value="email" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Email Configuration
                </CardTitle>
                <CardDescription>Configure SMTP settings for email notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="smtp-host">SMTP Host</Label>
                    <Input
                      id="smtp-host"
                      value={emailSettings.smtpHost}
                      onChange={(e) => setEmailSettings({...emailSettings, smtpHost: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtp-port">SMTP Port</Label>
                    <Input
                      id="smtp-port"
                      type="number"
                      value={emailSettings.smtpPort}
                      onChange={(e) => setEmailSettings({...emailSettings, smtpPort: Number(e.target.value)})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtp-username">SMTP Username</Label>
                    <Input
                      id="smtp-username"
                      value={emailSettings.smtpUsername}
                      onChange={(e) => setEmailSettings({...emailSettings, smtpUsername: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtp-password">SMTP Password</Label>
                    <Input
                      id="smtp-password"
                      type="password"
                      value={emailSettings.smtpPassword}
                      onChange={(e) => setEmailSettings({...emailSettings, smtpPassword: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="from-name">From Name</Label>
                    <Input
                      id="from-name"
                      value={emailSettings.fromName}
                      onChange={(e) => setEmailSettings({...emailSettings, fromName: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="from-email">From Email</Label>
                    <Input
                      id="from-email"
                      type="email"
                      value={emailSettings.fromEmail}
                      onChange={(e) => setEmailSettings({...emailSettings, fromEmail: e.target.value})}
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline">Test Email</Button>
                  <Button variant="outline">Send Test Notification</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Configuration
                </CardTitle>
                <CardDescription>Configure platform security settings and policies</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium">Two-Factor Authentication</h3>
                      <p className="text-sm text-gray-500">Require 2FA for all admin accounts</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium">Password Policy</h3>
                      <p className="text-sm text-gray-500">Enforce strong password requirements</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium">Session Timeout</h3>
                      <p className="text-sm text-gray-500">Auto-logout after inactivity</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                    <Input id="session-timeout" type="number" defaultValue="30" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="max-login-attempts">Max Login Attempts</Label>
                    <Input id="max-login-attempts" type="number" defaultValue="5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Maintenance Settings */}
          <TabsContent value="maintenance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Server className="h-5 w-5" />
                  System Maintenance
                </CardTitle>
                <CardDescription>Manage system maintenance and database operations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium">Maintenance Mode</h3>
                      <p className="text-sm text-gray-500">Temporarily disable public access</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium">Auto Backup</h3>
                      <p className="text-sm text-gray-500">Automatically backup database daily</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Database Operations</h3>
                  <div className="flex gap-2">
                    <Button variant="outline">
                      <Database className="h-4 w-4 mr-2" />
                      Backup Database
                    </Button>
                    <Button variant="outline">
                      <Database className="h-4 w-4 mr-2" />
                      Optimize Database
                    </Button>
                    <Button variant="outline">
                      <Database className="h-4 w-4 mr-2" />
                      Clear Cache
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">System Information</h3>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Platform Version:</span>
                      <span className="text-sm font-medium">v2.1.0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Database Version:</span>
                      <span className="text-sm font-medium">MySQL 8.0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Last Backup:</span>
                      <span className="text-sm font-medium">2024-03-15 14:30</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Uptime:</span>
                      <span className="text-sm font-medium">15 days, 8 hours</span>
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

export default withAuth(AdminGeneralSettings)
