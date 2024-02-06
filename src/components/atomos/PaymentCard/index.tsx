import { useState } from 'react';
import CheckBoxCustom from '../CheckBox';
import * as S from './styles';

type PaymentCardProps = {
  label: string;
  value: number;
  icon: JSX.Element;
  disable: boolean;
  onSelect: (e: string) => void;
};

const PaymentCard = ({ label, value, icon, disable, onSelect }: PaymentCardProps) => {
  const [valueSeleted, setValueSelected] = useState('');
  return (
    <S.PaymentCardWrapper>
      <CheckBoxCustom
        checkedValue={label}
        disabled={disable}
        value={valueSeleted}
        onChange={(e) => {
          setValueSelected(label);
          onSelect(label);
        }}
      />
      {icon}
      <p>{label}</p>
    </S.PaymentCardWrapper>
  );
};

export default PaymentCard;
