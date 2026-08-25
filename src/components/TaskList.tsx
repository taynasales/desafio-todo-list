import type { Task } from "../types";
import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  onDelete: (task: Task) => void;
  onToggle: (id: string) => void;
}

function TaskList({ tasks, onDelete, onToggle }: TaskListProps) {
  if (tasks.length === 0) {
    return <p>Nenhuma tarefa por aqui ainda. Que tal criar a primeira?</p>;
  }

  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </ul>
  );
}

export default TaskList;
