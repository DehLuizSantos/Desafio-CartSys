import { Stepper } from '@mantine/core';
import * as S from './styles';
import { useState } from 'react';
import OrderFirstSteep from '../../components/organisms/OrderFirstSteep';

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
            <OrderFirstSteep />
          </Stepper.Step>
          <Stepper.Step label="Second step" description="Verify email"></Stepper.Step>
          <Stepper.Step label="Final step" description="Get full access">
            Step 3 content: Get full access
          </Stepper.Step>
          <Stepper.Completed>
            Completed, click back button to get to previous step
          </Stepper.Completed>
        </Stepper>
      </S.AssistentePedidoWrapper>
    </>
  );
};
