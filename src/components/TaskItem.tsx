import type { Task } from "../types";

interface TaskItemProps {
  task: Task;
  onDelete: (id: string) => void;
}

function TaskItem({ task, onDelete }: TaskItemProps) {
  return (
    <li>
      {task.title} {new Date(task.createdAt).toLocaleString("pt-BR")}
      <button onClick={() => onDelete(task.id)}>Excluir</button>
    </li>
  );
}

export default TaskItem;
