const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

async function apiFetch(path: string, init: RequestInit = {}) {
  const headers = new Headers(init.headers)

  // Only set JSON header when not submitting form data
  if (!(init.body instanceof FormData) && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('access_token')
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
  }

  const response = await fetch(`${API_BASE_URL}${path}`, { ...init, headers })

  if (response.status === 401 && typeof window !== 'undefined') {
    localStorage.removeItem('access_token')
    window.location.href = '/'
    throw new Error('Unauthorized')
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Request failed' }))
    throw error
  }

  return response
}

export const authApi = {
  login: async (email: string, password: string) => {
    const res = await fetch(`${API_BASE_URL}/api/auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        username: email,
        password,
        grant_type: 'password',
      }),
    })

    if (!res.ok) {
      const error = await res.json().catch(() => ({ detail: 'Login failed' }))
      throw error
    }

    return res.json()
  },

  register: async (userData: {
    email: string
    password: string
    role: string
    firstName: string
    lastName: string
  }) => {
    const res = await apiFetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        email: userData.email,
        password: userData.password,
        role: userData.role,
        name: `${userData.firstName} ${userData.lastName}`,
      }),
    })

    return res.json()
  },
}

export default apiFetch
