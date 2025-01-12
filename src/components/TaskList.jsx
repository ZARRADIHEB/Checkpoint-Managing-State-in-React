import TaskItem from "./TaskItem";
import PropTypes from "prop-types";

const TaskList = ({ tasks, updateTask, deleteTask, toggleCompletion }) => {
  return (
    <div className="task-list">
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            updateTask={updateTask}
            deleteTask={deleteTask}
            toggleCompletion={toggleCompletion}
          />
        ))
      ) : (
        <p>No tasks to display.</p>
      )}
    </div>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  updateTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  toggleCompletion: PropTypes.func.isRequired,
};

export default TaskList;
