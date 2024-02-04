import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
  MantineThemeOverride,
} from '@mantine/core';
import { PropsWithChildren, useState } from 'react';
import store from 'store2';
//   import ChangeThemeIcon from '../../componentsAtomic/molecules/ToogleScheme';
import MyGlobalStyles from '../global';
import ChangeThemeIcon from '../../components/atomos/ToogleButton';

export const theme: MantineThemeOverride = {
  colors: {},
  breakpoints: {
    sl: '1440',
    xl: '1200',
    lg: '992',
    md: '768',
    sm: '576',
    xs: '350',
  },
};

export default function ThemeWrapper({ children }: PropsWithChildren) {
  const initialTheme = store.local.get('theme');
  const [colorScheme, setColorScheme] = useState<ColorScheme>(initialTheme ?? 'dark');

  const toggleColorScheme = (value?: ColorScheme) => {
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider
        theme={{ colorScheme: colorScheme, ...theme }}
        withGlobalStyles
        withNormalizeCSS
      >
        <MyGlobalStyles />
        {children}
        <ChangeThemeIcon
          changeColorScheme={() => {
            setColorScheme(colorScheme === 'light' ? 'dark' : 'light');
            store.local.set('theme', colorScheme === 'light' ? 'dark' : 'light');
          }}
          colorScheme={colorScheme}
        />
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
