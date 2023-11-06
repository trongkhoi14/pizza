/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		fontFamily: {
			Poppins: ["Poppins", "sans-serif"],
		},
		
		extend: {
			colors: {
				'dark-green': '#0e8388',
				'light-green': '#8dcbe6',//#8dcbe6
				'light-teal': '#a8dadc',
				'light-blue': '#1c82ad',
				'dark-brown': '#2c3333',
				's-light-blue': '#3c84a3' // #19a7ce
			},

		},
		screens: {
			"3xs": "160px",
			xxs: "375px",
			xs: "425px",
			sm: "640px",
			md: "768px",
			lg: "1024px",
			xl: "1280px",
			"2xl": "1536px",
		  },
	},
	plugins: [require("@tailwindcss/line-clamp")],
};
