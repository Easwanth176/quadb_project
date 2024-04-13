import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // State to manage the to-do list
  const [todoList, setTodoList] = useState([]);

  // Function to get the to-do list from local storage
  useEffect(() => {
    const getToDoListFromLocalStorage = () => {
      const parsedToDoList = JSON.parse(localStorage.getItem("todoListKey"));
      if (parsedToDoList === null) {
        return [];
      } else {
        return parsedToDoList;
      }
    };

    // Set the initial to-do list
    setTodoList(getToDoListFromLocalStorage());
  }, []);

  // Function to save the to-do list to local storage
  const saveToDoListToLocalStorage = () => {
    localStorage.setItem("todoListKey", JSON.stringify(todoList));
  };

  // Function to add a new to-do item
  const addTodoItem = (text) => {
    const newTodo = {
      text: text,
      uniqueId: Date.now(), // Using timestamp as unique ID
      isChecked: false
    };
    setTodoList(prevTodoList => [...prevTodoList, newTodo]);
  };

  // Function to delete a to-do item
  const deleteTodoItem = (id) => {
    setTodoList(prevTodoList => prevTodoList.filter(todo => todo.uniqueId !== id));
  };

  // Function to toggle the completion status of a to-do item
  const toggleTodoCompletion = (id) => {
    setTodoList(prevTodoList =>
      prevTodoList.map(todo =>
        todo.uniqueId === id ? { ...todo, isChecked: !todo.isChecked } : todo
      )
    );
  };

  // Function to handle input field change
  const handleInputChange = (event) => {
    // Set input value to state
    // This will update the input field value as the user types
  };

  // Function to handle add button click
  const handleAddButtonClick = () => {
    // Call addTodoItem function with input value
    // Clear input field after adding
  };

  // JSX for rendering the to-do list
  const todoItems = todoList.map((todo) => (
    <li key={todo.uniqueId}>
      <input
        type="checkbox"
        checked={todo.isChecked}
        onChange={() => toggleTodoCompletion(todo.uniqueId)}
      />
      <span className={todo.isChecked ? 'checked' : ''}>{todo.text}</span>
      <button onClick={() => deleteTodoItem(todo.uniqueId)}>Delete</button>
    </li>
  ));

  // JSX for the entire component
  return (
    <div className="App">
      <header className="App-header">
        <h1>To-Do List</h1>
        <div>
          <input
            type="text"
            placeholder="Enter Your New Task"
            onChange={handleInputChange}
          />
          <button onClick={handleAddButtonClick}>Add</button>
        </div>
        <ul>
          {/* Render the list of to-do items */}
          {todoItems}
        </ul>
        <div>
          <button onClick={saveToDoListToLocalStorage}>Save</button>
          <button onClick={() => setTodoList([])}>Clear</button>
        </div>
      </header>
    </div>
  );
}

export default App;
