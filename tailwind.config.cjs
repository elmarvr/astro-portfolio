/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx,astro}"],
  theme: {
    extend: {
      typography: (theme) => ({
        dark: {
          css: {
            "--tw-prose-body": theme("colors.slate.400"),
            "--tw-prose-bullets": theme("colors.fuchsia.500"),
          },
        },
      }),

      container: {
        center: true,
        padding: {
          DEFAULT: "2rem",
          sm: "3rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
      },
      backgroundImage: {
        hero: "radial-gradient(circle at 110% 20%, rgb(109, 40, 217) 5%, rgb(107, 33, 168) 5%, rgb(15, 23, 42) 30%)",
      },
    },
  },

  corePlugins: {
    fontSize: false,
  },

  plugins: [
    require("tailwindcss-fluid-type"),
    require("@tailwindcss/typography"),
    ({ addUtilities }) => {
      addUtilities({
        ".flip-right": {
          transform: `perspective(800px) rotateY(-20deg) rotateX(10deg)`,
        },
        ".flip-left": {
          transform: `perspective(800px) rotateY(20deg) rotateX(10deg)`,
        },
      });
    },
  ],
};
