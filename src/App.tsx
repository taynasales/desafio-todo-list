import { useState } from "react";
import type { Task } from "./types";
import ConfirmDialog from "./components/ConfirmDialog";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  function handleAddTask(title: string) {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      createdAt: Date.now(),
      done: false,
    };

    setTasks((prev) => [...prev, newTask]);
  }

  function handleRequestDelete(task: Task) {
    setTaskToDelete(task);
  }

  function handleConfirmDelete() {
    if (taskToDelete) {
      setTasks((prev) =>
        prev.filter((task) => !Object.is(task.id, taskToDelete.id)),
      );
    }

    setTaskToDelete(null);
  }

  function handleCancelDelete() {
    setTaskToDelete(null);
  }

  function handleToggleTask(id: string) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: task.done ? false : true } : task,
      ),
    );
  }

  return (
    <div>
      <h1>Lista de afazeres</h1>
      <TaskForm onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onDelete={handleRequestDelete}
        onToggle={handleToggleTask}
      />
      {taskToDelete && (
        <ConfirmDialog
          taskTitle={taskToDelete.title}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
}

export default App;
