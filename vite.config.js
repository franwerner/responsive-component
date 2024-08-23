import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path"
import dts from 'vite-plugin-dts'
import alias from "../../alias.config.js"



export default defineConfig(({command}) => {

  const isBuild = command == "build" ? 
    {
      "@responsive-component" : path.resolve(__dirname,"src")
    }
    : alias

  return {
    plugins: [
      react(),
      dts({
        tsconfigPath: "./tsconfig.app.json",
        exclude: ["src/App.tsx", "src/main.tsx"]
      }),
    ],
    resolve: {
      alias: isBuild,
    },
    build: {
      outDir: "dist",
      lib: {
        entry: path.resolve(__dirname, 'lib/index.ts'),
        name: 'index',
        formats: ['es', 'umd'],
        fileName: (format) => `index.${format}.js`,
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

