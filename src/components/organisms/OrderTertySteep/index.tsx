import { Button, Checkbox, Grid, Select } from '@mantine/core';
import * as S from './styles';
import MyTextInput from '../../atomos/MyTextInput';
import { useForm, zodResolver } from '@mantine/form';
import { estadosBrasileiros } from '../../../utils/MockEstadosCidades';
import {
  Endereco,
  addressesInitialValue,
  addressesSchema,
} from '../../../interfaces/endereco.interface';
import { InputCep } from '../../atomos/InputCep';
import { useCallback } from 'react';
import { usePedidosStore } from '../../../store/Pedido';

type OrderTertySteepProps = {
  onNextSteep: () => void;
  onGoBackSteep: () => void;
};

const OrderTertySteep = ({ onGoBackSteep, onNextSteep }: OrderTertySteepProps) => {
  const addAdresses = usePedidosStore((state: any) => state.addAdresses);

  const form = useForm<Endereco>({
    validate: zodResolver(addressesSchema),
    initialValues: addressesInitialValue,
  });

  const handleSearchCep = useCallback(
    (e: any) => {
      form.setValues(e);
      const numberRef = document.getElementById('numero');
      numberRef?.focus();
    },
    [form]
  );

  return (
    <S.OrderTertySteepWrapper>
      <h2>Cadastre o endereço para entrega</h2>
      <S.FormAdressesWrapper>
        <Grid.Col span={12}>
          <InputCep form={form} onSearch={(e) => handleSearchCep(e)} />
        </Grid.Col>
        <Grid.Col span={9}>
          <MyTextInput label="Rua" {...form.getInputProps('logradouro')} />
        </Grid.Col>
        <Grid.Col span={3}>
          <MyTextInput
            id={'numero'}
            label="Número"
            radius={5}
            size="md"
            {...form.getInputProps('numero')}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <MyTextInput label="Complemento" {...form.getInputProps('referencia')} />
        </Grid.Col>
        <Grid.Col span={12}>
          <MyTextInput label="Bairro" {...form.getInputProps('bairro')} />
        </Grid.Col>

        <Grid.Col span={8}>
          <MyTextInput label="Cidade" {...form.getInputProps('localidade')} />
        </Grid.Col>
        <Grid.Col span={4}>
          <Select
            searchable
            clearable
            size="md"
            label="UF"
            {...form.getInputProps('uf')}
            data={estadosBrasileiros}
          />
        </Grid.Col>

        <Grid.Col span={6} mt={30}>
          <Button color="red" variant="outline" fullWidth onClick={() => onGoBackSteep()}>
            Voltar
          </Button>
        </Grid.Col>
        <Grid.Col span={6} mt={30}>
          <Button
            fullWidth
            onClick={() => {
              addAdresses(form.values);
              onNextSteep();
            }}
            disabled={!form.isValid()}
          >
            Confirmar
          </Button>
        </Grid.Col>
      </S.FormAdressesWrapper>
    </S.OrderTertySteepWrapper>
  );
};

export default OrderTertySteep;
