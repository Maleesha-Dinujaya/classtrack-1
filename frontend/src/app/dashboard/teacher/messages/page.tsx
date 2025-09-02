"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { teacherAPI, Grade, Student } from "@/lib/api";

export default function TeacherMessages() {
  const { user } = useAuth();
  const [grades, setGrades] = useState<Grade[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.token) return;
      setLoading(true);
      try {
        const [studentsData, gradesData] = await Promise.all([
          teacherAPI.getStudents(user.token),
          teacherAPI.getGrades(user.token),
        ]);
        setStudents(studentsData);
        setGrades(gradesData);
      } catch (error) {
        console.error("Failed to load grade messages:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  const studentMap = Object.fromEntries(students.map((s) => [s.id, s]));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Grade Messages</CardTitle>
        <CardDescription>
          Recent grade updates for your students. Manage grades{" "}
          <Link
            href="/dashboard/teacher/grades"
            className="text-primary underline"
          >
            here
          </Link>
          .
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p>Loading grade messages...</p>
        ) : grades.length > 0 ? (
          <ul className="space-y-2">
            {grades.map((g) => (
              <li key={g.id} className="p-2 border rounded">
                {studentMap[g.student_id]?.user.name || `Student ${g.student_id}`} received {g.grade} in {g.subject}
                {g.assignment_type && ` (${g.assignment_type})`}
              </li>
            ))}
          </ul>
        ) : (
          <p>No grade messages yet.</p>
        )}
      </CardContent>
    </Card>
  );
}
