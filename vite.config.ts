import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import tsConfigPaths from "vite-tsconfig-paths";
import dts from "vite-plugin-dts";

// https://vite.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "./src/library/styles/mixins.scss";
        `,
      },
    },
  },
  plugins: [
    react(),
    tsConfigPaths(),
    dts({
      insertTypesEntry: true,
      tsconfigPath: "./tsconfig.app.json",
      include: [
        "src/library/**/*.ts",
        "src/library/**/*.tsx",
        "src/library/**/*.d.ts",
      ],
      outDir: "dist",
      copyDtsFiles: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/library/main.ts"),
      name: "uiloft",
      fileName: (format) => `uiloft.${format}.js`,
      formats: ["es", "umd"],
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "jsxRuntime",
        },
        format: "es",
        exports: "named",
      },
    },
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true,
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
