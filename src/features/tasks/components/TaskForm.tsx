import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { taskSchema, type TaskFormData } from '../schemas';
import { useTaskStore } from '../taskStore';

export const TaskForm = () => {
  const addTask = useTaskStore((state) => state.addTask);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
  });

  const onSubmit = async (data: TaskFormData) => {
    await addTask(data);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-3 rounded-md border border-hairline bg-surface p-4 sm:flex-row sm:items-start"
    >
      <div className="flex-1">
        <input
          type="text"
          placeholder="Título"
          {...register('titulo')}
          className="w-full rounded-md border border-hairline bg-bg px-3 py-2 text-sm text-ink outline-none focus:border-accent"
        />
        {errors.titulo && (
          <span className="mt-1 block text-xs text-status-doing">
            {errors.titulo.message}
          </span>
        )}
      </div>

      <div className="flex-1">
        <input
          type="text"
          placeholder="Descrição"
          {...register('descricao')}
          className="w-full rounded-md border border-hairline bg-bg px-3 py-2 text-sm text-ink outline-none focus:border-accent"
        />
        {errors.descricao && (
          <span className="mt-1 block text-xs text-status-doing">
            {errors.descricao.message}
          </span>
        )}
      </div>

      <button
        type="submit"
        className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-white hover:opacity-90"
      >
        Criar task
      </button>
    </form>
  );
};
