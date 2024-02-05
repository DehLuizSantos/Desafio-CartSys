import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Checkbox } from '@mantine/core';

export const OrderFirstSteepWrapper = styled.div`
  ${({ theme }) => css`
    h2 {
      color: ${theme.colorScheme === 'dark' ? theme.colors.blue['5'] : theme.colors.dark['5']};
      font-size: ${theme.fontSizes.xl};
      margin-top: 45px;
    }
    p {
      margin: 15px 0;
    }

    .go-back {
      display: flex;
      align-items: center;
      margin: 15px 0;
    }

    .destaque {
      color: ${theme.colorScheme === 'dark' ? theme.colors.blue['5'] : theme.colors.dark['5']};
    }

    .button-wrapper {
      margin: 30px 0;
      width: 250px;

      button {
      }
    }
  `}
`;

export const CheckBoxWrapper = styled(Checkbox.Group)`
  margin: 15px 0;
`;
