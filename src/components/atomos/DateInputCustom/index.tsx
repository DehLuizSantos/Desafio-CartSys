import { useMantineTheme } from '@mantine/core';
import { InputWrapper } from './styles';
import { DateInput } from '@mantine/dates';

interface DateInputCustomProps {
  label: string;
  form: any;
  name: string;
}

export const DateInputCustom = ({ label, form, name }: DateInputCustomProps) => {
  const theme = useMantineTheme();
  return (
    <>
      <InputWrapper>
        <label
          className={`mantine-Input-input mantine-TextInput-input mantine-${
            theme.colorScheme === 'light' ? '1fzet7j' : '1mo4y8r'
          }`}
        >
          {label}
        </label>
        <input
          type="date"
          className={`mantine-Input-input mantine-TextInput-input mantine-${
            theme.colorScheme === 'light' ? 'gszoqu' : 'hdfsgm'
          }`}
          {...form.getInputProps(name)}
        />
      </InputWrapper>

      {/* Incluso pois o componente DateInputCustom  não estava trocando o Theme corretamente e estava perdendo o style no envio de formulário, após ter um input utilizando as mesmas classes CSS do componente DateInputCustom, o problema foi resolvido. */}
      <div style={{ display: 'none' }}>
        <DateInput />
      </div>
    </>
  );
};
