import { Grid, Skeleton, Space, useMantineTheme } from '@mantine/core';
import * as S from './styles';
import { FileAnalytics, FileDollar } from 'tabler-icons-react';
import { notifications } from '@mantine/notifications';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { FilterDateType, UserType } from '../../../pages/Login/interface';
import { useClientes } from '../../../hooks/useClientes';
import { SpotlightSearch } from '../../atomos/SpotlightSearch';
import { Loading } from '../../atomos/Loading';
import { barDate, fistDateMonthBefore, lastDayMounthBefore, today } from '../../../utils/Dates';
import { CardsGroup } from '../CardsGroup';
import { useFiscal } from '../../../hooks/useFiscal';
import { ActionButtons } from '../../organisms/ActionButtons';
import { CandleEstatistics } from '../CandleEstatistics';
import { SelectDates } from '../SelectDates';

interface DateFilterDashboardProps {
  name: string;
  color: string;
}
export const DateFilterDashboard = ({ name, color }: DateFilterDashboardProps) => {
  const { colorScheme } = useMantineTheme();
  const queryClient = useQueryClient();
  const { getFiscal } = useFiscal();
  const [openModal, setOpenModal] = useState(false);
  const { data: filters } = useQuery(['filters-fiscal']);

  const {
    d1: d1Param = barDate(fistDateMonthBefore()),
    d2: d2Param = lastDayMounthBefore,
    idcliente: idclienteParam = 0,
  } = (filters || {}) as FilterDateType;

  const d1 = new Date(d1Param);
  const d2 = new Date(d2Param);
  const formatD1 = d1.toLocaleDateString();
  const formatD2 = d2.toLocaleDateString();
  const [idcliente, setIdcliente] = useState(idclienteParam ?? 0);
  const { data, isFetching } = useQuery({
    queryKey: [`dash-${name}`, idcliente, formatD1, formatD2],
    queryFn: ({ queryKey }) => {
      return getFiscal(Number(queryKey[1]), String(queryKey[2]), String(queryKey[3]), name);
    },
    onSuccess(data) {
      !data.resumo &&
        notifications.show({
          title: 'Que pena! : (',
          color: 'orange',
          message: 'Nenhum dado encontrado!',
        });
      setOpenModal(false);
    },
    onError(e: any) {
      setOpenModal(false);
      notifications.show({
        title: 'Erro',
        color: 'red',
        message: String(e.response.data.message),
      });
    },
  });

  const { getClientes } = useClientes();
  const { data: userData, isFetching: isFetchingUser } = useQuery<UserType>(['userData']);
  const { data: clients } = useQuery({
    queryFn: () => getClientes(),
    queryKey: ['clientes'],
  });

  const clientsSelect = useMemo(() => {
    return userData?.adm
      ? clients?.response.filter((client: any) => client.ativo) ?? []
      : userData?.clientes ?? [];
  }, [userData, clients]);

  // userData?.adm ?

  const defaultCnpj = userData?.adm
    ? clientsSelect.filter((item: any) => item.id === idcliente)[0]?.cnpj
    : clientsSelect.filter((item: any) => item.idcliente === idcliente)[0]?.cnpj;

  const onSubmit = () => {
    setOpenModal(false);
    const filters: FilterDateType = { d1, d2, idcliente };
    queryClient.setQueryData(['filters-fiscal'], filters);
  };

  const cards = [
    {
      name: name?.toUpperCase(),
      icon: <FileDollar />,
      value: String(
        data?.valor?.toLocaleString('pt-br', {
          style: 'currency',
          currency: 'BRL',
        }) ?? '0'
      ),
    },
    {
      name: 'Quantidade',
      icon: <FileAnalytics />,
      value: String(data?.qtde ?? 0),
    },
    {
      name: 'Ticket Médio',
      icon: <FileDollar />,
      value: String(
        data?.ticket?.toLocaleString('pt-br', {
          style: 'currency',
          currency: 'BRL',
        }) ?? '0'
      ),
    },
  ];

  return (
    <>
      {isFetching ? (
        <Loading />
      ) : (
        <>
          <S.SelectWrapper>
            <Grid>
              <Grid.Col lg={6} md={12}>
                <Skeleton visible={isFetchingUser}>
                  <SpotlightSearch
                    data={clientsSelect}
                    setIdcliente={(e) => {
                      setIdcliente(e), onSubmit();
                    }}
                    defaultCnpj={defaultCnpj}
                  />
                </Skeleton>
              </Grid.Col>
              <Grid.Col lg={6} md={12}>
                <SelectDates
                  d1Param={d1Param}
                  d2Param={d2Param}
                  openModal={openModal}
                  setOpenModal={setOpenModal}
                />
              </Grid.Col>
            </Grid>
          </S.SelectWrapper>

          <Space h="lg" />
          <CardsGroup cards={cards} color={color} />
          <Space h="lg" />

          <ActionButtons
            clientsSelect={clientsSelect}
            name={name}
            color={color}
            link={`/${name}/resumo/`}
            savename={name?.toUpperCase()}
            data={data}
          />

          <CandleEstatistics colorScheme={colorScheme} data={data?.resumo ?? []} />
        </>
      )}
    </>
  );
};
