import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Grid } from '@mantine/core';

export const OrderTertySteepWrapper = styled.div`
  ${({ theme }) => css`
    max-width: 500px;
    h2 {
      color: ${theme.colorScheme === 'dark' ? theme.colors.blue['5'] : theme.colors.dark['3']};
      font-size: ${theme.fontSizes.xl};
      margin-top: 45px;
    }
  `}
`;

export const FormAdressesWrapper = styled(Grid)`
  ${({ theme }) => css`
    label {
      font-size: ${theme.fontSizes?.xs};
    }
    input {
      min-height: 0;
      height: 32px;
      font-size: ${theme.fontSizes?.xs};
    }

    .checkbox {
      input {
        min-height: 0;
        height: 20px;
        font-size: ${theme.fontSizes?.xs};
      }
    }

    select {
      min-height: 0;
      height: 32px;
    }

    p {
      font-size: ${theme.fontSizes?.xs};
    }
  `}
`;
