import {
  MRT_ColumnDef,
  MRT_Row,
  MRT_TableInstance,
  MantineReactTable,
  useMantineReactTable,
} from 'mantine-react-table';
import { Box, Button, Menu, Text } from '@mantine/core';
import { Pencil, Trash, Plus, AlertTriangle, Password, Reload } from 'tabler-icons-react';
import * as S from './styles';
import { IconDeviceDesktopCancel, IconDownload } from '@tabler/icons-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
interface TableProps {
  data: any[];
  columns: MRT_ColumnDef<any>[];
  handleEditar?: (plan: any) => void;
  handleChangePassword?: (plan: any) => void;
  handleDeleteItem?: (plan: any) => void;
  handleAddTable?: () => void;
  handleActive?: () => void;
  handleInactive?: () => void;
  handleExportMonthly?: (table: any) => void;
  handleDoubleClick?: (dado: any) => void;
  handleDuplicate?: (dado: any) => void;
  handleBloq?: (dado: any) => void;
  onChangeTab?: (tab: string) => void;
  refetch?: () => void;
  enableRowSelection?: boolean;
  enableRowActions?: boolean;
  loading?: boolean;
  exportPDF?: boolean;
}

export const Table = ({
  data,
  handleEditar,
  handleChangePassword,
  handleDeleteItem,
  handleDoubleClick,
  handleAddTable,
  handleActive,
  handleInactive,
  handleDuplicate,
  handleBloq,
  handleExportMonthly,
  refetch,
  loading = false,
  enableRowSelection = false,
  enableRowActions = true,
  exportPDF = false,
  columns,
}: TableProps) => {
  const handleExportRows = (rows: MRT_Row<any>[]) => {
    const doc = new jsPDF();

    const tableData = rows.map((row) => Object.values(row.original));
    const tableHeaders = columns.map((c) => c.header);

    autoTable(doc, {
      head: [tableHeaders],
      body: tableData as any,
      styles: { halign: 'left', lineColor: 'red' },
    });

    doc.save('infoluck-pdf.pdf');
  };

  const table = useMantineReactTable({
    columns,
    data,
    enableRowActions: enableRowActions,
    enableExpanding: false,
    enableRowSelection: enableRowSelection,
    state: {
      isLoading: loading,
    },
    paginationDisplayMode: 'pages',
    mantinePaginationProps: {
      // showRowsPerPage: false,
    },
    initialState: { density: 'xs' },
    positionActionsColumn: 'last',
    enablePagination: true,
    mantineTableBodyCellProps: ({ cell }: any) => ({
      onDoubleClick: () => {
        handleDoubleClick && handleDoubleClick(cell.row.original);
      },
    }),
    renderTopToolbarCustomActions: ({ table }) => (
      <Box
        sx={{
          display: 'flex',
          gap: '16px',
          padding: '8px',
          flexWrap: 'wrap',
        }}
      >
        {handleAddTable && (
          <Button onClick={() => handleAddTable()} leftIcon={<Plus />}>
            ADICIONAR
          </Button>
        )}
        {refetch && (
          <Button color="green" onClick={() => refetch()} leftIcon={<Reload />}>
            ATUALIZAR
          </Button>
        )}
        {exportPDF && (
          <Button
            color="red"
            onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
            leftIcon={<IconDownload />}
          >
            EXPORTAR PARA PDF
          </Button>
        )}
        {exportPDF && (
          <Button
            color="red"
            onClick={() => handleExportRows(table.getPrePaginationRowModel().rows)}
            leftIcon={<IconDownload />}
          >
            EXPORTAR TODOS PARA PDF
          </Button>
        )}
        {handleExportMonthly && (
          <Button
            color="green"
            onClick={() => handleExportMonthly(table.getPrePaginationRowModel().rows)}
            leftIcon={<IconDownload />}
          >
            RESUMIDO POR DATA
          </Button>
        )}
        {handleActive && (
          <Button color="green" onClick={() => handleActive()}>
            ATIVOS
          </Button>
        )}
        {handleInactive && (
          <Button color="red" onClick={() => handleInactive()}>
            INATIVOS
          </Button>
        )}
      </Box>
    ),

    renderRowActionMenuItems: ({ row }) => (
      <Menu.Dropdown data-testid="dropdown">
        {handleEditar && (
          <Menu.Item
            icon={<Pencil color={'#228BE6'} size={18} />}
            onClick={() => handleEditar(row.original)}
            data-testid="editar"
          >
            <Text fw={600}>Editar</Text>
          </Menu.Item>
        )}

        {handleDeleteItem && (
          <Menu.Item
            icon={<Trash color={'#fa5252'} size={18} />}
            onClick={() => handleDeleteItem(row.original)}
            data-testid="deletar"
          >
            <Text fw={600}>Deletar</Text>
          </Menu.Item>
        )}

        {handleDuplicate && (
          <Menu.Item
            icon={<Trash color={'#2f9e44'} size={18} />}
            onClick={() => handleDuplicate(row.original)}
            data-testid="duplicar"
          >
            <Text fw={600}>Duplicar</Text>
          </Menu.Item>
        )}
        {handleBloq && (
          <Menu.Item
            icon={<IconDeviceDesktopCancel color={'#f87168'} size={18} />}
            onClick={() => handleBloq(row.original)}
            data-testid="duplicar"
          >
            <Text fw={600}>Bloquear</Text>
          </Menu.Item>
        )}
        {handleChangePassword && (
          <Menu.Item
            icon={<Password color={'orange'} size={18} />}
            onClick={() => handleChangePassword(row.original)}
            data-testid="alterar-senha"
          >
            <Text fw={600}>Alterar Senha</Text>
          </Menu.Item>
        )}
      </Menu.Dropdown>
    ),
  });

  return (
    <>
      <S.TableContainer>
        <MantineReactTable table={table} />
      </S.TableContainer>
    </>
  );
};
