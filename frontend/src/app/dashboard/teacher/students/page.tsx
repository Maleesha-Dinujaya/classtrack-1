'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/context/AuthContext'
import { teacherAPI, Student } from '@/lib/api'
import { Search, Plus, Mail, Edit } from 'lucide-react'

export default function TeacherStudentsPage() {
  const { user } = useAuth()
  const [students, setStudents] = useState<Student[]>([])
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('all')
  const [loading, setLoading] = useState(true)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newStudent, setNewStudent] = useState({
    email: '',
    password: '',
    name: '',
    grade_level: '',
    department: ''
  })
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingStudent, setEditingStudent] = useState<Student | null>(null)
  const [editData, setEditData] = useState({
    name: '',
    grade_level: '',
    department: ''
  })

  useEffect(() => {
    const fetchStudents = async () => {
      if (!user?.token) return
      try {
        setLoading(true)
        const studentsData = await teacherAPI.getStudents(user.token)
        setStudents(studentsData)
        setFilteredStudents(studentsData)
      } catch (error) {
        console.error('Error fetching students:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchStudents()
  }, [user])

  useEffect(() => {
    let result = students
    if (searchTerm) {
      result = result.filter(student =>
        student.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.student_id.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    if (selectedDepartment !== 'all') {
      result = result.filter(student => student.department === selectedDepartment)
    }
    setFilteredStudents(result)
  }, [searchTerm, selectedDepartment, students])

  const handleAddStudent = async () => {
    if (!user?.token) return
    try {
      await teacherAPI.addStudent(user.token, newStudent)
      const studentsData = await teacherAPI.getStudents(user.token)
      setStudents(studentsData)
      setIsAddDialogOpen(false)
      setNewStudent({ email: '', password: '', name: '', grade_level: '', department: '' })
    } catch (error) {
      console.error('Error adding student:', error)
    }
  }

  const openEditDialog = (student: Student) => {
    setEditingStudent(student)
    setEditData({
      name: student.user.name,
      grade_level: student.grade_level,
      department: student.department
    })
    setIsEditDialogOpen(true)
  }

  const handleUpdateStudent = async () => {
    if (!user?.token || !editingStudent) return
    try {
      await teacherAPI.updateStudent(user.token, editingStudent.id, editData)
      const studentsData = await teacherAPI.getStudents(user.token)
      setStudents(studentsData)
      setIsEditDialogOpen(false)
      setEditingStudent(null)
    } catch (error) {
      console.error('Error updating student:', error)
    }
  }

  const departments = [...new Set(students.map(student => student.department))]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading students...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Student Management</h1>
          <p className="text-gray-600">Manage your students, view their progress, and update records</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Student
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Student</DialogTitle>
              <DialogDescription>
                Create a new student account. The student will receive login credentials.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                  placeholder="John Doe"
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={newStudent.email}
                  onChange={(e) => setNewStudent({...newStudent, email: e.target.value})}
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={newStudent.password}
                  onChange={(e) => setNewStudent({...newStudent, password: e.target.value})}
                  placeholder="Enter a password"
                />
              </div>
              <div>
                <Label htmlFor="grade">Grade Level</Label>
                <Input
                  id="grade"
                  value={newStudent.grade_level}
                  onChange={(e) => setNewStudent({...newStudent, grade_level: e.target.value})}
                  placeholder="e.g., Freshman, Sophomore"
                />
              </div>
              <div>
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  value={newStudent.department}
                  onChange={(e) => setNewStudent({...newStudent, department: e.target.value})}
                  placeholder="e.g., Computer Science, Mathematics"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddStudent}>
                Add Student
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Student</DialogTitle>
            <DialogDescription>
              Update the student's information.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-name">Full Name</Label>
              <Input
                id="edit-name"
                value={editData.name}
                onChange={(e) => setEditData({...editData, name: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="edit-grade">Grade Level</Label>
              <Input
                id="edit-grade"
                value={editData.grade_level}
                onChange={(e) => setEditData({...editData, grade_level: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="edit-department">Department</Label>
              <Input
                id="edit-department"
                value={editData.department}
                onChange={(e) => setEditData({...editData, department: e.target.value})}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateStudent}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search students by name, email, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Departments" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map(dept => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Students</CardTitle>
          <CardDescription>
            {filteredStudents.length} student(s) found
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredStudents.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Student ID</TableHead>
                  <TableHead>Grade Level</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Status</TableHead>
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
                            {student.user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{student.user.name}</div>
                          <div className="text-sm text-gray-500">{student.user.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{student.student_id}</TableCell>
                    <TableCell>{student.grade_level}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{student.department}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={student.user.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                        {student.user.is_active ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="ghost" onClick={() => openEditDialog(student)}>
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
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">No students found</div>
              <Button onClick={() => {
                setSearchTerm('')
                setSelectedDepartment('all')
              }}>
                Clear Filters
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

