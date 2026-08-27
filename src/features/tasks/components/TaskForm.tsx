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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input type="text" placeholder="Título" {...register('titulo')} />
        {errors.titulo && <span>{errors.titulo.message}</span>}
      </div>
      <div>
        <input type="text" placeholder="Descrição" {...register('descricao')} />
        {errors.descricao && <span>{errors.descricao.message}</span>}
      </div>
      <button type="submit">Criar task</button>
    </form>
  );
};
