import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { cadastroSchema, type CadastroFormData } from './schemas';
import { cadastroUser } from './authService';

const RegisterPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CadastroFormData>({
    resolver: zodResolver(cadastroSchema),
  });

  const onSubmit = async (data: CadastroFormData) => {
    try {
      await cadastroUser(data);
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-4">
      <div className="w-full max-w-sm rounded-md border border-hairline bg-surface p-8">
        <h1 className="font-display text-2xl font-semibold text-ink">
          Criar conta
        </h1>
        <p className="mt-1 text-sm text-ink-muted">
          Cria a tua conta para começar
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <div>
            <label htmlFor="nome" className="text-sm font-medium text-ink">
              Nome
            </label>
            <input
              id="nome"
              type="text"
              {...register('nome')}
              className="mt-1 w-full rounded-md border border-hairline bg-bg px-3 py-2 text-sm text-ink outline-none focus:border-accent"
            />
            {errors.nome && (
              <span className="mt-1 block text-xs text-status-doing">
                {errors.nome.message}
              </span>
            )}
          </div>

          <div>
            <label htmlFor="email" className="text-sm font-medium text-ink">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              {...register('email')}
              className="mt-1 w-full rounded-md border border-hairline bg-bg px-3 py-2 text-sm text-ink outline-none focus:border-accent"
            />
            {errors.email && (
              <span className="mt-1 block text-xs text-status-doing">
                {errors.email.message}
              </span>
            )}
          </div>

          <div>
            <label htmlFor="senha" className="text-sm font-medium text-ink">
              Senha
            </label>
            <input
              id="senha"
              type="password"
              {...register('senha')}
              className="mt-1 w-full rounded-md border border-hairline bg-bg px-3 py-2 text-sm text-ink outline-none focus:border-accent"
            />
            {errors.senha && (
              <span className="mt-1 block text-xs text-status-doing">
                {errors.senha.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-accent py-2 text-sm font-medium text-white hover:opacity-90"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
