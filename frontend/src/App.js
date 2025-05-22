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
    <div style={styles.container}>
      <h1 style={styles.title}>📝 Todo Summary Assistant</h1>

      <div style={styles.inputGroup}>
        <input
          type="text"
          placeholder="Enter todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          style={styles.input}
        />
        <button onClick={addTodo} style={styles.addButton}>Add</button>
      </div>

      <ul style={styles.todoList}>
        {todos.map(todo => (
          <li key={todo.id} style={styles.todoItem}>
            <span>{todo.title}</span>
            <button onClick={() => deleteTodo(todo.id)} style={styles.deleteButton}>Delete</button>
          </li>
        ))}
      </ul>

      <button onClick={summarize} style={styles.summarizeButton}>
        📤 Summarize & Send to Slack
      </button>

      <ToastContainer />
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: 'auto',
    padding: '2rem',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f8f9fa',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  },
  title: {
    textAlign: 'center',
    marginBottom: '1.5rem',
    color: '#343a40',
  },
  inputGroup: {
    display: 'flex',
    gap: '10px',
    marginBottom: '1rem',
  },
  input: {
    flex: 1,
    padding: '0.6rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  addButton: {
    padding: '0.6rem 1.2rem',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  todoList: {
    listStyle: 'none',
    padding: 0,
    marginBottom: '1rem',
  },
  todoItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.6rem',
    marginBottom: '0.5rem',
    backgroundColor: '#fff',
    borderRadius: '5px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  deleteButton: {
    padding: '0.3rem 0.8rem',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
  },
  summarizeButton: {
    display: 'block',
    width: '100%',
    padding: '0.8rem',
    backgroundColor: '#28a745',
    color: '#fff',
    fontSize: '1rem',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default App;
