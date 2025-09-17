"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { withAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HelpCircle, Search, MessageCircle, Phone, Mail, BookOpen, Video, FileText, Send, Star, Trophy, Calendar, Users } from "lucide-react"
import { FloatingChat } from "@/components/ui/floating-chat"

function TeamHelp() {
  const [searchTerm, setSearchTerm] = useState("")
  const [ticketSubject, setTicketSubject] = useState("")
  const [ticketMessage, setTicketMessage] = useState("")
  const [isChatOpen, setIsChatOpen] = useState(false)

  // Mock help data
  const faqCategories = [
    {
      name: "Team Management",
      icon: Trophy,
      questions: [
        {
          question: "How do I update my team profile?",
          answer: "Go to Team Profile to update your team information, contact details, and social media links. Changes are saved automatically."
        },
        {
          question: "How do I add team members?",
          answer: "Contact our support team to add new team members. You'll need to provide their contact information and role in the team."
        },
        {
          question: "How do I change my team logo?",
          answer: "In Team Profile, click on your current logo and upload a new image. Supported formats are PNG, JPG, and SVG."
        }
      ]
    },
    {
      name: "Match Management",
      icon: Calendar,
      questions: [
        {
          question: "How do I create a new match?",
          answer: "Go to Matches and click 'Add Match'. Fill in the opponent, date, venue, and ticket pricing information."
        },
        {
          question: "How do I manage ticket sales?",
          answer: "In the Matches section, you can view ticket sales, adjust pricing, and monitor attendance for each match."
        },
        {
          question: "Can I cancel a match?",
          answer: "Yes, you can cancel matches up to 48 hours before the event. Contact support for assistance with cancellations."
        },
        {
          question: "How do I update match details?",
          answer: "Click on any match in your Matches list and select 'Edit' to update venue, time, or other details."
        }
      ]
    },
    {
      name: "Sales & Revenue",
      icon: Users,
      questions: [
        {
          question: "How do I view my sales reports?",
          answer: "Go to Sales to view detailed reports on ticket sales, revenue, and attendance for all your matches."
        },
        {
          question: "How do I set ticket prices?",
          answer: "When creating or editing a match, you can set different price tiers for various seating sections."
        },
        {
          question: "When do I receive payments?",
          answer: "Payments are processed weekly. You'll receive your revenue every Friday via your preferred payment method."
        },
        {
          question: "How do I track fan engagement?",
          answer: "The Analytics section provides insights into fan behavior, ticket sales patterns, and engagement metrics."
        }
      ]
    },
    {
      name: "Technical Support",
      icon: HelpCircle,
      questions: [
        {
          question: "How do I access my team dashboard?",
          answer: "Log in with your team credentials and you'll be taken directly to your team dashboard."
        },
        {
          question: "What if I forget my password?",
          answer: "Click 'Forgot Password' on the login page and follow the instructions sent to your registered email."
        },
        {
          question: "How do I contact support?",
          answer: "Use the contact form in this help center, email support@smartsports.rw, or call +250 788 123 456."
        }
      ]
    }
  ]

  const supportTickets = [
    {
      id: "TICKET-001",
      subject: "Unable to create new match",
      status: "open",
      priority: "high",
      created: "2024-03-15",
      category: "Match Management"
    },
    {
      id: "TICKET-002",
      subject: "Payment not received",
      status: "in-progress",
      priority: "medium",
      created: "2024-03-14",
      category: "Payments"
    },
    {
      id: "TICKET-003",
      subject: "Team logo upload issue",
      status: "resolved",
      priority: "low",
      created: "2024-03-13",
      category: "Technical"
    }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open': return <Badge className="bg-red-100 text-red-800">Open</Badge>
      case 'in-progress': return <Badge className="bg-yellow-100 text-yellow-800">In Progress</Badge>
      case 'resolved': return <Badge className="bg-green-100 text-green-800">Resolved</Badge>
      default: return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high': return <Badge className="bg-red-100 text-red-800">High</Badge>
      case 'medium': return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>
      case 'low': return <Badge className="bg-green-100 text-green-800">Low</Badge>
      default: return <Badge variant="secondary">{priority}</Badge>
    }
  }

  const filteredFaqs = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0)

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Team Help Center</h1>
            <p className="text-gray-600 mt-1">Get support for your team management needs</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Matches</p>
                  <p className="text-2xl font-bold text-gray-900">3</p>
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
                  <p className="text-2xl font-bold text-gray-900">12,450</p>
                </div>
                <Users className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Support Tickets</p>
                  <p className="text-2xl font-bold text-gray-900">2</p>
                </div>
                <MessageCircle className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Team Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">8.5M RWF</p>
                </div>
                <Trophy className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="faq" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="tickets">Support Tickets</TabsTrigger>
            <TabsTrigger value="contact">Contact Support</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          {/* FAQ Section */}
          <TabsContent value="faq" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="relative mb-6">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search FAQ..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <div className="space-y-6">
                  {filteredFaqs.map((category, categoryIndex) => (
                    <div key={categoryIndex} className="space-y-4">
                      <div className="flex items-center gap-2">
                        <category.icon className="h-5 w-5 text-blue-600" />
                        <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                      </div>
                      <div className="space-y-3">
                        {category.questions.map((faq, faqIndex) => (
                          <div key={faqIndex} className="border border-gray-200 rounded-lg p-4">
                            <h4 className="font-medium text-gray-900 mb-2">{faq.question}</h4>
                            <p className="text-sm text-gray-600">{faq.answer}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Support Tickets */}
          <TabsContent value="tickets" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Support Tickets</CardTitle>
                <CardDescription>Track your support requests and get help</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {supportTickets.map((ticket) => (
                    <div key={ticket.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-medium text-gray-900">{ticket.subject}</h4>
                            {getStatusBadge(ticket.status)}
                            {getPriorityBadge(ticket.priority)}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>ID: {ticket.id}</span>
                            <span>Category: {ticket.category}</span>
                            <span>Created: {ticket.created}</span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact Support */}
          <TabsContent value="contact" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Submit a Ticket</CardTitle>
                  <CardDescription>Send us a detailed message about your issue</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Subject</label>
                    <Input
                      placeholder="Brief description of your issue"
                      value={ticketSubject}
                      onChange={(e) => setTicketSubject(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Message</label>
                    <Textarea
                      placeholder="Describe your issue in detail..."
                      value={ticketMessage}
                      onChange={(e) => setTicketMessage(e.target.value)}
                      rows={6}
                    />
                  </div>
                  <Button className="w-full">
                    <Send className="h-4 w-4 mr-2" />
                    Submit Ticket
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>Reach out to us directly</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Email Support</p>
                      <p className="text-sm text-gray-500">teams@smartsports.rw</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium">Phone Support</p>
                      <p className="text-sm text-gray-500">+250 788 123 456</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MessageCircle className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="font-medium">Live Chat</p>
                      <p className="text-sm text-gray-500">Available 24/7</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Resources */}
          <TabsContent value="resources" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Video className="h-5 w-5" />
                    Video Tutorials
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <h4 className="font-medium">Team Dashboard Overview</h4>
                    <p className="text-sm text-gray-500">Learn how to navigate your team dashboard</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Creating Matches</h4>
                    <p className="text-sm text-gray-500">Step-by-step guide to adding new matches</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Managing Ticket Sales</h4>
                    <p className="text-sm text-gray-500">How to monitor and optimize ticket sales</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Team Guides
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <h4 className="font-medium">Team Management Guide</h4>
                    <p className="text-sm text-gray-500">Complete guide to managing your team profile</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Sales & Revenue Guide</h4>
                    <p className="text-sm text-gray-500">Understanding your sales reports and analytics</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Best Practices</h4>
                    <p className="text-sm text-gray-500">Tips for maximizing ticket sales and fan engagement</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Floating AI Chat */}
      <FloatingChat 
        isOpen={isChatOpen} 
        onToggle={() => setIsChatOpen(!isChatOpen)} 
      />
    </DashboardLayout>
  )
}

export default withAuth(TeamHelp)
