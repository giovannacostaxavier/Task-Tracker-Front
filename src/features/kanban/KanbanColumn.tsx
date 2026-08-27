import type { Task } from '../tasks/schemas';
import { useTaskStore } from '../tasks/taskStore';

type KanbanColumnProps = {
  titulo: string;
  status: string;
  tasks: Task[];
  proximoStatus?: string;
  anteriorStatus?: string;
};

export const KanbanColumn = ({
  titulo,
  tasks,
  proximoStatus,
  anteriorStatus,
}: KanbanColumnProps) => {
  const moveTask = useTaskStore((state) => state.moveTask);

  return (
    <div>
      <h3>{titulo}</h3>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <strong>{task.titulo}</strong> — {task.descricao}
            {anteriorStatus && (
              <button onClick={() => moveTask(task.id, anteriorStatus)}>
                ← Voltar
              </button>
            )}
            {proximoStatus && (
              <button onClick={() => moveTask(task.id, proximoStatus)}>
                Avançar →
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
