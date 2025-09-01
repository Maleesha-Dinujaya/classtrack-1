'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useAuth } from '@/context/AuthContext'
import { teacherAPI, Student } from '@/lib/api'
import { Users } from 'lucide-react'

export default function TeacherDashboard() {
  const { user } = useAuth()
  const [students, setStudents] = useState<Student[]>([])

  useEffect(() => {
    const fetchStudents = async () => {
      if (!user?.token) return
      try {
        const data = await teacherAPI.getStudents(user.token)
        setStudents(data)
      } catch (error) {
        console.error('Error loading students:', error)
      }
    }
    fetchStudents()
  }, [user])

  const teacherData = {
    name: user?.name ?? 'Teacher',
    employeeId: user ? `EMP${user.id}` : 'N/A',
    department: 'N/A',
    totalStudents: students.length,
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome, {teacherData.name}</h1>
        <p className="text-gray-600">Employee ID: {teacherData.employeeId}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teacherData.totalStudents}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Students</CardTitle>
          <CardDescription>{students.length} student(s)</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>ID</TableHead>
                <TableHead>Department</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((s) => (
                <TableRow key={s.id}>
                  <TableCell>{s.user.name}</TableCell>
                  <TableCell>{s.user.email}</TableCell>
                  <TableCell>{s.student_id}</TableCell>
                  <TableCell>{s.department}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
