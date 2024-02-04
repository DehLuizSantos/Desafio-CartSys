import { AppShell } from '@mantine/core';
import { ReactNode, useState } from 'react';
import { DoubleNavbar } from '../Navbar';
import { HeaderMenu } from '../Header';

interface PainelShellProps {
  children: ReactNode;
}

export const NewPainelShell = ({ children }: PainelShellProps) => {
  const [expand, setExpand] = useState(true);
  const [title, setTitle] = useState('Dashboard');
  return (
    <AppShell
      padding="xl"
      navbar={<DoubleNavbar setTitle={setTitle} setExpand={setExpand} expand={expand} />}
      header={<HeaderMenu setExpand={setExpand} expand={expand} title={title} />}
      styles={(theme) => ({
        main: {
          transition: 'ease-in, 0.5s',
          overflowX: 'hidden',
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      })}
    >
      {children}
    </AppShell>
  );
};
