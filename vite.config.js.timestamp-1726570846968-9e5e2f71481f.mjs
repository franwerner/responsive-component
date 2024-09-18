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
        entry: {
          index: path.resolve(__vite_injected_original_dirname, "lib/index.ts"),
          breakpoints: path.resolve(__vite_injected_original_dirname, "src/constant/index.ts")
        },
        name: "index",
        formats: ["es", "cjs"],
        fileName: (format, filename) => `${filename}.${format}.js`
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxpZnJhblxcXFxPbmVEcml2ZVxcXFxFc2NyaXRvcmlvXFxcXFByb3llY3Rvc1xcXFxwZXJzb25hbC1tb25vcmVwb1xcXFxwYWNrYWdlc1xcXFxyZXNwb25zaXZlLWNvbXBvbmVudFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcaWZyYW5cXFxcT25lRHJpdmVcXFxcRXNjcml0b3Jpb1xcXFxQcm95ZWN0b3NcXFxccGVyc29uYWwtbW9ub3JlcG9cXFxccGFja2FnZXNcXFxccmVzcG9uc2l2ZS1jb21wb25lbnRcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2lmcmFuL09uZURyaXZlL0VzY3JpdG9yaW8vUHJveWVjdG9zL3BlcnNvbmFsLW1vbm9yZXBvL3BhY2thZ2VzL3Jlc3BvbnNpdmUtY29tcG9uZW50L3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2MnXG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiXG5pbXBvcnQgZHRzIGZyb20gJ3ZpdGUtcGx1Z2luLWR0cydcblxuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKCkgPT4ge1xuXG4gIHJldHVybiB7XG4gICAgcGx1Z2luczogW1xuICAgICAgcmVhY3QoKSxcbiAgICAgIGR0cyh7XG4gICAgICAgIGV4Y2x1ZGU6IFtcInNyYy9BcHAudHN4XCIsIFwic3JjL21haW4udHN4XCJdLFxuICAgICAgfSksXG4gICAgXSxcbiAgICByZXNvbHZlOiB7XG4gICAgICBhbGlhczoge1xuICAgICAgICBcIkBcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCJzcmNcIilcbiAgICAgIH1cbiAgICB9LFxuICAgIGJ1aWxkOiB7XG4gICAgICBvdXREaXI6IFwiZGlzdFwiLFxuICAgICAgbGliOiB7XG4gICAgICAgIGVudHJ5OiB7XG4gICAgICAgICAgaW5kZXg6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdsaWIvaW5kZXgudHMnKSxcbiAgICAgICAgICBicmVha3BvaW50czogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCJzcmMvY29uc3RhbnQvaW5kZXgudHNcIiksXG4gICAgICAgIH0sXG4gICAgICAgIG5hbWU6ICdpbmRleCcsXG4gICAgICAgIGZvcm1hdHM6IFsnZXMnLCAnY2pzJ10sXG4gICAgICAgIGZpbGVOYW1lOiAoZm9ybWF0LCBmaWxlbmFtZSkgPT4gYCR7ZmlsZW5hbWV9LiR7Zm9ybWF0fS5qc2AsXG4gICAgICB9LFxuICAgICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgICBleHRlcm5hbDogWydyZWFjdCcsICdyZWFjdC1kb20nLCBcImZyYW1lci1tb3Rpb25cIl0sXG4gICAgICAgIG91dHB1dDoge1xuICAgICAgICAgIGdsb2JhbHM6IHtcbiAgICAgICAgICAgIHJlYWN0OiAnUmVhY3QnLFxuICAgICAgICAgICAgJ3JlYWN0LWRvbSc6ICdSZWFjdERPTScsXG4gICAgICAgICAgICAnZnJhbWVyLW1vdGlvbic6ICdGcmFtZXJNb3Rpb24nLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gIH1cblxufSlcblxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF3ZCxTQUFTLG9CQUFvQjtBQUNyZixPQUFPLFdBQVc7QUFDbEIsT0FBTyxVQUFVO0FBQ2pCLE9BQU8sU0FBUztBQUhoQixJQUFNLG1DQUFtQztBQU16QyxJQUFPLHNCQUFRLGFBQWEsTUFBTTtBQUVoQyxTQUFPO0FBQUEsSUFDTCxTQUFTO0FBQUEsTUFDUCxNQUFNO0FBQUEsTUFDTixJQUFJO0FBQUEsUUFDRixTQUFTLENBQUMsZUFBZSxjQUFjO0FBQUEsTUFDekMsQ0FBQztBQUFBLElBQ0g7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQSxRQUNMLEtBQUssS0FBSyxRQUFRLGtDQUFXLEtBQUs7QUFBQSxNQUNwQztBQUFBLElBQ0Y7QUFBQSxJQUNBLE9BQU87QUFBQSxNQUNMLFFBQVE7QUFBQSxNQUNSLEtBQUs7QUFBQSxRQUNILE9BQU87QUFBQSxVQUNMLE9BQU8sS0FBSyxRQUFRLGtDQUFXLGNBQWM7QUFBQSxVQUM3QyxhQUFhLEtBQUssUUFBUSxrQ0FBVyx1QkFBdUI7QUFBQSxRQUM5RDtBQUFBLFFBQ0EsTUFBTTtBQUFBLFFBQ04sU0FBUyxDQUFDLE1BQU0sS0FBSztBQUFBLFFBQ3JCLFVBQVUsQ0FBQyxRQUFRLGFBQWEsR0FBRyxRQUFRLElBQUksTUFBTTtBQUFBLE1BQ3ZEO0FBQUEsTUFDQSxlQUFlO0FBQUEsUUFDYixVQUFVLENBQUMsU0FBUyxhQUFhLGVBQWU7QUFBQSxRQUNoRCxRQUFRO0FBQUEsVUFDTixTQUFTO0FBQUEsWUFDUCxPQUFPO0FBQUEsWUFDUCxhQUFhO0FBQUEsWUFDYixpQkFBaUI7QUFBQSxVQUNuQjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFFRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
