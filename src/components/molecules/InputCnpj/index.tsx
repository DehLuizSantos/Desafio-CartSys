import { TextInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { CnpjMaskedTextField, removeAllEspetialCaracters } from '../../../utils/Utils';
import { useMutation } from '@tanstack/react-query';
import { useCnpj } from '../../../hooks/useCnpj';
import { useForm, zodResolver } from '@mantine/form';
import { ClienteType, clienteInitialValues, clienteSchema } from '../../../pages/Cliente/interface';

interface InputCnpjProps {
  onSearch?: (result: any) => void;
  form?: any;
  focus?: boolean;
}

export const InputCnpj = ({ onSearch, form, focus }: InputCnpjProps) => {
  const form2 = useForm<ClienteType>({
    initialValues: clienteInitialValues,
    validate: zodResolver(clienteSchema),
  });
  const { handleGetCnpj } = useCnpj();
  const handleClick = useMutation({
    mutationFn: (data: string) => handleGetCnpj(data),
    onError: (error: any) => {
      console.error(error);
      notifications.show({
        title: 'Erro',
        color: 'red',
        message: String(error.response.data.message),
      });
    },
    onSuccess: (data: any) => {
      onSearch && onSearch(data);
    },
  });

  return (
    <>
      {form2 && (
        <TextInput
          onKeyDown={(key) => {
            if (key.key === 'Enter' || key.key === 'Tab') {
              handleClick.mutate(form2.getInputProps('cnpj')?.value);
            } else {
              null;
            }
          }}
          data-autofocus={focus}
          {...form2.getInputProps('cnpj')}
          value={CnpjMaskedTextField(form2.getInputProps('cnpj')?.value)}
          onChange={(event) =>
            form2.setFieldValue('cnpj', removeAllEspetialCaracters(event.target.value))
          }
          label={'CNPJ'}
          maxLength={18}
          error={form2.getInputProps('cnpj')?.error}
          placeholder={'00.000.000/0000-00'}
        />
      )}
    </>
  );
};
