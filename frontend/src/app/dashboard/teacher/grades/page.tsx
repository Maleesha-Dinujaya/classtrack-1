"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function TeacherGrades() {
  const [selectedClass, setSelectedClass] = useState("cs101");
  const [selectedAssignment, setSelectedAssignment] = useState("assignment1");
  const [grades, setGrades] = useState<Record<string, string>>({});

  const classes = [
    { id: "cs101", name: "CS101 - Introduction to Programming" },
    { id: "cs201", name: "CS201 - Data Structures" },
    { id: "cs301", name: "CS301 - Algorithms" },
    { id: "cs401", name: "CS401 - Software Engineering" },
  ];

  const assignments = [
    { id: "assignment1", name: "Assignment 1" },
    { id: "assignment2", name: "Assignment 2" },
    { id: "midterm", name: "Midterm" },
  ];

  const students = [
    { id: "STD001", name: "Alex Johnson", class: "cs101" },
    { id: "STD002", name: "Jane Smith", class: "cs101" },
    { id: "STD003", name: "Mike Wilson", class: "cs201" },
    { id: "STD004", name: "Sarah Brown", class: "cs201" },
  ];

  const filteredStudents = students.filter(
    (s) => s.class === selectedClass
  );

  const handleGradeChange = (id: string, value: string) => {
    setGrades((prev) => ({ ...prev, [id]: value }));
  };

  const saveGrades = () => {
    console.log({ selectedClass, selectedAssignment, grades });
    alert("Grades saved");
  };

  return (
    <Card>
      <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <CardTitle>Grades</CardTitle>
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger className="w-[200px]">
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
          <Select
            value={selectedAssignment}
            onValueChange={setSelectedAssignment}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select assignment" />
            </SelectTrigger>
            <SelectContent>
              {assignments.map((assn) => (
                <SelectItem key={assn.id} value={assn.id}>
                  {assn.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead className="w-[150px]">Grade</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow key={student.id}>
                <TableCell className="font-medium">
                  {student.name}
                </TableCell>
                <TableCell>
                  <Input
                    value={grades[student.id] ?? ""}
                    onChange={(e) =>
                      handleGradeChange(student.id, e.target.value)
                    }
                    placeholder="e.g., 95"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button onClick={saveGrades}>Save Grades</Button>
      </CardContent>
    </Card>
  );
}
