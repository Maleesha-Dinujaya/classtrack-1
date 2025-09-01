'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useAuth } from '@/context/AuthContext'
import { studentAPI, Student, Attendance, Grade } from '@/lib/api'
import {
  Calendar,
  Download,
  BookOpen,
  CheckCircle,
  GraduationCap
} from 'lucide-react'

export default function StudentDashboard() {
  const { user } = useAuth()
  const [studentData, setStudentData] = useState<Student | null>(null)
  const [attendance, setAttendance] = useState<Attendance[]>([])
  const [grades, setGrades] = useState<Grade[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.token) return
      try {
        setLoading(true)
        const [profileData, attendanceData, gradesData] = await Promise.all([
          studentAPI.getProfile(user.token),
          studentAPI.getAttendance(user.token),
          studentAPI.getGrades(user.token)
        ])
        setStudentData(profileData)
        setAttendance(attendanceData)
        setGrades(gradesData)
      } catch (error) {
        console.error('Error fetching student data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [user])

  const overallAttendance = attendance.length > 0
    ? Math.round((attendance.filter(a => a.status === 'present').length / attendance.length) * 100)
    : 0

  const currentGPA = grades.length > 0
    ? grades.reduce((sum, grade) => sum + grade.grade, 0) / grades.length
    : 0

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {studentData?.user.name}!
          </h1>
          <p className="text-gray-600">
            Student ID: {studentData?.student_id} • {studentData?.grade_level}
          </p>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Download Report Card
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Attendance</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallAttendance}%</div>
            <Progress value={overallAttendance} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {overallAttendance >= 90 ? 'Excellent attendance!' : 'Keep improving'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current GPA</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentGPA.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-2">
              Out of 4.0 scale
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Grades Recorded</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{grades.length}</div>
            <p className="text-xs text-muted-foreground mt-2">
              Grades available
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Classes Attended</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {attendance.filter(a => a.status === 'present').length}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Out of {attendance.length} total
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Grades</CardTitle>
          <CardDescription>
            Your most recent grades across all subjects
          </CardDescription>
        </CardHeader>
        <CardContent>
          {grades.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Subject</TableHead>
                  <TableHead>Assignment Type</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {grades.slice(0, 5).map((grade) => (
                  <TableRow key={grade.id}>
                    <TableCell className="font-medium">{grade.subject}</TableCell>
                    <TableCell>{grade.assignment_type}</TableCell>
                    <TableCell>
                      <Badge variant={grade.grade >= 80 ? 'default' : 'destructive'}>
                        {grade.grade}%
                      </Badge>
                    </TableCell>
                    <TableCell>Recent</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No grades recorded yet.
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Attendance</CardTitle>
          <CardDescription>
            Your most recent class attendance records
          </CardDescription>
        </CardHeader>
        <CardContent>
          {attendance.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attendance.slice(0, 5).map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
                    <TableCell>{record.subject}</TableCell>
                    <TableCell>
                      <Badge
                        variant={record.status === 'present' ? 'default' : 'destructive'}
                        className={record.status === 'present' ? 'bg-green-100 text-green-800' : ''}
                      >
                        {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No attendance records yet.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

