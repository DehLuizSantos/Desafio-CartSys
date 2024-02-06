import { Stepper } from '@mantine/core';
import * as S from './styles';
import { useState } from 'react';
import OrderFirstSteep from '../../components/organisms/OrderFirstSteep';
import OrderSecoundSteep from '../../components/organisms/OrderSecoundSteep';
import OrderTertySteep from '../../components/organisms/OrderTertySteep';

export const AssistentePedidos = () => {
  const [active, setActive] = useState(0);
  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));
  return (
    <>
      <S.AssistentePedidoWrapper>
        <Stepper active={active} onStepClick={setActive} breakpoint="sm">
          <Stepper.Step
            label="Pedido"
            description="Escolha o cliente e o produto para realizar o pedido"
          >
            <OrderFirstSteep onNextSteep={nextStep} />
          </Stepper.Step>
          <Stepper.Step label="Pagamento" description="Selecione qual vai ser a forma de pagamento">
            <OrderSecoundSteep onGoBackSteep={prevStep} onNextSteep={nextStep} />
          </Stepper.Step>
          <Stepper.Step label="Endereço" description="Cadastre o endereço para a entrega">
            <OrderTertySteep onGoBackSteep={prevStep} onNextSteep={nextStep} />
          </Stepper.Step>
          <Stepper.Completed>
            Completed, click back button to get to previous step
          </Stepper.Completed>
        </Stepper>
      </S.AssistentePedidoWrapper>
    </>
  );
};
