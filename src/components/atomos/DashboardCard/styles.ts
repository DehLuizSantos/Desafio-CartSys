import { css } from '@emotion/react';
import styled from '@emotion/styled';

type DashboardCardHeaderProps = {
  color: string;
};

export const DashboardCardWrapper = styled.div`
  ${({ theme }) => css`
    width: 100%;
    border: 2px solid
      ${theme.colorScheme === 'dark' ? theme.colors.gray['4'] : theme.colors.dark['1']};
    border-radius: 5px;
    margin: 20px 0;

    @media (min-width: ${theme.breakpoints.md}px) {
      width: 30%;
      height: 130px;
    }
  `}
`;

export const DashboardCardHeader = styled.div<DashboardCardHeaderProps>`
  ${({ theme, color }) => css`
    padding: 6px 15px;
    background-color: ${theme.colors[color]['5']};
    h2 {
      color: ${theme.colorScheme === 'dark' ? theme.white : theme.white};
      font-size: ${theme.fontSizes.sm};

      @media (min-width: ${theme.breakpoints.md}px) {
        font-size: ${theme.fontSizes.md};
      }
    }
  `}
`;

export const DashboardCardBody = styled.div`
  ${({ theme }) => css`
    padding: 15px;
    display: flex;
    align-items: end;
    justify-content: space-between;

    .icon-value {
      display: flex;
      align-items: center;

      gap: 5px;
      color: ${theme.colorScheme === 'dark' ? theme.colors.gray['5'] : theme.colors.blue['5']};
      font-weight: bold;
      font-size: ${theme.fontSizes.xl};

      svg {
        font-size: 35px;
        width: 35px;
        height: 35px;
      }
    }
    span {
      font-size: ${theme.fontSizes.xs};
      color: ${theme.colorScheme === 'dark' ? theme.colors.gray['5'] : theme.colors.blue['5']};
    }
  `}
`;
