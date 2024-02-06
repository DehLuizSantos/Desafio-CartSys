import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const InputCepWrapper = styled.div`
  ${({ theme }) => css`
    margin: 15px 0;

    .text-search-wrapper {
      display: flex;
      align-items: center;
      gap: 30px;
      margin: 15px 0;
    }

    label {
      font-size: ${theme.fontSizes?.md};
      font-weight: bold;
      color: ${theme.colors?.gray?.[5]};
      margin-bottom: 30px;
    }

    input {
      text-align: start;
      font-size: ${theme.fontSizes?.md};
    }

    p {
      margin-top: 10px;
      text-decoration: underline;
      color: ${theme.colors?.primaryColorName?.[1]};

      &:hover {
        opacity: 0.7;
        cursor: pointer;
      }
    }
  `}
`;
