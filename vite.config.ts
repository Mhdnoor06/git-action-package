import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [react(), viteTsconfigPaths(), dts()],
  build: {
    lib: {
      entry: "src/index.ts",
      name: "MyReactLibrary",
      fileName: (format) => `index.${format}.js`,
    },
    formats: ["es", "umd"],
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
