import { usePedidosStore } from '../../../store/Pedido';
import { IconCash, IconCreditCard } from '@tabler/icons-react';

import * as S from './styles';
import { useCallback } from 'react';
import { Button } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useNavigate } from 'react-router-dom';
const OrderFinalSteep = () => {
  const navigate = useNavigate();

  const pedido = usePedidosStore((state) => state.pedido);
  const addressesFirstLine = `${pedido.endereco?.logradouro}, ${pedido.endereco?.numero} `;
  const addressesSecoundLine = `${pedido.endereco?.zipCode} - ${pedido.endereco?.localidade} / ${pedido.endereco?.uf}`;
  const totalValue = pedido.produtos.reduce((total, produto) => total + produto.preco!, 0);

  const handleConfirmOrder = useCallback(() => {
    notifications.show({
      title: 'Sucesso!',
      color: 'blue',
      message: 'Pedido enviado com sucesso!',
    });
    navigate('/clientes');
  }, []);

  return (
    <S.OrderFinalSteepWrapper>
      <h2>Resumo do pedido</h2>

      <h3>{pedido.cliente}</h3>

      <S.AdressesWrapper>
        <h4>Endereço</h4>
        <p>{addressesFirstLine}</p>
        <p>{addressesSecoundLine}</p>
      </S.AdressesWrapper>

      <S.PaymentsWrapper>
        {pedido.paymentMethod !== 'Dinheiro' ? <IconCreditCard /> : <IconCash />}
        <h4>{pedido.paymentMethod}</h4>
      </S.PaymentsWrapper>

      <S.ProductsWrapper>
        <h4>Produtos</h4>
        {pedido.produtos.map((produto) => (
          <div className="produto" key={produto.id}>
            <span>1</span>
            <p>{produto.descricao},</p>
            <p>
              {produto.preco?.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </p>
          </div>
        ))}
        <h2>
          Valor total:{' '}
          {totalValue.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </h2>
      </S.ProductsWrapper>

      <Button onClick={() => handleConfirmOrder()} fullWidth>
        Confirmar Pedido
      </Button>
    </S.OrderFinalSteepWrapper>
  );
};

export default OrderFinalSteep;
