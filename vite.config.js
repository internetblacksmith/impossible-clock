import { defineConfig } from "vite";
import istanbul from "vite-plugin-istanbul";

export default defineConfig(({ mode }) => ({
  root: "app",
  plugins: [
    (process.env.NODE_ENV === "test" || mode === "test") &&
      istanbul({
        include: "scripts/**/*",
        exclude: ["node_modules", "cypress"],
        extension: [".js"],
        requireEnv: false,
        forceBuildInstrument: true,
      }),
  ].filter(Boolean),
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    // Lightning CSS minifier (Rust, no PostCSS toolchain needed). It reads
    // the browserslist from package.json for vendor prefixing.
    cssMinify: "lightningcss",
  },
  css: {
    transformer: "lightningcss",
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  preview: {
    port: 3000,
  },
}));
