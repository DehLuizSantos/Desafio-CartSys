import { ActionIcon, Button } from '@mantine/core';
import * as S from './styles';
import { CalendarStats } from 'tabler-icons-react';
import { ModalDefault } from '../ModalDefault';
import { DatePicker, DateValue } from '@mantine/dates';
import { notifications } from '@mantine/notifications';
import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { FilterDateType } from '../../../pages/Login/interface';

interface SelectDatesProps {
  d1Param: string | Date;
  d2Param: string | Date;
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
}

export const SelectDates = ({ d1Param, d2Param, openModal, setOpenModal }: SelectDatesProps) => {
  const queryClient = useQueryClient();
  const [d1, setD1] = useState(new Date(d1Param));
  const [d2, setD2] = useState(new Date(d2Param));
  const formatD1 = d1.toLocaleDateString();
  const formatD2 = d2.toLocaleDateString();
  const daysToShow = `De ${formatD1} Até ${formatD2}`;

  const setDate1 = (date: DateValue) => {
    if ((date as Date) > new Date()) {
      notifications.show({
        title: 'Erro',
        color: 'red',
        message: 'Data de início não pode ser maior que o dia de Hoje!',
      });
      return;
    }
    setD1(date as Date);
  };
  const setDate2 = (date: DateValue) => {
    if ((date as Date) > new Date()) {
      notifications.show({
        title: 'Erro',
        color: 'red',
        message: 'Data de início não pode ser maior que o dia de Hoje!',
      });
      return;
    }
    setD2(date as Date);
  };

  const { data: filters } = useQuery(['filters-fiscal']);
  const { idcliente = 0 } = (filters || {}) as FilterDateType;
  const onSubmit = () => {
    setOpenModal(false);
    const filtersPost: FilterDateType = { d1, d2, idcliente };
    queryClient.setQueryData(['filters-fiscal'], filtersPost);
  };

  return (
    <>
      <div className="data-especific">
        <p>{daysToShow}</p>
        <ActionIcon onClick={() => setOpenModal(true)}>
          <CalendarStats />
        </ActionIcon>
      </div>

      <ModalDefault opened={openModal} onClose={() => setOpenModal(false)}>
        <S.SelectDatesCustimize>
          <div className="configure-dates">
            <div className="date">
              <p>De</p>
              <DatePicker
                size="xs"
                locale="pt-br"
                hideOutsideDates
                firstDayOfWeek={0}
                defaultDate={d1}
                value={d1}
                onChange={(e) => setDate1(e ? e : new Date())}
              />
            </div>
            <div className="date">
              <p>Até</p>
              <DatePicker
                size="xs"
                locale="pt-br"
                hideOutsideDates
                firstDayOfWeek={0}
                defaultDate={d2}
                value={d2}
                onChange={(e) => setDate2(e ? e : new Date())}
              />
            </div>
          </div>

          <Button className="button-save" variant="outline" fullWidth onClick={() => onSubmit()}>
            Confirmar
          </Button>
        </S.SelectDatesCustimize>
      </ModalDefault>
    </>
  );
};
