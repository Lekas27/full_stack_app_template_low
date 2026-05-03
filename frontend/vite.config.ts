import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig, type PluginOption } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const shouldUseChecker = true;

export default defineConfig(async () => {
  const plugins: PluginOption[] = [
    tanstackRouter({
      routesDirectory: "./src/app/router/routes",
      generatedRouteTree: "./src/app/router/route-tree.gen.ts",
      routeFileIgnorePrefix: "-",
      quoteStyle: "single",
    }),
    react(),
    tailwindcss(),
    tsconfigPaths(), // This reads tsconfig paths and applies them
  ];

  if (shouldUseChecker) {
    const { checker } = await import("vite-plugin-checker");

    const checkerPlugin = checker({
      typescript: {
        tsconfigPath: "./tsconfig.json",
        buildMode: true,
      },
      eslint: {
        lintCommand: "eslint .",
        useFlatConfig: true,
        dev: {
          overrideConfig: {
            overrideConfigFile: "./eslint.config.js",
          },
        },
      },
    });

    plugins.push(checkerPlugin);
  }

  return {
    plugins,
  };
});
