import { useEffect } from 'react';
import { useTaskStore } from '../tasks/taskStore';
import { TaskForm } from '../tasks/components/TaskForm';
import { KanbanColumn } from './KanbanColumn';

export const KanbanBoard = () => {
  const { tasks, loading, error, fetchTasks } = useTaskStore();

  useEffect(() => {
    fetchTasks();
  }, []);

  const todoTasks = tasks.filter((t) => t.status === 'todo');
  const doingTasks = tasks.filter((t) => t.status === 'doing');
  const doneTasks = tasks.filter((t) => t.status === 'done');

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="font-display text-2xl font-semibold text-ink">
        Minhas Tasks
      </h1>
      <p className="mt-1 text-sm text-ink-muted">
        Gere e acompanha o progresso das tuas tarefas
      </p>

      <div className="mt-6">
        <TaskForm />
      </div>

      {loading && <p className="mt-4 text-sm text-ink-muted">A carregar...</p>}
      {error && <p className="mt-4 text-sm text-status-doing">{error}</p>}

      <div className="mt-6 flex flex-col gap-4 sm:flex-row">
        <KanbanColumn
          titulo="To Do"
          tasks={todoTasks}
          accentClass="bg-status-todo"
          proximoStatus="doing"
        />
        <KanbanColumn
          titulo="Doing"
          tasks={doingTasks}
          accentClass="bg-status-doing"
          proximoStatus="done"
          anteriorStatus="todo"
        />
        <KanbanColumn
          titulo="Done"
          tasks={doneTasks}
          accentClass="bg-status-done"
          anteriorStatus="doing"
        />
      </div>
    </div>
  );
};
