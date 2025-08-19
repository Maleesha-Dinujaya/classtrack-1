import axios from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  (config: any) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('access_token')
      if (token) {
        config.headers = config.headers || {}
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  },
  (error: any) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response: any) => response,
  (error: any) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('access_token')
      window.location.href = '/'
    }
    return Promise.reject(error)
  }
)

export const authApi = {
  login: (email: string, password: string) =>
    api.post(
      '/api/auth/token',
      new URLSearchParams({
        username: email,
        password: password,
        grant_type: 'password',
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    ),

  register: (userData: {
    email: string
    password: string
    role: string
    firstName: string
    lastName: string
  }) =>
    api.post('/api/auth/register', {
      email: userData.email,
      password: userData.password,
      role: userData.role,
      name: `${userData.firstName} ${userData.lastName}`,
    }),
}

export default api
