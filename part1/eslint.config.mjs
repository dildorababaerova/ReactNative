import { defineConfig } from "eslint/config";
import react from "eslint-plugin-react";
import reactNative from "eslint-plugin-react-native";
import babelParser from "@babel/eslint-parser";
import reactHooks from "eslint-plugin-react-hooks";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  // Игнорируемые файлы
  //   reactHooks.configs.flat.recommended,
  {
    ignores: [
      ".expo/**/*",
      "node_modules/**/*",
      "android/**/*",
      "ios/**/*",
      "**/*.config.js",
      "**/*.config.mjs",
    ],
  },

  // Основная конфигурация
  ...compat
    .extends("eslint:recommended", "plugin:react/recommended")
    .map((config) => ({
      ...config,
      files: ["**/*.{js,jsx,mjs}"],
    })),

  {
    files: ["**/*.{js,jsx,mjs}"],
    plugins: {
      react,
      "react-native": reactNative,
      "react-hooks": reactHooks,
    },

    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: ["@babel/preset-react"],
        },
      },
      globals: {
        // Node
        module: "readonly",
        require: "readonly",
        __dirname: "readonly",
        process: "readonly",
        console: "readonly",
        global: "readonly",

        // Browser / React Native
        window: "readonly",
        document: "readonly",
        navigator: "readonly",

        // Метро/Expo специфичные
        $$require_external: "readonly",

        // React Native стандартные глобалы
        ...reactNative.environments["react-native"]["react-native"],
      },
    },

    settings: {
      react: {
        version: "detect",
      },
    },

    rules: {
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "react-native/no-unused-styles": "warn",
      "react-native/no-inline-styles": "warn",
      "no-undef": [
        "error",
        {
          typeof: true,
        },
      ],
    },
  },

  // Специальная конфигурация для файлов .expo
  {
    files: [".expo/**/*.js"],
    languageOptions: {
      globals: {
        $$require_external: "readonly",
        global: "readonly",
      },
    },
    rules: {
      "no-undef": "off", // Отключаем для .expo файлов, так как там используются метро-специфичные вещи
    },
  },
]);
