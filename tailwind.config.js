/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			animation: {
				'spin-slow': 'spin 13s linear infinite'
			}
		}
	},
	plugins: []
}
