import { defineConfig } from 'vite';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import istanbul from 'vite-plugin-istanbul';

export default defineConfig(({ mode }) => ({
  root: 'app',
  plugins: [
    (process.env.NODE_ENV === 'test' || mode === 'test') && istanbul({
      include: 'scripts/**/*',
      exclude: ['node_modules', 'cypress'],
      extension: ['.js'],
      requireEnv: false,
      forceBuildInstrument: true
    })
  ].filter(Boolean),
  build: {
    outDir: '../dist',
    emptyOutDir: true
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler'
      }
    },
    postcss: {
      plugins: [
        autoprefixer(),
        cssnano({
          preset: 'default'
        })
      ]
    }
  },
  server: {
    port: 3000,
    open: true
  },
  preview: {
    port: 3000
  }
}));