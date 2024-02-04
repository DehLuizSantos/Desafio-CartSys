import { Global } from '@mantine/core';

function MyGlobalStyles() {
  return (
    <Global
      styles={() => ({
        '*, *::before, *::after': {
          boxSizing: 'border-box',
          margin: '0',
          padding: '0',
          userSelect: 'none',
          fontFamily: 'Poppins, sans-serif',
        },
        a: {
          textDecoration: 'none',
        },
      })}
    />
  );
}

export default MyGlobalStyles;
