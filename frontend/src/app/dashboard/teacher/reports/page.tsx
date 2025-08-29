"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function TeacherReports() {
  const [downloading, setDownloading] = useState(false);

  const reports = [
    { id: "attendance", name: "Attendance Summary" },
    { id: "grades", name: "Grade Book" },
    { id: "activity", name: "Student Activity" },
  ];

  const downloadReport = (id: string) => {
    setDownloading(true);
    // In a real app, fetch the report from an API
    setTimeout(() => {
      setDownloading(false);
      alert(`Report ${id} downloaded`);
    }, 500);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reports</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Report</TableHead>
              <TableHead className="w-[150px]">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.map((report) => (
              <TableRow key={report.id}>
                <TableCell>{report.name}</TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    onClick={() => downloadReport(report.id)}
                    disabled={downloading}
                  >
                    Download
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
