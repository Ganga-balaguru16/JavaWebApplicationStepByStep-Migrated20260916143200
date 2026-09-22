import axios from 'axios';

interface LoginResponse {
  errorMessage?: string;
}

export const login = async (
  name: string,
  password: string
): Promise<LoginResponse> => {
  const params = new URLSearchParams();
  params.append('name', name);
  params.append('password', password);

  const response = await axios.post<LoginResponse>('/login.do', params, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    // Allow redirects to be followed; if the backend redirects on success,
    // axios will follow automatically. The response data will be empty in that case.
    // If the backend returns JSON with an errorMessage, it will be captured below.
  });

  return response.data;
};