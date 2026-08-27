import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { taskSchema, type TaskFormData, type Task } from '../schemas';
import { useTaskStore } from '../taskStore';

type TaskItemProps = {
  task: Task;
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

  if (editando) {
    return (
      <li>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register('titulo')} />
          {errors.titulo && <span>{errors.titulo.message}</span>}
          <input {...register('descricao')} />
          {errors.descricao && <span>{errors.descricao.message}</span>}
          <button type="submit">Salvar</button>
          <button type="button" onClick={() => setEditando(false)}>
            Cancelar
          </button>
        </form>
      </li>
    );
  }

  return (
    <li>
      <strong>{task.titulo}</strong> — {task.descricao} ({task.status})
      <button onClick={iniciarEdicao}>Editar</button>
      <button onClick={() => removeTask(task.id)}>Excluir</button>
    </li>
  );
};
