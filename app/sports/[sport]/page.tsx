import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { ArrowLeft, Users, MapPin, Clock, Calendar, Heart, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { sportsData, matches } from "@/lib/dummy-data"
import { notFound } from "next/navigation"

interface SportPageProps {
  params: {
    sport: string
  }
}

export default function SportPage({ params }: SportPageProps) {
  const sportKey = params.sport.charAt(0).toUpperCase() + params.sport.slice(1)
  const sport = sportsData[sportKey as keyof typeof sportsData]

  if (!sport) {
    notFound()
  }

  const sportMatches = matches.filter((match) => match.sport === sportKey)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container max-w-6xl mx-auto px-4 py-6">
        {/* Back Navigation */}
        <div className="mb-6">
          <Link href="/sports">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Sports
            </Button>
          </Link>

          <div className="flex items-center gap-4 mb-4">
            <div className="text-4xl">{sport.icon}</div>
            <div>
              <h1 className="font-serif text-3xl font-bold">{sport.name}</h1>
              <p className="text-muted-foreground">{sport.description}</p>
            </div>
          </div>

          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input placeholder={`Search ${sport.name.toLowerCase()} teams or matches...`} className="pl-10" />
          </div>
        </div>

        {/* Teams Section */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl font-bold mb-6">Teams</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {sport.teams.map((team) => (
              <Card key={team} className="text-center hover:shadow-md transition-all duration-300 hover:scale-105">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{team}</h3>
                  <div className="flex gap-2 justify-center">
                    <Button variant="outline" size="sm">
                      <Heart className="h-3 w-3 mr-1" />
                      Follow
                    </Button>
                    <Button size="sm">Donate</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Upcoming Matches */}
        <section>
          <h2 className="font-serif text-2xl font-bold mb-6">Upcoming Matches</h2>
          {sportMatches.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sportMatches.map((match) => (
                <Card key={match.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">{match.league}</Badge>
                      <Badge variant="outline">{match.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center mb-4">
                      <div className="flex items-center justify-center gap-4 mb-2">
                        <div className="text-center">
                          <div className="font-semibold">{match.home_team}</div>
                          <div className="text-sm text-muted-foreground">Home</div>
                        </div>
                        <div className="text-2xl font-bold text-primary">VS</div>
                        <div className="text-center">
                          <div className="font-semibold">{match.away_team || "TBA"}</div>
                          <div className="text-sm text-muted-foreground">Away</div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{match.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{match.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{match.location}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Regular</div>
                        <div className="font-bold text-lg">{match.price.toLocaleString()} RWF</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">VIP</div>
                        <div className="font-bold text-lg">{match.vip_price.toLocaleString()} RWF</div>
                      </div>
                    </div>

                    <Link href={`/tickets/purchase/${match.id}`}>
                      <Button className="w-full">Buy Tickets</Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold mb-2">No Upcoming Matches</h3>
                <p className="text-muted-foreground">Check back later for new {sport.name.toLowerCase()} matches.</p>
              </CardContent>
            </Card>
          )}
        </section>
      </div>
    </div>
  )
}
