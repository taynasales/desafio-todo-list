import type { Task } from "../types";

interface TaskItemProps {
  task: Task;
  onDelete: (task: Task) => void;
  onToggle: (id: string) => void;
}

function TaskItem({ task, onDelete, onToggle }: TaskItemProps) {
  return (
    <li>
      <input
        type="checkbox"
        checked={task.done}
        onChange={() => onToggle(task.id)}
        aria-label={`Marcar "${task.title}" como concluída`}
      />
      {task.title} {new Date(task.createdAt).toLocaleString("pt-BR")}
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
