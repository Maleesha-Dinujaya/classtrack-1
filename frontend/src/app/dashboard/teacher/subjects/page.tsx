"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSubjects } from "@/context/SubjectsContext";

export default function TeacherSubjects() {
  const { subjects, addSubject } = useSubjects();
  const [subjectName, setSubjectName] = useState("");

  const handleAdd = () => {
    const name = subjectName.trim();
    if (name) {
      addSubject(name);
      setSubjectName("");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Subjects</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
            placeholder="New subject"
          />
          <Button onClick={handleAdd}>Add</Button>
        </div>
        <ul className="list-disc pl-5">
          {subjects.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

