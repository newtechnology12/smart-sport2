"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Calendar, Wallet, Users, Star, ArrowRight } from "lucide-react"
import { matches } from "@/lib/dummy-data"
import { getSportImage } from "@/lib/images"
import { FootballIcon, BasketballIcon, VolleyballIcon, EventIcon, AllSportsIcon } from "@/components/icons/sport-icons"

export default function HomePage() {
  const [selectedSport, setSelectedSport] = useState("All")

  const filteredMatches = selectedSport === "All"
    ? matches.slice(0, 6)
    : matches.filter(match => match.sport === selectedSport).slice(0, 6)

  const upcomingMatches = filteredMatches.slice(0, 3)

  return (
    <div className="min-h-screen bg-background">

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-secondary/10 px-4 py-6 md:py-8">
        <div className="container max-w-4xl mx-auto text-center">
          <h1 className="font-serif text-2xl md:text-4xl font-bold text-balance mb-3 md:mb-4">
            Rwanda's Premier Sports Ticketing Platform
          </h1>
          <p className="text-muted-foreground text-base md:text-lg mb-4 md:mb-6 text-pretty px-2">
            Buy tickets for Football, Basketball, Volleyball and Events. Digital tickets with QR codes, mobile money
            support, and more.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4 sm:px-0">
            <Link href="/sports" className="w-full sm:w-auto">
              <Button size="lg" className="apple-button w-full sm:w-auto rounded-xl px-6 md:px-8 py-3 h-11 md:h-12">
                <Trophy className="mr-2 h-4 md:h-5 w-4 md:w-5" />
                Buy Tickets
              </Button>
            </Link>
            <Link href="/auth/register" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="apple-button w-full sm:w-auto bg-transparent rounded-xl px-6 md:px-8 py-3 h-11 md:h-12">
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Sports Categories Navigation */}
      <section className="px-4 py-6 md:py-8 bg-muted/20">
        <div className="container max-w-4xl mx-auto">
          <h2 className="font-serif text-xl md:text-2xl font-bold text-center mb-4 md:mb-6">Browse by Sport</h2>
          <div className="grid grid-cols-2 md:flex md:flex-wrap md:justify-center gap-3 md:gap-4">
            <Link href="/sports" className="w-full md:w-auto">
              <Button variant="outline" size="lg" className="apple-button bg-white hover:bg-primary hover:text-white rounded-xl flex items-center justify-center gap-2 w-full md:w-auto h-12 md:h-auto text-sm md:text-base">
                <AllSportsIcon size={18} className="md:w-5 md:h-5" />
                <span className="hidden sm:inline">All Sports</span>
                <span className="sm:hidden">All</span>
              </Button>
            </Link>
            <Link href="/sports/football" className="w-full md:w-auto">
              <Button variant="outline" size="lg" className="apple-button bg-white hover:bg-primary hover:text-white rounded-xl flex items-center justify-center gap-2 w-full md:w-auto h-12 md:h-auto text-sm md:text-base">
                <FootballIcon size={18} className="md:w-5 md:h-5" />
                Football
              </Button>
            </Link>
            <Link href="/sports/basketball" className="w-full md:w-auto">
              <Button variant="outline" size="lg" className="apple-button bg-white hover:bg-primary hover:text-white rounded-xl flex items-center justify-center gap-2 w-full md:w-auto h-12 md:h-auto text-sm md:text-base">
                <BasketballIcon size={18} className="md:w-5 md:h-5" />
                <span className="hidden sm:inline">Basketball</span>
                <span className="sm:hidden">B-Ball</span>
              </Button>
            </Link>
            <Link href="/sports/volleyball" className="w-full md:w-auto">
              <Button variant="outline" size="lg" className="apple-button bg-white hover:bg-primary hover:text-white rounded-xl flex items-center justify-center gap-2 w-full md:w-auto h-12 md:h-auto text-sm md:text-base">
                <VolleyballIcon size={18} className="md:w-5 md:h-5" />
                <span className="hidden sm:inline">Volleyball</span>
                <span className="sm:hidden">V-Ball</span>
              </Button>
            </Link>
            <Link href="/sports/events" className="w-full md:w-auto col-span-2 md:col-span-1">
              <Button variant="outline" size="lg" className="apple-button bg-white hover:bg-primary hover:text-white rounded-xl flex items-center justify-center gap-2 w-full md:w-auto h-12 md:h-auto text-sm md:text-base">
                <EventIcon size={18} className="md:w-5 md:h-5" />
                Events
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-8 md:py-12">
        <div className="container max-w-4xl mx-auto">
          <h2 className="font-serif text-xl md:text-2xl font-bold text-center mb-6 md:mb-8">Why Choose SmartSports RW?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <Card className="apple-card rounded-2xl border-0 shadow-sm bg-card/50 backdrop-blur-sm">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Trophy className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Multiple Sports</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Football, Basketball, Volleyball, and Events all in one platform
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="apple-card rounded-2xl border-0 shadow-sm bg-card/50 backdrop-blur-sm">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Digital Tickets</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  QR code tickets that work on your phone - no more paper tickets
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="apple-card rounded-2xl border-0 shadow-sm bg-card/50 backdrop-blur-sm">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Wallet className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Mobile Money</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Pay with MTN Mobile Money, Airtel Money, or bank transfer
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="apple-card rounded-2xl border-0 shadow-sm bg-card/50 backdrop-blur-sm">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Users className="h-6 w-6 text-primary" />
                </div>
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
      <section className="px-4 py-8 md:py-12 bg-muted/30">
        <div className="container max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <h2 className="font-serif text-xl md:text-2xl font-bold">Upcoming Matches</h2>
            <Link href="/sports">
              <Button variant="outline" size="sm" className="apple-button rounded-xl text-xs md:text-sm">
                <span className="hidden sm:inline">View All</span>
                <span className="sm:hidden">All</span>
                <ArrowRight className="ml-1 md:ml-2 h-3 md:h-4 w-3 md:w-4" />
              </Button>
            </Link>
          </div>

          <div className="flex flex-wrap gap-2 mb-4 md:mb-6 overflow-x-auto pb-2">
            <Button
              variant={selectedSport === "All" ? "default" : "outline"}
              size="sm"
              className="apple-button rounded-xl"
              onClick={() => setSelectedSport("All")}
            >
              All
            </Button>
            <Button
              variant={selectedSport === "Football" ? "default" : "outline"}
              size="sm"
              className="apple-button rounded-xl"
              onClick={() => setSelectedSport("Football")}
            >
              Football
            </Button>
            <Button
              variant={selectedSport === "Basketball" ? "default" : "outline"}
              size="sm"
              className="apple-button rounded-xl"
              onClick={() => setSelectedSport("Basketball")}
            >
              Basketball
            </Button>
            <Button
              variant={selectedSport === "Volleyball" ? "default" : "outline"}
              size="sm"
              className="apple-button rounded-xl"
              onClick={() => setSelectedSport("Volleyball")}
            >
              Volleyball
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredMatches.map((match) => (
              <Card key={match.id} className="apple-card overflow-hidden rounded-2xl border-0 shadow-sm bg-card/50 backdrop-blur-sm">
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
                      <Button size="sm" className="apple-button rounded-xl">Buy Ticket</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 py-8 md:py-12">
        <div className="container max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-center">
            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-4 md:p-6">
              <div className="text-2xl md:text-3xl font-bold text-primary mb-1 md:mb-2">50K+</div>
              <div className="text-muted-foreground text-sm md:text-base">Tickets Sold</div>
            </div>
            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-4 md:p-6">
              <div className="text-2xl md:text-3xl font-bold text-primary mb-1 md:mb-2">25+</div>
              <div className="text-muted-foreground text-sm md:text-base">Teams Supported</div>
            </div>
            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-4 md:p-6">
              <div className="text-2xl md:text-3xl font-bold text-primary mb-1 md:mb-2">100+</div>
              <div className="text-muted-foreground text-sm md:text-base">Events Hosted</div>
            </div>
            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-4 md:p-6">
              <div className="text-2xl md:text-3xl font-bold text-primary mb-1 md:mb-2">4.9</div>
              <div className="text-muted-foreground flex items-center justify-center gap-1 text-sm md:text-base">
                <Star className="h-3 md:h-4 w-3 md:w-4 fill-current text-yellow-500" />
                Rating
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
