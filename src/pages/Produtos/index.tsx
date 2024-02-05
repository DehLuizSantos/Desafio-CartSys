import { useMemo, useState } from 'react';
import { Table } from '../../components/organisms/Table';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useForm, zodResolver } from '@mantine/form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Loading } from '../../components/atomos/Loading';
import { TitleCustom } from '../../components/molecules/Title';
import { ModalDefault } from '../../components/molecules/ModalDefault';
import FormBuilder, { Field } from '../../components/organisms/FormBuilder';
import { notifications } from '@mantine/notifications';
import { ModalDelete } from '../../components/molecules/ModalDelete';
import {
  ProductType,
  ProductInitialvalues,
  productSchema,
} from '../../interfaces/product.interface';
import { useProduct } from '../../hooks/useProducts';
import { Badge } from '@mantine/core';
import { Row } from 'jspdf-autotable';

export function Produtos() {
  const { handleDeleteProduct, handleGetProducts, handlePostProduct, handlePutProduct } =
    useProduct();
  const [openModal, setOpenModal] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);

  const { isLoading, data, refetch } = useQuery({
    queryKey: ['produtos'],
    queryFn: () => handleGetProducts(),
  });

  const formBuildProps: Field[] = useMemo(
    () => [
      { col: 12, label: 'Ativo', name: 'ativo', type: 'checkbox' },
      { col: 12, label: 'Descrição', name: 'descricao', type: 'text', focus: true },
      { col: 12, label: 'Estoque', name: 'estoque', type: 'number' },
      { col: 12, label: 'Preço', name: 'preco', type: 'valor' },
    ],
    []
  );

  const form = useForm<ProductType>({
    initialValues: ProductInitialvalues,
    validate: zodResolver(productSchema),
  });

  const addEditProduct = useMutation({
    mutationFn: (data: ProductType) =>
      data.id ? handlePutProduct(data.id, data) : handlePostProduct(data),
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
        message: `Produto ${form.values.id ? 'editado' : 'cadastrado'} com sucesso!`,
      });
      refetch();
      setOpenModal(false);
    },
  });

  const deleteProduct = useMutation({
    mutationFn: () => handleDeleteProduct(form.values.id),
    onSuccess: () => {
      refetch();
      form.setValues(ProductInitialvalues);
      setOpenModalDelete(false);
    },
  });

  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: 'descricao',
        header: 'Descrição',
      },

      {
        accessorKey: 'estoque',
        header: 'Estoque',
      },
      {
        accessorKey: 'preco',
        header: 'Preco',
        Cell: ({ renderedCellValue, row }) => (
          <p>
            {row.original.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </p>
        ),
      },
      {
        accessorKey: 'ativo',
        header: 'Ativo',
        Cell: ({ renderedCellValue, row }) => (
          <Badge color={row.original.ativo ? 'green' : 'red'}>
            {row.original.ativo ? 'ativo' : 'desativado'}
          </Badge>
        ),
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
          <TitleCustom title={'Produtos'} />

          <Table
            refetch={refetch}
            handleDeleteItem={(product) => {
              setOpenModalDelete(true);
              form.setValues(product);
            }}
            handleDoubleClick={(product) => {
              product.senha = null;
              form.setValues(product);
              setOpenModal(true);
            }}
            columns={columns}
            handleEditar={(product) => {
              form.setValues(product);
              setOpenModal(true);
            }}
            data={data!}
            handleAddTable={() => {
              form.setValues(ProductInitialvalues);
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
              <FormBuilder
                form={form}
                onSubmit={form.onSubmit((values) => addEditProduct.mutate(values))}
                onCancel={() => {
                  setOpenModal(false);
                  form.reset();
                  refetch();
                }}
                fields={formBuildProps}
              />
            </>
          </ModalDefault>

          <ModalDelete
            setOpened={setOpenModalDelete}
            onClose={() => setOpenModalDelete(false)}
            onConfirm={() => deleteProduct.mutate()}
            opened={openModalDelete}
            description={`Tem certeza que deseja deletar o produto ${form.values.descricao}?`}
          />
        </>
      )}
    </>
  );
}
