import { useEffect } from 'react';
import { useTaskStore } from '../tasks/taskStore';
import { KanbanColumn } from './KanbanColumn';

export const KanbanBoard = () => {
  const { tasks, fetchTasks } = useTaskStore();

  useEffect(() => {
    fetchTasks();
  }, []);

  const todoTasks = tasks.filter((t) => t.status === 'todo');
  const doingTasks = tasks.filter((t) => t.status === 'doing');
  const doneTasks = tasks.filter((t) => t.status === 'done');

  return (
    <div style={{ display: 'flex', gap: '16px' }}>
      <KanbanColumn
        titulo="To Do"
        status="todo"
        tasks={todoTasks}
        proximoStatus="doing"
      />
      <KanbanColumn
        titulo="Doing"
        status="doing"
        tasks={doingTasks}
        proximoStatus="done"
        anteriorStatus="todo"
      />
      <KanbanColumn
        titulo="Done"
        status="done"
        tasks={doneTasks}
        anteriorStatus="doing"
      />
    </div>
  );
};
