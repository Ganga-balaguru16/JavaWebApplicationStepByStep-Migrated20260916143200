import React, { useState, FormEvent } from 'react';
import { addTodo } from '../services/todo.service';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const AddTodo: React.FC = () => {
  const [todo, setTodo] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    try {
      await addTodo({ todo, category });
      setSuccess(true);
      setTodo('');
      setCategory('');
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to add todo');
    }
  };

  return (
    <>
      <Header />
      <Navigation />
      <div className="container">
        <h2>Your New Action Item:</h2>
        <form onSubmit={handleSubmit}>
          <fieldset className="form-group">
            <label htmlFor="todo">Description</label>
            <input
              id="todo"
              name="todo"
              type="text"
              className="form-control"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
              required
            />
          </fieldset>

          <fieldset className="form-group">
            <label htmlFor="category">Category</label>
            <input
              id="category"
              name="category"
              type="text"
              className="form-control"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </fieldset>

          <button type="submit" name="add" className="btn btn-success">
            Submit
          </button>
        </form>

        {error && <div className="alert alert-danger mt-3">{error}</div>}
        {success && <div className="alert alert-success mt-3">Todo added successfully.</div>}
      </div>
      <Footer />
    </>
  );
};

export default AddTodo;