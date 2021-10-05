import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import styleImport from 'vite-plugin-style-import';
import path from 'path';

const resolve = (dir) => path.join(__dirname, dir);

export default defineConfig({
  server: {
    // open: true,
    port: 4000,
  },
  resolve: {
    alias: {
      src: resolve('src'),
      page: resolve('src/page'),
      route: resolve('src/route'),
      assets: resolve('src/assets'),
      components: resolve('src/components'),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          '@primary-color': '#558cff',
        },
      },
    },
  },
  plugins: [
    reactRefresh(),
    styleImport({
      libs: [
        {
          libraryName: 'antd',
          esModule: true,
          resolveStyle: (name) => `antd/es/${name}/style/index`,
        },
      ],
    }),
  ],
});
