import { useMemo, useState } from 'react';
import { Table } from '../../components/organisms/Table';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useForm, zodResolver } from '@mantine/form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useClient } from '../../hooks/useClients';
import { Loading } from '../../components/atomos/Loading';
import { TitleCustom } from '../../components/molecules/Title';
import { ModalDefault } from '../../components/molecules/ModalDefault';
import FormBuilder, { Field } from '../../components/organisms/FormBuilder';
import { notifications } from '@mantine/notifications';
import { ModalDelete } from '../../components/molecules/ModalDelete';
import { ClientInitialvalues, userSchema, ClientType } from '../../interfaces/client.interface';
import { Group, Radio } from '@mantine/core';

export function Clientes() {
  const { handleGetClients, handlePostClient, handlePutClient, handleDelete } = useClient();
  const [openModal, setOpenModal] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [isFisicalPerson, setIsFisicalPerson] = useState('fisica');

  const { isLoading, data, refetch } = useQuery({
    queryKey: ['clientes'],
    queryFn: () => handleGetClients(),
  });

  const formBuildPropsFisical: Field[] = useMemo(
    () => [
      { col: 12, label: 'Email', name: 'email', type: 'text', focus: true },
      { col: 12, label: 'Nome', name: 'nome', type: 'text' },
      { col: 12, label: 'Cpf', name: 'cpf', type: 'cpf' },
    ],
    [isFisicalPerson]
  );
  const formBuildPropsJuridical: Field[] = useMemo(
    () => [
      { col: 12, label: 'Email', name: 'email', type: 'text', focus: true },
      { col: 12, label: 'Nome', name: 'nome', type: 'text' },
      { col: 12, label: 'Cnpj', name: 'cnpj', type: 'cnpj' },
    ],
    [isFisicalPerson]
  );

  const [formBuildToRender, setFormBuildToRender] = useState(formBuildPropsFisical);

  const form = useForm<ClientType>({
    initialValues: ClientInitialvalues,
    validate: zodResolver(userSchema),
  });

  const addEditUser = useMutation({
    mutationFn: (data: ClientType) =>
      data.id ? handlePutClient(data.id, data) : handlePostClient(data),
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

  const deleteUser = useMutation({
    mutationFn: () => handleDelete(form.values.id),
    onSuccess: () => {
      refetch();
      form.setValues(ClientInitialvalues);
      setOpenModalDelete(false);
    },
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
          <TitleCustom title={'Clientes'} />

          <Table
            refetch={refetch}
            handleDeleteItem={(user) => {
              setOpenModalDelete(true);
              form.setValues(user);
            }}
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
              form.setValues(ClientInitialvalues);
              setOpenModal(true);
            }}
          />
          <ModalDefault
            title={form.values.id ? 'Editar' : 'Adicionar'}
            size="md"
            opened={openModal}
            onClose={() => {
              setOpenModal(false);
              form.reset();
            }}
          >
            <>
              <Radio.Group
                name="isPessoaFisica"
                label="Pessoa fisica ou juridica?"
                value={isFisicalPerson}
                onChange={(e) => {
                  setIsFisicalPerson(e);
                  setFormBuildToRender(
                    e === 'fisica' ? formBuildPropsFisical : formBuildPropsJuridical
                  );
                }}
                style={{ margin: '20px 0' }}
              >
                <Group mt="xs">
                  <Radio value="fisica" label="Fisíca" />
                  <Radio value="juridica" label="Jurídica" />
                </Group>
              </Radio.Group>

              <FormBuilder
                form={form}
                onSubmit={form.onSubmit((values) => addEditUser.mutate(values))}
                onCancel={() => {
                  setOpenModal(false);
                  form.reset();
                  refetch();
                }}
                fields={formBuildToRender}
              />
            </>
          </ModalDefault>

          <ModalDelete
            setOpened={setOpenModalDelete}
            onClose={() => setOpenModalDelete(false)}
            onConfirm={() => deleteUser.mutate()}
            opened={openModalDelete}
            description={`Tem certeza que deseja deletar o usuário ${form.values.nome}?`}
          />
        </>
      )}
    </>
  );
}
