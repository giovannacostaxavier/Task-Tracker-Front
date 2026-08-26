import { useEffect, useState } from 'react';
import { useTaskStore } from './taskStore';

export const TaskList = () => {
  const { tasks, loading, error, fetchTasks, addTask, updateTask, removeTask } =
    useTaskStore();

  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [tituloEdit, setTituloEdit] = useState('');
  const [descricaoEdit, setDescricaoEdit] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCriar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo.trim()) return;
    await addTask(titulo, descricao);
    setTitulo('');
    setDescricao('');
  };

  const iniciarEdicao = (
    id: string,
    tituloAtual: string,
    descricaoAtual: string,
  ) => {
    setEditandoId(id);
    setTituloEdit(tituloAtual);
    setDescricaoEdit(descricaoAtual);
  };

  const salvarEdicao = async (id: string) => {
    await updateTask(id, tituloEdit, descricaoEdit);
    setEditandoId(null);
  };

  return (
    <div>
      <h2>Minhas Tasks</h2>

      <form onSubmit={handleCriar}>
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <input
          type="text"
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
        <button type="submit">Criar task</button>
      </form>

      {loading && <p>Carregando...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {editandoId === task.id ? (
              <>
                <input
                  value={tituloEdit}
                  onChange={(e) => setTituloEdit(e.target.value)}
                />
                <input
                  value={descricaoEdit}
                  onChange={(e) => setDescricaoEdit(e.target.value)}
                />
                <button onClick={() => salvarEdicao(task.id)}>Salvar</button>
                <button onClick={() => setEditandoId(null)}>Cancelar</button>
              </>
            ) : (
              <>
                <strong>{task.titulo}</strong> — {task.descricao} ({task.status}
                )
                <button
                  onClick={() =>
                    iniciarEdicao(task.id, task.titulo, task.descricao)
                  }
                >
                  Editar
                </button>
                <button onClick={() => removeTask(task.id)}>Excluir</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
