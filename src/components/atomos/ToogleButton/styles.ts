import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const ChangeThemeContainer = styled.div`
  ${({ theme }) => css`
    position: fixed;
    z-index: 100;
    bottom: 50px;
    left: 25px;
    border-radius: 5px;
    background-color: ${theme.colorScheme === 'dark'
      ? theme.colors.dark['4']
      : theme.colors.blue['4']};
    button {
      &:hover {
        background-color: ${theme.colorScheme === 'dark'
          ? theme.colors.dark['4']
          : theme.colors.blue['4']};
      }
    }

    svg {
      color: ${theme.white};
    }
  `}
`;
