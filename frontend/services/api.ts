import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:9000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, 
})

export default api
