import { TextInput, TextInputProps } from '@mantine/core';
import * as S from './styles';

interface MyTextInputProps extends TextInputProps {
  field?: string;
}

const MyTextInput = ({ ...rest }: MyTextInputProps) => {
  return (
    <S.MyTextInputWrapper>
      <TextInput {...rest} radius={5} size="md" />
    </S.MyTextInputWrapper>
  );
};

export default MyTextInput;
