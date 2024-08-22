require('dotenv').config({ path: '.env.test' });

module.exports = {
	testEnvironment: 'jsdom',
	setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
	transform: {
		'^.+\\.(js|jsx|ts|tsx)$': 'ts-jest',
	},
	moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
};
