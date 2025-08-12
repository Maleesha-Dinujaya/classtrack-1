'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
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
  GraduationCap,
  TrendingUp,
  TrendingDown,
  Download,
  Calculator,
  Target,
  Award,
  BookOpen,
  Calendar,
  Star
} from 'lucide-react'

export default function StudentGrades() {
  const [selectedSemester, setSelectedSemester] = useState('current')
  const [gpaCalculatorInputs, setGpaCalculatorInputs] = useState([
    { subject: '', credits: '', grade: '' }
  ])

  // Mock data
  const gpaData = {
    current: 3.75,
    previous: 3.62,
    cumulative: 3.68,
    trend: 'up',
    totalCredits: 68,
    totalGradePoints: 250.2
  }

  const currentSemesterGrades = [
    {
      subject: 'Mathematics',
      code: 'MATH101',
      credits: 4,
      assignments: [
        { name: 'Assignment 1', score: 92, maxScore: 100, weight: 15 },
        { name: 'Assignment 2', score: 88, maxScore: 100, weight: 15 },
        { name: 'Midterm Exam', score: 85, maxScore: 100, weight: 35 },
        { name: 'Final Project', score: null, maxScore: 100, weight: 35 }
      ],
      currentGrade: 'A-',
      gpa: 3.7,
      teacher: 'Dr. Smith'
    },
    {
      subject: 'Physics',
      code: 'PHY201',
      credits: 4,
      assignments: [
        { name: 'Lab Report 1', score: 95, maxScore: 100, weight: 20 },
        { name: 'Lab Report 2', score: 91, maxScore: 100, weight: 20 },
        { name: 'Midterm Exam', score: 82, maxScore: 100, weight: 30 },
        { name: 'Final Exam', score: null, maxScore: 100, weight: 30 }
      ],
      currentGrade: 'B+',
      gpa: 3.3,
      teacher: 'Prof. Johnson'
    },
    {
      subject: 'Computer Science',
      code: 'CS101',
      credits: 3,
      assignments: [
        { name: 'Programming Assignment 1', score: 98, maxScore: 100, weight: 25 },
        { name: 'Programming Assignment 2', score: 95, maxScore: 100, weight: 25 },
        { name: 'Midterm Project', score: 92, maxScore: 100, weight: 25 },
        { name: 'Final Project', score: null, maxScore: 100, weight: 25 }
      ],
      currentGrade: 'A',
      gpa: 4.0,
      teacher: 'Dr. Wilson'
    },
    {
      subject: 'English Literature',
      code: 'ENG301',
      credits: 3,
      assignments: [
        { name: 'Essay 1', score: 87, maxScore: 100, weight: 30 },
        { name: 'Essay 2', score: 90, maxScore: 100, weight: 30 },
        { name: 'Final Essay', score: null, maxScore: 100, weight: 40 }
      ],
      currentGrade: 'A-',
      gpa: 3.7,
      teacher: 'Ms. Davis'
    },
    {
      subject: 'History',
      code: 'HIS201',
      credits: 4,
      assignments: [
        { name: 'Research Paper', score: 83, maxScore: 100, weight: 40 },
        { name: 'Presentation', score: 88, maxScore: 100, weight: 30 },
        { name: 'Final Exam', score: null, maxScore: 100, weight: 30 }
      ],
      currentGrade: 'B',
      gpa: 3.0,
      teacher: 'Prof. Brown'
    }
  ]

  const semesterHistory = [
    { semester: 'Fall 2024', gpa: 3.75, credits: 18, status: 'Current' },
    { semester: 'Spring 2024', gpa: 3.62, credits: 16, status: 'Completed' },
    { semester: 'Fall 2023', gpa: 3.45, credits: 17, status: 'Completed' },
    { semester: 'Spring 2023', gpa: 3.80, credits: 17, status: 'Completed' },
  ]

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'bg-green-100 text-green-800'
    if (grade.startsWith('B')) return 'bg-blue-100 text-blue-800'
    if (grade.startsWith('C')) return 'bg-yellow-100 text-yellow-800'
    return 'bg-red-100 text-red-800'
  }

  const getGpaColor = (gpa: number) => {
    if (gpa >= 3.5) return 'text-green-600'
    if (gpa >= 3.0) return 'text-blue-600'
    if (gpa >= 2.5) return 'text-yellow-600'
    return 'text-red-600'
  }

  const calculateCurrentGrade = (assignments: any[]) => {
    const completed = assignments.filter(a => a.score !== null)
    if (completed.length === 0) return 0

    const totalWeightedScore = completed.reduce((sum, a) => sum + (a.score / a.maxScore) * a.weight, 0)
    const totalWeight = completed.reduce((sum, a) => sum + a.weight, 0)

    return totalWeight > 0 ? (totalWeightedScore / totalWeight) * 100 : 0
  }

  const addGpaCalculatorRow = () => {
    setGpaCalculatorInputs([...gpaCalculatorInputs, { subject: '', credits: '', grade: '' }])
  }

  const removeGpaCalculatorRow = (index: number) => {
    setGpaCalculatorInputs(gpaCalculatorInputs.filter((_, i) => i !== index))
  }

  const calculateGPA = () => {
    const gradePoints = {
      'A+': 4.0, 'A': 4.0, 'A-': 3.7,
      'B+': 3.3, 'B': 3.0, 'B-': 2.7,
      'C+': 2.3, 'C': 2.0, 'C-': 1.7,
      'D+': 1.3, 'D': 1.0, 'F': 0.0
    }

    let totalGradePoints = 0
    let totalCredits = 0

    gpaCalculatorInputs.forEach(input => {
      const credits = parseFloat(input.credits)
      const gradePoint = gradePoints[input.grade as keyof typeof gradePoints]

      if (!isNaN(credits) && gradePoint !== undefined) {
        totalGradePoints += credits * gradePoint
        totalCredits += credits
      }
    })

    return totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : '0.00'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Grades & GPA</h1>
          <p className="text-gray-600">Track your academic performance and calculate your GPA</p>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Download Transcript
        </Button>
      </div>

      {/* GPA Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current GPA</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getGpaColor(gpaData.current)}`}>
              {gpaData.current}
            </div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +0.13 from last semester
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cumulative GPA</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getGpaColor(gpaData.cumulative)}`}>
              {gpaData.cumulative}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Overall academic performance
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Credits</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{gpaData.totalCredits}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Credits completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Class Rank</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">15</div>
            <p className="text-xs text-muted-foreground mt-1">
              Out of 150 students
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="current" className="space-y-6">
        <TabsList>
          <TabsTrigger value="current">Current Grades</TabsTrigger>
          <TabsTrigger value="history">Grade History</TabsTrigger>
          <TabsTrigger value="calculator">GPA Calculator</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-6">
          {/* Current Semester Grades */}
          <Card>
            <CardHeader>
              <CardTitle>Current Semester - Fall 2024</CardTitle>
              <CardDescription>Detailed breakdown of your current grades and assignments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {currentSemesterGrades.map((subject, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{subject.subject}</h3>
                        <p className="text-sm text-gray-500">{subject.code} • {subject.teacher} • {subject.credits} Credits</p>
                      </div>
                      <div className="text-right">
                        <Badge className={getGradeColor(subject.currentGrade)} variant="secondary">
                          {subject.currentGrade}
                        </Badge>
                        <p className={`text-sm mt-1 ${getGpaColor(subject.gpa)}`}>
                          GPA: {subject.gpa}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Current Grade Progress</span>
                        <span className="text-sm font-medium">
                          {calculateCurrentGrade(subject.assignments).toFixed(1)}%
                        </span>
                      </div>
                      <Progress value={calculateCurrentGrade(subject.assignments)} className="h-2" />
                    </div>

                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Assignments</h4>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Assignment</TableHead>
                            <TableHead>Score</TableHead>
                            <TableHead>Weight</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {subject.assignments.map((assignment, idx) => (
                            <TableRow key={idx}>
                              <TableCell className="font-medium">{assignment.name}</TableCell>
                              <TableCell>
                                {assignment.score !== null
                                  ? `${assignment.score}/${assignment.maxScore}`
                                  : 'Pending'
                                }
                              </TableCell>
                              <TableCell>{assignment.weight}%</TableCell>
                              <TableCell>
                                <Badge variant={assignment.score !== null ? 'default' : 'secondary'}>
                                  {assignment.score !== null ? 'Graded' : 'Pending'}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          {/* Semester History */}
          <Card>
            <CardHeader>
              <CardTitle>Academic History</CardTitle>
              <CardDescription>Your GPA progression over previous semesters</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Semester</TableHead>
                    <TableHead>GPA</TableHead>
                    <TableHead>Credits</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {semesterHistory.map((semester, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          {semester.semester}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={`font-medium ${getGpaColor(semester.gpa)}`}>
                          {semester.gpa}
                        </span>
                      </TableCell>
                      <TableCell>{semester.credits}</TableCell>
                      <TableCell>
                        <Badge variant={semester.status === 'Current' ? 'default' : 'secondary'}>
                          {semester.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* GPA Trend Chart Placeholder */}
          <Card>
            <CardHeader>
              <CardTitle>GPA Trend Analysis</CardTitle>
              <CardDescription>Visual representation of your academic progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">GPA trend chart would be displayed here</p>
                  <p className="text-sm text-gray-400">Showing improvement over time</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calculator" className="space-y-6">
          {/* GPA Calculator */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                GPA Calculator
              </CardTitle>
              <CardDescription>
                Calculate your potential GPA with hypothetical grades
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {gpaCalculatorInputs.map((input, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                    <div>
                      <Label>Subject</Label>
                      <Input
                        placeholder="e.g., Mathematics"
                        value={input.subject}
                        onChange={(e) => {
                          const newInputs = [...gpaCalculatorInputs]
                          newInputs[index].subject = e.target.value
                          setGpaCalculatorInputs(newInputs)
                        }}
                      />
                    </div>
                    <div>
                      <Label>Credits</Label>
                      <Input
                        type="number"
                        placeholder="3"
                        value={input.credits}
                        onChange={(e) => {
                          const newInputs = [...gpaCalculatorInputs]
                          newInputs[index].credits = e.target.value
                          setGpaCalculatorInputs(newInputs)
                        }}
                      />
                    </div>
                    <div>
                      <Label>Grade</Label>
                      <Select
                        value={input.grade}
                        onValueChange={(value) => {
                          const newInputs = [...gpaCalculatorInputs]
                          newInputs[index].grade = value
                          setGpaCalculatorInputs(newInputs)
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select grade" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="A+">A+ (4.0)</SelectItem>
                          <SelectItem value="A">A (4.0)</SelectItem>
                          <SelectItem value="A-">A- (3.7)</SelectItem>
                          <SelectItem value="B+">B+ (3.3)</SelectItem>
                          <SelectItem value="B">B (3.0)</SelectItem>
                          <SelectItem value="B-">B- (2.7)</SelectItem>
                          <SelectItem value="C+">C+ (2.3)</SelectItem>
                          <SelectItem value="C">C (2.0)</SelectItem>
                          <SelectItem value="C-">C- (1.7)</SelectItem>
                          <SelectItem value="D+">D+ (1.3)</SelectItem>
                          <SelectItem value="D">D (1.0)</SelectItem>
                          <SelectItem value="F">F (0.0)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => removeGpaCalculatorRow(index)}
                      disabled={gpaCalculatorInputs.length === 1}
                    >
                      Remove
                    </Button>
                  </div>
                ))}

                <div className="flex gap-2">
                  <Button variant="outline" onClick={addGpaCalculatorRow}>
                    Add Subject
                  </Button>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-center">
                    <h3 className="font-semibold text-lg">Calculated GPA</h3>
                    <div className="text-3xl font-bold text-blue-600 mt-2">
                      {calculateGPA()}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Based on entered grades and credits
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
