"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Users,
  Calendar,
  GraduationCap,
  MessageSquare,
  Download,
  Search,
  Filter,
  Plus,
  Edit,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  BookOpen,
  Mail,
} from "lucide-react";

export default function TeacherDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("all");
  const [isMarkingAttendance, setIsMarkingAttendance] = useState(false);
  const { user } = useAuth();

  // Mock data - in real app this would come from API
  const teacherData = {
    name: user?.name ?? "Teacher",
    employeeId: "EMP001",
    department: "Computer Science",
    totalStudents: 145,
    todayClasses: 4,
    pendingGrades: 23,
    unreadMessages: 7,
  };

  const classes = [
    {
      id: "cs101",
      name: "CS101 - Introduction to Programming",
      students: 35,
      time: "9:00 AM",
    },
    {
      id: "cs201",
      name: "CS201 - Data Structures",
      students: 28,
      time: "11:00 AM",
    },
    { id: "cs301", name: "CS301 - Algorithms", students: 25, time: "2:00 PM" },
    {
      id: "cs401",
      name: "CS401 - Software Engineering",
      students: 22,
      time: "4:00 PM",
    },
  ];

  const students = [
    {
      id: "STD001",
      name: "Alex Johnson",
      email: "john@student.edu",
      class: "cs101",
      attendance: 92,
      currentGrade: "A",
      lastActive: "2 hours ago",
      status: "active",
    },
    {
      id: "STD002",
      name: "Jane Smith",
      email: "jane@student.edu",
      class: "cs101",
      attendance: 88,
      currentGrade: "B+",
      lastActive: "1 day ago",
      status: "active",
    },
    {
      id: "STD003",
      name: "Mike Wilson",
      email: "mike@student.edu",
      class: "cs201",
      attendance: 76,
      currentGrade: "B",
      lastActive: "3 hours ago",
      status: "warning",
    },
    {
      id: "STD004",
      name: "Sarah Davis",
      email: "sarah@student.edu",
      class: "cs301",
      attendance: 95,
      currentGrade: "A",
      lastActive: "30 minutes ago",
      status: "active",
    },
    {
      id: "STD005",
      name: "Tom Brown",
      email: "tom@student.edu",
      class: "cs101",
      attendance: 65,
      currentGrade: "C",
      lastActive: "2 days ago",
      status: "at-risk",
    },
  ];

  const recentActivity = [
    {
      type: "assignment",
      message: "CS101 Assignment 3 submissions are due tomorrow",
      time: "2 hours ago",
      urgent: true,
    },
    {
      type: "grade",
      message: "23 assignments pending grading",
      time: "4 hours ago",
      urgent: false,
    },
    {
      type: "message",
      message: "New message from Alex Johnson regarding project",
      time: "6 hours ago",
      urgent: false,
    },
  ];

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass =
      selectedClass === "all" || student.class === selectedClass;
    return matchesSearch && matchesClass;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "warning":
        return "bg-yellow-100 text-yellow-800";
      case "at-risk":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 90) return "text-green-600";
    if (percentage >= 75) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome, {teacherData.name}
          </h1>
          <p className="text-gray-600">
            {teacherData.department} • Employee ID: {teacherData.employeeId}
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Mark Attendance
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Mark Attendance</DialogTitle>
                <DialogDescription>
                  Select a class and mark attendance for today's session
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a class" />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.map((cls) => (
                      <SelectItem key={cls.id} value={cls.id}>
                        {cls.name} ({cls.students} students)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {/* Student attendance checkboxes would go here */}
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Save Attendance</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Generate Reports
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Students
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {teacherData.totalStudents}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Across all classes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Today's Classes
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teacherData.todayClasses}</div>
            <p className="text-xs text-muted-foreground mt-2">
              Scheduled for today
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Grades
            </CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {teacherData.pendingGrades}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Assignments to grade
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {teacherData.unreadMessages}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Unread messages
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Student Management */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Student Management</CardTitle>
                  <CardDescription>
                    Manage students, view attendance, and update grades
                  </CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" className="flex items-center gap-2">
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

              {/* Search and Filter */}
              <div className="flex gap-4 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search students..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Classes</SelectItem>
                    {classes.map((cls) => (
                      <SelectItem key={cls.id} value={cls.id}>
                        {cls.name.split(" - ")[0]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>

            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Attendance</TableHead>
                    <TableHead>Grade</TableHead>
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
                              {student.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{student.name}</div>
                            <div className="text-sm text-gray-500">
                              {student.id}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {student.class.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div
                          className={`font-medium ${getAttendanceColor(student.attendance)}`}
                        >
                          {student.attendance}%
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {student.currentGrade}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(student.status)}>
                          {student.status.replace("-", " ")}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
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
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Today's Classes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Today's Classes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {classes.map((cls) => (
                <div
                  key={cls.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-sm">
                      {cls.name.split(" - ")[1]}
                    </p>
                    <p className="text-xs text-gray-500">
                      {cls.time} • {cls.students} students
                    </p>
                  </div>
                  <Button size="sm" variant="outline">
                    <Calendar className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div
                    className={`p-2 rounded-lg ${activity.urgent ? "bg-red-100" : "bg-blue-100"}`}
                  >
                    {activity.type === "assignment" && (
                      <BookOpen className="h-4 w-4 text-red-600" />
                    )}
                    {activity.type === "grade" && (
                      <GraduationCap className="h-4 w-4 text-blue-600" />
                    )}
                    {activity.type === "message" && (
                      <MessageSquare className="h-4 w-4 text-blue-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
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
                Schedule Class
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <GraduationCap className="h-4 w-4 mr-2" />
                Grade Assignments
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <MessageSquare className="h-4 w-4 mr-2" />
                Send Announcement
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Download className="h-4 w-4 mr-2" />
                Export Class Data
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
