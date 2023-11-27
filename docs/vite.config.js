import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import autoprefixer from 'autoprefixer'

export default defineConfig(({ command, mode }) => {
  const isProduction = mode === 'production'

  return {
    base: '',
    css: {
      postcss: {
        plugins: [
          autoprefixer({
            overrideBrowserslist: ['last 1 version', 'ie >= 11'],
          }),
        ],
      },
    },
    build: {
      minify: isProduction,
      outDir: 'build',
    },
    plugins: [
      svelte()
    ],
    server: {
      host: 'localhost',
      port: 3000,
      open: !isProduction
    }
  }
})

