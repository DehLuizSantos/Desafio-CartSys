import { css } from '@emotion/react';
import styled from '@emotion/styled';

type NavbarExpandProps = {
  expand: boolean;
};

export const NavItemsWrapper = styled.div`
  ${({ theme }) => css`
    background: ${theme.colorScheme === 'dark'
      ? theme.colors.dark['9']
      : theme.colors.blue['7']};
    margin: 15px 0;
    border-radius: 5px;

    .active {
      border: 1px solid red;
    }

    a {
      color: ${theme.colorScheme === 'dark'
        ? theme.colors.gray['3']
        : theme.white};
      text-decoration: none;

      &:hover {
        opacity: 0.7;
      }
    }

    p {
      color: ${theme.white};
      text-transform: uppercase;
      font-weight: bold;
      margin-left: 5px;
    }

    svg {
      color: ${theme.colorScheme === 'dark'
        ? theme.colors.gray['3']
        : theme.white};
    }
  `}
`;

export const ItemsNavLink = styled.div<NavbarExpandProps>`
  ${({ theme, expand }) => css`
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: ${expand ? 'start' : 'center'};
    gap: 10px;
    .item-content {
      display: flex;
      align-items: center;

      svg {
        color: ${theme.colorScheme === 'dark'
          ? theme.colors.gray['3']
          : theme.white};
      }
    }

    &:hover {
      opacity: 0.7;
    }
  `}
`;

export const SubItemsNavLink = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    border-radius: 5px;
    cursor: pointer;
    text-transform: uppercase;
    font-size: ${theme.fontSizes.xs};
    padding: 15px 5px;
    /*     background-color: ${theme.colorScheme === 'dark'
      ? theme.colors.dark['4']
      : theme.colors.blue['4']}; */
  `}
`;
export const HoverCardWrapper = styled.div`
  ${({ theme }) => css`
    position: fixed;
  `}
`;
