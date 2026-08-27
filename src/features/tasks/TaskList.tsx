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
    <div>
      <h2>Minhas Tasks</h2>

      <TaskForm />

      {loading && <p>Carregando...</p>}
      {error && <p>{error}</p>}

      <ul>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
};
