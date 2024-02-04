import { Button } from '@mantine/core';
import * as S from './styles';

interface FormButtonProps {
  onCancel?: () => void;
}
export const FormButton = ({ onCancel }: FormButtonProps) => {
  return (
    <S.FormButtonContainer>
      {onCancel && (
        <Button fullWidth onClick={onCancel} color="red" variant="outline">
          Cancelar
        </Button>
      )}
      <Button fullWidth type="submit">
        Confirmar
      </Button>
    </S.FormButtonContainer>
  );
};
