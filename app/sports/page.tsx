import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Trophy, Users, Calendar, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { sportsData } from "@/lib/dummy-data"

export default function SportsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container max-w-6xl mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="font-serif text-3xl font-bold mb-2">Choose Your Sport</h1>
          <p className="text-muted-foreground mb-6">Select a sport category to view teams and upcoming matches</p>

          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input placeholder="Search sports, teams, or events..." className="pl-10" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(sportsData).map(([key, sport]) => (
            <Link key={key} href={`/sports/${key.toLowerCase()}`}>
              <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer border-2 hover:border-primary/20">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="text-5xl">{sport.icon}</div>
                    <div className="flex-1">
                      <CardTitle className="text-xl">{sport.name}</CardTitle>
                      <CardDescription className="mt-1">{sport.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{sport.teams.length} Teams</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>Active Season</span>
                    </div>
                  </div>

                  <Button className="w-full bg-primary hover:bg-primary/90">
                    <Trophy className="mr-2 h-4 w-4" />
                    View {sport.name}
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <section className="mt-12">
          <h2 className="font-serif text-2xl font-bold mb-6">Popular Teams</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["APR FC", "Rayon Sports", "REG BBC", "Patriots BBC"].map((team) => (
              <Card key={team} className="text-center hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Trophy className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold">{team}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {team.includes("FC") ? "Football" : "Basketball"}
                  </p>
                  <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                    Follow
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
