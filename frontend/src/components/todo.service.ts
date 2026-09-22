import { AxiosResponse } from 'axios';
import axios from 'axios';

export interface AddTodoRequest {
  todo: string;
  category: string;
}

/**
 * Sends a new todo item to the backend.
 * The backend expects a POST to `/add-todo.do` with form‑urlencoded data.
 */
export const addTodo = async (data: AddTodoRequest): Promise<AxiosResponse<any>> => {
  const params = new URLSearchParams();
  params.append('todo', data.todo);
  params.append('category', data.category);
  // The original form also sends a button name "add", include it to mimic the legacy request
  params.append('add', 'Submit');

  return axios.post('/add-todo.do', params, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    withCredentials: true, // preserve session cookie for LoginRequiredFilter
  });
};