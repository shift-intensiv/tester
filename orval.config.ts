export default {
  'shiftbackend-tester': {
    input: 'https://shift-backend.onrender.com/tester-json',
    output: {
      target: 'generated/api/instance.ts',
      client: 'react-query',
      prettier: true,
      override: {
        mutator: {
          path: './src/utils/api/instance.ts',
          name: 'api'
        }
      }
    }
  }
};
