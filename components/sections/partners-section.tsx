"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowRight, Handshake, X, Building, Mail, Phone, User } from "lucide-react"

const partners = [
  {
    name: "Rwanda Football Federation",
    logo: "/image.jpg",
    website: "https://ferwafa.rw"
  },
  {
    name: "Kigali Arena", 
    logo: "/image.jpg",
    website: "https://kigaliarena.rw"
  },
  {
    name: "Rwanda Olympic Committee",
    logo: "/image.jpg", 
    website: "https://rwandaolympic.org"
  }
]

export function PartnersSection() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    partnershipType: '',
    message: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Partnership form submitted:', formData)
    setIsModalOpen(false)
    // Reset form
    setFormData({
      companyName: '',
      contactName: '',
      email: '',
      phone: '',
      partnershipType: '',
      message: ''
    })
  }
  return (
    <section className="py-12 bg-gray-50">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Content */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-full border border-blue-200">
              <Handshake className="h-3 w-3 text-blue-600" />
              <span className="text-blue-800 text-xs font-medium">Partners</span>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Partner with Rwanda's
              <span className="block text-blue-600">Sports Platform</span>
            </h2>
            
            <p className="text-gray-600 text-sm leading-relaxed">
              Join our ecosystem of trusted partners driving innovation in Rwandan sports and community engagement.
            </p>

            <button 
              onClick={() => setIsModalOpen(true)}
              className="group inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-all duration-300"
            >
              <span>Become a Partner</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>

          {/* Partners Grid */}
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900">Our Partners</h3>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              {partners.map((partner, index) => (
                <a
                  key={index}
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <div className="aspect-square bg-white rounded-xl p-4 hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-blue-200">
                    <div className="w-full h-full relative">
                      <Image
                        src={partner.logo}
                        alt={partner.name}
                        fill
                        className="object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>
                  <p className="text-center text-xs font-medium text-gray-700 mt-2 truncate">
                    {partner.name}
                  </p>
                </a>
              ))}
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-200">
              <div className="text-center">
                <div className="text-lg font-bold text-blue-600">25+</div>
                <div className="text-gray-600 text-xs">Partners</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-blue-600">5+</div>
                <div className="text-gray-600 text-xs">Years</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-blue-600">100K+</div>
                <div className="text-gray-600 text-xs">Reach</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Partnership Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Partnership Application</h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Building className="h-4 w-4 inline mr-2" />
                    Company Name *
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    placeholder="Enter your company name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="h-4 w-4 inline mr-2" />
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="h-4 w-4 inline mr-2" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="h-4 w-4 inline mr-2" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    placeholder="+250 xxx xxx xxx"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Partnership Type *
                  </label>
                  <select
                    name="partnershipType"
                    value={formData.partnershipType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  >
                    <option value="">Select partnership type</option>
                    <option value="sponsor">Sponsorship</option>
                    <option value="venue">Venue Partner</option>
                    <option value="technology">Technology Partner</option>
                    <option value="media">Media Partner</option>
                    <option value="equipment">Equipment Supplier</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm resize-none"
                    placeholder="Tell us about your partnership interests..."
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-sm transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-colors"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}