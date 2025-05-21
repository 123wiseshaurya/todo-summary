import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API = process.env.REACT_APP_API_URL;

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await axios.get(`${API}/todos`);
      setTodos(res.data);
    } catch (err) {
      toast.error('Failed to fetch todos');
    }
  };

  const addTodo = async () => {
    if (!newTodo.trim()) return;
    try {
      await axios.post(`${API}/todos`, {
        title: newTodo,
        completed: false,
      });
      setNewTodo('');
      fetchTodos();
      toast.success('Todo added!');
    } catch (err) {
      toast.error('Failed to add todo');
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API}/todos/${id}`);
      fetchTodos();
      toast.info('Todo deleted');
    } catch (err) {
      toast.error('Failed to delete todo');
    }
  };

  const summarize = async () => {
    try {
      const res = await axios.post(`${API}/summarize`);
      toast.success('Summary sent to Slack!');
      toast.info(`Summary: ${res.data.summary}`);
    } catch (err) {
      toast.error('Failed to summarize or send to Slack');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Todo Summary Assistant</h1>

      <input
        type="text"
        placeholder="Enter todo"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={addTodo}>Add</button>

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.title}{' '}
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <button onClick={summarize} style={{ marginTop: '1rem' }}>
        Summarize & Send to Slack
      </button>

      <ToastContainer />
    </div>
  );
}

export default App;
