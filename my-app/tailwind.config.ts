import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        inactive: "#666666",
        selected: "#EEEEEE",
        selected_border: "00A495",
        board_gray: "#BBBBBB",
        footer: "#F5F5F5",
        header: "#3D414D",
        cateBox: "#42464F",
        convenienceIcon: "#72757D",
      },
    },
  },
  plugins: [],
} satisfies Config;
