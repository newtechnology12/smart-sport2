"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Trophy, Calendar, Wallet, Users, Star, ArrowRight } from "lucide-react"
import { matches } from "@/lib/dummy-data"
import { getSportImage } from "@/lib/images"

export default function HomePage() {
  const [selectedSport, setSelectedSport] = useState("All")

  const filteredMatches = selectedSport === "All"
    ? matches.slice(0, 6)
    : matches.filter(match => match.sport === selectedSport).slice(0, 6)

  const upcomingMatches = filteredMatches.slice(0, 3)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-secondary/10 px-4 py-8">
        <div className="container max-w-4xl mx-auto text-center">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-balance mb-4">
            Rwanda's Premier Sports Ticketing Platform
          </h1>
          <p className="text-muted-foreground text-lg mb-6 text-pretty">
            Buy tickets for Football, Basketball, Volleyball and Events. Digital tickets with QR codes, mobile money
            support, and more.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sports">
              <Button size="lg" className="w-full sm:w-auto">
                <Trophy className="mr-2 h-5 w-5" />
                Buy Tickets
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Sports Categories Navigation */}
      <section className="px-4 py-8 bg-muted/20">
        <div className="container max-w-4xl mx-auto">
          <h2 className="font-serif text-2xl font-bold text-center mb-6">Browse by Sport</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/sports">
              <Button variant="outline" size="lg" className="bg-white hover:bg-primary hover:text-white">
                All Sports
              </Button>
            </Link>
            <Link href="/sports/football">
              <Button variant="outline" size="lg" className="bg-white hover:bg-primary hover:text-white">
                ⚽ Football
              </Button>
            </Link>
            <Link href="/sports/basketball">
              <Button variant="outline" size="lg" className="bg-white hover:bg-primary hover:text-white">
                🏀 Basketball
              </Button>
            </Link>
            <Link href="/sports/volleyball">
              <Button variant="outline" size="lg" className="bg-white hover:bg-primary hover:text-white">
                🏐 Volleyball
              </Button>
            </Link>
            <Link href="/sports/events">
              <Button variant="outline" size="lg" className="bg-white hover:bg-primary hover:text-white">
                🎪 Events
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-12">
        <div className="container max-w-4xl mx-auto">
          <h2 className="font-serif text-2xl font-bold text-center mb-8">Why Choose SmartSports RW?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="text-center">
                <Trophy className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">Multiple Sports</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Football, Basketball, Volleyball, and Events all in one platform
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Calendar className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">Digital Tickets</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  QR code tickets that work on your phone - no more paper tickets
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Wallet className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">Mobile Money</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Pay with MTN Mobile Money, Airtel Money, or bank transfer
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">Support Teams</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Donate to your favorite teams and help them grow
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Upcoming Matches */}
      <section className="px-4 py-12 bg-muted/30">
        <div className="container max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-2xl font-bold">Upcoming Matches</h2>
            <Link href="/sports">
              <Button variant="outline" size="sm">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            <Button
              variant={selectedSport === "All" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedSport("All")}
            >
              All
            </Button>
            <Button
              variant={selectedSport === "Football" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedSport("Football")}
            >
              Football
            </Button>
            <Button
              variant={selectedSport === "Basketball" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedSport("Basketball")}
            >
              Basketball
            </Button>
            <Button
              variant={selectedSport === "Volleyball" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedSport("Volleyball")}
            >
              Volleyball
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredMatches.map((match) => (
              <Card key={match.id} className="overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 relative">
                  <Image
                    src={match.image || getSportImage(match.sport)}
                    alt={`${match.home_team} vs ${match.away_team || "Event"}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute bottom-2 left-2 text-white font-bold text-sm bg-black/50 px-2 py-1 rounded">
                    {match.sport}
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">
                    {match.away_team ? `${match.home_team} vs ${match.away_team}` : match.home_team}
                  </CardTitle>
                  <CardDescription>
                    {new Date(match.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}{" "}
                    • {match.time} • {match.location}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-primary">{match.price.toLocaleString()} RWF</span>
                    <Link href={`/tickets/purchase/${match.id}`}>
                      <Button size="sm">Buy Ticket</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 py-12">
        <div className="container max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">50K+</div>
              <div className="text-muted-foreground">Tickets Sold</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">25+</div>
              <div className="text-muted-foreground">Teams Supported</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">100+</div>
              <div className="text-muted-foreground">Events Hosted</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">4.9</div>
              <div className="text-muted-foreground flex items-center justify-center gap-1">
                <Star className="h-4 w-4 fill-current text-yellow-500" />
                Rating
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
