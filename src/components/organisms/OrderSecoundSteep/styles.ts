import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const OrderSecoundSteepWrapper = styled.div`
  ${({ theme }) => css`
    h2 {
      color: ${theme.colorScheme === 'dark' ? theme.colors.blue['5'] : theme.colors.dark['3']};
      font-size: ${theme.fontSizes.xl};
      margin-top: 45px;
    }
    .button-wrapper {
      margin: 30px 0;
      max-width: 400px;
      display: flex;
      gap: 30px;

      button {
        max-width: 155px;
      }
    }
  `}
`;

export const PaymentMethodsWrapper = styled.div`
  ${() => css``}
`;
