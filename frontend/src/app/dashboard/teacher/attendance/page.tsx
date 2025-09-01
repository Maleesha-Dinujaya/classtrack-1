"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { attendanceAPI, teacherAPI, Attendance, Student } from "@/lib/api";

export default function TeacherAttendance() {
  const { user } = useAuth();
  const [students, setStudents] = useState<Student[]>([]);
  const [records, setRecords] = useState<Attendance[]>([]);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [newRecord, setNewRecord] = useState({
    student_id: "",
    subject: "",
    status: "present",
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.token) return;
      try {
        setLoading(true);
        const [studentsData, attendanceData] = await Promise.all([
          teacherAPI.getStudents(user.token),
          attendanceAPI.getAll(user.token),
        ]);
        setStudents(studentsData);
        setRecords(attendanceData);
        const uniqueSubjects = Array.from(
          new Set(attendanceData.map((r) => r.subject))
        );
        setSubjects(uniqueSubjects);
      } catch (error) {
        console.error("Error loading attendance data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  const handleSubmit = async () => {
    if (!user?.token || !newRecord.student_id || !newRecord.subject) return;
    try {
      const record = await attendanceAPI.markAttendance(user.token, {
        student_id: Number(newRecord.student_id),
        subject: newRecord.subject,
        status: newRecord.status,
        date: new Date().toISOString().split("T")[0],
      });
      setRecords([record, ...records]);
      if (!subjects.includes(record.subject)) {
        setSubjects([...subjects, record.subject]);
      }
      setNewRecord({ student_id: "", subject: "", status: "present" });
    } catch (error) {
      console.error("Error marking attendance:", error);
    }
  };

  const studentMap = Object.fromEntries(students.map((s) => [s.id, s]));

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p>Loading attendance...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Mark Attendance</CardTitle>
          <CardDescription>Select a student and update attendance</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <Label>Student</Label>
              <Select
                value={newRecord.student_id}
                onValueChange={(v) => setNewRecord({ ...newRecord, student_id: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select student" />
                </SelectTrigger>
                <SelectContent>
                  {students.map((s) => (
                    <SelectItem key={s.id} value={String(s.id)}>
                      {s.user.name} ({s.student_id})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Subject</Label>
              <Select
                value={newRecord.subject}
                onValueChange={(v) =>
                  setNewRecord({ ...newRecord, subject: v })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subject) => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Status</Label>
              <Select
                value={newRecord.status}
                onValueChange={(v) => setNewRecord({ ...newRecord, status: v })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="present">Present</SelectItem>
                  <SelectItem value="absent">Absent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={handleSubmit}>Save Attendance</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Attendance Records</CardTitle>
          <CardDescription>Recent entries</CardDescription>
        </CardHeader>
        <CardContent>
          {records.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Student</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {records.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>{record.date}</TableCell>
                    <TableCell>
                      {studentMap[record.student_id]?.user.name ||
                        record.student_id}
                    </TableCell>
                    <TableCell>{record.subject}</TableCell>
                    <TableCell
                      className={
                        record.status === "present"
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {record.status}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p>No attendance records yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

