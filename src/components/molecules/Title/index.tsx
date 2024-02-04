import { Text, Title } from '@mantine/core';
import { TitleCustomContainer } from './styles';

interface HeaderProps {
  title: string;
}

export const TitleCustom = ({ title }: HeaderProps) => {
  return (
    <TitleCustomContainer>
      <Title
        sx={{ fontFamily: 'Poppins, sans-serif' }}
        ta="start"
        fz="xl"
        // color="blue"
        fw={600}
        underline
        italic
      >
        {title.toUpperCase()}
      </Title>
    </TitleCustomContainer>
  );
};
