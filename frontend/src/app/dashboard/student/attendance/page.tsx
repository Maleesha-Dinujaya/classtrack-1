'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar as CalendarIcon, Clock, CheckCircle, XCircle, AlertCircle, Filter, Download, TrendingUp, TrendingDown } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export default function StudentAttendance() {
  const [selectedSubject, setSelectedSubject] = useState('all')
  const [selectedMonth, setSelectedMonth] = useState('current')

  // Mock data
  const overallAttendance = {
    percentage: 92,
    totalClasses: 120,
    attended: 110,
    absent: 10,
    trend: 'up'
  }

  const subjects = [
    {
      id: 'math101',
      name: 'Mathematics',
      code: 'MATH101',
      attendance: 95,
      totalClasses: 24,
      attended: 23,
      absent: 1,
      trend: 'up',
      teacher: 'Dr. Smith',
      lastClass: '2024-01-12',
      nextClass: '2024-01-15'
    },
    {
      id: 'phy201',
      name: 'Physics',
      code: 'PHY201',
      attendance: 88,
      totalClasses: 22,
      attended: 19,
      absent: 3,
      trend: 'down',
      teacher: 'Prof. Johnson',
      lastClass: '2024-01-11',
      nextClass: '2024-01-15'
    },
    {
      id: 'cs101',
      name: 'Computer Science',
      code: 'CS101',
      attendance: 96,
      totalClasses: 26,
      attended: 25,
      absent: 1,
      trend: 'up',
      teacher: 'Dr. Wilson',
      lastClass: '2024-01-12',
      nextClass: '2024-01-16'
    },
    {
      id: 'eng301',
      name: 'English Literature',
      code: 'ENG301',
      attendance: 90,
      totalClasses: 20,
      attended: 18,
      absent: 2,
      trend: 'stable',
      teacher: 'Ms. Davis',
      lastClass: '2024-01-10',
      nextClass: '2024-01-16'
    },
    {
      id: 'his201',
      name: 'History',
      code: 'HIS201',
      attendance: 85,
      totalClasses: 18,
      attended: 15,
      absent: 3,
      trend: 'down',
      teacher: 'Prof. Brown',
      lastClass: '2024-01-09',
      nextClass: '2024-01-17'
    }
  ]

  const attendanceHistory = [
    { date: '2024-01-12', subject: 'Mathematics', status: 'present', time: '10:00 AM' },
    { date: '2024-01-12', subject: 'Computer Science', status: 'present', time: '2:00 PM' },
    { date: '2024-01-11', subject: 'Physics', status: 'present', time: '11:00 AM' },
    { date: '2024-01-11', subject: 'English Literature', status: 'absent', time: '3:00 PM' },
    { date: '2024-01-10', subject: 'History', status: 'present', time: '1:00 PM' },
    { date: '2024-01-10', subject: 'Mathematics', status: 'present', time: '10:00 AM' },
    { date: '2024-01-09', subject: 'Physics', status: 'absent', time: '11:00 AM' },
    { date: '2024-01-09', subject: 'Computer Science', status: 'present', time: '2:00 PM' },
  ]

  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600'
    if (percentage >= 75) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getAttendanceBarColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-green-500'
    if (percentage >= 75) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-600" />
      default:
        return <div className="h-4 w-4" />
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'absent':
        return <XCircle className="h-4 w-4 text-red-600" />
      case 'late':
        return <AlertCircle className="h-4 w-4 text-yellow-600" />
      default:
        return null
    }
  }

  const filteredHistory = attendanceHistory.filter(record => {
    if (selectedSubject === 'all') return true
    const subject = subjects.find(s => s.name === record.subject)
    return subject?.id === selectedSubject
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Attendance Tracking</h1>
          <p className="text-gray-600">Monitor your class attendance and track your progress</p>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export Attendance Report
        </Button>
      </div>

      {/* Overall Attendance Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Overall Attendance Summary
            <div className="flex items-center gap-2">
              {getTrendIcon(overallAttendance.trend)}
              <span className={`text-sm ${overallAttendance.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {overallAttendance.trend === 'up' ? 'Improving' : 'Declining'}
              </span>
            </div>
          </CardTitle>
          <CardDescription>Your attendance across all subjects this semester</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className={`text-3xl font-bold ${getAttendanceColor(overallAttendance.percentage)}`}>
                {overallAttendance.percentage}%
              </div>
              <p className="text-sm text-gray-500 mt-1">Overall Attendance</p>
              <Progress
                value={overallAttendance.percentage}
                className="mt-2 h-2"
              />
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">{overallAttendance.totalClasses}</div>
              <p className="text-sm text-gray-500 mt-1">Total Classes</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{overallAttendance.attended}</div>
              <p className="text-sm text-gray-500 mt-1">Classes Attended</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600">{overallAttendance.absent}</div>
              <p className="text-sm text-gray-500 mt-1">Classes Missed</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Subject-wise Attendance */}
      <Card>
        <CardHeader>
          <CardTitle>Subject-wise Attendance</CardTitle>
          <CardDescription>Detailed attendance breakdown for each subject</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {subjects.map((subject) => (
              <div key={subject.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div>
                      <h3 className="font-semibold">{subject.name}</h3>
                      <p className="text-sm text-gray-500">{subject.code} • {subject.teacher}</p>
                    </div>
                    {getTrendIcon(subject.trend)}
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-bold ${getAttendanceColor(subject.attendance)}`}>
                      {subject.attendance}%
                    </div>
                    <p className="text-sm text-gray-500">
                      {subject.attended}/{subject.totalClasses} classes
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <Progress
                    value={subject.attendance}
                    className="h-3"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Last: {subject.lastClass}</span>
                    <span>Next: {subject.nextClass}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-3 text-sm">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>{subject.attended} Present</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <XCircle className="h-4 w-4 text-red-600" />
                      <span>{subject.absent} Absent</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Attendance History */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Attendance History</CardTitle>
              <CardDescription>Recent attendance records</CardDescription>
            </div>
            <div className="flex gap-2">
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  {subjects.map((subject) => (
                    <SelectItem key={subject.id} value={subject.id}>
                      {subject.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current">This Month</SelectItem>
                  <SelectItem value="last">Last Month</SelectItem>
                  <SelectItem value="all">All Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredHistory.map((record, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4 text-gray-400" />
                      {new Date(record.date).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{record.subject}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      {record.time}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(record.status)}
                      <Badge
                        variant={record.status === 'present' ? 'default' : 'destructive'}
                        className={record.status === 'present' ? 'bg-green-100 text-green-800' : ''}
                      >
                        {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                      </Badge>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Attendance Goals */}
      <Card>
        <CardHeader>
          <CardTitle>Attendance Goals</CardTitle>
          <CardDescription>Track your progress towards attendance targets</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div>
                <h3 className="font-semibold">Minimum Attendance Requirement</h3>
                <p className="text-sm text-gray-600">You need at least 75% attendance to be eligible for exams</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600">✓</div>
                <p className="text-sm text-gray-600">Goal Met</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div>
                <h3 className="font-semibold">Excellent Attendance (90%+)</h3>
                <p className="text-sm text-gray-600">Maintain 90%+ attendance for academic excellence recognition</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600">✓</div>
                <p className="text-sm text-gray-600">Goal Met</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
