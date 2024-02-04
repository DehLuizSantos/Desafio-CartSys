import { css } from '@emotion/react';
import styled from '@emotion/styled';
export const InputWrapper = styled.div`
  ${({ theme }) => css`
    input {
      background-color: ${theme.colorScheme === 'dark' ? theme.colors.dark['5'] : theme.white};
      border: 1px solid
        ${theme.colorScheme === 'dark' ? theme.colors.gray['8'] : theme.colors.gray['4']};
      color: ${theme.colorScheme === 'dark' ? theme.colors.gray['3'] : theme.colors.dark['5']};
    }
    label {
      color: ${theme.colorScheme === 'dark' ? theme.colors.gray['3'] : theme.colors.dark['5']};
    }
  `}
`;
