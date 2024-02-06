import { Avatar, Menu } from '@mantine/core';
import { IconExternalLink } from '@tabler/icons-react';
import store from 'store2';
import * as S from './styles';
import { useLogin } from '../../../hooks/useLogin';

export const LogoutButton = () => {
  const nome = store.session.get('nome');
  const email = store.session.get('email');
  const { handleLogout } = useLogin();

  return (
    <S.LogoutButtonWrapper>
      <Menu offset={0} position="bottom-start">
        <Menu.Target>
          <S.LoginButton>
            <Avatar color="blue" size="sm" src={null} alt="no image here" />
            <div className="aside">
              <h5>{nome}</h5>
              <p>{email}</p>
            </div>
          </S.LoginButton>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            icon={<IconExternalLink color={'#228be6'} />}
            component="button"
            onClick={() => handleLogout()}
          >
            Sair
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </S.LogoutButtonWrapper>
  );
};
