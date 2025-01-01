import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: { phone: "320px" },
      container: {
        center: true,
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        inactive: "#666666",
        selected: "#EEEEEE",
        selected_border: "#00A495",
        board_gray: "#BBBBBB",
        footer: "#F5F5F5",
        header: "#3D414D",
        cateBox: "#42464F",
        convenienceIcon: "#72757D",
        blueBtn: "#3C0FA0",
        login_gray: "#9298AC",
        login_btnGray: "#3F434E",
        login_arrowGray: "#73788B",
        login_btnBg: "#F5F7FA",
      },
    },
  },
  plugins: [],
} satisfies Config;
