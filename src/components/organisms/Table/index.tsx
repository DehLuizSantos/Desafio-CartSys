import {
  MRT_ColumnDef,
  MRT_Row,
  MRT_TableInstance,
  MantineReactTable,
  useMantineReactTable,
} from 'mantine-react-table';
import { ActionIcon, Box, Button, Menu, Text } from '@mantine/core';
import { Pencil, Trash, Plus, AlertTriangle, Password, Reload } from 'tabler-icons-react';
import * as S from './styles';
import { IconDeviceDesktopCancel, IconDownload, IconEdit, IconTrash } from '@tabler/icons-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
interface TableProps {
  data: any[];
  columns: MRT_ColumnDef<any>[];
  handleEditar?: (plan: any) => void;
  handleDeleteItem?: (plan: any) => void;
  handleAddTable?: () => void;
  handleActive?: () => void;
  handleInactive?: () => void;
  handleDoubleClick?: (dado: any) => void;
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
  handleDeleteItem,
  handleDoubleClick,
  handleAddTable,
  handleActive,
  handleInactive,
  refetch,
  loading = false,
  enableRowSelection = false,
  enableRowActions = true,
  exportPDF = false,
  columns,
}: TableProps) => {
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
    renderRowActions: ({ row }) => (
      <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '10px' }}>
        {handleEditar && (
          <ActionIcon
            color="lime"
            variant="light"
            onClick={() => {
              handleEditar && handleEditar(row.original);
            }}
          >
            <IconEdit />
          </ActionIcon>
        )}
        {handleDeleteItem && (
          <ActionIcon
            color="red"
            variant="light"
            onClick={() => {
              handleDeleteItem && handleDeleteItem(row.original);
            }}
          >
            <IconTrash />
          </ActionIcon>
        )}
      </Box>
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
