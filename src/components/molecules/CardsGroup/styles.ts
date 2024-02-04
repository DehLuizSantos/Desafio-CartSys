import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const CardsContainer = styled.div`
  ${({ theme }) => css`
    display: block;

    @media (min-width: ${theme.breakpoints.md}px) {
      display: flex;
      justify-content: start;
      gap: 15px;
    }
  `}
`;
