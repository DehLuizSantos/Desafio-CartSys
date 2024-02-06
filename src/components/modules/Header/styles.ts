import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Group, Header } from '@mantine/core';

export const HeaderContainer = styled(Header)`
  ${({ theme }) => css`
    display: flex;
    padding: 0 2vw;
    align-items: center;

    h1 {
      margin-left: auto;
    }
    background-color: ${theme.colorScheme === 'dark'
      ? theme.colors.dark['7']
      : theme.colors.blue['5']};

    color: ${theme.colorScheme === 'dark' ? theme.colors.dark['2'] : theme.white};
    img {
      height: 30px;
    }
  `}
`;

export const SidebarExpandWrapper = styled.div`
  ${({ theme }) => css`
    margin: 15px 0;

    .aside {
      display: flex;
      gap: 15px;

      h1 {
        font-size: ${theme.fontSizes.md};
      }
    }

    svg {
      color: ${theme.colorScheme === 'dark' ? theme.colors.gray['3'] : theme.white};
    }
  `}
`;

export const Mobile = styled.div`
  ${({ theme }) => css`
    display: flex;
    margin-right: 15px;
  `}
`;
