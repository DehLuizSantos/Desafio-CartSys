import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Text } from '@mantine/core';

export const TitleCustomContainer = styled.div`
  ${({ theme }) => css`
    margin: 30px 0;
    font-size: ${theme.fontSizes.lg};
    padding: 5px 0;
    color: ${theme.colorScheme === 'dark' ? theme.colors.gray['5'] : theme.colors.blue['7']};
  `}
`;
