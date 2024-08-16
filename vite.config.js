import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path"
import dts from 'vite-plugin-dts'
import base from "../../vite.base.config"


export default defineConfig(
  {
  plugins: [
    react(),
    dts({
      tsconfigPath: "./tsconfig.app.json",
      exclude : ["src/App.tsx","src/main.tsx"]
    }),
  ],
  build: {
    outDir : "dist",
    lib: {
      entry: path.resolve(__dirname, 'lib/index.ts'),
      name: 'index',
      formats: ['es', 'umd'],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom',"framer-motion"],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'framer-motion': 'FramerMotion',
        },
      },
    },
  },
  ...base
})