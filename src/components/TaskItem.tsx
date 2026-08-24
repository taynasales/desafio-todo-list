import type { Task } from "../types";

interface TaskItemProps {
  task: Task;
}

function TaskItem({ task }: TaskItemProps) {
  return (
    <li>
      {task.title} {new Date(task.createdAt).toLocaleString("pt-BR")}
    </li>
  );
}

export default TaskItem;
