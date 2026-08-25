import type { Task } from "../types";

interface TaskItemProps {
  task: Task;
  onDelete: (task: Task) => void;
}

function TaskItem({ task, onDelete }: TaskItemProps) {
  return (
    <li>
      {task.title} {new Date(task.createdAt).toLocaleString("pt-BR")}
      <button onClick={() => onDelete(task)}>Excluir</button>
    </li>
  );
}

export default TaskItem;
