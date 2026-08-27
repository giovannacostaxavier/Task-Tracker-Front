import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { taskSchema, type TaskFormData, type Task } from '../schemas';
import { useTaskStore } from '../taskStore';

type TaskItemProps = {
  task: Task;
};

const statusBorder: Record<string, string> = {
  todo: 'border-l-status-todo',
  doing: 'border-l-status-doing',
  done: 'border-l-status-done',
};

const statusLabel: Record<string, string> = {
  todo: 'To Do',
  doing: 'Doing',
  done: 'Done',
};

export const TaskItem = ({ task }: TaskItemProps) => {
  const [editando, setEditando] = useState(false);
  const updateTask = useTaskStore((state) => state.updateTask);
  const removeTask = useTaskStore((state) => state.removeTask);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
  });

  const iniciarEdicao = () => {
    reset({ titulo: task.titulo, descricao: task.descricao });
    setEditando(true);
  };

  const onSubmit = async (data: TaskFormData) => {
    await updateTask(task.id, data);
    setEditando(false);
  };

  const borderClass = statusBorder[task.status] ?? 'border-l-hairline';

  if (editando) {
    return (
      <li
        className={`rounded-md border border-hairline border-l-4 ${borderClass} bg-surface p-4`}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <input
            {...register('titulo')}
            className="w-full rounded-md border border-hairline bg-bg px-3 py-2 text-sm text-ink outline-none focus:border-accent"
          />
          {errors.titulo && (
            <span className="text-xs text-status-doing">
              {errors.titulo.message}
            </span>
          )}
          <input
            {...register('descricao')}
            className="w-full rounded-md border border-hairline bg-bg px-3 py-2 text-sm text-ink outline-none focus:border-accent"
          />
          {errors.descricao && (
            <span className="text-xs text-status-doing">
              {errors.descricao.message}
            </span>
          )}
          <div className="flex gap-2">
            <button
              type="submit"
              className="rounded-md bg-accent px-3 py-1.5 text-sm text-white hover:opacity-90"
            >
              Salvar
            </button>
            <button
              type="button"
              onClick={() => setEditando(false)}
              className="rounded-md border border-hairline px-3 py-1.5 text-sm text-ink-muted hover:border-accent"
            >
              Cancelar
            </button>
          </div>
        </form>
      </li>
    );
  }

  return (
    <li
      className={`rounded-md border border-hairline border-l-4 ${borderClass} bg-surface p-4 transition hover:border-accent`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-medium text-ink">{task.titulo}</p>
          <p className="mt-1 text-sm text-ink-muted">{task.descricao}</p>
          <span className="mt-2 inline-block font-mono text-xs uppercase tracking-wide text-ink-muted">
            {statusLabel[task.status] ?? task.status}
          </span>
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            onClick={iniciarEdicao}
            className="text-sm text-ink-muted hover:text-accent"
          >
            Editar
          </button>
          <button
            onClick={() => removeTask(task.id)}
            className="text-sm text-ink-muted hover:text-status-doing"
          >
            Excluir
          </button>
        </div>
      </div>
    </li>
  );
};
