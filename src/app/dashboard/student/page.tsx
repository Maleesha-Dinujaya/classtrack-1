'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Calendar,
  TrendingUp,
  MessageSquare,
  Download,
  BookOpen,
  Clock,
  CheckCircle,
  AlertCircle,
  Users,
  GraduationCap
} from 'lucide-react'

export default function StudentDashboard() {
  // Mock data - in real app this would come from API
  const studentData = {
    name: 'John Doe',
    studentId: 'STD001',
    currentGPA: 3.75,
    overallAttendance: 92,
    semester: 'Fall 2024',
    unreadMessages: 5,
    totalCredits: 18
  }

  const subjects = [
    {
      name: 'Mathematics',
      code: 'MATH101',
      attendance: 95,
      grade: 'A',
      credits: 4,
      teacher: 'Dr. Smith',
      nextClass: '2024-01-15 10:00 AM'
    },
    {
      name: 'Physics',
      code: 'PHY201',
      attendance: 88,
      grade: 'B+',
      credits: 4,
      teacher: 'Prof. Johnson',
      nextClass: '2024-01-15 2:00 PM'
    },
    {
      name: 'Computer Science',
      code: 'CS101',
      attendance: 96,
      grade: 'A',
      credits: 3,
      teacher: 'Dr. Wilson',
      nextClass: '2024-01-16 9:00 AM'
    },
    {
      name: 'English Literature',
      code: 'ENG301',
      attendance: 90,
      grade: 'A-',
      credits: 3,
      teacher: 'Ms. Davis',
      nextClass: '2024-01-16 11:00 AM'
    },
    {
      name: 'History',
      code: 'HIS201',
      attendance: 85,
      grade: 'B',
      credits: 4,
      teacher: 'Prof. Brown',
      nextClass: '2024-01-17 1:00 PM'
    }
  ]

  const recentMessages = [
    {
      id: 1,
      from: 'Dr. Smith',
      subject: 'Assignment Due Tomorrow',
      timestamp: '2 hours ago',
      unread: true
    },
    {
      id: 2,
      from: 'Prof. Johnson',
      subject: 'Lab Schedule Change',
      timestamp: '5 hours ago',
      unread: true
    },
    {
      id: 3,
      from: 'Academic Office',
      subject: 'Semester Results Available',
      timestamp: '1 day ago',
      unread: false
    }
  ]

  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600'
    if (percentage >= 75) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'bg-green-100 text-green-800'
    if (grade.startsWith('B')) return 'bg-blue-100 text-blue-800'
    if (grade.startsWith('C')) return 'bg-yellow-100 text-yellow-800'
    return 'bg-red-100 text-red-800'
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {studentData.name}!
          </h1>
          <p className="text-gray-600">
            Student ID: {studentData.studentId} • {studentData.semester}
          </p>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Download Report Card
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Overall Attendance */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Attendance</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{studentData.overallAttendance}%</div>
            <Progress value={studentData.overallAttendance} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {studentData.overallAttendance >= 90 ? 'Excellent attendance!' : 'Keep improving'}
            </p>
          </CardContent>
        </Card>

        {/* Current GPA */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current GPA</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{studentData.currentGPA}</div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +0.2 from last semester
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Out of 4.0 scale
            </p>
          </CardContent>
        </Card>

        {/* Messages */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{studentData.unreadMessages}</div>
            <p className="text-xs text-muted-foreground mt-2">
              Unread messages
            </p>
            <Button variant="link" className="text-xs p-0 h-auto mt-1">
              View all messages →
            </Button>
          </CardContent>
        </Card>

        {/* Total Credits */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Credits Enrolled</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{studentData.totalCredits}</div>
            <p className="text-xs text-muted-foreground mt-2">
              Credit hours this semester
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Subjects Overview */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>My Subjects</CardTitle>
              <CardDescription>
                Attendance and grade overview for current semester
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subject</TableHead>
                    <TableHead>Teacher</TableHead>
                    <TableHead>Attendance</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>Credits</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subjects.map((subject) => (
                    <TableRow key={subject.code}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{subject.name}</div>
                          <div className="text-sm text-gray-500">{subject.code}</div>
                        </div>
                      </TableCell>
                      <TableCell>{subject.teacher}</TableCell>
                      <TableCell>
                        <div className={`font-medium ${getAttendanceColor(subject.attendance)}`}>
                          {subject.attendance}%
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getGradeColor(subject.grade)}>
                          {subject.grade}
                        </Badge>
                      </TableCell>
                      <TableCell>{subject.credits}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Classes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Upcoming Classes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {subjects.slice(0, 3).map((subject) => (
                <div key={subject.code} className="flex items-start space-x-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <BookOpen className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{subject.name}</p>
                    <p className="text-xs text-gray-500">{subject.nextClass}</p>
                    <p className="text-xs text-gray-500">{subject.teacher}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Messages */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Recent Messages
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentMessages.map((message) => (
                <div key={message.id} className="flex items-start space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs">
                      {message.from.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <p className="font-medium text-sm truncate">{message.from}</p>
                      {message.unread && (
                        <div className="h-2 w-2 bg-primary rounded-full" />
                      )}
                    </div>
                    <p className="text-xs text-gray-600 truncate">{message.subject}</p>
                    <p className="text-xs text-gray-500">{message.timestamp}</p>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full text-sm">
                View All Messages
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="h-4 w-4 mr-2" />
                View Full Schedule
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <GraduationCap className="h-4 w-4 mr-2" />
                Calculate GPA
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Download className="h-4 w-4 mr-2" />
                Download Transcripts
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
