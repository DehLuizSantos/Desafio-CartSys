import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const PaymentCardWrapper = styled.div`
  ${() => css`
    max-width: 250px;
    display: flex;
    align-items: center;
    gap: 15px;
  `}
`;
