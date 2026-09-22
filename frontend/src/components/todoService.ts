import axios from 'axios';

export interface Todo {
  name: string;
  category: string;
}

export interface TodoListResponse {
  name: string;
  todos: Todo[];
  errorMessage?: string;
}

/**
 * Retrieves the current user's name and todo list.
 * Expected endpoint: GET /list-todos.do
 */
export const fetchTodoList = async (): Promise<TodoListResponse> => {
  const response = await axios.get<TodoListResponse>('/list-todos.do');
  return response.data;
};

/**
 * Deletes a specific todo.
 * Expected endpoint: GET /delete-todo.do?todo={name}&category={category}
 */
export const deleteTodo = async (todoName: string, category: string): Promise<void> => {
  await axios.get('/delete-todo.do', {
    params: { todo: todoName, category },
  });
};