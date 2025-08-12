'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Users,
  Search,
  Filter,
  Plus,
  Edit,
  Mail,
  Phone,
  MapPin,
  Calendar,
  GraduationCap,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Download,
  Upload,
  MoreHorizontal,
  Eye
} from 'lucide-react'

export default function TeacherStudents() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedClass, setSelectedClass] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedStudent, setSelectedStudent] = useState<any>(null)
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table')

  // Mock data
  const classes = [
    { id: 'cs101', name: 'CS101 - Introduction to Programming', students: 35 },
    { id: 'cs201', name: 'CS201 - Data Structures', students: 28 },
    { id: 'cs301', name: 'CS301 - Algorithms', students: 25 },
    { id: 'cs401', name: 'CS401 - Software Engineering', students: 22 },
  ]

  const students = [
    {
      id: 'STD001',
      name: 'John Doe',
      email: 'john@student.edu',
      phone: '+1 (555) 123-4567',
      address: '123 Campus St, University City',
      class: 'cs101',
      className: 'CS101 - Introduction to Programming',
      attendance: 92,
      currentGrade: 'A',
      gpa: 3.8,
      lastActive: '2 hours ago',
      status: 'active',
      enrollmentDate: '2023-08-28',
      assignments: [
        { name: 'Assignment 1', score: 92, status: 'completed' },
        { name: 'Assignment 2', score: 88, status: 'completed' },
        { name: 'Midterm', score: 85, status: 'completed' },
        { name: 'Final Project', score: null, status: 'pending' }
      ],
      recentActivity: [
        { type: 'submission', message: 'Submitted Assignment 2', date: '2024-01-12' },
        { type: 'grade', message: 'Received grade for Assignment 1', date: '2024-01-10' },
        { type: 'attendance', message: 'Attended lecture', date: '2024-01-10' }
      ]
    },
    {
      id: 'STD002',
      name: 'Jane Smith',
      email: 'jane@student.edu',
      phone: '+1 (555) 234-5678',
      address: '456 College Ave, University City',
      class: 'cs101',
      className: 'CS101 - Introduction to Programming',
      attendance: 88,
      currentGrade: 'B+',
      gpa: 3.5,
      lastActive: '1 day ago',
      status: 'active',
      enrollmentDate: '2023-08-28',
      assignments: [
        { name: 'Assignment 1', score: 85, status: 'completed' },
        { name: 'Assignment 2', score: 90, status: 'completed' },
        { name: 'Midterm', score: 88, status: 'completed' },
        { name: 'Final Project', score: null, status: 'pending' }
      ],
      recentActivity: [
        { type: 'submission', message: 'Submitted Assignment 2', date: '2024-01-11' },
        { type: 'attendance', message: 'Attended lecture', date: '2024-01-09' }
      ]
    },
    {
      id: 'STD003',
      name: 'Mike Wilson',
      email: 'mike@student.edu',
      phone: '+1 (555) 345-6789',
      address: '789 Student Blvd, University City',
      class: 'cs201',
      className: 'CS201 - Data Structures',
      attendance: 76,
      currentGrade: 'B',
      gpa: 3.2,
      lastActive: '3 hours ago',
      status: 'warning',
      enrollmentDate: '2023-08-28',
      assignments: [
        { name: 'Assignment 1', score: 78, status: 'completed' },
        { name: 'Assignment 2', score: 82, status: 'completed' },
        { name: 'Midterm', score: 75, status: 'completed' },
        { name: 'Final Project', score: null, status: 'pending' }
      ],
      recentActivity: [
        { type: 'message', message: 'Sent message about assignment', date: '2024-01-12' },
        { type: 'attendance', message: 'Missed lecture', date: '2024-01-10' }
      ]
    },
    {
      id: 'STD004',
      name: 'Sarah Davis',
      email: 'sarah@student.edu',
      phone: '+1 (555) 456-7890',
      address: '321 Academy Rd, University City',
      class: 'cs301',
      className: 'CS301 - Algorithms',
      attendance: 95,
      currentGrade: 'A',
      gpa: 3.9,
      lastActive: '30 minutes ago',
      status: 'active',
      enrollmentDate: '2023-08-28',
      assignments: [
        { name: 'Assignment 1', score: 95, status: 'completed' },
        { name: 'Assignment 2', score: 98, status: 'completed' },
        { name: 'Midterm', score: 92, status: 'completed' },
        { name: 'Final Project', score: null, status: 'pending' }
      ],
      recentActivity: [
        { type: 'submission', message: 'Submitted Assignment 2 early', date: '2024-01-12' },
        { type: 'attendance', message: 'Attended lecture', date: '2024-01-12' }
      ]
    },
    {
      id: 'STD005',
      name: 'Tom Brown',
      email: 'tom@student.edu',
      phone: '+1 (555) 567-8901',
      address: '654 Scholar St, University City',
      class: 'cs101',
      className: 'CS101 - Introduction to Programming',
      attendance: 65,
      currentGrade: 'C',
      gpa: 2.8,
      lastActive: '2 days ago',
      status: 'at-risk',
      enrollmentDate: '2023-08-28',
      assignments: [
        { name: 'Assignment 1', score: 72, status: 'completed' },
        { name: 'Assignment 2', score: 68, status: 'completed' },
        { name: 'Midterm', score: 65, status: 'completed' },
        { name: 'Final Project', score: null, status: 'pending' }
      ],
      recentActivity: [
        { type: 'grade', message: 'Received low grade on Midterm', date: '2024-01-08' },
        { type: 'attendance', message: 'Missed multiple lectures', date: '2024-01-05' }
      ]
    }
  ]

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesClass = selectedClass === 'all' || student.class === selectedClass
    const matchesStatus = selectedStatus === 'all' || student.status === selectedStatus
    return matchesSearch && matchesClass && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'warning':
        return 'bg-yellow-100 text-yellow-800'
      case 'at-risk':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'text-green-600'
    if (grade.startsWith('B')) return 'text-blue-600'
    if (grade.startsWith('C')) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600'
    if (percentage >= 75) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Student Management</h1>
          <p className="text-gray-600">Manage students, track performance, and communicate</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Import Students
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Student
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Student</DialogTitle>
                <DialogDescription>
                  Enter student information to add them to your class
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>First Name</Label>
                  <Input placeholder="John" />
                </div>
                <div className="space-y-2">
                  <Label>Last Name</Label>
                  <Input placeholder="Doe" />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input type="email" placeholder="john@student.edu" />
                </div>
                <div className="space-y-2">
                  <Label>Student ID</Label>
                  <Input placeholder="STD001" />
                </div>
                <div className="space-y-2">
                  <Label>Class</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      {classes.map((cls) => (
                        <SelectItem key={cls.id} value={cls.id}>
                          {cls.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input placeholder="+1 (555) 123-4567" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Add Student</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search students by name, email, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Filter by class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                {classes.map((cls) => (
                  <SelectItem key={cls.id} value={cls.id}>
                    {cls.name.split(' - ')[0]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="at-risk">At Risk</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Student List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Students ({filteredStudents.length})</CardTitle>
              <CardDescription>Manage and track student performance</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'table' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('table')}
              >
                Table
              </Button>
              <Button
                variant={viewMode === 'cards' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('cards')}
              >
                Cards
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {viewMode === 'table' ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Attendance</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>GPA</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs">
                            {student.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{student.name}</div>
                          <div className="text-sm text-gray-500">{student.id}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {student.class.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className={`font-medium ${getAttendanceColor(student.attendance)}`}>
                        {student.attendance}%
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className={`font-medium ${getGradeColor(student.currentGrade)}`}>
                        {student.currentGrade}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className={`font-medium ${getGradeColor(student.currentGrade)}`}>
                        {student.gpa}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(student.status)}>
                        {student.status.replace('-', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">
                      {student.lastActive}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setSelectedStudent(student)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Mail className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredStudents.map((student) => (
                <Card key={student.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>
                            {student.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{student.name}</h3>
                          <p className="text-sm text-gray-500">{student.id}</p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(student.status)}>
                        {student.status.replace('-', ' ')}
                      </Badge>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span>Class:</span>
                        <Badge variant="outline">{student.class.toUpperCase()}</Badge>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Attendance:</span>
                        <span className={getAttendanceColor(student.attendance)}>
                          {student.attendance}%
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Grade:</span>
                        <span className={getGradeColor(student.currentGrade)}>
                          {student.currentGrade} ({student.gpa})
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Last Active:</span>
                        <span className="text-gray-500">{student.lastActive}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        onClick={() => setSelectedStudent(student)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline">
                        <Mail className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Student Detail Modal */}
      {selectedStudent && (
        <Dialog open={!!selectedStudent} onOpenChange={() => setSelectedStudent(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>
                    {selectedStudent.name.split(' ').map((n: string) => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div>{selectedStudent.name}</div>
                  <div className="text-sm text-gray-500">{selectedStudent.id}</div>
                </div>
              </DialogTitle>
            </DialogHeader>

            <Tabs defaultValue="overview" className="mt-4">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="assignments">Assignments</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
                <TabsTrigger value="contact">Contact</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{selectedStudent.attendance}%</div>
                    <div className="text-sm text-gray-600">Attendance</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{selectedStudent.currentGrade}</div>
                    <div className="text-sm text-gray-600">Current Grade</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{selectedStudent.gpa}</div>
                    <div className="text-sm text-gray-600">GPA</div>
                  </div>
                  <div className="text-center p-3 bg-yellow-50 rounded-lg">
                    <Badge className={getStatusColor(selectedStudent.status)}>
                      {selectedStudent.status.replace('-', ' ')}
                    </Badge>
                    <div className="text-sm text-gray-600 mt-1">Status</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Class Information</h4>
                    <div className="space-y-1 text-sm">
                      <div>Class: {selectedStudent.className}</div>
                      <div>Enrolled: {selectedStudent.enrollmentDate}</div>
                      <div>Last Active: {selectedStudent.lastActive}</div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="assignments" className="space-y-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Assignment</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedStudent.assignments.map((assignment: any, index: number) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{assignment.name}</TableCell>
                        <TableCell>
                          {assignment.score !== null ? `${assignment.score}/100` : 'Pending'}
                        </TableCell>
                        <TableCell>
                          <Badge variant={assignment.status === 'completed' ? 'default' : 'secondary'}>
                            {assignment.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>

              <TabsContent value="activity" className="space-y-4">
                <div className="space-y-3">
                  {selectedStudent.recentActivity.map((activity: any, index: number) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        {activity.type === 'submission' && <Upload className="h-4 w-4 text-blue-600" />}
                        {activity.type === 'grade' && <GraduationCap className="h-4 w-4 text-blue-600" />}
                        {activity.type === 'attendance' && <Calendar className="h-4 w-4 text-blue-600" />}
                        {activity.type === 'message' && <Mail className="h-4 w-4 text-blue-600" />}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{activity.message}</p>
                        <p className="text-sm text-gray-500">{activity.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="contact" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Contact Information</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{selectedStudent.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{selectedStudent.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{selectedStudent.address}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Quick Actions</h4>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start">
                        <Mail className="h-4 w-4 mr-2" />
                        Send Message
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Phone className="h-4 w-4 mr-2" />
                        Schedule Meeting
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Download className="h-4 w-4 mr-2" />
                        Download Report
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
