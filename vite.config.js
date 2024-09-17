import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path"
import dts from 'vite-plugin-dts'


export default defineConfig(() => {

  return {
    plugins: [
      react(),
      dts({
        exclude: ["src/App.tsx", "src/main.tsx"],
      }),
    ],
    resolve: {
      alias: {
        "@responsive-component": path.resolve(__dirname, "src")
      }
    },
    build: {
      outDir: "dist",
      lib: {
        entry: {
          index: path.resolve(__dirname, 'lib/index.ts'),
          breakpoints: path.resolve(__dirname, "src/constant/index.ts"),
        },
        name: 'index',
        formats: ['es', 'cjs'],
        fileName: (format, filename) => `${filename}.${format}.js`,
      },
      rollupOptions: {
        external: ['react', 'react-dom', "framer-motion"],
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
            'framer-motion': 'FramerMotion',
          },
        },
      },
    },
  }

})

