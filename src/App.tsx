import { useEffect, useState } from "react";
import type { Task } from "./types";
import TaskForm from "./components/tasks/TaskForm";
import TaskList from "./components/tasks/TaskList";
import ConfirmDialog from "./components/ui/ConfirmDialog";
import styles from "./App.module.css";

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const stored = localStorage.getItem("tasks");
      return stored ? JSON.parse(stored) : [];
    } catch {
      console.warn("Não foi possível carregar as tarefas salvas.");
      return [];
    }
  });

  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function handleAddTask(title: string) {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      createdAt: Date.now(),
      done: false,
    };

    setTasks((prev) => [newTask, ...prev]);
  }

  function handleEditTask(id: string, newTitle: string) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, title: newTitle } : task,
      ),
    );
  }

  function handleToggleTask(id: string) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: task.done ? false : true } : task,
      ),
    );
  }

  function handleRequestDelete(task: Task) {
    setTaskToDelete(task);
  }

  function handleConfirmDelete() {
    if (taskToDelete) {
      setTasks((prev) =>
        prev.filter((task) => Object.is(task.id, taskToDelete.id) === false),
      );
    }

    setTaskToDelete(null);
  }

  function handleCancelDelete() {
    setTaskToDelete(null);
  }

  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <span className={styles.eyebrow}>Organização pessoal</span>
        <h1 className={styles.title}>Lista de afazeres</h1>
        <p className={styles.description}>
          Anote suas tarefas, acompanhe há quanto tempo estão na lista e apague
          as que já saíram do caminho
        </p>
      </header>

      <div className={styles.cols}>
        <aside className={styles.side}>
          <TaskForm onAddTask={handleAddTask} />
        </aside>
        <main className={styles.main}>
          <TaskList
            tasks={tasks}
            onDelete={handleRequestDelete}
            onToggle={handleToggleTask}
            onEdit={handleEditTask}
          />
        </main>
      </div>

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
