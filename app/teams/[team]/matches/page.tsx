"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

import { ArrowLeft, Calendar, Clock, MapPin, Users, ShoppingCart } from "lucide-react"
import { matches } from "@/lib/dummy-data"

interface TeamMatchesPageProps {
  params: {
    team: string
  }
}

export default function TeamMatchesPage({ params }: TeamMatchesPageProps) {
  const [selectedMatches, setSelectedMatches] = useState<string[]>([])
  const teamName = decodeURIComponent(params.team)

  // Filter matches for this team (either home or away) and add some additional sample matches
  const teamMatches = [
    ...matches.filter((match) => match.home_team === teamName || match.away_team === teamName),
    // Add more sample matches for demonstration
    {
      id: "match-101",
      home_team: teamName,
      away_team: "Kiyovu Sports",
      date: "2025-01-25",
      time: "15:00",
      location: "Amahoro Stadium",
      sport: "Football",
      league: "Rwanda Premier League",
      price: 3000,
      vip_price: 8000,
      status: "upcoming",
      image: "/football-stadium-crowd.png",
    },
    {
      id: "match-102",
      home_team: "Mukura Victory",
      away_team: teamName,
      date: "2025-02-01",
      time: "16:30",
      location: "Huye Stadium",
      sport: "Football",
      league: "Rwanda Premier League",
      price: 2500,
      vip_price: 7000,
      status: "upcoming",
      image: "/football-stadium-crowd.png",
    },
    {
      id: "match-103",
      home_team: teamName,
      away_team: "Police FC",
      date: "2025-02-08",
      time: "14:00",
      location: "Kigali Stadium",
      sport: "Football",
      league: "Rwanda Premier League",
      price: 3500,
      vip_price: 9000,
      status: "upcoming",
      image: "/football-stadium-crowd.png",
    },
  ]

  const handleMatchSelection = (matchId: string | number) => {
    const matchIdStr = matchId.toString()
    setSelectedMatches((prev) => (prev.includes(matchIdStr) ? prev.filter((id) => id !== matchIdStr) : [...prev, matchIdStr]))
  }

  const getTotalPrice = () => {
    return selectedMatches.reduce((total, matchId) => {
      const match = teamMatches.find((m) => m.id.toString() === matchId)
      return total + (match?.price || 0)
    }, 0)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header Section */}
        <div className="mb-6 sm:mb-8">
          <Link href="/sports">
            <Button variant="ghost" className="mb-4 sm:mb-6 group hover:bg-primary/5 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Back to Sports
            </Button>
          </Link>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center shadow-lg">
              <Users className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
            </div>
            <div className="flex-1">
              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
                {teamName} Matches
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base mt-1">
                Select multiple matches to book tickets
              </p>
            </div>
          </div>
        </div>

        {/* Selection Summary */}
        {selectedMatches.length > 0 && (
          <Card className="mb-6 sm:mb-8 border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10 shadow-lg">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <h3 className="font-semibold text-lg">Selected Matches: {selectedMatches.length}</h3>
                  </div>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {selectedMatches.map((matchId) => {
                      const match = teamMatches.find((m) => m.id.toString() === matchId)
                      if (!match) return null
                      return (
                        <div key={matchId} className="flex items-center justify-between bg-white/50 rounded-lg p-2 sm:p-3">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">
                              {match.home_team} vs {match.away_team}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(match.date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit"
                              })}
                            </p>
                          </div>
                          <div className="text-sm font-semibold text-primary ml-2">
                            {match.price.toLocaleString()} RWF
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  <div className="mt-4 pt-3 border-t border-primary/20">
                    <p className="text-base font-bold text-primary">
                      Total: {getTotalPrice().toLocaleString()} RWF
                    </p>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <Link href={`/tickets/purchase/multiple?matches=${selectedMatches.join(",")}`}>
                    <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Book Selected Tickets
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Matches Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {teamMatches.map((match) => (
            <Card key={match.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-md hover:-translate-y-1 bg-white">
              <div className="h-48 sm:h-52 bg-gradient-to-br from-primary/20 to-secondary/20 relative overflow-hidden">
                <img
                  src={match.image || "/image.jpg"}
                  alt={`${match.home_team} vs ${match.away_team}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                
                {/* Selection Checkbox */}
                <div className="absolute top-3 left-3">
                  <Checkbox
                    checked={selectedMatches.includes(match.id.toString())}
                    onCheckedChange={() => handleMatchSelection(match.id)}
                    className="bg-white/90 border-white/90 data-[state=checked]:bg-primary data-[state=checked]:border-primary shadow-lg"
                  />
                </div>
                
                {/* Status Badge */}
                <div className="absolute top-3 right-3">
                  <Badge 
                    variant="outline" 
                    className={`bg-white/95 text-black border-white/95 font-medium ${
                      match.status === 'upcoming' ? 'text-green-700' : 
                      match.status === 'live' ? 'text-red-600' : 'text-gray-600'
                    }`}
                  >
                    {match.status}
                  </Badge>
                </div>
                
                {/* League Badge */}
                <div className="absolute bottom-3 left-3">
                  <Badge variant="secondary" className="bg-white/95 text-black font-medium shadow-md">
                    {match.league}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-4 sm:p-5">
                {/* Match Teams */}
                <div className="text-center mb-4">
                  <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3">
                    <div className="text-center flex-1 min-w-0">
                      <div className={`font-bold text-sm sm:text-base truncate ${match.home_team === teamName ? "text-primary" : "text-foreground"}`}>
                        {match.home_team}
                      </div>
                      <div className="text-xs text-muted-foreground">Home</div>
                    </div>
                    <div className="text-lg sm:text-xl font-bold text-primary px-2">VS</div>
                    <div className="text-center flex-1 min-w-0">
                      <div className={`font-bold text-sm sm:text-base truncate ${match.away_team === teamName ? "text-primary" : "text-foreground"}`}>
                        {match.away_team || "TBA"}
                      </div>
                      <div className="text-xs text-muted-foreground">Away</div>
                    </div>
                  </div>
                </div>

                {/* Match Details */}
                <div className="space-y-2 text-xs sm:text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                    <span className="truncate">
                      {new Date(match.date).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                    <span>{match.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                    <span className="truncate">{match.location}</span>
                  </div>
                </div>

                {/* Pricing */}
                <div className="flex items-center justify-between mb-4 p-3 bg-muted/30 rounded-lg">
                  <div className="text-center flex-1">
                    <div className="text-xs text-muted-foreground mb-1">Regular</div>
                    <div className="font-bold text-sm sm:text-base text-foreground">
                      {match.price.toLocaleString()} RWF
                    </div>
                  </div>
                  <div className="w-px h-8 bg-border mx-2"></div>
                  <div className="text-center flex-1">
                    <div className="text-xs text-muted-foreground mb-1">VIP</div>
                    <div className="font-bold text-sm sm:text-base text-primary">
                      {match.vip_price.toLocaleString()} RWF
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className={`flex-1 transition-all duration-200 ${
                      selectedMatches.includes(match.id.toString()) 
                        ? "bg-red-50 border-red-200 text-red-700 hover:bg-red-100" 
                        : "bg-transparent hover:bg-primary/5"
                    }`}
                    onClick={() => handleMatchSelection(match.id)}
                  >
                    {selectedMatches.includes(match.id.toString()) ? "Remove" : "Select"}
                  </Button>
                  <Link href={`/tickets/purchase/${match.id}`} className="flex-1">
                    <Button 
                      size="sm" 
                      className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-md hover:shadow-lg transition-all duration-200"
                    >
                      Buy Now
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {teamMatches.length === 0 && (
          <Card className="border-dashed border-2 border-muted-foreground/25">
            <CardContent className="text-center py-12 sm:py-16">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-muted/30 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Calendar className="h-8 w-8 sm:h-10 sm:w-10 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-lg sm:text-xl mb-2">No Matches Found</h3>
              <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto">
                No upcoming matches for {teamName}. Check back later for new fixtures!
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
