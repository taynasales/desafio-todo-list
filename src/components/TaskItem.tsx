import { useState } from "react";
import type { Task } from "../types";
import styles from "./TaskItem.module.css";

interface TaskItemProps {
  task: Task;
  onDelete: (task: Task) => void;
  onToggle: (id: string) => void;
  onEdit: (id: string, newTitle: string) => void;
}

function TaskItem({ task, onDelete, onToggle, onEdit }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(task.title);
  const [isExpanded, setIsExpanded] = useState(false);

  function handleSave() {
    onEdit(task.id, draftTitle);
    setIsEditing(false);
  }

  function handleCancel() {
    setDraftTitle(task.title);
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <li className={styles.editForm}>
        <input
          type="text"
          maxLength={180}
          value={draftTitle}
          onChange={(event) => setDraftTitle(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") handleSave();
            if (event.key === "Escape") handleCancel();
          }}
          className={styles.editInput}
          aria-label="Editar título da tarefa"
        />
        <div className={styles.editActions}>
          <button
            onClick={handleCancel}
            className={`${styles.editButton} ${styles.editCancel}`}
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className={`${styles.editButton} ${styles.editSave}`}
          >
            Salvar
          </button>
        </div>
      </li>
    );
  }

  return (
    <li className={styles.item}>
      <input
        type="checkbox"
        checked={task.done}
        onChange={() => onToggle(task.id)}
        className={styles.check}
        aria-label={`Marcar "${task.title}" como concluída`}
      />

      <div className={styles.bodyWrap}>
        <span
          className={`${styles.body} ${task.done ? styles.bodyDone : ""} ${
            isExpanded ? "" : styles.bodyClamped
          }`}
        >
          {task.title}
        </span>
        {task.title.length > 99 && (
          <button
            type="button"
            onClick={() => setIsExpanded(isExpanded ? false : true)}
            className={styles.more}
          >
            {isExpanded ? "mostrar menos" : "mostrar tudo"}
          </button>
        )}
      </div>

      <span className={styles.date}>
        {new Date(task.createdAt).toLocaleString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </span>

      <div className={styles.actions}>
        <button
          onClick={() => setIsEditing(true)}
          className={styles.action}
          aria-label={`Editar tarefa "${task.title}"`}
        >
          ✎
        </button>
        <button
          onClick={() => onDelete(task)}
          className={`${styles.action} ${styles.actionDanger}`}
          aria-label={`Excluir tarefa "${task.title}"`}
        >
          ✕
        </button>
      </div>
    </li>
  );
}

export default TaskItem;
