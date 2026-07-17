import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"
import react from "@vitejs/plugin-react"

const repoBase = "/vite-win-process/"

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.GITHUB_ACTIONS === "true" ? repoBase : "/",
  assetsInclude: ["**/*.bmp"],
  plugins: [
    react({
      babel: {
        plugins: [
          [
            "babel-plugin-styled-components",
            {
              displayName: true,
              fileName: false,
            },
          ],
        ],
      },
    }),
    tsconfigPaths(),
  ],
})
