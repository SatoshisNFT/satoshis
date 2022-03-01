module.exports = {
	content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: {
					50: '#BCA5F3',
					100: '#A281EE',
					200: '#875DE9',
					300: '#6D3AE4',
					400: '#551DD7',
					500: '#4718B4',
					600: '#391490',
					700: '#2B0F6C',
					800: '#1D0A48',
					900: '#12062B',
				},
				gold: '#BF9270',
			},
			fontFamily: {
				roboto: ['Roboto', 'sans-serif'],
				monument: ["'Monument Extended'", 'sans-serif'],
			},
		},
	},
	plugins: [],
};
