import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const ActionIconsWrapper = styled.div`
  ${() => css`
    display: flex;
    gap: 10px;
    align-items: center;
  `}
`;

export const TableContainer = styled.div`
  ${({ theme }) => css`
    margin: 15px 0;
    max-width: 1000px;
    border-radius: 4px;
    /* box-shadow: rgba(0, 0, 0, 0.2) 3px 3px 8px; */

    .mantine-Select-label {
      display: none;
    }

    .desativado {
      color: ${theme.colors.red['5']};
      text-transform: uppercase;
      font-weight: bold;
      text-align: center;
      font-size: ${theme.fontSizes.xs};
      background: ${theme.colors.red['1']};
      max-width: 90px;
      border-radius: 2rem;
    }

    .ativo {
      max-width: 50px;
      border-radius: 2rem;
      background: ${theme.colors.green['1']};
      color: ${theme.colors.green['8']};
      font-size: ${theme.fontSizes.xs};
      text-transform: uppercase;
      font-weight: bold;
      text-align: center;
    }
  `}
`;
export const PanelTitleWrapper = styled.div`
  ${() => css``}
`;
export const PanelOptions = styled.div`
  ${({ theme }) => css`
    margin: 15px 0;
    display: flex;
    gap: 30px;
    justify-content: start;
    align-items: center;

    h2 {
      font-size: ${theme.fontSizes.md};
      color: ${theme.colorScheme === 'dark' ? theme.colors.gray['3'] : theme.colors.blue['5']};
      font-weight: bold;
      text-transform: uppercase;
      border: 2px solid
        ${theme.colorScheme === 'dark' ? theme.colors.gray['3'] : theme.colors.blue['5']};
      padding: 5px;
      border-radius: 5px;
    }
  `}
`;

export const NoHaveDataDiv = styled.div`
  ${({ theme }) => css`
    color: ${theme.colors.blue['5']};
    text-align: center;
    height: 50vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    img {
      width: 280px;
    }
  `}
`;
