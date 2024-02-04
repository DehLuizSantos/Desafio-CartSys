import { Dispatch, SetStateAction, useState } from 'react';
import { Navbar } from '@mantine/core';
import { LinksGroup } from '../../atomos/NavbarLinks';
import { useMediaQuery } from '@mantine/hooks';
import { IconUser } from '@tabler/icons-react';
import * as S from './styles';

type DoubleNavbarProps = {
  expand: boolean;
  setExpand: Dispatch<SetStateAction<boolean>>;
  setTitle: Dispatch<SetStateAction<string>>;
};

export function DoubleNavbar({ expand, setExpand, setTitle }: DoubleNavbarProps) {
  const [active, setActive] = useState('/nfce');
  const isMobile = useMediaQuery('(max-width: 420px)');

  const linksValues = [
    {
      label: 'Usuários',
      icon: IconUser,
      link: '/usuarios',
    },
  ];

  const base =
    expand && isMobile
      ? window.screen.width
      : expand && !isMobile
      ? 250
      : !expand && isMobile
      ? 0
      : 80;

  const links = linksValues.map((item) => {
    return (
      <LinksGroup
        setActive={setActive}
        active={active}
        setTitle={setTitle}
        setExpand={setExpand}
        expand={expand}
        key={item.label}
        {...item}
      />
    );
  });

  return (
    <>
      {base > 0 && (
        <S.NavbarStyled height={'92%'} width={{ base: base }} p="md">
          <Navbar.Section>
            <S.MenuWrapper expand={expand}>{links}</S.MenuWrapper>
          </Navbar.Section>
        </S.NavbarStyled>
      )}
    </>
  );
}
