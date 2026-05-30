import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";

export default [
  {
    files: ["src/**/*.ts"],
    languageOptions: { parser: tsparser },
    plugins: { "@typescript-eslint": tseslint },
    rules: {
      // Eng-review Finding 4: ban innerHTML in the UI layer to prevent XSS via
      // integrator/CMS-supplied strings. All dynamic text goes through
      // createElement + textContent instead.
      "no-restricted-properties": [
        "error",
        {
          object: undefined,
          property: "innerHTML",
          message: "innerHTML is banned — use createElement + textContent (XSS via config strings).",
        },
      ],
    },
  },
];
