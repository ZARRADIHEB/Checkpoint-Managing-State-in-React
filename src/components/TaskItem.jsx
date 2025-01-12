import { useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faCheckCircle,
  faUndo,
} from "@fortawesome/free-solid-svg-icons";

const TaskItem = ({ task, updateTask, deleteTask, toggleCompletion }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(task.name);
  const [editedDescription, setEditedDescription] = useState(task.description);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    updateTask({ ...task, name: editedName, description: editedDescription });
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      deleteTask(task.id);
    }
  };

  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      {isEditing ? (
        <div className="edit-mode">
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div className="view-mode">
          <h3>{task.name}</h3>
          <p>{task.description}</p>
          <div className="actions">
            <button onClick={handleEdit}>
              <FontAwesomeIcon icon={faEdit} style={{ color: "purple" }} />
            </button>
            <button onClick={handleDelete}>
              <FontAwesomeIcon icon={faTrash} style={{ color: "red" }} />
            </button>
            <button onClick={() => toggleCompletion(task.id)}>
              {task.completed ? (
                <FontAwesomeIcon icon={faUndo} style={{ color: "blue" }} />
              ) : (
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  style={{ color: "green" }}
                />
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  updateTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  toggleCompletion: PropTypes.func.isRequired,
};

export default TaskItem;
