import React, { useEffect, useState } from 'react';
import { fetchTodoList, deleteTodo, Todo, TodoListResponse } from '../services/todoService';
import { useNavigate } from 'react-router-dom';

const TodoList: React.FC = () => {
  const [userName, setUserName] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const navigate = useNavigate();

  const loadTodos = async () => {
    try {
      const data: TodoListResponse = await fetchTodoList();
      setUserName(data.name);
      setTodos(data.todos);
      setErrorMessage(data.errorMessage ?? '');
    } catch (error) {
      setErrorMessage('Failed to load todos.');
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const handleDelete = async (todo: Todo) => {
    try {
      await deleteTodo(todo.name, todo.category);
      // Refresh list after deletion
      await loadTodos();
    } catch (error) {
      setErrorMessage('Failed to delete todo.');
    }
  };

  const handleAdd = () => {
    navigate('/add-todo.do');
  };

  return (
    <div className="container">
      <h1>Welcome {userName}</h1>

      <table className="table table-striped">
        <caption>Your Todos are</caption>
        <thead>
          <tr>
            <th>Description</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={`${todo.name}-${todo.category}`}>
              <td>{todo.name}</td>
              <td>{todo.category}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(todo)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {errorMessage && <p><font color="red">{errorMessage}</font></p>}

      <button className="btn btn-success" onClick={handleAdd}>
        Add New Todo
      </button>
    </div>
  );
};

export default TodoList;