import { MantineNumberSize, Modal, useMantineTheme } from '@mantine/core';
import * as S from './styles';
import { TitleModal } from '../../atomos/TitleModal';
interface ModalDefaultProps {
  opened: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: MantineNumberSize;
  title?: string;
}

export const ModalDefault = ({
  opened,
  onClose,
  children,
  size = 'auto',
  title = '',
}: ModalDefaultProps) => {
  const theme = useMantineTheme();
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      size={size}
      centered
      transitionProps={{ transition: 'rotate-left' }}
      overlayProps={{
        color: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
        opacity: 0.55,
        blur: 3,
      }}
    >
      <S.ModalWrapper>
        {title && <TitleModal title={title} />}
        {children}
      </S.ModalWrapper>
    </Modal>
  );
};
