'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import {
  MessageSquare,
  Plus,
  Search,
  Send,
  Paperclip,
  Archive,
  Star,
  Trash2,
  Reply,
  Forward,
  Clock,
  CheckCircle2,
  AlertCircle,
  Filter
} from 'lucide-react'

export default function StudentMessages() {
  const [selectedMessage, setSelectedMessage] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [replyText, setReplyText] = useState('')
  const [isComposing, setIsComposing] = useState(false)

  // Mock data
  const messages = [
    {
      id: 1,
      from: 'Dr. Smith',
      fromEmail: 'smith@university.edu',
      subject: 'Assignment 3 Due Tomorrow',
      preview: 'Just a reminder that Assignment 3 for MATH101 is due tomorrow at 11:59 PM...',
      content: `Dear students,

I hope this message finds you well. I wanted to remind you that Assignment 3 for MATH101 is due tomorrow at 11:59 PM.

Please make sure to:
- Show all your work clearly
- Include proper mathematical notation
- Submit via the course portal

If you have any questions, please don't hesitate to reach out during office hours or via email.

Best regards,
Dr. Smith`,
      timestamp: '2 hours ago',
      read: false,
      starred: true,
      priority: 'high',
      attachments: [
        { name: 'assignment3_guidelines.pdf', size: '245 KB' }
      ]
    },
    {
      id: 2,
      from: 'Prof. Johnson',
      fromEmail: 'johnson@university.edu',
      subject: 'Lab Schedule Change',
      preview: 'Important update regarding next week\'s physics lab schedule...',
      content: `Hello Class,

Due to maintenance work in the main physics laboratory, we need to make some changes to next week's lab schedule.

New Schedule:
- Monday Lab: Moved to Wednesday 2:00-4:00 PM (Room 205)
- Wednesday Lab: Moved to Friday 10:00 AM-12:00 PM (Room 205)

Please update your calendars accordingly. If you have any conflicts with these new times, please let me know as soon as possible.

Thank you for your understanding.

Prof. Johnson`,
      timestamp: '5 hours ago',
      read: false,
      starred: false,
      priority: 'medium',
      attachments: []
    },
    {
      id: 3,
      from: 'Academic Office',
      fromEmail: 'academic@university.edu',
      subject: 'Semester Results Available',
      preview: 'Your semester results for Spring 2024 are now available for viewing...',
      content: `Dear Student,

We are pleased to inform you that your semester results for Spring 2024 are now available for viewing in your student portal.

To access your results:
1. Log into the student portal
2. Navigate to Academic Records
3. Select Grade Reports

Please note that official transcripts can be requested through the Registrar's Office.

If you have any questions about your grades, please contact your respective instructors during their office hours.

Best regards,
Academic Office`,
      timestamp: '1 day ago',
      read: true,
      starred: false,
      priority: 'low',
      attachments: []
    },
    {
      id: 4,
      from: 'Dr. Wilson',
      fromEmail: 'wilson@university.edu',
      subject: 'Project Group Formation',
      preview: 'Please form groups of 3-4 students for the final project...',
      content: `Hi everyone,

It's time to form groups for the final project in CS101. Please form groups of 3-4 students and submit your group information by this Friday.

Project Details:
- Topic: Build a web application of your choice
- Duration: 4 weeks
- Presentation: Last week of semester
- Weight: 30% of final grade

Please email me your group members and proposed project topic by Friday, January 19th.

Looking forward to seeing your creative projects!

Dr. Wilson`,
      timestamp: '2 days ago',
      read: true,
      starred: false,
      priority: 'medium',
      attachments: [
        { name: 'project_requirements.pdf', size: '180 KB' },
        { name: 'grading_rubric.pdf', size: '95 KB' }
      ]
    },
    {
      id: 5,
      from: 'Ms. Davis',
      fromEmail: 'davis@university.edu',
      subject: 'Office Hours This Week',
      preview: 'My office hours schedule for this week has been updated...',
      content: `Dear Students,

Please note that my office hours schedule for this week has been updated due to a department meeting.

Updated Schedule:
- Tuesday: 2:00-4:00 PM (instead of 1:00-3:00 PM)
- Thursday: Cancelled
- Friday: 10:00 AM-12:00 PM (additional hours)

Location: English Department, Room 314

Feel free to drop by during these times for any questions about the course material or assignments.

Best,
Ms. Davis`,
      timestamp: '3 days ago',
      read: true,
      starred: false,
      priority: 'low',
      attachments: []
    }
  ]

  const teachers = [
    { name: 'Dr. Smith', email: 'smith@university.edu', subject: 'Mathematics' },
    { name: 'Prof. Johnson', email: 'johnson@university.edu', subject: 'Physics' },
    { name: 'Dr. Wilson', email: 'wilson@university.edu', subject: 'Computer Science' },
    { name: 'Ms. Davis', email: 'davis@university.edu', subject: 'English Literature' },
    { name: 'Prof. Brown', email: 'brown@university.edu', subject: 'History' },
  ]

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.preview.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter = selectedFilter === 'all' ||
                         (selectedFilter === 'unread' && !message.read) ||
                         (selectedFilter === 'starred' && message.starred) ||
                         (selectedFilter === 'priority' && message.priority === 'high')

    return matchesSearch && matchesFilter
  })

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600'
      case 'medium':
        return 'text-yellow-600'
      default:
        return 'text-gray-600'
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <AlertCircle className="h-4 w-4 text-red-600" />
      case 'medium':
        return <Clock className="h-4 w-4 text-yellow-600" />
      default:
        return null
    }
  }

  const handleSendReply = () => {
    if (replyText.trim()) {
      // In a real app, this would send the reply via API
      console.log('Sending reply:', replyText)
      setReplyText('')
    }
  }

  return (
    <div className="h-[calc(100vh-8rem)] flex gap-6">
      {/* Message List */}
      <div className="w-1/3 border-r bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Messages</h2>
            <Dialog open={isComposing} onOpenChange={setIsComposing}>
              <DialogTrigger asChild>
                <Button size="sm" className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Compose
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Compose Message</DialogTitle>
                  <DialogDescription>
                    Send a message to your teachers or academic staff
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>To</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select recipient" />
                      </SelectTrigger>
                      <SelectContent>
                        {teachers.map((teacher) => (
                          <SelectItem key={teacher.email} value={teacher.email}>
                            {teacher.name} - {teacher.subject}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Subject</Label>
                    <Input placeholder="Enter message subject" />
                  </div>
                  <div>
                    <Label>Message</Label>
                    <Textarea
                      placeholder="Type your message here..."
                      rows={8}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsComposing(false)}>
                    Cancel
                  </Button>
                  <Button className="flex items-center gap-2">
                    <Send className="h-4 w-4" />
                    Send Message
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Search and Filter */}
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={selectedFilter} onValueChange={setSelectedFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter messages" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Messages</SelectItem>
                <SelectItem value="unread">Unread</SelectItem>
                <SelectItem value="starred">Starred</SelectItem>
                <SelectItem value="priority">High Priority</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Message List */}
        <div className="overflow-y-auto h-[calc(100%-140px)]">
          {filteredMessages.map((message) => (
            <div
              key={message.id}
              className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                selectedMessage?.id === message.id ? 'bg-blue-50 border-blue-200' : ''
              } ${!message.read ? 'bg-blue-25' : ''}`}
              onClick={() => setSelectedMessage(message)}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs">
                      {message.from.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className={`font-medium text-sm truncate ${!message.read ? 'font-semibold' : ''}`}>
                      {message.from}
                    </p>
                    <p className="text-xs text-gray-500">{message.timestamp}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {getPriorityIcon(message.priority)}
                  {message.starred && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                  {!message.read && <div className="h-2 w-2 bg-blue-600 rounded-full" />}
                </div>
              </div>
              <h3 className={`font-medium text-sm mb-1 ${!message.read ? 'font-semibold' : ''}`}>
                {message.subject}
              </h3>
              <p className="text-xs text-gray-600 line-clamp-2">
                {message.preview}
              </p>
              {message.attachments.length > 0 && (
                <div className="flex items-center gap-1 mt-2">
                  <Paperclip className="h-3 w-3 text-gray-400" />
                  <span className="text-xs text-gray-500">
                    {message.attachments.length} attachment{message.attachments.length > 1 ? 's' : ''}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Message Content */}
      <div className="flex-1 bg-white rounded-lg shadow-sm">
        {selectedMessage ? (
          <div className="h-full flex flex-col">
            {/* Message Header */}
            <div className="p-6 border-b">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>
                      {selectedMessage.from.split(' ').map((n: string) => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="font-semibold text-lg">{selectedMessage.subject}</h2>
                    <p className="text-sm text-gray-600">
                      From: {selectedMessage.from} &lt;{selectedMessage.fromEmail}&gt;
                    </p>
                    <p className="text-sm text-gray-500">{selectedMessage.timestamp}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getPriorityIcon(selectedMessage.priority)}
                  <Button variant="ghost" size="sm">
                    <Star className={`h-4 w-4 ${selectedMessage.starred ? 'text-yellow-500 fill-current' : ''}`} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Archive className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {selectedMessage.attachments.length > 0 && (
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h4 className="font-medium text-sm mb-2">Attachments</h4>
                  <div className="space-y-2">
                    {selectedMessage.attachments.map((attachment: any, index: number) => (
                      <div key={index} className="flex items-center gap-2">
                        <Paperclip className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{attachment.name}</span>
                        <span className="text-xs text-gray-500">({attachment.size})</span>
                        <Button variant="link" size="sm" className="text-xs p-0">
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Message Content */}
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="prose max-w-none">
                <pre className="whitespace-pre-wrap font-sans">{selectedMessage.content}</pre>
              </div>
            </div>

            {/* Reply Section */}
            <div className="p-6 border-t bg-gray-50">
              <div className="flex gap-2 mb-4">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Reply className="h-4 w-4" />
                  Reply
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Forward className="h-4 w-4" />
                  Forward
                </Button>
              </div>

              <div className="space-y-3">
                <Textarea
                  placeholder="Type your reply..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  rows={4}
                />
                <div className="flex justify-between items-center">
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Paperclip className="h-4 w-4" />
                    Attach File
                  </Button>
                  <Button
                    onClick={handleSendReply}
                    disabled={!replyText.trim()}
                    className="flex items-center gap-2"
                  >
                    <Send className="h-4 w-4" />
                    Send Reply
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No message selected</h3>
              <p className="text-gray-500">Select a message from the list to view its content</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
