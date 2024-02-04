import { Paper, Title } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { notifications } from '@mantine/notifications';
import { LoginInitialValues, LoginType, loginSchema } from '../../interfaces/user.interface';
import { useLogin } from '../../hooks/useLogin';
import FormBuilder from '../../components/organisms/FormBuilder';
import * as S from './styles';

export const LoginPage = () => {
  const { handleLogin } = useLogin();
  const navigate = useNavigate();
  const form = useForm<LoginType>({
    initialValues: LoginInitialValues,
    validate: zodResolver(loginSchema),
  });
  const queryClient = useQueryClient();
  const postLogin = useMutation({
    mutationFn: (data: LoginType) => handleLogin(data),
    onError: (error: any) => {
      console.error(error);
      notifications.show({
        title: 'Erro',
        color: 'red',
        message: String(error.response.data.message),
      });
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['userData'], data);
      notifications.show({
        title: 'Sucesso',
        message: 'Login efetuado com sucesso',
      });
      navigate('/clientes');
    },
  });

  return (
    <>
      <S.LoginWrapper>
        <div className="login">
          <Title>Desafio CartSys</Title>
          <Paper p={40} mt={10} withBorder shadow="md" radius="5px">
            <FormBuilder
              onSubmit={form.onSubmit((values) => postLogin.mutate(values))}
              form={form}
              fields={[
                {
                  col: 12,
                  label: 'Usuário',
                  name: 'login',
                  type: 'text',
                  focus: true,
                },
                {
                  col: 12,
                  label: 'Password',
                  name: 'senha',
                  type: 'password',
                },
              ]}
            />
          </Paper>
        </div>
        <S.BeWelcomeWrapper>
          <h2>Seja Bem Vindo</h2>
        </S.BeWelcomeWrapper>
      </S.LoginWrapper>
    </>
  );
};
