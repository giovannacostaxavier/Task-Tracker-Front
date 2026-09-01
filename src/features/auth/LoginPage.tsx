import { useForm } from 'react-hook-form'; // Lib que gere o estado de formularios
import { zodResolver } from '@hookform/resolvers/zod'; //ponte que liga o Zod (validação) ao react-hook-form
import { useNavigate, Link } from 'react-router-dom';
import { loginSchema, type LoginFormData } from './schemas'; //o schema de validação e o tipo
import { loginUser } from './authService';
import { useAuthStore } from './authStore';

const LoginPage = () => {
  const navigate = useNavigate(); // Hook da biblioteca react-router-dom
  const login = useAuthStore((state) => state.login);
  /*Esse state é o selector que ja vem nativo com todas as informacoes dessa funcao, e estamos pegando so a parte que interessa no caso o LOGIN */
  const {
    //Oegando oque nos interessa do objeto useForm
    register, // register('email'): conecta este input ao estado do formulário
    handleSubmit, //valida os dados com o Zod antes de chamar onSubmit; bloqueia o submit se houver erro
    formState: { errors }, //objeto com as mensagens de erro de validação de cada campo, indexado pelo nome do campo
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema), //usa o ZOD com as regras do loginSchema para validar
  });

  const onSubmit = async (data: LoginFormData) => {
    //funcao que vai ser chamada no onsubmit
    try {
      const { token } = await loginUser(data); // Destructuring do token qe vem de loginUser(data)
      login(token); //Guarda o token no store
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
              {...register('email')} // Nome identico ao da propriedade do loginSchema
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
              {...register('senha')} //// Nome identico ao da propriedade do loginSchema
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
