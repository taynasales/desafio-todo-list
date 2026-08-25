import { useState } from "react";
import type { Task } from "./types";
import TaskItem from "./components/TaskItem";
import ConfirmDialog from "./components/ConfirmDialog";

function App() {
  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const newTask: Task = {
      id: crypto.randomUUID(),
      title: title,
      createdAt: Date.now(),
      done: false,
    };

    setTasks([...tasks, newTask]);
    setTitle("");
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
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ex.: Comprar ração para os cachorros"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <button type="submit">Adicionar</button>
      </form>

      <ul>
        {tasks.length === 0 ? (
          <p>Nenhuma tarefa por aqui ainda. Que tal criar a primeira?</p>
        ) : (
          <ul>
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onDelete={handleRequestDelete}
                onToggle={handleToggleTask}
              />
            ))}
          </ul>
        )}
      </ul>
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
