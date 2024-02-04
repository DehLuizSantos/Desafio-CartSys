import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const LoginWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100vh;
    width: 100vw;
    background-color: ${theme.colorScheme === 'dark'
      ? theme.colors.dark['3']
      : theme.colors.blue['5']};

    .login {
      max-width: 350px;
      margin: 0px 20px;

      img {
        height: 50px;
        display: block;

        @media (min-width: ${theme.breakpoints.md}px) {
          display: none;
        }
      }

      h1 {
        font-size: ${theme.fontSizes.xl};
        color: ${theme.colorScheme === 'dark' ? theme.colors.gray['3'] : theme.white};
        margin-bottom: 15px;
      }

      a {
        color: ${theme.colors.blue['5']};
        font-size: ${theme.fontSizes.sm};
        border-bottom: 1px solid ${theme.colors.blue['5']};
      }

      @media (min-width: ${theme.breakpoints.md}px) {
        margin: 0 auto;
      }
    }
  `}
`;

export const BeWelcomeWrapper = styled.div`
  ${({ theme }) => css`
    display: none;

    background-color: ${theme.colorScheme === 'dark'
      ? theme.colors.dark['5']
      : theme.colors.blue['9']};

    padding: 30px;

    @media (min-width: ${theme.breakpoints.md}px) {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 100vh;
      width: 50%;
    }

    img {
      height: 90px;
      margin-bottom: 15px;

      @media (min-width: ${theme.breakpoints.md}px) {
        height: 110px;
      }
    }

    h2 {
      color: ${theme.white};
      text-align: center;
    }
  `}
`;
