import { useEffect, useState } from "react";
import type { Task } from "./types";
import TaskForm from "./components/tasks/TaskForm";
import TaskList from "./components/tasks/TaskList";
import ConfirmDialog from "./components/ui/ConfirmDialog";
import Toast from "./components/ui/Toast";
import styles from "./App.module.css";

function createId(): string {
  if (crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

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
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } catch {
      console.warn("Não foi possível salvar as tarefas.");
    }
  }, [tasks]);

  function handleAddTask(title: string) {
    const newTask: Task = {
      id: createId(),
      title: title.trim(),
      createdAt: Date.now(),
      done: false,
    };

    setTasks((prev) => [newTask, ...prev]);
    setToastMessage("Tarefa adicionada");
  }

  function handleEditTask(id: string, newTitle: string) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, title: newTitle } : task,
      ),
    );
    setToastMessage("Tarefa atualizada");
  }

  function handleToggleTask(id: string) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task,
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
      setToastMessage("Tarefa excluída");
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
        <h1 className={styles.title}>Lista de tarefas</h1>
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
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}

      {toastMessage && (
        <Toast message={toastMessage} onDismiss={() => setToastMessage(null)} />
      )}
    </div>
  );
}

export default App;
