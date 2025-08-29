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
  Plus,
  Edit,
  Clock,
  AlertTriangle,
  BookOpen,
  Mail,
} from "lucide-react";

interface Student {
  id: string;
  name: string;
  email: string;
  class: string;
  attendance: number;
  currentGrade: string;
  lastActive: string;
  status: string;
}

export default function TeacherDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("all");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [studentId, setStudentId] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [phone, setPhone] = useState("");
  const { user } = useAuth();

  // Mock teacher data
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
    { id: "cs101", name: "CS101 - Introduction to Programming", students: 35, time: "9:00 AM" },
    { id: "cs201", name: "CS201 - Data Structures", students: 28, time: "11:00 AM" },
    { id: "cs301", name: "CS301 - Algorithms", students: 25, time: "2:00 PM" },
    { id: "cs401", name: "CS401 - Software Engineering", students: 22, time: "4:00 PM" },
  ];

  const [students, setStudents] = useState<Student[]>([
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
  ]);

  const recentActivity = [
    { type: "assignment", message: "CS101 Assignment 3 submissions are due tomorrow", time: "2 hours ago", urgent: true },
    { type: "grade", message: "23 assignments pending grading", time: "4 hours ago", urgent: false },
    { type: "message", message: "New message from Alex Johnson regarding project", time: "6 hours ago", urgent: false },
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
      case "active": return "bg-green-100 text-green-800";
      case "warning": return "bg-yellow-100 text-yellow-800";
      case "at-risk": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 90) return "text-green-600";
    if (percentage >= 75) return "text-yellow-600";
    return "text-red-600";
  };

  const addStudent = () => {
    if (!firstName || !lastName || !email || !studentId || !studentClass) return;

    const newStudent: Student = {
      id: studentId,
      name: `${firstName} ${lastName}`,
      email,
      class: studentClass,
      attendance: 0,
      currentGrade: "N/A",
      lastActive: "just now",
      status: "active",
    };

    setStudents((prev) => [...prev, newStudent]);
    setFirstName("");
    setLastName("");
    setEmail("");
    setStudentId("");
    setStudentClass("");
    setPhone("");
    setIsAddOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
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

      {/* Student Management */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
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
                        <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="John" />
                      </div>
                      <div className="space-y-2">
                        <Label>Last Name</Label>
                        <Input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Doe" />
                      </div>
                      <div className="space-y-2">
                        <Label>Email</Label>
                        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@student.edu" />
                      </div>
                      <div className="space-y-2">
                        <Label>Student ID</Label>
                        <Input value={studentId} onChange={(e) => setStudentId(e.target.value)} placeholder="STD001" />
                      </div>
                      <div className="space-y-2">
                        <Label>Class</Label>
                        <Select value={studentClass} onValueChange={setStudentClass}>
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
                        <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 (555) 123-4567" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsAddOpen(false)}>Cancel</Button>
                      <Button onClick={addStudent}>Add Student</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
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
                            <AvatarImage src="" alt={student.name} />
                            <AvatarFallback className="text-xs">
                              {student.name.split(" ").map((n) => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{student.name}</div>
                            <div className="text-sm text-gray-500">{student.id}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
