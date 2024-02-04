import React from 'react';
import {
  Checkbox,
  Grid,
  NumberInput,
  PasswordInput,
  ScrollArea,
  Select,
  TextInput,
  Textarea,
  TransferListData,
  TransferListItem,
} from '@mantine/core';
import { FormButton } from '../../molecules/FormButton';
import { FormBuildWrapper } from './styles';
import {
  CnpjMaskedTextField,
  MaskedCelPhone,
  MaskedIE,
  removeAllEspetialCaracters,
} from '../../../utils/Utils';
import { DateInputCustom } from '../../atomos/DateInputCustom';
import { InputCnpj } from '../../atomos/InputCnpj';
import { Inputcpf } from '../../atomos/inputCpf';
import InputValor from '../../atomos/InputValor';

export interface Field {
  type: string;
  placeholder?: string;
  name: string;
  label: string;
  focus?: boolean;
  options?: Array<{ value: string; label: string }>;
  data?: TransferListItem[];
  transferData?: TransferListData;
  col: number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  ref?: React.Ref<HTMLInputElement>;
}

interface FormBuilderProps {
  fields: Field[];
  onSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
  onCancel?: () => void;
  form: any;
}
const customTextareaStyles = {
  textarea: {
    overflow: 'hidden', // Impede a exibição da barra de rolagem
    resize: 'none', // Impede o redimensionamento
    // Adicione qualquer outro estilo personalizado que você desejar
  },
};
const FormBuilder: React.FC<FormBuilderProps> = ({ fields, form, onSubmit, onCancel }) => {
  const mappedFields = fields?.map((field) => {
    const {
      type,
      placeholder,
      name,
      label,
      options,
      col,
      required,
      maxLength,
      data,
      focus,
      transferData,
      onChange,
      ref,
    } = field;

    if (type === 'select') {
      return (
        <Grid.Col span={col} key={name}>
          <Select
            key={name}
            data-autofocus={focus}
            transitionProps={{ duration: 150, transition: 'pop-top-left', timingFunction: 'ease' }}
            label={label}
            data={options}
            placeholder={placeholder}
            {...form.getInputProps(name)}
            required={required}
          />
        </Grid.Col>
      );
    }
    if (type === 'status') {
      return (
        <Grid.Col span={col} key={name}>
          <Select
            key={name}
            data-autofocus={focus}
            transitionProps={{ duration: 150, transition: 'pop-top-left', timingFunction: 'ease' }}
            label={label}
            data={options}
            placeholder={placeholder}
            {...form.getInputProps(name)}
            onChange={(value) => {
              value !== 'B' && form.setFieldValue('valor', 0);
              value === 'B' && form.setFieldValue('valor', 100);
              form.setFieldValue('status', value);
            }}
            required={required}
          />
        </Grid.Col>
      );
    }
    if (type === 'text') {
      return (
        <Grid.Col span={col} key={name}>
          <TextInput
            data-autofocus={focus}
            ref={ref ? ref : null}
            key={name}
            onChange={onChange ? onChange : null}
            maxLength={maxLength}
            placeholder={placeholder}
            label={label}
            {...form.getInputProps(name)}
          />
        </Grid.Col>
      );
    }
    if (type === 'number') {
      return (
        <Grid.Col span={col} key={name}>
          <NumberInput
            data-autofocus={focus}
            placeholder={placeholder}
            label={label}
            withAsterisk={required}
            maxLength={maxLength}
            {...form.getInputProps(name)}
          />
        </Grid.Col>
      );
    }
    if (type === 'password') {
      return (
        <Grid.Col span={col} key={name}>
          <PasswordInput
            data-autofocus={focus}
            placeholder={placeholder}
            value={form.getInputProps(name)?.value ?? ''}
            label={label}
            withAsterisk={required}
            maxLength={maxLength}
            {...form.getInputProps(name)}
          />
        </Grid.Col>
      );
    }
    if (type === 'checkbox') {
      return (
        <Grid.Col span={col} key={name}>
          <Checkbox
            data-autofocus={focus}
            label={label}
            withAsterisk={required}
            {...form.getInputProps(name)}
            checked={form.getInputProps(name).value}
          />
        </Grid.Col>
      );
    }
    if (type === 'textarea') {
      return (
        <Grid.Col span={col} key={name}>
          <Textarea
            autosize
            label={label}
            withAsterisk={required}
            {...form.getInputProps(name)}
            data-autofocus={focus}
          />
        </Grid.Col>
      );
    }

    if (type === 'cnpj') {
      return (
        <Grid.Col span={col} key={name}>
          <InputCnpj form={form} focus={focus} />
        </Grid.Col>
      );
    }
    if (type === 'cpf') {
      return (
        <Grid.Col span={col} key={name}>
          <Inputcpf form={form} focus={focus} />
        </Grid.Col>
      );
    }

    if (type === 'valor') {
      return (
        <Grid.Col span={col} key={name}>
          <InputValor
            value={form.values.preco}
            onChangeEvent={(e) => form.setFieldValue('preco', e)}
          />
        </Grid.Col>
      );
    }

    return null;
  });

  return (
    <form onSubmit={onSubmit}>
      <FormBuildWrapper>
        <Grid align="end" gutter="lg">
          {mappedFields}
        </Grid>

        <Grid align="end" gutter="lg">
          <Grid.Col sm={12} mt={9}>
            <FormButton onCancel={onCancel} />
          </Grid.Col>
        </Grid>
      </FormBuildWrapper>
    </form>
  );
};

export default FormBuilder;
