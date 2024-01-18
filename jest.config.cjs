module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    setupFiles: ['./jest.setup.js'],
    coverageReporters: ['lcov', 'text-summary', 'html'],
}