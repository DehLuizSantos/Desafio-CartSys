import { useEffect, useState } from 'react';
import * as S from './styles';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useClient } from '../../../hooks/useClients';
import { LoadingLoad } from '../../atomos/Loading/styles';
import CheckBoxCustom from '../../atomos/CheckBox';
import { useProduct } from '../../../hooks/useProducts';
import { ActionIcon, Button, TextInput } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import { ProductType } from '../../../interfaces/product.interface';

type OrderFirstSteepProps = {
  onNextSteep: () => void;
};

const OrderFirstSteep = ({ onNextSteep }: OrderFirstSteepProps) => {
  const [clientSelect, setClientSelect] = useState<string[]>([]);
  const [produtosSelecteds, setProdutosSelected] = useState<string[]>([]);
  const [productsSearch, setProductsSearch] = useState<ProductType[]>([]);
  const { handleGetClients } = useClient();
  const { handleGetProducts, handleSearchProduct } = useProduct();

  const { isLoading: loadingClientes, data: clientes } = useQuery({
    queryKey: ['clientes'],
    queryFn: () => handleGetClients(),
  });

  const { isLoading: loadingProdutos, data: produtos } = useQuery({
    queryKey: ['produtos'],
    queryFn: () => handleGetProducts(),
  });

  useEffect(() => {
    if (!loadingProdutos) {
      setProductsSearch(produtos!);
    }
  }, [loadingProdutos]);

  const handleSearchProduto = useMutation({
    mutationFn: (searchParam: string) => handleSearchProduct(searchParam),
    onSuccess: (data: any) => {
      setProductsSearch(data);
    },
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
            <>
              <TextInput
                onChange={(e) => handleSearchProduto.mutate(e.target.value)}
                className="search"
                placeholder="Pesquise o produto para ser enviado"
              />
              <S.CheckBoxWrapper
                onChange={(e) => {
                  setProdutosSelected(e);
                }}
                value={produtosSelecteds}
              >
                {/* Lista para selecionar produtos */}
                {productsSearch?.map((produto) => (
                  <CheckBoxCustom
                    key={produto.id}
                    value={produto.descricao}
                    checkedValue={produto.descricao}
                    label={produto.descricao}
                  />
                ))}
              </S.CheckBoxWrapper>
            </>
          )}
        </>
      )}

      <div className="button-wrapper">
        <Button disabled={produtosSelecteds.length === 0} onClick={onNextSteep} fullWidth>
          Proxima etapa
        </Button>
      </div>
    </S.OrderFirstSteepWrapper>
  );
};

export default OrderFirstSteep;
