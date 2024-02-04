import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Navbar } from '@mantine/core';

type MenuProps = {
  expand: boolean;
};

export const MenuWrapper = styled.div<MenuProps>`
  ${({ theme, expand }) => css`
    background-color: ${theme.colorScheme === 'dark'
      ? theme.colors.dark['7']
      : theme.colors.blue['5']};

    .menu-content {
      cursor: pointer;
      display: flex;
      align-items: center;
      font-weight: bold;
      text-transform: uppercase;
      color: ${theme.colorScheme === 'dark' ? theme.colors.gray['3'] : theme.white};

      p {
        /* display: ${expand ? 'none' : 'block'}; */
        opacity: ${expand ? '0' : '1'};
      }
    }
  `}
`;

export const SubMenuItem = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colorScheme === 'dark'
      ? theme.colors.dark['9']
      : theme.colors.blue['5']};
    width: 190px;
    border-radius: 5px;
    padding: 10px;
    margin: 10px 0;
    color: ${theme.white};
    text-decoration: none;
    font-size: ${theme.fontSizes.sm};
    text-transform: uppercase;
    font-weight: bold;

    &:hover {
      opacity: 0.7;
    }
  `}
`;

export const NavbarStyled = styled(Navbar)`
  ${({ theme }) => css`
    transition: 500ms;
    overflow-y: auto;
    scrollbar-width: thin;
    ::-webkit-scrollbar {
      width: 5px;
    }
    ::-webkit-scrollbar-thumb {
      border-radius: 50px;
      background: ${theme.colors.blue['9']};
    }

    .active {
      opacity: 0.8;
    }
    .submenu-active {
      color: ${theme.colorScheme === 'dark' ? theme.colors.blue['8'] : theme.colors.cyan['3']};
    }
    overflow-x: clip;
    background-color: ${theme.colorScheme === 'dark'
      ? theme.colors.dark['7']
      : theme.colors.blue['5']};

    .active {
      background-color: ${theme.colorScheme === 'dark'
        ? theme.colors.dark['4']
        : theme.colors.blue['4']};
      border-radius: 9px;
    }
  `}
`;
