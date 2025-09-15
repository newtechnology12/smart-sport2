"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bell, Home, Trophy, Calendar, User, Wallet, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/language-switcher"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/sports", icon: Trophy, label: "Sports" },
  { href: "/tickets", icon: Calendar, label: "My Tickets" },
  { href: "/wallet", icon: Wallet, label: "Wallet" },
  { href: "/profile", icon: User, label: "Profile" },
]

export function DesktopTopNav() {
  const pathname = usePathname()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 hidden md:block safe-area-top">
      <div className="glass-effect border-b border-border/50">
        <div className="container flex h-16 items-center justify-between px-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Trophy className="h-5 w-5 text-white" />
            </div>
            <h1 className="font-serif text-xl font-bold text-foreground">
              SmartSports RW
            </h1>
          </div>

          {/* Main Navigation */}
          <nav className="flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "apple-button apple-focus flex items-center gap-2 px-4 py-2 h-10 rounded-xl transition-all duration-200",
                      isActive
                        ? "bg-primary/10 text-primary hover:bg-primary/15"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Button>
                </Link>
              )
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <Link href="/search">
              <Button
                variant="ghost"
                size="sm"
                className="apple-button apple-focus h-10 w-10 rounded-xl hover:bg-muted/50"
              >
                <Search className="h-4 w-4" />
              </Button>
            </Link>

            <LanguageSwitcher />

            <Button
              variant="ghost"
              size="sm"
              className="apple-button apple-focus h-10 w-10 rounded-xl hover:bg-muted/50"
            >
              <Bell className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
