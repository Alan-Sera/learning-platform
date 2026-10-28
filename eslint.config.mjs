
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import tailwindcss from "eslint-plugin-tailwindcss";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  // GEMA Quality - Tailwind CSS v4
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      tailwindcss,
    },
    settings: {
      tailwindcss: {
        cssConfigPath: "./app/globals.css",
      },
    },
    rules: {
      "tailwindcss/enforces-canonical-classname": "warn",
      "tailwindcss/no-unnecessary-arbitrary-value": "warn",
      "tailwindcss/no-arbitrary-value": "warn",
    },
  },

  // Override default ignores of eslint-config-next.
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
