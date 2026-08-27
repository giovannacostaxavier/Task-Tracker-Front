import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { taskSchema, type TaskFormData, type Task } from '../schemas';
import { useTaskStore } from '../taskStore';

type TaskCardProps = {
  task: Task;
  proximoStatus?: string;
  anteriorStatus?: string;
};

const statusBorder: Record<string, string> = {
  todo: 'border-l-status-todo',
  doing: 'border-l-status-doing',
  done: 'border-l-status-done',
};

export const TaskCard = ({
  task,
  proximoStatus,
  anteriorStatus,
}: TaskCardProps) => {
  const [editando, setEditando] = useState(false);
  const updateTask = useTaskStore((state) => state.updateTask);
  const removeTask = useTaskStore((state) => state.removeTask);
  const moveTask = useTaskStore((state) => state.moveTask);

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
        className={`rounded-md border border-hairline border-l-4 ${borderClass} bg-surface p-3`}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <input
            {...register('titulo')}
            className="w-full rounded-md border border-hairline bg-bg px-2 py-1.5 text-sm text-ink outline-none focus:border-accent"
          />
          {errors.titulo && (
            <span className="text-xs text-status-doing">
              {errors.titulo.message}
            </span>
          )}
          <input
            {...register('descricao')}
            className="w-full rounded-md border border-hairline bg-bg px-2 py-1.5 text-sm text-ink outline-none focus:border-accent"
          />
          {errors.descricao && (
            <span className="text-xs text-status-doing">
              {errors.descricao.message}
            </span>
          )}
          <div className="flex gap-2">
            <button
              type="submit"
              className="rounded-md bg-accent px-3 py-1 text-xs text-white hover:opacity-90"
            >
              Salvar
            </button>
            <button
              type="button"
              onClick={() => setEditando(false)}
              className="rounded-md border border-hairline px-3 py-1 text-xs text-ink-muted hover:border-accent"
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
      className={`rounded-md border border-hairline border-l-4 ${borderClass} bg-surface p-3 transition hover:border-accent`}
    >
      <p className="text-sm font-medium text-ink">{task.titulo}</p>
      <p className="mt-1 text-xs text-ink-muted">{task.descricao}</p>

      <div className="mt-3 flex items-center justify-between">
        <div className="flex gap-2">
          {anteriorStatus && (
            <button
              onClick={() => moveTask(task.id, anteriorStatus)}
              className="rounded-md border border-hairline px-2 py-1 text-xs text-ink-muted hover:border-accent"
            >
              ← Voltar
            </button>
          )}
          {proximoStatus && (
            <button
              onClick={() => moveTask(task.id, proximoStatus)}
              className="rounded-md bg-accent px-2 py-1 text-xs text-white hover:opacity-90"
            >
              Avançar →
            </button>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={iniciarEdicao}
            className="text-xs text-ink-muted hover:text-accent"
          >
            Editar
          </button>
          <button
            onClick={() => removeTask(task.id)}
            className="text-xs text-ink-muted hover:text-status-doing"
          >
            Excluir
          </button>
        </div>
      </div>
    </li>
  );
};
