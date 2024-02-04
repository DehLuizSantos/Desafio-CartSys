import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const SelectDatesCustimize = styled.div`
  ${({ theme }) => css`
    .configure-dates {
      display: block;
      margin: 10px 0;

      @media (min-width: ${theme.breakpoints.md}px) {
        align-items: center;
        display: flex;
        gap: 30px;
      }
    }

    .date {
      box-shadow: 2px 2px 2px 1px
        ${theme.colorScheme === 'dark' ? theme.colors.gray['5'] : theme.colors.blue['3']};
      border: 1px solid
        ${theme.colorScheme === 'dark' ? theme.colors.gray['5'] : theme.colors.blue['3']};
      border-radius: 5px;
      padding: 10px;
      margin: 10px 0;
    }

    .button-save {
      margin: 15px 0;

      @media (min-width: ${theme.breakpoints.md}px) {
        max-width: 250px;
        margin-left: auto;
      }
    }
  `}
`;
