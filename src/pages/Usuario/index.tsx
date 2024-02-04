import { useMemo, useState } from 'react';
import { Table } from '../../components/organisms/Table';
import { MRT_ColumnDef } from 'mantine-react-table';
import { UsuarioType, UsuariosInitialValues, usuarioSchema } from './interface';
import { useForm, zodResolver } from '@mantine/form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useUser } from '../../hooks/useUsers';
import { Loading } from '../../components/atomos/Loading';
import { TitleCustom } from '../../components/molecules/Title';
import { ModalDefault } from '../../components/molecules/ModalDefault';
import FormBuilder, { Field } from '../../components/organisms/FormBuilder';
import { notifications } from '@mantine/notifications';

export function Usuarios() {
  const { handleGetUsers, handlePostUser, handlePutUser } = useUser();

  const { isLoading, data, refetch } = useQuery({
    queryKey: ['usuarios'],
    queryFn: () => handleGetUsers(),
  });

  const formBuildProps: Field[] = [
    { col: 6, label: 'Email', name: 'email', type: 'text', focus: true },
    { col: 6, label: 'Senha', name: 'senha', type: 'password' },
    { col: 6, label: 'Nome', name: 'nome', type: 'text' },
    { col: 6, label: 'Administrador', name: 'adm', type: 'checkbox' },
  ];
  console.log(data);

  const addEditUser = useMutation({
    mutationFn: (data: UsuarioType) => (data.id ? handlePutUser(data) : handlePostUser(data)),
    onError: (error: any) => {
      console.error(error);
      notifications.show({
        title: 'Erro',
        color: 'red',
        message: String(error.response.data.message),
      });
      refetch();
    },
    onSuccess: () => {
      notifications.show({
        title: 'Sucesso',
        message: `Usuário ${form.values.id ? 'editado' : 'cadastrado'} com sucesso!`,
      });
      refetch();
      setOpenModal(false);
    },
  });

  const [openModal, setOpenModal] = useState(false);

  const form = useForm<UsuarioType>({
    initialValues: UsuariosInitialValues,
    validate: zodResolver(usuarioSchema),
  });

  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: 'nome',
        header: 'Nome',
      },

      {
        accessorKey: 'email',
        header: 'Email',
      },
    ],
    []
  );

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <TitleCustom title={'Usuários'} />
          <Table
            refetch={refetch}
            handleDoubleClick={(user) => {
              user.senha = null;
              form.setValues(user);
              setOpenModal(true);
            }}
            columns={columns}
            handleEditar={(user) => {
              form.setValues(user);
              setOpenModal(true);
            }}
            data={data!}
            handleAddTable={() => {
              form.setValues(UsuariosInitialValues);
              setOpenModal(true);
            }}
          />
          <ModalDefault
            title={form.values.id ? 'Editar' : 'Adicionar'}
            size="lg"
            opened={openModal}
            onClose={() => {
              setOpenModal(false), form.reset();
            }}
          >
            <FormBuilder
              form={form}
              onSubmit={form.onSubmit((values) => addEditUser.mutate(values))}
              onCancel={() => {
                setOpenModal(false), form.reset();
                refetch();
              }}
              fields={formBuildProps}
            />
          </ModalDefault>
        </>
      )}
    </>
  );
}
