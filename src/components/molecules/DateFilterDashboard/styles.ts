import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const SelectWrapper = styled.div`
  ${({ theme }) => css`
    .data-especific {
      display: flex;
      align-items: center;
      gap: 20px;
      color: ${theme.colorScheme === 'dark' ? theme.colors.gray['3'] : theme.colors.blue['5']};

      p {
        font-size: ${theme.fontSizes.md};
        font-weight: 600;
      }
      /* 
      @media (min-width: ${theme.breakpoints.lg}px) {
        margin-top: 25px;
      } */
    }
  `}
`;

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
