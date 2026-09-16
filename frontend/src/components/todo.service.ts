import axios from 'axios';

export interface Todo {
  name: string;
  category: string;
}

export interface TodosResponse {
  name: string;
  todos: Todo[];
  errorMessage?: string;
}

export const fetchTodos = async (): Promise<TodosResponse> => {
  const response = await axios.get<TodosResponse>('/todos.do');
  return response.data;
};

export const deleteTodo = async (todoName: string, category: string): Promise<void> => {
  await axios.delete('/delete-todo.do', {
    params: { todo: todoName, category },
  });
};