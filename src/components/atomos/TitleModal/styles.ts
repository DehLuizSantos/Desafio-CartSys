import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const TitleWrapper = styled.div`
  ${({ theme }) => css`
    letter-spacing: 0.5px;
    margin-bottom: 2.1rem;
    overflow: hidden;
    color: ${theme.colorScheme === 'dark' ? theme.colors.gray['3'] : theme.colors.blue['7']};
    white-space: nowrap;
  `}
`;
