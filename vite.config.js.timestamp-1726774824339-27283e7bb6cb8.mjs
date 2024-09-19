// vite.config.js
import { defineConfig } from "file:///C:/Users/ifran/OneDrive/Escritorio/Proyectos/personal-monorepo/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/ifran/OneDrive/Escritorio/Proyectos/personal-monorepo/node_modules/@vitejs/plugin-react-swc/index.mjs";
import path from "path";
import dts from "file:///C:/Users/ifran/OneDrive/Escritorio/Proyectos/personal-monorepo/node_modules/vite-plugin-dts/dist/index.mjs";
var __vite_injected_original_dirname = "C:\\Users\\ifran\\OneDrive\\Escritorio\\Proyectos\\personal-monorepo\\packages\\responsive-component";
var vite_config_default = defineConfig(() => {
  return {
    plugins: [
      react(),
      dts({
        exclude: ["src/App.tsx", "src/main.tsx"]
      })
    ],
    resolve: {
      alias: {
        "@": path.resolve(__vite_injected_original_dirname, "src")
      }
    },
    build: {
      outDir: "dist",
      lib: {
        entry: path.resolve(__vite_injected_original_dirname, "lib/index.ts"),
        name: "index",
        formats: ["es", "umd"],
        fileName: (format) => `index.${format}.js`
      },
      rollupOptions: {
        external: ["react", "react-dom", "framer-motion"],
        output: {
          globals: {
            react: "React",
            "react-dom": "ReactDOM",
            "framer-motion": "FramerMotion"
          }
        }
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxpZnJhblxcXFxPbmVEcml2ZVxcXFxFc2NyaXRvcmlvXFxcXFByb3llY3Rvc1xcXFxwZXJzb25hbC1tb25vcmVwb1xcXFxwYWNrYWdlc1xcXFxyZXNwb25zaXZlLWNvbXBvbmVudFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcaWZyYW5cXFxcT25lRHJpdmVcXFxcRXNjcml0b3Jpb1xcXFxQcm95ZWN0b3NcXFxccGVyc29uYWwtbW9ub3JlcG9cXFxccGFja2FnZXNcXFxccmVzcG9uc2l2ZS1jb21wb25lbnRcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2lmcmFuL09uZURyaXZlL0VzY3JpdG9yaW8vUHJveWVjdG9zL3BlcnNvbmFsLW1vbm9yZXBvL3BhY2thZ2VzL3Jlc3BvbnNpdmUtY29tcG9uZW50L3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2MnXG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiXG5pbXBvcnQgZHRzIGZyb20gJ3ZpdGUtcGx1Z2luLWR0cydcblxuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKCkgPT4ge1xuXG4gIHJldHVybiB7XG4gICAgcGx1Z2luczogW1xuICAgICAgcmVhY3QoKSxcbiAgICAgIGR0cyh7XG4gICAgICAgIGV4Y2x1ZGU6IFtcInNyYy9BcHAudHN4XCIsIFwic3JjL21haW4udHN4XCJdLFxuICAgICAgfSksXG4gICAgXSxcbiAgICByZXNvbHZlOiB7XG4gICAgICBhbGlhczoge1xuICAgICAgICBcIkBcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCJzcmNcIilcbiAgICAgIH1cbiAgICB9LFxuICAgIGJ1aWxkOiB7XG4gICAgICBvdXREaXI6IFwiZGlzdFwiLFxuICAgICAgbGliOiB7XG4gICAgICAgIGVudHJ5OnBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdsaWIvaW5kZXgudHMnKSxcbiAgICAgICAgbmFtZSA6IFwiaW5kZXhcIixcbiAgICAgICAgZm9ybWF0czogWydlcycsICd1bWQnXSxcbiAgICAgICAgZmlsZU5hbWU6IChmb3JtYXQpID0+IGBpbmRleC4ke2Zvcm1hdH0uanNgLFxuICAgICAgfSxcbiAgICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgICAgZXh0ZXJuYWw6IFsncmVhY3QnLCAncmVhY3QtZG9tJywgXCJmcmFtZXItbW90aW9uXCJdLFxuICAgICAgICBvdXRwdXQ6IHtcbiAgICAgICAgICBnbG9iYWxzOiB7XG4gICAgICAgICAgICByZWFjdDogJ1JlYWN0JyxcbiAgICAgICAgICAgICdyZWFjdC1kb20nOiAnUmVhY3RET00nLFxuICAgICAgICAgICAgJ2ZyYW1lci1tb3Rpb24nOiAnRnJhbWVyTW90aW9uJyxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICB9XG5cbn0pXG5cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBd2QsU0FBUyxvQkFBb0I7QUFDcmYsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sVUFBVTtBQUNqQixPQUFPLFNBQVM7QUFIaEIsSUFBTSxtQ0FBbUM7QUFNekMsSUFBTyxzQkFBUSxhQUFhLE1BQU07QUFFaEMsU0FBTztBQUFBLElBQ0wsU0FBUztBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ04sSUFBSTtBQUFBLFFBQ0YsU0FBUyxDQUFDLGVBQWUsY0FBYztBQUFBLE1BQ3pDLENBQUM7QUFBQSxJQUNIO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUCxPQUFPO0FBQUEsUUFDTCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxLQUFLO0FBQUEsTUFDcEM7QUFBQSxJQUNGO0FBQUEsSUFDQSxPQUFPO0FBQUEsTUFDTCxRQUFRO0FBQUEsTUFDUixLQUFLO0FBQUEsUUFDSCxPQUFNLEtBQUssUUFBUSxrQ0FBVyxjQUFjO0FBQUEsUUFDNUMsTUFBTztBQUFBLFFBQ1AsU0FBUyxDQUFDLE1BQU0sS0FBSztBQUFBLFFBQ3JCLFVBQVUsQ0FBQyxXQUFXLFNBQVMsTUFBTTtBQUFBLE1BQ3ZDO0FBQUEsTUFDQSxlQUFlO0FBQUEsUUFDYixVQUFVLENBQUMsU0FBUyxhQUFhLGVBQWU7QUFBQSxRQUNoRCxRQUFRO0FBQUEsVUFDTixTQUFTO0FBQUEsWUFDUCxPQUFPO0FBQUEsWUFDUCxhQUFhO0FBQUEsWUFDYixpQkFBaUI7QUFBQSxVQUNuQjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFFRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
