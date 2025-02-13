module.exports = {
	preset: 'ts-jest', // Usar ts-jest para compilar TypeScript
	testEnvironment: 'node', // Usar el entorno de Node.js para pruebas
	transform: {
		'^.+\\.(ts|tsx)$': 'ts-jest', // Compilar archivos .ts y .tsx
	},
	moduleFileExtensions: ['ts', 'tsx', 'js', 'json'], // Extensiones de archivos a reconocer
};
