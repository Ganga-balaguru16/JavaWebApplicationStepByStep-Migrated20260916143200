import React, { useEffect, useState } from 'react';
import { fetchTodos, deleteTodo, Todo } from '../services/todo.service';

const ListTodos: React.FC = () => {
  const [userName, setUserName] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const loadTodos = async () => {
    try {
      const data = await fetchTodos();
      setUserName(data.name);
      setTodos(data.todos);
      setErrorMessage(data.errorMessage ?? '');
    } catch (error) {
      setErrorMessage('Failed to load todos.');
    }
  };

  useEffect(() => {
    loadTodos();
  },