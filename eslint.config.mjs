import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // 1. React и внешние библиотеки
            ['^react', '^\\w', '^@[^/]'],
            // 2. Абсолютные импорты из src
            ['^@/'],
            // 3. Типы
            ['^@/types'],
            // 4. Родительские пути
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            // 5. Текущая директория
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$', '^\\./?.types$'],
            // 6. Стили
            ['[A-Za-z@\\.].+\\.s?css$', '^[A-Za-z@\\.].+\\.s?css$'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
      'max-len': [
        'error',
        {
          code: 140,
          tabWidth: 2,
          ignoreComments: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreRegExpLiterals: true,
        },
      ],
    },
  },
]);

export default eslintConfig;
