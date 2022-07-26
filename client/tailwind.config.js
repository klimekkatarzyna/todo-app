module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
	theme: {
		extend: {
			colors: {
				'black-rgba': 'rgba(0, 0, 0, 0.25)',
				'light-grey': '#f4f4f4',
				blue: '#0078D7',
				red: '#c23732',
				dark: '#34373d',
				lightRed: '#fecaca',
				darkerGrey: '#767678',
				'input-color': '#fdfdfd',
				border: '#eaeaea',
				grey: '#505050',
				fontColor: '#34373d',
				green: '#5ca52d',
				lightBlue: '#f4f6ff',
				white: '#ffffff',
				darkGrey: '#383636',
				lightGrey: '#f4f4f4',
				hoverColor: '#efefef',
				activeMenuItem: '#d8eefe',
			},
			screens: {
				print: { raw: 'print' },
			},
		},
	},
	plugins: [require('@tailwindcss/forms')],
};
