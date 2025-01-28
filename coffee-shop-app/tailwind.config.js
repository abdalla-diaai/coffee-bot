/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}", "./types/**/*.{js,jsx,ts,tsx}", "./contexts/**/*.{js,jsx,ts,tsx}",],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        app_orange_color: "#C67C4E",
        search_bar_color: "#F3F4F6",
    },
  },
  plugins: [],
}
};
