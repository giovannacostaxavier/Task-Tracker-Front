import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { loginSchema, type LoginFormData } from './schemas';
import { loginUser } from './authService';
import { useAuthStore } from './authStore';

const LoginPage = () => {
  const navigate = useNavigate();
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="email">E-mail</label>
        <input id="email" type="email" {...register('email')} />
        {errors.email && <span>{errors.email.message}</span>}
      </div>

      <div>
        <label htmlFor="senha">Senha</label>
        <input id="senha" type="password" {...register('senha')} />
        {errors.senha && <span>{errors.senha.message}</span>}
      </div>

      <button type="submit">Entrar</button>
    </form>
  );
};

export default LoginPage;
