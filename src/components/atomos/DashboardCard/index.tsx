import React from 'react';
import * as S from './styles';

export interface DashboardCardProps {
  name: string;
  icon: React.ReactNode;
  value: string;
  color?: string;
}

const DashboardCard = ({ name, icon, value, color }: DashboardCardProps) => {
  return (
    <S.DashboardCardWrapper key={name}>
      <S.DashboardCardHeader color={color ?? 'blue'}>
        <h2>{name}</h2>
      </S.DashboardCardHeader>
      <S.DashboardCardBody>
        <div className="icon-value">
          {icon}
          <p>{value}</p>
        </div>
      </S.DashboardCardBody>
    </S.DashboardCardWrapper>
  );
};

export default DashboardCard;
