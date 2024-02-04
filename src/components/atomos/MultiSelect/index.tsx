import { useCallback, useState } from 'react';
import * as S from './styles';
import { MultiSelect, SelectItem } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { ModalDelete } from '../../molecules/ModalDelete';
import { ClienteVincType } from '../../../pages/Cliente/interface';
import { useUser } from '../../../hooks/useUsers';

type MultiSelectCustomProps = {
  form: UseFormReturnType<any>;
  data: (string | SelectItem)[];
  name: string;
};

const MultiSelectCustom = ({ data, form, name }: MultiSelectCustomProps) => {
  const { handleDeleteVinc } = useUser();
  const [open, setOpen] = useState(false);
  const [deletedData, setDeletedData] = useState<ClienteVincType>();
  const [newArray, setNewArray] = useState<ClienteVincType[]>();
  const compareWithForm = useCallback(
    (item: string[]) => {
      const sendData = item
        .filter((d) => !form.values.clientes.some((o: any) => String(o.idcliente) === d))
        .map((send) => {
          return {
            id: null,
            idcliente: send,
          };
        });

      const deleteData = form.values.clientes.filter(
        (d: any) => !item.includes(String(d.idcliente))
      );

      if (deleteData.length > 0) {
        setOpen(true);
        setDeletedData(deleteData[0]);

        const narray = form.values.clientes.filter((d: any) => item.includes(String(d.idcliente)));
        setNewArray(narray);
      }
      const formatedArray = [...form.values.clientes, ...sendData];

      form.setFieldValue(name, formatedArray);
    },
    [form]
  );

  const handleDelete = () => {
    handleDeleteVinc(String(deletedData?.id));
    form.setFieldValue(name, newArray);
    setOpen(false);
  };
  return (
    <S.MultiSelectContainer>
      <MultiSelect
        data={data}
        value={form.values.clientes.map((cliente: any) => String(cliente.idcliente))}
        onChange={(e) => compareWithForm(e)}
        transitionProps={{ duration: 150, transition: 'pop-top-left', timingFunction: 'ease' }}
        nothingFound="Nada encontrado"
        maxDropdownHeight={100}
        dropdownPosition="bottom"
        searchable
      />
      <ModalDelete
        description={deletedData?.nome ?? ''}
        onConfirm={handleDelete}
        setOpened={() => setOpen(false)}
        onClose={() => setOpen(false)}
        opened={open}
      />
    </S.MultiSelectContainer>
  );
};

export default MultiSelectCustom;
