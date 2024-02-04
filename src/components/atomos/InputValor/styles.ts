import { css } from '@emotion/react';
import styled from '@emotion/styled';

type CurrencyProps = {
  icon?: string;
};

export const CurrencyBrlInputContainer = styled.div<CurrencyProps>`
  ${({ theme, icon }) => css`
    position: relative;
    span {
      color: #e03131;
      margin-right: 2px;
    }
    label {
      font-size: 14px;
      font-weight: 500;
      word-break: break-word;
    }

    .icon {
      position: absolute;
      left: 7px;
      top: 30px;
      color: ${theme.colors.gray['5']};
    }

    input {
      background-color: ${theme.colorScheme === 'light' ? '#fff' : '#25262b'};
      border-radius: 4px;
      border: 1px solid ${theme.colorScheme === 'light' ? '#adb5bd' : '#373A40'};
      color: ${theme.colorScheme === 'light' ? ' #010101' : '#C1C2C5'};
      display: block;
      height: 36px;
      min-height: 36px;
      padding-left: ${icon ? '30px' : '8px'};
      padding-right: ${icon ? '12px' : '0px'};
      text-align: left;
      width: 100%;

      &:focus {
        outline: none;
        border-color: #1971c2;
      }

      &:disabled {
        background-color: ${theme.colorScheme === 'light' ? '#fff' : 'rgb(37, 38, 43)'};
        color: ${theme.colorScheme === 'light' ? '#010101' : 'rgb(144, 146, 150)'};
        cursor: not-allowed;
      }
    }

    .error {
      font-size: 8px;
      color: #e03131;
      font-weight: bold;
    }
  `}
`;
