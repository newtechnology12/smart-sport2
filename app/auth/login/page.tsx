"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Mail, Lock, Eye, EyeOff, Loader2, Shield, Users, Trophy } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const success = await login(formData.email, formData.password, formData.role)

      if (success) {
        // Redirect based on role
        switch (formData.role) {
          case 'admin':
            router.push('/admin')
            break
          case 'client':
            router.push('/dashboard')
            break
          case 'team':
            router.push('/team-dashboard')
            break
          default:
            router.push('/')
        }
      } else {
        setError("Invalid credentials. Please check your email, password, and role.")
      }
    } catch (err) {
      setError("An error occurred during login. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleRoleChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      role: value,
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container max-w-md mx-auto px-4 py-6">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm" className="mb-6 apple-button">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>

          <div className="text-center mb-8">
            <h1 className="font-serif text-4xl font-bold mb-3 apple-title bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="text-muted-foreground apple-body text-lg">
              Sign in to your SmartSports RW account
            </p>
          </div>
        </div>

        <Card className="apple-card glass-effect border-0 shadow-2xl">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl apple-subtitle">Sign In</CardTitle>
            <CardDescription className="apple-body">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {error && (
              <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm apple-body">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="role" className="apple-caption font-medium">Account Type</Label>
                <Select value={formData.role} onValueChange={handleRoleChange} required>
                  <SelectTrigger className="apple-focus h-12 border-2">
                    <SelectValue placeholder="Select your account type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin" className="apple-body">
                      <div className="flex items-center gap-3">
                        <Shield className="h-4 w-4 text-primary" />
                        <div>
                          <div className="font-medium">Administrator</div>
                          <div className="text-xs text-muted-foreground">Manage users, teams & system</div>
                        </div>
                      </div>
                    </SelectItem>
                    <SelectItem value="client" className="apple-body">
                      <div className="flex items-center gap-3">
                        <Users className="h-4 w-4 text-blue-500" />
                        <div>
                          <div className="font-medium">Client/User</div>
                          <div className="text-xs text-muted-foreground">Buy tickets & manage profile</div>
                        </div>
                      </div>
                    </SelectItem>
                    <SelectItem value="team" className="apple-body">
                      <div className="flex items-center gap-3">
                        <Trophy className="h-4 w-4 text-green-500" />
                        <div>
                          <div className="font-medium">Team</div>
                          <div className="text-xs text-muted-foreground">Manage team info & sales</div>
                        </div>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="apple-caption font-medium">Email or Username</Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-4 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="text"
                    placeholder="Enter your email or username"
                    className="pl-12 h-12 border-2 apple-focus"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="apple-caption font-medium">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-4 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="pl-12 pr-12 h-12 border-2 apple-focus"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-2 h-8 w-8 p-0"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Link href="/auth/forgot-password" className="text-sm text-primary hover:underline apple-caption">
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full h-12 apple-button text-base font-medium"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground apple-body">
                Don't have an account?{" "}
                <Link href="/auth/register" className="text-primary hover:underline font-medium">
                  Create one
                </Link>
              </p>
            </div>

            <div className="mt-6 p-4 bg-muted/30 rounded-lg">
              <p className="text-xs text-muted-foreground apple-caption text-center mb-2">
                Demo Credentials:
              </p>
              <div className="text-xs space-y-1 text-muted-foreground apple-caption">
                <div><strong>Admin:</strong> admin / admin</div>
                <div><strong>Client:</strong> client / client</div>
                <div><strong>Team:</strong> team / team</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
