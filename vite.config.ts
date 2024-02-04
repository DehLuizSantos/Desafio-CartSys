import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import EnvironmentPlugin from 'vite-plugin-environment';

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [react(), EnvironmentPlugin('all')],
    esbuild: {
      logOverride: { 'this-is-undefined-in-esm': 'silent' },
    },
    server: {
      host: true,
    },
  });
};
