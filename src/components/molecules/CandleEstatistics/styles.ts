import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const ProductsEstatisticsWrapper = styled.div`
  ${({ theme }) => css`
    margin-top: 30px;
    box-shadow: ${theme.colorScheme === 'light'
      ? 'rgba(0, 0, 0, 0.2) 3px 3px 8px'
      : 'rgba(7,27,47,7) 6px 7px 10px'};
    background-color: ${theme.colorScheme === 'light' ? '#fff' : '#100c2a'};
    padding: 10px;
    border-radius: 4px;
  `}
`;
