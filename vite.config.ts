import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";
import dts from "vite-plugin-dts";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/setupTests.ts",
    includeSource: ["src/**/*.{js,ts}"],
    // include: ["src/**/*.{test,spec}.{js,ts,jsx,tsx}"],
    // watchExclude: ['**/node_modules/**', '**/dist/**', '**/*.tsx', '**/*.ts'],
    coverage: {
      reporter: ["text", "html", "lcov"],
      exclude: [
        "node_modules", // Exclude node_modules
        "src/v1/helpers/**/*.{js,jsx,ts,tsx}", // Exclude all files in the helpers folder
        "src/v1/components/MobileViewComponents/Events/Preview", // Exclude the specific file
        "src/v1/components/MobileViewComponents/Events/Events.tsx", // Exclude the specific file
        "src/v1/redux/**/*.{js,jsx,ts,tsx}", // Exclude all files in the redux folder
        "src/v1/api-calls/**/*.{js,jsx,ts,tsx}", // Exclude all test files
        "src/v1/ClientApi-Calls/**/*.{js,jsx,ts,tsx}", // Exclude all test files
        "src/__tests__/**/*.{js,jsx,ts,tsx}", // Exclude all test files
        "src/*.{js,jsx,ts,tsx}", // Exclude all test files
      ],
    },
  },
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
  server: {
    open: true,
  },
});
