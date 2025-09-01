"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useSubjects } from "@/context/SubjectsContext";

export default function TeacherGrades() {
  const { subjects } = useSubjects();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Grades</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>Grade management features will be available soon.</p>
        {subjects.length > 0 && (
          <div>
            <p className="font-medium">Subjects</p>
            <ul className="list-disc pl-5">
              {subjects.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
