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
import { HelpCircle, Search, MessageCircle, Phone, Mail, BookOpen, Video, FileText, Send, Star, Ticket, Calendar, Wallet } from "lucide-react"
import { FloatingChat } from "@/components/ui/floating-chat"

function ClientHelp() {
  const [searchTerm, setSearchTerm] = useState("")
  const [ticketSubject, setTicketSubject] = useState("")
  const [ticketMessage, setTicketMessage] = useState("")
  const [activeTab, setActiveTab] = useState("faq")
  const [isChatOpen, setIsChatOpen] = useState(false)


  // Mock help data
  const faqCategories = [
    {
      name: "Getting Started",
      icon: BookOpen,
      questions: [
        {
          question: "How do I create an account?",
          answer: "Click on 'Sign Up' in the top right corner, fill in your details, and verify your email address to complete registration."
        },
        {
          question: "How do I browse events?",
          answer: "Go to 'Browse Matches' to see all available events. You can filter by sport, date, or venue to find events you're interested in."
        },
        {
          question: "How do I purchase tickets?",
          answer: "Select an event, choose your seats, and proceed to checkout. You can pay using mobile money, credit card, or bank transfer."
        }
      ]
    },
    {
      name: "Tickets & Events",
      icon: Ticket,
      questions: [
        {
          question: "How do I view my tickets?",
          answer: "Go to 'My Tickets' to see all your purchased tickets. You can view QR codes and event details here."
        },
        {
          question: "Can I cancel my tickets?",
          answer: "Yes, you can cancel tickets up to 24 hours before the event. A small cancellation fee may apply."
        },
        {
          question: "How do I use my QR code?",
          answer: "Present your QR code at the venue entrance. It will be scanned for entry to the event."
        },
        {
          question: "What if I lose my ticket?",
          answer: "Don't worry! Your tickets are stored in your account. You can re-download them from 'My Tickets' anytime."
        }
      ]
    },
    {
      name: "Payments & Wallet",
      icon: Wallet,
      questions: [
        {
          question: "What payment methods do you accept?",
          answer: "We accept mobile money (MTN, Airtel, Orange), credit cards, and bank transfers."
        },
        {
          question: "How do I add money to my wallet?",
          answer: "Go to 'Wallet' and click 'Add Funds'. Choose your preferred payment method and enter the amount."
        },
        {
          question: "How do I get a refund?",
          answer: "Refunds are processed automatically for cancelled events. For other cases, contact our support team."
        },
        {
          question: "Is my payment information secure?",
          answer: "Yes, we use industry-standard encryption to protect all payment information."
        }
      ]
    },
    {
      name: "Account & Profile",
      icon: HelpCircle,
      questions: [
        {
          question: "How do I update my profile?",
          answer: "Go to 'Profile' to update your personal information, contact details, and preferences."
        },
        {
          question: "How do I change my password?",
          answer: "In your profile settings, go to 'Security' and click 'Change Password' to update your password."
        },
        {
          question: "How do I delete my account?",
          answer: "Contact our support team to request account deletion. We'll process your request within 48 hours."
        }
      ]
    }
  ]

  const supportTickets = [
    {
      id: "TICKET-001",
      subject: "Unable to purchase tickets",
      status: "open",
      priority: "high",
      created: "2024-03-15",
      category: "Payment"
    },
    {
      id: "TICKET-002",
      subject: "QR code not working",
      status: "in-progress",
      priority: "medium",
      created: "2024-03-14",
      category: "Tickets"
    },
    {
      id: "TICKET-003",
      subject: "Event cancellation refund",
      status: "resolved",
      priority: "low",
      created: "2024-03-13",
      category: "Refunds"
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
            <h1 className="text-3xl font-bold text-gray-900">Help Center</h1>
            <p className="text-gray-600 mt-1">Find answers and get support for your account</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">My Tickets</p>
                  <p className="text-2xl font-bold text-gray-900">12</p>
                </div>
                <Ticket className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Events Attended</p>
                  <p className="text-2xl font-bold text-gray-900">8</p>
                </div>
                <Calendar className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Support Tickets</p>
                  <p className="text-2xl font-bold text-gray-900">3</p>
                </div>
                <MessageCircle className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Wallet Balance</p>
                  <p className="text-2xl font-bold text-gray-900">25,000 RWF</p>
                </div>
                <Wallet className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="tickets">My Tickets</TabsTrigger>
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


          {/* My Tickets */}
          <TabsContent value="tickets" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>My Support Tickets</CardTitle>
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
                      <p className="text-sm text-gray-500">support@smartsports.rw</p>
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
                    <h4 className="font-medium">How to Buy Tickets</h4>
                    <p className="text-sm text-gray-500">Step-by-step guide to purchasing tickets</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Using Your QR Code</h4>
                    <p className="text-sm text-gray-500">How to access and use your digital tickets</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Managing Your Wallet</h4>
                    <p className="text-sm text-gray-500">Adding funds and managing payments</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    User Guides
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <h4 className="font-medium">Getting Started Guide</h4>
                    <p className="text-sm text-gray-500">Complete beginner's guide to the platform</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Account Management</h4>
                    <p className="text-sm text-gray-500">Managing your profile and settings</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Troubleshooting</h4>
                    <p className="text-sm text-gray-500">Common issues and solutions</p>
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

export default withAuth(ClientHelp)
