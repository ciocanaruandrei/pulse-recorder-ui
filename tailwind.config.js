/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,svelte,ts}",
    "./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}",
    "./node_modules/flowbite/**/*.{html,js,svelte,ts}",
    "./index.html",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        white: {
          DEFAULT: "#fff",
          text: "#ccd0da",
          base: "#eff1f5",
          mantle: "#e6e9ef",
          crust: "#dce0e8",
        },
      },
      dropShadow: {
        logo: "1px 1px 1px rgba(0, 0, 0, 0.45)",
      },
    },
    colors: {
      light: {
        300: "#efefef",
        600: "#5B6F78",
        900: "#2f576a",
      },
      dark: {
        100: "#626880",
        300: "#414559",
        500: "#45475a",
        600: "#373b48",
        800: "#313244",
        900: "#2A2D3C",
      },
      logo: {
        300: "#edc5c6",
        500: "#ce6467",
        700: "#b83a3f",
      },
      table: {
        blue: "#3B8AB8",
        head: "#784446",
        hdark: "#9a4332",
        bg: "#acb0be",
        darkbg: "#292c3c",
        icon: "#d3c078",
        play: "#f38ba8",
        dwl: "#3BB85C",
        share: "#8caaee",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
  corePlugins: {
    preflight: true,
  },
};
