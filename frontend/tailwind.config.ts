import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				primary: "#e0f2fe",
				secondary: "#0c4a6e",
				"secondary-hover": "#082f49",
				accent: "#7dd3fc",
				"accent-hover": "#38bdf8",
			},
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			animation: {
				"slide-down": "slideDown 0.5s ease-out",
			},
			keyframes: {
				slideDown: {
					"0%": {
						transform: "translateY(-100%) translateX(-50%)",
						opacity: "0",
					},
					"100%": {
						transform: "translateY(-50%) translateX(-50%)",
						opacity: "1",
					},
				},
			},
		},
	},
	plugins: [],
};
export default config;
