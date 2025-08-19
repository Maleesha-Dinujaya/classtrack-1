'use client'

import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import api from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { GraduationCap, BookOpen, Mail, Lock, User, School } from 'lucide-react'

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login')
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      if (authMode === 'register') {
        if (password !== formData.get('confirmPassword')) {
          alert('Passwords do not match')
          return
        }
        const name = `${formData.get('firstName')} ${formData.get('lastName')}`
        const role = formData.get('role') as string
        await api.post('/api/auth/register', { email, password, role, name })
      }

      const params = new URLSearchParams()
      params.append('username', email)
      params.append('password', password)
      const res = await api.post('/api/auth/token', params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
      const token = res.data.access_token as string
      localStorage.setItem('token', token)
      const payload = JSON.parse(atob(token.split('.')[1]))
      const user = {
        name: email.split('@')[0],
        email,
        role: payload.role as 'student' | 'teacher'
      }
      login(user)
      window.location.href = `/dashboard/${user.role}`
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-primary p-3 rounded-xl">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">ClassTrack</h1>
          <p className="text-gray-600">Student Attendance & Grade Management</p>
        </div>

        <Card className="shadow-lg border-0">
          <CardHeader className="space-y-1">
            <Tabs value={authMode} onValueChange={(value) => setAuthMode(value as 'login' | 'register')} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Sign In</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-4 mt-6">
                <div className="space-y-2 text-center">
                  <CardTitle className="text-2xl">Welcome back</CardTitle>
                  <CardDescription>
                    Enter your credentials to access your account
                  </CardDescription>
                </div>
              </TabsContent>

              <TabsContent value="register" className="space-y-4 mt-6">
                <div className="space-y-2 text-center">
                  <CardTitle className="text-2xl">Create account</CardTitle>
                  <CardDescription>
                    Set up your ClassTrack account
                  </CardDescription>
                </div>
              </TabsContent>
            </Tabs>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {authMode === 'register' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="role">I am a</Label>
                    <Select name="role" required>
                      <SelectTrigger id="role">
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="student">
                          <div className="flex items-center">
                            <BookOpen className="h-4 w-4 mr-2" />
                            Student
                          </div>
                        </SelectItem>
                        <SelectItem value="teacher">
                          <div className="flex items-center">
                            <School className="h-4 w-4 mr-2" />
                            Teacher
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        placeholder="John"
                        required
                        disabled={isLoading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        placeholder="Doe"
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    className="pl-9"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-9"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              {authMode === 'register' && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      className="pl-9"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading && (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                )}
                {authMode === 'login' ? 'Sign In' : 'Create Account'}
              </Button>
            </form>
          </CardContent>

          {authMode === 'login' && (
            <CardFooter className="flex flex-col space-y-3">
              <Button variant="link" className="text-sm text-gray-600">
                Forgot your password?
              </Button>
              <div className="text-sm text-gray-600 text-center">
                Don't have an account?{' '}
                <Button
                  variant="link"
                  className="p-0 h-auto text-primary"
                  onClick={() => setAuthMode('register')}
                >
                  Sign up here
                </Button>
              </div>
            </CardFooter>
          )}
        </Card>

        <div className="text-center mt-6 text-sm text-gray-500">
          Secure and trusted by educational institutions worldwide
        </div>
      </div>
    </div>
  )
}
