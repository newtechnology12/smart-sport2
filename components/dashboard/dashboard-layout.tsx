"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { useAuth, useRoleAccess } from '@/lib/auth-context'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  Home,
  Users,
  Trophy,
  Ticket,
  ShoppingBag,
  BarChart3,
  Settings,
  User,
  LogOut,
  Menu,
  Bell,
  Search,
  Calendar,
  CreditCard,
  Shield,
  UserCheck,
  TrendingUp,
  FileText,
  Wallet,
  QrCode
} from 'lucide-react'

interface DashboardLayoutProps {
  children: React.ReactNode
}

interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string
  roles: ('admin' | 'client' | 'team')[]
}

const navigationItems: NavItem[] = [
  // Admin Navigation
  {
    title: 'Overview',
    href: '/admin',
    icon: Home,
    roles: ['admin']
  },
  {
    title: 'User Management',
    href: '/admin/users',
    icon: Users,
    roles: ['admin']
  },
  {
    title: 'Team Management',
    href: '/admin/teams',
    icon: Trophy,
    roles: ['admin']
  },
  {
    title: 'Ticket Sales',
    href: '/admin/tickets',
    icon: Ticket,
    roles: ['admin']
  },
  {
    title: 'Analytics',
    href: '/admin/analytics',
    icon: BarChart3,
    roles: ['admin']
  },
  {
    title: 'Reports',
    href: '/admin/reports',
    icon: FileText,
    roles: ['admin']
  },
  {
    title: 'System Settings',
    href: '/admin/settings',
    icon: Settings,
    roles: ['admin']
  },

  // Client Navigation
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: Home,
    roles: ['client']
  },
  {
    title: 'Browse Matches',
    href: '/dashboard/matches',
    icon: Calendar,
    roles: ['client']
  },
  {
    title: 'My Tickets',
    href: '/dashboard/tickets',
    icon: Ticket,
    roles: ['client']
  },
  {
    title: 'QR Codes',
    href: '/dashboard/qr-codes',
    icon: QrCode,
    roles: ['client']
  },
  {
    title: 'Wallet',
    href: '/dashboard/wallet',
    icon: Wallet,
    roles: ['client']
  },
  {
    title: 'Profile',
    href: '/dashboard/profile',
    icon: User,
    roles: ['client']
  },

  // Team Navigation
  {
    title: 'Dashboard',
    href: '/team-dashboard',
    icon: Home,
    roles: ['team']
  },
  {
    title: 'Team Profile',
    href: '/team-dashboard/profile',
    icon: Trophy,
    roles: ['team']
  },
  {
    title: 'Ticket Sales',
    href: '/team-dashboard/sales',
    icon: TrendingUp,
    roles: ['team']
  },
  {
    title: 'Matches',
    href: '/team-dashboard/matches',
    icon: Calendar,
    roles: ['team']
  },
  {
    title: 'Analytics',
    href: '/team-dashboard/analytics',
    icon: BarChart3,
    roles: ['team']
  }
]

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout } = useAuth()
  const { userRole } = useRoleAccess()
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const filteredNavItems = navigationItems.filter(item => 
    userRole && item.roles.includes(userRole)
  )

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800'
      case 'client': return 'bg-blue-100 text-blue-800'
      case 'team': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return Shield
      case 'client': return UserCheck
      case 'team': return Trophy
      default: return User
    }
  }

  const Sidebar = ({ className = "" }: { className?: string }) => (
    <div className={`flex flex-col h-full bg-card border-r ${className}`}>
      {/* Logo */}
      <div className="p-6 border-b">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Trophy className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-bold text-lg apple-subtitle">SmartSports</h2>
            <p className="text-xs text-muted-foreground">RW Dashboard</p>
          </div>
        </Link>
      </div>

      {/* User Info */}
      <div className="p-4 border-b">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user?.avatar} />
            <AvatarFallback>
              {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm truncate">{user?.name}</p>
            <Badge variant="secondary" className={`text-xs ${getRoleColor(user?.role || '')}`}>
              {user?.role?.toUpperCase()}
            </Badge>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {filteredNavItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors apple-button ${
                isActive 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-muted text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Icon className="h-4 w-4" />
              <span className="font-medium">{item.title}</span>
              {item.badge && (
                <Badge variant="secondary" className="ml-auto">
                  {item.badge}
                </Badge>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground apple-button"
          onClick={logout}
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <Sidebar />
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between p-4 border-b bg-card">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-72">
              <Sidebar />
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
              <Trophy className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-bold">SmartSports RW</span>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback className="text-xs">
                    {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:pl-72">
        <main className="min-h-screen">
          {children}
        </main>
      </div>
    </div>
  )
}
