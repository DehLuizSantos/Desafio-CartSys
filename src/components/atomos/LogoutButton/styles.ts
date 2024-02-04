import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const LogoutButtonWrapper = styled.div`
  ${({ theme }) => css`
    margin-left: auto;
    display: flex;
  `}
`;

export const LoginButton = styled.button`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    background-color: ${theme.colorScheme === 'light'
      ? theme.colors.blue['7']
      : theme.colors.dark['6']};
    border: none;
    cursor: pointer;
    padding: 5px;
    border-radius: 5px;

    .aside {
      text-align: start;
      margin-left: 5px;
      font-size: ${theme.fontSizes.xs};

      h5 {
        font-weight: 900;
        color: ${theme.colorScheme === 'dark' ? theme.white : theme.colors.blue['2']};
      }

      p {
        font-weight: 300;
        color: ${theme.colorScheme === 'dark' ? theme.white : theme.colors.blue['2']};
      }
    }
  `}
`;
