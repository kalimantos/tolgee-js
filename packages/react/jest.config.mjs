export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  unmockedModulePathPatterns: ['/node_modules/*'],
  modulePathIgnorePatterns: ['cypress'],
  transformIgnorePatterns: ['node_modules/(?!@tolgee/web)'],
  roots: ['src'],
  setupFiles: ['../testing/setupJest.ts'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.spec.json',
    },
  },
};
