import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const MultiSelectContainer = styled.div`
  ${({ theme }) => css`
    box-sizing: border-box;

    .react-icon {
      position: absolute;
      right: 5px;
      top: 8px;
      width: 1.125rem;
      height: 1.125rem;
      color: rgb(134, 142, 150);
    }
  `}
`;
export const SelectBar = styled.div`
  ${({ theme }) => css`
    border-radius: 0.25rem;
    background-color: ${theme.colorScheme === 'dark' ? 'rgb(37, 38, 43)' : theme.white};
    border: 0.0625rem solid #ced4da;
    padding-left: 24px;
    width: 100%;
    height: 34px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 30px;
    position: relative;
  `}
`;

export const ItemsAdd = styled.div`
  ${() => css`
    border: 1px solid darkseagreen;
    padding: 10px;
    font-size: 22px;
    font-weight: bold;
    height: 30%;
    display: flex;
    align-items: center;
    background-color: darkslateblue;
    gap: 10px;
  `}
`;

export const SelectItems = styled.div`
  ${() => css`
    border: 1px solid red;

    .item-choise {
      cursor: pointer;
      width: 100%;
      display: flex;
      align-items: center;
      border: 1px solid #00b0b2;
      padding-left: 24px;
      background-color: teal;
    }
  `}
`;
