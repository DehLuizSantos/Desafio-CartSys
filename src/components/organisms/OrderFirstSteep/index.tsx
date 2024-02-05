import { useState } from 'react';
import * as S from './styles';
import { useQuery } from '@tanstack/react-query';
import { useClient } from '../../../hooks/useClients';
import { LoadingLoad } from '../../atomos/Loading/styles';
import CheckBoxCustom from '../../atomos/CheckBox';
import { useProduct } from '../../../hooks/useProducts';
import { ActionIcon, Button } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';

const OrderFirstSteep = () => {
  const [clientSelect, setClientSelect] = useState<string[]>([]);
  const [produtosSelecteds, setProdutosSelected] = useState<string[]>([]);
  const { handleGetClients } = useClient();
  const { handleGetProducts } = useProduct();

  const { isLoading: loadingClientes, data: clientes } = useQuery({
    queryKey: ['clientes'],
    queryFn: () => handleGetClients(),
  });

  const { isLoading: loadingProdutos, data: produtos } = useQuery({
    queryKey: ['produtos'],
    queryFn: () => handleGetProducts(),
  });

  const loading = loadingProdutos || loadingClientes;
  return (
    <S.OrderFirstSteepWrapper>
      {loading ? (
        <LoadingLoad />
      ) : (
        <>
          {clientSelect.length > 0 && (
            <div className="go-back">
              <ActionIcon onClick={() => setClientSelect([])}>
                <IconArrowLeft />
              </ActionIcon>
              <p>Voltar aos clientes</p>
            </div>
          )}
          <p>
            Cliente selecionado: <span className="destaque">{clientSelect[0]}</span>
          </p>
          <h2>{clientSelect.length > 0 ? 'Produtos' : 'Cliente'}</h2>

          {clientSelect.length === 0 ? (
            <S.CheckBoxWrapper
              onChange={(e) => {
                setClientSelect(e);
              }}
              value={clientSelect}
            >
              {/* Lista para selecionar clientes */}
              {clientes?.map((cliente) => (
                <CheckBoxCustom
                  key={cliente.id}
                  value={cliente.nome}
                  checkedValue={cliente.nome}
                  label={cliente.nome}
                />
              ))}
            </S.CheckBoxWrapper>
          ) : (
            <S.CheckBoxWrapper
              onChange={(e) => {
                setProdutosSelected(e);
              }}
              value={produtosSelecteds}
            >
              {/* Lista para selecionar produtos */}
              {produtos?.map((produto) => (
                <CheckBoxCustom
                  key={produto.id}
                  value={produto.descricao}
                  checkedValue={produto.descricao}
                  label={produto.descricao}
                />
              ))}
            </S.CheckBoxWrapper>
          )}
        </>
      )}

      <div className="button-wrapper">
        <Button fullWidth>Proxima etapa</Button>
      </div>
    </S.OrderFirstSteepWrapper>
  );
};

export default OrderFirstSteep;
