import { useForm } from 'react-hook-form'; // Lib que gere o estado de formularios 
import { zodResolver } from '@hookform/resolvers/zod'; //ponte que liga o Zod (validação) ao react-hook-form
import { useNavigate, Link } from 'react-router-dom';
import { loginSchema, type LoginFormData } from './schemas'; //o schema de validação e o tipo
import { loginUser } from './authService';
import { useAuthStore } from './authStore';

const LoginPage = () => {
  const navigate = useNavigate(); // Hook da biblioteca react-router-dom
  const login = useAuthStore((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const { token } = await loginUser(data);
      login(token);
      navigate('/tasks');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-4">
      <div className="w-full max-w-sm rounded-md border border-hairline bg-surface p-8">
        <h1 className="font-display text-2xl font-semibold text-ink">Entrar</h1>
        <p className="mt-1 text-sm text-ink-muted">Acede às tuas tasks</p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
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
            Entrar
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-ink-muted">
          Não tens conta?{' '}
          <Link
            to="/cadastro"
            className="font-medium text-accent hover:underline"
          >
            Cadastra-te
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
