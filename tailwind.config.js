/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "#0C365A",
        primary: "#01D167",
        backgroundPrimary: "#20D167",
        title: "#25345F",
        description: "#22222266",
        cardDesrciption: "#222222",
        accent: "#AB8BFF",
        white: "#FFFFFF",
        inactive: "#0000001F",
        inputBottom: "#E5E5E5",
        inactiveButton: "#EEEEEE",
        switchInactiveTrackColor: "#D1D5DB",
        placeholderTextColor: "#9CA3AF"
      }
    },
  },
  plugins: [],
}