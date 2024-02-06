import { Button, Grid, Modal, ModalProps } from '@mantine/core';
import * as S from './styles';

interface ModalDeleteProps extends ModalProps {
  description: string;
  onConfirm: () => void;
  setOpened: (value: boolean) => void;
}
export const ModalDelete = ({ description, onConfirm, setOpened, opened }: ModalDeleteProps) => {
  return (
    <Modal centered opened={opened} onClose={() => setOpened(false)}>
      <S.Wrapper>
        <p>{description}</p>
      </S.Wrapper>
      <Grid mt={30}>
        <Grid.Col span={6}>
          <Button color="red" fullWidth onClick={() => setOpened(false)} variant="outline">
            Cancelar
          </Button>
        </Grid.Col>

        <Grid.Col span={6}>
          <Button fullWidth onClick={onConfirm}>
            Confirma
          </Button>
        </Grid.Col>
      </Grid>
    </Modal>
  );
};
