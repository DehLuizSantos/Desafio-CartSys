import { useCallback, useRef } from 'react';
import { Button, TextInput } from '@mantine/core';
import axios from 'axios';
import { UseFormReturnType } from '@mantine/form';
import * as S from './styles';
import { notifications } from '@mantine/notifications';
import { cepMasked } from '../../../utils/Utils';

export interface IViaCep {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

interface InputCepProps {
  onSearch: (result: IViaCep) => void;
  form: UseFormReturnType<any>;
}

export const InputCep = ({ onSearch, form }: InputCepProps) => {
  const input = useRef<HTMLInputElement>(null);

  const handleConsultarCep = useCallback(
    async (cepValue: string) => {
      const cep = cepValue
        ? cepValue.replace('-', '')
        : input.current?.value.replace('-', '') ?? '';

      if (cep.length < 8) {
        notifications.show({
          message: 'CEP DEVE CONTER 8 DIGITOS',
          color: 'red',
        });
        return;
      }
      try {
        const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

        const viaCepResponse = data as IViaCep;
        if (data.erro) {
          notifications.show({
            message: 'CEP NÃO ENCONTRADO',
            color: 'red',
          });
          return;
        }

        onSearch(viaCepResponse);
      } catch (error) {
        console.error(error);
        notifications.show({
          message: 'ERRO AO PROCURAR CEP',
          color: 'red',
        });
      }
    },
    [form]
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    form.setFieldValue('zipCode', e.target.value);
  };

  return (
    <S.InputCepWrapper>
      <>
        <label>Verifique a disponibilidade em sua região</label>
        <div className="text-search-wrapper">
          <TextInput
            maxLength={9}
            w={'50%'}
            placeholder="00000-000"
            size="xl"
            autoComplete="off"
            data-autofocus
            ref={input}
            onKeyDown={(key) => {
              if (key.key === 'Enter') {
                handleConsultarCep(form.getInputProps('zipCode').value);
                key.preventDefault();
              }
            }}
            value={cepMasked(form.getInputProps('zipCode').value)}
            onChange={onChange}
            error={form.getInputProps('zipCode').error}
          />
          <Button onClick={() => handleConsultarCep(form.getInputProps('zipCode').value)}>
            {form.values.uuid ? 'Contiuar editando' : 'Buscar'}
          </Button>
        </div>
      </>
    </S.InputCepWrapper>
  );
};
