import { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faClipboardList } from "@fortawesome/free-solid-svg-icons";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState(() => {
    // Safely initialize tasks from localStorage
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });
  const [filter, setFilter] = useState("all"); // "all", "active", "completed"
  const [searchQuery, setSearchQuery] = useState("");

  // Save tasks to localStorage whenever the `tasks` state changes
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (newTask) => {
    setTasks([...tasks, { ...newTask, id: Date.now(), completed: false }]);
  };

  const updateTask = (updatedTask) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Filter tasks based on active/completed/all
  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true; // "all"
  });

  // Filter tasks based on search query
  const searchedTasks = filteredTasks.filter((task) =>
    task.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="app-container">
      <header>
        <h1>
          <FontAwesomeIcon icon={faClipboardList} /> To-Do List
        </h1>
        <div className="tabs">
          <button
            className={filter === "all" ? "active-tab" : ""}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={filter === "active" ? "active-tab" : ""}
            onClick={() => setFilter("active")}
          >
            Active
          </button>
          <button
            className={filter === "completed" ? "active-tab" : ""}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
        </div>
        <div className="search-bar">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </header>
      <TaskForm addTask={addTask} />
      <TaskList
        tasks={searchedTasks}
        updateTask={updateTask}
        deleteTask={deleteTask}
        toggleCompletion={toggleCompletion}
      />
    </div>
  );
};

export default App;
