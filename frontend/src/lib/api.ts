const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

/**
 * Utility to safely build an Authorization header.  Some parts of the
 * application call the API helpers without explicitly providing a token
 * which resulted in requests being sent with `undefined` tokens and the
 * backend responding with "Could not validate credentials".  By reading the
 * token from `localStorage` when one isn't supplied we ensure that all client
 * requests include the correct credentials whenever they are available.
 */
function authHeader(token?: string): Record<string, string> {
  // Prefer an explicitly provided token but fall back to a value stored in
  // localStorage when running in the browser.  Using the nullish coalescing
  // operator avoids treating an empty string as a missing token.
  const t = token ??
    (typeof window !== "undefined" ? localStorage.getItem("token") ?? undefined : undefined);
  return t ? { Authorization: `Bearer ${t}` } : {};
}

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
    formData.append("username", email);
    formData.append("password", password);
    formData.append("grant_type", "password"); // keep grant_type from codex branch

    const response = await fetch(`${API_BASE_URL}/api/auth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(), // use .toString() for URLSearchParams
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const message = (errorData as any).detail || "Login failed";
      throw new Error(message);
    }

    return response.json();
  },
  register: async (data: {
    name: string;
    email: string;
    password: string;
    role: string;
  }) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const message = (errorData as any).detail || "Registration failed";
      throw new Error(message);
    }

    return response.json();
  },
};

// Student API calls
export const studentAPI = {
  getProfile: async (token?: string): Promise<Student> => {
    const response = await fetch(`${API_BASE_URL}/api/students/me`, {
      headers: authHeader(token),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch student profile");
    }

    return response.json();
  },

  getAttendance: async (token?: string): Promise<Attendance[]> => {
    const response = await fetch(`${API_BASE_URL}/api/students/attendance`, {
      headers: authHeader(token),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch attendance");
    }

    return response.json();
  },

  getGrades: async (token?: string): Promise<Grade[]> => {
    const response = await fetch(`${API_BASE_URL}/api/students/grades`, {
      headers: authHeader(token),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch grades");
    }

    return response.json();
  },
};

// Teacher API calls
export const teacherAPI = {
  getStudents: async (token?: string): Promise<Student[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/teachers/students`, {
        headers: authHeader(token),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const message = (errorData as any).detail || "Failed to fetch students";
        throw new Error(message);
      }

      return response.json();
    } catch (error) {
      console.error("Failed to fetch students", error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Failed to fetch students");
    }
  },

  addStudent: async (token: string | undefined, studentData: any) => {
    const response = await fetch(`${API_BASE_URL}/api/teachers/students`, {
      method: "POST",
      headers: { ...authHeader(token), "Content-Type": "application/json" },
      body: JSON.stringify(studentData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const message = (errorData as any).detail || "Failed to add student";
      throw new Error(message);
    }

    return response.json();
  },

  updateStudent: async (token: string | undefined, id: number, studentData: any) => {
    const response = await fetch(`${API_BASE_URL}/api/teachers/students/${id}`, {
      method: "PUT",
      headers: { ...authHeader(token), "Content-Type": "application/json" },
      body: JSON.stringify(studentData),
    });

    if (!response.ok) {
      throw new Error("Failed to update student");
    }

    return response.json();
  },
  getGrades: async (token?: string): Promise<Grade[]> => {
    const response = await fetch(`${API_BASE_URL}/api/teachers/grades`, {
      headers: authHeader(token),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch grades");
    }

    return response.json();
  },
  addGrade: async (token: string | undefined, gradeData: any) => {
    const response = await fetch(`${API_BASE_URL}/api/teachers/grades`, {
      method: "POST",
      headers: { ...authHeader(token), "Content-Type": "application/json" },
      body: JSON.stringify(gradeData),
    });

    if (!response.ok) {
      throw new Error("Failed to add grade");
    }

    return response.json();
  },
};

// Attendance API calls
export const attendanceAPI = {
  markAttendance: async (token: string | undefined, record: any) => {
    const response = await fetch(`${API_BASE_URL}/api/attendance`, {
      method: "POST",
      headers: { ...authHeader(token), "Content-Type": "application/json" },
      body: JSON.stringify(record),
    });

    if (!response.ok) {
      throw new Error("Failed to mark attendance");
    }

    return response.json();
  },

  getAll: async (token?: string): Promise<Attendance[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/attendance`, {
        headers: authHeader(token),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const message = (errorData as any).detail || "Failed to fetch attendance";
        throw new Error(message);
      }

      return response.json();
    } catch (error) {
      console.error("Failed to fetch attendance", error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Failed to fetch attendance");
    }
  },

  getStats: async (token?: string) => {
    const response = await fetch(`${API_BASE_URL}/api/attendance/stats`, {
      headers: authHeader(token),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch attendance stats");
    }

    return response.json();
  },
};
