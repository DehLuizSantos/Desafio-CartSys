import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const MyTextInputWrapper = styled.div`
  ${({ theme }) => css`
    label {
      font-size: ${theme.fontSizes?.sm};
    }
    input {
      font-size: ${theme.fontSizes?.sm};

      &:focus-within {
        border: 2px solid ${theme.colors?.primaryColorName?.[1]};
      }
    }
  `}
`;
