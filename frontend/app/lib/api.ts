/* eslint-disable @typescript-eslint/no-explicit-any */
// Utility functions để gọi API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'YOUR_API_ENDPOINT';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Generic API call function
export async function apiCall<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const token = localStorage.getItem('auth-token');

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        data,
        message: data.message,
      };
    } else {
      return {
        success: false,
        error: data.message || data.error || 'Có lỗi xảy ra',
      };
    }
  } catch (error) {
    console.error('API call error:', error);
    return {
      success: false,
      error: 'Không thể kết nối đến server',
    };
  }
}

// Authentication API calls
export const authAPI = {
  login: async (email: string, password: string) => {
    return apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  register: async (userData: {
    fullName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    password: string;
    confirmPassword: string;
  }) => {
    return apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  forgotPassword: async (email: string) => {
    return apiCall('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },

  getCurrentUser: async () => {
    return apiCall('/auth/me');
  },

  logout: async () => {
    return apiCall('/auth/logout', {
      method: 'POST',
    });
  },
};

// Appointment API calls
export const appointmentAPI = {
  create: async (appointmentData: any) => {
    return apiCall('/appointments', {
      method: 'POST',
      body: JSON.stringify(appointmentData),
    });
  },

  getByDate: async (date: string) => {
    return apiCall(`/appointments?date=${date}`);
  },

  getByPhone: async (phone: string) => {
    return apiCall(`/appointments?phone=${phone}`);
  },

  update: async (id: string, data: any) => {
    return apiCall(`/appointments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete: async (id: string) => {
    return apiCall(`/appointments/${id}`, {
      method: 'DELETE',
    });
  },
};

// Chat API calls
export const chatAPI = {
  sendMessage: async (message: string, sessionId?: string) => {
    return apiCall('/chat', {
      method: 'POST',
      body: JSON.stringify({ message, sessionId }),
    });
  },

  getChatHistory: async (sessionId: string) => {
    return apiCall(`/chat/history/${sessionId}`);
  },
};
