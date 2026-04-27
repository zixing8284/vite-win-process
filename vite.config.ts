import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"
import react from "@vitejs/plugin-react"

import { readFile } from "node:fs/promises"
import path from "node:path"
import { createRequire } from "node:module"
import { viteStaticCopy } from "vite-plugin-static-copy"

const require = createRequire(import.meta.url)
const cMapsDir = path.join(
  path.dirname(require.resolve("pdfjs-dist/package.json")),
  "cmaps",
)
const pdfJsViewerPath = path.resolve(
  __dirname,
  "public/pdfjs-4.0.189-dist/web/viewer.html",
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

    {
      name: "serve-pdfjs-viewer-as-static-html",
      apply: "serve",
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          const pathname = req.url?.split("?")[0]

          if (pathname !== "/pdfjs-4.0.189-dist/web/viewer.html") {
            next()
            return
          }

          try {
            const html = await readFile(pdfJsViewerPath, "utf8")

            res.statusCode = 200
            res.setHeader("Content-Type", "text/html; charset=utf-8")
            res.end(html)
          } catch (error) {
            next(error)
          }
        })
      },
    },

    viteStaticCopy({
      targets: [{ src: cMapsDir, dest: "" }],
    }),
  ],
})
