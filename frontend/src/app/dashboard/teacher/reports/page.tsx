"use client"

import { useEffect, useState } from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/context/AuthContext"
import { useSubjects } from "@/context/SubjectsContext"
import {
  teacherAPI,
  attendanceAPI,
  Student,
  Grade,
  Attendance,
} from "@/lib/api"
import {
  Download,
  FileText,
  BarChart3,
  Users,
  Calendar as CalendarIcon,
  BookOpen,
  Mail,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"

export default function TeacherReports() {
  const { user } = useAuth()
  const { subjects, addSubject } = useSubjects()
  const [students, setStudents] = useState<Student[]>([])
  const [grades, setGrades] = useState<Grade[]>([])
  const [attendance, setAttendance] = useState<Attendance[]>([])
  const [selectedReportType, setSelectedReportType] = useState("all")
  const [selectedSubject, setSelectedSubject] = useState("all")

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.token) return
      try {
        const [studentsRes, gradesRes, attendanceRes] = await Promise.allSettled([
          teacherAPI.getStudents(user.token),
          teacherAPI.getGrades(user.token),
          attendanceAPI.getAll(user.token),
        ])

        if (studentsRes.status === "fulfilled") {
          setStudents(studentsRes.value)
        }
        if (gradesRes.status === "fulfilled") {
          setGrades(gradesRes.value)
          new Set(gradesRes.value.map((g) => g.subject)).forEach(addSubject)
        }
        if (attendanceRes.status === "fulfilled") {
          setAttendance(attendanceRes.value)
          new Set(attendanceRes.value.map((a) => a.subject)).forEach(addSubject)
        }
      } catch (error) {
        console.error("Error loading report data:", error)
      }
    }
    fetchData()
  }, [user, addSubject])

  const averageGrade = grades.length
    ? Number(
        (
          grades.reduce((sum, g) => sum + g.grade, 0) / grades.length
        ).toFixed(2)
      )
    : 0
  const attendanceRate = attendance.length
    ? Number(
        (
          (attendance.filter((r) => r.status === "present").length /
            attendance.length) *
          100
        ).toFixed(1)
      )
    : 0
  const totalStudents = students.length
  const subjectCount = subjects.length

  const availableReports = [
    {
      id: "class-performance",
      title: "Class Performance",
      description: "Overall grade distribution by subject",
      type: "grades",
      format: "PDF",
      size: "230 KB",
      lastGenerated: "2024-01-10",
      status: "available",
    },
    {
      id: "attendance-summary",
      title: "Attendance Summary",
      description: "Attendance records for all students",
      type: "attendance",
      format: "PDF",
      size: "180 KB",
      lastGenerated: "2024-01-11",
      status: "available",
    },
    {
      id: "student-roster",
      title: "Student Roster",
      description: "Complete list of students with contact details",
      type: "students",
      format: "CSV",
      size: "80 KB",
      lastGenerated: "2024-01-12",
      status: "available",
    },
  ]

  const reportTypes = [
    { value: "all", label: "All Reports" },
    { value: "grades", label: "Grade Reports" },
    { value: "attendance", label: "Attendance Reports" },
    { value: "students", label: "Student Reports" },
  ]

  const filteredReports = availableReports.filter(
    (r) => selectedReportType === "all" || r.type === selectedReportType
  )

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "available":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "processing":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-600" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800"
      case "processing":
        return "bg-yellow-100 text-yellow-800"
      case "error":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
    }
  }

  const handleDownload = (id: string) => {
    console.log("Downloading report:", id)
  }

  const handleGenerateCustomReport = () => {
    console.log("Generating report for subject:", selectedSubject)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Reports & Analytics
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Generate and download class reports
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export All
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <Users className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-sm font-medium">Students</p>
              <p className="text-lg font-bold text-blue-600">
                {totalStudents}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <BarChart3 className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm font-medium">Avg Grade</p>
              <p className="text-lg font-bold text-green-600">
                {averageGrade}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <CalendarIcon className="h-5 w-5 text-purple-600" />
                <span className="text-sm font-medium">Attendance</span>
              </div>
              <span className="text-sm font-semibold text-purple-600">
                {attendanceRate}%
              </span>
            </div>
            <Progress value={attendanceRate} className="h-2" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <BookOpen className="h-5 w-5 text-orange-600" />
            <div>
              <p className="text-sm font-medium">Subjects</p>
              <p className="text-lg font-bold text-orange-600">
                {subjectCount}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Available Reports</CardTitle>
                  <CardDescription>
                    Download class documents and analytics
                  </CardDescription>
                </div>
                <Select
                  value={selectedReportType}
                  onValueChange={setSelectedReportType}
                >
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    {reportTypes.map((t) => (
                      <SelectItem key={t.value} value={t.value}>
                        {t.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredReports.map((report) => (
                  <div
                    key={report.id}
                    className="border rounded-lg p-4 hover:bg-gray-50 transition-colors dark:hover:bg-gray-800/50"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <FileText className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                        <div className="flex-1">
                          <h3 className="font-semibold">{report.title}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                            {report.description}
                          </p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                            <span>Format: {report.format}</span>
                            <span>Size: {report.size}</span>
                            <span>Last updated: {report.lastGenerated}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          className={getStatusColor(report.status)}
                          variant="secondary"
                        >
                          <div className="flex items-center gap-1">
                            {getStatusIcon(report.status)}
                            {report.status
                              .charAt(0)
                              .toUpperCase() + report.status.slice(1)}
                          </div>
                        </Badge>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDownload(report.id)}
                          disabled={report.status !== "available"}
                          className="flex items-center gap-2"
                        >
                          <Download className="h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Custom Report</CardTitle>
              <CardDescription>Generate report by subject</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Subject</label>
                <Select
                  value={selectedSubject}
                  onValueChange={setSelectedSubject}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Subjects</SelectItem>
                    {subjects.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button
                className="w-full"
                onClick={handleGenerateCustomReport}
              >
                Generate Report
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild variant="outline" className="w-full justify-start">
                <Link href="/dashboard/teacher/attendance">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  Record Attendance
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start">
                <Link href="/dashboard/teacher/grades">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Add Grades
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start">
                <Link href="/dashboard/teacher/messages">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Message
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start">
                <Link href="/dashboard/teacher/students">
                  <Users className="h-4 w-4 mr-2" />
                  View Students
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

