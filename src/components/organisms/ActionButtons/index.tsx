import { Button, Grid, Group, Space } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconDownload, IconFileSearch } from '@tabler/icons-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useNavigate } from 'react-router-dom';
import { NFCEType } from '../../../pages/NFCE/interface';
import { useFiscal } from '../../../hooks/useFiscal';
import { useQuery } from '@tanstack/react-query';
import { barDate, fistDateMonthBefore, lastDayMounthBefore } from '../../../utils/Dates';
import { FilterDateType } from '../../../pages/Login/interface';
import { useState } from 'react';
import { ModalDefault } from '../../molecules/ModalDefault';
import { Loading } from '../../atomos/Loading';

interface ActionButtonsProps {
  clientsSelect: any[];
  name: string;
  data: NFCEType | undefined;
  link: string;
  savename: string;
  color: string;
}

export const ActionButtons = ({
  data,
  link,
  savename,
  color,
  name,
  clientsSelect,
}: ActionButtonsProps) => {
  const { getXML } = useFiscal();
  const [openModal, setOpenModal] = useState(false);
  const { data: filters } = useQuery(['filters-fiscal']);
  const {
    d1: d1Param = barDate(fistDateMonthBefore()),
    d2: d2Param = lastDayMounthBefore,
    idcliente: idclienteParam = 0,
  } = (filters || {}) as FilterDateType;

  const nome = clientsSelect?.filter((item) => item.id === idclienteParam)[0]?.nome ?? '';
  const formatD1 = new Date(d1Param).toLocaleDateString();
  const formatD2 = new Date(d2Param).toLocaleDateString();

  const {
    data: download,
    refetch: refetchDownload,
    isFetching,
  } = useQuery({
    queryFn: () => getXML(idclienteParam, formatD1, formatD2, name),
    queryKey: [`xml-${name}`],
    onError(e: any) {
      console.error('erro');
    },
  });
  const navigate = useNavigate();
  const handleExportRows = () => {
    if (data) {
      if (data?.resumo === null) {
        notifications.show({ title: 'erro', color: 'red', message: 'Nenhum dado enconstrado!' });
        return;
      }
    } else {
      notifications.show({ title: 'erro', color: 'red', message: 'Nenhum dado enconstrado!' });
      return;
    }
    const doc = new jsPDF();

    const tableData = data?.resumo.map((row: any) => {
      return Object.values(row);
    });

    const tableHeaders = ['Data', 'Quantidade', 'Valor'];
    let somaQuantidades = 0;
    let somaValores = 0;

    // Intera sobre o array para calcular a soma
    for (const item of data?.resumo ?? []) {
      somaQuantidades += item.qtde;
      somaValores += Number(item.valor);
    }
    /* Transforma o valor de cada row em valor com decimal  */
    tableData?.map((data) => {
      data[2] = `R$ ${Number(data[2]).toLocaleString('pt-br')}`;
    });
    autoTable(doc, {
      styles: { halign: 'right' },
      head: [tableHeaders],
      body: tableData as any,
      foot: [['Total', somaQuantidades, `R$ ${somaValores.toLocaleString('pt-br')}`]],
    });

    doc.save(`PDF_${savename} ${nome} ${formatD1} á ${formatD2}`);
  };

  const handleDownload = () => {
    //porém está respeitandoi o data.resumo, pois downloand está com o dado atrasado aqui ou o mesmo tem algum dado mesmo sem conteúdo
    if (!data?.resumo || !download) {
      notifications.show({ title: 'erro', color: 'red', message: 'Nenhum dado enconstrado!' });
      return;
    }
    refetchDownload();
    setOpenModal(true);
  };

  const SaveXML = () => {
    const blob = new Blob([download], { type: 'application/zip' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `XML_${savename} ${nome} ${formatD1} á ${formatD2}.zip`;
    document.body.appendChild(a);
    a.click();

    // Limpe o URL temporário
    window.URL.revokeObjectURL(url);
    // Remova o elemento de link do documento
    document.body.removeChild(a);
  };

  const showResume = () => {
    if (idclienteParam === 0) {
      notifications.show({ title: 'erro', color: 'red', message: 'Nenhum cliente selecionado!' });
      return;
    }
    navigate(link);
  };
  return (
    <>
      <Group position="center">
        <Button leftIcon={<IconDownload />} onClick={handleExportRows} color={color} w={150}>
          PDF
        </Button>
        <Button leftIcon={<IconDownload />} onClick={handleDownload} color={color} w={150}>
          XML
        </Button>
        <Button leftIcon={<IconFileSearch />} onClick={showResume} color={color} w={150}>
          Resumo
        </Button>
      </Group>
      <ModalDefault opened={openModal} onClose={() => setOpenModal(false)}>
        {isFetching && openModal ? (
          <>
            <Loading />
          </>
        ) : (
          <>
            <p>
              Deseja baixar os arquivos XML do dia {formatD1} ao {formatD2} ?
            </p>
            <Space h={'lg'} />
            <Grid display={'flex'}>
              <Grid.Col span={6}>
                <Button fullWidth onClick={() => setOpenModal(false)} color="red" variant="outline">
                  Cancelar
                </Button>
              </Grid.Col>
              <Grid.Col span={6}>
                <Button fullWidth onClick={SaveXML}>
                  Confirmar
                </Button>
              </Grid.Col>
            </Grid>
          </>
        )}
      </ModalDefault>
    </>
  );
};
