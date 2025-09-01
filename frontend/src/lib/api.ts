const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface Student {
  id: number;
  user: {
    id: number;
    email: string;
    name: string;
    role: string;
    is_active: boolean;
  };
  student_id: string;
  grade_level: string;
  department: string;
}

export interface Attendance {
  id: number;
  student_id: number;
  date: string;
  status: string;
  subject: string;
}

export interface Grade {
  id: number;
  student_id: number;
  subject: string;
  grade: number;
  assignment_type: string;
}

// Auth API calls
export const authAPI = {
  login: async (email: string, password: string) => {
    const formData = new URLSearchParams();
    formData.append('username', email);
    formData.append('password', password);

    const response = await fetch(`${API_BASE_URL}/api/auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    return response.json();
  },
};

// Student API calls
export const studentAPI = {
  getProfile: async (token: string): Promise<Student> => {
    const response = await fetch(`${API_BASE_URL}/api/students/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch student profile');
    }

    return response.json();
  },

  getAttendance: async (token: string): Promise<Attendance[]> => {
    const response = await fetch(`${API_BASE_URL}/api/students/attendance`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch attendance');
    }

    return response.json();
  },

  getGrades: async (token: string): Promise<Grade[]> => {
    const response = await fetch(`${API_BASE_URL}/api/students/grades`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch grades');
    }

    return response.json();
  },
};

// Teacher API calls
export const teacherAPI = {
  getStudents: async (token: string): Promise<Student[]> => {
    const response = await fetch(`${API_BASE_URL}/api/teachers/students`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch students');
    }

    return response.json();
  },

  addStudent: async (token: string, studentData: any) => {
    const response = await fetch(`${API_BASE_URL}/api/teachers/students`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(studentData),
    });

    if (!response.ok) {
      throw new Error('Failed to add student');
    }

    return response.json();
  },
};

// Attendance API calls
export const attendanceAPI = {
  markAttendance: async (token: string, record: any) => {
    const response = await fetch(`${API_BASE_URL}/api/attendance`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(record),
    });

    if (!response.ok) {
      throw new Error('Failed to mark attendance');
    }

    return response.json();
  },

  getStats: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/api/attendance/stats`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch attendance stats');
    }

    return response.json();
  },
};

