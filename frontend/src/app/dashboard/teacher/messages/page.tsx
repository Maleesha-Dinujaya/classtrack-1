"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Message {
  id: number;
  to: string;
  subject: string;
  body: string;
}

export default function TeacherMessages() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      to: "class@example.com",
      subject: "Welcome",
      body: "Welcome to the new semester!",
    },
  ]);
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const sendMessage = () => {
    if (!to || !subject || !body) return;
    setMessages((prev) => [
      ...prev,
      { id: prev.length + 1, to, subject, body },
    ]);
    setTo("");
    setSubject("");
    setBody("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Messages</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <Input
            placeholder="Recipient"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
          <Input
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <Textarea
            placeholder="Message"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <Button onClick={sendMessage}>Send Message</Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>To</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Message</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {messages.map((msg) => (
              <TableRow key={msg.id}>
                <TableCell>{msg.to}</TableCell>
                <TableCell>{msg.subject}</TableCell>
                <TableCell>{msg.body}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
