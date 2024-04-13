// App.js
import React, { useState, useEffect } from 'react';
import logo from './logo.jpeg'; 
import './App.css';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [notification, setNotification] = useState(null);

  const displayNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 3000); 
  };

  const addTodoItem = (text) => {
    const newTodo = {
      text: text,
      uniqueId: Date.now(), 
      isChecked: false
    };
    setTodoList(prevTodoList => [...prevTodoList, newTodo]);
    displayNotification("Task added successfully!");
  };

  const deleteTodoItem = (id) => {
    setTodoList(prevTodoList => prevTodoList.filter(todo => todo.uniqueId !== id));
    displayNotification("Task deleted successfully!");
  };

  const toggleTodoCompletion = (id) => {
    setTodoList(prevTodoList =>
      prevTodoList.map(todo =>
        todo.uniqueId === id ? { ...todo, isChecked: !todo.isChecked } : todo
      )
    );
    displayNotification("Task status updated successfully!");
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddButtonClick = () => {
    if (inputValue.trim() !== '') {
      addTodoItem(inputValue);
      setInputValue('');
    }
  };

  return (
    <div className="App">
      <img src={logo} alt="Company Logo" className="logo" />
      <header className="App-header">
        <h1>QUADB To-Do List</h1>
        {notification && <div className="notification">{notification}</div>}
        <div>
          <input
            type="text"
            placeholder="Enter Your New Task"
            value={inputValue}
            onChange={handleInputChange}
          />
          <button onClick={handleAddButtonClick}>Add</button>

        </div>

        <div className="container">
          <ul>
            {todoList.length === 0 ? (
              <li>No tasks yet. Add a new task above.</li>
            ) : (
              todoList.map((todo) => (
                <li key={todo.uniqueId}>
                  <input
                    type="checkbox"
                    checked={todo.isChecked}
                    onChange={() => toggleTodoCompletion(todo.uniqueId)}
                  />
                  <span className={todo.isChecked ? 'checked' : ''}>{todo.text}</span>
                  <button onClick={() => deleteTodoItem(todo.uniqueId)}>Delete</button>
                </li>
              ))
            )}
          </ul>
        </div>
        <div className="footer">
          <button>Save</button>
          <button>Delete All</button>
        </div>
      </header>
    </div>
  );
}

export default App;
