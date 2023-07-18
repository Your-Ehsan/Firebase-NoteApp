/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{html,css,js,ts,jsx}"],
  theme: {
    extend: {},
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
  daisyui: {
    theme: [
      {
        mytheme: {
          "primary": "#0b7c75",
          "secondary": "#aa1c12",
          "accent": "#a0a5e5",
          "neutral": "#1a1b23",
          "base-100": "#f4f5fa",
          "info": "#18c5ec",
          "success": "#4cd6c9",
          "warning": "#b07303",
          "error": "#e56c72",
        },
      },
      "dark",
    ],
  },
};
