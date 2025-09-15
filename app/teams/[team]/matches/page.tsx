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
    <div className="min-h-screen bg-background">

      <div className="container max-w-6xl mx-auto px-4 py-6">
        <div className="mb-8">
          <Link href="/sports">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Sports
            </Button>
          </Link>

          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="font-serif text-3xl font-bold">{teamName} Matches</h1>
              <p className="text-muted-foreground">Select multiple matches to book tickets</p>
            </div>
          </div>
        </div>

        {/* Selection Summary */}
        {selectedMatches.length > 0 && (
          <Card className="mb-6 border-primary/20 bg-primary/5">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Selected Matches: {selectedMatches.length}</h3>
                  <p className="text-sm text-muted-foreground">Total: {getTotalPrice().toLocaleString()} RWF</p>
                </div>
                <Link href={`/tickets/purchase/multiple?matches=${selectedMatches.join(",")}`}>
                  <Button>
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Book Selected Tickets
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Matches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMatches.map((match) => (
            <Card key={match.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="h-40 bg-gradient-to-br from-primary/20 to-secondary/20 relative">
                <img
                  src={match.image || "/football-stadium-crowd.png"}
                  alt={`${match.home_team} vs ${match.away_team}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="absolute top-2 left-2">
                  <Checkbox
                    checked={selectedMatches.includes(match.id.toString())}
                    onCheckedChange={() => handleMatchSelection(match.id)}
                    className="bg-white border-white data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                </div>
                <div className="absolute top-2 right-2">
                  <Badge variant="outline" className="bg-white/90 text-black border-white/90">
                    {match.status}
                  </Badge>
                </div>
                <div className="absolute bottom-2 left-2 text-white">
                  <Badge variant="secondary" className="bg-white/90 text-black mb-1">
                    {match.league}
                  </Badge>
                </div>
              </div>

              <CardContent className="pt-4">
                <div className="text-center mb-4">
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <div className="text-center flex-1">
                      <div className={`font-semibold text-sm ${match.home_team === teamName ? "text-primary" : ""}`}>
                        {match.home_team}
                      </div>
                      <div className="text-xs text-muted-foreground">Home</div>
                    </div>
                    <div className="text-lg font-bold text-primary">VS</div>
                    <div className="text-center flex-1">
                      <div className={`font-semibold text-sm ${match.away_team === teamName ? "text-primary" : ""}`}>
                        {match.away_team || "TBA"}
                      </div>
                      <div className="text-xs text-muted-foreground">Away</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-1 text-xs text-muted-foreground mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3 w-3" />
                    <span>
                      {new Date(match.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-3 w-3" />
                    <span>{match.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3 w-3" />
                    <span>{match.location}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4 text-sm">
                  <div className="text-center">
                    <div className="text-xs text-muted-foreground">Regular</div>
                    <div className="font-bold">{match.price.toLocaleString()} RWF</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-muted-foreground">VIP</div>
                    <div className="font-bold">{match.vip_price.toLocaleString()} RWF</div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-transparent"
                    onClick={() => handleMatchSelection(match.id)}
                  >
                    {selectedMatches.includes(match.id.toString()) ? "Remove" : "Select"}
                  </Button>
                  <Link href={`/tickets/purchase/${match.id}`} className="flex-1">
                    <Button size="sm" className="w-full">
                      Buy Now
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {teamMatches.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold mb-2">No Matches Found</h3>
              <p className="text-muted-foreground">No upcoming matches for {teamName}. Check back later!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
