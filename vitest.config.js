import { defineConfig } from "vitest/config";

// Separate file so we don't inherit Vite's `root: "app"` (which would make
// Vitest look for tests under app/test/).
export default defineConfig({
  test: {
    // Pure helpers in app/scripts/clock.js — no DOM needed.
    environment: "node",
    include: ["test/**/*.test.js"],
  },
});
