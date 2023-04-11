import "./App.css";
import React, { useEffect, useReducer, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

// CREATE TODO-LIST WITH USESTATE IN REACT
function App() {
  // create some states
  // stored item in localStorage
  const [todos, setTodos] = useState(() => {
    const localValue = JSON.parse(localStorage.getItem("TODOS"));
    return localValue ? localValue : [];
  });
  const [inputVal, setInputVal] = useState("");
  const [isEditing, setIsEditing] = useState(null);

  // submit todo
  const handleSubmit = (e) => {
    e.preventDefault();
    handleAdd();
  };

  // render data from localStorage
  useEffect(() => {
    localStorage.setItem("TODOS", JSON.stringify(todos));
  }, [todos]);

  // add todo
  const handleAdd = () => {
    if (!inputVal.trim()) return;
    if (isEditing) {
      const newTodo = todos.map((item) =>
        item.id === isEditing ? { ...item, text: inputVal } : item
      );
      setTodos(newTodo);
      setIsEditing(null);
    } else {
      setTodos([...todos, { id: uuidv4(), text: inputVal, completed: false }]);
      setInputVal("");
    }
    setInputVal("");
  };

  // delete todo
  const handleDelete = (id) => {
    const newTodo = todos.filter((item) => item.id !== id);
    setTodos(newTodo);
  };

  // edit todo
  const handleEdit = (item) => {
    setInputVal(item.text);
    setIsEditing(item.id);
  };

  // toggle todo
  const handleToggle = (id) => {
    const newTodo = todos.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setTodos(newTodo);
  };

  return (
    /* this is styling using tailwind css */
    <>
      <form onSubmit={handleSubmit} className="max-w-lg w-full mt-10">
        <div className="flex items-center gap-4">
          <input
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="py-3 px-5 w-full rounded-md text-black outline-none"
            type="text"
            placeholder="Enter your todo..."
          />
          <span
            onClick={handleAdd}
            className="py-3 px-5 cursor-pointer bg-blue-500 font-semibold rounded-md"
          >
            Add
          </span>
        </div>

        <ul className="flex flex-col gap-4 mt-5">
          {todos.length <= 0 && (
            <div className="text-xl font-smeibold text-red-200 text-center">
              THERE IS NO TODO HERE....
            </div>
          )}
          {todos.map((item) => (
            <li
              key={item.id}
              className="flex items-center p-3 rounded-md transition-all hover:bg-black hover:bg-opacity-50 justify-between"
            >
              <div className="flex items-center gap-3">
                <input
                  checked={item.completed}
                  onChange={() => handleToggle(item.id)}
                  className="w-5 h-5"
                  type="checkbox"
                />
                <span className={`${item.completed ? "line-through" : ""}`}>
                  {item.text}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span
                  onClick={() => handleEdit(item)}
                  className="w-6 h-6 flex cursor-pointer  items-center justify-center bg-blue-200 rounded-full text-blue-500"
                >
                  <AiFillEdit></AiFillEdit>
                </span>
                <span
                  onClick={() => handleDelete(item.id)}
                  className="w-6 h-6 flex  cursor-pointer items-center justify-center bg-red-200 rounded-full text-red-500"
                >
                  <AiFillDelete></AiFillDelete>
                </span>
              </div>
            </li>
          ))}
        </ul>
      </form>
    </>
  );
}

export default App;
