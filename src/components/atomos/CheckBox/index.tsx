import { Checkbox, CheckboxProps } from '@mantine/core';
import * as S from './styles';

interface CheckBoxCustomProps extends CheckboxProps {
  checkedValue: string;
}

const CheckBoxCustom = ({ checkedValue, ...props }: CheckBoxCustomProps) => {
  return <S.CheckBoxCustomStyled {...props} />;
};

export default CheckBoxCustom;
