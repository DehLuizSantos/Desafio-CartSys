import { Title } from '@mantine/core';
import { TitleWrapper } from './styles';

interface TitleModalProps {
  title: string;
}

export const TitleModal = ({ title }: TitleModalProps) => {
  return (
    <TitleWrapper>
      <Title weight={500} order={2} italic align={'start'} underline>
        {title}
      </Title>
    </TitleWrapper>
  );
};
