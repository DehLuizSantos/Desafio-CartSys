import DashboardCard, { DashboardCardProps } from '../../atomos/DashboardCard';
import * as S from './styles';

interface CardsGroupProps {
  cards: DashboardCardProps[];
  color: string;
}
export const CardsGroup = ({ cards, color }: CardsGroupProps) => {
  return (
    <S.CardsContainer>
      {cards.map((card: DashboardCardProps, index: number) => (
        <DashboardCard
          name={card.name}
          icon={card.icon}
          value={card.value}
          key={index}
          color={color}
        />
      ))}
    </S.CardsContainer>
  );
};
