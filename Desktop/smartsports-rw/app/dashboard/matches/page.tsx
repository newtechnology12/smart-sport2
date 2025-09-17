"use client"

import React, { useState } from 'react'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { withAuth } from '@/lib/auth-context'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Calendar,
  MapPin,
  Clock,
  Trophy,
  Search,
  Filter,
  Star,
  Users,
  Ticket,
  ArrowRight
} from 'lucide-react'
import { matches } from '@/lib/dummy-data'
import Link from 'next/link'
import Image from 'next/image'

function MatchesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSport, setSelectedSport] = useState('all')
  const [selectedLocation, setSelectedLocation] = useState('all')
  const [sortBy, setSortBy] = useState('date')

  const filteredMatches = matches.filter(match => {
    const matchesSearch = match.home_team.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         match.away_team.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         match.location.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesSport = selectedSport === 'all' || match.sport === selectedSport
    const matchesLocation = selectedLocation === 'all' || match.location === selectedLocation
    
    return matchesSearch && matchesSport && matchesLocation
  }).sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      default:
        return 0
    }
  })

  const sports = [...new Set(matches.map(match => match.sport))]
  const locations = [...new Set(matches.map(match => match.location))]

  const getSportIcon = (sport: string) => {
    switch (sport.toLowerCase()) {
      case 'football': return '⚽'
      case 'basketball': return '🏀'
      case 'volleyball': return '🏐'
      case 'events': return '🎪'
      default: return '🏆'
    }
  }

  const getSportColor = (sport: string) => {
    switch (sport.toLowerCase()) {
      case 'football': return 'bg-green-100 text-green-800'
      case 'basketball': return 'bg-orange-100 text-orange-800'
      case 'volleyball': return 'bg-blue-100 text-blue-800'
      case 'events': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold apple-title mb-2">Browse Matches</h1>
          <p className="text-muted-foreground apple-body">
            Discover and book tickets for upcoming sports events
          </p>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search matches..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 apple-focus"
                />
              </div>
              
              <Select value={selectedSport} onValueChange={setSelectedSport}>
                <SelectTrigger className="apple-focus">
                  <SelectValue placeholder="All Sports" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sports</SelectItem>
                  {sports.map(sport => (
                    <SelectItem key={sport} value={sport}>
                      {getSportIcon(sport)} {sport}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="apple-focus">
                  <SelectValue placeholder="All Locations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  {locations.map(location => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="apple-focus">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date (Earliest)</SelectItem>
                  <SelectItem value="price-low">Price (Low to High)</SelectItem>
                  <SelectItem value="price-high">Price (High to Low)</SelectItem>
                </SelectContent>
              </Select>

              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('')
                  setSelectedSport('all')
                  setSelectedLocation('all')
                  setSortBy('date')
                }}
                className="apple-button"
              >
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground apple-body">
            Showing {filteredMatches.length} of {matches.length} matches
          </p>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="apple-caption">
              {filteredMatches.filter(m => m.sport === 'Football').length} Football
            </Badge>
            <Badge variant="secondary" className="apple-caption">
              {filteredMatches.filter(m => m.sport === 'Basketball').length} Basketball
            </Badge>
            <Badge variant="secondary" className="apple-caption">
              {filteredMatches.filter(m => m.sport === 'Volleyball').length} Volleyball
            </Badge>
          </div>
        </div>

        {/* Matches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMatches.map((match) => (
            <Card key={match.id} className="apple-card overflow-hidden group">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={match.image}
                  alt={`${match.home_team} vs ${match.away_team}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge className={getSportColor(match.sport)}>
                    {getSportIcon(match.sport)} {match.sport}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-black/50 text-white border-0">
                    {match.status}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold text-lg apple-subtitle mb-1">
                      {match.home_team} vs {match.away_team}
                    </h3>
                    <p className="text-sm text-muted-foreground apple-caption">
                      {match.league}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {match.date}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {match.time}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {match.location}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <div className="text-sm text-muted-foreground">Starting from</div>
                      <div className="text-xl font-bold text-primary">
                        {match.price.toLocaleString()} RWF
                      </div>
                    </div>
                    <Link href={`/dashboard/matches/${match.id}`}>
                      <Button className="apple-button">
                        Buy Tickets
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredMatches.length === 0 && (
          <Card className="apple-card">
            <CardContent className="text-center py-12">
              <Trophy className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold apple-subtitle mb-2">No matches found</h3>
              <p className="text-muted-foreground apple-body mb-4">
                Try adjusting your filters or search terms
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('')
                  setSelectedSport('all')
                  setSelectedLocation('all')
                }}
                className="apple-button"
              >
                Clear All Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}

export default withAuth(MatchesPage, ['client'])
