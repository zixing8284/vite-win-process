import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"
import react from "@vitejs/plugin-react"

import path from "node:path"
import { createRequire } from "node:module"
import { viteStaticCopy } from "vite-plugin-static-copy"

const require = createRequire(import.meta.url)
const cMapsDir = path.join(
  path.dirname(require.resolve("pdfjs-dist/package.json")),
  "cmaps",
)

// https://vitejs.dev/config/
export default defineConfig({
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

    viteStaticCopy({
      targets: [{ src: cMapsDir, dest: "" }],
    }),
  ],
})
