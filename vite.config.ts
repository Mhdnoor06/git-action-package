import { defineConfig, type PluginOption } from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";
import { visualizer } from "rollup-plugin-visualizer";
import svgrPlugin from "vite-plugin-svgr";
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteTsconfigPaths(), svgrPlugin()],
  build: {
    lib: {
      entry: "./src/index.ts",
      name: "MyReactLibrary",
      // Specify output formats for your library. Including both ES module and UMD formats.
      // ES for modern bundlers and UMD for broader compatibility.
      fileName: (format) => `index.${format}.js`,
    },
    // Specifying formats to ensure your library is accessible in various environments.
    formats: ["es", "umd"], // You can adjust this based on your target audience or requirements
    rollupOptions: {
      // Mark react and react-dom as external to avoid bundling them with your library.
      // Consumers of your library should have them installed as dependencies.
      external: ["react", "react-dom"],
      output: {
        // Define globals for UMD build, required for external dependencies.
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
});
