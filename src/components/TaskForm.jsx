import { useState } from "react";
import PropTypes from "prop-types";

const TaskForm = ({ addTask }) => {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskName.trim() && taskDescription.trim()) {
      addTask({ name: taskName, description: taskDescription });
      setTaskName("");
      setTaskDescription("");
    } else {
      alert("Please fill in both fields.");
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task Name"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <textarea
        placeholder="Task Description"
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

TaskForm.propTypes = {
  addTask: PropTypes.func.isRequired,
};

export default TaskForm;
