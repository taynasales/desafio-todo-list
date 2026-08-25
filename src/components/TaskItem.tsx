import { useState } from "react";
import type { Task } from "../types";

interface TaskItemProps {
  task: Task;
  onDelete: (task: Task) => void;
  onToggle: (id: string) => void;
  onEdit: (id: string, newTitle: string) => void;
}

function TaskItem({ task, onDelete, onToggle, onEdit }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(task.title);

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
      <li>
        <input
          type="text"
          value={draftTitle}
          onChange={(event) => setDraftTitle(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") handleSave();
            if (event.key === "Escape") handleCancel();
          }}
          aria-label="Editar título da tarefa"
        />
        <button onClick={handleCancel}>Cancelar</button>
        <button onClick={handleSave}>Salvar</button>
      </li>
    );
  }

  return (
    <li>
      <input
        type="checkbox"
        checked={task.done}
        onChange={() => onToggle(task.id)}
        aria-label={`Marcar "${task.title}" como concluída`}
      />
      {task.title} {new Date(task.createdAt).toLocaleString("pt-BR")}
      <button onClick={() => setIsEditing(true)}>Editar</button>
      <button
        onClick={() => onDelete(task)}
        aria-label={`Excluir tarefa "${task.title}"`}
      >
        Excluir
      </button>
    </li>
  );
}

export default TaskItem;
