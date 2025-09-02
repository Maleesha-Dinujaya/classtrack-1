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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { useAuth } from "@/context/AuthContext";
import { useSubjects } from "@/context/SubjectsContext";
import { teacherAPI, Grade, Student } from "@/lib/api";

export default function TeacherGrades() {
  const { user } = useAuth();
  const { subjects, addSubject } = useSubjects();
  const [students, setStudents] = useState<Student[]>([]);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [loading, setLoading] = useState(true);
  const [newGrade, setNewGrade] = useState({
    student_id: "",
    subject: "",
    assignment_type: "",
    grade: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.token) return;
      setLoading(true);
      try {
        const [studentsResult, gradesResult] = await Promise.allSettled([
          teacherAPI.getStudents(user.token),
          teacherAPI.getGrades(user.token),
        ]);

        if (studentsResult.status === "fulfilled") {
          setStudents(studentsResult.value);
        }

        if (gradesResult.status === "fulfilled") {
          setGrades(gradesResult.value);
          const uniqueSubjects = Array.from(
            new Set(gradesResult.value.map((g) => g.subject))
          );
          uniqueSubjects.forEach((s) => addSubject(s));
        }
      } catch (error) {
        console.error("Error loading grades:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user, addSubject]);

  const handleAddGrade = async () => {
    if (
      !user?.token ||
      !newGrade.student_id ||
      !newGrade.subject ||
      !newGrade.grade
    )
      return;
    try {
      const grade = await teacherAPI.addGrade(user.token, {
        student_id: Number(newGrade.student_id),
        subject: newGrade.subject,
        assignment_type: newGrade.assignment_type,
        grade: Number(newGrade.grade),
      });
      setGrades([grade, ...grades]);
      addSubject(grade.subject);
      setNewGrade({ student_id: "", subject: "", assignment_type: "", grade: "" });
    } catch (error) {
      console.error("Error adding grade:", error);
    }
  };

  const studentMap = Object.fromEntries(students.map((s) => [s.id, s]));

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p>Loading grades...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add Grade</CardTitle>
          <CardDescription>Assign a grade to a student</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div>
              <Label>Student</Label>
              <Select
                value={newGrade.student_id}
                onValueChange={(v) =>
                  setNewGrade({ ...newGrade, student_id: v })
                }
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
                value={newGrade.subject}
                onValueChange={(v) =>
                  setNewGrade({ ...newGrade, subject: v })
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
              <Label>Assignment Type</Label>
              <Input
                value={newGrade.assignment_type}
                onChange={(e) =>
                  setNewGrade({ ...newGrade, assignment_type: e.target.value })
                }
                placeholder="e.g., Midterm"
              />
            </div>
            <div>
              <Label>Grade</Label>
              <Input
                type="number"
                value={newGrade.grade}
                onChange={(e) =>
                  setNewGrade({ ...newGrade, grade: e.target.value })
                }
              />
            </div>
          </div>
          <Button onClick={handleAddGrade}>Save Grade</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Grades</CardTitle>
          <CardDescription>Recent grade entries</CardDescription>
        </CardHeader>
        <CardContent>
          {grades.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Assignment</TableHead>
                  <TableHead>Grade</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {grades.map((g) => (
                  <TableRow key={g.id}>
                    <TableCell>
                      {studentMap[g.student_id]?.user.name || g.student_id}
                    </TableCell>
                    <TableCell>{g.subject}</TableCell>
                    <TableCell>{g.assignment_type}</TableCell>
                    <TableCell>{g.grade}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p>No grades recorded yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

