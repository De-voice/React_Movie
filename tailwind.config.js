module.exports = {
	purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			backgroundImage: (theme) => ({
				landingImage: "url('/src/assets/landingImg.jpg')",
				middleImage:"url('/src/assets/blow.jpg')",
			}),
			backgroundPosition: {
				bottom: "bottom",
				"bottom-4": "center bottom 1rem",
				center: "center",
				left: "left",
				right: "right",
				"right-bottom": "right bottom",
				"right-top": "right top",
				top: "top",
				"top-4": "center top 1rem",
			},
			backgroundSize: {
				auto: "auto",
				cover: "cover",
				contain: "contain",
				"50%": "50%",
				16: "4rem",
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
