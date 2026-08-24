import { useState } from "react";
import type { Task } from "./types";
import TaskItem from "./components/TaskItem";

function App() {
  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const newTask: Task = {
      id: crypto.randomUUID(),
      title: title,
      createdAt: Date.now(),
    };

    setTasks([...tasks, newTask]);
    setTitle("");
  }

  return (
    <div>
      <h1>Lista de afazeres</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ex.: Comprar ração para os cachorros"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <button type="submit">Adicionar</button>
      </form>

      <ul>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
}

export default App;
