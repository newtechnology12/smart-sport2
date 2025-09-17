"use client"

import React, { useState, useMemo } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
  QrCode,
  Grid3X3,
  Briefcase,
  Activity,
  HelpCircle,
  MessageCircle,
  DollarSign,
  Database,
  Server,
  Mail,
  Lock,
  HardDrive,
  Monitor,
  Plus,
  MapPin,
  Tag,
  Copy,
  Receipt,
  Calculator,
  PieChart,
  Banknote,
  TrendingDown,
  X
} from 'lucide-react'
import { DashboardNavbar } from './dashboard-navbar'

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
    title: 'Dashboard & Overview',
    href: '/admin',
    icon: Grid3X3,
    roles: ['admin']
  },
  {
    title: 'Events',
    href: '/admin/events',
    icon: Calendar,
    roles: ['admin']
  },
  {
    title: 'Create Event',
    href: '/admin/events/create',
    icon: Plus,
    roles: ['admin']
  },
  {
    title: 'Event Categories',
    href: '/admin/event-categories',
    icon: Tag,
    roles: ['admin']
  },
  {
    title: 'Event Templates',
    href: '/admin/event-templates',
    icon: Copy,
    roles: ['admin']
  },
  {
    title: 'Venue Management',
    href: '/admin/venues',
    icon: MapPin,
    roles: ['admin']
  },
  {
    title: 'Event Settings',
    href: '/admin/event-settings',
    icon: Settings,
    roles: ['admin']
  },
  {
    title: 'Event Calendar',
    href: '/admin/event-calendar',
    icon: Calendar,
    roles: ['admin']
  },
  {
    title: 'Event Reports',
    href: '/admin/event-reports',
    icon: BarChart3,
    roles: ['admin']
  },
  {
    title: 'Event Analytics',
    href: '/admin/event-analytics',
    icon: TrendingUp,
    roles: ['admin']
  },
  {
    title: 'Transactions',
    href: '/admin/transactions',
    icon: Briefcase,
    roles: ['admin']
  },
  {
    title: 'My Wallet',
    href: '/admin/wallet',
    icon: Wallet,
    roles: ['admin']
  },
  {
    title: 'Reports & Analytics',
    href: '/admin/reports',
    icon: BarChart3,
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
    title: 'Create Team',
    href: '/admin/teams/create',
    icon: Plus,
    roles: ['admin']
  },
  {
    title: 'Team Categories',
    href: '/admin/team-categories',
    icon: Tag,
    roles: ['admin']
  },
  {
    title: 'Team Members',
    href: '/admin/team-members',
    icon: Users,
    roles: ['admin']
  },
  {
    title: 'Team Roles',
    href: '/admin/team-roles',
    icon: Shield,
    roles: ['admin']
  },
  {
    title: 'Team Settings',
    href: '/admin/team-settings',
    icon: Settings,
    roles: ['admin']
  },
  {
    title: 'Team Analytics',
    href: '/admin/team-analytics',
    icon: BarChart3,
    roles: ['admin']
  },
  {
    title: 'Team Reports',
    href: '/admin/team-reports',
    icon: FileText,
    roles: ['admin']
  },
  {
    title: 'Team Performance',
    href: '/admin/team-performance',
    icon: TrendingUp,
    roles: ['admin']
  },
  {
    title: 'Team Schedules',
    href: '/admin/team-schedules',
    icon: Calendar,
    roles: ['admin']
  },
  {
    title: 'Team Finances',
    href: '/admin/team-finances',
    icon: DollarSign,
    roles: ['admin']
  },
  {
    title: 'Team Documents',
    href: '/admin/team-documents',
    icon: FileText,
    roles: ['admin']
  },
  {
    title: 'Team Communication',
    href: '/admin/team-communication',
    icon: MessageCircle,
    roles: ['admin']
  },
  {
    title: 'Team Permissions',
    href: '/admin/team-permissions',
    icon: Lock,
    roles: ['admin']
  },
  {
    title: 'Account Settings',
    href: '/admin/settings',
    icon: User,
    roles: ['admin']
  },
  {
    title: 'General Settings',
    href: '/admin/general-settings',
    icon: Settings,
    roles: ['admin']
  },
  {
    title: 'Browse Matches',
    href: '/admin/matches',
    icon: Calendar,
    roles: ['admin']
  },
  {
    title: 'Matches',
    href: '/admin/admin-matches',
    icon: Calendar,
    roles: ['admin']
  },
  {
    title: 'My Tickets',
    href: '/admin/my-tickets',
    icon: Ticket,
    roles: ['admin']
  },
  {
    title: 'QR Codes',
    href: '/admin/qr-codes',
    icon: QrCode,
    roles: ['admin']
  },
  {
    title: 'Profile',
    href: '/admin/profile',
    icon: User,
    roles: ['admin']
  },
  {
    title: 'Analytics',
    href: '/admin/analytics',
    icon: BarChart3,
    roles: ['admin']
  },
  {
    title: 'Ticket Sales',
    href: '/admin/ticket-sales',
    icon: TrendingUp,
    roles: ['admin']
  },
  {
    title: 'Finance',
    href: '/admin/finance',
    icon: DollarSign,
    roles: ['admin']
  },
  {
    title: 'Accounting',
    href: '/admin/accounting',
    icon: Calculator,
    roles: ['admin']
  },
  {
    title: 'Revenue Management',
    href: '/admin/revenue',
    icon: TrendingUp,
    roles: ['admin']
  },
  {
    title: 'Expense Tracking',
    href: '/admin/expenses',
    icon: TrendingDown,
    roles: ['admin']
  },
  {
    title: 'Budget Planning',
    href: '/admin/budget',
    icon: PieChart,
    roles: ['admin']
  },
  {
    title: 'Financial Reports',
    href: '/admin/financial-reports',
    icon: FileText,
    roles: ['admin']
  },
  {
    title: 'Tax Management',
    href: '/admin/tax',
    icon: Receipt,
    roles: ['admin']
  },
  {
    title: 'Payment Processing',
    href: '/admin/payments',
    icon: CreditCard,
    roles: ['admin']
  },
  {
    title: 'Invoice Management',
    href: '/admin/invoices',
    icon: Receipt,
    roles: ['admin']
  },
  {
    title: 'Refund Management',
    href: '/admin/refunds',
    icon: Banknote,
    roles: ['admin']
  },
  {
    title: 'Financial Analytics',
    href: '/admin/financial-analytics',
    icon: BarChart3,
    roles: ['admin']
  },
  {
    title: 'Cash Flow',
    href: '/admin/cash-flow',
    icon: TrendingUp,
    roles: ['admin']
  },
  {
    title: 'Profit & Loss',
    href: '/admin/profit-loss',
    icon: BarChart3,
    roles: ['admin']
  },
  {
    title: 'Balance Sheet',
    href: '/admin/balance-sheet',
    icon: FileText,
    roles: ['admin']
  },
  {
    title: 'Financial Settings',
    href: '/admin/financial-settings',
    icon: Settings,
    roles: ['admin']
  },
  {
    title: 'Notifications',
    href: '/admin/notifications',
    icon: Bell,
    roles: ['admin']
  },
  {
    title: 'Messages',
    href: '/admin/messages',
    icon: MessageCircle,
    roles: ['admin']
  },
  {
    title: 'System Logs',
    href: '/admin/logs',
    icon: FileText,
    roles: ['admin']
  },
  {
    title: 'Backup & Restore',
    href: '/admin/backup',
    icon: HardDrive,
    roles: ['admin']
  },
  {
    title: 'API Management',
    href: '/admin/api',
    icon: Server,
    roles: ['admin']
  },
  {
    title: 'Content Management',
    href: '/admin/content',
    icon: FileText,
    roles: ['admin']
  },
  {
    title: 'Email Templates',
    href: '/admin/email-templates',
    icon: Mail,
    roles: ['admin']
  },
  {
    title: 'Security Settings',
    href: '/admin/security',
    icon: Lock,
    roles: ['admin']
  },
  {
    title: 'Database Management',
    href: '/admin/database',
    icon: Database,
    roles: ['admin']
  },
  {
    title: 'System Monitoring',
    href: '/admin/monitoring',
    icon: Monitor,
    roles: ['admin']
  },
  {
    title: 'Integrations',
    href: '/admin/integrations',
    icon: Activity,
    roles: ['admin']
  },
  {
    title: 'Audit Trail',
    href: '/admin/audit',
    icon: Shield,
    roles: ['admin']
  },
  {
    title: 'Maintenance',
    href: '/admin/maintenance',
    icon: Settings,
    roles: ['admin']
  },
  {
    title: 'Help Center',
    href: '/admin/help',
    icon: HelpCircle,
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
  {
    title: 'Help Center',
    href: '/dashboard/help',
    icon: HelpCircle,
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
  },
  {
    title: 'Help Center',
    href: '/team-dashboard/help',
    icon: HelpCircle,
    roles: ['team']
  }
]

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout, isLoading } = useAuth()
  const { userRole }: { userRole: 'admin' | 'client' | 'team' | undefined } = useRoleAccess()
  const pathname = usePathname()
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // Show loading state while authentication is being checked
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  // Filter navigation items by role and search query
  const filteredNavItems = useMemo(() => {
    const roleFilteredItems = navigationItems.filter(item => 
      userRole && item.roles.includes(userRole)
    )

    if (!searchQuery.trim()) {
      return roleFilteredItems
    }

    return roleFilteredItems.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [userRole, searchQuery])

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

  const getOrganizationName = () => {
    switch (userRole) {
      case 'admin': return 'SmartSports RW Admin'
      case 'client': return 'SmartSports RW'
      case 'team': return 'Team Dashboard'
      default: return 'SmartSports RW'
    }
  }

  const getPlanBadge = () => {
    switch (userRole) {
      case 'admin': return 'Pro Plan'
      case 'client': return 'Free Plan'
      case 'team': return 'Team Plan'
      default: return 'Free Plan'
    }
  }

  const clearSearch = () => {
    setSearchQuery('')
  }

  const Sidebar = ({ className = "" }: { className?: string }) => (
    <div className={`flex flex-col h-full bg-white border-r border-gray-200 ${className}`}>
      {/* Logo */}
      <div className="p-6 border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Trophy className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-lg text-gray-900">SmartSports RW</h2>
            <p className="text-xs text-gray-500">
              {userRole === 'admin' ? 'Admin dashboard' : 
               userRole === 'team' ? 'Team dashboard' : 'User dashboard'}
            </p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-4 border-b border-gray-200 flex-shrink-0">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search navigation..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-10 py-2 text-sm border-gray-200 focus:border-blue-500 focus:ring-blue-500"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Navigation - Scrollable */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {filteredNavItems.length > 0 ? (
          <>
            {searchQuery && (
              <div className="text-xs text-gray-500 mb-3">
                {filteredNavItems.length} result{filteredNavItems.length !== 1 ? 's' : ''} found
              </div>
            )}
            {filteredNavItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  prefetch={true}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all duration-150 ${
                    isActive 
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  <span className="font-medium text-sm flex-1">{item.title}</span>
                  {item.badge && (
                    <Badge variant="secondary" className="text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              )
            })}
          </>
        ) : (
          <div className="text-center py-8">
            <Search className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">No navigation items found</p>
            <p className="text-gray-400 text-xs mt-1">Try adjusting your search</p>
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearSearch}
                className="mt-3 text-blue-600 hover:text-blue-700"
              >
                Clear search
              </Button>
            )}
          </div>
        )}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200 flex-shrink-0">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          onClick={logout}
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <Sidebar />
      </div>

      {/* Fixed Top Navigation Bar */}
      <div className="fixed top-0 right-0 left-0 lg:left-72 z-40">
        <DashboardNavbar onMenuClick={() => setIsMobileMenuOpen(true)} />
      </div>

      {/* Main Content */}
      <div className="lg:pl-72">
        {/* Mobile Sidebar */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetContent side="left" className="p-0 w-72">
            <Sidebar />
          </SheetContent>
        </Sheet>

        {/* Main Content Area */}
        <main className="min-h-screen">
          {children}
        </main>
      </div>
    </div>
  )
}