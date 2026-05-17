import globals from "globals";
import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      "coverage/**",
      ".nyc_output/**",
      "cypress-visual-screenshots/**",
      "cypress/screenshots/**",
      "cypress/videos/**",
    ],
  },
  {
    files: ["app/scripts/**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { ...globals.browser },
    },
  },
  {
    files: ["test/**/*.js", "vite.config.js", "cypress.config.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { ...globals.node },
    },
  },
  {
    // Cypress-image-diff config is loaded by Cypress as CommonJS but its
    // callbacks run in the Cypress browser context, so it needs both global
    // sets.
    files: ["cypress-image-diff.config.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",
      globals: {
        ...globals.node,
        cy: "readonly",
        Cypress: "readonly",
      },
    },
  },
  {
    files: ["cypress/**/*.{js,cy.js}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.mocha,
        cy: "readonly",
        Cypress: "readonly",
      },
    },
  },
];
