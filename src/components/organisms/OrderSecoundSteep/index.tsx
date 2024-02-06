import { IconCash, IconCreditCard } from '@tabler/icons-react';
import PaymentCard from '../../atomos/PaymentCard';
import * as S from './styles';
import { Button } from '@mantine/core';
import { useState } from 'react';

type OrderSecoundSteepProps = {
  onNextSteep: () => void;
  onGoBackSteep: () => void;
};

const OrderSecoundSteep = ({ onNextSteep, onGoBackSteep }: OrderSecoundSteepProps) => {
  const [paymentOptionSelected, setPaymentOptionSelected] = useState('');
  const paymentMethods = [
    {
      label: 'Dinheiro',
      value: 1,
      icon: <IconCash />,
    },
    {
      label: 'Cartão de crédito',
      value: 2,
      icon: <IconCreditCard />,
    },
    {
      label: 'Cartão de débito',
      value: 3,
      icon: <IconCreditCard />,
    },
    {
      label: 'Pix',
      value: 4,
      icon: <IconCash />,
    },
  ];
  return (
    <S.OrderSecoundSteepWrapper>
      <h2>Selecione o meio de pagamento</h2>
      <S.PaymentMethodsWrapper>
        {paymentMethods.map((paymentMethod) => (
          <PaymentCard
            onSelect={(e) => {
              setPaymentOptionSelected(e);
            }}
            disable={paymentOptionSelected.length > 0}
            icon={paymentMethod.icon}
            label={paymentMethod.label}
            value={paymentMethod.value}
            key={paymentMethod.value}
          />
        ))}
      </S.PaymentMethodsWrapper>
      <div className="button-wrapper">
        <Button fullWidth color="red" variant="outline" onClick={onGoBackSteep}>
          Voltar
        </Button>
        <Button onClick={onNextSteep} fullWidth disabled={paymentOptionSelected.length === 0}>
          Proxima etapa
        </Button>
      </div>
    </S.OrderSecoundSteepWrapper>
  );
};

export default OrderSecoundSteep;
