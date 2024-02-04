import { Avatar, Menu } from '@mantine/core';
import { IconExternalLink, IconReplace } from '@tabler/icons-react';
import store from 'store2';
import * as S from './styles';
import { useLogin } from '../../../hooks/useLogin';
import { useMutation } from '@tanstack/react-query';
import { ChangePassWordType, changePasswordSchema } from '../../../pages/Login/interface';
import { notifications } from '@mantine/notifications';
import { useState } from 'react';
import { ModalDefault } from '../../molecules/ModalDefault';
import FormBuilder, { Field } from '../../organisms/FormBuilder';
import { useForm, zodResolver } from '@mantine/form';

export const LogoutButton = () => {
  const nome = store.session.get('nome');
  const email = store.session.get('email');
  const id = store.session.get('id');
  const { handleLogout, handleChangePassword } = useLogin();
  const [openModal, setOpenModal] = useState(false);
  const form = useForm<ChangePassWordType>({
    initialValues: {
      senha: '',
      id: Number(id),
      nome: nome,
      email: email,
    },
    validate: zodResolver(changePasswordSchema),
  });
  const changePassword = useMutation({
    mutationFn: (data: ChangePassWordType) => handleChangePassword(data),
    onError: (error: any) => {
      console.error(error);
      notifications.show({
        title: 'Erro',
        color: 'red',
        message: String(error.response.data.message),
      });
    },
    onSuccess: (data) => {
      notifications.show({
        title: 'Sucesso',
        message: `Usuário editado com sucesso!`,
      });
      setOpenModal(false);
    },
  });

  const filds: Field[] = [
    {
      col: 12,
      label: 'Senha',
      name: 'senha',
      type: 'password',
      focus: true,
    },
  ];
  return (
    <S.LogoutButtonWrapper>
      <Menu offset={0} position="bottom-start">
        <Menu.Target>
          <S.LoginButton>
            <Avatar color="blue" size="sm" src={null} alt="no image here" />
            <div className="aside">
              <h5>{nome}</h5>
              <p>{email}</p>
            </div>
          </S.LoginButton>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            icon={<IconExternalLink color={'#228be6'} />}
            component="button"
            onClick={() => handleLogout()}
          >
            Sair
          </Menu.Item>
          <Menu.Item
            icon={<IconReplace color={'#228be6'} />}
            component="button"
            onClick={() => setOpenModal(true)}
          >
            Trocar senha
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
      <ModalDefault
        opened={openModal}
        onClose={() => setOpenModal(false)}
        title="Insira sua nova"
        size={'sm'}
      >
        <FormBuilder
          form={form}
          fields={filds}
          onSubmit={form.onSubmit((values) => changePassword.mutate(values))}
        />
      </ModalDefault>
    </S.LogoutButtonWrapper>
  );
};
