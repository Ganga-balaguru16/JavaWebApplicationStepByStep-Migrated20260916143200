import axios from 'axios';

export interface LoginResponse {
  // The backend may return an errorMessage field on failure.
  errorMessage?: string;
}

/**
 * Sends login credentials to the backend.
 * @param name - Username
 * @param password - Password
 * @returns Promise resolving to the backend response.
 */
export const login = (name: string, password: string) => {
  const params = new URLSearchParams();
  params.append('name', name);
  params.append('password', password);

  return axios.post<LoginResponse>('/login.do', params, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    // Allow redirects to be followed by the browser; axios will follow them automatically.
    // If the backend returns a JSON payload with an errorMessage, it will be available here.
  });
};