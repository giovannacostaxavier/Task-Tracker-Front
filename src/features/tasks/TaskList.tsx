import { useEffect } from 'react';
import { useTaskStore } from './taskStore';
import { TaskForm } from './components/TaskForm';
import { TaskItem } from './components/TaskItem';

export const TaskList = () => {
  const { tasks, loading, error, fetchTasks } = useTaskStore();

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="font-display text-2xl font-semibold text-ink">
        Minhas Tasks
      </h1>
      <p className="mt-1 text-sm text-ink-muted">Gere as tuas tarefas</p>

      <div className="mt-6">
        <TaskForm />
      </div>

      {loading && <p className="mt-4 text-sm text-ink-muted">A carregar...</p>}
      {error && <p className="mt-4 text-sm text-status-doing">{error}</p>}

      <ul className="mt-6 space-y-3">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
};
