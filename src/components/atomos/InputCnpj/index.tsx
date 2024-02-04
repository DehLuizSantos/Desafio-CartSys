import { TextInput } from '@mantine/core';
import { CnpjMaskedTextField, removeAllEspetialCaracters } from '../../../utils/Utils';
import { UseFormReturnType } from '@mantine/form';
import { ClientType } from '../../../interfaces/client.interface';

interface InputCnpjProps {
  form: UseFormReturnType<ClientType>;
  focus?: boolean;
}

export const InputCnpj = ({ form, focus }: InputCnpjProps) => {
  return (
    <TextInput
      data-autofocus={focus}
      {...form.getInputProps('cnpj')}
      value={CnpjMaskedTextField(form.getInputProps('cnpj')?.value)}
      onChange={(event) =>
        form.setFieldValue('cnpj', removeAllEspetialCaracters(event.target.value))
      }
      label={'CNPJ'}
      maxLength={18}
      error={form.getInputProps('cnpj')?.error}
      placeholder={'00.000.000/0000-00'}
    />
  );
};
