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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function TeacherAttendance() {
  const [selectedClass, setSelectedClass] = useState("cs101");
  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [records, setRecords] = useState<Record<string, boolean>>({});

  const classes = [
    { id: "cs101", name: "CS101 - Introduction to Programming" },
    { id: "cs201", name: "CS201 - Data Structures" },
    { id: "cs301", name: "CS301 - Algorithms" },
    { id: "cs401", name: "CS401 - Software Engineering" },
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

  const toggleAttendance = (id: string) => {
    setRecords((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const saveAttendance = () => {
    // In real app, send records to API
    console.log({ date, selectedClass, records });
    alert("Attendance saved");
  };

  return (
    <Card>
      <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <CardTitle>Attendance</CardTitle>
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
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead className="w-[100px] text-center">Present</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow key={student.id}>
                <TableCell className="font-medium">
                  {student.name}
                </TableCell>
                <TableCell className="text-center">
                  <Checkbox
                    checked={records[student.id] ?? false}
                    onCheckedChange={() => toggleAttendance(student.id)}
                    aria-label={`Mark ${student.name} present`}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button onClick={saveAttendance}>Save Attendance</Button>
      </CardContent>
    </Card>
  );
}
