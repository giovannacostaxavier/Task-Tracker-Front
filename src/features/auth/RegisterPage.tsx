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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="nome">Nome</label>
        <input id="nome" type="text" {...register('nome')} />
        {errors.nome && <span>{errors.nome.message}</span>}
      </div>

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

      <button type="submit">Cadastrar</button>
    </form>
  );
};

export default RegisterPage;
