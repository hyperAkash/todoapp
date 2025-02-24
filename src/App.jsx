import { useState } from "react";
import "./App.css";

function App() {
  //todos state
  let [todos, setTodos] = useState([]);

  let addTodo = (e) => {
    e.preventDefault();
    let todoName = e.target.todoName.value.trim();

    if (todoName && !todos.includes(todoName)) {
      setTodos([...todos, todoName]);
      e.target.todoName.value = "";
    } else {
      alert("Todo already exists or is empty");
    }
  };

  return (
    <div className="app-container">
      <h2>To-Do App</h2>
      <form onSubmit={addTodo}>
        <input type="text" placeholder="Enter task" name="todoName" />
        <button type="submit">Add</button>
      </form>
      <div className="todos">
        <ul>
          {todos.map((value, index) => (
            <TodosItem
              key={index}
              todo={value}
              indexNumber={index}
              todos={todos}
              setTodos={setTodos}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

function TodosItem({ todo, todos, setTodos, indexNumber }) {
  let [isEditing, setIsEditing] = useState(false);
  let [editedTodo, setEditedTodo] = useState(todo);

  let deleteTodo = () => {
    setTodos(todos.filter((_, i) => i !== indexNumber));
  };

  let enableEditing = () => {
    setIsEditing(true);
  };

  let updateTodo = (e) => {
    if (e.key === "Enter") {
      setTodos(todos.map((t, i) => (i === indexNumber ? editedTodo : t)));
      setIsEditing(false);
    }
  };

  return (
    <li className="todo-item">
      {isEditing ? (
        <input
          type="text"
          value={editedTodo}
          onChange={(e) => setEditedTodo(e.target.value)}
          onKeyDown={updateTodo}
          onBlur={() => setIsEditing(false)}
          autoFocus
        />
      ) : (
        <span className="todo-text" onClick={enableEditing}>
          {todo}
        </span>
      )}
      <span className="delete-btn" onClick={deleteTodo}>
        &times;
      </span>
    </li>
  );
}
