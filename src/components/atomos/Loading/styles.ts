import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const Text = keyframes`
    0% {
      letter-spacing: 1px;
      transform: translateX(0px);
    }
  
    40% {
      letter-spacing: 2px;
      transform: translateX(26px);
    }
  
    80% {
      letter-spacing: 1px;
      transform: translateX(32px);
    }
  
    90% {
      letter-spacing: 2px;
      transform: translateX(0px);
    }
  
    100% {
      letter-spacing: 1px;
      transform: translateX(0px);
    }
  `;
const Load = keyframes`
    0% {
    width: 16px;
    transform: translateX(0px);
  }

  40% {
    width: 100%;
    transform: translateX(0px);
  }

  80% {
    width: 16px;
    transform: translateX(64px);
  }

  90% {
    width: 100%;
    transform: translateX(0px);
  }

  100% {
    width: 16px;
    transform: translateX(0px);
  }

  `;
const Load2 = keyframes`
    0% {
    transform: translateX(0px);
    width: 16px;
  }

  40% {
    transform: translateX(0%);
    width: 80%;
  }

  80% {
    width: 100%;
    transform: translateX(0px);
  }

  90% {
    width: 80%;
    transform: translateX(15px);
  }

  100% {
    transform: translateX(0px);
    width: 16px;
  }

  `;

export const LoadingWrapper = styled.div`
  ${() => css`
    height: 50%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.05);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
  `}
`;

export const LoadingContainer = styled.div`
  ${() => css`
    width: 120px;
    height: 50px;
    position: relative;
  `}
`;
export const LoadingText = styled.div`
  ${({ theme }) => css`
    position: absolute;
    top: 0;
    padding: 0;
    margin: 0;
    color: ${theme.colorScheme === 'dark' ? theme.colors.gray['3'] : theme.colors.blue['6']};
    font-weight: bold;
    animation: ${Text} 3.5s ease both infinite;
    font-size: 1rem;
    text-transform: uppercase;
    letter-spacing: 1px;
  `}
`;
export const LoadingLoad = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.blue['3']};
    border-radius: 50px;
    display: block;
    height: 16px;
    width: 16px;
    bottom: 0;
    position: absolute;
    transform: translateX(64px);
    animation: ${Load} 3.5s ease both infinite;

    ::before {
      position: absolute;
      content: '';
      width: 100%;
      height: 100%;
      background-color: ${theme.colors.blue['9']};
      border-radius: inherit;
      animation: ${Load2} 3.5s ease both infinite;
    }
  `}
`;
