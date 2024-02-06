import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const OrderFinalSteepWrapper = styled.div`
  ${({ theme }) => css`
    h2 {
      color: ${theme.colorScheme === 'dark' ? theme.colors.blue['5'] : theme.colors.dark['3']};
      font-size: ${theme.fontSizes.xl};
      margin: 30px 0;
    }

    button {
      margin: 60px 0;
      max-width: 365px;
    }
  `}
`;

export const AdressesWrapper = styled.div`
  ${({ theme }) => css`
    margin: 15px 0;

    h4 {
      color: ${theme.colorScheme === 'dark' ? theme.colors.gray['3'] : theme.colors.blue['3']};
    }
  `}
`;

export const PaymentsWrapper = styled.div`
  ${() => css`
    display: flex;
    align-items: center;
    padding: 15px 0;
    gap: 15px;
  `}
`;

export const ProductsWrapper = styled.div`
  ${({ theme }) => css`
    .produto {
      display: flex;
      align-items: center;
      gap: 15px;
      margin: 15px 0;

      span {
        width: 30px;
        height: 30px;
        display: flex;
        font-weight: bold;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        color: white;
        background: ${theme.colorScheme === 'dark'
          ? theme.colors.blue['9']
          : theme.colors.dark['6']};
      }

      h3 {
        border: 1px solid red;
      }
    }
  `}
`;
