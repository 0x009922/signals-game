module.exports = {
    preset: 'ts-jest',
    testMatch: ['**/?(*.)+(spec|test).ts'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
};
