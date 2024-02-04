import { Burger, createStyles } from '@mantine/core';
import { Dispatch, SetStateAction } from 'react';
import InfoLuckImg from '../../../assets/infoluck.png';
import * as S from './styles';
import { LogoutButton } from '../../atomos/LogoutButton';

const useStyles = createStyles(() => ({
  header: {},
}));
interface IHeaderProps {
  expand: boolean;
  setExpand: Dispatch<SetStateAction<boolean>>;

  title: string;
}

const HeaderMenu = ({ setExpand, expand }: IHeaderProps) => {
  //   const isMobile = useMediaQuery('(max-width: 420px)');
  const { classes } = useStyles();
  const handleExpandMobile = () => {
    setExpand(!expand);
  };

  return (
    <S.HeaderContainer height={75} className={classes.header}>
      <S.Mobile>
        <div onClick={handleExpandMobile}>
          <Burger opened={expand} color="#fff" size="md" />
        </div>
      </S.Mobile>
      <S.SidebarExpandWrapper>
        <div className="aside">
          <img src={InfoLuckImg} alt="Infoluck Sistemas" />
        </div>
      </S.SidebarExpandWrapper>
      <LogoutButton />
    </S.HeaderContainer>
  );
};

export { HeaderMenu };
