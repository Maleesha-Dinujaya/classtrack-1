'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Progress } from '@/components/ui/progress'
import {
  Download,
  FileText,
  Calendar as CalendarIcon,
  GraduationCap,
  TrendingUp,
  BarChart3,
  PieChart,
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
  Target,
  Award
} from 'lucide-react'
import { format } from 'date-fns'

export default function StudentReports() {
  const [selectedSemester, setSelectedSemester] = useState('semester1')
  const [selectedDateRange, setSelectedDateRange] = useState<any>()
  const [selectedReportType, setSelectedReportType] = useState('all')

  // Mock data
  const availableReports = [
    {
      id: 'transcript',
      title: 'Official Transcript',
      description: 'Complete academic record with all courses, grades, and GPA',
      type: 'academic',
      format: 'PDF',
      size: '245 KB',
      lastGenerated: '2024-01-10',
      status: 'available'
    },
    {
      id: 'grade-report',
      title: 'Grade Report - Current Semester',
      description: 'Detailed grades and performance for Semester 1',
      type: 'academic',
      format: 'PDF',
      size: '180 KB',
      lastGenerated: '2024-01-12',
      status: 'available'
    },
    {
      id: 'attendance-report',
      title: 'Attendance Summary',
      description: 'Comprehensive attendance report for all subjects',
      type: 'attendance',
      format: 'PDF',
      size: '156 KB',
      lastGenerated: '2024-01-11',
      status: 'available'
    },
    {
      id: 'progress-report',
      title: 'Academic Progress Report',
      description: 'Semester-wise academic progress and trends',
      type: 'analytics',
      format: 'PDF',
      size: '320 KB',
      lastGenerated: '2024-01-09',
      status: 'available'
    },
    {
      id: 'certificate',
      title: 'Enrollment Certificate',
      description: 'Official certificate of current enrollment status',
      type: 'administrative',
      format: 'PDF',
      size: '98 KB',
      lastGenerated: '2024-01-08',
      status: 'available'
    },
    {
      id: 'scholarship-report',
      title: 'Scholarship Eligibility Report',
      description: 'Academic performance report for scholarship applications',
      type: 'academic',
      format: 'PDF',
      size: '210 KB',
      lastGenerated: '2024-01-05',
      status: 'processing'
    }
  ]

  const quickStats = {
    totalCredits: 68,
    currentGPA: 3.75,
    overallAttendance: 92,
    completedCourses: 18,
    academicStanding: 'Good Standing',
    expectedGraduation: 'Semester 8'
  }

  const semesterOptions = [
    { value: 'semester1', label: 'Semester 1 (Current)' },
    { value: 'semester2', label: 'Semester 2' },
    { value: 'semester3', label: 'Semester 3' },
    { value: 'semester4', label: 'Semester 4' },
    { value: 'semester5', label: 'Semester 5' },
    { value: 'semester6', label: 'Semester 6' },
    { value: 'semester7', label: 'Semester 7' },
    { value: 'semester8', label: 'Semester 8' },
    { value: 'all', label: 'All Semesters' }
  ]

  const reportTypes = [
    { value: 'all', label: 'All Reports' },
    { value: 'academic', label: 'Academic Reports' },
    { value: 'attendance', label: 'Attendance Reports' },
    { value: 'analytics', label: 'Analytics Reports' },
    { value: 'administrative', label: 'Administrative Reports' }
  ]

  const filteredReports = availableReports.filter(report =>
    selectedReportType === 'all' || report.type === selectedReportType
  )

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'processing':
        return <Clock className="h-4 w-4 text-yellow-600" />
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-600" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800'
      case 'processing':
        return 'bg-yellow-100 text-yellow-800'
      case 'error':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'academic':
        return <GraduationCap className="h-5 w-5 text-blue-600" />
      case 'attendance':
        return <CalendarIcon className="h-5 w-5 text-green-600" />
      case 'analytics':
        return <BarChart3 className="h-5 w-5 text-purple-600" />
      case 'administrative':
        return <FileText className="h-5 w-5 text-gray-600" />
      default:
        return <FileText className="h-5 w-5 text-gray-600" />
    }
  }

  const handleDownload = (reportId: string) => {
    // In a real app, this would trigger the download
    console.log('Downloading report:', reportId)
  }

  const handleGenerateCustomReport = () => {
    // In a real app, this would generate a custom report
    console.log('Generating custom report for:', selectedSemester, selectedDateRange)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Academic Reports</h1>
          <p className="text-gray-600">Download and manage your academic documents</p>
        </div>
        <Button className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Request Custom Report
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Current GPA</p>
                <p className="text-lg font-bold text-blue-600">{quickStats.currentGPA}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-sm font-medium">Total Credits</p>
                <p className="text-lg font-bold text-green-600">{quickStats.totalCredits}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-purple-600" />
              <div>
                <p className="text-sm font-medium">Attendance</p>
                <p className="text-lg font-bold text-purple-600">{quickStats.overallAttendance}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-600" />
              <div>
                <p className="text-sm font-medium">Completed</p>
                <p className="text-lg font-bold text-emerald-600">{quickStats.completedCourses}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-600" />
              <div>
                <p className="text-sm font-medium">Standing</p>
                <p className="text-xs font-bold text-yellow-600">Good</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-indigo-600" />
              <div>
                <p className="text-sm font-medium">Graduation</p>
                <p className="text-xs font-bold text-indigo-600">Spring 2026</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Available Reports */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Available Reports</CardTitle>
                  <CardDescription>Download your academic documents and reports</CardDescription>
                </div>
                <Select value={selectedReportType} onValueChange={setSelectedReportType}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    {reportTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredReports.map((report) => (
                  <div key={report.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        {getTypeIcon(report.type)}
                        <div className="flex-1">
                          <h3 className="font-semibold">{report.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{report.description}</p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                            <span>Format: {report.format}</span>
                            <span>Size: {report.size}</span>
                            <span>Last updated: {report.lastGenerated}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(report.status)} variant="secondary">
                          <div className="flex items-center gap-1">
                            {getStatusIcon(report.status)}
                            {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                          </div>
                        </Badge>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDownload(report.id)}
                          disabled={report.status !== 'available'}
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

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Custom Report Generator */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Custom Report
              </CardTitle>
              <CardDescription>Generate customized academic reports</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Semester</label>
                <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select semester" />
                  </SelectTrigger>
                  <SelectContent>
                    {semesterOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Date Range</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full mt-1 justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDateRange?.from ? (
                        selectedDateRange.to ? (
                          <>
                            {format(selectedDateRange.from, "LLL dd, y")} -{" "}
                            {format(selectedDateRange.to, "LLL dd, y")}
                          </>
                        ) : (
                          format(selectedDateRange.from, "LLL dd, y")
                        )
                      ) : (
                        <span>Pick a date range</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={selectedDateRange?.from}
                      selected={selectedDateRange}
                      onSelect={setSelectedDateRange}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <Button
                className="w-full"
                onClick={handleGenerateCustomReport}
              >
                Generate Report
              </Button>
            </CardContent>
          </Card>

          {/* Academic Progress Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Progress Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Degree Progress</span>
                  <span>68/120 credits</span>
                </div>
                <Progress value={56.7} className="h-2" />
                <p className="text-xs text-gray-500 mt-1">56.7% complete</p>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Core Requirements</span>
                  <span>32/45 credits</span>
                </div>
                <Progress value={71.1} className="h-2" />
                <p className="text-xs text-gray-500 mt-1">71.1% complete</p>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Major Requirements</span>
                  <span>24/48 credits</span>
                </div>
                <Progress value={50} className="h-2" />
                <p className="text-xs text-gray-500 mt-1">50% complete</p>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Electives</span>
                  <span>12/27 credits</span>
                </div>
                <Progress value={44.4} className="h-2" />
                <p className="text-xs text-gray-500 mt-1">44.4% complete</p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                Request Official Transcript
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Award className="h-4 w-4 mr-2" />
                View Degree Audit
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <CalendarIcon className="h-4 w-4 mr-2" />
                Print Class Schedule
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <CheckCircle className="h-4 w-4 mr-2" />
                Enrollment Verification
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
