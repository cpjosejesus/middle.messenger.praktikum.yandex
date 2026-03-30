import { defineConfig } from "vite";
import { resolve } from "path";

/** @type {import('vite').Plugin} */
function hbsPlugin() {
  return {
    name: "hbs-raw",
    transform(src, id) {
      if (id.endsWith(".hbs")) {
        return {
          code: `export default ${JSON.stringify(src)};`,
          map: null,
        };
      }
    },
  };
}

export default defineConfig({
  plugins: [hbsPlugin()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
});
