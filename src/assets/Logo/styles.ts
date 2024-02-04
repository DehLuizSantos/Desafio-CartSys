import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const LogoWrapper = styled.div`
  ${({ theme }) => css`
    h1 {
      color: ${theme.colorScheme === 'dark' ? theme.colors.gray['3'] : theme.colors.blue['7']};
      font-size: ${theme.fontSizes.lg};
    }
  `}
`;
