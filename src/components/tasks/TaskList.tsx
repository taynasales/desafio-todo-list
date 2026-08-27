import type { Task } from "../../types";
import TaskItem from "./TaskItem";
import styles from "./TaskList.module.css";

interface TaskListProps {
  tasks: Task[];
  onDelete: (task: Task) => void;
  onToggle: (id: string) => void;
  onEdit: (id: string, newTitle: string) => void;
}

function TaskList({ tasks, onDelete, onToggle, onEdit }: TaskListProps) {
  const doneCount = tasks.filter((task) => task.done).length;

  return (
    <section>
      <div className={styles.header}>
        <h2 className={styles.title}>Suas tarefas</h2>
        {tasks.length > 0 && (
          <span className={styles.count}>
            {doneCount} de {tasks.length}{" "}
            {tasks.length === 1 ? "concluída" : "concluídas"}
          </span>
        )}
      </div>
      {tasks.length === 0 ? (
        <div className={styles.empty}>
          <p className={styles.emptyTitle}>Nenhuma tarefa por aqui</p>
          <p className={styles.emptyText}>Que tal criar a primeira?</p>
        </div>
      ) : (
        <ul className={styles.list}>
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onDelete={onDelete}
              onToggle={onToggle}
              onEdit={onEdit}
            />
          ))}
        </ul>
      )}
    </section>
  );
}

export default TaskList;
