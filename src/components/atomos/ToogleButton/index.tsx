import React, { Dispatch } from 'react';
import { IconSun, IconMoonStars } from '@tabler/icons-react';
import * as S from './styles';
import { ColorScheme } from '@mantine/styles/lib/theme/types/ColorScheme';
import { ActionIcon } from '@mantine/core';

export type ChangeThemeIconProps = {
  changeColorScheme: Dispatch<boolean>;
  colorScheme: ColorScheme;
};

const ChangeThemeIcon = ({ changeColorScheme, colorScheme }: ChangeThemeIconProps) => {
  return (
    <S.ChangeThemeContainer>
      <ActionIcon onClick={() => changeColorScheme(false)}>
        {colorScheme === 'dark' ? <IconMoonStars /> : <IconSun />}
      </ActionIcon>
    </S.ChangeThemeContainer>
  );
};

export default ChangeThemeIcon;
