import { useState } from "react";
import styles from "./TaskForm.module.css";

interface TaskFormProps {
  onAddTask: (title: string) => void;
}

function TaskForm({ onAddTask }: TaskFormProps) {
  const [title, setTitle] = useState("");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    onAddTask(title);
    setTitle("");
  }

  return (
    <form onSubmit={handleSubmit} className={styles.card}>
      <label className={styles.label}>Nova tarefa</label>
      <input
        type="text"
        maxLength={180}
        placeholder="Ex.: Comprar ração para os cachorros"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        className={styles.input}
      />
      <button
        type="submit"
        disabled={title.trim() === ""}
        className={styles.button}
      >
        Adicionar
      </button>
      <p className={styles.counter}>{title.length}/180</p>
    </form>
  );
}

export default TaskForm;
