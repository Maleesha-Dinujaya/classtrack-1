'use client'

import { createContext, useContext, useState } from 'react'

interface SubjectsContextType {
  subjects: string[]
  addSubject: (subject: string) => void
}

const SubjectsContext = createContext<SubjectsContextType | undefined>(undefined)

export const SubjectsProvider = ({ children }: { children: React.ReactNode }) => {
  const [subjects, setSubjects] = useState<string[]>([])

  const addSubject = (subject: string) => {
    setSubjects((prev) => (prev.includes(subject) ? prev : [...prev, subject]))
  }

  return (
    <SubjectsContext.Provider value={{ subjects, addSubject }}>
      {children}
    </SubjectsContext.Provider>
  )
}

export const useSubjects = () => {
  const context = useContext(SubjectsContext)
  if (!context) {
    throw new Error('useSubjects must be used within a SubjectsProvider')
  }
  return context
}

