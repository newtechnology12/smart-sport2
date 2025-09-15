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
import { VideoBackgroundSlides } from "@/components/ui/video-background-slides"
import { AutoTyping } from "@/components/ui/auto-typing"

export default function HomePage() {
  const [selectedSport, setSelectedSport] = useState("All")

  const filteredMatches = selectedSport === "All"
    ? matches.slice(0, 6)
    : matches.filter(match => match.sport === selectedSport).slice(0, 6)

  const upcomingMatches = filteredMatches.slice(0, 3)

  // Video backgrounds
  const heroVideos = [
    "/videos/football.mp4",
    "/videos/basketball.mp4",
    "/videos/volleyball.mp4",
    "/videos/handball.mp4"
  ]

  // Auto-typing texts
  const typingTexts = [
    "Rwanda's Premier Sports Platform",
    "Digital Tickets, Real Experiences",
    "Support Your Favorite Teams",
    "Mobile Money Made Easy"
  ]

  return (
    <div className="min-h-screen bg-background">

      {/* Hero Section with Video Background */}
      <section className="video-background-container">
        {/* Video Background */}
        <VideoBackgroundSlides
          videos={heroVideos}
          className="absolute inset-0 z-0"
          slideInterval={10000}
          showIndicators={false}
          showControls={false}
          autoPlay={true}
          muted={true}
          loop={true}
        />

        {/* Hero Content */}
        <div className="hero-content-centered container max-w-4xl mx-auto px-4">
          <div className="text-white">
            {/* Auto-typing Title */}
            <h1 className="apple-title text-3xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8 min-h-[4rem] md:min-h-[6rem] lg:min-h-[8rem] flex items-center justify-center">
              <AutoTyping
                texts={typingTexts}
                typeSpeed={80}
                deleteSpeed={40}
                pauseDuration={3000}
                className="text-white drop-shadow-lg text-center"
                minHeight="3rem"
              />
            </h1>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/tickets/buy" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="apple-button w-full sm:w-auto bg-primary hover:bg-primary/90 text-white rounded-2xl px-8 py-4 h-14 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <Trophy className="mr-3 h-5 w-5" />
                  BUY TICKET
                </Button>
              </Link>
              <Link href="/auth/register" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="apple-button w-full sm:w-auto bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 rounded-2xl px-8 py-4 h-14 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  CREATE ACCOUNT
                </Button>
              </Link>
            </div>
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


    </div>
  )
}
