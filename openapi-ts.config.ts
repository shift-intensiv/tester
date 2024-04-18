import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  enums: 'typescript',
  input: 'https://shift-backend.onrender.com/tester-json',
  output: './generated/api',
  exportServices: false,
  exportCore: false,
  types: true,
  schemas: false,
  debug: true
});
